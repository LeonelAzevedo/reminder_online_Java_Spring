import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link } from "react-router-dom";
import iconReminder from "../assets/iconReminderOnline-removebg.png";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const email = sessionStorage.getItem('email');

  return (
    <header className="dark:bg-blackPrimary bg-whiteSecondary relative shadow-md">
      <div className="flex justify-between items-center px-6 py-4 md:px-9 md:py-5 max-xl:flex-col max-xl:gap-y-5">
        <HiOutlineMenu
          className="text-2xl dark:text-whiteSecondary text-blackPrimary cursor-pointer xl:hidden"
          onClick={() => dispatch(setSidebar())}
        />
        <Link to="/reminder">
          <img
            src={iconReminder}
            alt="Reminder Icon"
            className="w-16 h-16 md:w-24 md:h-24 hover:rotate-90 transition-transform duration-1000 ease-in-out cursor-pointer"
          />
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/profile">
            <div className="flex gap-2 items-center">
              <div className="shadow-md p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm md:text-base dark:text-whiteSecondary text-blackPrimary">
                {email}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
