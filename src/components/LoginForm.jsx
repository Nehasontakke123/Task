import React, { useState } from 'react';
import '../assets/css/LoginForm.css'; // Custom CSS

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const url = isLogin
      ? 'http://localhost:7001/api/auth/login'
      : 'http://localhost:7001/api/auth/register';

    const payload = isLogin
      ? { username, password }
      : { username, password, email, mobile };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          setSuccess('Login successful!');
        } else {
          setSuccess('Registration successful! Please login now.');
          setIsLogin(true);
          setUsername('');
          setPassword('');
          setEmail('');
          setMobile('');
        }
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">{isLogin ? 'Login' : 'Register'}</h2>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <form onSubmit={handleSubmit} className="form-content">
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {!isLogin && (
            <>
              <input
                type="email"
                placeholder="Email (optional)"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

              <input
                type="text"
                placeholder="Mobile (optional)"
                className="form-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                autoComplete="tel"
              />
            </>
          )}

          <button type="submit" className="form-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="form-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            className="form-link"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
