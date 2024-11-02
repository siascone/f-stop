import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "./components/session/LoginForm";
import SignupForm from './components/session/SignupForm';
import Navigation from './components/navigation/Navigation';
import * as sessionActions from './store/sessionsReducer';
import CameraIndex from './components/camera/CameraIndex';
import CameraPage from './components/camera/CameraPage';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState();

    useEffect(() => {
        dispatch(sessionActions.restoreSession()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    return (
        <>
            <Navigation />
            {isLoaded && <Outlet />}
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <h1>Welcome to F-stop!</h1>
            },
            {
                path: '/login',
                element: <LoginForm />
            },
            {
                path: '/signup',
                element: <SignupForm />
            },
            {
                path: '/cameras',
                element: <CameraIndex />
            },
            {
                path: '/cameras/:cameraId',
                element: <CameraPage />
            }
        ]
    }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
