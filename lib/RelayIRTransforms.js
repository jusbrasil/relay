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

var RelayApplyFragmentArgumentTransform = require('./RelayApplyFragmentArgumentTransform');
var RelayConnectionTransform = require('./RelayConnectionTransform');
var RelayDeferrableFragmentTransform = require('./RelayDeferrableFragmentTransform');
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
    InlineFragmentsTransform = _require.InlineFragmentsTransform,
    SkipClientFieldTransform = _require.SkipClientFieldTransform,
    SkipRedundantNodesTransform = _require.SkipRedundantNodesTransform,
    SkipUnreachableNodeTransform = _require.SkipUnreachableNodeTransform,
    StripUnusedVariablesTransform = _require.StripUnusedVariablesTransform;

// Transforms applied to the code used to process a query response.
var relaySchemaExtensions = [RelayConnectionTransform.SCHEMA_EXTENSION, RelayRelayDirectiveTransform.SCHEMA_EXTENSION];

// Transforms applied to both operations and fragments for both reading and
// writing from the store.
var relayCommonTransforms = [RelayConnectionTransform.transform, RelayViewerHandleTransform.transform, RelayRelayDirectiveTransform.transform, RelayMaskTransform.transform, RelayDeferrableFragmentTransform.transformOperations];

// Transforms applied to fragments used for reading data from a store
var relayFragmentTransforms = [RelayFieldHandleTransform.transform, FlattenTransform.transformWithOptions({ flattenAbstractTypes: true }), SkipRedundantNodesTransform.transform];

// Transforms applied to queries/mutations/subscriptions that are used for
// fetching data from the server and parsing those responses.
var relayQueryTransforms = [RelayDeferrableFragmentTransform.transformSpreads, RelayApplyFragmentArgumentTransform.transform, SkipClientFieldTransform.transform, SkipUnreachableNodeTransform.transform, RelayGenerateIDFieldTransform.transform];

// Transforms applied to the code used to process a query response.
var relayCodegenTransforms = [InlineFragmentsTransform.transform, FlattenTransform.transformWithOptions({ flattenAbstractTypes: true }), SkipRedundantNodesTransform.transform, RelayGenerateTypeNameTransform.transform, FilterDirectivesTransform.transform];

// Transforms applied before printing the query sent to the server.
var relayPrintTransforms = [FlattenTransform.transformWithOptions({}), RelayGenerateTypeNameTransform.transform, RelaySkipHandleFieldTransform.transform, FilterDirectivesTransform.transform, StripUnusedVariablesTransform.transform];

module.exports = {
  commonTransforms: relayCommonTransforms,
  codegenTransforms: relayCodegenTransforms,
  fragmentTransforms: relayFragmentTransforms,
  printTransforms: relayPrintTransforms,
  queryTransforms: relayQueryTransforms,
  schemaExtensions: relaySchemaExtensions
};