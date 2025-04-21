sap.ui.define([
    "./BaseController",
    "sap/ui/model/type/Date",
    "sap/m/MessageBox"
], (BaseController, Date, MessageBox) => {
    "use strict";

    return BaseController.extend("app.flightbookings.controller.CreateView", {
        onInit() {

        },

        onBookingsPage: function() {
            this.getRouter().navTo("RouteBookView");
        },

        onCreate: function() {
            // Prerequisites: Build Payload Object
            // Get Input Objects
            let oCarrid    = this.getView().byId("idCarrId");
            let oConnid    = this.getView().byId("idConnId");
            let oBookid    = this.getView().byId("idBookId");
            let oFldate    = this.getView().byId("idFldate");
            let oCustomid  = this.getView().byId("idCustomId");
            let oClass     = this.getView().byId("idClass");
            let oLoccuram  = this.getView().byId("idLoccuram");
            let oOrderDate = this.getView().byId("idOrderDate");
            let oCancelled = this.getView().byId("idCancelled");
        
            // Get Values
            let sCarrid    = oCarrid.getValue().trim().substring(0, 3);
            let sConnid    = oConnid.getValue().trim().substring(0, 4);
            let sBookid    = oBookid.getValue().trim().substring(0, 8);
            let sFldate    = oFldate.getDateValue().toISOString().split('.')[0];
            let sCustomid  = oCustomid.getValue().trim().substring(0, 8);
            let sClass     = oClass.getSelectedKey();
            let sLoccuram  = oLoccuram.getValue().trim();
            let sOrderDate = oOrderDate.getDateValue().toISOString().split('.')[0];
            let sCancelled = oCancelled.getSelected() ? "X" : "";
            
            //Create Payload Object
            let payload = {
                "Carrid": sCarrid,
                "Connid": sConnid,
                "Bookid": sBookid,
                "Fldate": sFldate,
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
            oModel.create(entitySet, payload, {
                success: (response) => {
                    MessageBox.success("Record Inserted", {
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