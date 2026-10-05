import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { loadWishlist } from "../features/wishlistSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.get(
                `/users?email=${formData.email}&password=${formData.password}`
            );

            if (response.data.length > 0) {
                const user = response.data[0];

                // Save logged-in user
                localStorage.setItem("user", JSON.stringify(user));

                // Load this user's wishlist
                const savedWishlist = localStorage.getItem(
                    `wishlist_${user.id}`
                );

                dispatch(
                    loadWishlist(
                        savedWishlist ? JSON.parse(savedWishlist) : []
                    )
                );

                alert("Login successful!");

                navigate("/vehicles");
            } else {
                alert("Invalid email or password");
            }
        } catch (error) {
            console.log(error);
            alert("Login failed");
        }
    }

    return (
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;