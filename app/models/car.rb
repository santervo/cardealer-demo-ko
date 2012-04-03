class Car
  include MongoMapper::Document

  key :licenceNumber, String, :required => true
  key :model, String, :required => true
  key :yearModel, String, :required => true
  key :price, Float, :required => true

end
