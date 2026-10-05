import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeWishlist } from "../features/wishlistSlice";

function Wishlist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlist =
        useSelector(state => state.wishlist);

    return (
        <div className="wishlist-page">

            <div className="wishlist-header">

                <div>
                    <p className="wishlist-label">
                        YOUR COLLECTION
                    </p>

                    <h1>
                        My Wishlist ❤️
                    </h1>

                    <p>
                        Your favorite vehicles are
                        saved here.
                    </p>
                </div>

                <div className="wishlist-count">
                    {wishlist.length} Vehicle
                    {wishlist.length !== 1
                        ? "s"
                        : ""}
                </div>

            </div>


            {wishlist.length === 0 ? (

                <div className="wishlist-empty">

                    <div className="empty-icon">
                        ❤️
                    </div>

                    <h2>
                        Your Wishlist is Empty
                    </h2>

                    <p>
                        You haven't added any vehicles
                        to your wishlist yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/vehicles")
                        }
                    >
                        🚘 Explore Vehicles
                    </button>

                </div>

            ) : (

                <div className="wishlist-grid">

                    {wishlist.map(vehicle => (

                        <div
                            className="wishlist-card"
                            key={vehicle.id}
                        >

                            <div className="wishlist-image-wrapper">

                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                />

                                <span>
                                    ❤️ Saved
                                </span>

                            </div>


                            <div className="wishlist-card-content">

                                <div className="wishlist-title-row">

                                    <div>
                                        <h2>
                                            {vehicle.name}
                                        </h2>

                                        <p>
                                            {vehicle.brand}
                                        </p>
                                    </div>

                                    <strong>
                                        ⭐ {vehicle.rating}
                                    </strong>

                                </div>


                                <div className="wishlist-info">

                                    <span>
                                        🚘 {vehicle.type}
                                    </span>

                                    <span>
                                        ⛽ {vehicle.fuel}
                                    </span>

                                    <span>
                                        👥 {vehicle.seats}
                                    </span>

                                    <span>
                                        📍 {vehicle.location}
                                    </span>

                                </div>


                                <div className="wishlist-bottom">

                                    <div>

                                        <small>
                                            Starting from
                                        </small>

                                        <strong>
                                            ₹ {vehicle.pricePerDay}
                                        </strong>

                                        <span>
                                            / day
                                        </span>

                                    </div>

                                </div>


                                <div className="wishlist-actions">

                                    <button
                                        className="wishlist-view-btn"
                                        onClick={() =>
                                            navigate(
                                                `/vehicles/${vehicle.id}`
                                            )
                                        }
                                    >
                                        View Details
                                    </button>

                                    <button
                                        className="wishlist-remove-btn"
                                        onClick={() =>
                                            dispatch(
                                                removeWishlist(
                                                    vehicle.id
                                                )
                                            )
                                        }
                                    >
                                        🗑️ Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Wishlist;