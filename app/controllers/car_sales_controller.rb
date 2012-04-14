class CarSalesController < ApplicationController

    def index 
        @car_sales = CarSale.all
    end

    def save_contract
        @car_sale = CarSale.find(params[:id])
        @car_sale.update_attributes!(saleContract: params[:saleContract])
        render json: {}
    end
end
