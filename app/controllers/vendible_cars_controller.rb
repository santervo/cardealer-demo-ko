class VendibleCarsController < ApplicationController

    def index 
        render json: VendibleCar.all
    end
end
