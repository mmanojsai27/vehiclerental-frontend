import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearWishlist } from "../features/wishlistSlice";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear wishlist from current Redux session
        dispatch(clearWishlist());

        // Remove logged-in user
        localStorage.removeItem("user");

        alert("Logout successful!");

        navigate("/login");
    }, [dispatch, navigate]);

    return null;
}

export default Logout;