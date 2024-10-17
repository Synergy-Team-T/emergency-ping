import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [componentToRender, setComponentToRender] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname!=='/login') {
      setComponentToRender(HeaderComp);
    }
    else {
      setComponentToRender(null);
    }
  }, [
    pathname
  ]);

  const HeaderComp = (<nav className="bg-white p-4 border border-b-[rgba(229, 231, 235)]">
    <div className="container ml-10 flex justify-between items-center">
      <div className="text-lg font-semibold">CODEV EMERGENCY PREPAREDNESS APP</div>
      {/* {<div className="hidden md:flex space-x-4">   
        <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Home</a>
        <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">About</a>
        <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Services</a>
        <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Contact</a>
      </div>} */}
      {/* {<div className="md:hidden">
        <button className=" focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>} */}
    </div>
  </nav>);

  return (
    componentToRender
  );
};

export default Navbar;