class CarSalesController < ApplicationController

    def index 
        @car_sales = CarSale.all
    end

    def create
        @car_sale = CarSale.create(params[:car_sale])
        @car_sale.save!
    end

    def create_sale_contract
        @car_sale = CarSale.find(params[:car_sale_id])
        @car_sale.update_attributes!(saleContract: params[:sale_contract])
        render json: {}
    end
end
