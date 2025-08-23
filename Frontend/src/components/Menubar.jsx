import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assests";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Menubar = () => {

    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    /*
    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendUrl + "/logout");
            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(null);
                navigate("/");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again." + err.message);
        }
    }
    */

    //New
    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setIsLoggedIn(false);
            setUserData(null);
            navigate("/login");
        } catch (error) {
            toast.error("An error occurred while logging out. Please try again.");
        }
    };

    const sendVerificationOTP = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendUrl + "/send-otp");
            if (response.status === 200) {
                navigate("/email-verify");
                toast.success("Verification OTP sent to your email.");
            } else {
                toast.error("Unable to send OTP. Please try again later.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again." + error.message);
        }
    }

    return (
        <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
                <img src={assets.logo_home} alt="logo" width={32} height={32} />
                <span className="fw-bold fs-4 text-dark">AuthNest</span>
            </div>

            {userData ? (
                <div className="position-relative" ref={dropdownRef}>
                    <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                        onClick={() => setdropdownOpen((prev) => !prev)}>
                        {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    {dropdownOpen && (
                        <div className="position-absolute shadow bg-white rounded p-2"
                            style={{
                                top: "50px",
                                right: 0,
                                zIndex: 100,
                            }}>
                            {!userData.isAccountVerified && (
                                <div className="dropdown-item py-1 px-2" style={{ cursor: "pointer" }}
                                    onClick={sendVerificationOTP}>
                                    Verify Email
                                </div>
                            )}
                            <div className="dropdown-item py-1 px-2 text-danger" style={{ cursor: "pointer" }}
                                onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="btn btn-outline-dark rounded-pill px-3">
                    Login<i className="bi-arrow-right px-2" onClick={() => navigate("/login")}></i>
                </div >
            )}

        </nav >
    )
}

export default Menubar;

