var CarDealer = {};

CarDealer.CarSale = function(data) {
    this.car = ko.observable();
    this.price = ko.observable();
    this.saleContract = ko.observable();
    ko.mapping.fromJS(data, {}, this);
};

CarDealer.SaleContract = function() {
    this.customer = ko.observable();
    this.price = ko.observable();
};

CarDealer.ApplicationViewModel = function() {
    var self = this;
    self.carSales = ko.observableArray();
    self.openSales = ko.computed(function() {
        return _.filter(self.carSales(), function(sale) { return !sale.saleContract() });
    });
    self.finishedSales = ko.computed(function() {
        return _.filter(self.carSales(), function(sale) { return !!sale.saleContract() });
    });
    self.saleForm = ko.observable();
    self.sell = function(sale) {
        self.saleForm(new CarDealer.SaleFormViewModel(sale, self.saleForm));
    };
    self.fetch = function() {
        $.get("/carSales", function(data) {
            _.each(data, function(obj) {
                self.carSales.push(new CarDealer.CarSale(obj));
            });
        });
    }
};

CarDealer.SaleFormViewModel = function(sale, container) {
    self.car = sale.car();
    self.saleContract = new CarDealer.SaleContract;
    self.confirm = function() {
        var path = "/carSales/" + sale._id() + "/saleContract";
        var data = {saleContract: ko.mapping.toJS(self.saleContract)};
        $.post(path, data, self.saveSuccess);
    };
    self.saveSuccess = function() {
        sale.saleContract(self.saleContract);
        container(null);
    };
    self.cancel = function() {
        container(null);
    };
};

