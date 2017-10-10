/**
 * Relay v1.4.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/extends"), require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/possibleConstructorReturn"), require("fbjs/lib/areEqual"), require("fbjs/lib/invariant"), require("react"), require("relay-runtime"), require("fbjs/lib/nullthrows"), require("babel-runtime/helpers/defineProperty"), require("fbjs/lib/emptyFunction"), require("fbjs/lib/mapObject"), require("fbjs/lib/removeFromArray"), require("fbjs/lib/sprintf"), require("fbjs/lib/warning"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-runtime/helpers/classCallCheck", "babel-runtime/helpers/extends", "babel-runtime/helpers/inherits", "babel-runtime/helpers/possibleConstructorReturn", "fbjs/lib/areEqual", "fbjs/lib/invariant", "react", "relay-runtime", "fbjs/lib/nullthrows", "babel-runtime/helpers/defineProperty", "fbjs/lib/emptyFunction", "fbjs/lib/mapObject", "fbjs/lib/removeFromArray", "fbjs/lib/sprintf", "fbjs/lib/warning", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["ReactRelay"] = factory(require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/extends"), require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/possibleConstructorReturn"), require("fbjs/lib/areEqual"), require("fbjs/lib/invariant"), require("react"), require("relay-runtime"), require("fbjs/lib/nullthrows"), require("babel-runtime/helpers/defineProperty"), require("fbjs/lib/emptyFunction"), require("fbjs/lib/mapObject"), require("fbjs/lib/removeFromArray"), require("fbjs/lib/sprintf"), require("fbjs/lib/warning"), require("prop-types"));
	else
		root["ReactRelay"] = factory(root["babel-runtime/helpers/classCallCheck"], root["babel-runtime/helpers/extends"], root["babel-runtime/helpers/inherits"], root["babel-runtime/helpers/possibleConstructorReturn"], root["fbjs/lib/areEqual"], root["fbjs/lib/invariant"], root["react"], root["relay-runtime"], root["fbjs/lib/nullthrows"], root["babel-runtime/helpers/defineProperty"], root["fbjs/lib/emptyFunction"], root["fbjs/lib/mapObject"], root["fbjs/lib/removeFromArray"], root["fbjs/lib/sprintf"], root["fbjs/lib/warning"], root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_30__, __WEBPACK_EXTERNAL_MODULE_31__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_33__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactRelayPublic
	 * 
	 * @format
	 */

	'use strict';

	var ReactRelayFragmentContainer = __webpack_require__(18);
	var ReactRelayPaginationContainer = __webpack_require__(19);
	var ReactRelayQueryRenderer = __webpack_require__(20);
	var ReactRelayRefetchContainer = __webpack_require__(21);

	var _require = __webpack_require__(12),
	    commitLocalUpdate = _require.commitLocalUpdate,
	    commitMutation = _require.commitMutation,
	    fetchQuery = _require.fetchQuery,
	    graphql = _require.graphql,
	    requestSubscription = _require.requestSubscription;

	/**
	 * The public interface to React Relay.
	 */
	module.exports = {
	  QueryRenderer: ReactRelayQueryRenderer,
	  createFragmentContainer: ReactRelayFragmentContainer.createContainer,
	  createPaginationContainer: ReactRelayPaginationContainer.createContainer,
	  createRefetchContainer: ReactRelayRefetchContainer.createContainer,
	  commitLocalUpdate: commitLocalUpdate,
	  commitMutation: commitMutation,
	  fetchQuery: fetchQuery,
	  graphql: graphql,
	  requestSubscription: requestSubscription
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayPropTypes
	 * 
	 * @format
	 */

	'use strict';

	var PropTypes = __webpack_require__(33);

	var isClassicRelayEnvironment = __webpack_require__(24);
	var isRelayContainer = __webpack_require__(25);
	var isRelayContext = __webpack_require__(4);
	var isRelayEnvironment = __webpack_require__(17);
	var sprintf = __webpack_require__(31);

	var RelayPropTypes = {
	  Container: function Container(props, propName, componentName) {
	    var component = props[propName];
	    if (component == null) {
	      return new Error(sprintf('Required prop `%s` was not specified in `%s`.', propName, componentName));
	    } else if (!isRelayContainer(component)) {
	      return new Error(sprintf('Invalid prop `%s` supplied to `%s`, expected a RelayContainer.', propName, componentName));
	    }
	    return null;
	  },
	  Environment: function Environment(props, propName, componentName) {
	    var context = props[propName];
	    if (!isClassicRelayEnvironment(context) || !isRelayEnvironment(context)) {
	      return new Error(sprintf('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object conforming to the `RelayEnvironment` interface.', propName, componentName, context));
	    }
	    return null;
	  },


	  QueryConfig: PropTypes.shape({
	    name: PropTypes.string.isRequired,
	    params: PropTypes.object.isRequired,
	    queries: PropTypes.object.isRequired
	  }),

	  ClassicRelay: function ClassicRelay(props, propName, componentName) {
	    var relay = props[propName];
	    if (!isRelayContext(relay) || !isClassicRelayEnvironment(relay.environment)) {
	      return new Error(sprintf('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object with a classic `environment` implementation and `variables`.', propName, componentName, relay));
	    }
	    return null;
	  },
	  Relay: function Relay(props, propName, componentName) {
	    var relay = props[propName];
	    if (!isRelayContext(relay)) {
	      return new Error(sprintf('Invalid prop/context `%s` supplied to `%s`, expected `%s` to be ' + 'an object with an `environment` and `variables`.', propName, componentName, relay));
	    }
	    return null;
	  }
	};

	module.exports = RelayPropTypes;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayContainerUtils
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * @internal
	 *
	 * Helper for checking if this is a React Component
	 * created with React.Component or React.createClass().
	 */

	function isReactComponent(component) {
	  return !!(component && typeof component.prototype === 'object' && component.prototype && component.prototype.isReactComponent);
	}

	function getReactComponent(Component) {
	  if (isReactComponent(Component)) {
	    return Component;
	  } else {
	    return null;
	  }
	}

	function getComponentName(Component) {
	  var name = void 0;
	  var ComponentClass = getReactComponent(Component);
	  if (ComponentClass) {
	    name = ComponentClass.displayName || ComponentClass.name;
	  } else if (typeof Component === 'function') {
	    // This is a stateless functional component.
	    name = Component.displayName || Component.name || 'StatelessComponent';
	  } else {
	    name = 'ReactElement';
	  }
	  return String(name);
	}

	function getContainerName(Component) {
	  return 'Relay(' + getComponentName(Component) + ')';
	}

	module.exports = {
	  getComponentName: getComponentName,
	  getContainerName: getContainerName,
	  getReactComponent: getReactComponent
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayProfiler
	 * 
	 * @format
	 */

	'use strict';

	var emptyFunction = __webpack_require__(28);
	var removeFromArray = __webpack_require__(30);

	var aggregateHandlersByName = {
	  '*': []
	};
	var profileHandlersByName = {
	  '*': []
	};

	var NOT_INVOKED = {};
	var defaultProfiler = { stop: emptyFunction };
	var shouldInstrument = function shouldInstrument(name) {
	  if (true) {
	    return true;
	  }
	  return name.charAt(0) !== '@';
	};

	/**
	 * @public
	 *
	 * Instruments methods to allow profiling various parts of Relay. Profiling code
	 * in Relay consists of three steps:
	 *
	 *  - Instrument the function to be profiled.
	 *  - Attach handlers to the instrumented function.
	 *  - Run the code which triggers the handlers.
	 *
	 * Handlers attached to instrumented methods are called with an instrumentation
	 * name and a callback that must be synchronously executed:
	 *
	 *   instrumentedMethod.attachHandler(function(name, callback) {
	 *     const start = performance.now();
	 *     callback();
	 *     console.log('Duration', performance.now() - start);
	 *   });
	 *
	 * Handlers for profiles are callbacks that return a stop method:
	 *
	 *   RelayProfiler.attachProfileHandler('profileName', (name, state) => {
	 *     const start = performance.now();
	 *     return function stop(name, state) {
	 *       console.log(`Duration (${name})`, performance.now() - start);
	 *     }
	 *   });
	 *
	 * In order to reduce the impact on performance in production, instrumented
	 * methods and profilers with names that begin with `@` will only be measured
	 * if `__DEV__` is true. This should be used for very hot functions.
	 */
	var RelayProfiler = {
	  /**
	   * Instruments methods on a class or object. This re-assigns the method in
	   * order to preserve function names in stack traces (which are detected by
	   * modern debuggers via heuristics). Example usage:
	   *
	   *   const RelayStore = { primeCache: function() {...} };
	   *   RelayProfiler.instrumentMethods(RelayStore, {
	   *     primeCache: 'RelayStore.primeCache'
	   *   });
	   *
	   *   RelayStore.primeCache.attachHandler(...);
	   *
	   * As a result, the methods will be replaced by wrappers that provide the
	   * `attachHandler` and `detachHandler` methods.
	   */
	  instrumentMethods: function instrumentMethods(object, names) {
	    for (var _key in names) {
	      if (names.hasOwnProperty(_key)) {
	        object[_key] = RelayProfiler.instrument(names[_key], object[_key]);
	      }
	    }
	  },


	  /**
	   * Wraps the supplied function with one that provides the `attachHandler` and
	   * `detachHandler` methods. Example usage:
	   *
	   *   const printRelayQuery =
	   *     RelayProfiler.instrument('printRelayQuery', printRelayQuery);
	   *
	   *   printRelayQuery.attachHandler(...);
	   *
	   * NOTE: The instrumentation assumes that no handlers are attached or detached
	   * in the course of executing another handler.
	   */
	  instrument: function instrument(name, originalFunction) {
	    if (!shouldInstrument(name)) {
	      originalFunction.attachHandler = emptyFunction;
	      originalFunction.detachHandler = emptyFunction;
	      return originalFunction;
	    }
	    if (!aggregateHandlersByName.hasOwnProperty(name)) {
	      aggregateHandlersByName[name] = [];
	    }
	    var catchallHandlers = aggregateHandlersByName['*'];
	    var aggregateHandlers = aggregateHandlersByName[name];
	    var handlers = [];
	    var contexts = [];
	    var invokeHandlers = function invokeHandlers() {
	      var context = contexts[contexts.length - 1];
	      if (context[0]) {
	        context[0]--;
	        catchallHandlers[context[0]](name, invokeHandlers);
	      } else if (context[1]) {
	        context[1]--;
	        aggregateHandlers[context[1]](name, invokeHandlers);
	      } else if (context[2]) {
	        context[2]--;
	        handlers[context[2]](name, invokeHandlers);
	      } else {
	        context[5] = originalFunction.apply(context[3], context[4]);
	      }
	    };
	    var instrumentedCallback = function instrumentedCallback() {
	      var returnValue = void 0;
	      if (aggregateHandlers.length === 0 && handlers.length === 0 && catchallHandlers.length === 0) {
	        returnValue = originalFunction.apply(this, arguments);
	      } else {
	        contexts.push([catchallHandlers.length, aggregateHandlers.length, handlers.length, this, arguments, NOT_INVOKED]);
	        invokeHandlers();
	        var context = contexts.pop();
	        returnValue = context[5];
	        if (returnValue === NOT_INVOKED) {
	          throw new Error('RelayProfiler: Handler did not invoke original function.');
	        }
	      }
	      return returnValue;
	    };
	    instrumentedCallback.attachHandler = function (handler) {
	      handlers.push(handler);
	    };
	    instrumentedCallback.detachHandler = function (handler) {
	      removeFromArray(handlers, handler);
	    };
	    instrumentedCallback.displayName = '(instrumented ' + name + ')';
	    return instrumentedCallback;
	  },


	  /**
	   * Attaches a handler to all methods instrumented with the supplied name.
	   *
	   *   function createRenderer() {
	   *     return RelayProfiler.instrument('render', function() {...});
	   *   }
	   *   const renderA = createRenderer();
	   *   const renderB = createRenderer();
	   *
	   *   // Only profiles `renderA`.
	   *   renderA.attachHandler(...);
	   *
	   *   // Profiles both `renderA` and `renderB`.
	   *   RelayProfiler.attachAggregateHandler('render', ...);
	   *
	   */
	  attachAggregateHandler: function attachAggregateHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (!aggregateHandlersByName.hasOwnProperty(name)) {
	        aggregateHandlersByName[name] = [];
	      }
	      aggregateHandlersByName[name].push(handler);
	    }
	  },


	  /**
	   * Detaches a handler attached via `attachAggregateHandler`.
	   */
	  detachAggregateHandler: function detachAggregateHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (aggregateHandlersByName.hasOwnProperty(name)) {
	        removeFromArray(aggregateHandlersByName[name], handler);
	      }
	    }
	  },


	  /**
	   * Instruments profiling for arbitrarily asynchronous code by a name.
	   *
	   *   const timerProfiler = RelayProfiler.profile('timeout');
	   *   setTimeout(function() {
	   *     timerProfiler.stop();
	   *   }, 1000);
	   *
	   *   RelayProfiler.attachProfileHandler('timeout', ...);
	   *
	   * Arbitrary state can also be passed into `profile` as a second argument. The
	   * attached profile handlers will receive this as the second argument.
	   */
	  profile: function profile(name, state) {
	    var hasCatchAllHandlers = profileHandlersByName['*'].length > 0;
	    var hasNamedHandlers = profileHandlersByName.hasOwnProperty(name);
	    if (hasNamedHandlers || hasCatchAllHandlers) {
	      var profileHandlers = hasNamedHandlers && hasCatchAllHandlers ? profileHandlersByName[name].concat(profileHandlersByName['*']) : hasNamedHandlers ? profileHandlersByName[name] : profileHandlersByName['*'];
	      var stopHandlers = void 0;
	      for (var ii = profileHandlers.length - 1; ii >= 0; ii--) {
	        var profileHandler = profileHandlers[ii];
	        var stopHandler = profileHandler(name, state);
	        stopHandlers = stopHandlers || [];
	        stopHandlers.unshift(stopHandler);
	      }
	      return {
	        stop: function stop() {
	          if (stopHandlers) {
	            stopHandlers.forEach(function (stopHandler) {
	              return stopHandler();
	            });
	          }
	        }
	      };
	    }
	    return defaultProfiler;
	  },


	  /**
	   * Attaches a handler to profiles with the supplied name. You can also
	   * attach to the special name '*' which is a catch all.
	   */
	  attachProfileHandler: function attachProfileHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (!profileHandlersByName.hasOwnProperty(name)) {
	        profileHandlersByName[name] = [];
	      }
	      profileHandlersByName[name].push(handler);
	    }
	  },


	  /**
	   * Detaches a handler attached via `attachProfileHandler`.
	   */
	  detachProfileHandler: function detachProfileHandler(name, handler) {
	    if (shouldInstrument(name)) {
	      if (profileHandlersByName.hasOwnProperty(name)) {
	        removeFromArray(profileHandlersByName[name], handler);
	      }
	    }
	  }
	};

	module.exports = RelayProfiler;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule isRelayContext
	 * 
	 * @format
	 */

	'use strict';

	var isRelayEnvironment = __webpack_require__(17);
	var isRelayVariables = __webpack_require__(26);

	/**
	 * Determine if the input is a plain object that matches the `RelayContext`
	 * type defined in `RelayEnvironmentTypes`.
	 */
	function isRelayContext(context) {
	  return typeof context === 'object' && context !== null && !Array.isArray(context) && isRelayEnvironment(context.environment) && isRelayVariables(context.variables);
	}

	module.exports = isRelayContext;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactRelayContainerProfiler
	 * 
	 * @format
	 */

	'use strict';

	var RelayProfiler = __webpack_require__(3);

	function profileContainer(Container, containerName) {
	  /* $FlowFixMe(>=0.53.0) This comment suppresses an error
	   * when upgrading Flow's support for React. Common errors found when
	   * upgrading Flow's React support are documented at
	   * https://fburl.com/eq7bs81w */
	  RelayProfiler.instrumentMethods(Container.prototype, {
	    constructor: containerName + '.prototype.constructor',
	    componentWillReceiveProps: containerName + '.prototype.componentWillReceiveProps',
	    componentWillUnmount: containerName + '.prototype.componentWillUnmount',
	    shouldComponentUpdate: containerName + '.prototype.shouldComponentUpdate'
	  });
	}

	module.exports = { profileContainer: profileContainer };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule buildReactRelayContainer
	 * 
	 * @format
	 */

	'use strict';

	var RelayPropTypes = __webpack_require__(1);

	var assertFragmentMap = __webpack_require__(22);
	var mapObject = __webpack_require__(29);

	var _require = __webpack_require__(2),
	    getComponentName = _require.getComponentName,
	    getContainerName = _require.getContainerName;

	var containerContextTypes = {
	  relay: RelayPropTypes.Relay
	};

	/**
	 * Creates a component class whose instances adapt to the
	 * `context.relay.environment` in which they are rendered and which have the
	 * necessary static methods (`getFragment()` etc) to be composed within classic
	 * `Relay.Containers`.
	 */
	function buildReactRelayContainer(ComponentClass, fragmentSpec, createContainerWithFragments) {
	  // Sanity-check user-defined fragment input
	  var containerName = getContainerName(ComponentClass);
	  assertFragmentMap(getComponentName(ComponentClass), fragmentSpec);

	  // Memoize a container for the last environment instance encountered
	  var environment = void 0;
	  var Container = void 0;
	  function ContainerConstructor(props, context) {
	    if (Container == null || context.relay.environment !== environment) {
	      environment = context.relay.environment;
	      if (true) {
	        var _require2 = __webpack_require__(12),
	            isRelayModernEnvironment = _require2.isRelayModernEnvironment;

	        if (!isRelayModernEnvironment(environment)) {
	          throw new Error('RelayModernContainer: Can only use Relay Modern component ' + (containerName + ' in a Relay Modern environment!\n') + 'When using Relay Modern and Relay Classic in the same ' + 'application, ensure components use Relay Compat to work in ' + 'both environments.\n' + 'See: http://facebook.github.io/relay/docs/relay-compat.html');
	        }
	      }
	      var getFragmentFromTag = environment.unstable_internal.getFragment;

	      var _fragments = mapObject(fragmentSpec, getFragmentFromTag);
	      Container = createContainerWithFragments(ComponentClass, _fragments);
	    }
	    /* $FlowFixMe(>=0.53.0) This comment suppresses an
	     * error when upgrading Flow's support for React. Common errors found when
	     * upgrading Flow's React support are documented at
	     * https://fburl.com/eq7bs81w */
	    return new Container(props, context);
	  }
	  ContainerConstructor.contextTypes = containerContextTypes;
	  ContainerConstructor.displayName = containerName;

	  if (true) {
	    // Classic container static methods.
	    ContainerConstructor.getFragment = function getFragmentOnModernContainer() {
	      throw new Error('RelayModernContainer: ' + containerName + '.getFragment() was called on ' + 'a Relay Modern component by a Relay Classic or Relay Compat ' + 'component.\n' + 'When using Relay Modern and Relay Classic in the same ' + 'application, ensure components use Relay Compat to work in ' + 'both environments.\n' + 'See: http://facebook.github.io/relay/docs/relay-compat.html');
	    };
	  }

	  return ContainerConstructor;
	}

	module.exports = buildReactRelayContainer;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @providesModule isScalarAndEqual
	 * @format
	 */

	'use strict';

	/**
	 * A fast test to determine if two values are equal scalars:
	 * - compares scalars such as booleans, strings, numbers by value
	 * - compares functions by identity
	 * - returns false for complex values, since these cannot be cheaply tested for
	 *   equality (use `areEquals` instead)
	 */

	function isScalarAndEqual(valueA, valueB) {
	  return valueA === valueB && (valueA === null || typeof valueA !== 'object');
	}

	module.exports = isScalarAndEqual;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule isRelayEnvironment
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if a given value is an object that implements the `Environment`
	 * interface defined in `RelayEnvironmentTypes`.
	 */

	function isRelayEnvironment(environment) {
	  return typeof environment === 'object' && environment !== null &&
	  // TODO: add applyMutation/sendMutation once ready in both cores
	  typeof environment.lookup === 'function' && typeof environment.retain === 'function' && typeof environment.sendQuery === 'function' && typeof environment.execute === 'function' && typeof environment.subscribe === 'function';
	}

	module.exports = isRelayEnvironment;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactRelayFragmentContainer
	 * 
	 * @format
	 */

	'use strict';

	var _extends2 = __webpack_require__(6);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(8);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(7);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(11);
	var RelayProfiler = __webpack_require__(3);
	var RelayPropTypes = __webpack_require__(1);

	var areEqual = __webpack_require__(9);
	var buildReactRelayContainer = __webpack_require__(14);
	var invariant = __webpack_require__(10);
	var isRelayContext = __webpack_require__(4);
	var isScalarAndEqual = __webpack_require__(15);
	var nullthrows = __webpack_require__(16);

	var _require = __webpack_require__(13),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(2),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var containerContextTypes = {
	  relay: RelayPropTypes.Relay
	};

	/**
	 * Composes a React component class, returning a new class that intercepts
	 * props, resolving them with the provided fragments and subscribing for
	 * updates.
	 */
	function createContainerWithFragments(Component, fragments) {
	  var ComponentClass = getReactComponent(Component);
	  var componentName = getComponentName(Component);
	  var containerName = 'Relay(' + componentName + ')';

	  var Container = function (_React$Component) {
	    (0, _inherits3['default'])(Container, _React$Component);

	    function Container(props, context) {
	      (0, _classCallCheck3['default'])(this, Container);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	      _this._handleFragmentDataUpdate = function () {
	        var data = _this._resolver.resolve();
	        var profiler = RelayProfiler.profile('ReactRelayFragmentContainer.handleFragmentDataUpdate');
	        _this.setState({ data: data }, profiler.stop);
	      };

	      var relay = assertRelayContext(context.relay);
	      var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	      _this._resolver = createFragmentSpecResolver(relay, containerName, fragments, props, _this._handleFragmentDataUpdate);
	      _this.state = {
	        data: _this._resolver.resolve(),
	        relayProp: {
	          environment: relay.environment
	        }
	      };
	      return _this;
	    }

	    /**
	     * When new props are received, read data for the new props and subscribe
	     * for updates. Props may be the same in which case previous data and
	     * subscriptions can be reused.
	     */


	    Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var context = nullthrows(nextContext);
	      var relay = assertRelayContext(context.relay);
	      var _relay$environment$un = relay.environment.unstable_internal,
	          createFragmentSpecResolver = _relay$environment$un.createFragmentSpecResolver,
	          getDataIDsFromObject = _relay$environment$un.getDataIDsFromObject;

	      var prevIDs = getDataIDsFromObject(fragments, this.props);
	      var nextIDs = getDataIDsFromObject(fragments, nextProps);
	      // If the environment has changed or props point to new records then
	      // previously fetched data and any pending fetches no longer apply:
	      // - Existing references are on the old environment.
	      // - Existing references are based on old variables.
	      // - Pending fetches are for the previous records.
	      if (this.context.relay.environment !== relay.environment || this.context.relay.variables !== relay.variables || !areEqual(prevIDs, nextIDs)) {
	        this._resolver.dispose();
	        this._resolver = createFragmentSpecResolver(relay, containerName, fragments, nextProps, this._handleFragmentDataUpdate);
	        var _relayProp = {
	          environment: relay.environment
	        };
	        this.setState({ relayProp: _relayProp });
	      } else {
	        this._resolver.setProps(nextProps);
	      }
	      var data = this._resolver.resolve();
	      if (data !== this.state.data) {
	        this.setState({ data: data });
	      }
	    };

	    Container.prototype.componentWillUnmount = function componentWillUnmount() {
	      this._resolver.dispose();
	    };

	    Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Short-circuit if any Relay-related data has changed
	      if (nextContext.relay !== this.context.relay || nextState.data !== this.state.data) {
	        return true;
	      }
	      // Otherwise, for convenience short-circuit if all non-Relay props
	      // are scalar and equal
	      var keys = Object.keys(nextProps);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var _key = keys[ii];
	        if (!fragments.hasOwnProperty(_key) && !isScalarAndEqual(nextProps[_key], this.props[_key])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    /**
	     * Render new data for the existing props/context.
	     */


	    Container.prototype.render = function render() {
	      if (ComponentClass) {
	        return React.createElement(ComponentClass, (0, _extends3['default'])({}, this.props, this.state.data, {
	          // TODO: Remove the string ref fallback.
	          ref: this.props.componentRef || 'component',
	          relay: this.state.relayProp
	        }));
	      } else {
	        // Stateless functional, doesn't support `ref`
	        return React.createElement(Component, (0, _extends3['default'])({}, this.props, this.state.data, {
	          relay: this.state.relayProp
	        }));
	      }
	    };

	    return Container;
	  }(React.Component);

	  profileContainer(Container, 'ReactRelayFragmentContainer');
	  Container.contextTypes = containerContextTypes;
	  Container.displayName = containerName;

	  return Container;
	}

	function assertRelayContext(relay) {
	  !isRelayContext(relay) ?  true ? invariant(false, 'ReactRelayFragmentContainer: Expected `context.relay` to be an object ' + 'conforming to the `RelayContext` interface, got `%s`.', relay) : invariant(false) : void 0;
	  return relay;
	}

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec) {
	  return buildReactRelayContainer(Component, fragmentSpec, createContainerWithFragments);
	}

	module.exports = { createContainer: createContainer, createContainerWithFragments: createContainerWithFragments };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactRelayPaginationContainer
	 * 
	 * @format
	 */

	'use strict';

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(8);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(7);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _defineProperty2 = __webpack_require__(27);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends3 = __webpack_require__(6);

	var _extends4 = _interopRequireDefault(_extends3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(11);
	var RelayProfiler = __webpack_require__(3);
	var RelayPropTypes = __webpack_require__(1);

	var areEqual = __webpack_require__(9);
	var buildReactRelayContainer = __webpack_require__(14);
	var invariant = __webpack_require__(10);
	var isRelayContext = __webpack_require__(4);
	var isScalarAndEqual = __webpack_require__(15);
	var nullthrows = __webpack_require__(16);
	var warning = __webpack_require__(32);

	var _require = __webpack_require__(13),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(2),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var _require3 = __webpack_require__(12),
	    ConnectionInterface = _require3.ConnectionInterface,
	    Observable = _require3.Observable;

	var containerContextTypes = {
	  relay: RelayPropTypes.Relay
	};

	var FORWARD = 'forward';

	/**
	 * Extends the functionality of RelayFragmentContainer by providing a mechanism
	 * to load more data from a connection.
	 *
	 * # Configuring a PaginationContainer
	 *
	 * PaginationContainer accepts the standard FragmentContainer arguments and an
	 * additional `connectionConfig` argument:
	 *
	 * - `Component`: the component to be wrapped/rendered.
	 * - `fragments`: an object whose values are `graphql` fragments. The object
	 *   keys determine the prop names by which fragment data is available.
	 * - `connectionConfig`: an object that determines how to load more connection
	 *   data. Details below.
	 *
	 * # Loading More Data
	 *
	 * Use `props.relay.hasMore()` to determine if there are more items to load.
	 *
	 * ```
	 * hasMore(): boolean
	 * ```
	 *
	 * Use `props.relay.isLoading()` to determine if a previous call to `loadMore()`
	 * is still pending. This is convenient for avoiding duplicate load calls.
	 *
	 * ```
	 * isLoading(): boolean
	 * ```
	 *
	 * Use `props.relay.loadMore()` to load more items. This will return null if
	 * there are no more items to fetch, otherwise it will fetch more items and
	 * return a Disposable that can be used to cancel the fetch.
	 *
	 * `pageSize` should be the number of *additional* items to fetch (not the
	 * total).
	 *
	 * ```
	 * loadMore(pageSize: number, callback: ?(error: ?Error) => void): ?Disposable
	 * ```
	 *
	 * A complete example:
	 *
	 * ```
	 * class Foo extends React.Component {
	 *   ...
	 *   _onEndReached() {
	 *     if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
	 *       return;
	 *     }
	 *     this.props.relay.loadMore(10);
	 *   }
	 *   ...
	 * }
	 * ```
	 *
	 * # Connection Config
	 *
	 * Here's an example, followed by details of each config property:
	 *
	 * ```
	 * ReactRelayPaginationContainer.createContainer(
	 *   Component,
	 *   {
	 *     user: graphql`fragment FriendsFragment on User {
	 *       friends(after: $afterCursor first: $count) @connection {
	 *         edges { ... }
	 *         pageInfo {
	 *           startCursor
	 *           endCursor
	 *           hasNextPage
	 *           hasPreviousPage
	 *         }
	 *       }
	 *     }`,
	 *   },
	 *   {
	 *     direction: 'forward',
	 *     getConnectionFromProps(props) {
	 *       return props.user && props.user.friends;
	 *     },
	 *     getFragmentVariables(vars, totalCount) {
	 *       // The component presumably wants *all* edges, not just those after
	 *       // the cursor, so notice that we don't set $afterCursor here.
	 *       return {
	 *         ...vars,
	 *         count: totalCount,
	 *       };
	 *     },
	 *     getVariables(props, {count, cursor}, fragmentVariables) {
	 *       return {
	 *         ...RelayFBCompatQueryConstants.get(),
	 *         id: props.user.id,
	 *         afterCursor: cursor,
	 *         count,
	 *       },
	 *     },
	 *     query: graphql`
	 *       query FriendsQuery($id: ID!, $afterCursor: ID, $count: Int!) {
	 *         node(id: $id) {
	 *           ...FriendsFragment
	 *         }
	 *       }
	 *     `,
	 *   }
	 * );
	 * ```
	 *
	 * ## Config Properties
	 *
	 * - `direction`: Either "forward" to indicate forward pagination using
	 *   after/first, or "backward" to indicate backward pagination using
	 *   before/last.
	 * - `getConnectionFromProps(props)`: PaginationContainer doesn't magically know
	 *   which connection data you mean to fetch more of (a container might fetch
	 *   multiple connections, but can only paginate one of them). This function is
	 *   given the fragment props only (not full props), and should return the
	 *   connection data. See the above example that returns the friends data via
	 *   `props.user.friends`.
	 * - `getFragmentVariables(previousVars, totalCount)`: Given the previous variables
	 *   and the new total number of items, get the variables to use when reading
	 *   your fragments. Typically this means setting whatever your local "count"
	 *   variable is to the value of `totalCount`. See the example.
	 * - `getVariables(props, {count, cursor})`: Get the variables to use when
	 *   fetching the pagination `query`. You may determine the root object id from
	 *   props (see the example that uses `props.user.id`) and may also set whatever
	 *   variables you use for the after/first/before/last calls based on the count
	 *   and cursor.
	 * - `query`: A query to use when fetching more connection data. This should
	 *   typically reference one of the container's fragment (as in the example)
	 *   to ensure that all the necessary fields for sub-components are fetched.
	 */

	function createGetConnectionFromProps(metadata) {
	  var path = metadata.path;
	  !path ?  true ? invariant(false, 'ReactRelayPaginationContainer: Unable to synthesize a ' + 'getConnectionFromProps function.') : invariant(false) : void 0;
	  return function (props) {
	    var data = props[metadata.fragmentName];
	    for (var i = 0; i < path.length; i++) {
	      if (!data || typeof data !== 'object') {
	        return null;
	      }
	      data = data[path[i]];
	    }
	    return data;
	  };
	}

	function createGetFragmentVariables(metadata) {
	  var countVariable = metadata.count;
	  !countVariable ?  true ? invariant(false, 'ReactRelayPaginationContainer: Unable to synthesize a ' + 'getFragmentVariables function.') : invariant(false) : void 0;
	  return function (prevVars, totalCount) {
	    return (0, _extends4['default'])({}, prevVars, (0, _defineProperty3['default'])({}, countVariable, totalCount));
	  };
	}

	function findConnectionMetadata(fragments) {
	  var foundConnectionMetadata = null;
	  var isRelayModern = false;
	  for (var _fragmentName in fragments) {
	    var fragment = fragments[_fragmentName];
	    var connectionMetadata = fragment.metadata && fragment.metadata.connection;
	    // HACK: metadata is always set to `undefined` in classic. In modern, even
	    // if empty, it is set to null (never undefined). We use that knowlege to
	    // check if we're dealing with classic or modern
	    if (fragment.metadata !== undefined) {
	      isRelayModern = true;
	    }
	    if (connectionMetadata) {
	      !(connectionMetadata.length === 1) ?  true ? invariant(false, 'ReactRelayPaginationContainer: Only a single @connection is ' + 'supported, `%s` has %s.', _fragmentName, connectionMetadata.length) : invariant(false) : void 0;
	      !!foundConnectionMetadata ?  true ? invariant(false, 'ReactRelayPaginationContainer: Only a single fragment with ' + '@connection is supported.') : invariant(false) : void 0;
	      foundConnectionMetadata = (0, _extends4['default'])({}, connectionMetadata[0], {
	        fragmentName: _fragmentName
	      });
	    }
	  }
	  !(!isRelayModern || foundConnectionMetadata !== null) ?  true ? invariant(false, 'ReactRelayPaginationContainer: A @connection directive must be present.') : invariant(false) : void 0;
	  return foundConnectionMetadata || {};
	}

	function toObserver(observerOrCallback) {
	  return typeof observerOrCallback === 'function' ? {
	    error: observerOrCallback,
	    complete: observerOrCallback,
	    unsubscribe: function unsubscribe(subscription) {
	      typeof observerOrCallback === 'function' && observerOrCallback();
	    }
	  } : observerOrCallback || {};
	}

	function createContainerWithFragments(Component, fragments, connectionConfig) {
	  var ComponentClass = getReactComponent(Component);
	  var componentName = getComponentName(Component);
	  var containerName = 'Relay(' + componentName + ')';

	  var metadata = findConnectionMetadata(fragments);

	  var getConnectionFromProps = connectionConfig.getConnectionFromProps || createGetConnectionFromProps(metadata);

	  var direction = connectionConfig.direction || metadata.direction;
	  !direction ?  true ? invariant(false, 'ReactRelayPaginationContainer: Unable to infer direction of the ' + 'connection, possibly because both first and last are provided.') : invariant(false) : void 0;

	  var getFragmentVariables = connectionConfig.getFragmentVariables || createGetFragmentVariables(metadata);

	  var Container = function (_React$Component) {
	    (0, _inherits3['default'])(Container, _React$Component);

	    function Container(props, context) {
	      (0, _classCallCheck3['default'])(this, Container);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	      _this._handleFragmentDataUpdate = function () {
	        var profiler = RelayProfiler.profile('ReactRelayPaginationContainer.handleFragmentDataUpdate');
	        _this.setState({ data: _this._resolver.resolve() }, profiler.stop);
	      };

	      _this._hasMore = function () {
	        var connectionData = _this._getConnectionData();
	        return !!connectionData && connectionData.hasMore;
	      };

	      _this._isLoading = function () {
	        return !!_this._refetchSubscription;
	      };

	      _this._refetchConnection = function (totalCount, observerOrCallback, refetchVariables) {
	        var paginatingVariables = {
	          count: totalCount,
	          cursor: null,
	          totalCount: totalCount
	        };
	        var fetch = _this._fetchPage(paginatingVariables, toObserver(observerOrCallback), { force: true }, refetchVariables);

	        return { dispose: fetch.unsubscribe };
	      };

	      _this._loadMore = function (pageSize, observerOrCallback, options) {
	        var observer = toObserver(observerOrCallback);
	        var connectionData = _this._getConnectionData();
	        if (!connectionData) {
	          new Observable(function (sink) {
	            return sink.complete();
	          }).subscribe(observer);
	          return null;
	        }
	        var totalCount = connectionData.edgeCount + pageSize;
	        if (options && options.force) {
	          return _this._refetchConnection(totalCount, observerOrCallback);
	        }
	        var paginatingVariables = {
	          count: pageSize,
	          cursor: connectionData.cursor,
	          totalCount: totalCount
	        };
	        var fetch = _this._fetchPage(paginatingVariables, observer, options);
	        return { dispose: fetch.unsubscribe };
	      };

	      var relay = assertRelayContext(context.relay);
	      var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	      _this._isARequestInFlight = false;
	      _this._localVariables = null;
	      _this._refetchSubscription = null;
	      _this._references = [];
	      _this._resolver = createFragmentSpecResolver(relay, containerName, fragments, props, _this._handleFragmentDataUpdate);
	      _this._relayContext = {
	        environment: _this.context.relay.environment,
	        variables: _this.context.relay.variables
	      };
	      _this.state = {
	        data: _this._resolver.resolve(),
	        relayProp: _this._buildRelayProp(relay)
	      };
	      return _this;
	    }

	    /**
	     * When new props are received, read data for the new props and subscribe
	     * for updates. Props may be the same in which case previous data and
	     * subscriptions can be reused.
	     */


	    Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var context = nullthrows(nextContext);
	      var relay = assertRelayContext(context.relay);
	      var _relay$environment$un = relay.environment.unstable_internal,
	          createFragmentSpecResolver = _relay$environment$un.createFragmentSpecResolver,
	          getDataIDsFromObject = _relay$environment$un.getDataIDsFromObject;

	      var prevIDs = getDataIDsFromObject(fragments, this.props);
	      var nextIDs = getDataIDsFromObject(fragments, nextProps);

	      // If the environment has changed or props point to new records then
	      // previously fetched data and any pending fetches no longer apply:
	      // - Existing references are on the old environment.
	      // - Existing references are based on old variables.
	      // - Pending fetches are for the previous records.
	      if (this.context.relay.environment !== relay.environment || this.context.relay.variables !== relay.variables || !areEqual(prevIDs, nextIDs)) {
	        this._release();
	        this._localVariables = null;
	        this._relayContext = {
	          environment: relay.environment,
	          variables: relay.variables
	        };
	        this._resolver = createFragmentSpecResolver(relay, containerName, fragments, nextProps, this._handleFragmentDataUpdate);
	        this.setState({ relayProp: this._buildRelayProp(relay) });
	      } else if (!this._localVariables) {
	        this._resolver.setProps(nextProps);
	      }
	      var data = this._resolver.resolve();
	      if (data !== this.state.data) {
	        this.setState({ data: data });
	      }
	    };

	    Container.prototype.componentWillUnmount = function componentWillUnmount() {
	      this._release();
	    };

	    Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Short-circuit if any Relay-related data has changed
	      if (nextContext.relay !== this.context.relay || nextState.data !== this.state.data || nextState.relayProp !== this.state.relayProp) {
	        return true;
	      }
	      // Otherwise, for convenience short-circuit if all non-Relay props
	      // are scalar and equal
	      var keys = Object.keys(nextProps);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var _key = keys[ii];
	        if (!fragments.hasOwnProperty(_key) && !isScalarAndEqual(nextProps[_key], this.props[_key])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    Container.prototype._buildRelayProp = function _buildRelayProp(relay) {
	      return {
	        hasMore: this._hasMore,
	        isLoading: this._isLoading,
	        loadMore: this._loadMore,
	        refetchConnection: this._refetchConnection,
	        environment: relay.environment
	      };
	    };

	    /**
	     * Render new data for the existing props/context.
	     */


	    Container.prototype._getConnectionData = function _getConnectionData() {
	      // Extract connection data and verify there are more edges to fetch
	      var props = (0, _extends4['default'])({}, this.props, this.state.data);
	      var connectionData = getConnectionFromProps(props);
	      if (connectionData == null) {
	        return null;
	      }

	      var _ConnectionInterface$ = ConnectionInterface.get(),
	          EDGES = _ConnectionInterface$.EDGES,
	          PAGE_INFO = _ConnectionInterface$.PAGE_INFO,
	          HAS_NEXT_PAGE = _ConnectionInterface$.HAS_NEXT_PAGE,
	          HAS_PREV_PAGE = _ConnectionInterface$.HAS_PREV_PAGE,
	          END_CURSOR = _ConnectionInterface$.END_CURSOR,
	          START_CURSOR = _ConnectionInterface$.START_CURSOR;

	      !(typeof connectionData === 'object') ?  true ? invariant(false, 'ReactRelayPaginationContainer: Expected `getConnectionFromProps()` in `%s`' + 'to return `null` or a plain object with %s and %s properties, got `%s`.' + componentName, EDGES, PAGE_INFO, connectionData) : invariant(false) : void 0;
	      var edges = connectionData[EDGES];
	      var pageInfo = connectionData[PAGE_INFO];
	      if (edges == null || pageInfo == null) {
	        return null;
	      }
	      !Array.isArray(edges) ?  true ? invariant(false, 'ReactRelayPaginationContainer: Expected `getConnectionFromProps()` in `%s`' + 'to return an object with %s: Array, got `%s`.', componentName, EDGES, edges) : invariant(false) : void 0;
	      !(typeof pageInfo === 'object') ?  true ? invariant(false, 'ReactRelayPaginationContainer: Expected `getConnectionFromProps()` in `%s`' + 'to return an object with %s: Object, got `%s`.', componentName, PAGE_INFO, pageInfo) : invariant(false) : void 0;
	      var hasMore = direction === FORWARD ? pageInfo[HAS_NEXT_PAGE] : pageInfo[HAS_PREV_PAGE];
	      var cursor = direction === FORWARD ? pageInfo[END_CURSOR] : pageInfo[START_CURSOR];
	      if (typeof hasMore !== 'boolean' || typeof cursor !== 'string') {
	         true ? warning(false, 'ReactRelayPaginationContainer: Cannot paginate without %s fields in `%s`. ' + 'Be sure to fetch %s (got `%s`) and %s (got `%s`).', PAGE_INFO, componentName, direction === FORWARD ? HAS_NEXT_PAGE : HAS_PREV_PAGE, hasMore, direction === FORWARD ? END_CURSOR : START_CURSOR, cursor) : void 0;
	        return null;
	      }
	      return {
	        cursor: cursor,
	        edgeCount: edges.length,
	        hasMore: hasMore
	      };
	    };

	    Container.prototype._fetchPage = function _fetchPage(paginatingVariables, observer, options, refetchVariables) {
	      var _this2 = this;

	      var _assertRelayContext = assertRelayContext(this.context.relay),
	          environment = _assertRelayContext.environment;

	      var _environment$unstable = environment.unstable_internal,
	          createOperationSelector = _environment$unstable.createOperationSelector,
	          getOperation = _environment$unstable.getOperation,
	          getVariablesFromObject = _environment$unstable.getVariablesFromObject;

	      var props = (0, _extends4['default'])({}, this.props, this.state.data);
	      var fragmentVariables = getVariablesFromObject(this._relayContext.variables, fragments, this.props);
	      fragmentVariables = (0, _extends4['default'])({}, fragmentVariables, refetchVariables);
	      var fetchVariables = connectionConfig.getVariables(props, {
	        count: paginatingVariables.count,
	        cursor: paginatingVariables.cursor
	      },
	      // Pass the variables used to fetch the fragments initially
	      fragmentVariables);
	      !(typeof fetchVariables === 'object' && fetchVariables !== null) ?  true ? invariant(false, 'ReactRelayPaginationContainer: Expected `getVariables()` to ' + 'return an object, got `%s` in `%s`.', fetchVariables, componentName) : invariant(false) : void 0;
	      fetchVariables = (0, _extends4['default'])({}, fetchVariables, refetchVariables);
	      this._localVariables = fetchVariables;

	      var cacheConfig = options ? { force: !!options.force } : undefined;
	      if (cacheConfig && options && options.rerunParamExperimental) {
	        cacheConfig.rerunParamExperimental = options.rerunParamExperimental;
	      }
	      var query = getOperation(connectionConfig.query);
	      var operation = createOperationSelector(query, fetchVariables);

	      var refetchSubscription = null;

	      // Immediately retain the results of the query to prevent cached
	      // data from being evicted
	      var reference = environment.retain(operation.root);
	      this._references.push(reference);

	      if (this._refetchSubscription) {
	        this._refetchSubscription.unsubscribe();
	      }

	      var onNext = function onNext(payload, complete) {
	        _this2._relayContext = {
	          environment: _this2.context.relay.environment,
	          variables: (0, _extends4['default'])({}, _this2.context.relay.variables, fragmentVariables)
	        };
	        var prevData = _this2._resolver.resolve();
	        _this2._resolver.setVariables(getFragmentVariables(fragmentVariables, paginatingVariables.totalCount));
	        var nextData = _this2._resolver.resolve();

	        // Workaround slightly different handling for connection in different
	        // core implementations:
	        // - Classic core requires the count to be explicitly incremented
	        // - Modern core automatically appends new items, updating the count
	        //   isn't required to see new data.
	        //
	        // `setState` is only required if changing the variables would change the
	        // resolved data.
	        // TODO #14894725: remove PaginationContainer equal check
	        if (!areEqual(prevData, nextData)) {
	          _this2.setState({ data: nextData }, complete);
	        } else {
	          complete();
	        }
	      };

	      var cleanup = function cleanup() {
	        if (_this2._refetchSubscription === refetchSubscription) {
	          _this2._refetchSubscription = null;
	          _this2._isARequestInFlight = false;
	        }
	      };

	      this._isARequestInFlight = true;
	      refetchSubscription = environment.execute({ operation: operation, cacheConfig: cacheConfig }).mergeMap(function (payload) {
	        return new Observable(function (sink) {
	          onNext(payload, function () {
	            sink.next(); // pass void to public observer's `next`
	            sink.complete();
	          });
	        });
	      })
	      // use do instead of finally so that observer's `complete` fires after cleanup
	      ['do']({
	        error: cleanup,
	        complete: cleanup,
	        unsubscribe: cleanup
	      }).subscribe(observer || {});

	      this._refetchSubscription = this._isARequestInFlight ? refetchSubscription : null;

	      return refetchSubscription;
	    };

	    Container.prototype._release = function _release() {
	      this._resolver.dispose();
	      this._references.forEach(function (disposable) {
	        return disposable.dispose();
	      });
	      this._references.length = 0;
	      if (this._refetchSubscription) {
	        this._refetchSubscription.unsubscribe();
	        this._refetchSubscription = null;
	        this._isARequestInFlight = false;
	      }
	    };

	    Container.prototype.getChildContext = function getChildContext() {
	      return { relay: this._relayContext };
	    };

	    Container.prototype.render = function render() {
	      if (ComponentClass) {
	        return React.createElement(ComponentClass, (0, _extends4['default'])({}, this.props, this.state.data, {
	          // TODO: Remove the string ref fallback.
	          ref: this.props.componentRef || 'component',
	          relay: this.state.relayProp
	        }));
	      } else {
	        // Stateless functional, doesn't support `ref`
	        return React.createElement(Component, (0, _extends4['default'])({}, this.props, this.state.data, {
	          relay: this.state.relayProp
	        }));
	      }
	    };

	    return Container;
	  }(React.Component);

	  profileContainer(Container, 'ReactRelayPaginationContainer');
	  Container.contextTypes = containerContextTypes;
	  Container.displayName = containerName;

	  return Container;
	}

	function assertRelayContext(relay) {
	  !isRelayContext(relay) ?  true ? invariant(false, 'ReactRelayPaginationContainer: Expected `context.relay` to be an object ' + 'conforming to the `RelayContext` interface, got `%s`.', relay) : invariant(false) : void 0;
	  return relay;
	}

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, connectionConfig) {
	  var Container = buildReactRelayContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return createContainerWithFragments(ComponentClass, fragments, connectionConfig);
	  });
	  /* $FlowFixMe(>=0.53.0) This comment suppresses an error
	   * when upgrading Flow's support for React. Common errors found when
	   * upgrading Flow's React support are documented at
	   * https://fburl.com/eq7bs81w */
	  Container.childContextTypes = containerContextTypes;
	  return Container;
	}

	module.exports = { createContainer: createContainer, createContainerWithFragments: createContainerWithFragments };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _extends2 = __webpack_require__(6);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(8);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(7);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(11);
	var RelayPropTypes = __webpack_require__(1);

	var areEqual = __webpack_require__(9);
	var deepFreeze = __webpack_require__(23);

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
	    if (true) {
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

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactRelayRefetchContainer
	 * 
	 * @format
	 */

	'use strict';

	var _extends2 = __webpack_require__(6);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(5);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(8);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(7);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(11);
	var RelayProfiler = __webpack_require__(3);
	var RelayPropTypes = __webpack_require__(1);

	var areEqual = __webpack_require__(9);
	var buildReactRelayContainer = __webpack_require__(14);
	var invariant = __webpack_require__(10);
	var isRelayContext = __webpack_require__(4);
	var isScalarAndEqual = __webpack_require__(15);
	var nullthrows = __webpack_require__(16);

	var _require = __webpack_require__(13),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(2),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var _require3 = __webpack_require__(12),
	    Observable = _require3.Observable;

	var containerContextTypes = {
	  relay: RelayPropTypes.Relay
	};

	/**
	 * Composes a React component class, returning a new class that intercepts
	 * props, resolving them with the provided fragments and subscribing for
	 * updates.
	 */
	function createContainerWithFragments(Component, fragments, taggedNode) {
	  var ComponentClass = getReactComponent(Component);
	  var componentName = getComponentName(Component);
	  var containerName = 'Relay(' + componentName + ')';

	  var Container = function (_React$Component) {
	    (0, _inherits3['default'])(Container, _React$Component);

	    function Container(props, context) {
	      (0, _classCallCheck3['default'])(this, Container);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

	      _this._handleFragmentDataUpdate = function () {
	        var profiler = RelayProfiler.profile('ReactRelayRefetchContainer.handleFragmentDataUpdate');
	        _this.setState({ data: _this._resolver.resolve() }, profiler.stop);
	      };

	      _this._refetch = function (refetchVariables, renderVariables, callback, options) {
	        var _assertRelayContext = assertRelayContext(_this.context.relay),
	            environment = _assertRelayContext.environment,
	            rootVariables = _assertRelayContext.variables;

	        var fetchVariables = typeof refetchVariables === 'function' ? refetchVariables(_this._getFragmentVariables()) : refetchVariables;
	        fetchVariables = (0, _extends3['default'])({}, rootVariables, fetchVariables);
	        var fragmentVariables = renderVariables ? (0, _extends3['default'])({}, rootVariables, renderVariables) : fetchVariables;
	        var cacheConfig = options ? { force: !!options.force } : undefined;
	        var _this$context$relay$e = _this.context.relay.environment.unstable_internal,
	            createOperationSelector = _this$context$relay$e.createOperationSelector,
	            getOperation = _this$context$relay$e.getOperation;

	        var query = getOperation(taggedNode);
	        var operation = createOperationSelector(query, fetchVariables);

	        // Immediately retain the results of the query to prevent cached
	        // data from being evicted
	        var reference = environment.retain(operation.root);
	        _this._references.push(reference);

	        _this._localVariables = fetchVariables;

	        // Cancel any previously running refetch.
	        _this._refetchSubscription && _this._refetchSubscription.unsubscribe();

	        // Declare refetchSubscription before assigning it in .start(), since
	        // synchronous completion may call callbacks .subscribe() returns.
	        var refetchSubscription = void 0;
	        environment.execute({ operation: operation, cacheConfig: cacheConfig }).mergeMap(function (response) {
	          _this._relayContext = {
	            environment: _this.context.relay.environment,
	            variables: fragmentVariables
	          };
	          _this._resolver.setVariables(fragmentVariables);
	          return new Observable(function (sink) {
	            return _this.setState({ data: _this._resolver.resolve() }, function () {
	              sink.next();
	              sink.complete();
	            });
	          });
	        })['finally'](function () {
	          // Finalizing a refetch should only clear this._refetchSubscription
	          // if the finizing subscription is the most recent call.
	          if (_this._refetchSubscription === refetchSubscription) {
	            _this._refetchSubscription = null;
	          }
	        }).subscribe({
	          start: function start(subscription) {
	            _this._refetchSubscription = refetchSubscription = subscription;
	          },
	          next: callback,
	          error: callback
	        });

	        return {
	          dispose: function dispose() {
	            refetchSubscription && refetchSubscription.unsubscribe();
	          }
	        };
	      };

	      var relay = assertRelayContext(context.relay);
	      var createFragmentSpecResolver = relay.environment.unstable_internal.createFragmentSpecResolver;

	      _this._localVariables = null;
	      _this._refetchSubscription = null;
	      _this._references = [];
	      _this._resolver = createFragmentSpecResolver(relay, containerName, fragments, props, _this._handleFragmentDataUpdate);
	      _this._relayContext = {
	        environment: _this.context.relay.environment,
	        variables: _this.context.relay.variables
	      };
	      _this.state = {
	        data: _this._resolver.resolve(),
	        relayProp: _this._buildRelayProp(relay)
	      };
	      return _this;
	    }

	    /**
	     * When new props are received, read data for the new props and subscribe
	     * for updates. Props may be the same in which case previous data and
	     * subscriptions can be reused.
	     */


	    Container.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
	      var context = nullthrows(nextContext);
	      var relay = assertRelayContext(context.relay);
	      var _relay$environment$un = relay.environment.unstable_internal,
	          createFragmentSpecResolver = _relay$environment$un.createFragmentSpecResolver,
	          getDataIDsFromObject = _relay$environment$un.getDataIDsFromObject;

	      var prevIDs = getDataIDsFromObject(fragments, this.props);
	      var nextIDs = getDataIDsFromObject(fragments, nextProps);

	      // If the environment has changed or props point to new records then
	      // previously fetched data and any pending fetches no longer apply:
	      // - Existing references are on the old environment.
	      // - Existing references are based on old variables.
	      // - Pending fetches are for the previous records.
	      if (this.context.relay.environment !== relay.environment || this.context.relay.variables !== relay.variables || !areEqual(prevIDs, nextIDs)) {
	        this._release();
	        this._localVariables = null;
	        this._relayContext = {
	          environment: relay.environment,
	          variables: relay.variables
	        };
	        this._resolver = createFragmentSpecResolver(relay, containerName, fragments, nextProps, this._handleFragmentDataUpdate);
	        this.setState({ relayProp: this._buildRelayProp(relay) });
	      } else if (!this._localVariables) {
	        this._resolver.setProps(nextProps);
	      }
	      var data = this._resolver.resolve();
	      if (data !== this.state.data) {
	        this.setState({ data: data });
	      }
	    };

	    Container.prototype.componentWillUnmount = function componentWillUnmount() {
	      this._release();
	    };

	    Container.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
	      // Short-circuit if any Relay-related data has changed
	      if (nextContext.relay !== this.context.relay || nextState.data !== this.state.data || nextState.relayProp !== this.state.relayProp) {
	        return true;
	      }
	      // Otherwise, for convenience short-circuit if all non-Relay props
	      // are scalar and equal
	      var keys = Object.keys(nextProps);
	      for (var ii = 0; ii < keys.length; ii++) {
	        var _key = keys[ii];
	        if (!fragments.hasOwnProperty(_key) && !isScalarAndEqual(nextProps[_key], this.props[_key])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    Container.prototype._release = function _release() {
	      this._resolver.dispose();
	      this._references.forEach(function (disposable) {
	        return disposable.dispose();
	      });
	      this._references.length = 0;
	      this._refetchSubscription && this._refetchSubscription.unsubscribe();
	    };

	    Container.prototype._buildRelayProp = function _buildRelayProp(relay) {
	      return {
	        environment: relay.environment,
	        refetch: this._refetch
	      };
	    };

	    /**
	     * Render new data for the existing props/context.
	     */


	    Container.prototype._getFragmentVariables = function _getFragmentVariables() {
	      var getVariablesFromObject = this.context.relay.environment.unstable_internal.getVariablesFromObject;

	      return getVariablesFromObject(this.context.relay.variables, fragments, this.props);
	    };

	    Container.prototype.getChildContext = function getChildContext() {
	      return { relay: this._relayContext };
	    };

	    Container.prototype.render = function render() {
	      if (ComponentClass) {
	        return React.createElement(ComponentClass, (0, _extends3['default'])({}, this.props, this.state.data, {
	          // TODO: Remove the string ref fallback.
	          ref: this.props.componentRef || 'component',
	          relay: this.state.relayProp
	        }));
	      } else {
	        // Stateless functional, doesn't support `ref`
	        return React.createElement(Component, (0, _extends3['default'])({}, this.props, this.state.data, {
	          relay: this.state.relayProp
	        }));
	      }
	    };

	    return Container;
	  }(React.Component);

	  profileContainer(Container, 'ReactRelayRefetchContainer');
	  Container.contextTypes = containerContextTypes;
	  Container.displayName = containerName;

	  return Container;
	}

	function assertRelayContext(relay) {
	  !isRelayContext(relay) ?  true ? invariant(false, 'ReactRelayRefetchContainer: Expected `context.relay` to be an object ' + 'conforming to the `RelayContext` interface, got `%s`.', relay) : invariant(false) : void 0;
	  return relay;
	}

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, taggedNode) {
	  var Container = buildReactRelayContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return createContainerWithFragments(ComponentClass, fragments, taggedNode);
	  });
	  /* $FlowFixMe(>=0.53.0) This comment suppresses an error
	   * when upgrading Flow's support for React. Common errors found when
	   * upgrading Flow's React support are documented at
	   * https://fburl.com/eq7bs81w */
	  Container.childContextTypes = containerContextTypes;
	  return Container;
	}

	module.exports = { createContainer: createContainer, createContainerWithFragments: createContainerWithFragments };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule assertFragmentMap
	 * 
	 * @format
	 */

	'use strict';

	var invariant = __webpack_require__(10);

	/**
	 * Fail fast if the user supplies invalid fragments as input.
	 */
	function assertFragmentMap(componentName, fragments) {
	  !(fragments && typeof fragments === 'object') ?  true ? invariant(false, 'Could not create Relay Container for `%s`. ' + 'Expected a set of GraphQL fragments, got `%s` instead.', componentName, fragments) : invariant(false) : void 0;

	  for (var key in fragments) {
	    if (fragments.hasOwnProperty(key)) {
	      var fragment = fragments[key];
	      !(fragment && (typeof fragment === 'object' || typeof fragment === 'function')) ?  true ? invariant(false, 'Could not create Relay Container for `%s`. ' + 'The value of fragment `%s` was expected to be a fragment, got `%s` instead.', componentName, key, fragment) : invariant(false) : void 0;
	    }
	  }
	}

	module.exports = assertFragmentMap;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @providesModule deepFreeze
	 * @format
	 */

	'use strict';

	/**
	 * Recursively "deep" freezes the supplied object.
	 *
	 * For convenience, and for consistency with the behavior of `Object.freeze`,
	 * returns the now-frozen original object.
	 */

	function deepFreeze(object) {
	  Object.freeze(object);
	  Object.getOwnPropertyNames(object).forEach(function (name) {
	    var property = object[name];
	    if (property && typeof property === 'object' && !Object.isFrozen(property)) {
	      deepFreeze(property);
	    }
	  });
	  return object;
	}

	module.exports = deepFreeze;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule isClassicRelayEnvironment
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if a given value is an object that implements the `RelayEnvironment`
	 * interface.
	 */

	function isClassicRelayEnvironment(environment) {
	  return typeof environment === 'object' && environment !== null && typeof environment.applyMutation === 'function' && typeof environment.sendMutation === 'function' && typeof environment.forceFetch === 'function' && typeof environment.getFragmentResolver === 'function' && typeof environment.getStoreData === 'function' && typeof environment.primeCache === 'function';
	}

	module.exports = isClassicRelayEnvironment;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule isRelayContainer
	 * 
	 * @format
	 */

	'use strict';

	function isRelayContainer(component) {
	  return !!(component && component.getFragmentNames && component.getFragment && component.hasFragment && component.hasVariable);
	}

	module.exports = isRelayContainer;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule isRelayVariables
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Determine if the object is a plain object that matches the `Variables` type.
	 */

	function isRelayVariables(variables) {
	  return typeof variables === 'object' && variables !== null && !Array.isArray(variables);
	}

	module.exports = isRelayVariables;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_30__;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_31__;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ })
/******/ ])
});
;