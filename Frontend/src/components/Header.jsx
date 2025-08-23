import { useContext } from "react";
import { assets } from "../assets/assests";
import { AppContext } from "../context/AppContext";

const Header = () => {

    const { userData } = useContext(AppContext);

    return (
        <div className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3" style={{ minHeight: "80vh" }}>
            <img src={assets.header} alt="header" width={120} className="mb-4" />

            <h5 className="gw-semibold">
                Hey {userData ? userData.name : "Developer"} 👋, Welcome to <span role="img" aria-label="wave" className="text-primary">AuthNest</span> - Your go-to solution for authentication needs.
            </h5>
            <h1 className="fw-bold display-5 mb-3">Welcome to our product</h1>

            <p className="text-muted fs-5 mb-4" style={{ maxWidth: "500px" }}>
                Let's get started with your authentication journey. Explore our features, and don't forget to check out the documentation for more details.
            </p>

            <button className="btn btn-outline-dark rounded-pill px-4 py-2">
                Get Started <i className="bi-arrow-right px-2"></i>
            </button>
        </div>
    )
}

export default Header;