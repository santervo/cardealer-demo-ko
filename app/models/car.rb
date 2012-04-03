class Car
  include MongoMapper::Document

  key :licenceNumber, String
  key :model, String
  key :yearModel, String
  key :price, Float

end
