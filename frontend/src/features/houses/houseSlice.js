import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import houseService from "./houseService";

const initialState = {
  houses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new house
export const createHouse = createAsyncThunk(
  "houses/create",
  async (houseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await houseService.createHouse(houseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user house
export const getMyHouses = createAsyncThunk(
  "houses/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await houseService.getMyHouses(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Houses
export const getAllHouses = createAsyncThunk(
  "houses/getAll",
  async (_, thunkAPI) => {
    try {
      return await houseService.getAllHouses();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user house
export const deleteHouse = createAsyncThunk(
  "houses/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await houseService.deleteHouse(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.houses.push(action.payload);
      })
      .addCase(createHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getMyHouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyHouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.houses = action.payload;
      })
      .addCase(getMyHouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllHouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllHouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.houses = action.payload;
      })
      .addCase(getAllHouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.houses = state.houses.filter(
          (house) => house._id !== action.payload.id
        );
      })
      .addCase(deleteHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = houseSlice.actions;
export default houseSlice.reducer;
