import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getVehicle();
    }, [id]);

    async function getVehicle() {
        try {
            const response = await api.get(`/vehicles/${id}`);
            setVehicle(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function calculatePrice(start, end) {
        if (!start || !end || !vehicle) {
            setDays(0);
            setTotalPrice(0);
            return;
        }

        const startTime = new Date(start);
        const endTime = new Date(end);

        const difference =
            endTime.getTime() - startTime.getTime();

        const calculatedDays =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );

        if (calculatedDays > 0) {
            setDays(calculatedDays);
            setTotalPrice(
                calculatedDays *
                Number(vehicle.pricePerDay)
            );
        } else {
            setDays(0);
            setTotalPrice(0);
        }
    }

    function handleStartDate(e) {
        const value = e.target.value;
        setStartDate(value);
        calculatePrice(value, endDate);
    }

    function handleEndDate(e) {
        const value = e.target.value;
        setEndDate(value);
        calculatePrice(startDate, value);
    }

    async function handleBooking(e) {
        e.preventDefault();

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) {
            alert("Please login before booking.");
            navigate("/login");
            return;
        }

        if (!startDate || !endDate) {
            alert("Please select both dates.");
            return;
        }

        if (days <= 0) {
            alert("End date must be after start date.");
            return;
        }

        try {
            const booking = {
                userId: user.id,
                userName: user.name,

                vehicleId: vehicle.id,
                vehicleName: vehicle.name,

                startDate: startDate,
                endDate: endDate,

                days: days,

                pricePerDay:
                    Number(vehicle.pricePerDay),

                totalPrice: totalPrice,

                status: "Confirmed"
            };

            await api.post(
                "/bookings",
                booking
            );

            alert(
                "Booking confirmed successfully!"
            );

            navigate("/my-bookings");

        } catch (error) {
            console.log(error);
            alert(
                "Booking failed. Please try again."
            );
        }
    }

    if (!vehicle) {
        return (
            <div className="details-loading">
                <h2>Loading booking details...</h2>
            </div>
        );
    }

    return (
        <div className="booking-page">

            <button
                className="back-btn"
                onClick={() =>
                    navigate(
                        `/vehicles/${vehicle.id}`
                    )
                }
            >
                ← Back to Vehicle
            </button>

            <div className="booking-layout">

                {/* VEHICLE SUMMARY */}

                <div className="booking-vehicle-card">

                    <div className="booking-image-wrapper">

                        <img
                            src={vehicle.image}
                            alt={vehicle.name}
                        />

                        <span className="booking-available">
                            ✓ Available
                        </span>

                    </div>

                    <div className="booking-vehicle-content">

                        <p className="booking-category">
                            {vehicle.category}
                        </p>

                        <h1>
                            {vehicle.name}
                        </h1>

                        <p className="booking-brand">
                            {vehicle.brand}
                        </p>

                        <div className="booking-info">

                            <span>
                                🚘 {vehicle.type}
                            </span>

                            <span>
                                ⛽ {vehicle.fuel}
                            </span>

                            <span>
                                👥 {vehicle.seats} Seats
                            </span>

                            <span>
                                📍 {vehicle.location}
                            </span>

                        </div>

                        <div className="booking-price">

                            <span>
                                Price per day
                            </span>

                            <strong>
                                ₹ {vehicle.pricePerDay}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* BOOKING FORM */}

                <div className="booking-form-card">

                    <div className="booking-heading">

                        <p>
                            RENT YOUR VEHICLE
                        </p>

                        <h2>
                            Booking Details
                        </h2>

                        <span>
                            Select your rental dates
                            to continue.
                        </span>

                    </div>

                    <form
                        onSubmit={handleBooking}
                    >

                        <div className="date-grid">

                            <div className="date-field">

                                <label>
                                    📅 Start Date
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={
                                        handleStartDate
                                    }
                                    required
                                />

                            </div>


                            <div className="date-field">

                                <label>
                                    📅 End Date
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    min={
                                        startDate ||
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={
                                        handleEndDate
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* PRICE SUMMARY */}

                        <div className="booking-summary">

                            <h3>
                                Price Summary
                            </h3>

                            <div className="summary-row">

                                <span>
                                    Price per day
                                </span>

                                <strong>
                                    ₹ {vehicle.pricePerDay}
                                </strong>

                            </div>

                            <div className="summary-row">

                                <span>
                                    Number of days
                                </span>

                                <strong>
                                    {days}
                                </strong>

                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-total">

                                <span>
                                    Total Amount
                                </span>

                                <strong>
                                    ₹ {totalPrice}
                                </strong>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="confirm-booking-btn"
                        >
                            🚗 Confirm Booking
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Booking;