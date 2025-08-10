import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new URLSearchParams(formData).toString();
    try {
      const response = await fetch('/siosio/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const data = await response.json();
      setMessage(data.success ? data.message : data.errors.join('\n'));
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default LoginForm;