import {
    Routes,
    Route
} from "react-router-dom";

import Home from "../pages/Home";
import Vehicles from "../pages/Vehicles";
import VehicleDetails from "../pages/VehicleDetails";
import AddVehicle from "../pages/AddVehicle";
import EditVehicle from "../pages/EditVehicle";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Wishlist from "../pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <Routes>

            {/* Public Routes */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/logout"
                element={<Logout />}
            />


            {/* Public Vehicle Routes */}

            <Route
                path="/vehicles"
                element={<Vehicles />}
            />

            <Route
                path="/vehicles/:id"
                element={<VehicleDetails />}
            />


            {/* Protected Routes */}

            <Route
                path="/add-vehicle"
                element={
                    <ProtectedRoute>
                        <AddVehicle />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit-vehicle/:id"
                element={
                    <ProtectedRoute>
                        <EditVehicle />
                    </ProtectedRoute>
                }
            />

            <Route 
                path="/wishlist"
                element={<Wishlist />}
            />

            <Route
                path="/booking/:id"
                element={
                    <ProtectedRoute>
                        <Booking />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-bookings"
                element={
                    <ProtectedRoute>
                        <MyBookings />
                    </ProtectedRoute>
                }
            />

        </Routes>
        
    );
}

export default AppRoutes;