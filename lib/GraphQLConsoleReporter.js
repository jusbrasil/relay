/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule GraphQLConsoleReporter
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var chalk = require('chalk');

var GraphQLConsoleReporter = function () {
  function GraphQLConsoleReporter(options) {
    (0, _classCallCheck3['default'])(this, GraphQLConsoleReporter);

    this._verbose = options.verbose;
    this._quiet = options.quiet;
  }

  GraphQLConsoleReporter.prototype.reportMessage = function reportMessage(message) {
    if (!this._quiet) {
      process.stdout.write(message + '\n');
    }
  };

  GraphQLConsoleReporter.prototype.reportTime = function reportTime(name, ms) {
    if (this._verbose && !this.quiet) {
      var time = ms === 0 ? chalk.gray(' <1ms') : ms < 1000 ? chalk.blue(leftPad(5, ms + 'ms')) : chalk.red(Math.floor(ms / 10) / 100 + 's');
      process.stdout.write('  ' + time + ' ' + chalk.gray(name) + '\n');
    }
  };

  GraphQLConsoleReporter.prototype.reportError = function reportError(caughtLocation, error) {
    if (!this._quiet) {
      process.stdout.write(chalk.red('ERROR:\n' + error.message + '\n'));
      if (this._verbose) {
        var frames = error.stack.match(/^ {4}at .*$/gm);
        if (frames) {
          process.stdout.write(chalk.gray('From: ' + caughtLocation + '\n' + frames.join('\n') + '\n'));
        }
      }
    }
  };

  return GraphQLConsoleReporter;
}();

function leftPad(len, str) {
  return new Array(len - str.length + 1).join(' ') + str;
}

module.exports = GraphQLConsoleReporter;