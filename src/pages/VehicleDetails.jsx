import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../services/api";


function VehicleDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [vehicle, setVehicle] =
        useState(null);


    useEffect(() => {

        getVehicle();

    }, [id]);


    async function getVehicle() {

        try {

            const response =
                await api.get(
                    `/vehicles/${id}`
                );

            setVehicle(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    }


    if (!vehicle) {

        return (
            <div className="details-loading">
                <h2>Loading vehicle...</h2>
            </div>
        );

    }


    return (

        <div className="vehicle-details-page">

            {/* Back Button */}

            <button
                className="back-btn"
                onClick={() =>
                    navigate("/vehicles")
                }
            >
                ← Back to Vehicles
            </button>


            <div className="vehicle-details-card">

                {/* IMAGE */}

                <div className="details-image-section">

                    <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="details-image"
                    />

                    <span
                        className={
                            vehicle.available
                                ? "details-availability available"
                                : "details-availability unavailable"
                        }
                    >
                        {vehicle.available
                            ? "✓ Available"
                            : "✕ Not Available"}
                    </span>

                </div>


                {/* INFORMATION */}

                <div className="details-content">

                    <div className="details-title-row">

                        <div>

                            <p className="details-category">
                                {vehicle.category}
                            </p>

                            <h1>
                                {vehicle.name}
                            </h1>

                            <p className="details-brand">
                                {vehicle.brand}
                            </p>

                        </div>

                        <div className="details-rating">

                            ⭐ {vehicle.rating}

                            <span>
                                Rating
                            </span>

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="details-description">

                        <h3>
                            About this vehicle
                        </h3>

                        <p>
                            {vehicle.description}
                        </p>

                    </div>


                    {/* VEHICLE INFO */}

                    <div className="details-info-grid">

                        <div className="detail-item">

                            <span>
                                🚘
                            </span>

                            <div>
                                <small>
                                    Vehicle Type
                                </small>

                                <strong>
                                    {vehicle.type}
                                </strong>
                            </div>

                        </div>


                        <div className="detail-item">

                            <span>
                                ⛽
                            </span>

                            <div>
                                <small>
                                    Fuel
                                </small>

                                <strong>
                                    {vehicle.fuel}
                                </strong>
                            </div>

                        </div>


                        <div className="detail-item">

                            <span>
                                ⚙️
                            </span>

                            <div>
                                <small>
                                    Transmission
                                </small>

                                <strong>
                                    {vehicle.transmission}
                                </strong>
                            </div>

                        </div>


                        <div className="detail-item">

                            <span>
                                👥
                            </span>

                            <div>
                                <small>
                                    Seats
                                </small>

                                <strong>
                                    {vehicle.seats}
                                </strong>
                            </div>

                        </div>


                        <div className="detail-item">

                            <span>
                                📍
                            </span>

                            <div>
                                <small>
                                    Location
                                </small>

                                <strong>
                                    {vehicle.location}
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* PRICE */}

                    <div className="details-price">

                        <div>

                            <span>
                                Rental Price
                            </span>

                            <h2>
                                ₹ {vehicle.pricePerDay}
                                <small>
                                    / day
                                </small>
                            </h2>

                        </div>


                        {/* RENT BUTTON */}

                        {vehicle.available ? (

                            <button
                                className="rent-btn"
                                onClick={() =>
                                    navigate(
                                        `/booking/${vehicle.id}`
                                    )
                                }
                            >
                                🚗 Rent This Vehicle
                            </button>

                        ) : (

                            <button
                                className="rent-btn disabled"
                                disabled
                            >
                                Not Available
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}


export default VehicleDetails;