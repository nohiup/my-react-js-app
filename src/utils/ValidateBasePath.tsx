import TabName from "@/data/enum";
import type { JSX } from "react";
import { useParams } from "react-router-dom";

const ValidBasePathRoute = ({ children }: { children: JSX.Element }) => {
  const { basePath } = useParams<{ basePath: string }>();
  const tabs = [TabName.Home.toString(), TabName.Projects.toString(), TabName.Security.toString(), TabName.Settings.toString()];

  if (!basePath || !tabs.includes(basePath)) {
    return <div>Page Not Found </div>;
  }

  return children;
};

export default ValidBasePathRoute;