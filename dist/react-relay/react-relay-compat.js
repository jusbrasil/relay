/**
 * Relay v1.4.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fbjs/lib/invariant"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/extends"), require("relay-runtime"), require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/possibleConstructorReturn"), require("fbjs/lib/areEqual"), require("fbjs/lib/warning"), require("react"), require("fbjs/lib/nullthrows"), require("fbjs/lib/mapObject"), require("babel-runtime/helpers/defineProperty"), require("fbjs/lib/base62"), require("fbjs/lib/emptyFunction"), require("fbjs/lib/forEachObject"), require("fbjs/lib/removeFromArray"), require("fbjs/lib/sprintf"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["fbjs/lib/invariant", "babel-runtime/helpers/classCallCheck", "babel-runtime/helpers/extends", "relay-runtime", "babel-runtime/helpers/inherits", "babel-runtime/helpers/possibleConstructorReturn", "fbjs/lib/areEqual", "fbjs/lib/warning", "react", "fbjs/lib/nullthrows", "fbjs/lib/mapObject", "babel-runtime/helpers/defineProperty", "fbjs/lib/base62", "fbjs/lib/emptyFunction", "fbjs/lib/forEachObject", "fbjs/lib/removeFromArray", "fbjs/lib/sprintf", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["ReactRelayCompat"] = factory(require("fbjs/lib/invariant"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/extends"), require("relay-runtime"), require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/possibleConstructorReturn"), require("fbjs/lib/areEqual"), require("fbjs/lib/warning"), require("react"), require("fbjs/lib/nullthrows"), require("fbjs/lib/mapObject"), require("babel-runtime/helpers/defineProperty"), require("fbjs/lib/base62"), require("fbjs/lib/emptyFunction"), require("fbjs/lib/forEachObject"), require("fbjs/lib/removeFromArray"), require("fbjs/lib/sprintf"), require("prop-types"));
	else
		root["ReactRelayCompat"] = factory(root["fbjs/lib/invariant"], root["babel-runtime/helpers/classCallCheck"], root["babel-runtime/helpers/extends"], root["relay-runtime"], root["babel-runtime/helpers/inherits"], root["babel-runtime/helpers/possibleConstructorReturn"], root["fbjs/lib/areEqual"], root["fbjs/lib/warning"], root["react"], root["fbjs/lib/nullthrows"], root["fbjs/lib/mapObject"], root["babel-runtime/helpers/defineProperty"], root["fbjs/lib/base62"], root["fbjs/lib/emptyFunction"], root["fbjs/lib/forEachObject"], root["fbjs/lib/removeFromArray"], root["fbjs/lib/sprintf"], root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_46__, __WEBPACK_EXTERNAL_MODULE_47__, __WEBPACK_EXTERNAL_MODULE_48__, __WEBPACK_EXTERNAL_MODULE_49__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_51__) {
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
	 * @providesModule ReactRelayCompatPublic
	 * 
	 * @format
	 */

	'use strict';

	var ReactRelayCompatContainerBuilder = __webpack_require__(7);
	var ReactRelayQueryRenderer = __webpack_require__(27);
	var RelayCompatContainer = __webpack_require__(29);
	var RelayCompatMutations = __webpack_require__(31);
	var RelayCompatPaginationContainer = __webpack_require__(32);
	var RelayCompatRefetchContainer = __webpack_require__(33);

	var _require = __webpack_require__(5),
	    graphql = _require.graphql,
	    fetchQuery = _require.fetchQuery;

	/**
	 * The public interface to React Relay which supports a compatibility mode to
	 * continue to work with the classic React runtime.
	 */
	module.exports = {
	  QueryRenderer: ReactRelayQueryRenderer,
	  applyOptimisticMutation: RelayCompatMutations.applyUpdate,
	  commitMutation: RelayCompatMutations.commitUpdate,
	  createFragmentContainer: RelayCompatContainer.createContainer,
	  createPaginationContainer: RelayCompatPaginationContainer.createContainer,
	  createRefetchContainer: RelayCompatRefetchContainer.createContainer,
	  fetchQuery: fetchQuery,
	  graphql: graphql,
	  injectDefaultVariablesProvider: ReactRelayCompatContainerBuilder.injectDefaultVariablesProvider
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
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

	var PropTypes = __webpack_require__(51);

	var isClassicRelayEnvironment = __webpack_require__(22);
	var isRelayContainer = __webpack_require__(42);
	var isRelayContext = __webpack_require__(9);
	var isRelayEnvironment = __webpack_require__(23);
	var sprintf = __webpack_require__(50);

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
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule ReactRelayCompatContainerBuilder
	 * 
	 * @format
	 */

	'use strict';

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var RelayContainerProxy = __webpack_require__(34);
	var RelayGraphQLTag = __webpack_require__(36);
	var RelayPropTypes = __webpack_require__(2);

	var assertFragmentMap = __webpack_require__(20);
	var invariant = __webpack_require__(1);
	var mapObject = __webpack_require__(24);

	var _require = __webpack_require__(6),
	    getComponentName = _require.getComponentName,
	    getContainerName = _require.getContainerName;

	var containerContextTypes = {
	  relay: RelayPropTypes.Relay
	};

	/**
	 * `injectDefaultVariablesProvider()` allows classic versions of a container to
	 * inject default variable values for a fragment via the arguments of any
	 * references to it. This is useful for fragments that need to reference
	 * global query constants (e.g. the device pixel ratio) but may be included
	 * in classic queries that do not define the necessary param.
	 */
	var injectedDefaultVariablesProvider = null;
	function injectDefaultVariablesProvider(variablesProvider) {
	  !!injectedDefaultVariablesProvider ?  true ? invariant(false, 'injectDefaultVariablesProvider must be called no more than once.') : invariant(false) : void 0;
	  injectedDefaultVariablesProvider = variablesProvider;
	}

	/**
	 * Creates a component class whose instances adapt to the
	 * `context.relay.environment` in which they are rendered and which have the
	 * necessary static methods (`getFragment()` etc) to be composed within classic
	 * `Relay.Containers`.
	 *
	 * The returned constructor uses the given `createContainerForEnvironment` to
	 * construct a new container type whenever a new environment is encountered;
	 * while the constructor is being used for the same environment (the expected
	 * majority case) this value is memoized to avoid creating unnecessary extra
	 * container definitions or unwrapping the environment-specific fragment
	 * defintions unnecessarily.
	 */
	function buildCompatContainer(ComponentClass, fragmentSpec, createContainerWithFragments) {
	  // Sanity-check user-defined fragment input
	  var containerName = getContainerName(ComponentClass);
	  assertFragmentMap(getComponentName(ComponentClass), fragmentSpec);

	  var injectedDefaultVariables = null;
	  function getDefaultVariables() {
	    if (injectedDefaultVariables == null) {
	      injectedDefaultVariables = injectedDefaultVariablesProvider ? injectedDefaultVariablesProvider() : {};
	    }
	    return injectedDefaultVariables;
	  }

	  // Similar to RelayContainer.getFragment(), except that this returns a
	  // FragmentSpread in order to support referencing root variables.
	  function getFragment(fragmentName, variableMapping) {
	    var taggedNode = fragmentSpec[fragmentName];
	    !taggedNode ?  true ? invariant(false, 'ReactRelayCompatContainerBuilder: Expected a fragment named `%s` to be defined ' + 'on `%s`.', fragmentName, containerName) : invariant(false) : void 0;
	    var fragment = RelayGraphQLTag.getClassicFragment(taggedNode);

	    var args = (0, _extends3['default'])({}, getDefaultVariables(), variableMapping || {});

	    return {
	      kind: 'FragmentSpread',
	      args: args,
	      fragment: fragment
	    };
	  }

	  function hasVariable(variableName) {
	    return Object.keys(fragmentSpec).some(function (fragmentName) {
	      var fragment = RelayGraphQLTag.getClassicFragment(fragmentSpec[fragmentName]);
	      return fragment.argumentDefinitions.some(function (argDef) {
	        return argDef.name === variableName;
	      });
	    });
	  }

	  // Memoize a container for the last environment instance encountered
	  var environment = void 0;
	  var Container = void 0;
	  function ContainerConstructor(props, context) {
	    if (Container == null || context.relay.environment !== environment) {
	      environment = context.relay.environment;
	      var getFragmentFromTag = environment.unstable_internal.getFragment;

	      var _fragments = mapObject(fragmentSpec, getFragmentFromTag);
	      Container = createContainerWithFragments(ComponentClass, _fragments);
	      RelayContainerProxy.proxyMethods(Container, ComponentClass);
	    }
	    /* $FlowFixMe(>=0.53.0) This comment suppresses an
	     * error when upgrading Flow's support for React. Common errors found when
	     * upgrading Flow's React support are documented at
	     * https://fburl.com/eq7bs81w */
	    return new Container(props, context);
	  }
	  ContainerConstructor.contextTypes = containerContextTypes;
	  ContainerConstructor.displayName = containerName;

	  // Classic container static methods
	  ContainerConstructor.getFragment = getFragment;
	  ContainerConstructor.getFragmentNames = function () {
	    return Object.keys(fragmentSpec);
	  };
	  ContainerConstructor.hasFragment = function (name) {
	    return fragmentSpec.hasOwnProperty(name);
	  };
	  ContainerConstructor.hasVariable = hasVariable;

	  // Create a back-reference from the Component to the Container for cases
	  // where a Classic Component might refer to itself, expecting a Container.
	  /* $FlowFixMe(>=0.53.0) This comment suppresses an error
	   * when upgrading Flow's support for React. Common errors found when
	   * upgrading Flow's React support are documented at
	   * https://fburl.com/eq7bs81w */
	  ComponentClass.__container__ = ContainerConstructor;

	  return ContainerConstructor;
	}

	module.exports = { injectDefaultVariablesProvider: injectDefaultVariablesProvider, buildCompatContainer: buildCompatContainer };

/***/ }),
/* 8 */
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

	var emptyFunction = __webpack_require__(47);
	var removeFromArray = __webpack_require__(49);

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
/* 9 */
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

	var isRelayEnvironment = __webpack_require__(23);
	var isRelayVariables = __webpack_require__(43);

	/**
	 * Determine if the input is a plain object that matches the `RelayContext`
	 * type defined in `RelayEnvironmentTypes`.
	 */
	function isRelayContext(context) {
	  return typeof context === 'object' && context !== null && !Array.isArray(context) && isRelayEnvironment(context.environment) && isRelayVariables(context.variables);
	}

	module.exports = isRelayContext;

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
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
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

	var RelayProfiler = __webpack_require__(8);

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
/* 16 */
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

	var RelayPropTypes = __webpack_require__(2);

	var assertFragmentMap = __webpack_require__(20);
	var mapObject = __webpack_require__(24);

	var _require = __webpack_require__(6),
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
	        var _require2 = __webpack_require__(5),
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule QueryBuilder
	 * 
	 * @format
	 */

	'use strict';

	var RelayNodeInterface = __webpack_require__(37);

	var generateConcreteFragmentID = __webpack_require__(21);
	var warning = __webpack_require__(13);

	var EMPTY_CALLS = [];
	var EMPTY_CHILDREN = [];
	var EMPTY_DIRECTIVES = [];
	var EMPTY_METADATA = {};

	if (true) {
	  Object.freeze(EMPTY_CALLS);
	  Object.freeze(EMPTY_CHILDREN);
	  Object.freeze(EMPTY_DIRECTIVES);
	  Object.freeze(EMPTY_METADATA);
	}

	/**
	 * @internal
	 *
	 * Helper methods for constructing concrete query objects.
	 */
	var QueryBuilder = {
	  createBatchCallVariable: function createBatchCallVariable(sourceQueryID, jsonPath) {
	    return {
	      kind: 'BatchCallVariable',
	      sourceQueryID: sourceQueryID,
	      jsonPath: jsonPath
	    };
	  },
	  createCall: function createCall(name, value, type) {
	    return {
	      kind: 'Call',
	      name: name,
	      metadata: {
	        type: type || null
	      },
	      value: value
	    };
	  },
	  createCallValue: function createCallValue(callValue) {
	    return {
	      kind: 'CallValue',
	      callValue: callValue
	    };
	  },
	  createCallVariable: function createCallVariable(callVariableName) {
	    return {
	      kind: 'CallVariable',
	      callVariableName: callVariableName
	    };
	  },
	  createDirective: function createDirective(name, args) {
	    return {
	      args: args,
	      kind: 'Directive',
	      name: name
	    };
	  },
	  createDirectiveArgument: function createDirectiveArgument(name, value) {
	    return {
	      name: name,
	      value: value
	    };
	  },
	  createField: function createField(partialField) {
	    var partialMetadata = partialField.metadata || EMPTY_METADATA;
	    return {
	      alias: partialField.alias,
	      calls: partialField.calls || EMPTY_CALLS,
	      children: partialField.children || EMPTY_CHILDREN,
	      directives: partialField.directives || EMPTY_DIRECTIVES,
	      fieldName: partialField.fieldName,
	      kind: 'Field',
	      metadata: {
	        canHaveSubselections: !!partialMetadata.canHaveSubselections,
	        inferredRootCallName: partialMetadata.inferredRootCallName,
	        inferredPrimaryKey: partialMetadata.inferredPrimaryKey,
	        isConnection: !!partialMetadata.isConnection,
	        isFindable: !!partialMetadata.isFindable,
	        isGenerated: !!partialMetadata.isGenerated,
	        isPlural: !!partialMetadata.isPlural,
	        isRequisite: !!partialMetadata.isRequisite,
	        isAbstract: !!partialMetadata.isAbstract
	      },
	      type: partialField.type
	    };
	  },
	  createFragment: function createFragment(partialFragment) {
	    var metadata = partialFragment.metadata || EMPTY_METADATA;
	    return {
	      children: partialFragment.children || EMPTY_CHILDREN,
	      directives: partialFragment.directives || EMPTY_DIRECTIVES,
	      id: generateConcreteFragmentID(),
	      kind: 'Fragment',
	      metadata: {
	        isAbstract: !!metadata.isAbstract,
	        pattern: !!metadata.pattern,
	        plural: !!metadata.plural // match the `@relay` argument name
	      },
	      name: partialFragment.name,
	      type: partialFragment.type
	    };
	  },
	  createMutation: function createMutation(partialMutation) {
	    var metadata = partialMutation.metadata || EMPTY_METADATA;
	    return {
	      calls: partialMutation.calls || EMPTY_CALLS,
	      children: partialMutation.children || EMPTY_CHILDREN,
	      directives: partialMutation.directives || EMPTY_DIRECTIVES,
	      kind: 'Mutation',
	      metadata: {
	        inputType: metadata.inputType
	      },
	      name: partialMutation.name,
	      responseType: partialMutation.responseType
	    };
	  },
	  createQuery: function createQuery(partialQuery) {
	    var metadata = partialQuery.metadata || EMPTY_METADATA;
	    var calls = [];
	    var identifyingArgName = metadata.identifyingArgName;
	    if (identifyingArgName == null && RelayNodeInterface.isNodeRootCall(partialQuery.fieldName)) {
	      identifyingArgName = RelayNodeInterface.ID;
	    }
	    if (identifyingArgName != null) {
	       true ? warning(partialQuery.identifyingArgValue != null, 'QueryBuilder.createQuery(): An argument value may be required for ' + 'query `%s(%s: ???)`.', partialQuery.fieldName, identifyingArgName) : void 0;
	      calls = [QueryBuilder.createCall(identifyingArgName, partialQuery.identifyingArgValue, metadata.identifyingArgType)];
	    }
	    return {
	      calls: calls,
	      children: partialQuery.children || EMPTY_CHILDREN,
	      directives: partialQuery.directives || EMPTY_DIRECTIVES,
	      fieldName: partialQuery.fieldName,
	      isDeferred: !!(partialQuery.isDeferred || metadata.isDeferred),
	      kind: 'Query',
	      metadata: {
	        identifyingArgName: identifyingArgName,
	        identifyingArgType: metadata.identifyingArgType,
	        isAbstract: !!metadata.isAbstract,
	        isPlural: !!metadata.isPlural
	      },
	      name: partialQuery.name,
	      type: partialQuery.type
	    };
	  },
	  createSubscription: function createSubscription(partialSubscription) {
	    var metadata = partialSubscription.metadata || EMPTY_METADATA;
	    return {
	      calls: partialSubscription.calls || EMPTY_CALLS,
	      children: partialSubscription.children || EMPTY_CHILDREN,
	      directives: partialSubscription.directives || EMPTY_DIRECTIVES,
	      kind: 'Subscription',
	      metadata: {
	        inputType: metadata.inputType
	      },
	      name: partialSubscription.name,
	      responseType: partialSubscription.responseType
	    };
	  },
	  getBatchCallVariable: function getBatchCallVariable(node) {
	    if (isConcreteKind(node, 'BatchCallVariable')) {
	      return node;
	    }
	  },
	  getCallVariable: function getCallVariable(node) {
	    if (isConcreteKind(node, 'CallVariable')) {
	      return node;
	    }
	  },
	  getField: function getField(node) {
	    if (isConcreteKind(node, 'Field')) {
	      return node;
	    }
	  },
	  getFragment: function getFragment(node) {
	    if (isConcreteKind(node, 'Fragment')) {
	      return node;
	    }
	  },
	  getFragmentDefinition: function getFragmentDefinition(node) {
	    if (isConcreteKind(node, 'FragmentDefinition')) {
	      return node;
	    }
	  },
	  getFragmentSpread: function getFragmentSpread(node) {
	    if (isConcreteKind(node, 'FragmentSpread')) {
	      return node;
	    }
	  },
	  getOperationDefinition: function getOperationDefinition(node) {
	    if (isConcreteKind(node, 'OperationDefinition')) {
	      return node;
	    }
	  },
	  getMutation: function getMutation(node) {
	    if (isConcreteKind(node, 'Mutation')) {
	      return node;
	    }
	  },
	  getQuery: function getQuery(node) {
	    if (isConcreteKind(node, 'Query')) {
	      return node;
	    }
	  },
	  getSubscription: function getSubscription(node) {
	    if (isConcreteKind(node, 'Subscription')) {
	      return node;
	    }
	  }
	};

	function isConcreteKind(node, kind) {
	  return typeof node === 'object' && node !== null && node.kind === kind;
	}

	module.exports = QueryBuilder;

