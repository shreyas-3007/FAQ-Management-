import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Login.module.css";
import summaryApi from "../comman";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = emailRef.current.value;
    const password = passwordRef.current.value;
  
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }
  
    console.log("Login attempt:", { username, password });
  
    try {
      const dataResponse = await fetch(summaryApi.Login.url, {
        method: summaryApi.Login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Use directly instead of state
      });
  
      const dataApi = await dataResponse.json();
  
      if (dataApi.success) {
        toast.success(dataApi.message);
        console.log("Login successful");
        navigate("/home");
      } else {
        toast.error(dataApi.error || "Login failed");
        console.log("Login failed:", dataApi.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong, please try again.");
    }
  };
  

  return (
    <section className={styles.mainSectionLogin}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <div className={styles.innerPage}>
          <form id="loginForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              name="email"
              className={styles.username}
              placeholder="admin@gmail.com"
              required
              ref={emailRef}
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                className={styles.password}
                name="password"
                placeholder="admin@123"
                ref={passwordRef}
                required
              />
              <div
                className={styles.eyeContainer}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span className={styles.eyeIcon}>
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
