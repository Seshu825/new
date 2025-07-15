// src/components/Login.jsx

import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    // const [loginDetails, setLoginDetails] = useState({email: "",password: ""});
    const [loginDetails, setLoginDetails] = useState(() => {
        const storedDetails = localStorage.getItem("loginDetails");
        const parsed = storedDetails ? JSON.parse(storedDetails) : {};
        return {
            identifier: parsed.identifier || "",
            username: parsed.username || "",
            email: parsed.email || "",
            password: parsed.password || ""
        };
        // return storedDetails ? JSON.parse(storedDetails) : {}
    });
    const [errors, setErrors] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState("login");
    const navigate = useNavigate();

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
        setMode(isFlipped ? "register" : "login");
        setLoginDetails({ username: '', email: '', password: '' });

    };

    useEffect(() => {
        localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
        setErrors({});
    }, [loginDetails, mode]);
    // get previous page
    const location = useLocation();
    const fromPage = location.state?.from || "/";
    const baseUrl = "http://localhost:5000/api/auth";
    // get user details of logged in
    const { login, isLoggedIn, user } = useContext(AuthContext);
    // restrict login page if user already loggedn
    useEffect(() => {
        if (isLoggedIn && user) {
            navigate(fromPage);
        }
    }, [isLoggedIn, user, navigate, fromPage]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            [name]: value
        }));

        // setLoginDetails({...loginDetails,[name]: value});
    };
    const validate = async (mode) => {
        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
        const validateUsername = (username) => username.length >= 5;
        let tempErrors = {};
        if (mode === "register") {

            if (!validateEmail(loginDetails.email)) {
                tempErrors.email = "Invalid email address";
            };
            if (loginDetails.password.length < 5) {
                tempErrors.password = "Password must be at least 5 characters long";
            };
            if (loginDetails.username.length < 5 || loginDetails.username === undefined) {
                tempErrors.username = "username must be at least 5 characters long";
            };
            if (!loginDetails.username) tempErrors.username = "username is required";
            if (!loginDetails.email) tempErrors.email = "Email is required";
            if (!loginDetails.password) tempErrors.password = "Password is required";
            if (Object.keys(tempErrors).length === 0) {
                const existsField = await checkIfUserExists(loginDetails.email, loginDetails.username);
                console.log("exists field", existsField);
                if (existsField === "username") tempErrors.username = "Username already exists";
                if (existsField === "email") tempErrors.email = "Email already exists";
                // if (existsField === "error")  tempErrors.email= "Somethng went wrong pease tryaagn ater";
            }
            // console.log("Validation errors:", tempErrors);

        } else if (mode === "login") {

            if (!loginDetails.identifier) {
                tempErrors.identifier = "Email or username is required";
            } else if (
                !validateEmail(loginDetails.identifier) &&
                !validateUsername(loginDetails.identifier)
            ) {
                tempErrors.identifier = "Enter a valid email or username (min 5 characters)";
            }
            if (loginDetails.password.length < 5) {
                tempErrors.password = "Password must be at least 5 characters long";
            };
            if (!loginDetails.password) tempErrors.password = "Password is required";
        }
        setErrors(tempErrors);
        // console.log(Object.keys(tempErrors));
        return Object.keys(tempErrors).length === 0;

    };

    // checking user exites are not before sending request to register
    const checkIfUserExists = async (email, username) => {
        try {
            const res = await axios.get(baseUrl + "/check-exists", {
                params: { email, username },
            });

            if (res.data.exists) {
                return res.data.field; // "email" or "username"
            }

            return null;
        } catch (err) {
            console.error("Check user exists failed", err);
            return "error";
        }
    };
    //User Register
    const handleRegister = async (e) => {
        e.preventDefault();
        const toastId = toast.warning("Checking your Credintials Please wait.....", { autoClose: false });
        // console.log(toastId);
        const isValid = await validate("register");
        // console.log("isvalis", isValid)
        if (!isValid) {
            toast.update(toastId, {
                type: 'error',
                render: 'Form validation failed Please correct all the errors',
                autoClose: 2000,
                isLoading: false
            })
            return;
        }
        try {
            const response = await axios.post(baseUrl + '/register', {
                username: loginDetails.username,
                email: loginDetails.email,
                password: loginDetails.password
            });
            console.log("data", response.data);
            console.log(response.status);
            console.log(response.statusText);
            toast.update(toastId, {
                type: 'success',
                render: 'Register Successfull! Please login with this credintials to get Awesome experience',
                autoClose: 2000,
                isLoading: false
            })
            setLoginDetails({ username: '', email: '', password: '' });
            localStorage.removeItem('loginDetails');
            setIsFlipped(!isFlipped);
        }
        catch (error) {
            // console.log("Error", error.response.data.error);
            if (error.response && error.response.data.error) {
                setErrors(error.response.data.error);
                toast.update(toastId, {
                    type: 'error',
                    render: 'Registeration failed ' + error.response.data.error,
                    autoClose: 2000,
                    isLoading: false
                })
            } else {
                setErrors({ general: "Something went wrong. Please try again." });
            }
        }
    }

    // const { login, isLoggedIn } = useContext(AuthContext);
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate("/");
    //     }
    // }, [isLoggedIn, navigate, fromPage]);

    const handleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('Google User:', decoded);
        const idToken = credentialResponse.credential;
        const toastId = toast.warning("Checking your Credintials Please wait.....", { autoClose: false });
        try {
            const res = await axios.post(baseUrl + '/google', { token: idToken });
            const { token, user } = res.data;
            localStorage.setItem('jwt', token);

            // 3️⃣ Save token + user data via context
            login(token, user); // update your context state

            toast.update(toastId, {
                type: 'success',
                render:  "Welcome back "+ user.username+"!",
                autoClose: 2000,
                isLoading: false
            });
            navigate(fromPage);
                localStorage.removeItem('loginDetails');
            // (Optional) Update your auth context here
            // setUser(user);
        } catch (error) {
            if (error.response && error.response.status === 409) {

                const errorMessage = error.response.data.error;
                toast.update(toastId, {
                    type: "error",
                    render: errorMessage,
                    autoClose: 2000,
                    isLoading: false
                });
            } else {
                console.log("google login error", error);
                toast.update(toastId, {
                    type: "error",
                    render: "google login error",
                    autoClose: 2000,
                    isLoading: false
                });
            }
        }
        // Example: send to backend
        // axios.post('/api/auth/google', { token: credentialResponse.credential });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const toastId = toast.warning("Checking your Login Credintials Please wait.....", { autoClose: false });
        const isValid = await validate("login");
        if (!isValid) {
            toast.update(toastId, {
                type: 'error',
                render: 'Incorrect form submission',
                autoClose: 2000,
                isLoading: false
            })
            return;
        }
        try {
            const response = await axios.post(baseUrl + "/login", {
                identifier: loginDetails.identifier,
                password: loginDetails.password,
            });
            console.log("identifier",loginDetails.identifier);
            console.log("password",loginDetails.password);
            if (response.status === 200 && response.data.token) {
                const { token, user } = response.data;
                // 3️⃣ Save token + user data via context
                login(token, user); // update your context state
                console.log("login user:", user.username);
                toast.update(toastId, {
                    type: 'success',
                    render: "Welcome back "+ user.username+"!",
                    autoClose: 2000,
                    isLoading: false
                });
                localStorage.setItem("jwt", response.data.token);
                navigate(fromPage);
                setLoginDetails({ username: '', email: '', password: '' });
                localStorage.removeItem('loginDetails');
            } else {
                toast.update(toastId, {
                    type: 'error',
                    render: 'Login Failed ' + response.data.error,
                    autoClose: 2000,
                    isLoading: false
                })
            }
        } catch (error) {
            // Display error message from API
            if (error.response && error.response.data.error) {
                setErrors(error.response.data.error);
                toast.update(toastId, {
                    type: 'error',
                    render: 'Login Failed ' + error.response.data.error,
                    autoClose: 2000,
                    isLoading: false
                })
            } else {
                setErrors({ general: "Something went wrong. Please try again." });
                toast.update(toastId, {
                    type: 'error',
                    render: 'Login Failed ' + error.message + " " + error.name,
                    autoClose: 2000,
                    isLoading: false
                })
                console.log("error", error)

            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="auth-card">
                    {/* Front: Login Form */}
                    <div className={`auth-card-inner ${isFlipped ? "flipped" : ""}`}>
                        <div className="auth-card-front card shadow p-4">
                            {fromPage === "/" ? (
                                <h3 className="text-center mb-4">Login</h3>
                            ) : (
                                <h3 className="text-center mb-4">
                                    Login to access the {fromPage.replace("/", "").charAt(0).toUpperCase() + fromPage.replace('/', '').slice(1) || "Home"} page
                                </h3>
                            )}
                            <form onSubmit={(e) => handleLogin(e)} noValidate>
                                <div className="mb-3">
                                    <input type="text" name="identifier" autoComplete="identifier" className={`form-control ${errors.identifier ? 'is-invalid' : ''}`} onChange={handleChange} value={loginDetails.identifier || ""} id="email" aria-describedby="emailHelp" placeholder="Email or Username" />
                                    {errors.identifier && <div className="invalid-feedback">{errors.identifier}</div>}
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <input type="password" autoComplete="current-password" name="password" placeholder="Password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={handleChange} value={loginDetails.password || ""} id="password" />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <button type="submit" id="login" className="btn btn-primary w-100 mb-2">Login</button>
                                <p className="text-center">
                                    Don't have an account? <button type="button" onClick={toggleFlip} className="btn btn-link text-decoration-none">Sign Up</button>
                                </p>
                                {/* <h2>Login with Google</h2> */}
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </form>
                        </div>
                        <div className="auth-card-back card shadow p-4">
                            <h3 className="text-center mb-4">Register</h3>
                            <form onSubmit={(e) => handleRegister(e)} noValidate>
                                <div className="mb-3">
                                    <input type="text" autoComplete="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`} value={loginDetails.username || ""} onChange={handleChange} name="username" id="registerusername" placeholder="userName" />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}

                                </div>
                                <div className="mb-3">
                                    <input type="email" autoComplete="email" value={loginDetails.email || ""} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" id="registeremail" placeholder="Email" />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                                </div>
                                <div className="mb-3">
                                    <input type="password" autoComplete="new-password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" id="registerpassword" value={loginDetails.password || ""} onChange={handleChange} placeholder="Password" />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                {/* {errors.general && <p className="text-danger m-0">{errors.general}</p>} */}
                                <button type="submit" id="register" className="btn btn-success w-100 mb-2">Register</button>
                                <p className="text-center">
                                    Already have an account? <button type="button" onClick={toggleFlip} className="btn btn-link text-decoration-none">Login</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
