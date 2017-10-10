/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayReferenceMarker
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayConcreteNode = require('./RelayConcreteNode');
var RelayModernRecord = require('./RelayModernRecord');
var RelayStoreUtils = require('./RelayStoreUtils');

var cloneRelayHandleSourceField = require('./cloneRelayHandleSourceField');
var invariant = require('fbjs/lib/invariant');

var CONDITION = RelayConcreteNode.CONDITION,
    FRAGMENT_SPREAD = RelayConcreteNode.FRAGMENT_SPREAD,
    INLINE_FRAGMENT = RelayConcreteNode.INLINE_FRAGMENT,
    LINKED_FIELD = RelayConcreteNode.LINKED_FIELD,
    LINKED_HANDLE = RelayConcreteNode.LINKED_HANDLE,
    SCALAR_FIELD = RelayConcreteNode.SCALAR_FIELD,
    SCALAR_HANDLE = RelayConcreteNode.SCALAR_HANDLE;
var getStorageKey = RelayStoreUtils.getStorageKey;


function mark(recordSource, selector, references) {
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;

  var marker = new RelayReferenceMarker(recordSource, variables, references);
  marker.mark(node, dataID);
}

/**
 * @private
 */

var RelayReferenceMarker = function () {
  function RelayReferenceMarker(recordSource, variables, references) {
    (0, _classCallCheck3['default'])(this, RelayReferenceMarker);

    this._references = references;
    this._recordSource = recordSource;
    this._variables = variables;
  }

  RelayReferenceMarker.prototype.mark = function mark(node, dataID) {
    this._traverse(node, dataID);
  };

  RelayReferenceMarker.prototype._traverse = function _traverse(node, dataID) {
    this._references.add(dataID);
    var record = this._recordSource.get(dataID);
    if (record == null) {
      return;
    }
    this._traverseSelections(node.selections, record);
  };

  RelayReferenceMarker.prototype._getVariableValue = function _getVariableValue(name) {
    !this._variables.hasOwnProperty(name) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReferenceMarker(): Undefined variable `%s`.', name) : invariant(false) : void 0;
    return this._variables[name];
  };

  RelayReferenceMarker.prototype._traverseSelections = function _traverseSelections(selections, record) {
    var _this = this;

    selections.forEach(function (selection) {
      if (selection.kind === LINKED_FIELD) {
        if (selection.plural) {
          _this._traversePluralLink(selection, record);
        } else {
          _this._traverseLink(selection, record);
        }
      } else if (selection.kind === CONDITION) {
        var conditionValue = _this._getVariableValue(selection.condition);
        if (conditionValue === selection.passingValue) {
          _this._traverseSelections(selection.selections, record);
        }
      } else if (selection.kind === INLINE_FRAGMENT) {
        var typeName = RelayModernRecord.getType(record);
        if (typeName != null && typeName === selection.type) {
          _this._traverseSelections(selection.selections, record);
        }
      } else if (selection.kind === FRAGMENT_SPREAD) {
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReferenceMarker(): Unexpected fragment spread `...%s`, ' + 'expected all fragments to be inlined.', selection.name) : invariant(false) : void 0;
      } else if (selection.kind === LINKED_HANDLE) {
        // The selections for a "handle" field are the same as those of the
        // original linked field where the handle was applied. Reference marking
        // therefore requires traversing the original field selections against
        // the synthesized client field.
        //
        // TODO: Instead of finding the source field in `selections`, change
        // the concrete structure to allow shared subtrees, and have the linked
        // handle directly refer to the same selections as the LinkedField that
        // it was split from.
        var handleField = cloneRelayHandleSourceField(selection, selections, _this._variables);
        if (handleField.plural) {
          _this._traversePluralLink(handleField, record);
        } else {
          _this._traverseLink(handleField, record);
        }
      } else {
        !(selection.kind === SCALAR_FIELD || selection.kind === SCALAR_HANDLE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReferenceMarker(): Unexpected ast kind `%s`.', selection.kind) : invariant(false) : void 0;
      }
    });
  };

  RelayReferenceMarker.prototype._traverseLink = function _traverseLink(field, record) {
    var storageKey = getStorageKey(field, this._variables);
    var linkedID = RelayModernRecord.getLinkedRecordID(record, storageKey);

    if (linkedID == null) {
      return;
    }
    this._traverse(field, linkedID);
  };

  RelayReferenceMarker.prototype._traversePluralLink = function _traversePluralLink(field, record) {
    var _this2 = this;

    var storageKey = getStorageKey(field, this._variables);
    var linkedIDs = RelayModernRecord.getLinkedRecordIDs(record, storageKey);

    if (linkedIDs == null) {
      return;
    }
    linkedIDs.forEach(function (linkedID) {
      if (linkedID != null) {
        _this2._traverse(field, linkedID);
      }
    });
  };

  return RelayReferenceMarker;
}();

module.exports = { mark: mark };