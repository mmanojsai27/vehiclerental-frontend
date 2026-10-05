import {
    useEffect,
    useState
} from "react";

import api from "../services/api";

import VehicleCard
    from "../components/VehicleCard";


function Vehicles() {

    const [vehicles, setVehicles] =
        useState([]);


    // SEARCH

    const [search, setSearch] =
        useState("");


    // CATEGORY FILTER

    const [category, setCategory] =
        useState("All");


    // FUEL FILTER

    const [fuel, setFuel] =
        useState("All");


    // PRICE FILTER

    const [price, setPrice] =
        useState("All");


    // SORT

    const [sort, setSort] =
        useState("Default");


    // GET VEHICLES

    useEffect(() => {

        getVehicles();

    }, []);


    async function getVehicles() {

        try {

            const response =
                await api.get("/vehicles");

            setVehicles(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    }


    // DELETE VEHICLE

    async function handleDelete(id) {

        try {

            await api.delete(
                `/vehicles/${id}`
            );


            setVehicles(
                vehicles.filter(
                    vehicle =>
                        vehicle.id !== id
                )
            );


            alert(
                "Vehicle deleted successfully!"
            );

        } catch (error) {

            console.log(error);

        }

    }


    // FILTER VEHICLES

    let filteredVehicles =
        vehicles.filter(
            vehicle => {

                // SEARCH

                const searchText =
                    search.toLowerCase();


                const matchesSearch =

                    vehicle.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    vehicle.brand
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    vehicle.type
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    vehicle.fuel
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    vehicle.location
                        .toLowerCase()
                        .includes(searchText);


                // CATEGORY

                const matchesCategory =

                    category === "All"
                    ||
                    vehicle.category ===
                    category;


                // FUEL

                const matchesFuel =

                    fuel === "All"
                    ||
                    vehicle.fuel === fuel;


                // PRICE

                let matchesPrice = true;


                if (
                    price ===
                    "Below 1000"
                ) {

                    matchesPrice =
                        vehicle.pricePerDay <
                        1000;

                }


                if (
                    price ===
                    "1000-2000"
                ) {

                    matchesPrice =
                        vehicle.pricePerDay >=
                        1000
                        &&
                        vehicle.pricePerDay <=
                        2000;

                }


                if (
                    price ===
                    "Above 2000"
                ) {

                    matchesPrice =
                        vehicle.pricePerDay >
                        2000;

                }


                return (
                    matchesSearch
                    &&
                    matchesCategory
                    &&
                    matchesFuel
                    &&
                    matchesPrice
                );

            }
        );


    // SORT VEHICLES

    if (
        sort ===
        "Rating High"
    ) {

        filteredVehicles.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    if (
        sort ===
        "Price Low"
    ) {

        filteredVehicles.sort(
            (a, b) =>
                a.pricePerDay -
                b.pricePerDay
        );

    }


    if (
        sort ===
        "Price High"
    ) {

        filteredVehicles.sort(
            (a, b) =>
                b.pricePerDay -
                a.pricePerDay
        );

    }


    return (

        <div>

            <h1>
                Available Vehicles
            </h1>


            {/* SEARCH */}

            <div className="vehicle-controls">

                <input
                    type="text"
                    placeholder="🔍 Search vehicles..."
                    value={search}
                    onChange={
                        e =>
                            setSearch(
                                e.target.value
                            )
                    }
                    className="search-box"
                />


                {/* CATEGORY */}

                <select
                    value={category}
                    onChange={
                        e =>
                            setCategory(
                                e.target.value
                            )
                    }
                >

                    <option value="All">
                        All Categories
                    </option>

                    <option value="Car">
                        Cars
                    </option>

                    <option value="Bike">
                        Bikes
                    </option>

                </select>


                {/* FUEL */}

                <select
                    value={fuel}
                    onChange={
                        e =>
                            setFuel(
                                e.target.value
                            )
                    }
                >

                    <option value="All">
                        All Fuel
                    </option>

                    <option value="Petrol">
                        Petrol
                    </option>

                    <option value="Diesel">
                        Diesel
                    </option>

                </select>


                {/* PRICE */}

                <select
                    value={price}
                    onChange={
                        e =>
                            setPrice(
                                e.target.value
                            )
                    }
                >

                    <option value="All">
                        All Prices
                    </option>

                    <option value="Below 1000">
                        Below ₹1000
                    </option>

                    <option value="1000-2000">
                        ₹1000 - ₹2000
                    </option>

                    <option value="Above 2000">
                        Above ₹2000
                    </option>

                </select>


                {/* SORT */}

                <select
                    value={sort}
                    onChange={
                        e =>
                            setSort(
                                e.target.value
                            )
                    }
                >

                    <option value="Default">
                        Sort: Default
                    </option>

                    <option value="Rating High">
                        Rating: High to Low
                    </option>

                    <option value="Price Low">
                        Price: Low to High
                    </option>

                    <option value="Price High">
                        Price: High to Low
                    </option>

                </select>

            </div>


            {/* RESULT COUNT */}

            <p className="result-count">

                Showing{" "}
                <strong>
                    {filteredVehicles.length}
                </strong>{" "}
                vehicles

            </p>


            {/* VEHICLES */}

            <div className="vehicles">

                {

                    filteredVehicles.length ===
                    0 ? (

                        <div className="no-results">

                            <h2>
                                🚗 No Vehicles Found
                            </h2>

                            <p>
                                Try changing your
                                search or filters.
                            </p>

                        </div>

                    ) : (

                        filteredVehicles.map(
                            vehicle => (

                                <VehicleCard
                                    key={vehicle.id}
                                    vehicle={vehicle}
                                    onDelete={
                                        handleDelete
                                    }
                                />

                            )
                        )

                    )

                }

            </div>

        </div>

    );

}


export default Vehicles;