sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController, MessageBox) => {
    "use strict";

    return BaseController.extend("app.flightbookings.controller.EditView", {
        onInit() {
            let oRouter = this.getRouter();
            oRouter.getRoute("RouteEditView").attachPatternMatched(this._onObjectMatched, this);
        },
        onNavBack() {
            this.getRouter().navTo("RouteBookView");
        }
        
    });
});
