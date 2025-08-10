import React, { useState } from 'react';

const PasswordInput = ({ name, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-container">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="toggle-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? '🙈' : '🙉'}
      </button>
    </div>
  );
};

export default PasswordInput;