class CarSale
    include Mongoid::Document

    field :price, type: Float
    embeds_one :car
    embeds_one :saleContract

    validates_presence_of :price, :car
    validates_numericality_of :price
end
