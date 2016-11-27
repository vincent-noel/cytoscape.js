'use strict';

require('./-preamble');

var window = require( './window' );
var is = require( './is' );
var Core = require( './core' );
var extension = require( './extension' );
var registerJquery = require( './jquery-plugin' );
var Stylesheet = require( './stylesheet' );
var Thread = require( './thread' );
var Fabric = require( './fabric' );

var baseNodeShapes = require('./extensions/renderer/base/node-shapes').nodeShapes;
var math = require('./math');
var styleProperties = require('./style/properties');
var drawingShapes = require('./extensions/renderer/canvas/drawing-shapes');
var baseArrowShapes = require('./extensions/renderer/base/arrow-shapes').arrowShapes;
var sbgn = require( './sbgn' );

var cytoscape = function( options ){ // jshint ignore:line
  // if no options specified, use default
  if( options === undefined ){
    options = {};
  }

  // create instance
  if( is.plainObject( options ) ){
    return new Core( options );
  }

  // allow for registration of extensions
  else if( is.string( options ) ){
    return extension.apply( extension, arguments );
  }
};

// replaced by build system
cytoscape.version = require('./version.json');

// try to register w/ jquery
if( window && window.jQuery ){
  registerJquery( window.jQuery, cytoscape );
}

// expose register api
cytoscape.registerJquery = function( jQuery ){
  registerJquery( jQuery, cytoscape );
};

// expose public apis (mostly for extensions)
cytoscape.stylesheet = cytoscape.Stylesheet = Stylesheet;
cytoscape.thread = cytoscape.Thread = Thread;
cytoscape.fabric = cytoscape.Fabric = Fabric;

// expose these api's for sbgnviz
cytoscape.baseNodeShapes = baseNodeShapes;
cytoscape.math = math;
cytoscape.styleProperties = styleProperties;
cytoscape.drawingShapes = drawingShapes;
cytoscape.baseArrowShapes = baseArrowShapes;
cytoscape.sbgn = sbgn;

module.exports = cytoscape;