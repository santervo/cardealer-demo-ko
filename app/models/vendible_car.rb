class VendibleCar
    include Mongoid::Document

    field :price, type: Float
    embeds_one :car

    validates_presence_of :price, :car
    validates_numericality_of :price
end
