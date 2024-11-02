import { NavLink } from "react-router-dom"

function CameraIndexItem ({camera}) {

    return (
        <>
            <NavLink to={`/cameras/${camera.id}`}>{camera.brand} {camera.model}</NavLink>
        </>
    )
}

export default CameraIndexItem;