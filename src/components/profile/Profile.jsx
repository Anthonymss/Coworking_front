import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import UserService from '../../service/UserService';
import { GOOGLE_CLIENT_ID } from '../../config/globals';
import { notify, ToastNotification } from '../notification/ToastNotification';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData?.jwt) {
      UserService.infoAccount(storedUserData.email, storedUserData.jwt)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const token = storedUserData?.jwt;

    UserService.updateUser(userData, profileImageFile, token)
      .then(() => {
        notify("Cambios guardados correctamente!", "success");
      })
      .catch(error => {
        notify("Error al guardar los cambios", "error");
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    notify("Cierre de sesión exitoso.", "info");
    setIsLoggedIn(false);
  };

  const responseGoogle = (response) => {
    if (response?.credential) {
      const googleToken = response.credential;
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      const email = storedUserData?.email;

      if (email) {
        UserService.synchronizeAccountGoogle(email, googleToken)
          .then(() => notify('Sincronización exitosa con Google!', "success"))
          .catch(error => notify(error.response.data, "error"));
      } else {
        notify('Error: No se encontró el email en localStorage.', "error");
      }
    } else {
      notify('Error: No se obtuvo el token de Google.', "error");
    }
  };

  if (loading) return <div>Cargando perfil...</div>;

  if (!isLoggedIn) {
    return (
      <div className="login-prompt" style={{ padding: '30vh', textAlign: 'center' }}>
        <h2>No has iniciado sesión</h2>
        <p>Por favor, inicia sesión para acceder a tu perfil.</p>
      </div>
    );
  }

  if (!userData) return <div>Error al cargar los datos del perfil.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <img src={userData.profileImageUrl} alt="Avatar" className="avatar" />
          </div>
          <div className="user-info">
            <h2>{userData.firstName} {userData.lastName}</h2>
            <p>{userData.email}</p>
          </div>
        </div>

        <div className="profile-content">
          <h3>Información Personal</h3>
          <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>

          <div className="info-grid">
            <InfoItem label="Nombre" value={userData.firstName} isEditing={isEditing} name="firstName" onChange={handleChange} />
            <InfoItem label="Apellido" value={userData.lastName} isEditing={isEditing} name="lastName" onChange={handleChange} />
            <InfoItem label="Email" value={userData.email} isEditing={false} />
            <InfoItem label="Miembro desde" value={new Date(userData.accountCreated).toLocaleDateString()} isEditing={false} />
          </div>

          {isEditing && (
            <>
              <div className="avatar-upload-container">
                <label htmlFor="avatarFile">Sube una nueva imagen</label>
                <input 
                  type="file" 
                  id="avatarFile"
                  accept="image/*"
                  onChange={(e) => setProfileImageFile(e.target.files[0])}
                  className="avatar-url-input" 
                />
              </div>
              <button onClick={handleSave} className="save-button">Guardar Cambios</button>
            </>
          )}

          {!userData.statusOauthEnabled && (
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => notify('Error en la autenticación con Google', "error")}
              />
            </GoogleOAuthProvider>
          )}

          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      </div>

      <ToastNotification />
    </div>
  );
}

function InfoItem({ label, value, isEditing, name, onChange }) {
  return (
    <div className="info-item">
      <span className="info-label">{label}:</span>
      {isEditing ? (
        <input type="text" name={name} value={value || ''} onChange={onChange} className="info-input" />
      ) : (
        <span className="info-value">{value}</span>
      )}
    </div>
  );
}
