# json.camera do
    json.set! @camera.id do
        json.partial! "camera", camera: @camera
    end
# end