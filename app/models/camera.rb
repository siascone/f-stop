class Camera < ApplicationRecord

    validates :brand, :model, :year, :camera_type, :price, :sku, :format, presence: true
    validates :sku, uniqueness: true 

    before_validation :ensures_sku

    private 

    def generate_unique_sku
        while true
            new_sku = [*10000000...99999999].sample
            return sku if !Camera.exists?(sku: new_sku)
        end
    end

    def ensures_sku
        if !self.sku
            self.sku = generate_unique_sku()
        end
    end
end
