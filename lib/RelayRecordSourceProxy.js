/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayRecordSourceProxy
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayModernRecord = require('./RelayModernRecord');
var RelayRecordProxy = require('./RelayRecordProxy');
var RelayRecordSourceSelectorProxy = require('./RelayRecordSourceSelectorProxy');

var invariant = require('fbjs/lib/invariant');
var normalizeRelayPayload = require('./normalizeRelayPayload');

var _require = require('./RelayRecordState'),
    EXISTENT = _require.EXISTENT,
    NONEXISTENT = _require.NONEXISTENT;

var _require2 = require('./RelayStoreUtils'),
    ROOT_ID = _require2.ROOT_ID,
    ROOT_TYPE = _require2.ROOT_TYPE;

/**
 * @internal
 *
 * A helper for manipulating a `RecordSource` via an imperative/OO-style API.
 */
var RelayRecordSourceProxy = function () {
  function RelayRecordSourceProxy(mutator, handlerProvider) {
    (0, _classCallCheck3['default'])(this, RelayRecordSourceProxy);

    this.__mutator = mutator;
    this._handlerProvider = handlerProvider || null;
    this._proxies = {};
  }

  RelayRecordSourceProxy.prototype.publishSource = function publishSource(source, fieldPayloads) {
    var _this = this;

    var dataIDs = source.getRecordIDs();
    dataIDs.forEach(function (dataID) {
      var status = source.getStatus(dataID);
      if (status === EXISTENT) {
        var sourceRecord = source.get(dataID);
        if (sourceRecord) {
          if (_this.__mutator.getStatus(dataID) !== EXISTENT) {
            _this.create(dataID, RelayModernRecord.getType(sourceRecord));
          }
          _this.__mutator.copyFieldsFromRecord(sourceRecord, dataID);
          delete _this._proxies[dataID];
        }
      } else if (status === NONEXISTENT) {
        _this['delete'](dataID);
      }
    });

    if (fieldPayloads && fieldPayloads.length) {
      fieldPayloads.forEach(function (fieldPayload) {
        var handler = _this._handlerProvider && _this._handlerProvider(fieldPayload.handle);
        !handler ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayModernEnvironment: Expected a handler to be provided for handle `%s`.', fieldPayload.handle) : invariant(false) : void 0;
        handler.update(_this, fieldPayload);
      });
    }
  };

  RelayRecordSourceProxy.prototype.commitPayload = function commitPayload(operation, response) {
    if (!response) {
      return new RelayRecordSourceSelectorProxy(this, operation.fragment);
    }

    var _normalizeRelayPayloa = normalizeRelayPayload(operation.root, response),
        source = _normalizeRelayPayloa.source,
        fieldPayloads = _normalizeRelayPayloa.fieldPayloads;

    this.publishSource(source, fieldPayloads);
    return new RelayRecordSourceSelectorProxy(this, operation.fragment);
  };

  RelayRecordSourceProxy.prototype.create = function create(dataID, typeName) {
    this.__mutator.create(dataID, typeName);
    delete this._proxies[dataID];
    var record = this.get(dataID);
    // For flow
    !record ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayRecordSourceProxy#create(): Expected the created record to exist.') : invariant(false) : void 0;
    return record;
  };

  RelayRecordSourceProxy.prototype['delete'] = function _delete(dataID) {
    !(dataID !== ROOT_ID) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayRecordSourceProxy#delete(): Cannot delete the root record.') : invariant(false) : void 0;
    delete this._proxies[dataID];
    this.__mutator['delete'](dataID);
  };

  RelayRecordSourceProxy.prototype.get = function get(dataID) {
    if (!this._proxies.hasOwnProperty(dataID)) {
      var status = this.__mutator.getStatus(dataID);
      if (status === EXISTENT) {
        this._proxies[dataID] = new RelayRecordProxy(this, this.__mutator, dataID);
      } else {
        this._proxies[dataID] = status === NONEXISTENT ? null : undefined;
      }
    }
    return this._proxies[dataID];
  };

  RelayRecordSourceProxy.prototype.getRoot = function getRoot() {
    var root = this.get(ROOT_ID);
    if (!root) {
      root = this.create(ROOT_ID, ROOT_TYPE);
    }
    !(root && root.getType() === ROOT_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayRecordSourceProxy#getRoot(): Expected the source to contain a ' + 'root record.') : invariant(false) : void 0;
    return root;
  };

  return RelayRecordSourceProxy;
}();

module.exports = RelayRecordSourceProxy;