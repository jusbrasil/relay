/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var React = require('react');
var RelayPropTypes = require('./RelayPropTypes');
var RelayRoute = require('./RelayRoute');
var RelayStore = require('./RelayStore');

// Dummy Route
/* $FlowFixMe(>=0.54.0) This comment suppresses an error
 * found when Flow v0.54 was deployed. To see the error delete this comment and
 * run Flow. */

var QueryConfig = function (_RelayRoute) {
  (0, _inherits3['default'])(QueryConfig, _RelayRoute);

  function QueryConfig() {
    (0, _classCallCheck3['default'])(this, QueryConfig);
    return (0, _possibleConstructorReturn3['default'])(this, _RelayRoute.apply(this, arguments));
  }

  return QueryConfig;
}(RelayRoute);

QueryConfig.routeName = 'ForceRelayClassicContextRoute';
QueryConfig.queries = {};

/**
 * This wrapper will provide dummy RelayContainer context to it's children. It
 * should only be used as a wrapper around RelayContainers that have not been
 * converted to one of the compatibility container and are not fetching data.
 */

var ForceRelayClassicContext = function (_React$Component) {
  (0, _inherits3['default'])(ForceRelayClassicContext, _React$Component);

  function ForceRelayClassicContext() {
    (0, _classCallCheck3['default'])(this, ForceRelayClassicContext);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  ForceRelayClassicContext.prototype.getChildContext = function getChildContext() {
    return {
      relay: {
        environment: RelayStore,
        variables: {}
      },
      route: new QueryConfig()
    };
  };

  ForceRelayClassicContext.prototype.render = function render() {
    return this.props.children;
  };

  return ForceRelayClassicContext;
}(React.Component);

ForceRelayClassicContext.childContextTypes = {
  relay: RelayPropTypes.ClassicRelay,
  route: RelayPropTypes.QueryConfig.isRequired
};


module.exports = ForceRelayClassicContext;