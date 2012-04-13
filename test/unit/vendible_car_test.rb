require 'test_helper'

class VendibleCarTest < ActiveSupport::TestCase
	should validate_presence_of :price
	should validate_numericality_of :price

    should validate_presence_of :car
    should allow_value(FactoryGirl.build(:car)).for(:car)
    should_not allow_value(FactoryGirl.build(:invalid_car)).for(:car)
end
