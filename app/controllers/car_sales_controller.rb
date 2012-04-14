class CarSalesController < ApplicationController

    def index 
        render json: CarSale.all
    end
end
