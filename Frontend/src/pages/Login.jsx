import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assests";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {

    const [isCreateAccount, setIsCreateAccount] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    /*
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            if (isCreateAccount) {
                // Create Account API
                const response = await axios.post(`${backendUrl}/register`, {
                    name,
                    email,
                    password
                });
                if (response.status == 201) {
                    navigate("/");
                    toast.success("Account created successfully. Please login.");
                } else {
                    toast.error("Email already exists.");
                }
            } else {
                // Login API
                const response = await axios.post(`${backendUrl}/login`, {
                    email,
                    password
                });
                if (response.status === 200) {

                    // await getUserData();
                    // setIsLoggedIn(true);
                    // navigate("/");
                    // toast.success("Login successful.");

                    setIsLoggedIn(true);

                    setTimeout(async () => {
                        await getUserData();
                        navigate("/");
                        toast.success("Login successful.");
                    }, 100);

                } else {
                    toast.error("Invalid email or password.");
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
       
    */


    //New
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/login`, {
                email,
                password
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                await getUserData();
                setIsLoggedIn(true);
                navigate("/");
                toast.success("Login successful.");
            } else {
                toast.error("Invalid credentials.");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "linear-gradient(90deg, #6a5af9,#8268f9)", border: "none" }}>
            <div style={{ position: "absolute", top: "20px", left: "30px", display: "flex", alignItems: "center" }}>
                <Link to="/" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontWeight: "bold",
                    fontSize: "24px",
                    textDecoration: "none"
                }}>
                    <img src={assets.logo} alt="logo" height={32} width={32} />
                    <span className="fw-bold fs-4 text-light">AuthNest</span>
                </Link>

            </div>

            <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">
                    {isCreateAccount ? "Create Account" : "Login"}
                </h2>

                <form onSubmit={onSubmitHandler}>
                    {isCreateAccount && (
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" id="name" className="form-control" placeholder="Enter full name" required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input type="text" id="email" className="form-control" placeholder="Enter email" required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="*********" required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/reset-password"} className="text-decoration-none">Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Loading..." : isCreateAccount ? "Create Account" : "Login"}
                    </button>

                </form>

                <div className="text-center mt-3">
                    <p className="mb-0">
                        {isCreateAccount ?
                            (
                                <>
                                    Already have an account?{"  "}
                                    <span
                                        onClick={() => setIsCreateAccount(false)} className="text-text-decoration-underline" style={{ cursor: "pointer" }}>
                                        Login here
                                    </span>
                                </>
                            ) : (
                                <>
                                    Don't have an account?{"  "}
                                    <span className="text-text-decoration-underline" style={{ cursor: "pointer" }} onClick={() => setIsCreateAccount(true)}>
                                        Create Account
                                    </span>
                                </>
                            )
                        }
                    </p>
                </div>

            </div>

        </div>

    );
}

export default Login;