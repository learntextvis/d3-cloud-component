import React from 'react';
import ReactDOM from 'react-dom';
import DaviesWordCloud from '../../chart/d3cloud';
import {KeywordInContext} from 'keyword-in-context';


import '../../chart/d3cloud.css';
import './d3cloud.css';

/**
 * Contains UI for the main configuration options that
 * modify the visualization.
 */
 export default class DaviesWordCloudComponent extends React.Component {

   constructor() {
     super();
     this.state = {
       kwikQuery: '',
       kwikText: '',
       selectedNode: '',
       tooltipNode: '',
       tooltipCount: ''
     };
   }

   // An event handler for when a word is selected in a word cloud
   clicked(token, documentId, node) {
     var text = this.props.kwikData.find((d) => d.id === documentId).text;
     this.setState({
       'kwikQuery': token,
       'kwikText': text,
       'selectedNode': node,
       'tooltip': undefined
     });
   }

   mousedover(token, count, node) {
     this.setState({
       'tooltip': {
          'node': node,
          'count': count,
          'token': token
        }
     });
   }

   mousedout() {
    this.setState({
      'tooltip': undefined,
    });
  }

  componentDidMount() {
    this.chart = new DaviesWordCloud({
      container: ReactDOM.findDOMNode(this).querySelector('.cloud-container') // why is this hard coded
    });

    this.chart.initialRender();
    this.chart.update(this.props.data, this.props.config);
    this.chart.render();

    // Listen to interaction events from the vis.
    this.chart.on('click', this.clicked.bind(this));
    this.chart.on('mouseover', this.mousedover.bind(this));
    this.chart.on('mouseout', this.mousedout.bind(this));

  }

  componentDidUpdate() {
    this.chart.update(this.props.data, this.props.config);
    this.chart.render();
  }

  getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    };
  }

  kwicModal(myclass, position, content, onclose) {
    return (<div className={myclass} style={position}>
      <div className='controls'>
        <button onClick={onclose}></button>
      </div>
      <div>
        {content}
      </div>
    </div>);
  }

  renderTooltip(myclass, style, word, count) {
    return (<div className={myclass} style={style}>
      <p>Word: {word} </p><p>Count: {count} </p>
      </div>);
  }

  createTooltip() {

    var style;
    var content;
    var className = this.props.tooltipOpts.classname;

    if (this.state.tooltip) {
      let nodeOffset = this.getOffset(this.state.tooltip.node);
      let word = this.state.tooltip.token;
      let count = this.state.tooltip.count;

      style = {
        top: nodeOffset.top - 25,
        left: nodeOffset.left + 25
      };
      return this.renderTooltip(className, style, word, count);
    } else {
      return null;
    }
  }

  renderKeywordInContext(opts) {
    var kwik;
    var kwikPosition;
    var kwclass;

    if (this.state.selectedNode) {
      let nodeOffset = this.getOffset(this.state.selectedNode);
      kwikPosition = {
        top: nodeOffset.top + nodeOffset.height,
        left: nodeOffset.left,
      };
      kwclass = opts.classname;

      kwik = <div>
        <KeywordInContext
          caseSensitive={false}
          contextSize={opts.kwikContextSize}
          text={this.state.kwikText}
          query={this.state.kwikQuery}
        />
      </div>;
      return this.kwicModal(kwclass, kwikPosition, kwik, () => {
        this.setState({
          'selectedNode': undefined,
          'tooltip': undefined
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className='cloud-container'></div>
        {this.renderKeywordInContext(this.props.kwicOpts)}
        {this.createTooltip()}
      </div>
    );
  }
}

DaviesWordCloudComponent.propTypes = {
  // document properties here.
  config: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
  kwikData: React.PropTypes.array,
  kwicOpts: React.PropTypes.object.isRequired,
  tooltipOpts: React.PropTypes.object
};

DaviesWordCloudComponent.defaultProps = {
  kwikData: [],
  tooltipOpts: {'class': 'mytooltip'}
};

/**
 * Helper method for instatiating this method imperatively
 * (as opposed to declaratively with React.)
 *
 * @param  {Object} opts display parameters.
 * @param  {Object} opts.config
 * @param  {Array} opts.data
 * @param  {Array} opts.kwikData
 * @param  {DOMNode} opts.container
 * @param  {String} opts.query
 *
 */
DaviesWordCloudComponent.show = function(opts) {
  var config = opts.config;
  var data = opts.data;
  var kwikData = opts.kwikData;
  var kwicOpts = opts.kwicOpts;
  var container = opts.container;
  var tooltipOpts = opts.tooltipOpts;

  ReactDOM.render(
    <DaviesWordCloudComponent
      config={config}
      data={data}
      kwicOpts={kwicOpts}
      kwikData={kwikData}
      tooltipOpts={tooltipOpts}
    />,
    container
  );
};

