import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useSelector
} from "react-redux";


function Navbar() {

    const navigate = useNavigate();

    const user =
        localStorage.getItem("user");

    const wishlist =
        useSelector(
            state => state.wishlist
        );


    return (

        <nav className="navbar">

            {/* LOGO */}

            <div className="navbar-logo">

                <Link to="/">
                    🚗 RideRent
                </Link>

            </div>


            {/* NAVIGATION */}

            <div className="navbar-links">

                <Link to="/">
                    🏠 Home
                </Link>

                <Link to="/vehicles">
                    🚘 Vehicles
                </Link>

                <Link to="/wishlist">
                    ❤️ Wishlist
                    {" "}
                    <span className="nav-count">
                        {wishlist.length}
                    </span>
                </Link>


                {user && (

                    <Link to="/my-bookings">
                        📋 My Bookings
                    </Link>

                )}

            </div>


            {/* AUTH */}

            <div className="navbar-auth">

                {!user ? (

                    <>

                        <Link
                            to="/register"
                            className="register-link"
                        >
                            Register
                        </Link>

                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>

                    </>

                ) : (

                    <button
                        className="logout-btn"
                        onClick={() =>
                            navigate("/logout")
                        }
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>

    );
}


export default Navbar;