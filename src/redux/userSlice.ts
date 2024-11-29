

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";



export interface User {
    id: number;
    username: string;
    email: string;
}


interface fetchResponseUser {
    users: User[]
    totalItems: number;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    totalItems: number;
    currentPage: number;
    pageSize: number;
    searchQuery: string
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    totalItems: 0,
    currentPage: 1,
    pageSize: 5,
    searchQuery: ""
}


export const fetchUsers = createAsyncThunk<fetchResponseUser, { page: number, pageSize: number,search:string }, { rejectValue: string }>('userFetch', async ({ page, pageSize, search }, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5223/api/User', { params: { page, pageSize, search } });

        const users = response.data.users.$values;
        const totalItems = response.data.totalItems
        return { users, totalItems };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            return rejectWithValue(error.response?.data || 'An error occurred while fetching users.');
        }
        return rejectWithValue('An unknown error occurred.');
    }
})

//===========add new user==============//
export const addUser = createAsyncThunk<User, { username: string; email: string }, { rejectValue: string }>(
    "user/addUser",
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5223/api/User", newUser);
            return response.data; // Assuming the API returns the newly created user object
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Failed to add the user.");
            }
            return rejectWithValue("An unknown error occurred.");
        }
    }
);



// Delete User Thunk
export const deleteUser = createAsyncThunk<{ id: number, message: string }, number, { rejectValue: string }>(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5223/api/User/${id}`);
            return { id, message: response.data.message || "User Deleted Successfully" }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || "Failed to delete the user.");
            }
            return rejectWithValue("An unknown error occurred.");
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload; // Update the current page in state
        },

        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.users; // Set users
            state.totalItems = action.payload.totalItems; // Set totalItems
        })

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch users";
        })

            // Add User
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.users.push(action.payload); // Add the new user to the list
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add the user.";
            })

            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete the user.";
            });
    }
})

export const { setPage ,setSearchQuery} = userSlice.actions;
export default userSlice.reducer;