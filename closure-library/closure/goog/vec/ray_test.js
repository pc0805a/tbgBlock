// Copyright 2011 The Closure Library Authors. All Rights Reserved.
// Use of this source code is governed by the Apache License, Version 2.0.

goog.provide('goog.vec.RayTest');
goog.setTestOnly('goog.vec.RayTest');

goog.require('goog.testing.jsunit');
goog.require('goog.vec.Ray');

function testConstructor() {
  var new_ray = new goog.vec.Ray();
  assertElementsEquals([0, 0, 0], new_ray.origin);
  assertElementsEquals([0, 0, 0], new_ray.dir);

  new_ray = new goog.vec.Ray([1, 2, 3], [4, 5, 6]);
  assertElementsEquals([1, 2, 3], new_ray.origin);
  assertElementsEquals([4, 5, 6], new_ray.dir);
}

function testSet() {
  var new_ray = new goog.vec.Ray();
  new_ray.set([2, 3, 4], [5, 6, 7]);
  assertElementsEquals([2, 3, 4], new_ray.origin);
  assertElementsEquals([5, 6, 7], new_ray.dir);
}

function testSetOrigin() {
  var new_ray = new goog.vec.Ray();
  new_ray.setOrigin([1, 2, 3]);
  assertElementsEquals([1, 2, 3], new_ray.origin);
  assertElementsEquals([0, 0, 0], new_ray.dir);
}


function testSetDir() {
  var new_ray = new goog.vec.Ray();
  new_ray.setDir([2, 3, 4]);
  assertElementsEquals([0, 0, 0], new_ray.origin);
  assertElementsEquals([2, 3, 4], new_ray.dir);
}

function testEquals() {
  var r0 = new goog.vec.Ray([1, 2, 3], [4, 5, 6]);
  var r1 = new goog.vec.Ray([5, 2, 3], [4, 5, 6]);
  assertFalse(r0.equals(r1));
  assertFalse(r0.equals(null));
  assertTrue(r1.equals(r1));
  r1.setOrigin(r0.origin);
  assertTrue(r1.equals(r0));
  assertTrue(r0.equals(r1));
}
