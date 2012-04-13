class SaleContract
    include Mongoid::Document

    field :customer, type: String
    field :price, type: Float
    embeds_one :car

    validates_presence_of :customer, :price, :car
    validates_numericality_of :price
end
