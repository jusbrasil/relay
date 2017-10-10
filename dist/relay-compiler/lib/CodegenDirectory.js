/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule CodegenDirectory
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var fs = require('fs');
var invariant = require('fbjs/lib/invariant');
var path = require('path');

/**
 * CodegenDirectory is a helper class for scripts that generate code into one
 * output directory. The purpose is to make it easy to only write files that
 * have changed and delete files that are no longer generated.
 * It gives statistics about added/removed/updated/unchanged in the end.
 * The class also has an option to "validate" which means that no file
 * operations are performed and only the statistics are created for what would
 * have happened. If there's anything but "unchanged", someone probably forgot
 * to run the codegen script.
 *
 * Example:
 *
 *   const dir = new CodegenDirectory('/some/path/generated');
 *   // write files in case content changed (less watchman/mtime changes)
 *   dir.writeFile('OneFile.js', contents);
 *   dir.writeFile('OtherFile.js', contents);
 *
 *   // delete files that are not generated
 *   dir.deleteExtraFiles();
 *
 *   // arrays of file names to print or whatever
 *   dir.changes.created
 *   dir.changes.updated
 *   dir.changes.deleted
 *   dir.changes.unchanged
 */
var CodegenDirectory = function () {
  function CodegenDirectory(dir) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3['default'])(this, CodegenDirectory);

    this.onlyValidate = !!options.onlyValidate;
    if (fs.existsSync(dir)) {
      !fs.statSync(dir).isDirectory() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected `%s` to be a directory.', dir) : invariant(false) : void 0;
    } else if (!this.onlyValidate) {
      fs.mkdirSync(dir);
    }
    this._files = new Set();
    this.changes = {
      deleted: [],
      updated: [],
      created: [],
      unchanged: []
    };
    this._dir = dir;
  }

  CodegenDirectory.prototype.read = function read(filename) {
    var filePath = path.join(this._dir, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return null;
  };

  CodegenDirectory.prototype.markUnchanged = function markUnchanged(filename) {
    this._addGenerated(filename);
    this.changes.unchanged.push(filename);
  };

  /**
   * Marks a files as updated or out of date without actually writing the file.
   * This is probably only be useful when doing validation without intention to
   * actually write to disk.
   */


  CodegenDirectory.prototype.markUpdated = function markUpdated(filename) {
    this._addGenerated(filename);
    this.changes.updated.push(filename);
  };

  CodegenDirectory.prototype.writeFile = function writeFile(filename, content) {
    this._addGenerated(filename);
    var filePath = path.join(this._dir, filename);
    if (fs.existsSync(filePath)) {
      var existingContent = fs.readFileSync(filePath, 'utf8');
      if (existingContent === content) {
        this.changes.unchanged.push(filename);
      } else {
        this._writeFile(filePath, content);
        this.changes.updated.push(filename);
      }
    } else {
      this._writeFile(filePath, content);
      this.changes.created.push(filename);
    }
  };

  CodegenDirectory.prototype._writeFile = function _writeFile(filePath, content) {
    if (!this.onlyValidate) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  };

  /**
   * Deletes all non-generated files, except for invisible "dot" files (ie.
   * files with names starting with ".").
   */


  CodegenDirectory.prototype.deleteExtraFiles = function deleteExtraFiles() {
    var _this = this;

    fs.readdirSync(this._dir).forEach(function (actualFile) {
      if (!_this._files.has(actualFile) && !/^\./.test(actualFile)) {
        if (!_this.onlyValidate) {
          try {
            fs.unlinkSync(path.join(_this._dir, actualFile));
          } catch (e) {
            throw new Error('CodegenDirectory: Failed to delete `' + actualFile + '` in `' + _this._dir + '`.');
          }
        }
        _this.changes.deleted.push(actualFile);
      }
    });
  };

  CodegenDirectory.prototype.getPath = function getPath(filename) {
    return path.join(this._dir, filename);
  };

  CodegenDirectory.prototype._addGenerated = function _addGenerated(filename) {
    !!this._files.has(filename) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CodegenDirectory: Tried to generate `%s` twice in `%s`.', filename, this._dir) : invariant(false) : void 0;
    this._files.add(filename);
  };

  return CodegenDirectory;
}();

module.exports = CodegenDirectory;