$(document).ready(function() {
    var SaleContract = function(car, customer, price) {
        this.car = car;
        this.customer = ko.observable(customer);
        this.price = ko.observable(price);
    };
    var Car = function(model, yearModel, licenceNumber, price) {
        this.model = ko.observable(model);
        this.yearModel = ko.observable(yearModel);
        this.licenceNumber = ko.observable(licenceNumber);
        this.price = ko.observable(price);
    };

    var CarDealerViewModel = function() {
        var self = this;
        self.cars = ko.observableArray([
                new Car("Honda", 2001, "XYZ-123", 3500.0),
                new Car("Citroen", 2004, "FGE-123", 5000.0)]);
        self.saleContracts = ko.observableArray([
                new SaleContract(new Car("Toyota", 2005, "ABC-123", 7000.0),
                    "Matti Meikäläinen", 6900.0)]);
        self.newSaleContract = ko.observable();
        self.sell = function(car) {
            self.newSaleContract(new SaleContract(car));
        };
        self.confirm = function() {
            self.saleContracts.push(self.newSaleContract());
            self.cars.remove(self.newSaleContract().car);
            self.newSaleContract(null);
        };
        self.cancel = function() {
            self.newSaleContract(null);
        };
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
