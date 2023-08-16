"use client";
import Private from "../components/Layouts/Private";
import { connect } from "react-redux";
import React, { Component } from "react";
import { fetch } from "@/redux/features/profile/profileSlice";
import { Greeting } from "../utils/functions";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { data, data2, data3 } from "./constants";

type Props = {};

type State = {
  mount: boolean;
  show: boolean;
  board: any[];
  quickLinks: any[];
  quickLinks2: any[];
};

class DashboardPage extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      mount: false,
      show: false,
      board: data,
      quickLinks: data2,
      quickLinks2: data3,
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
                      <h3 className="font-bold dark:text-white">Quick Links</h3>
                    </div>
                    {/* <div className="px-4 py-2 inline-flex space-x-4"> */}
                    <div className="space-y-8 sm:grid max-w-screen-xl md:grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 space-x-2 gap-8 md:gap-6 sm:gap-2 md:space-y-0">
                      {this.state.quickLinks.map((item, i) => (
                        <button
                          key={i}
                          type="button"
                          className="items-center p-2 text-sm font-medium bg-blue-100 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                        >
                          <div className="items-center text-sm bg-transparent rounded-lg">
                            <span
                              className={`${item.color} ${item.bg} dark:border-gray-700 inline-flex items-center justify-center w-12 h-12 text-sm font-semibold rounded-full dark:bg-gray-700 dark:text-gray-300`}
                            >
                              {item.icon}
                            </span>
                            <div className="items-center my-2">
                              <span className="text-black dark:text-white">
                                {item.heading}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="px-4 py-2">
                      <div className="my-5 py-5 border-b border-t border-gray-100 JeVit_1klYopnNwu_8oy">
                        <ul className="grid grid-cols-6 gap-2">
                          {this.state.quickLinks2.map((item, i) => (
                            <li key={i}>
                              <Link
                                href={item.href}
                                className={`rounded-xl bg-${item.color}-50 hover:bg-${item.color}-100 dark:bg-${item.color}-900 dark:hover:bg-${item.color}-800 p-2.5 flex flex-col items-center justify-center __CB1NVTb04MHxDxK6Hw`}
                              >
                                <span
                                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-${item.color}-100 dark:bg-${item.color}-800 group-hover:bg-${item.color}-200 dark:group-hover:bg-${item.color}-700`}
                                >
                                  {item.icon(
                                    `w-5 h-5 text-${item.color}-600 dark:text-${item.color}-300`
                                  )}
                                </span>
                                <span
                                  className={`text-xs text-${item.color}-600 dark:text-${item.color}-300 font-medium`}
                                >
                                  {item.heading}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
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
