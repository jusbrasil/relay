/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _taggedTemplateLiteral2 = require('./taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _templateObject = (0, _taggedTemplateLiteral3['default'])(['\n    fragment RelayModernFlowtest_notref on User {\n      id\n      ...RelayModernFlowtest_user\n    }\n  '], ['\n    fragment RelayModernFlowtest_notref on User {\n      id\n      ...RelayModernFlowtest_user\n    }\n  ']),
    _templateObject2 = (0, _taggedTemplateLiteral3['default'])(['\n    fragment RelayModernFlowtest_badref on User {\n      id\n      # Note: this test includes a reference, but *not the right one*.\n      ...RelayModernFlowtest_user\n    }\n  '], ['\n    fragment RelayModernFlowtest_badref on User {\n      id\n      # Note: this test includes a reference, but *not the right one*.\n      ...RelayModernFlowtest_user\n    }\n  ']),
    _templateObject3 = (0, _taggedTemplateLiteral3['default'])(['\n    fragment RelayModernFlowtest_user on User {\n      name\n    }\n  '], ['\n    fragment RelayModernFlowtest_user on User {\n      name\n    }\n  ']),
    _templateObject4 = (0, _taggedTemplateLiteral3['default'])(['\n    fragment RelayModernFlowtest_users on User @relay(plural: true) {\n      name\n    }\n  '], ['\n    fragment RelayModernFlowtest_users on User @relay(plural: true) {\n      name\n    }\n  ']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var React = require('react');

var nullthrows = require('fbjs/lib/nullthrows');

var _require = require('./ReactRelayPublic'),
    createFragmentContainer = _require.createFragmentContainer,
    graphql = _require.graphql;

var NotReferencedTest_ = function (_React$Component) {
  (0, _inherits3['default'])(NotReferencedTest_, _React$Component);

  function NotReferencedTest_() {
    (0, _classCallCheck3['default'])(this, NotReferencedTest_);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  NotReferencedTest_.prototype.render = function render() {
    return null;
  };

  return NotReferencedTest_;
}(React.Component);

var NotReferencedTest = createFragmentContainer(NotReferencedTest_, {
  notref: graphql(_templateObject)
});

var BadReferenceTest_ = function (_React$Component2) {
  (0, _inherits3['default'])(BadReferenceTest_, _React$Component2);

  function BadReferenceTest_() {
    (0, _classCallCheck3['default'])(this, BadReferenceTest_);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component2.apply(this, arguments));
  }

  BadReferenceTest_.prototype.render = function render() {
    this.props.badref.id;
    // $FlowExpectedError
    this.props.badref.name;
    // $FlowExpectedError The notref fragment was not used.
    return React.createElement(NotReferencedTest, { notref: this.props.badref });
  };

  return BadReferenceTest_;
}(React.Component);

var BadReferenceTest = createFragmentContainer(BadReferenceTest_, {
  badref: graphql(_templateObject2)
});

React.createElement(BadReferenceTest, { badref: someRef });

var SingularTest = function (_React$Component3) {
  (0, _inherits3['default'])(SingularTest, _React$Component3);

  function SingularTest() {
    (0, _classCallCheck3['default'])(this, SingularTest);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component3.apply(this, arguments));
  }

  SingularTest.prototype.render = function render() {
    nullthrows(this.props.user.name);
    // $FlowExpectedError
    this.props.nullableUser.name;
    // $FlowExpectedError
    this.props.optionalUser.name;
    nullthrows(nullthrows(this.props.nullableUser).name);
    nullthrows(nullthrows(this.props.optionalUser).name);
    return null;
  };

  return SingularTest;
}(React.Component);

SingularTest = createFragmentContainer(SingularTest, {
  user: graphql(_templateObject3)
});

var PluralTest = function (_React$Component4) {
  (0, _inherits3['default'])(PluralTest, _React$Component4);

  function PluralTest() {
    (0, _classCallCheck3['default'])(this, PluralTest);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component4.apply(this, arguments));
  }

  PluralTest.prototype.render = function render() {
    var names = this.props.users.map(function (user) {
      return user.name;
    }).filter(Boolean);
    names;
    // $FlowExpectedError
    names;
    return null;
  };

  return PluralTest;
}(React.Component);

