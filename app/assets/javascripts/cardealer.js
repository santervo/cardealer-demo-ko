$(document).ready(function() {
    var SaleContract = function(customer, price, status) {
        this.customer = ko.observable(customer);
        this.price = ko.observable(price);
    };
    var Car = function(model, yearModel, licenceNumber, price, saleContract) {
        var self = this;

        this.model = ko.observable(model);
        this.yearModel = ko.observable(yearModel);
        this.licenceNumber = ko.observable(licenceNumber);
        this.price = ko.observable(price);
        this.saleContract = ko.observable(saleContract);
        this.preparedContract = ko.observable();

        this.sold = ko.computed(function() {
            return !!self.saleContract();
        });

        this.prepared = ko.computed(function() {
            return !!self.preparedContract();
        });

        this.sell = function() {
            self.preparedContract(new SaleContract);
        };

        this.confirm = function() {
            self.saleContract(self.preparedContract());
            self.preparedContract(null);
        };

        this.revoke = function() {
            self.preparedContract(null);
        };
    };

    var CarDealerViewModel = function() {
        var self = this;
        self.cars = ko.observableArray([
                new Car("Honda", 2001, "XYZ-123", 3500.0),
                new Car("Citroen", 2004, "FGE-123", 5000.0),
                new Car("Toyota", 2005, "ABC-123", 7000.0, 
                    new SaleContract("Matti Meikäläinen", 6900.0))
                ]);
        self.vendibleCars = function() {
            return _.filter(self.cars(), function(car) { return !car.sold();});
        };
        self.soldCars = function() {
            return _.filter(self.cars(), function(car) { return car.sold();});
        };
        self.carToSell = ko.computed(function() {
            return _.find(self.vendibleCars(), function(car) {
                return car.prepared();
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
