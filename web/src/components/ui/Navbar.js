import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { StoreUtil } from "@synergy-project-t/utils";

const Navbar = () => {
  const navigate = useNavigate()
  const { userInfo, userAuth } = StoreUtil.useUserAuthStore(
    (state) => state
  );
  const { pathname } = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOptionClick = (path) => {
    if(path) {
      navigate(path)
    }
    setDropdownVisible(false);
  };

  const handleLogout = () => {
      localStorage.clear();
    
      document.cookie.split(";").forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    
      window.location.reload();
  }
 
  if(pathname === '/login') {
    return
  }

  return (
    <nav className="flex w-[100%] justify-center items-center bg-white py-1 border border-b-[rgba(229, 231, 235)]">
      <div className="flex w-[100%] px-2 justify-between items-center">
        <div className="ml-8 text-lg font-semibold hover:cursor-pointer" onClick={() => navigate('/')}>
          {'CODEV EMERGENCY PREPAREDNESS APP'}
        </div>
        
        <div className="relative">
          <div 
            onClick={toggleDropdown} 
            className="flex items-center cursor-pointer px-4 py-2 gap-2"
          >
            <img class="object-cover rounded-full w-[3em] h-[3em]" src={userInfo.profilePic || ''} alt={`photo of ${userInfo.firstName || '-'}`}/>
            <MdKeyboardArrowDown size={'2em'} />
          </div>
          
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              {(userAuth.roles.includes('ADMIN') && pathname !== '/') && (
                <div onClick={() => handleOptionClick('/')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  {'Admin Dashboard'}
                </div>
              )}
              {(userAuth.roles.includes('EMPLOYEE') && pathname !== '/employee') && (
                <div onClick={() => handleOptionClick('/employee')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  {'My Dashboard'}
                </div>
              )}
              {pathname !== '/profile' && (
                <div onClick={() => handleOptionClick('/profile')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Profile
                </div>
              )}
              <div onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
