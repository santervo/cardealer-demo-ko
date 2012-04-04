$(document).ready(function() {
	var Car = function(model, yearModel, licenceNumber, price) {
		this.model = ko.observable(model);
		this.yearModel = ko.observable(yearModel);
		this.licenceNumber = ko.observable(licenceNumber);
		this.price = ko.observable(price);
	};

	var CarDealerViewModel = function() {
		var self = this;
		self.cars = ko.observableArray([
			new Car("Honda", 2001, "XYZ-123", 3500.0)
			]);
		self.vendibleCars = function() {
			return self.cars;
		}
	}

	ko.applyBindings(new CarDealerViewModel());
});
