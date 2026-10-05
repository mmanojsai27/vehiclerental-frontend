import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMyBookings();
    }, []);


    async function getMyBookings() {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            if (!user) {
                setBookings([]);
                return;
            }

            const response =
                await api.get("/bookings");

            const userBookings =
                response.data.filter(
                    booking =>
                        booking.userId === user.id
                );

            setBookings(userBookings);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    }


    async function handleCancel(id) {

        const confirmCancel =
            window.confirm(
                "Are you sure you want to cancel this booking?"
            );

        if (!confirmCancel) {
            return;
        }


        try {

            await api.delete(
                `/bookings/${id}`
            );

            setBookings(
                bookings.filter(
                    booking =>
                        booking.id !== id
                )
            );

            alert(
                "Booking cancelled successfully!"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Unable to cancel booking."
            );
        }
    }


    if (loading) {

        return (
            <div className="bookings-loading">
                <h2>
                    Loading your bookings...
                </h2>
            </div>
        );

    }


    return (

        <div className="bookings-page">

            {/* PAGE HEADER */}

            <div className="bookings-page-header">

                <div>

                    <p className="bookings-label">
                        YOUR RENTALS
                    </p>

                    <h1>
                        My Bookings 📋
                    </h1>

                    <p>
                        Manage your vehicle
                        reservations.
                    </p>

                </div>


                <div className="booking-count">

                    {bookings.length}

                    {" "}

                    Booking
                    {bookings.length !== 1
                        ? "s"
                        : ""}

                </div>

            </div>


            {/* NO BOOKINGS */}

            {bookings.length === 0 ? (

                <div className="no-bookings">

                    <div className="no-bookings-icon">
                        📋
                    </div>

                    <h2>
                        No Bookings Yet
                    </h2>

                    <p>
                        You haven't rented any
                        vehicles yet.
                    </p>

                    <Link
                        to="/vehicles"
                        className="browse-vehicles-btn"
                    >
                        🚘 Browse Vehicles
                    </Link>

                </div>

            ) : (

                /* BOOKINGS */

                <div className="bookings-grid">

                    {bookings.map(
                        booking => (

                            <div
                                className="booking-card"
                                key={booking.id}
                            >

                                {/* CARD HEADER */}

                                <div
                                    className="booking-card-header"
                                >

                                    <div>

                                        <p>
                                            VEHICLE
                                        </p>

                                        <h2>
                                            🚗{" "}
                                            {
                                                booking.vehicleName
                                            }
                                        </h2>

                                    </div>


                                    <span
                                        className={
                                            booking.status ===
                                            "Confirmed"
                                                ? "status-confirmed"
                                                : "status-cancelled"
                                        }
                                    >
                                        {
                                            booking.status
                                        }
                                    </span>

                                </div>


                                {/* BOOKING DATES */}

                                <div className="booking-dates">

                                    <div>

                                        <span>
                                            START DATE
                                        </span>

                                        <strong>
                                            📅{" "}
                                            {
                                                booking.startDate
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            END DATE
                                        </span>

                                        <strong>
                                            📅{" "}
                                            {
                                                booking.endDate
                                            }
                                        </strong>

                                    </div>

                                </div>


                                {/* BOOKING DETAILS */}

                                <div className="booking-detail-list">

                                    <div>
                                        <span>
                                            Rental Duration
                                        </span>

                                        <strong>
                                            {
                                                booking.days
                                            } day
                                            {
                                                booking.days !== 1
                                                    ? "s"
                                                    : ""
                                            }
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Price Per Day
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {
                                                booking.pricePerDay
                                            }
                                        </strong>
                                    </div>

                                </div>


                                {/* TOTAL */}

                                <div className="booking-total-row">

                                    <div>
                                        <span>
                                            Total Amount
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {
                                                booking.totalPrice
                                            }
                                        </strong>
                                    </div>

                                </div>


                                {/* CANCEL */}

                                <button
                                    className="cancel-booking-btn"
                                    onClick={() =>
                                        handleCancel(
                                            booking.id
                                        )
                                    }
                                >
                                    ❌ Cancel Booking
                                </button>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );
}

export default MyBookings;