import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useDispatch
} from "react-redux";

import {
    addWishlist
} from "../features/wishlistSlice";


function VehicleCard({ vehicle, onDelete }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    // Add vehicle to wishlist
    function handleWishlist() {

        dispatch(
            addWishlist(vehicle)
        );

    }


    // Delete vehicle
    function handleDelete() {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this vehicle?"
            );

        if (confirmDelete) {

            onDelete(vehicle.id);

        }

    }


    return (

        <div className="vehicle-card">

            {/* Vehicle Image */}

            <div className="vehicle-image-wrapper">

                <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-card-image"
                />

                <span
                    className={
                        vehicle.available
                            ? "availability available"
                            : "availability unavailable"
                    }
                >
                    {
                        vehicle.available
                            ? "Available"
                            : "Not Available"
                    }
                </span>

            </div>


            {/* Vehicle Information */}

            <div className="vehicle-card-content">

                <div className="vehicle-title-row">

                    <h3>
                        {vehicle.name}
                    </h3>

                    <span className="rating">
                        ⭐ {vehicle.rating}
                    </span>

                </div>


                <p className="vehicle-brand">
                    {vehicle.brand}
                </p>


                <div className="vehicle-info">

                    <span>
                        🚘 {vehicle.type}
                    </span>

                    <span>
                        ⛽ {vehicle.fuel}
                    </span>

                    <span>
                        👥 {vehicle.seats} Seats
                    </span>

                </div>


                <div className="vehicle-location">

                    📍 {vehicle.location}

                </div>


                {/* Price */}

                <div className="vehicle-price">

                    <div>

                        <span className="price-label">
                            Starting from
                        </span>

                        <strong>
                            ₹ {vehicle.pricePerDay}
                        </strong>

                        <span className="price-day">
                            / day
                        </span>

                    </div>

                </div>


                {/* Buttons */}

                <div className="card-actions">

                    <Link
                        to={`/vehicles/${vehicle.id}`}
                        className="view-btn"
                    >
                        View Details
                    </Link>


                    <button
                        className="wishlist-btn"
                        onClick={handleWishlist}
                    >
                        ❤️ Wishlist
                    </button>


                    <button
                        className="edit-btn"
                        onClick={() =>
                            navigate(
                                `/edit-vehicle/${vehicle.id}`
                            )
                        }
                    >
                        ✏️ Edit
                    </button>


                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        🗑️ Delete
                    </button>

                </div>

            </div>

        </div>

    );
}


export default VehicleCard;

