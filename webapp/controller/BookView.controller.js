sap.ui.define([
    "./BaseController",
    "sap/ui/model/type/Date",
    "sap/m/MessageBox"
], (BaseController, Date, MessageBox) => {
    "use strict";

    return BaseController.extend("app.flightbookings.controller.BookView", {
        onInit() {
            this._getData();
        },

        onCreatePage(oEvent) {
            this.getRouter().navTo("RouteCreateView");
        },

        _getData() {
            let entitySet = `/flightbookingSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(entitySet, {
                success: (oData, response) => {
                    this.getModel("FlightModel").setData(oData.results);
                }
            })
        },

        onEdit(oEvent) {
            let oContext = oEvent.getSource().getBindingContext();
            if (oContext) {
                let oData = oContext.getObject();
                // Navigate to edit page or open a dialog for editing
                this.getRouter().navTo("RouteEditView", {
                    Carrid: oData.Carrid,
                    Connid: oData.Connid,
                    Bookid: oData.Bookid,
                    Fldate: oData.Fldate
                });
            } else {
                MessageBox.error("No binding context found.");
            }
        },

        onDelete(oEvent) {
            let entity = oEvent.getSource().getBindingContext().sPath;
            console.log(entity);    
            MessageBox.confirm("Are you sure to delete this entry?", {
                onClose: (choice) => {
                    if(choice==='OK') {
                        //call the private function here
                        this._onDeleteCall(entity);
                    }
                }
            });
        },

        _onDeleteCall(entity) {
            let oModel = this.getModel();
            oModel.remove(entity, {
                success: (response) => {
                    MessageBox.success("Record Deleted", {
                        onClose: () => {
                            this._getData();
                        }
                    });
                },
                error: (error) => {
                    MessageBox.error(error);
                }
            });
        },

        formatDate: function (value) {
            if (value) {
                var oDateFormat = new Date({ pattern: "dd/MM/yyyy" });
                return oDateFormat.formatValue(value, "string");
                }
            return value;
        }
        
    });
});
