import { BiDollarCircle, BiMessageSquareDetail } from "react-icons/bi";
import { BsCalendar, BsCreditCard, BsGear, BsHouseDoor, BsPerson } from "react-icons/bs";
import { HiOutlineSave } from "react-icons/hi";

export const menus = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <BsHouseDoor />,
  },
  {
    name: "MoSave",
    icon: <HiOutlineSave />,
    link: "/savings",
    submenu: [
      {
        name: "Savings",
        link: "/savings",
      },
      {
        name: "Withdrawal",
        link: "/withdraw",
      },
    ],
  },
  {
    name: "Transaction History",
    link: "/transaction-history",
    icon: <BsCreditCard />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <BsPerson />,
  },
  {
    name: "MoTicket",
    badge: "new",
    link: "/tickets",
    icon: <BsCalendar />,
  },
  {
    name: "Notifications",
    link: "/notifications",
    count: 3,
    icon: <BiMessageSquareDetail />,
  },
];

export const menus2 = [
  {
    name: "Settings",
    link: "/settings",
    icon: <BsGear />,
  },
  {
    name: "Referral",
    link: "/referrals",
    icon: <BiDollarCircle />,
  },
];
