import React from "react";

interface NavBottomIconProps {
  icon: React.ReactElement;
  onClick?: () => void;
  className?: string; // thêm class tùy biến
}

const NavBottomIcon: React.FC<NavBottomIconProps> = ({ icon, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-normal background-primary-hover rounded-lg ${className}`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4" })}
    </button>
  );
};

export default NavBottomIcon;
