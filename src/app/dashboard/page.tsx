"use client";
import Private from "../components/Layouts/Private";
import { connect } from "react-redux";

import React, { Component } from "react";
import { fetch } from "@/redux/features/profile/profileSlice";
import { Greeting } from "../utils/functions";
import { FaEye, FaEyeSlash, FaWallet } from "react-icons/fa";
import {
  BsCreditCard2Back,
  BsEyeFill,
  BsEyeSlashFill,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { BiCreditCard } from "react-icons/bi";

type Props = {};

type State = {
  mount: boolean;
  show: boolean;
  board: any[];
  quickLinks: any[];
};

class DashboardPage extends Component<Props, State> {
  data = [
    {
      heading: "Total Balance",
      subheading: "Your remaining balance",
      amount: "52,000",
      icon: <BiCreditCard />,
      color: "bg-blue-300",
      bg: "bg-blue-100",
    },
    {
      heading: "Total Wallet",
      subheading: "The balance in your wallet",
      amount: "38,000",
      icon: <FaWallet />,
      color: "bg-yellow-300",
      bg: "bg-yellow-100",
    },
    {
      heading: "Total Rewards",
      subheading: "Loyalty accrued so far",
      amount: "15,000",
      icon: <BsFillCreditCardFill />,
      color: "bg-green-300",
      bg: "bg-green-100",
    },
    {
      heading: "Total Interest",
      subheading: "Interest accrued so far",
      amount: "3,000",
      icon: <BsCreditCard2Back />,
      color: "bg-red-300",
      bg: "bg-red-100",
    },
  ];
  data2 = [
    {
      heading: "Deposit",
      icon: <BiCreditCard />,
      color: "text-lime-300",
      bg: "bg-lime-100",
      button: ""
    },
    {
      heading: "Withdraw",
      icon: <BiCreditCard />,
      color: "text-red-300",
      bg: "bg-red-100",
      button: ""
    },
    {
      heading: "Fund Wallet",
      icon: <BiCreditCard />,
      color: "text-yellow-300",
      bg: "bg-yellow-100",
      button: ""
    },
    {
      heading: "Deposit",
      icon: <BiCreditCard />,
      color: "text-orange-300",
      bg: "bg-orange-100",
      button: ""
    },
  ]
  constructor(props: any) {
    super(props);

    this.state = {
      mount: false,
      show: false,
      board: this.data,
      quickLinks: this.data2
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  render() {
    return (
      <>
        {this.state.mount && (
          <Private>
            <div className="mb-5">
              <h1 className="my-2 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                <Greeting /> John
              </h1>
              <div className="grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-4">
                {this.state.board.map((item, i) => (
                  <div
                    key={i}
                    className={`${item.bg} p-4 space-y-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-2 dark:bg-gray-800`}
                  >
                    <div className="flex items-center space-x-3 px-2 py-2">
                      <span
                        className={`${item.color} inline-flex items-center justify-center w-12 h-12 mr-2 text-sm font-semibold text-gray-800  rounded-full dark:bg-gray-700 dark:text-gray-300`}
                      >
                        {item.icon}
                        <span className="sr-only">Icon description</span>
                      </span>
                      <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <h3>{item.heading}</h3>
                        <small className="text-xs text-gray-500 dark:text-gray-400">
                          {item.subheading}
                        </small>
                      </div>
                    </div>
                    <div className="flex px-2 py-1">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                          {this.state.show ? "₦" + item.amount : "****"}
                        </h2>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <button
                          type="button"
                          onClick={() =>
                            this.setState({ show: !this.state.show })
                          }
                        >
                          {this.state.show ? <BsEyeFill /> : <BsEyeSlashFill />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                <div className="col-span-full xl:col-auto">
                  <div className="p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="px-4 py-2"></div>
                    <div className="px-4 py-2">
                      <h3>Card footer</h3>
                    </div>
                  </div>
                  <div className="p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="px-4 py-2">
                      <h3>Card header</h3>
                    </div>
                    <div className="px-4 py-2">
                      <h3>Card footer</h3>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-4 mb-4 lg:space-y-6 space bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <div className="px-4 py-2">
                      <h3 className="font-bold">Quick Links</h3>
                    </div>
                    {/* <div className="px-4 py-2 inline-flex space-x-4"> */}
                    <div className="space-y-8 sm:grid max-w-screen-xl md:grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 space-x-2 gap-8 md:gap-6 sm:gap-2 md:space-y-0">
                      {this.state.quickLinks.map((item, i) => (
                          <button key={i} type="button" className="items-center p-2 text-sm font-medium bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300">
                            <div className="items-center text-sm bg-transparent rounded-lg">
                              <span className={`${item.color } ${item.bg} inline-flex items-center justify-center w-12 h-12 text-sm font-semibold rounded-full dark:bg-gray-700 dark:text-gray-300`}>
                                {item.icon}
                              </span>
                              <div className="items-center my-2">
                              <span className="text-black dark:text-white">{item.heading}</span>
                              </div>
                            </div>
                          </button>
                      ))}
                    </div>
                    {/* </div> */}
                    
                  </div>
                  <div className="p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="px-4 py-2">
                      <h3>Card header</h3>
                    </div>
                    <div className="px-4 py-2">
                      <h3>Card footer</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Private>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: () => dispatch(fetch()),
  };
};
export default connect(null, mapDispatchToProps)(DashboardPage);
