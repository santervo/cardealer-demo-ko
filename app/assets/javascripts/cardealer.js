var CarDealer = {};

CarDealer.CarSale = function(data) {
    this._id = ko.observable();
    this.car = ko.observable();
    this.price = ko.observable();
    this.saleContract = ko.observable();

    var defaults = {car: {model: "", yearModel: "", licenceNumber: ""}, price: ""};
    data = _.extend(defaults, data);
    ko.mapping.fromJS(data, {}, this);
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
    self.saleContractForm = ko.observable();
    self.sell = function(sale) {
        self.saleContractForm(new CarDealer.SaleContractForm(sale, self.saleContractForm));
    };
    self.saleForm = ko.observable();
    self.addCar = function() {
        self.saleForm(new CarDealer.SaleForm(new CarDealer.CarSale, self.carSales, self.saleForm));
    }
    self.fetch = function() {
        $.get("/car_sales", function(data) {
            _.each(data, function(obj) {
                self.carSales.push(new CarDealer.CarSale(obj));
            });
        });
    }
};

CarDealer.SaleForm = function(sale, carSales, container) {
    var self = this;
    self.car = sale.car;
    self.price = sale.price;
    self.confirm = function() {
        var path = "/car_sales";
        var data = {car_sale: ko.mapping.toJS(sale)};
        $.post(path, data, self.saveSuccess);
    };
    self.saveSuccess = function(data) {
        alert(JSON.stringify(data));
        ko.mapping.fromJS(data.car_sale, sale);
        carSales.push(sale);
        container(null);
    };
    self.cancel = function() {
        container(null);
    };
};

CarDealer.SaleContractForm = function(sale, container) {
    var self = this;
    self.car = sale.car();
    self.saleContract = ko.mapping.fromJS({customer: "", price: ""});
    self.confirm = function() {
        var path = "/car_sales/" + sale._id() + "/sale_contract";
        var data = {sale_contract: ko.mapping.toJS(self.saleContract)};
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

