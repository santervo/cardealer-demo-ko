require 'test_helper'

class VendibleCarsControllerTest < ActionController::TestCase
    setup do
        @vendible_car = FactoryGirl.create(:vendible_car)
    end

    should "route to index" do
        assert_recognizes({controller: "vendible_cars", action: "index"}, "vendible_cars")
    end

    should "return list of cars" do
        get "index", format: :json

        data = JSON.parse(response.body)
        assert_equal @vendible_car.id.to_s, data[0]["_id"]
    end
end
