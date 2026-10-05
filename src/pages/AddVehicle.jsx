import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddVehicle() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "",
        type: "",
        fuel: "",
        transmission: "",
        seats: "",
        pricePerDay: "",
        location: "",
        rating: "",
        available: true,
        image: "",
        description: ""
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        await api.post(
            "/vehicles",
            formData
        );

        navigate("/vehicles");
    }

    return (
        <div className="form-container">

            <h2>Add Vehicle</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Vehicle Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category (Car/Bike)"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Vehicle Type"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="fuel"
                    placeholder="Fuel"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="transmission"
                    placeholder="Transmission"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="seats"
                    placeholder="Seats"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="pricePerDay"
                    placeholder="Price Per Day"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    placeholder="Rating"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                ></textarea>

                <button
                    className="submit-btn"
                    type="submit"
                >
                    Add Vehicle
                </button>

            </form>

        </div>
    );
}

export default AddVehicle;