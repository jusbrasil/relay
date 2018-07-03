/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayReadyStateRenderer
 * 
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var React = require('react');

var RelayFragmentPointer = require('./RelayFragmentPointer');

var RelayPropTypes = require('./RelayPropTypes');

var StaticContainer = require('react-static-container');

var getRelayQueries = require('./getRelayQueries');
var mapObject = require('fbjs/lib/mapObject');

/**
 * @public
 *
 * RelayReadyStateRenderer synchronously renders a container and query config
 * given `readyState`. The `readyState` must be an accurate representation of
 * the data that currently resides in the supplied `environment`. If you need
 * data to be fetched in addition to rendering, please use `RelayRenderer`.
 *
 * If `readyState` is not supplied, the previously rendered `readyState` will
 * continue to be rendered (or null if there is no previous `readyState`).
 */
var RelayReadyStateRenderer = function (_React$Component) {
  (0, _inherits3['default'])(RelayReadyStateRenderer, _React$Component);

  function RelayReadyStateRenderer(props, context) {
    (0, _classCallCheck3['default'])(this, RelayReadyStateRenderer);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

    _this.state = {
      getContainerProps: createContainerPropsFactory()
    };
    return _this;
  }

  RelayReadyStateRenderer.prototype.getChildContext = function getChildContext() {
    return {
      relay: this.props.environment,
      route: this.props.queryConfig
    };
  };

  RelayReadyStateRenderer.prototype.render = function render() {
    var children = void 0;
    var shouldUpdate = false;

    var _props = this.props,
        readyState = _props.readyState,
        render = _props.render;

    if (readyState) {
      if (render) {
        children = render({
          done: readyState.done,
          error: readyState.error,
          events: readyState.events,
          props: readyState.ready ? this.state.getContainerProps(this.props) : null,
          retry: this.props.retry,
          stale: readyState.stale
        });
      } else if (readyState.ready) {
        var _Container = this.props.Container;

        children = React.createElement(_Container, this.state.getContainerProps(this.props));
      }
      shouldUpdate = true;
    }
    if (children === undefined) {
      children = null;
      shouldUpdate = false;
    }
    return React.createElement(
      StaticContainer,
      { shouldUpdate: shouldUpdate },
      children
    );
  };

  return RelayReadyStateRenderer;
}(React.Component);

RelayReadyStateRenderer.childContextTypes = {
  relay: RelayPropTypes.Environment,
  route: RelayPropTypes.QueryConfig.isRequired
};


function createContainerPropsFactory() {
  var prevProps = void 0;
  var querySet = void 0;

  return function (nextProps) {
    if (!querySet || !prevProps || prevProps.Container !== nextProps.Container || prevProps.queryConfig !== nextProps.queryConfig) {
      querySet = getRelayQueries(nextProps.Container, nextProps.queryConfig);
    }
    var containerProps = (0, _extends3['default'])({}, nextProps.queryConfig.params, mapObject(querySet, function (query) {
      return createFragmentPointerForRoot(nextProps.environment, query);
    }));
    prevProps = nextProps;
    return containerProps;
  };
}

function createFragmentPointerForRoot(environment, query) {
  return query ? RelayFragmentPointer.createForRoot(environment.getStoreData().getQueuedStore(), query) : null;
}

module.exports = RelayReadyStateRenderer;