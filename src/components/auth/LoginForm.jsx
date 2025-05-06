import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_CLIENT_ID } from '../../config/globals';
import AuthService from '../../service/AuthService';
import { notify, ToastNotification } from '../notification/ToastNotification';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null); 
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (response) => {
        const token = response.credential;
        try {
            const res = await AuthService.loginForGoogle({ token });
            setUserInfo(res.data);
            if (res.data && res.data.jwt) {
                const userData = {
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    id: res.data.id,
                    jwt: res.data.jwt,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                notify(res.data.message || 'Usuario autenticado exitosamente', 'success');
                window.location.reload();
            }
        } catch (error) {
            notify(error.response.data, 'error'); 
        }
    };

    const handleLoginSuccess = async () => {
        if (!email || !password) {
            notify('Por favor, complete todos los campos', 'error');
            return;
        }

        const user = {
            email,
            password,
        };
        try {
            const res = await AuthService.login(user);
            setUserInfo(res.data);
            if (res.data && res.data.jwt) {
                const userData = {
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    id: res.data.id,
                    jwt: res.data.jwt,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                notify(res.data.message || 'Usuario autenticado exitosamente', 'success');
                window.location.reload();
            }
        } catch (error) {
            notify(error.response.data , 'error');
        }
    };

    const handleGoogleLoginError = () => {
        console.log('Error al iniciar sesión con Google');
        notify('Error al iniciar sesión con Google', 'error'); 
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <ToastNotification /> 
            <div className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-button" onClick={handleLoginSuccess}>Acceso</button> 
                <div className="forgot-password">
                    <a href="#">Olvidé mi contraseña</a>
                </div>
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        render={(renderProps) => (
                            <button
                                className="google-button"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <FcGoogle className="google-icon" />
                                Iniciar sesión con Google
                            </button>
                        )}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
