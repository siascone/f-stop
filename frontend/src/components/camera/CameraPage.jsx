import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as cameraActions from '../../store/camerasReducer';

function CameraPage() {
    const dispatch = useDispatch();
    const {cameraId} = useParams();

    const camera = useSelector(state => state.cameras[cameraId]);

    useEffect(() => {
        dispatch(cameraActions.fetchCamera(cameraId));
    }, [dispatch, cameraId]);

    if (camera === undefined) return null;

    return (
        <>
            <h1>Camera Page</h1>
            <div>
                <h2>Brand: {camera.brand}</h2>
                <h3>Model: {camera.model}</h3>
                <h4>Version: {camera.version}</h4>
                <p>Price: {camera.price}</p>
                <p>SKU: {camera.sku}</p>
            </div>
        </>
    )
}

export default CameraPage;