/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayMockRenderer
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

var PropTypes = require('prop-types');
var React = require('react');
var RelayEnvironment = require('./RelayEnvironment');
var RelayPropTypes = require('./RelayPropTypes');

/**
 * A helper for rendering RelayContainers with mock data, outside of a
 * RelayRootContainer/RelayRenderer. This is intended for use in unit tests or
 * component browser-style interfaces.
 *
 * Note: For unit tests, you may need to mock `ReactDOM` as follows:
 *
 * ```
 * jest.mock('ReactDOM', () => ({}));
 * ```
 *
 * Currently ReactDOM and ReactTestRenderer cannot both be loaded in the same
 * test, and Relay transitively includes ReactDOM under its default settings.
 */

var RelayMockRenderer = function (_React$Component) {
  (0, _inherits3['default'])(RelayMockRenderer, _React$Component);

  function RelayMockRenderer() {
    (0, _classCallCheck3['default'])(this, RelayMockRenderer);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this));

    _this.mockContext = {
      relay: {
        environment: new RelayEnvironment(),
        variables: {}
      },
      route: {
        name: '$RelayMockRenderer',
        params: {},
        queries: {},
        useMockData: true
      },
      useFakeData: true
    };
    return _this;
  }

  RelayMockRenderer.prototype.getChildContext = function getChildContext() {
    return this.mockContext;
  };

  RelayMockRenderer.prototype.render = function render() {
    return this.props.render();
  };

  return RelayMockRenderer;
}(React.Component);

RelayMockRenderer.childContextTypes = {
  relay: RelayPropTypes.ClassicRelay,
  route: RelayPropTypes.QueryConfig.isRequired,
  useFakeData: PropTypes.bool
};


module.exports = RelayMockRenderer;