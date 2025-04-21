/*global QUnit*/

sap.ui.define([
	"app/flightbookings/controller/BookView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BookView Controller");

	QUnit.test("I should test the BookView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
