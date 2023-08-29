import { BiDollarCircle, BiMessageSquareDetail } from "react-icons/bi";
import { BsCalendar, BsCreditCard, BsGear, BsHouseDoor, BsPerson } from "react-icons/bs";
import { HiOutlineSave } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx"

export const menus = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    name: "MoSave",
    icon: <HiOutlineSave />,
    link: "/savings",
    submenus: [
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
    name: "Utilities",
    link: "/utilities",
    icon: <BsPerson />,
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
    name: "MoTicket",
    badge: "new",
    link: "/tickets",
    icon: <BsCalendar />,
    submenus: [
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
