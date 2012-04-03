require 'test_helper'

class CarTest < ActiveSupport::TestCase
	setup do
		@valid_attrs = { :licenceNumber => "XYZ-123", :model => "Honda", :yearModel => 2010, :price => 5000.0 }
	end

	context "car with valid attributes" do
		setup do
			@car = Car.new @valid_attrs
		end

		should "save" do
			assert @car.save
		end
	end

	context "car without licence number" do
		setup do
			@car = Car.new @valid_attrs.merge(:licenceNumber => "")
		end

		should "not save" do
			assert !@car.save
		end
	end

	context "car without model" do
		setup do
			@car = Car.new @valid_attrs.merge(:model => "")
		end

		should "not save" do
			assert !@car.save
		end
	end


	context "car without yearModel" do
		setup do
			@car = Car.new @valid_attrs.merge(:yearModel => "")
		end

		should "not save" do
			assert !@car.save
		end
	end

	context "car without price" do
		setup do
			@car = Car.new @valid_attrs.merge(:price => "")
		end

		should "not save" do
			assert !@car.save
		end
	end
end
