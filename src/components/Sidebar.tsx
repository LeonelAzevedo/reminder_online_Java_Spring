import { HiLogin, HiUserGroup } from "react-icons/hi";
import { useAppSelector } from "../hooks";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../utils/AuthProvider';
import { MdEventNote } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isSidebarOpen } = useAppSelector((state) => state.dashboard);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const sidebarClass: string = isSidebarOpen
    ? "sidebar-open"
    : "sidebar-closed";

  const navActiveClass: string =
    "flex items-center gap-4 py-4 px-6 text-lg font-medium text-blackPrimary bg-white dark:bg-blackSecondary shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none";
  const navInactiveClass: string =
    "flex items-center gap-4 py-4 px-6 text-lg font-medium text-blackPrimary bg-whiteSecondary dark:bg-blackPrimary dark:text-whiteSecondary hover:bg-gray-200 dark:hover:bg-blackSecondary transition-colors duration-300 focus:outline-none";

  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-72 h-[100vh] dark:bg-blackPrimary bg-whiteSecondary pt-6 xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 ${sidebarClass}`}
      >
        <div className="pt-8">
          <NavLink
            to="/reminder"
            className={({ isActive }) =>
              isActive ? navActiveClass : navInactiveClass
            }
          >
            <MdEventNote size={24} />
            <span className="text-lg">Lembretes</span>
          </NavLink>

          <div
            onClick={() => setIsAuthOpen(!isAuthOpen)}
            className="flex items-center gap-4 py-4 px-6 text-lg font-medium text-blackPrimary bg-whiteSecondary dark:bg-blackPrimary dark:text-whiteSecondary hover:bg-gray-200 dark:hover:bg-blackSecondary cursor-pointer transition-colors duration-300"
          >
            <FaCog size={24} />
            <span>Configurações</span>
          </div>

          {isAuthOpen && (
            <div className="mt-4">
              <NavLink
                to="/login"
                onClick={handleLogout}
                className={({ isActive }) =>
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiLogin className="text-xl" />
                <span>Logout</span>
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiUserGroup className="text-xl" />
                <span>Perfil</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
