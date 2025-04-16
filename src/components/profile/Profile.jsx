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
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.jwt) {
      UserService.infoAccount(storedUserData.email, storedUserData.jwt)
        .then(response => {
          setUserData(response.data);
          setProfileImageUrl(response.data.profileImageUrl);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setLoading(false);
        });
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
    const { ...dataToSave } = userData;

    if (profileImageUrl) {
      dataToSave.profileImageUrl = profileImageUrl;
    }

    UserService.updateUser(dataToSave)
      .then(() => {
        notify("Changes saved successfully!", "success");
        console.log('Guardando cambios', dataToSave);
      })
      .catch(error => {
        notify("Error saving changes", "error");
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    notify("Logged out successfully.", "info");
    setIsLoggedIn(false);
  };

  const handleProfileImageUrlChange = (e) => {
    setProfileImageUrl(e.target.value);
  };

  const responseGoogle = (response) => {
    if (response && response.credential) {
      const googleToken = response.credential;
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      const email = storedUserData ? storedUserData.email : null;

      if (email) {
        UserService.synchronizeAccountGoogle(email, googleToken)
          .then(() => {
            notify('Sincronización exitosa con Google!', "success");
          })
          .catch(error => {
            notify(error.response.data, "error");
          });
      } else {
        notify('Error: No se pudo encontrar el email en el localStorage.', "error");
      }
    } else {
      console.error('Error: No se pudo obtener el token de Google.');
      notify('Error: No se pudo obtener el token de Google.', "error");
    }
  };

  if (loading) return <div>Cargando perfil...</div>;

  if (!isLoggedIn) {
    return (
      <div
        className="login-prompt"
        style={{
          padding: '30vh',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2
          style={{
            color: '#d9534f',
            fontSize: '24px',
            marginBottom: '10px',
          }}
        >
          No has iniciado sesión
        </h2>
        <p
          style={{
            color: '#555',
            fontSize: '16px',
            marginBottom: '20px',
          }}
        >
          Por favor, inicia sesión para acceder a tu perfil.
        </p>
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
            <p className="user-email">{userData.email}</p>
          </div>
        </div>
        <div className="profile-content">
          <h3>Información Personal</h3>
          <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
          <div className="info-grid">
            <InfoItem label="Nombre" value={userData.firstName || 'No especificado'} isEditing={isEditing} name="firstName" onChange={handleChange} />
            <InfoItem label="Apellido" value={userData.lastName || 'No especificado'} isEditing={isEditing} name="lastName" onChange={handleChange} />
            <InfoItem label="Email" value={userData.email || 'No especificado'} isEditing={false} />
            <InfoItem label="Miembro desde" value={new Date(userData.accountCreated).toLocaleDateString()} />
          </div>
          {isEditing && (
            <>
              <div className="avatar-url-container">
                <label htmlFor="">Actualiza Tu Imagen</label>
                <input 
                  type="text" 
                  onChange={handleProfileImageUrlChange} 
                  placeholder="URL de la nueva imagen" 
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
