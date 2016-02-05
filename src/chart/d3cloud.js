import d3 from 'd3';
import _ from 'lodash';
import d3Cloud from 'd3-cloud';

export default class DaviesWordCloud {
  constructor(opts) {
    this.opts = opts;
    this._container = opts.container;
    this.container = d3.select(this._container);
    this.dispatch = d3.dispatch('click', 'mouseover', 'mouseout', 'mousemove');
  }

  updateData(data) {
    this.documents = _.cloneDeep(data);
    this.documents.forEach((document) => {
      document.tokens = _.sortBy(document.tokens, (t) => -t[1]);
    });

    // Create an array of maps that go from token -> score for each
    // document in the data. Also keep track of how many documents each
    // term appears in.
    var documentAppearances = {};
    var documentScores = this.documents.map((document) => {
      var scores = document.tokens.reduce((map, [token, score]) => {
        var currAppearences = documentAppearances[token] || 0;
        documentAppearances[token] = currAppearences + 1;

        map[token] = score;
        return map;
      }, {});
      return scores;
    });

    // Create a map of all tokens to the sum of the scores in all the documents
    this.sumScores = _.mergeWith({}, ...documentScores, (a, b) => {
      if(a !== undefined && b !== undefined){
        return a + b;
      }
      return undefined;
    });

    // Store the set of unique terms
    this.uniqueTokens = new Set();
    for (let key of Object.keys(documentAppearances)) {
      let count = documentAppearances[key];
      if (count === 1) {
        this.uniqueTokens = this.uniqueTokens.add(key);
      }
    }
  }

  updateScales(doc) {
    // happens per document
    this.fontSize = d3.scale.linear()
      .domain(d3.extent(doc.tokens, function(d) {return d[1];}))
      .range([12, 64]);
  }

  update(data) {
    this.updateData(data);
  }

  initialRender() {
    // No-op
  }

  render() {

    var self = this;

    var mywordCloud = this.container.selectAll('div.word-cloud-plot')
      .data(this.documents);

    var fontscale = d3.scale.linear()
    .range([8, 60]);

    var plot = mywordCloud.enter()
      .append('div')
      .attr('class', 'word-cloud-plot');

    plot
      .append('div')
      .attr('class', 'title')
      .text((d) => d.name);

    plot
      .append('div')
      .attr('class', 'cloud');

    plot.each(drawDocument);

    function drawDocument(doc) {

      self.updateScales(doc);

      var cloud = d3.select(this).select('.cloud');

      var fontscale = d3.scale.linear()
        .range([8, 60])
        .domain(d3.extent(doc.tokens, function(d) {return d[1];}));

      var layout = d3Cloud()
        .size([500, 500])
        .words(doc.tokens)
        .rotate(0)
        .font('Arial') // TODO(Lynn): make an option
        .spiral('rectangular')
        .text(function(d) {
          return d[0]; })
        .fontSize(function(d) {
          return self.fontSize(d[1]); })
        .on('end', drawTokens);

      function drawTokens(words) {

        var svg = cloud.append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .attr('class', 'wordcloud')
          .append('g')
          // without the transform, words would get cutoff to the left and top, they would
          // appear outside of the SVG area
          .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')');

        var tokens = svg.selectAll('text.token')
          .data(words);

          tokens
          .enter()
          .append('text')
          .attr('class', 'token')
          .style('font-size', function(d) {
            return self.fontSize(d[1]) + 'px';
          })
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
              return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
          })
          .text(function(d) {
              return d[0]; })
          .on('mouseover', function(d) {
            var token = d[0];
            var count = d[1];
            self.dispatch.mouseover(token, count, this);
          })
          .on('mouseout', function(d) {
            self.dispatch.mouseout(this);
          })
          .on('click', function(d) {
            var docId = this.parentNode.parentNode.__data__.id;
            var token = d[0];
            self.dispatch.click(token, docId, this);
          });

        tokens.exit().remove();
      }

    layout.start();
    }

    mywordCloud.exit().remove();

  }

  on(event, callback) {
    this.dispatch.on(event, callback);
  }

}
