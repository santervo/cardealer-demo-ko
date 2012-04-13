FactoryGirl.define do
    factory :car do
        model "Honda"
        yearModel 2009
        licenceNumber "XYZ-123"
    end

    factory :invalid_car, class: Car do
        model "Honda"
        yearModel "abcd"
        licenceNumber "XYZ-123"
    end
end
