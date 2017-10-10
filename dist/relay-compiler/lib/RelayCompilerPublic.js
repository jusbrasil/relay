/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule RelayCompilerPublic
 * @format
 */

'use strict';

var RelayCompiler = require('./RelayCompiler');
var RelayFileWriter = require('./RelayFileWriter');
var RelayIRTransforms = require('./RelayIRTransforms');
var RelayJSModuleParser = require('./RelayJSModuleParser');

var formatGeneratedModule = require('./formatGeneratedModule');

var _require = require('./GraphQLCompilerPublic'),
    CodegenRunner = _require.CodegenRunner,
    ConsoleReporter = _require.ConsoleReporter,
    MultiReporter = _require.MultiReporter;

module.exports = {
  Compiler: RelayCompiler,
  ConsoleReporter: ConsoleReporter,

  /** @deprecated Use JSModuleParser. */
  FileIRParser: RelayJSModuleParser,

  FileWriter: RelayFileWriter,
  IRTransforms: RelayIRTransforms,
  JSModuleParser: RelayJSModuleParser,
  MultiReporter: MultiReporter,
  Runner: CodegenRunner,
  formatGeneratedModule: formatGeneratedModule
};