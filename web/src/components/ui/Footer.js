import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { StoreUtil } from "@synergy-project-t/utils";

const Footer = () => {
  const { contactNumbers } = StoreUtil.useUserAuthStore((state) => state);
  const [componentToRender, setComponentToRender] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/employee" || pathname === "/profile") {
      setComponentToRender(FooterComp);
    } else {
      setComponentToRender(null);
    }
  }, [pathname]);

  const numbers = contactNumbers || {
    codevContacts: {
      immediateSupervisor: "09123456789",
      itDepartment: "09123456789",
      hrDepartment: "09123456789",
    },
    emergencyContacts: {
      emergencyHotline: "911",
      fireDepartment: "(04593) 13638",
      policeDepartment: "0939 220 4252",
    },
  };

  const FooterComp = (
    <nav className="bg-white py-4 px-8 border border-b-[rgba(229, 231, 235)] mt-10 ">
      <div className="ml-10 flex justify-between items-start">
        <div className="flex flex-col w-1/3">
          <div className="text-xl font-semibold">CoDev Emergency Help</div>
          <div className="mt-2">
            Our mission is to equip CoDevs's employees with vital resources and
            knowledge to stay safe and prepared during emergencies. This
            platform provides guidance, tools, and real-time updates to support
            quick and effective responses in critical situations. Your safety is
            our priority.
          </div>
        </div>
        <div className="flex flex-col justify-around items-start">
          <div className="text-xl font-semibold">Codev Contacts</div>
          <div className="flex gap-2 mt-2">
            <div className="font-medium">Immediate Supervisor: </div>
            <a href="tel:PHONE_NUM">
              {" "}
              {numbers.codevContacts.immediateSupervisor}{" "}
            </a>
          </div>
          <div className="flex gap-2">
            <div className="font-medium">IT Department: </div>
            <a href="tel:PHONE_NUM"> {numbers.codevContacts.itDepartment} </a>
          </div>
          <div className="flex gap-2">
            <div className="font-medium">HR Department: </div>
            <a href="tel:PHONE_NUM"> {numbers.codevContacts.hrDepartment} </a>
          </div>
        </div>
        <div className="flex flex-col justify-around items-start">
          <div className="text-xl font-semibold">Emergency Contacts</div>
          <div className="flex gap-2 mt-2">
            <div className="font-medium">Emergency Hotline: </div>
            <a href="tel:PHONE_NUM">
              {" "}
              {numbers.emergencyContacts.emergencyHotline}{" "}
            </a>
          </div>
          <div className="flex gap-2">
            <div className="font-medium">Fire Department: </div>
            <a href="tel:PHONE_NUM">
              {" "}
              {numbers.emergencyContacts.fireDepartment}{" "}
            </a>
          </div>
          <div className="flex gap-2">
            <div className="font-medium">Police Department: </div>
            <a href="tel:PHONE_NUM">
              {" "}
              {numbers.emergencyContacts.policeDepartment}{" "}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

  return componentToRender;
};

export default Footer;
