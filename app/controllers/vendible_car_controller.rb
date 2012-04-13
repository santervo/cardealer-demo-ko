class VendibleCarController < ApplicationController

    def index 
        render json: VendibleCar.all
    end
end
