import { FaPiggyBank, FaWallet } from "react-icons/fa";
import {
  BsCreditCard2Back,
  BsFillCreditCardFill,
  BsFillSave2Fill,
} from "react-icons/bs";
import { BiCreditCard, BiMoney, BiSolidWalletAlt, BiSupport } from "react-icons/bi";
import { HiSwitchHorizontal } from "react-icons/hi";

export const data = [
  {
    heading: "Total Balance",
    subheading: "Your remaining balance",
    amount: "52000",
    icon: <BiCreditCard />,
    color: "bg-blue-300",
    bg: "bg-customBlue-100",
  },
  {
    heading: "Total Wallet",
    subheading: "Your wallet balance",
    amount: "38000",
    icon: <FaWallet />,
    color: "bg-purple-300",
    bg: "bg-purple-100",
  },
  {
    heading: "Total Rewards",
    subheading: "Loyalty accrued so far",
    amount: "15000",
    icon: <BsFillCreditCardFill />,
    color: "bg-green-300",
    bg: "bg-green-100",
  },
  {
    heading: "Total Interest",
    subheading: "Interest accrued so far",
    amount: "3000",
    icon: <BsCreditCard2Back />,
    color: "bg-red-300",
    bg: "bg-customRed-100",
  },
];
export const data2 = [
  {
    heading: "Deposit",
    icon: <BiCreditCard />,
    color: "text-lime-300",
    bg: "bg-lime-100",
    button: "",
  },
  {
    heading: "Withdraw",
    icon: <BiCreditCard />,
    color: "text-red-300",
    bg: "bg-red-100",
    button: "",
  },
  {
    heading: "Fund Wallet",
    icon: <BiCreditCard />,
    color: "text-yellow-300",
    bg: "bg-yellow-100",
    button: "",
  },
  {
    heading: "Deposit",
    icon: <BiCreditCard />,
    color: "text-orange-300",
    bg: "bg-orange-100",
    button: "",
  },
];
export const data3 = [
  {
    heading: "Deposit",
    color: "primary",
    icon: (classes: string) => {
      return <BsFillSave2Fill className={classes} />; 
    },
    href: "/savings",
  },
  {
    heading: "Withdraw",
    color: "purple",
    icon: (classes: string) => {
      return <BiCreditCard className={classes} />;
    },
    href: "/withdraw",
  },
  {
    heading: "Fund Wallet",
    icon: (classes: string) => {
      return <BiSolidWalletAlt className={classes} />;
    },
    color: "teal",
    href: "/fund-wallet",
  },
  {
    heading: "Invest",
    icon: (classes: string) => {
      return <HiSwitchHorizontal className={classes} />;
    },
    color: "red",
    href: "/invest",
  },
  {
    heading: "Transactions",
    icon: (classes: string) => {
      return <FaPiggyBank className={classes} />;
    },
    color: "primary",
    href: "/transaction-history",
  },
  {
    heading: "Support",
    icon: (classes: string) => {
      return <BiSupport className={classes} />;
    },
    color: "purple",
    href: "/support",
  },
];

export const trans = [
  {
    type: "Deposit",
    ref: "3456723489",
    color: "customError",
    amount: "5000",
    icon: (classes: string) => {
      return <BsFillSave2Fill className={classes} />;
    }
  },
  {
    type: "Withdraw",
    ref: "123456789",
    color: "customSuccess",
    amount: "3000",
    icon: (classes: string) => {
      return <BiCreditCard className={classes} />;
    }
  },
  {
    type: "Commission",
    ref: "1238296789",
    color: "warning",
    amount: "500",
    icon: (classes: string) => {
      return <BiMoney className={classes} />;
    }
  },

];
