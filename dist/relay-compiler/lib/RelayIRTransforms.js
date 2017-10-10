/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayIRTransforms
 * 
 * @format
 */

'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var InlineFragmentsTransform = require('./InlineFragmentsTransform');
var RelayApplyFragmentArgumentTransform = require('./RelayApplyFragmentArgumentTransform');
var RelayConnectionTransform = require('./RelayConnectionTransform');
var RelayFieldHandleTransform = require('./RelayFieldHandleTransform');
var RelayGenerateIDFieldTransform = require('./RelayGenerateIDFieldTransform');
var RelayGenerateTypeNameTransform = require('./RelayGenerateTypeNameTransform');
var RelayMaskTransform = require('./RelayMaskTransform');
var RelayRelayDirectiveTransform = require('./RelayRelayDirectiveTransform');
var RelaySkipHandleFieldTransform = require('./RelaySkipHandleFieldTransform');
var RelayViewerHandleTransform = require('./RelayViewerHandleTransform');

var _require = require('./GraphQLCompilerPublic'),
    FilterDirectivesTransform = _require.FilterDirectivesTransform,
    FlattenTransform = _require.FlattenTransform,
    IRTransforms = _require.IRTransforms,
    SkipRedundantNodesTransform = _require.SkipRedundantNodesTransform;

var fragmentTransforms = IRTransforms.fragmentTransforms,
    queryTransforms = IRTransforms.queryTransforms;

// Transforms applied to the code used to process a query response.

var relaySchemaExtensions = [RelayConnectionTransform.SCHEMA_EXTENSION, RelayRelayDirectiveTransform.SCHEMA_EXTENSION];

// Transforms applied to fragments used for reading data from a store
var relayFragmentTransforms = [function (ctx) {
  return RelayConnectionTransform.transform(ctx);
}, RelayViewerHandleTransform.transform, RelayRelayDirectiveTransform.transform, RelayFieldHandleTransform.transform].concat((0, _toConsumableArray3['default'])(fragmentTransforms));

// Transforms applied to queries/mutations/subscriptions that are used for
// fetching data from the server and parsing those responses.
var relayQueryTransforms = [function (ctx) {
  return RelayConnectionTransform.transform(ctx);
}, RelayViewerHandleTransform.transform, RelayApplyFragmentArgumentTransform.transform].concat((0, _toConsumableArray3['default'])(queryTransforms), [RelayRelayDirectiveTransform.transform, RelayGenerateIDFieldTransform.transform]);

// Transforms applied to the code used to process a query response.
var relayCodegenTransforms = [InlineFragmentsTransform.transform, function (ctx) {
  return FlattenTransform.transform(ctx, {
    flattenAbstractTypes: true
  });
}, SkipRedundantNodesTransform.transform,
// Must be put after `SkipRedundantNodesTransform` which could shuffle the order.
RelayGenerateTypeNameTransform.transform, FilterDirectivesTransform.transform];

// Transforms applied before printing the query sent to the server.
var relayPrintTransforms = [RelayMaskTransform.transform, function (ctx) {
  return FlattenTransform.transform(ctx, {});
}, RelayGenerateTypeNameTransform.transform, RelaySkipHandleFieldTransform.transform, FilterDirectivesTransform.transform];

module.exports = {
  codegenTransforms: relayCodegenTransforms,
  fragmentTransforms: relayFragmentTransforms,
  printTransforms: relayPrintTransforms,
  queryTransforms: relayQueryTransforms,
  schemaExtensions: relaySchemaExtensions
};