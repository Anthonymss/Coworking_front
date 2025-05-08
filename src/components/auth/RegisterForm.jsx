import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_CLIENT_ID } from '../../config/globals';
import AuthService from '../../service/Auth/AuthService';
import { notify, ToastNotification } from '../notification/ToastNotification';
import { storeUserAndReload } from '../../service/Auth/AuthUtils';
export default function RegisterForm() {    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleGoogleRegister = async (response) => {
        const token = response.credential;
        try {
            const res = await AuthService.registerForGoogle({ token });
            if (res.data && res.data.accessToken) {
                storeUserAndReload(res.data);
                window.location.reload();
            }
        } catch (error) {
            notify(error.response?.data || 'Error al registrarse con Google', 'error');
        }
    };

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password) {
            notify('Por favor, complete todos los campos', 'error');
            return;
        }
        if (!validateEmail(email)) {
            notify('Correo electrónico inválido', 'error');
            return;
        }
        if (password.length < 6) {
            notify('Contraseña muy corta', 'error');
            return;
        }
        try {
            const res = await AuthService.register({ firstName, lastName, email, password });
            if (res.data && res.data.accessToken) {
                storeUserAndReload(res.data);
            }
        } catch (error) {
            notify(error.response?.data || 'Error en el registro', 'error');
        }
    };
    

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <ToastNotification />
            <div className="auth-form">
                <input
                    type="text"
                    placeholder="Name"
                    className="auth-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="auth-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <button className="auth-button" onClick={handleRegister}>Registrar</button>

                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleRegister}
                        onFailure={(error) => console.error('Error:', error)}
                        render={(renderProps) => (
                            <button
                                className="google-button"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                
                                <FcGoogle className="google-icon" /> Regístrate con Google
                            </button>
                        )}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
