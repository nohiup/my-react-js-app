import { combineReducers, configureStore } from "@reduxjs/toolkit";
import leftSidebarReducer from "./LeftSidebar/leftSidebarSlice";
import leftSidebarTaskReducer from "./LeftSidebar/leftSidebarTaskSlice";
import headerTabReducer from "./Header/headerTabSlice";
import mainContentReducer from "./MainContent/mainContentSlice";

const rootReducer = combineReducers({
  //Import reducer inside
  leftSidebar: leftSidebarReducer,
  leftSidebarTask: leftSidebarTaskReducer,
  headerTab: headerTabReducer,
  mainContent: mainContentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;