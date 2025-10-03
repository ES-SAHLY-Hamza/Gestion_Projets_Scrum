import React, { useState } from "react";
import "../styles/Login.css"; // <-- on importe le style externe

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("collaborateur_id", data.collaborateur_id);

      if (onLogin) {
        onLogin(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Connexion</h1>
        <p className="login-subtitle">Accédez à votre espace personnel</p>

        <div className="form-group">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" className={`btn ${isLoading ? "loading" : ""}`} disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : "Se connecter"}
        </button>

        {error && <div className="error-message">{error}</div>}

        <a href="#" className="login-link">
          Mot de passe oublié ?
        </a>
      </form>
    </div>
  );
};

export default Login;
