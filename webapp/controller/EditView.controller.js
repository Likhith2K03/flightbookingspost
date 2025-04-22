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
        },
        _onObjectMatched: function(oEvent) {
            let index = oEvent.getParameter("arguments").path;
            let sPath = "FlightModel>/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);
        },
        onUpdate: function() {
            // Prerequisites: Build Payload Object
            // Get Input Objects
            let oCustomid  = this.getView().byId("idCustomId");
            let oClass     = this.getView().byId("idClass");
            let oLoccuram  = this.getView().byId("idLoccuram");
            let oOrderDate = this.getView().byId("idOrderDate");
            let oCancelled = this.getView().byId("idCancelled");
        
            // Get Values
            let sCustomid  = oCustomid.getValue().trim().substring(0, 8);
            let sClass     = oClass.getSelectedKey();
            let sLoccuram  = oLoccuram.getValue().trim();
            let sOrderDate = oOrderDate.getDateValue().toISOString().split('.')[0];
            let sCancelled = oCancelled.getSelected() ? "X" : "";
            
            //Create Payload Object
            let payload = {
                "Customid": sCustomid,
                "Class": sClass,
                "Loccuram": sLoccuram,
                "OrderDate": sOrderDate,
                "Cancelled": sCancelled
            };
        
            // Step1: Get the Model
            let oModel = this.getModel();
        
            // Step2: Get the Entity
            let entitySet = `/flightbookingSet`;
        
            // Step3: Call the method (EntitySet, payload, callback func.(success, error))
            oModel.update(entitySet, payload, {
                success: (response) => {
                    MessageBox.success("Record Updated", {
                        onClose: () => this.getRouter().navTo("RouteBookView")
                    });
                },
                error: (error) => {
                    MessageBox.error("Failed to insert the record.");
                }
            });
        }
        
    });
});
