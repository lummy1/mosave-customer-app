import { BiDollarCircle, BiMessageSquareDetail } from "react-icons/bi";
import { BsCalendar, BsCreditCard, BsGear, BsPerson } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";
import { HiOutlineSave } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

interface ISection {
  name: string;
  link: string;
  icon: any;
  count?: number;
  badge?: string;
  submenus?: Array<any> | undefined;
}

interface IMenu {
  name: string;
  section: ISection[];
}

export const menus: IMenu[] = [
  {
    name: "Savings",
    section: [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: <RxDashboard />,
        count: 0,
        submenus: [],
      },
      {
        name: "MoSave",
        link: "/savings",
        icon: <HiOutlineSave />,
        submenus: [
          {
            name: "Savings",
            link: "/savings",
          },
          {
            name: "Withdrawal",
            link: "/withdraw",
          },
          {
            name: "View Plans",
            link: "/plans",
          },
        ],
      },
      {
        name: "Transaction History",
        link: "/transaction-history",
        icon: <BsCreditCard />,
      },
    ],
  },
  {
    name: "Tickets",
    section: [
      {
        name: "MoTicket",
        link: "/tickets",
        icon: <BsCalendar />,
        count: 0,
        submenus: [
          {
            name: "View tickets",
            link: "/tickets",
          },
          {
            name: "Ticket Records",
            link: "/ticket-history",
          },
        ],
      },
    ],
  },
  {
    name: "Payments",
    section: [
      {
        name: "Bill Payments",
        link: "/bill-payments",
        icon: <MdPayment />,
        badge: "new",
      },
      {
        name: "Utilities",
        link: "/utilities",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Support",
    section: [
      {
        name: "Profile",
        link: "/profile",
        icon: <BsPerson />,
        submenus: [],
      },
      {
        name: "Settings",
        link: "/settings",
        icon: <BsGear />,
      },
      {
        name: "Notifications",
        link: "/notifications",
        count: 3,
        icon: <BiMessageSquareDetail />,
      },
      {
        name: "Referrals",
        link: "/referrals",
        icon: <BiDollarCircle />,
      },
    ],
  },
];
