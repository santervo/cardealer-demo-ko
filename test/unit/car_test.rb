require 'test_helper'

class CarTest < ActiveSupport::TestCase
	test "should get initial cars" do
		car = Car.new(:licenceNumber => "XYZ-123")
		car.save

		assert_equal 1, Car.all.size
	end
end
