json.cameras do 
    @cameras.each do |camera|
        json.set! camera.id do
            json.partial! 'camera', camera: camera
        end
    end
end