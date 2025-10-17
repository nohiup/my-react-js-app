import React from "react";
import { Stack } from "../ui/stack";

const InfoRow: React.FC<{
  icon: React.ReactElement<{
    className?: string
  }>;
  label: string;
  children:
  React.ReactNode;
}> = ({ icon, label, children }) => (
  <Stack gap="gap-0">
    <Stack row align="center" className="text-normal">
      <span className="w-4 h-4 flex items-center justify-center">
        {React.cloneElement(icon, { className: "w-4 h-4 shrink-0" })}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </Stack>
    <div className="pl-6 pt-1 text-sm text-title">{children}</div>
  </Stack>
);

export default InfoRow;