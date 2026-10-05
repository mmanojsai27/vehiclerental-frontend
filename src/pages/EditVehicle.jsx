import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../services/api";

function EditVehicle() {

    const { id } = useParams();

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

    useEffect(() => {
        getVehicle();
    }, []);

    async function getVehicle() {

        const response =
            await api.get(`/vehicles/${id}`);

        setFormData(response.data);
    }

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        await api.put(
            `/vehicles/${id}`,
            formData
        );

        navigate("/vehicles");
    }

    return (
        <div className="form-container">

            <h2>Edit Vehicle</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Vehicle Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    placeholder="Brand"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    placeholder="Category"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    placeholder="Vehicle Type"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="fuel"
                    value={formData.fuel}
                    placeholder="Fuel"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    placeholder="Transmission"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    placeholder="Seats"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    placeholder="Price Per Day"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="Location"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={formData.rating}
                    placeholder="Rating"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    placeholder="Image URL"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={handleChange}
                ></textarea>

                <button
                    className="submit-btn"
                    type="submit"
                >
                    Update Vehicle
                </button>

            </form>

        </div>
    );
}

export default EditVehicle;