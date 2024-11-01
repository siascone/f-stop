import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "./components/session/LoginForm";


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
            {/* <Navigation /> */}
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
            }
        ]
    }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
