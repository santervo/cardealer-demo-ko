class SaleContract
    include Mongoid::Document

    field :customer, type: String
    field :price, type: Float

    validates_presence_of :customer, :price
    validates_numericality_of :price
end
