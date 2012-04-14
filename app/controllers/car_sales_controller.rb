class CarSalesController < ApplicationController

    def index 
        @car_sales = CarSale.all
    end

    def save_contract
        @car_sale = CarSale.find(params[:id])
        @car_sale.update_attributes!(sale_contract: params[:sale_contract])
        render json: {}
    end
end
