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

var RelayQueryConfig = require('./RelayQueryConfig');

var forEachObject = require('fbjs/lib/forEachObject');
var invariant = require('fbjs/lib/invariant');

var createURI = function createURI() {
  return null;
};

/**
 * Describes the root queries, param definitions and other metadata for a given
 * path (URI).
 */

var RelayRoute = function (_RelayQueryConfig) {
  (0, _inherits3['default'])(RelayRoute, _RelayQueryConfig);

  function RelayRoute(initialVariables, uri) {
    (0, _classCallCheck3['default'])(this, RelayRoute);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _RelayQueryConfig.call(this, initialVariables));

    var constructor = _this.constructor;
    var routeName = constructor.routeName,
        path = constructor.path;


    !(constructor !== RelayRoute) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayRoute: Abstract class cannot be instantiated.') : invariant(false) : void 0;
    !routeName ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: Subclasses of RelayRoute must define a `routeName`.', constructor.name || '<<anonymous>>') : invariant(false) : void 0;

    // $FlowIssue #9905535 - Object.defineProperty doesn't understand getters
    Object.defineProperty(_this, 'uri', {
      enumerable: true,
      get: function get() {
        if (!uri && path) {
          uri = createURI(constructor, this.params);
        }
        return uri;
      }
    });
    return _this;
  }

  RelayRoute.prototype.prepareVariables = function prepareVariables(prevVariables) {
    var _constructor = this.constructor,
        paramDefinitions = _constructor.paramDefinitions,
        prepareParams = _constructor.prepareParams,
        routeName = _constructor.routeName;

    var params = prevVariables;
    if (prepareParams) {
      /* $FlowFixMe(>=0.17.0) - params is ?Tv but prepareParams expects Tv */
      params = prepareParams(params);
    }
    if (paramDefinitions) {
      forEachObject(paramDefinitions, function (paramDefinition, paramName) {
        if (params) {
          if (params.hasOwnProperty(paramName)) {
            return;
          } else {
            // Backfill param so that a call variable is created for it.
            params[paramName] = undefined;
          }
        }
        !!paramDefinition.required ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayRoute: Missing required parameter `%s` in `%s`. Check the ' + 'supplied params or URI.', paramName, routeName) : invariant(false) : void 0;
      });
    }
    return params;
  };

  RelayRoute.injectURICreator = function injectURICreator(creator) {
    createURI = creator;
  };

  return RelayRoute;
}(RelayQueryConfig);

module.exports = RelayRoute;