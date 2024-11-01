import { useState } from "react";
import * as sessionActions from '../../store/sessionsReducer';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Navigate to='/' replace={true} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
    }

    const demoLogin = (e) => {
        e.preventDefault();

        dispatch(sessionActions.login({
            credential: 'Demo-lition',
            password: 'password'
        }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
    }

    return (
        <>
            <h1>Log In</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <label>
                    Username or Email:
                    <input
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Log In</button>
                <button onClick={(e) => demoLogin(e)}>Demo Login</button>
            </form>
        </>
    );
}

export default LoginForm;