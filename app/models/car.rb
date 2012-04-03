class Car
  include MongoMapper::Document

  key :licenceNumber, String, :required => true
  key :model, String, :required => true
  key :yearModel, Integer, :required => true, :numeric => true
  key :price, Float, :required => true, :numeric => true
  one :sale_contract

  validates_associated :sale_contract

end
