/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule BabelPluginRelay
 * 
 * @format
 */

'use strict';

var compileGraphQLTag = require('./compileGraphQLTag');
var compileRelayQLTag = require('./compileRelayQLTag');
var getDocumentName = require('./getDocumentName');
var getValidGraphQLTag = require('./getValidGraphQLTag');
var getValidRelayQLTag = require('./getValidRelayQLTag');
var invariant = require('./invariant');

/**
 * Using babel-plugin-relay with only the modern runtime?
 *
 *     {
 *       plugins: [
 *         "relay"
 *       ]
 *     }
 *
 * Using babel-plugin-relay in compatability or classic mode?
 *
 *     {
 *       plugins: [
 *         ["relay", {"compat": true, "schema": "path/to/schema.graphql"}]
 *       ]
 *     }
 *
 */
module.exports = function BabelPluginRelay(context) {
  var t = context.types;

  if (!t) {
    throw new Error('BabelPluginRelay: Expected plugin context to include "types", but got:' + String(context));
  }

  var visitor = {
    TaggedTemplateExpression: function TaggedTemplateExpression(path, state) {
      // Convert graphql`` literals
      var ast = getValidGraphQLTag(path);
      if (ast) {
        compileGraphQLTag(t, path, state, ast);
        return;
      }

      // Convert Relay.QL`` literals

      var _getValidRelayQLTag = getValidRelayQLTag(path),
          quasi = _getValidRelayQLTag[0],
          tagName = _getValidRelayQLTag[1],
          propName = _getValidRelayQLTag[2];

      if (quasi && tagName) {
        var _schema = state.opts && state.opts.schema;
        !_schema ? process.env.NODE_ENV !== 'production' ? invariant(false, 'babel-plugin-relay: Missing schema option. ' + 'Check your .babelrc file or wherever you configure your Babel ' + 'plugins to ensure the "relay" plugin has a "schema" option.\n' + 'https://facebook.github.io/relay/docs/babel-plugin-relay.html#additional-options') : invariant(false) : void 0;
        var documentName = getDocumentName(path, state);
        path.replaceWith(compileRelayQLTag(t, path, _schema, quasi, documentName, propName, tagName, true, // enableValidation
        state));
      }
    }
  };

  return {
    visitor: {
      Program: function Program(path, state) {
        path.traverse(visitor, state);
      }
    }
  };
};