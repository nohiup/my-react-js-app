import App from "@/App";
import ValidBasePathRoute from "@/utils/ValidateBasePath";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/:basePath/:taskId?" element={
        <ValidBasePathRoute>
          <App />
        </ValidBasePathRoute>} />

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
