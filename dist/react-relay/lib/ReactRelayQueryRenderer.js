/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactRelayQueryRenderer
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
var RelayPropTypes = require('./RelayPropTypes');

var areEqual = require('fbjs/lib/areEqual');
var deepFreeze = require('./deepFreeze');

/**
 * @public
 *
 * Orchestrates fetching and rendering data for a single view or view hierarchy:
 * - Fetches the query/variables using the given network implementation.
 * - Normalizes the response(s) to that query, publishing them to the given
 *   store.
 * - Renders the pending/fail/success states with the provided render function.
 * - Subscribes for updates to the root data and re-renders with any changes.
 */
var ReactRelayQueryRenderer = function (_React$Component) {
  (0, _inherits3['default'])(ReactRelayQueryRenderer, _React$Component);

  function ReactRelayQueryRenderer(props, context) {
    (0, _classCallCheck3['default'])(this, ReactRelayQueryRenderer);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

    _this._onChange = function (snapshot) {
      _this.setState({
        readyState: (0, _extends3['default'])({}, _this.state.readyState, {
          props: snapshot.data
        })
      });
    };

    _this._pendingFetch = null;
    _this._rootSubscription = null;
    _this._selectionReference = null;

    _this.state = {
      readyState: _this._fetchForProps(props)
    };
    return _this;
  }

  ReactRelayQueryRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query || nextProps.environment !== this.props.environment || !areEqual(nextProps.variables, this.props.variables)) {
      this.setState({
        readyState: this._fetchForProps(nextProps)
      });
    }
  };

  ReactRelayQueryRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
    this._release();
  };

  ReactRelayQueryRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.render !== this.props.render || nextState.readyState !== this.state.readyState;
  };

  ReactRelayQueryRenderer.prototype._release = function _release() {
    if (this._pendingFetch) {
      this._pendingFetch.dispose();
      this._pendingFetch = null;
    }
    if (this._rootSubscription) {
      this._rootSubscription.dispose();
      this._rootSubscription = null;
    }
    if (this._selectionReference) {
      this._selectionReference.dispose();
      this._selectionReference = null;
    }
  };

  ReactRelayQueryRenderer.prototype._fetchForProps = function _fetchForProps(props) {
    // TODO (#16225453) QueryRenderer works with old and new environment, but
    // the flow typing doesn't quite work abstracted.
    var environment = props.environment;

    var query = props.query,
        variables = props.variables;

    if (query) {
      var _environment$unstable = environment.unstable_internal,
          createOperationSelector = _environment$unstable.createOperationSelector,
          getOperation = _environment$unstable.getOperation;

      var operation = createOperationSelector(getOperation(query), variables);
      this._relayContext = {
        environment: environment,
        variables: operation.variables
      };
      return this._fetch(operation, props.cacheConfig) || getDefaultState();
    } else {
      this._relayContext = {
        environment: environment,
        variables: variables
      };
      this._release();
      return {
        error: null,
        props: {},
        retry: null
      };
    }
  };

  ReactRelayQueryRenderer.prototype._fetch = function _fetch(operation, cacheConfig) {
    var _this2 = this;

    var environment = this._relayContext.environment;

    // Immediately retain the results of the new query to prevent relevant data
    // from being freed. This is not strictly required if all new data is
    // fetched in a single step, but is necessary if the network could attempt
    // to incrementally load data (ex: multiple query entries or incrementally
    // loading records from disk cache).

    var nextReference = environment.retain(operation.root);

    var readyState = getDefaultState();
    var snapshot = void 0; // results of the root fragment
    var hasSyncResult = false;
    var hasFunctionReturned = false;

    if (this._pendingFetch) {
      this._pendingFetch.dispose();
    }
    if (this._rootSubscription) {
      this._rootSubscription.dispose();
    }

    var request = environment.execute({ operation: operation, cacheConfig: cacheConfig })['finally'](function () {
      _this2._pendingFetch = null;
    }).subscribe({
      next: function next() {
        // `next` can be called multiple times by network layers that support
        // data subscriptions. Wait until the first payload to render `props`
        // and subscribe for data updates.
        if (snapshot) {
          return;
        }
        snapshot = environment.lookup(operation.fragment);
        readyState = {
          error: null,
          props: snapshot.data,
          retry: function retry() {
            // Do not reset the default state if refetching after success,
            // handling the case where _fetch may return syncronously instead
            // of calling setState.
            var syncReadyState = _this2._fetch(operation, cacheConfig);
            if (syncReadyState) {
              _this2.setState({ readyState: syncReadyState });
            }
          }
        };

        if (_this2._selectionReference) {
          _this2._selectionReference.dispose();
        }
        _this2._rootSubscription = environment.subscribe(snapshot, _this2._onChange);
        _this2._selectionReference = nextReference;
        // This line should be called only once.
        hasSyncResult = true;
        if (hasFunctionReturned) {
          _this2.setState({ readyState: readyState });
        }
      },
      error: function (_error) {
        function error(_x) {
          return _error.apply(this, arguments);
        }

        error.toString = function () {
          return _error.toString();
        };

        return error;
      }(function (error) {
        readyState = {
          error: error,
          props: null,
          retry: function retry() {
            // Return to the default state when retrying after an error,
            // handling the case where _fetch may return syncronously instead
            // of calling setState.
            var syncReadyState = _this2._fetch(operation, cacheConfig);
            _this2.setState({ readyState: syncReadyState || getDefaultState() });
          }
        };
        if (_this2._selectionReference) {
          _this2._selectionReference.dispose();
        }
        _this2._selectionReference = nextReference;
        hasSyncResult = true;
        if (hasFunctionReturned) {
          _this2.setState({ readyState: readyState });
        }
      })
    });

    this._pendingFetch = {
      dispose: function dispose() {
        request.unsubscribe();
        nextReference.dispose();
      }
    };
    hasFunctionReturned = true;
    return hasSyncResult ? readyState : null;
  };

  ReactRelayQueryRenderer.prototype.getChildContext = function getChildContext() {
    return {
      relay: this._relayContext
    };
  };

  ReactRelayQueryRenderer.prototype.render = function render() {
    // Note that the root fragment results in `readyState.props` is already
    // frozen by the store; this call is to freeze the readyState object and
    // error property if set.
    if (process.env.NODE_ENV !== 'production') {
      deepFreeze(this.state.readyState);
    }
    return this.props.render(this.state.readyState);
  };

  return ReactRelayQueryRenderer;
}(React.Component);

ReactRelayQueryRenderer.childContextTypes = {
  relay: RelayPropTypes.Relay
};

function getDefaultState() {
  return {
    error: null,
    props: null,
    retry: null
  };
}

module.exports = ReactRelayQueryRenderer;