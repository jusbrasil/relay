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

var GraphQLCompilerContext = require('./GraphQLCompilerContext');
var RelayCodeGenerator = require('./RelayCodeGenerator');
var RelayFileWriter = require('./RelayFileWriter');
var RelayIRTransforms = require('./RelayIRTransforms');
var RelayJSModuleParser = require('./RelayJSModuleParser');
var RelayParser = require('./RelayParser');

var compileRelayArtifacts = require('./compileRelayArtifacts');
var formatGeneratedModule = require('./formatGeneratedModule');

var _require = require('./GraphQLCompilerPublic'),
    ASTConvert = _require.ASTConvert,
    CodegenRunner = _require.CodegenRunner,
    ConsoleReporter = _require.ConsoleReporter,
    MultiReporter = _require.MultiReporter;

module.exports = {
  ConsoleReporter: ConsoleReporter,
  Parser: RelayParser,
  CodeGenerator: RelayCodeGenerator,

  GraphQLCompilerContext: GraphQLCompilerContext,

  /** @deprecated Use JSModuleParser. */
  FileIRParser: RelayJSModuleParser,

  FileWriter: RelayFileWriter,
  IRTransforms: RelayIRTransforms,
  JSModuleParser: RelayJSModuleParser,
  MultiReporter: MultiReporter,
  Runner: CodegenRunner,
  compileRelayArtifacts: compileRelayArtifacts,
  formatGeneratedModule: formatGeneratedModule,
  convertASTDocuments: ASTConvert.convertASTDocuments,
  transformASTSchema: ASTConvert.transformASTSchema
};