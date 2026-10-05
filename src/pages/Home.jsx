import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* =========================
                HERO SECTION
            ========================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-tag">
                        🚗 YOUR JOURNEY STARTS HERE
                    </span>

                    <h1>
                        Find Your
                        <span> Perfect Ride</span>
                    </h1>

                    <p>
                        Rent cars and bikes easily,
                        affordably, and conveniently.
                        Choose your vehicle and start
                        your journey today.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/vehicles"
                            className="hero-primary"
                        >
                            🚘 Explore Vehicles
                        </Link>

                        <Link
                            to="/register"
                            className="hero-secondary"
                        >
                            Get Started →
                        </Link>

                    </div>

                </div>


                {/* Decorative Vehicle */}

                <div className="hero-vehicle">
                    🚙
                </div>

                <div className="hero-circle circle-one"></div>
                <div className="hero-circle circle-two"></div>

            </section>


            {/* =========================
                VEHICLE CATEGORIES
            ========================= */}

            <section className="home-section">

                <div className="section-heading">

                    <span>
                        EXPLORE OUR VEHICLES
                    </span>

                    <h2>
                        Choose Your Ride
                    </h2>

                    <p>
                        From everyday commuting to
                        weekend adventures, we have
                        the right vehicle for you.
                    </p>

                </div>


                <div className="category-grid">

                    <div className="category-card">

                        <div className="category-icon">
                            🚗
                        </div>

                        <h3>
                            Cars
                        </h3>

                        <p>
                            Comfortable and reliable
                            cars for city travel,
                            family trips and more.
                        </p>

                        <Link to="/vehicles">
                            Explore Cars →
                        </Link>

                    </div>


                    <div className="category-card">

                        <div className="category-icon">
                            🏍️
                        </div>

                        <h3>
                            Bikes
                        </h3>

                        <p>
                            Easy-to-rent bikes for
                            daily commuting and
                            exciting road trips.
                        </p>

                        <Link to="/vehicles">
                            Explore Bikes →
                        </Link>

                    </div>


                    <div className="category-card">

                        <div className="category-icon">
                            ⭐
                        </div>

                        <h3>
                            Premium Vehicles
                        </h3>

                        <p>
                            Experience premium
                            vehicles for special
                            occasions and journeys.
                        </p>

                        <Link to="/vehicles">
                            Explore Premium →
                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================
                WHY CHOOSE US
            ========================= */}

            <section className="why-section">

                <div className="section-heading">

                    <span>
                        WHY RIDERENT?
                    </span>

                    <h2>
                        Everything You Need
                    </h2>

                    <p>
                        We make vehicle rental simple,
                        convenient and stress-free.
                    </p>

                </div>


                <div className="features-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            ⚡
                        </div>

                        <h3>
                            Easy Booking
                        </h3>

                        <p>
                            Find and book your
                            vehicle in just a few
                            simple steps.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            💰
                        </div>

                        <h3>
                            Affordable Prices
                        </h3>

                        <p>
                            Choose from vehicles
                            that fit your budget.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🛡️
                        </div>

                        <h3>
                            Safe & Reliable
                        </h3>

                        <p>
                            Enjoy a reliable rental
                            experience for every trip.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📍
                        </div>

                        <h3>
                            Multiple Locations
                        </h3>

                        <p>
                            Find vehicles available
                            across different locations.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                FINAL CTA
            ========================= */}

            <section className="home-cta">

                <div>

                    <h2>
                        Ready to Start Your Journey?
                    </h2>

                    <p>
                        Find your perfect vehicle
                        and hit the road today.
                    </p>

                </div>

                <Link
                    to="/vehicles"
                    className="cta-button"
                >
                    Browse Vehicles →
                </Link>

            </section>

        </div>
    );
}

export default Home;