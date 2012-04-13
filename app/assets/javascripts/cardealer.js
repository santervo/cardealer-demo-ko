$(document).ready(function() {
    var SaleContract = function(data) {
        ko.mapping.fromJS(data, {}, this);
    };
    var VendibleCar = function(data) {
        ko.mapping.fromJS(data, {}, this);
    };
    var SaleTransaction = function(vendibleCar) {
        this.vendibleCar = vendibleCar;
        this.saleContract = new SaleContract({car: vendibleCar.car, customer: "", price: ""});
    };

    var CarDealerViewModel = function() {
        var self = this;
        self.vendibleCars = ko.observableArray();
        self.saleContracts = ko.observableArray();
        self.saleTransaction = ko.observable();
        self.sell = function(vendibleCar) {
            self.saleTransaction(new SaleTransaction(vendibleCar));
        };
        self.confirm = function() {
            self.saleContracts.push(self.saleTransaction().saleContract);
            self.vendibleCars.remove(self.saleTransaction().vendibleCar);
            self.saleTransaction(null);
        };
        self.cancel = function() {
            self.saleTransaction(null);
        };

        // Get initial cars
        $.get("/vendible_cars", function(data) {
            _.each(data, function(obj) {
                self.vendibleCars.push(new VendibleCar(obj));
            });
        });
    };

    ko.bindingHandlers.showModal = {
        init: function(element, valueAccessor) {
                  var value = ko.utils.unwrapObservable(valueAccessor());
                   if (value) {
                      $(element).modal("show");
                  }
              },
        update: function(element, valueAccessor) {
                    var value = ko.utils.unwrapObservable(valueAccessor());
                    $(element).modal(value ? "show" : "hide");
                }
    };

    ko.applyBindings(new CarDealerViewModel());
});