/***/ }),
/* 20 */
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

	var invariant = __webpack_require__(1);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule generateConcreteFragmentID
	 * 
	 * @format
	 */

	'use strict';

	var base62 = __webpack_require__(46);

	// Static ids always end with `:<HASH>` where HASH is an alphanumeric transform
	// of an auto-incrementing index. A double-colon is used to distinguish between
	// client ids and static ids that happen to hash to `:client`.
	var SUFFIX = '::client';

	var _nextFragmentID = 0;

	/**
	 * The "concrete fragment id" uniquely identifies a Relay.QL`fragment ...`
	 * within the source code of an application and will remain the same across
	 * runs of a particular version of an application.
	 *
	 * This function can be used to generate a unique id for fragments constructed
	 * at runtime and is guaranteed not to conflict with statically created ids.
	 */
	function generateConcreteFragmentID() {
	  return base62(_nextFragmentID++) + SUFFIX;
	}

	module.exports = generateConcreteFragmentID;

/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }),
/* 25 */
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

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(11);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(10);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(14);
	var RelayProfiler = __webpack_require__(8);
	var RelayPropTypes = __webpack_require__(2);

	var areEqual = __webpack_require__(12);
	var buildReactRelayContainer = __webpack_require__(16);
	var invariant = __webpack_require__(1);
	var isRelayContext = __webpack_require__(9);
	var isScalarAndEqual = __webpack_require__(17);
	var nullthrows = __webpack_require__(18);

	var _require = __webpack_require__(15),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(6),
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
/* 26 */
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

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(11);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(10);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _defineProperty2 = __webpack_require__(45);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends3 = __webpack_require__(4);

	var _extends4 = _interopRequireDefault(_extends3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(14);
	var RelayProfiler = __webpack_require__(8);
	var RelayPropTypes = __webpack_require__(2);

	var areEqual = __webpack_require__(12);
	var buildReactRelayContainer = __webpack_require__(16);
	var invariant = __webpack_require__(1);
	var isRelayContext = __webpack_require__(9);
	var isScalarAndEqual = __webpack_require__(17);
	var nullthrows = __webpack_require__(18);
	var warning = __webpack_require__(13);

	var _require = __webpack_require__(15),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(6),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var _require3 = __webpack_require__(5),
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
/* 27 */
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

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(11);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(10);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(14);
	var RelayPropTypes = __webpack_require__(2);

	var areEqual = __webpack_require__(12);
	var deepFreeze = __webpack_require__(40);

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
/* 28 */
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

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(11);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(10);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(14);
	var RelayProfiler = __webpack_require__(8);
	var RelayPropTypes = __webpack_require__(2);

	var areEqual = __webpack_require__(12);
	var buildReactRelayContainer = __webpack_require__(16);
	var invariant = __webpack_require__(1);
	var isRelayContext = __webpack_require__(9);
	var isScalarAndEqual = __webpack_require__(17);
	var nullthrows = __webpack_require__(18);

	var _require = __webpack_require__(15),
	    profileContainer = _require.profileContainer;

	var _require2 = __webpack_require__(6),
	    getComponentName = _require2.getComponentName,
	    getReactComponent = _require2.getReactComponent;

	var _require3 = __webpack_require__(5),
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayCompatContainer
	 * 
	 * @format
	 */

	'use strict';

	var ReactRelayFragmentContainer = __webpack_require__(25);

	var _require = __webpack_require__(7),
	    buildCompatContainer = _require.buildCompatContainer;

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec) {
	  return buildCompatContainer(Component, fragmentSpec, ReactRelayFragmentContainer.createContainerWithFragments);
	}

	module.exports = { createContainer: createContainer };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayCompatEnvironment
	 * 
	 * @format
	 */

	'use strict';

	var isClassicRelayEnvironment = __webpack_require__(22);

	var _require = __webpack_require__(5),
	    isRelayModernEnvironment = _require.isRelayModernEnvironment;

	function getRelayModernEnvironment(environment) {
	  if (isRelayModernEnvironment(environment)) {
	    return environment;
	  }
	}

	function getRelayClassicEnvironment(environment) {
	  if (isClassicRelayEnvironment(environment)) {
	    return environment;
	  }
	}

	module.exports = {
	  getRelayClassicEnvironment: getRelayClassicEnvironment,
	  getRelayModernEnvironment: getRelayModernEnvironment
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayCompatMutations
	 * 
	 * @format
	 */

	'use strict';

	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(13);

	var _require = __webpack_require__(30),
	    getRelayClassicEnvironment = _require.getRelayClassicEnvironment,
	    getRelayModernEnvironment = _require.getRelayModernEnvironment;

	var _require2 = __webpack_require__(5),
	    applyOptimisticMutation = _require2.applyOptimisticMutation,
	    commitMutation = _require2.commitMutation;

	var RelayCompatMutations = {
	  commitUpdate: function commitUpdate(environment, config) {
	    var relayStaticEnvironment = getRelayModernEnvironment(environment);
	    if (relayStaticEnvironment) {
	      return commitMutation(relayStaticEnvironment, config);
	    } else {
	      var relayClassicEnvironment = getRelayClassicEnvironment(environment);
	      !relayClassicEnvironment ?  true ? invariant(false, 'RelayCompatMutations: Expected an object that conforms to the ' + '`RelayEnvironmentInterface`, got `%s`.', environment) : invariant(false) : void 0;
	      return commitRelayClassicMutation(
	      // getRelayClassicEnvironment returns a RelayEnvironmentInterface
	      // (classic APIs), but we need the modern APIs on old core here.
	      relayClassicEnvironment, config);
	    }
	  },
	  applyUpdate: function applyUpdate(environment, config) {
	    var relayStaticEnvironment = getRelayModernEnvironment(environment);
	    if (relayStaticEnvironment) {
	      return applyOptimisticMutation(relayStaticEnvironment, config);
	    } else {
	      var relayClassicEnvironment = getRelayClassicEnvironment(environment);
	      !relayClassicEnvironment ?  true ? invariant(false, 'RelayCompatMutations: Expected an object that conforms to the ' + '`RelayEnvironmentInterface`, got `%s`.', environment) : invariant(false) : void 0;
	      return applyRelayClassicMutation(
	      // getRelayClassicEnvironment returns a RelayEnvironmentInterface
	      // (classic APIs), but we need the modern APIs on old core here.
	      relayClassicEnvironment, config);
	    }
	  }
	};

	function commitRelayClassicMutation(environment, _ref) {
	  var configs = _ref.configs,
	      mutation = _ref.mutation,
	      onCompleted = _ref.onCompleted,
	      onError = _ref.onError,
	      optimisticResponse = _ref.optimisticResponse,
	      variables = _ref.variables,
	      uploadables = _ref.uploadables;
	  var getOperation = environment.unstable_internal.getOperation;

	  var operation = getOperation(mutation);
	  // TODO: remove this check after we fix flow.
	  if (typeof optimisticResponse === 'function') {
	     true ? warning(false, 'RelayCompatMutations: Expected `optimisticResponse` to be an object, ' + 'received a function.') : void 0;
	    optimisticResponse = optimisticResponse();
	  }
	  if (optimisticResponse) {
	    optimisticResponse = validateOptimisticResponse(operation, optimisticResponse);
	  }

	  return environment.sendMutation({
	    configs: configs || [],
	    operation: operation,
	    onCompleted: onCompleted,
	    onError: onError,
	    optimisticResponse: optimisticResponse,
	    variables: variables,
	    uploadables: uploadables
	  });
	}

	function applyRelayClassicMutation(environment, _ref2) {
	  var configs = _ref2.configs,
	      mutation = _ref2.mutation,
	      optimisticResponse = _ref2.optimisticResponse,
	      variables = _ref2.variables;
	  var getOperation = environment.unstable_internal.getOperation;

	  var operation = getOperation(mutation);

	  // RelayClassic can't update anything without response.
	  if (!optimisticResponse) {
	    return { dispose: function dispose() {} };
	  }

	  optimisticResponse = validateOptimisticResponse(operation, optimisticResponse);
	  return environment.applyMutation({
	    configs: configs || [],
	    operation: operation,
	    optimisticResponse: optimisticResponse,
	    variables: variables
	  });
	}

	function validateOptimisticResponse(operation, optimisticResponse) {
	  if (operation.node.kind === 'Mutation' && operation.node.calls && operation.node.calls.length === 1) {
	    var mutationRoot = operation.node.calls[0].name;
	    if (optimisticResponse[mutationRoot]) {
	      return optimisticResponse[mutationRoot];
	    } else {
	       true ? warning(false, 'RelayCompatMutations: Expected result from `optimisticResponse`' + 'to contain the mutation name `%s` as a property, got `%s`', mutationRoot, optimisticResponse) : void 0;
	    }
	  }
	  return optimisticResponse;
	}

	module.exports = RelayCompatMutations;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayCompatPaginationContainer
	 * 
	 * @format
	 */

	'use strict';

	var ReactRelayPaginationContainer = __webpack_require__(26);
	var RelayPropTypes = __webpack_require__(2);

	var _require = __webpack_require__(7),
	    buildCompatContainer = _require.buildCompatContainer;

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, connectionConfig) {
	  var Container = buildCompatContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return ReactRelayPaginationContainer.createContainerWithFragments(ComponentClass, fragments, connectionConfig);
	  });
	  /* $FlowFixMe(>=0.53.0) This comment suppresses an error
	   * when upgrading Flow's support for React. Common errors found when
	   * upgrading Flow's React support are documented at
	   * https://fburl.com/eq7bs81w */
	  Container.childContextTypes = {
	    relay: RelayPropTypes.Relay
	  };
	  return Container;
	}

	module.exports = { createContainer: createContainer };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayCompatRefetchContainer
	 * 
	 * @format
	 */

	'use strict';

	var ReactRelayRefetchContainer = __webpack_require__(28);
	var RelayPropTypes = __webpack_require__(2);

	var _require = __webpack_require__(7),
	    buildCompatContainer = _require.buildCompatContainer;

	/**
	 * Wrap the basic `createContainer()` function with logic to adapt to the
	 * `context.relay.environment` in which it is rendered. Specifically, the
	 * extraction of the environment-specific version of fragments in the
	 * `fragmentSpec` is memoized once per environment, rather than once per
	 * instance of the container constructed/rendered.
	 */
	function createContainer(Component, fragmentSpec, taggedNode) {
	  var Container = buildCompatContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
	    return ReactRelayRefetchContainer.createContainerWithFragments(ComponentClass, fragments, taggedNode);
	  });
	  /* $FlowFixMe(>=0.53.0) This comment suppresses an error
	   * when upgrading Flow's support for React. Common errors found when
	   * upgrading Flow's React support are documented at
	   * https://fburl.com/eq7bs81w */
	  Container.childContextTypes = {
	    relay: RelayPropTypes.Relay
	  };
	  return Container;
	}

	module.exports = { createContainer: createContainer };

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayContainerProxy
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * This feature is deprecated and unavailable in open source.
	 */
	var RelayContainerProxy = {
	  proxyMethods: function proxyMethods(Container, Component) {},
	  injectProxyMethods: function injectProxyMethods(proxyMethods) {
	    this.proxyMethods = proxyMethods;
	  }
	};

	module.exports = RelayContainerProxy;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayFragmentReference
	 * 
	 * @format
	 */

	'use strict';

	var _extends2 = __webpack_require__(4);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var QueryBuilder = __webpack_require__(19);

	var forEachObject = __webpack_require__(48);
	var invariant = __webpack_require__(1);
	var warning = __webpack_require__(13);

	/**
	 * @internal
	 *
	 * RelayFragmentReference is the return type of fragment composition:
	 *
	 *   fragment on Foo {
	 *     ${Child.getFragment('bar', {baz: variables.qux})}
	 *   }
	 *
	 * Whereas a fragment defines a sub-query's structure, a fragment reference is
	 * a particular instantiation of the fragment as it is composed within a query
	 * or another fragment. It encodes the source fragment, initial variables, and
	 * a mapping from variables in the composing query's (or fragment's) scope to
	 * variables in the fragment's scope.
	 *
	 * The variable mapping is represented by `variableMapping`, a dictionary that
	 * maps from names of variables in the parent scope to variables that exist in
	 * the fragment. Example:
	 *
	 * ```
	 * // Fragment:
	 * var Container = Relay.createContainer(..., {
	 *   initialVariables: {
	 *     private: 'foo',
	 *     public: 'bar',
	 *     variable: null,
	 *   },
	 *   fragments: {
	 *     foo: ...
	 *   }
	 * });
	 *
	 * // Reference:
	 * ${Container.getQuery(
	 *   'foo',
	 *   // Variable Mapping:
	 *   {
	 *     public: 'BAR',
	 *     variable: variables.source,
	 *   }
	 * )}
	 * ```
	 *
	 * When evaluating the referenced fragment, `$public` will be overridden with
	 * `'Bar'`. The value of `$variable` will become the value of `$source` in the
	 * outer scope. This is analagous to:
	 *
	 * ```
	 * function inner(private = 'foo', public = 'bar', variable) {}
	 * function outer(source) {
	 *   inner(public = 'BAR', variable = source);
	 * }
	 * ```
	 *
	 * Where the value of the inner `variable` depends on how `outer` is called.
	 *
	 * The `prepareVariables` function allows for variables to be modified based on
	 * the runtime environment or route name.
	 */
	var RelayFragmentReference = function () {
	  RelayFragmentReference.createForContainer = function createForContainer(fragmentGetter, initialVariables, variableMapping, prepareVariables) {
	    var reference = new RelayFragmentReference(fragmentGetter, initialVariables, variableMapping, prepareVariables);
	    reference._isContainerFragment = true;
	    return reference;
	  };

	  function RelayFragmentReference(fragmentGetter, initialVariables, variableMapping, prepareVariables) {
	    (0, _classCallCheck3['default'])(this, RelayFragmentReference);

	    this._conditions = null;
	    this._initialVariables = initialVariables || {};
	    this._fragment = undefined;
	    this._fragmentGetter = fragmentGetter;
	    this._isContainerFragment = false;
	    this._isDeferred = false;
	    this._isTypeConditional = false;
	    this._variableMapping = variableMapping;
	    this._prepareVariables = prepareVariables;
	  }

	  RelayFragmentReference.prototype.conditionOnType = function conditionOnType() {
	    this._isTypeConditional = true;
	    return this;
	  };

	  RelayFragmentReference.prototype.getConditions = function getConditions() {
	    return this._conditions;
	  };

	  RelayFragmentReference.prototype.getFragmentUnconditional = function getFragmentUnconditional() {
	    var fragment = this._fragment;
	    if (fragment == null) {
	      fragment = this._fragmentGetter();
	      this._fragment = fragment;
	    }
	    return fragment;
	  };

	  RelayFragmentReference.prototype.getInitialVariables = function getInitialVariables() {
	    return this._initialVariables;
	  };

	  RelayFragmentReference.prototype.getVariableMapping = function getVariableMapping() {
	    return this._variableMapping;
	  };

	  /**
	   * Mark this usage of the fragment as deferred.
	   */


	  RelayFragmentReference.prototype.defer = function defer() {
	    this._isDeferred = true;
	    return this;
	  };

	  /**
	   * Mark this fragment for inclusion only if the given variable is truthy.
	   */


	  RelayFragmentReference.prototype['if'] = function _if(value) {
	    var callVariable = QueryBuilder.getCallVariable(value);
	    !callVariable ?  true ? invariant(false, 'RelayFragmentReference: Invalid value `%s` supplied to `if()`. ' + 'Expected a variable.', callVariable) : invariant(false) : void 0;
	    this._addCondition({
	      passingValue: true,
	      variable: callVariable.callVariableName
	    });
	    return this;
	  };

	  /**
	   * Mark this fragment for inclusion only if the given variable is falsy.
	   */


	  RelayFragmentReference.prototype.unless = function unless(value) {
	    var callVariable = QueryBuilder.getCallVariable(value);
	    !callVariable ?  true ? invariant(false, 'RelayFragmentReference: Invalid value `%s` supplied to `unless()`. ' + 'Expected a variable.', callVariable) : invariant(false) : void 0;
	    this._addCondition({
	      passingValue: false,
	      variable: callVariable.callVariableName
	    });
	    return this;
	  };

	  /**
	   * Get the referenced fragment if all conditions are met.
	   */


	  RelayFragmentReference.prototype.getFragment = function getFragment(variables) {
	    // determine if the variables match the supplied if/unless conditions
	    var conditions = this._conditions;
	    if (conditions && !conditions.every(function (_ref) {
	      var variable = _ref.variable,
	          passingValue = _ref.passingValue;

	      return !!variables[variable] === passingValue;
	    })) {
	      return null;
	    }
	    return this.getFragmentUnconditional();
	  };

	  /**
	   * Get the variables to pass to the referenced fragment, accounting for
	   * initial values, overrides, and route-specific variables.
	   */


	  RelayFragmentReference.prototype.getVariables = function getVariables(route, variables) {
	    var _this = this;

	    var innerVariables = (0, _extends3['default'])({}, this._initialVariables);

	    // map variables from outer -> inner scope
	    var variableMapping = this._variableMapping;
	    if (variableMapping) {
	      forEachObject(variableMapping, function (value, name) {
	        var callVariable = QueryBuilder.getCallVariable(value);
	        if (callVariable) {
	          value = variables[callVariable.callVariableName];
	        }
	        if (value === undefined) {
	           true ? warning(false, 'RelayFragmentReference: Variable `%s` is undefined in fragment ' + '`%s`.', name, _this.getFragmentUnconditional().name) : void 0;
	        } else {
	          innerVariables[name] = value;
	        }
	      });
	    }

	    var prepareVariables = this._prepareVariables;
	    if (prepareVariables) {
	      innerVariables = prepareVariables(innerVariables, route);
	    }

	    return innerVariables;
	  };

	  RelayFragmentReference.prototype.isContainerFragment = function isContainerFragment() {
	    return this._isContainerFragment;
	  };

	  RelayFragmentReference.prototype.isDeferred = function isDeferred() {
	    return this._isDeferred;
	  };

	  RelayFragmentReference.prototype.isTypeConditional = function isTypeConditional() {
	    return this._isTypeConditional;
	  };

	  RelayFragmentReference.prototype._addCondition = function _addCondition(condition) {
	    var conditions = this._conditions;
	    if (!conditions) {
	      conditions = [];
	      this._conditions = conditions;
	    }
	    conditions.push(condition);
	  };

	  return RelayFragmentReference;
	}();

	module.exports = RelayFragmentReference;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayGraphQLTag
	 * 
	 * @format
	 */

	'use strict';

	var RelayQL = __webpack_require__(38);

	var invariant = __webpack_require__(1);

	/**
	 * Runtime function to correspond to the `graphql` tagged template function.
	 * All calls to this function should be transformed by the plugin.
	 */
	function graphql() {
	   true ?  true ? invariant(false, 'graphql: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `graphql`.') : invariant(false) : void 0;
	}

	/**
	 * Variant of the `graphql` tag that enables experimental features.
	 */
	graphql.experimental = function () {
	   true ?  true ? invariant(false, 'graphql.experimental: Unexpected invocation at runtime. Either the ' + 'Babel transform was not set up, or it failed to identify this call ' + 'site. Make sure it is being used verbatim as `graphql.experimental`.') : invariant(false) : void 0;
	};

	function getClassicFragment(taggedNode) {
	  return RelayQL.__getClassicFragment(taggedNode);
	}

	function getClassicOperation(taggedNode) {
	  return RelayQL.__getClassicOperation(taggedNode);
	}

	module.exports = {
	  getClassicFragment: getClassicFragment,
	  getClassicOperation: getClassicOperation,
	  graphql: graphql
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayNodeInterface
	 * 
	 * @format
	 */

	'use strict';

	var forEachRootCallArg = __webpack_require__(41);
	var invariant = __webpack_require__(1);

	var getResultsFromPayloadImpl = getResultsFromPayload;

	/**
	 * @internal
	 *
	 * Defines logic relevant to the informal "Node" GraphQL interface.
	 */
	var RelayNodeInterface = {
	  ANY_TYPE: '__any',
	  ID: 'id',
	  ID_TYPE: 'ID!',
	  NODE: 'node',
	  NODE_TYPE: 'Node',
	  NODES: 'nodes',
	  TYPENAME: '__typename',

	  isNodeRootCall: function isNodeRootCall(fieldName) {
	    return fieldName === RelayNodeInterface.NODE || fieldName === RelayNodeInterface.NODES;
	  },
	  getResultsFromPayload: function getResultsFromPayload(query, payload) {
	    return getResultsFromPayloadImpl(query, payload);
	  },


	  /**
	   * Allow for injecting custom behavior for getResultsFromPayload.
	   */
	  injectGetResultsFromPayloadImpl: function injectGetResultsFromPayloadImpl(impl) {
	    getResultsFromPayloadImpl = impl;
	  }
	};

	function getResultsFromPayload(query, payload) {
	  var results = [];

	  var rootBatchCall = query.getBatchCall();
	  if (rootBatchCall) {
	    getPayloadRecords(query, payload).forEach(function (result) {
	      if (typeof result !== 'object' || !result) {
	        return;
	      }
	      var dataID = result[RelayNodeInterface.ID];
	      !(typeof dataID === 'string') ?  true ? invariant(false, 'RelayNodeInterface.getResultsFromPayload(): Unable to write ' + 'result with no `%s` field for query, `%s`.', RelayNodeInterface.ID, query.getName()) : invariant(false) : void 0;
	      results.push({
	        result: result,
	        rootCallInfo: {
	          storageKey: RelayNodeInterface.NODE,
	          identifyingArgKey: dataID,
	          identifyingArgValue: dataID
	        }
	      });
	    });
	  } else {
	    var records = getPayloadRecords(query, payload);
	    var ii = 0;
	    var _storageKey = query.getStorageKey();
	    forEachRootCallArg(query, function (_ref) {
	      var identifyingArgKey = _ref.identifyingArgKey,
	          identifyingArgValue = _ref.identifyingArgValue;

	      var result = records[ii++];
	      results.push({
	        result: result,
	        rootCallInfo: { storageKey: _storageKey, identifyingArgKey: identifyingArgKey, identifyingArgValue: identifyingArgValue }
	      });
	    });
	  }

	  return results;
	}

	function getPayloadRecords(query, payload) {
	  var fieldName = query.getFieldName();
	  var identifyingArg = query.getIdentifyingArg();
	  var identifyingArgValue = identifyingArg && identifyingArg.value || null;
	  var records = payload[fieldName];
	  if (!query.getBatchCall()) {
	    if (Array.isArray(identifyingArgValue)) {
	      !Array.isArray(records) ?  true ? invariant(false, 'RelayNodeInterface: Expected payload for root field `%s` to be ' + 'an array with %s results, instead received a single non-array result.', fieldName, identifyingArgValue.length) : invariant(false) : void 0;
	      !(records.length === identifyingArgValue.length) ?  true ? invariant(false, 'RelayNodeInterface: Expected payload for root field `%s` to be ' + 'an array with %s results, instead received an array with %s results.', fieldName, identifyingArgValue.length, records.length) : invariant(false) : void 0;
	    } else if (Array.isArray(records)) {
	       true ?  true ? invariant(false, 'RelayNodeInterface: Expected payload for root field `%s` to be ' + 'a single non-array result, instead received an array with %s results.', fieldName, records.length) : invariant(false) : void 0;
	    }
	  }
	  return Array.isArray(records) ? records : [records || null];
	}

	module.exports = RelayNodeInterface;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayQL
	 * 
	 * @format
	 */

	'use strict';

	var QueryBuilder = __webpack_require__(19);
	var RelayFragmentReference = __webpack_require__(35);
	var RelayRouteFragment = __webpack_require__(39);

	var generateConcreteFragmentID = __webpack_require__(21);
	var invariant = __webpack_require__(1);

	/**
	 * @public
	 *
	 * This is a tag function used with template strings to provide the facade of a
	 * runtime GraphQL parser. Example usage:
	 *
	 *   Relay.QL`fragment on User { name }`
	 *
	 * In actuality, a Babel transform parses these tag templates and replaces it
	 * with an internal representation of the query structure.
	 */
	function RelayQL(strings) {
	   true ?  true ? invariant(false, 'RelayQL: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `Relay.QL`.') : invariant(false) : void 0;
	}

	function assertValidFragment(substitution) {
	  !(substitution instanceof RelayFragmentReference || QueryBuilder.getFragment(substitution) || QueryBuilder.getFragmentSpread(substitution)) ?  true ? invariant(false, 'RelayQL: Invalid fragment composition, use ' + "`${Child.getFragment('name')}`.") : invariant(false) : void 0;
	}

	var CLASSIC_NODE = '__classic_node__';

	/**
	 * Private helper methods used by the transformed code.
	 */
	Object.assign(RelayQL, {
	  __frag: function __frag(substitution) {
	    if (typeof substitution === 'function') {
	      // Route conditional fragment, e.g. `${route => matchRoute(route, ...)}`.
	      return new RelayRouteFragment(substitution);
	    }
	    if (substitution != null) {
	      if (Array.isArray(substitution)) {
	        substitution.forEach(assertValidFragment);
	      } else {
	        assertValidFragment(substitution);
	      }
	    }
	    return substitution;
	  },
	  __var: function __var(expression) {
	    var variable = QueryBuilder.getCallVariable(expression);
	    if (variable) {
	       true ?  true ? invariant(false, 'RelayQL: Invalid argument `%s` supplied via template substitution. ' + 'Instead, use an inline variable (e.g. `comments(count: $count)`).', variable.callVariableName) : invariant(false) : void 0;
	    }
	    return QueryBuilder.createCallValue(expression);
	  },
	  __id: function __id() {
	    return generateConcreteFragmentID();
	  },
	  __createFragment: function __createFragment(fragment, variableMapping) {
	    return new RelayFragmentReference(function () {
	      return fragment;
	    }, null, variableMapping);
	  },


	  /**
	   * Memoizes the results of executing the `.classic()` functions on
	   * graphql`...` tagged expressions. Memoization allows the framework to use
	   * object equality checks to compare fragments (useful, for example, when
	   * comparing two `Selector`s to see if they select the same data).
	   */
	  __getClassicNode: function __getClassicNode(taggedNode) {
	    var concreteNode = taggedNode[CLASSIC_NODE];
	    if (concreteNode == null) {
	      var fn = taggedNode.classic;
	      !(typeof fn === 'function') ?  true ? invariant(false, 'RelayQL: Expected a graphql literal, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', JSON.stringify(taggedNode)) : invariant(false) : void 0;
	      concreteNode = fn(this);
	      taggedNode[CLASSIC_NODE] = concreteNode;
	    }
	    return concreteNode;
	  },
	  __getClassicFragment: function __getClassicFragment(taggedNode) {
	    var concreteNode = this.__getClassicNode(taggedNode);
	    var fragment = QueryBuilder.getFragmentDefinition(concreteNode);
	    !fragment ?  true ? invariant(false, 'RelayQL: Expected a fragment, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode) : invariant(false) : void 0;
	    return fragment;
	  },
	  __getClassicOperation: function __getClassicOperation(taggedNode) {
	    var concreteNode = this.__getClassicNode(taggedNode);
	    var operation = QueryBuilder.getOperationDefinition(concreteNode);
	    !operation ?  true ? invariant(false, 'RelayQL: Expected an operation, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode) : invariant(false) : void 0;
	    return operation;
	  }
	});

	module.exports = RelayQL;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule RelayRouteFragment
	 * 
	 * @format
	 */

	'use strict';

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Represents a query fragment that is conditional upon the active route as a
	 * function that returns either a literal fragment or a fragment reference.
	 *
	 * Example GraphQL:
	 *
	 * ```
	 * Node {
	 *   ${(route) => matchRoute(route, ...)}
	 * }
	 * ```
	 */
	var RelayRouteFragment = function () {
	  function RelayRouteFragment(builder) {
	    (0, _classCallCheck3['default'])(this, RelayRouteFragment);

	    this._builder = builder;
	  }

	  /**
	   * Returns the query fragment that matches the given route, if any.
	   */


	  RelayRouteFragment.prototype.getFragmentForRoute = function getFragmentForRoute(route) {
	    return this._builder(route);
	  };

	  return RelayRouteFragment;
	}();

	module.exports = RelayRouteFragment;

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule forEachRootCallArg
	 * 
	 * @format
	 */

	'use strict';

	var invariant = __webpack_require__(1);
	var stableStringify = __webpack_require__(44);

	/**
	 * @internal
	 *
	 * Iterates over the identifying arguments in the supplied root call.
	 * If the identifying value is null or undefined, the supplied callback will be
	 * invoked once.
	 */
	function forEachRootCallArg(query, callback) {
	  !!query.getBatchCall() ?  true ? invariant(false, 'forEachRootCallArg(): Cannot iterate over batch call variables.') : invariant(false) : void 0;
	  function each(identifyingArgValue, fn) {
	    if (Array.isArray(identifyingArgValue)) {
	      identifyingArgValue.forEach(function (value) {
	        return each(value, fn);
	      });
	    } else {
	      fn({
	        identifyingArgValue: identifyingArgValue,
	        identifyingArgKey: identifyingArgValue == null ? null : typeof identifyingArgValue === 'string' ? identifyingArgValue : stableStringify(identifyingArgValue)
	      });
	    }
	  }
	  var identifyingArg = query.getIdentifyingArg();
	  var identifyingArgValue = identifyingArg && identifyingArg.value || null;
	  each(identifyingArgValue, callback);
	}

	module.exports = forEachRootCallArg;

/***/ }),
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule stableStringify
	 * 
	 * @format
	 */

	'use strict';

	function isObject(value) {
	  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
	}

	/**
	 * Simple recursive stringifier that handles basic objects (does not handle
	 * corner cases such as circular references) and produces a JSON-like
	 * serialization suitable for use as a cache key or other similar internal
	 * book-keeping detail.
	 *
	 * Sample input:
	 *
	 *     var object = {
	 *       top2: {
	 *         middle: {
	 *           inner: [1, 'foo', ['bar', 2]],
	 *           other: false,
	 *         },
	 *       },
	 *       top1: [
	 *         {first: true},
	 *         {first: false},
	 *         'random',
	 *       ],
	 *       misc: true,
	 *       extra: null,
	 *     };
	 *
	 * Sample output (some whitespace added for clarity):
	 *
	 *    {
	 *      extra:null,
	 *      misc:true,
	 *      top1:[0:{first:true},1:{first:false},2:"random"],
	 *      top2:{middle:{inner:[0:1,1:"foo",2:[0:"bar",1:2]],other:false}}
	 *    }
	 */
	function stableStringify(input) {
	  var inputIsArray = Array.isArray(input);
	  var inputIsObject = isObject(input);
	  if (inputIsArray || inputIsObject) {
	    var keys = Object.keys(input);
	    if (keys.length) {
	      var result = [];
	      keys.sort();

	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = input[key];
	        if (isObject(value) || Array.isArray(value)) {
	          value = stableStringify(value);
	        } else {
	          value = JSON.stringify(value);
	        }
	        result.push(key + ':' + value);
	      }

	      if (inputIsArray) {
	        return '[' + result.join(',') + ']';
	      } else {
	        return '{' + result.join(',') + '}';
	      }
	    }
	  }
	  return JSON.stringify(input);
	}

	module.exports = stableStringify;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_45__;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_46__;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_47__;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_49__;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ })
/******/ ])
});
;