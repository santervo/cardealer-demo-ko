require 'test_helper'

class SaleContractTest < ActiveSupport::TestCase

    should validate_presence_of :customer
	should validate_presence_of :price
    should validate_presence_of :car
	should validate_numericality_of :price

    should allow_value(Car.new(licenceNumber: "XYZ-123", model: "Honda", yearModel: 2009)).for(:car)
    should_not allow_value(Car.new).for(:car)
end
