import Ember from 'ember';
import {
  module,
  test
} from 'qunit';

import startApp from '../helpers/start-app';

var application;

module('Acceptance: ActiveLink', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('component should show correct active state', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('#index-link li.active').length, 1);
    assert.equal(find('#index-link li.active a.active').length, 1);
    assert.equal(find('#other-link li.active').length, 0);
    assert.equal(find('#other-link li.active a.active').length, 0);

    click('#other-link a');

    andThen(function() {
      assert.equal(currentPath(), 'other');
      assert.equal(find('#index-link li.active').length, 0);
      assert.equal(find('#index-link li.active a.active').length, 0);
      assert.equal(find('#other-link li.active').length, 1);
      assert.equal(find('#other-link li.active a.active').length, 1);
    });
  });
});

test('component should show correct disabled state', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('#index-link-disabled li.disabled').length, 1);
    assert.equal(find('#index-link-disabled li.disabled a.disabled').length, 1);
  });
});

test('changed active class should be applied to the proper elements', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('#linkto-active-class li.enabled').length, 1);
    assert.equal(find('#linkto-active-class a.enabled').length, 1);
    assert.equal(find('#activelink-active-class li.enabled').length, 1);
    assert.equal(find('#activelink-active-class a.active').length, 1);
  });
});

test('changed disabled class should be applied to the proper elements', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('#linkto-disabled-class li.inactive').length, 1);
    assert.equal(find('#linkto-disabled-class a.inactive').length, 1);
    assert.equal(find('#activelink-disabled-class li.inactive').length, 1);
    assert.equal(find('#activelink-disabled-class a.disabled').length, 1);
  });
});

test('change the linkSelector to look for a button', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.equal(find('#button-links li.active').length, 1);
    assert.equal(find('#button-links li.active button.active').length, 1);
  });
});
