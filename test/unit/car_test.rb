require 'test_helper'

class CarTest < ActiveSupport::TestCase
	should validate_presence_of :licenceNumber

	should validate_presence_of :model

	should validate_presence_of :yearModel
	should validate_numericality_of :yearModel

	should validate_presence_of :price
	should validate_numericality_of :price

	should allow_value(:customer => "Kalle Ankka", :price => 5000.0).for(:sale_contract)
	should_not allow_value({:customer => "", :price => 5000.0}).for(:sale_contract)
	should_not allow_value(:customer => "Kalle Ankka", :price => nil).for(:sale_contract)
	should_not allow_value(:customer => "Kalle Ankka", :price => "abcd").for(:sale_contract)

end
