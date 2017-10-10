/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayCompilerCache
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var crypto = require('crypto');
var fs = require('fs');
var os = require('os');
var path = require('path');

/**
 * A file backed cache. Values are JSON encoded on disk, so only JSON
 * serializable values should be used.
 */

var RelayCompilerCache = function () {

  /**
   * @param name         Human readable identifier for the cache
   * @param cacheBreaker This should be changed in order to invalidate existing
   *                     caches.
   */
  function RelayCompilerCache(name, cacheBreaker) {
    (0, _classCallCheck3['default'])(this, RelayCompilerCache);

    // Include username in the cache dir to avoid issues with directories being
    // owned by a different user.
    var username = os.userInfo().username;
    var cacheID = crypto.createHash('md5').update(cacheBreaker).update(username).digest('hex');
    this._dir = path.join(os.tmpdir(), name + '-' + cacheID);
    if (!fs.existsSync(this._dir)) {
      fs.mkdirSync(this._dir);
    }
  }

  RelayCompilerCache.prototype.getOrCompute = function getOrCompute(key, compute) {
    var cacheFile = path.join(this._dir, key);
    if (fs.existsSync(cacheFile)) {
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    }
    var value = compute();
    fs.writeFileSync(cacheFile, JSON.stringify(value), 'utf8');
    return value;
  };

  return RelayCompilerCache;
}();

module.exports = RelayCompilerCache;