// Helper for the far-left navigation icons
// Fix: Changed component from React.FC to a standard function component
// to improve type inference for React.cloneElement.
import React from 'react';
import { Stack } from '../ui/stack';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, toggleSidebar } from '@/store/LeftSidebar/leftSidebarSlice';
import type { AppDispatch, RootState } from '@/store/configureStore';
import { useNavigate } from "react-router";

type NavIconProps = {
  icon: React.ReactElement<{ className?: string }>;
  id: string;
  path?: string;
};


const NavIcon = ({ icon, id, path }: NavIconProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  var active = true;
  const handleClick = () => {
    dispatch(toggleSidebar(id));
    dispatch(setActive(id));
    if (path) {
      navigate(path);
    }
  };
  const activeTab = useSelector((state: RootState) => state.leftSidebar.activeTab);
  if (id !== activeTab) {
    active = false;
  }
  return (
    <Stack align="center" className="relative">
      <button
        className={`p-2 rounded-lg transition-colors ${active ? 'selected-primary text-primary' : 'text-normal background-primary-hover'}`}
        onClick={handleClick}>
        {React.cloneElement(icon, { className: "w-4 h-4" })}
      </button>
    </Stack>
  );
}

export default NavIcon;