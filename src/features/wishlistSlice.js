import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

function getSavedWishlist() {
    if (!user) return [];

    const saved = localStorage.getItem(`wishlist_${user.id}`);
    return saved ? JSON.parse(saved) : [];
}

const wishlistSlice = createSlice({
    name: "wishlist",

    initialState: getSavedWishlist(),

    reducers: {
        addWishlist: (state, action) => {
            const exists = state.find(
                vehicle => vehicle.id === action.payload.id
            );

            if (!exists) {
                state.push(action.payload);

                const user = JSON.parse(localStorage.getItem("user"));

                if (user) {
                    localStorage.setItem(
                        `wishlist_${user.id}`,
                        JSON.stringify(state)
                    );
                }
            }
        },

        removeWishlist: (state, action) => {
            const newWishlist = state.filter(
                vehicle => vehicle.id !== action.payload
            );

            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                localStorage.setItem(
                    `wishlist_${user.id}`,
                    JSON.stringify(newWishlist)
                );
            }

            return newWishlist;
        },

        loadWishlist: (state, action) => {
            return action.payload;
        },

        clearWishlist: () => {
            return [];
        }
    }
});

export const {
    addWishlist,
    removeWishlist,
    loadWishlist,
    clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;