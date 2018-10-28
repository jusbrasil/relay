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

var ReactRelayFragmentMockRenderer = function (_React$Component) {
  (0, _inherits3['default'])(ReactRelayFragmentMockRenderer, _React$Component);

  function ReactRelayFragmentMockRenderer(props) {
    (0, _classCallCheck3['default'])(this, ReactRelayFragmentMockRenderer);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this));

    _this.mockContext = {
      relay: {
        environment: props.environment,
        variables: {}
      }
    };
    return _this;
  }

  ReactRelayFragmentMockRenderer.prototype.getChildContext = function getChildContext() {
    return this.mockContext;
  };

  ReactRelayFragmentMockRenderer.prototype.render = function render() {
    return this.props.render();
  };

  return ReactRelayFragmentMockRenderer;
}(React.Component);

ReactRelayFragmentMockRenderer.childContextTypes = {
  relay: RelayPropTypes.Relay
};


module.exports = ReactRelayFragmentMockRenderer;