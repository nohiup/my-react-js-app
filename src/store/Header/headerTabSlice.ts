import type { Task } from "@/data/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  openedTabTasks: [] as Task[],
}

const headerTabSlice = createSlice({
  name: "headerTab",
  initialState,
  reducers: {
    openNewTask: (state, action: PayloadAction<Task>) => {
      if (!state.openedTabTasks.some(x => x.id === action.payload.id)) {
        state.openedTabTasks.push(action.payload)
      }
    },
    closeTask: (state, action: PayloadAction<string>) => {
      if (state.openedTabTasks.some(x => x.id === action.payload)) {
        state.openedTabTasks = state.openedTabTasks.filter((t) => t.id !== action.payload)
      }
    },
  }
});

export const { openNewTask, closeTask } = headerTabSlice.actions;
export default headerTabSlice.reducer;

