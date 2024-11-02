import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cameraActions from '../../store/camerasReducer';
import { NavLink } from "react-router-dom";
import CameraIndexItem from "./CameraIndexItem";

function CameraIndex() {
    const dispatch = useDispatch();
    const cameras = useSelector(state => Object.values(state.cameras));

    useEffect(() => {
        dispatch(cameraActions.fetchCameras());
    }, [dispatch])

    if (!cameras) return (<></>)

    return (
        <>
            <h1>Camera Index</h1>
            <ul>
                {cameras.map(camera => {
                    return <li key={camera.id}><CameraIndexItem camera={camera}/></li>
                })}
            </ul>
        </>
    )

}

export default CameraIndex;