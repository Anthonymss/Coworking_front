import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './AuthModal.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const modalRef = useRef(null);
  const [animation, setAnimation] = useState('fade-in');
  const [imageDefault, setImageDefault] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    setImageDefault(generarImage());
  }, []);

  const switchTab = (tab) => {
    if (tab !== activeTab) {
      setAnimation('fade-out');
      setTimeout(() => {
        setActiveTab(tab);
        setAnimation('fade-in');
      }, 300);
    }
  };

  const generarImage=()=>{
    const listImage = [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      
    ];
    return listImage[Math.floor(Math.random() * listImage.length)];
  };

  return (
    <div className="modal-overlay">
      <div className="modal fade-in" ref={modalRef}>
        <button className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-content">
          <div className="image-section">
            <img src={imageDefault} alt="auth visual" />
          </div>
          <div className="form-section">
            <div className="modal-tabs">
              <span onClick={() => switchTab('login')} className={activeTab === 'login' ? 'active' : ''}>Acceso</span>
              <span onClick={() => switchTab('register')} className={activeTab === 'register' ? 'active' : ''}>Regístrate</span>
            </div>
            <div className={`form-container ${animation}`}>
              {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
