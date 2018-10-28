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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayContainerProxy = require('./RelayContainerProxy');
var RelayGraphQLTag = require('./RelayGraphQLTag');
var RelayPropTypes = require('./RelayPropTypes');

var assertFragmentMap = require('./assertFragmentMap');
var invariant = require('fbjs/lib/invariant');
var mapObject = require('fbjs/lib/mapObject');

var _require = require('./RelayContainerUtils'),
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
  !!injectedDefaultVariablesProvider ? process.env.NODE_ENV !== 'production' ? invariant(false, 'injectDefaultVariablesProvider must be called no more than once.') : invariant(false) : void 0;
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
    !taggedNode ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactRelayCompatContainerBuilder: Expected a fragment named `%s` to be defined ' + 'on `%s`.', fragmentName, containerName) : invariant(false) : void 0;
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
  ComponentClass.__container__ = ContainerConstructor;

  return ContainerConstructor;
}

module.exports = { injectDefaultVariablesProvider: injectDefaultVariablesProvider, buildCompatContainer: buildCompatContainer };