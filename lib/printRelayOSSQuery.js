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

var Map = require('fbjs/lib/Map');
var RelayQuery = require('./RelayQuery');

var base62 = require('fbjs/lib/base62');
var invariant = require('fbjs/lib/invariant');
var nullthrows = require('fbjs/lib/nullthrows');

var _require = require('./RelayNodeInterface'),
    TYPENAME = _require.TYPENAME;

var _require2 = require('relay-runtime'),
    RelayProfiler = _require2.RelayProfiler;

var oneIndent = '';
var newLine = '';

if (process.env.NODE_ENV !== 'production') {
  oneIndent = '  ';
  newLine = '\n';
}

var EMPTY_CHILDREN = ' {' + newLine + oneIndent + TYPENAME + newLine + '}';

/**
 * @internal
 *
 * `printRelayOSSQuery(query)` returns a string representation of the query. The
 * supplied `node` must be flattened (and not contain fragments).
 */
function printRelayOSSQuery(node) {
  var fragmentTexts = [];
  var variableMap = new Map();
  var printerState = {
    fragmentCount: 0,
    fragmentNameByHash: {},
    fragmentNameByText: {},
    fragmentTexts: fragmentTexts,
    variableCount: 0,
    variableMap: variableMap
  };
  var queryText = null;
  if (node instanceof RelayQuery.Root) {
    queryText = printRoot(node, printerState);
  } else if (node instanceof RelayQuery.Operation) {
    queryText = printOperation(node, printerState);
  } else if (node instanceof RelayQuery.Fragment) {
    queryText = printFragment(node, printerState);
  } else if (node instanceof RelayQuery.OSSQuery) {
    queryText = printOSSQuery(node, printerState);
  }
  !queryText ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery(): Unsupported node type, got `%s`.', node) : invariant(false) : void 0;
  var variables = {};
  variableMap.forEach(function (variablesForType) {
    variablesForType.forEach(function (_ref) {
      var value = _ref.value,
          variableID = _ref.variableID;

      variables[variableID] = value;
    });
  });

  return {
    text: [queryText].concat(fragmentTexts).join(newLine.length ? newLine : ' '),
    variables: variables
  };
}

/**
 * Prints a query with (potentially) multiple root fields.
 */
function printOSSQuery(query, printerState) {
  var children = printChildren(query, printerState, oneIndent) || EMPTY_CHILDREN;
  var directives = printDirectives(query);
  // Note: variable definitions must be processed *after* traversing children
  var variableDefinitions = printVariableDefinitions(printerState);
  return 'query ' + query.getName() + variableDefinitions + directives + children;
}

/**
 * Prints the output of a classic Relay.QL query.
 */
function printRoot(node, printerState) {
  !!node.getBatchCall() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery(): Deferred queries are not supported.') : invariant(false) : void 0;
  var identifyingArg = node.getIdentifyingArg();
  var identifyingArgName = identifyingArg && identifyingArg.name || null;
  var identifyingArgType = identifyingArg && identifyingArg.type || null;
  var identifyingArgValue = identifyingArg && identifyingArg.value || null;
  var fieldName = node.getFieldName();
  if (identifyingArgValue != null) {
    !identifyingArgName ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery(): Expected an argument name for root field `%s`.', fieldName) : invariant(false) : void 0;
    var rootArgString = printArgument(identifyingArgName, identifyingArgValue, identifyingArgType, printerState);
    if (rootArgString) {
      fieldName += '(' + rootArgString + ')';
    }
  }
  // Note: children must be traversed before printing variable definitions
  var children = printChildren(node, printerState, oneIndent);
  var queryString = node.getName() + printVariableDefinitions(printerState);
  fieldName += printDirectives(node);

  if (children == null) {
    return 'query ' + queryString + EMPTY_CHILDREN;
  }

  return 'query ' + queryString + ' {' + newLine + oneIndent + fieldName + children + newLine + '}';
}

function printOperation(node, printerState) {
  var operationKind = node instanceof RelayQuery.Mutation ? 'mutation' : 'subscription';
  var call = node.getCall();
  var inputString = printArgument(node.getCallVariableName(), call.value, node.getInputType(), printerState);
  !inputString ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery(): Expected %s `%s` to have a value for `%s`.', operationKind, node.getName(), node.getCallVariableName()) : invariant(false) : void 0;
  // Note: children must be traversed before printing variable definitions
  var children = printChildren(node, printerState, oneIndent) || EMPTY_CHILDREN;
  var operationString = node.getName() + printVariableDefinitions(printerState);
  var fieldName = call.name + '(' + inputString + ')';

  return operationKind + ' ' + operationString + ' {' + newLine + oneIndent + fieldName + children + newLine + '}';
}

function printVariableDefinitions(_ref2) {
  var variableMap = _ref2.variableMap;

  var argStrings = null;
  variableMap.forEach(function (variablesForType, type) {
    variablesForType.forEach(function (_ref3) {
      var variableID = _ref3.variableID;

      argStrings = argStrings || [];
      argStrings.push('$' + variableID + ':' + type);
    });
  });
  if (argStrings) {
    return '(' + argStrings.join(',') + ')';
  }
  return '';
}

function printNonNullType(type) {
  if (type[type.length - 1] === '!') {
    return type;
  }
  return type + '!';
}

var isConditionDirective = function isConditionDirective(directive) {
  return directive.name === 'include' || directive.name === 'skip';
};

var isNonConditionDirective = function isNonConditionDirective(directive) {
  return !isConditionDirective(directive);
};

