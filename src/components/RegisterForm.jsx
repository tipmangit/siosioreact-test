import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    contact: '',
    password: '',
    confirm_password: '',
    security_answer: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new URLSearchParams(formData).toString();
    try {
      const response = await fetch('/siosio/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const data = await response.json();
      setMessage(data.success ? data.message : data.errors.join('\n'));
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
        />
        <input
          name="security_answer"
          placeholder="What is your pet's name?"
          value={formData.security_answer}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default RegisterForm;