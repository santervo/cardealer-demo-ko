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
        self.vendibleCars = ko.observableArray([
                new VendibleCar({
                    car: {model: "Honda", yearModel: 2001, licenceNumber: "XYZ-123"}, 
                    price: 3500.0}),
                new VendibleCar({
                    car: {model: "Citroen", yearModel: 2004, licenceNumber: "FGE-123"}, 
                    price: 3500.0})]);
        self.saleContracts = ko.observableArray([
                new SaleContract({
                    car: {model: "Toyota", yearModel: 2005, licenceNumber: "ABC-123"}, 
                    customer: "Matti Meikäläinen", price: 7000.0})]);
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
