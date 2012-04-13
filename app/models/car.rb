class Car
  include Mongoid::Document

  field :licenceNumber, type: String
  field :model, type: String
  field :yearModel, type: Integer

  validates_presence_of :model, :licenceNumber, :yearModel
  validates_numericality_of :yearModel
end
