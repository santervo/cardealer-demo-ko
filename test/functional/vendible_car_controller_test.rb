require 'test_helper'

class VendibleCarControllerTest < ActionController::TestCase
    setup do
        @vendible_car = FactoryGirl.create(:vendible_car)
    end

    should "return list of cars" do
        get "index", format: :json

        data = JSON.parse(response.body)
        p data
        assert_equal @vendible_car.id.to_s, data[0]["_id"]
    end
end
