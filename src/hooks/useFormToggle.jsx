import { useState } from 'react';

export const useFormToggle = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleRegister = () => setIsRegisterActive(true);
  const toggleLogin = () => setIsRegisterActive(false);
  
  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorPopup(true);
  };

  const hideError = () => setShowErrorPopup(false);

  return {
    isRegisterActive,
    showErrorPopup,
    errorMessage,
    toggleRegister,
    toggleLogin,
    showError,
    hideError
  };
};