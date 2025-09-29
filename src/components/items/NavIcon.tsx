// Helper for the far-left navigation icons
// Fix: Changed component from React.FC to a standard function component
// to improve type inference for React.cloneElement.
import React from 'react';
type NavIconProps = {
  icon: React.ReactElement<{ className?: string }>;
  active?: boolean;
};

const NavIcon = ({ icon, active }: NavIconProps) => (
  <div className="relative flex justify-center">
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 background-primary rounded-r-full"></div>}
    <button className={`p-2 rounded-lg transition-colors ${active ? 'selected-primary text-primary' : 'text-normal background-primary-hover'}`}>
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </button>
  </div>
);

export default NavIcon;