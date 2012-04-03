require 'test_helper'

class CarTest < ActiveSupport::TestCase
	should validate_presence_of :licenceNumber
	should validate_presence_of :model
	should validate_presence_of :yearModel
	should validate_presence_of :price
end
