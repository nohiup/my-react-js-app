// Helper for the far-left navigation icons
// Fix: Changed component from React.FC to a standard function component
// to improve type inference for React.cloneElement.
import React from 'react';
import { Stack } from '../ui/stack';
type NavIconProps = {
  icon: React.ReactElement<{ className?: string }>;
  active?: boolean;
};

const NavIcon = ({ icon, active }: NavIconProps) => (
  <Stack align="center" className="relative">
    <button className={`p-2 rounded-lg transition-colors ${active ? 'selected-primary text-primary' : 'text-normal background-primary-hover'}`}>
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </button>
  </Stack>
);

export default NavIcon;