PluralTest = createFragmentContainer(PluralTest, {
  users: graphql(_templateObject4)
});

function cb() {}

// $FlowExpectedError - can't pass null for user
React.createElement(SingularTest, { onClick: cb, string: 'x', user: null, nullableUser: null });
// $FlowExpectedError - user is required
React.createElement(SingularTest, { onClick: cb, string: 'x', nullableUser: null });
// $FlowExpectedError - can't pass non-user ref for user
React.createElement(SingularTest, { onClick: cb, string: 'x', user: nonUserRef, nullableUser: null });
// $FlowExpectedError - `cb` prop is not a function
React.createElement(SingularTest, { onClick: 'cb', string: 'x', user: aUserRef, nullableUser: null });
// $FlowExpectedError - `string` prop is not a string
React.createElement(SingularTest, { onClick: cb, string: 1, user: aUserRef, nullableUser: null });

React.createElement(SingularTest, { onClick: cb, string: 'x', user: aUserRef, nullableUser: null });
React.createElement(SingularTest, {
  onClick: cb,
  string: 'x',
  user: aUserRef,
  nullableUser: aUserRef
});
React.createElement(SingularTest, {
  onClick: cb,
  string: 'x',
  user: aUserRef,
  nullableUser: null,
  optionalUser: aUserRef
});

// $FlowExpectedError - optional, not nullable!
React.createElement(SingularTest, {
  string: 'x',
  user: aUserRef,
  nullableUser: null,
  optionalUser: null
});

React.createElement(SingularTest, {
  string: 'x',
  onClick: cb,
  user: aComplexUserRef,
  nullableUser: aComplexUserRef,
  optionalUser: aComplexUserRef
});

// $FlowExpectedError - can't pass null for user
React.createElement(PluralTest, { users: null, nullableUsers: null });
// $FlowExpectedError - users is required
React.createElement(PluralTest, { nullableUsers: null });
// $FlowExpectedError - can't pass non-user refs for user
React.createElement(PluralTest, { users: [nonUserRef], nullableUsers: null });

React.createElement(PluralTest, { users: usersRef, nullableUsers: null });

React.createElement(PluralTest, {
  users: [oneOfUsersRef],
  nullableUsers: null
});
React.createElement(PluralTest, { users: [oneOfUsersRef], nullableUsers: null });

React.createElement(PluralTest, { users: usersRef, nullableUsers: [oneOfUsersRef] });
React.createElement(PluralTest, { users: usersRef, nullableUsers: null, optionalUsers: usersRef });
// $FlowExpectedError - optional, not nullable!
React.createElement(PluralTest, { users: usersRef, nullableUsers: null, optionalUsers: null });

var AnyTest = function (_React$Component5) {
  (0, _inherits3['default'])(AnyTest, _React$Component5);

  function AnyTest() {
    (0, _classCallCheck3['default'])(this, AnyTest);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component5.apply(this, arguments));
  }

  return AnyTest;
}(React.Component);

AnyTest = createFragmentContainer(AnyTest, {});

React.createElement(AnyTest, {
  anything: 42,
  anyFunction: function anyFunction() {},
  maybeFunction: null,
  anyObject: {}
});
React.createElement(AnyTest, {
  anything: 42,
  anyFunction: function anyFunction() {},
  maybeFunction: function maybeFunction() {},
  anyObject: {}
});
// $FlowExpectedError - optional function cannot be null
React.createElement(AnyTest, {
  anything: 42,
  anyFunction: function anyFunction() {},
  optionalFunction: function optionalFunction() {},
  anyObject: {}
});
// $FlowExpectedError - can't pass {} for a Function
React.createElement(AnyTest, {
  anything: 42,
  anyFunction: {},
  maybeFunction: function maybeFunction() {},
  anyObject: {}
});