function printFragment(node, printerState) {
  return 'fragment ' + node.getDebugName() + ' on ' + node.getType() + printDirectivesAndChildren(node, printerState);
}

function printChildren(node, printerState, indent) {
  var childrenText = [];
  var children = node.getChildren();
  var fragments = void 0;
  for (var ii = 0; ii < children.length; ii++) {
    var child = children[ii];
    if (child instanceof RelayQuery.Field) {
      var fieldText = child.getSchemaName();
      var fieldCalls = child.getCallsWithValues();
      if (fieldCalls.length) {
        fieldText = child.getSerializationKey() + ':' + fieldText;
        var argTexts = [];
        for (var jj = 0; jj < fieldCalls.length; jj++) {
          var _fieldCalls$jj = fieldCalls[jj],
              name = _fieldCalls$jj.name,
              _value = _fieldCalls$jj.value;

          var argText = printArgument(name, _value, child.getCallType(name), printerState);
          if (argText) {
            argTexts.push(argText);
          }
        }
        if (argTexts.length) {
          fieldText += '(' + argTexts.join(',') + ')';
        }
      }
      fieldText += printDirectives(child);
      if (child.canHaveSubselections()) {
        var childText = printChildren(child, printerState, indent + oneIndent);
        if (childText != null) {
          fieldText += childText;
          childrenText.push(fieldText);
        }
      } else {
        childrenText.push(fieldText);
      }
    } else if (child instanceof RelayQuery.Fragment) {
      if (child.getChildren().length) {
        var _fragmentNameByHash = printerState.fragmentNameByHash,
            _fragmentNameByText = printerState.fragmentNameByText,
            _fragmentTexts = printerState.fragmentTexts;

        // Avoid walking fragments if we have printed the same one before.

        var _fragmentHash = child.getCompositeHash();

        var fragmentName = void 0;
        if (_fragmentNameByHash.hasOwnProperty(_fragmentHash)) {
          fragmentName = _fragmentNameByHash[_fragmentHash];
        } else {
          // Avoid reprinting a fragment that is identical to another fragment.
          var _fragmentText = child.getType() + printDirectivesAndChildren(child, printerState);
          if (_fragmentNameByText.hasOwnProperty(_fragmentText)) {
            fragmentName = _fragmentNameByText[_fragmentText];
          } else {
            fragmentName = 'F' + base62(printerState.fragmentCount++);
            _fragmentNameByHash[_fragmentHash] = fragmentName;
            _fragmentNameByText[_fragmentText] = fragmentName;
            _fragmentTexts.push('fragment ' + fragmentName + ' on ' + _fragmentText);
          }
        }
        if (!fragments || !fragments.hasOwnProperty(fragmentName)) {
          fragments = fragments || {};
          fragments[fragmentName] = true;
          childrenText.push('...' + fragmentName);
        }
      }
    } else {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery(): Expected a field or fragment, got `%s`.', child.constructor.name) : invariant(false) : void 0;
    }
  }
  if (!childrenText.length) {
    return null;
  }
  return ' {' + newLine + indent + oneIndent + childrenText.join(',' + newLine + indent + oneIndent) + newLine + indent + '}';
}

function printDirectives(node, filter) {
  var directiveStrings = void 0;
  node.getDirectives().forEach(function (directive) {
    if (filter && !filter(directive)) {
      return;
    }
    var dirString = '@' + directive.name;
    if (directive.args.length) {
      dirString += '(' + directive.args.map(printDirectiveArg).join(',') + ')';
    }
    directiveStrings = directiveStrings || [];
    directiveStrings.push(dirString);
  });
  if (!directiveStrings) {
    return '';
  }
  return ' ' + directiveStrings.join(' ');
}

function printDirectiveArg(_ref4) {
  var name = _ref4.name,
      value = _ref4.value;

  !(typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery(): Relay only supports directives with scalar values ' + '(boolean, number, or string), got `%s: %s`.', name, value) : invariant(false) : void 0;
  return name + ':' + JSON.stringify(value);
}

function printDirectivesAndChildren(node, printerState) {
  var conditionDirectives = printDirectives(node, isConditionDirective);
  var otherDirectives = printDirectives(node, isNonConditionDirective);

  return otherDirectives + (conditionDirectives ? ' {' + newLine + oneIndent + '...' + conditionDirectives + nullthrows(printChildren(node, printerState, oneIndent)) + newLine + '}' : nullthrows(printChildren(node, printerState, '')));
}

function printArgument(name, value, type, printerState) {
  if (value == null) {
    return value;
  }
  var stringValue = void 0;
  if (type != null) {
    var _variableID = createVariable(name, value, type, printerState);
    stringValue = '$' + _variableID;
  } else {
    stringValue = JSON.stringify(value);
  }
  return name + ':' + stringValue;
}

function createVariable(name, value, type, printerState) {
  !(value != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'printRelayOSSQuery: Expected a non-null value for variable `%s`.', name) : invariant(false) : void 0;
  var valueKey = JSON.stringify(value);
  var nonNullType = printNonNullType(type);
  var variablesForType = printerState.variableMap.get(nonNullType);
  if (!variablesForType) {
    variablesForType = new Map();
    printerState.variableMap.set(nonNullType, variablesForType);
  }
  var existingVariable = variablesForType.get(valueKey);
  if (existingVariable) {
    return existingVariable.variableID;
  } else {
    var _variableID2 = name + '_' + base62(printerState.variableCount++);
    variablesForType.set(valueKey, {
      value: value,
      variableID: _variableID2
    });
    return _variableID2;
  }
}

module.exports = RelayProfiler.instrument('printRelayQuery', printRelayOSSQuery);