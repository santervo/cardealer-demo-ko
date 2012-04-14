require 'test_helper'

class SaleContractTest < ActiveSupport::TestCase
    should validate_presence_of :customer

	should validate_presence_of :price
	should validate_numericality_of :price
end
