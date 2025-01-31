import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig, auth } from './firebaseConfig'; // ✅ استيراد firebaseConfig
import './Register.css';
import registerImage from './signUp.png';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // RegEx للتحقق من صحة البريد الإلكتروني
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // RegEx للتحقق من كلمة المرور (يجب أن تحتوي على رمز خاص)
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // التحقق من صحة البريد الإلكتروني باستخدام RegEx
    if (!emailRegEx.test(formData.email)) {
      formErrors.email = "Please enter a valid email address!";
    }

    // التحقق من صحة كلمة المرور باستخدام RegEx (تتضمن رمزًا خاصًا)
    if (!passwordRegEx.test(formData.password)) {
      formErrors.password = "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.";
    }

    // التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // ننتظر حتى يتم التحقق من تسجيل الدخول بنجاح
      if (auth.currentUser) {
        const userData = {
          username: formData.username,
          email: formData.email,
          userType: formData.userType
        };

        await axios.post(
          `${firebaseConfig.databaseURL}/users/${user.uid}.json`,
          userData
        );

        alert("Registration successful!");
        console.log("User registered:", user);
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate('/');  // إعادة التوجيه إلى الصفحة الرئيسية
      } else {
        throw new Error("User not logged in properly.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering: " + error.message);
    }
  };

  // Google sign-up handler
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ننتظر حتى يتم التحقق من تسجيل الدخول بنجاح
      if (auth.currentUser) {
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate('/');  // إعادة التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول الناجح
      } else {
        throw new Error("User not logged in properly.");
      }
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      alert("An error occurred while registering with Google: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <label>User Type:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Manager</option>
            </select>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              I agree to all terms
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>

        {/* Google Sign-up button */}
        <div className="google-signup-container">
          <span>Or sign up with</span>
          <div className="google-signup" onClick={handleGoogleSignUp}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
          </div>
        </div>

        <p>Already have an account? <a href="/login">Sign in</a></p>
      </div>
      <div className="image-container">
        <img src={registerImage} alt="signUp-img" />
      </div>
    </div>
  );
}

export default RegisterPage;
