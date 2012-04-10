$(document).ready(function() {
    var SaleContract = function(customer, price) {
        this.customer = ko.observable(customer);
        this.price = ko.observable(price);
    };
    var Car = function(model, yearModel, licenceNumber, price, saleContract) {
        this.model = ko.observable(model);
        this.yearModel = ko.observable(yearModel);
        this.licenceNumber = ko.observable(licenceNumber);
        this.price = ko.observable(price);
        this.saleContract = ko.observable(saleContract);
        var self = this;
        this.isVendible = ko.computed(function() {
            return !self.saleContract();
        });
        this.isSold = ko.computed(function() {
            return !!self.saleContract();
        });
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
            return _.filter(self.cars(), function(car) { return car.isVendible();});
        };
        self.soldCars = function() {
            return _.filter(self.cars(), function(car) { return car.isSold();});
        };
        self.carToSell = ko.observable();
        self.saleContract = ko.observable();
        self.sellModal = $("#sell-modal");
        self.sellButtonClicked = function(car) {
            self.saleContract(new SaleContract);
            self.carToSell(car);
            self.sellModal.modal("show");
        };
        self.sellCar = function() {
            self.carToSell().saleContract(self.saleContract());
            self.carToSell(null);
            self.sellModal.modal("hide");
        };
    }

    ko.applyBindings(new CarDealerViewModel());
});
