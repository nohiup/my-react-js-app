import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  checkList: [] as string[],
}

const taskChecklistSlice = createSlice({
  name: "taskChecklist",
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
    }
  }
});

export const { checkNewItem, removeItem } = taskChecklistSlice.actions;
export default taskChecklistSlice.reducer;