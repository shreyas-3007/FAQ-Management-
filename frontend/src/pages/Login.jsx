import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useRef, useState } from "react";
//import Context from "../context";
import styles from "../styles/Login.moudle.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({email: "",password: ""});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  // const { fetchUserDetails } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setData({email,password});
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
              placeholder="Email"
              required
              ref={emailRef}
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                className={styles.password}
                name="password"
                placeholder="Password"
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
