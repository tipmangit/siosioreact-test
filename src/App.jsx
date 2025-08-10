import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ErrorPopup from './components/ErrorPopup';
import { useFormToggle } from './hooks/useFormToggle';
import './logreg.css';

const App = () => {
  const {
    isRegisterActive,
    showErrorPopup,
    errorMessage,
    toggleRegister,
    toggleLogin,
    hideError
  } = useFormToggle();

  return (
    <div className={`container${isRegisterActive ? ' active' : ''}`}>
      <LoginForm />
      <RegisterForm />
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected, please login with your personal info</p>
            <button className="hidden" onClick={toggleLogin}>
              Login
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start your journey with us</p>
            <button className="hidden" onClick={toggleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>

      {showErrorPopup && (
        <ErrorPopup 
          message={errorMessage} 
          onClose={hideError}
        />
      )}
    </div>
  );
};

export default App;