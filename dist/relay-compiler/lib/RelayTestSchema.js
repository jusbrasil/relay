/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayTestSchema
 * 
 * @format
 */

'use strict';

var fs = require('fs');
var path = require('path');

var _require = require('graphql'),
    buildASTSchema = _require.buildASTSchema,
    parse = _require.parse;

var schemaPath = path.join(__dirname, 'testschema.graphql');
module.exports = buildASTSchema(parse(fs.readFileSync(schemaPath, 'utf8')));