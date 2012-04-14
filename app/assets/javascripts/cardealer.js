$(document).ready(function() {
    var CarSale = function(data) {
        this.car = ko.observable();
        this.price = ko.observable();
        this.saleContract = ko.observable();
        ko.mapping.fromJS(data, {}, this);
    };
    var SaleContract = function() {
        this.customer = ko.observable();
        this.price = ko.observable();
    };

    var CarDealerViewModel = function() {
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
            self.saleForm(new SaleFormViewModel(sale, self.saleForm));
        };
        self.fetch = function() {
            $.get("/car_sales", function(data) {
                _.each(data, function(obj) {
                    self.carSales.push(new CarSale(obj));
                });
            });
        }
    };

    var SaleFormViewModel = function(sale, container) {
        self.car = sale.car();
        self.saleContract = new SaleContract;
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
     }

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

    var viewModel = new CarDealerViewModel;
    viewModel.fetch();
    ko.applyBindings(viewModel);
});
