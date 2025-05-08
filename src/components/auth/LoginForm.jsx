import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_CLIENT_ID } from '../../config/globals';
import AuthService from '../../service/Auth/AuthService';
import { notify, ToastNotification } from '../notification/ToastNotification';
import { storeUserAndReload } from '../../service/Auth/AuthUtils';
import RoleSelectorModal from './RoleSelectorModal';
import { decodeJWT } from '../../utils/jwtUtils';
import { RoleEnum } from '../../utils/role.enum';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password, googleToken } = {}) => {
    if (!googleToken && (!email || !password)) {
      notify('Por favor, complete todos los campos', 'error');
      return;
    }
    try {
      const res = googleToken? await AuthService.loginForGoogle({ token: googleToken }): await AuthService.login({ email, password });
      const data = res.data;
      if (!data?.accessToken) {
        notify('Token de acceso no recibido', 'error');
        return;
      }
      const decoded = decodeJWT(data.accessToken);
      const roles = decoded.roles || [];
      if (roles.length > 1) {
        setAvailableRoles(roles);
        setShowRoleModal(true);
        localStorage.setItem('tempUserData', JSON.stringify(data));
      } else {
        completeLogin(data, roles[0]);
      }
    } catch (err) {
      notify(err.response?.data || 'Error al iniciar sesión', 'error');
    }
  };

  const completeLogin = (userData, activeRole) => {
    const updated = { ...userData, activeRole };
    storeUserAndReload(updated);
    if (activeRole === RoleEnum.ADMIN) navigate('/admin/dashboard');
    window.location.reload();
  };
  const handleRoleSelection = (role) => {
    const temp = JSON.parse(localStorage.getItem('tempUserData'));
    localStorage.removeItem('tempUserData');
    completeLogin(temp, role);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ToastNotification />
        <div className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="auth-button"
            onClick={() => handleLogin({ email, password })}
          >
            Acceso
          </button>
          <div className="forgot-password">
            <a href="#">Olvidé mi contraseña</a>
          </div>
          <div className="google-login">
            <GoogleLogin
              onSuccess={(response) =>
                handleLogin({ googleToken: response.credential })
              }
              onError={() =>
                notify('Error al iniciar sesión con Google', 'error')
              }
              render={({ onClick, disabled }) => (
                <button
                  className="google-button"
                  onClick={onClick}
                  disabled={disabled}
                >
                  <FcGoogle className="google-icon" />
                  Iniciar sesión con Google
                </button>
              )}
            />
          </div>
        </div>
      </GoogleOAuthProvider>

      {showRoleModal && (
        <RoleSelectorModal
          roles={availableRoles}
          onSelect={handleRoleSelection}
        />
      )}
    </>
  );
}
