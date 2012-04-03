class SaleContract
  include MongoMapper::EmbeddedDocument

  key :customer, String, :required => true
  key :price, Float, :required => true, :numeric => true

end
