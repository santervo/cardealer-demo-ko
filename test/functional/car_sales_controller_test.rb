require 'test_helper'

class CarSalesControllerTest < ActionController::TestCase
    setup do
        @car_sale = FactoryGirl.create(:car_sale)
    end

    should "route to index" do
        assert_recognizes({controller: "car_sales", action: "index"}, "car_sales")
    end

    should "route to save_contract" do
        assert_recognizes(
            {controller: "car_sales", action: "save_contract", id: "XYZ"}, 
            {path: "car_sales/XYZ/sale_contract", method: :post})
    end

    should "return list of sales" do
        get "index", format: :json

        data = JSON.parse(response.body)
        assert_equal @car_sale.id.to_s, data[0]["_id"]
    end

    should "save contract" do
        post :save_contract, id: @car_sale.id, sale_contract: {customer: "Matti", price: 9000}
        @car_sale.reload

        assert_response :success
        assert_not_nil @car_sale.sale_contract
        assert_equal "Matti", @car_sale.sale_contract.customer
    end

end
