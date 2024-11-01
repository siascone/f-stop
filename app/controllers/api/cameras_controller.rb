class Api::CamerasController < ApplicationController
    wrap_parameters include: Camera.attribute_names + []

    def index
        @cameras = Camera.all #.where(sku: false)
        render :index
    end

    def show
        @camera = Camera.find_by(id: params[:id])
        render :show
    end

    def create
        # set sold false here. 
        # use generate_unique_sku to set sku here
    end

    def update
        # set sold true here if update is a POS
    end

    private

    def camera_params
        params.require(:camera).permit(:id, :brand, :brand, :model, :year, :camera_type, :price, :sku, :format)
    end

end
