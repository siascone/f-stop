const RECEIVE_CAMERAS = 'cameras/receiveCameras';
const RECEIVE_CAMERA = 'cameras/receiveCamera';

const receive_cameras = (cameras) => {
    return {
        type: RECEIVE_CAMERAS,
        payload: cameras
    }
}

const receive_camera = (camera) => {
    return {
        type: RECEIVE_CAMERA,
        payload: camera
    }
}

export const fetchCameras = () => async dispatch => {
    const res = await fetch('/api/cameras');
    
    const data = await res.json()

    dispatch(receive_cameras(data.cameras));

    return data;
}

export const fetchCamera = (cameraId) => async dispatch => {
    const res = await fetch(`/api/cameras/${cameraId}`);

    const data = await res.json();

    dispatch(receive_camera(data.camera));

    return data;
}

const initialState = {};

const camerasReducer = (state = initialState, action) => {
    let nextState = { ...state };
     
    switch(action.type) {
        case RECEIVE_CAMERA:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case RECEIVE_CAMERAS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default camerasReducer;