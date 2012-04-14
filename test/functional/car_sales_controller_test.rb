require 'test_helper'

class CarSalesControllerTest < ActionController::TestCase
    setup do
        @car_sale = FactoryGirl.create(:car_sale)
    end

    should "route to index" do
        assert_recognizes({controller: "car_sales", action: "index"}, "car_sales")
    end

    should "return list of sales" do
        get "index", format: :json

        data = JSON.parse(response.body)
        assert_equal @car_sale.id.to_s, data[0]["_id"]
    end
end
