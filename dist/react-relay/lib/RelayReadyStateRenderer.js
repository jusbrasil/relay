/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayReadyStateRenderer
 * 
 * @format
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
var RelayStaticContainer = require('./RelayStaticContainer');

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

    _this._relay = {
      environment: props.environment,
      variables: props.queryConfig.params
    };
    _this.state = {
      getContainerProps: createContainerPropsFactory()
    };
    return _this;
  }

  RelayReadyStateRenderer.prototype.getChildContext = function getChildContext() {
    return {
      relay: this._relay,
      route: this.props.queryConfig
    };
  };

  RelayReadyStateRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.environment !== nextProps.environment || this.props.queryConfig !== nextProps.queryConfig) {
      this._relay = {
        environment: nextProps.environment,
        variables: nextProps.queryConfig.params
      };
    }
  };

  /**
   * Avoid updating when we have fetched data but are still not ready.
   */


  RelayReadyStateRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var prevProps = this.props;
    if (prevProps.Container !== nextProps.Container || prevProps.environment !== nextProps.environment || prevProps.queryConfig !== nextProps.queryConfig || prevProps.render !== nextProps.render || prevProps.retry !== nextProps.retry) {
      return true;
    }
    var prevReadyState = prevProps.readyState;
    var nextReadyState = nextProps.readyState;
    if (prevReadyState == null || nextReadyState == null) {
      return true;
    }
    if (prevReadyState.aborted !== nextReadyState.aborted || prevReadyState.done !== nextReadyState.done || prevReadyState.error !== nextReadyState.error || prevReadyState.ready !== nextReadyState.ready || prevReadyState.stale !== nextReadyState.stale) {
      return true;
    }
    return nextReadyState.ready;
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
      RelayStaticContainer,
      { shouldUpdate: shouldUpdate },
      children
    );
  };

  return RelayReadyStateRenderer;
}(React.Component);

RelayReadyStateRenderer.childContextTypes = {
  relay: RelayPropTypes.ClassicRelay,
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