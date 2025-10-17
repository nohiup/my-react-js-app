import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../data/tasks";
import type { Task } from "types";

interface LeftSidebarTaskState {
  data: Task[] | null;
  loading: boolean;
  error: string | null;
  selectedTaskId: string | null;
}

const initialState: LeftSidebarTaskState = {
  data: null,
  loading: false,
  error: null,
  selectedTaskId: null,
};


export const fetchLeftSidebarTask = createAsyncThunk("leftSidebarTask/fetchTasks", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = tasks;
  return res;
});

const LeftSidebarTaskSlice = createSlice({
  name: "leftSidebarTask",
  initialState,
  reducers: {
    setSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeftSidebarTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeftSidebarTask.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeftSidebarTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  }

});

export const { setSelectedTaskId } = LeftSidebarTaskSlice.actions;
export default LeftSidebarTaskSlice.reducer;
