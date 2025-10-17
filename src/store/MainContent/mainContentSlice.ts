import { tasks } from "@/data/tasks";
import type { Task } from "@/data/type";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  task: Task | null;
  loading: boolean;
  error: string | null;
  checkList: string[];
}

const initialState: TaskState = {
  task: null,
  loading: false,
  error: null,
  checkList: [],
}

export const fetchMainContentTask = createAsyncThunk("mainContent/fetchTask", async (taskId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = tasks.find((t) => t.id === taskId);
  return res;
});

const mainContentSlice = createSlice({
  name: "mainContent",
  initialState,
  reducers: {
    checkNewItem: (state, action: PayloadAction<string>) => {
      if (!state.checkList.some(x => x === action.payload)) {
        state.checkList.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      if (state.checkList.some(x => x === action.payload)) {
        state.checkList = state.checkList.filter((t) => t !== action.payload);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainContentTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainContentTask.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
        state.loading = false;
        state.task = action.payload ?? null;
      })
      .addCase(fetchMainContentTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  }
});

export default mainContentSlice.reducer;
export const { checkNewItem, removeItem, updateTask } = mainContentSlice.actions;