"use client";
import React, {
  ChangeEvent,
  Component,
  FormEvent,
  MouseEventHandler,
} from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import Image from "next/image";
import { TbCurrencyNaira } from "react-icons/tb";
import Select from "react-select";
import { validationSchema } from "@/validations/utilitiesValidation";
import { IBoolean, IString } from "@/utils/interface";
import parsePhoneNumberFromString from "libphonenumber-js";
import { BsPhone, BsPhoneFlip } from "react-icons/bs";
import RightBar from "../components/rightbar";

type Props = {};
interface IState {
  selectedNetwork: IString;
  mount: boolean;
  params: IParams;
  formErrors: IString;
  touched: IBoolean;
  disabled: boolean;
  currentTab: string;
}

interface IParams {
  phoneNo: string;
  network: string;
  amount: number;
  [key: string]: string | number;
}

const options = [
  { value: "9Mobile", label: "9Mobile", icon: "/imgs/telcos/9mobile.svg" },
  { value: "Airtel", label: "Airtel", icon: "/imgs/telcos/airtel.svg" },
  { value: "GLO", label: "GLO", icon: "/imgs/telcos/glo.svg" },
  { value: "MTN", label: "MTN", icon: "/imgs/telcos/mtn.svg" },
];
const dataPlans = {
  request: "fetch_data_plans",
  status: "success",
  data: [
    {
      plan: "1000",
      label: "1GB",
      operator: "MTN",
      validity: "30",
      price: "600",
      currency: "NGN",
    },
    {
      plan: "2000",
      label: "2GB",
      operator: "MTN",
      validity: "30",
      price: "1100",
      currency: "NGN",
    },
    {
      plan: "10000.01",
      label: "10GB",
      operator: "MTN",
      validity: "30",
      price: "2000",
      currency: "NGN",
    },
  ],
};

class Utilities extends Component<Props, IState> {
  initialValues = { phoneNo: "", network: "", amount: 0 };
  initialErrors = { phoneNo: "", network: "", amount: "" };
  initialNetwork = { icon: "", label: "", value: "" };
  initialTouched = { phoneNo: false, network: false, amount: false };
  tabs = [
    {
      label: "Buy Airtime",
      icon: (classes: string) => {
        return <BsPhone className={classes} />;
      },
    },
    {
      label: "Buy Data",
      icon: (classes: string) => {
        return <BsPhoneFlip className={classes} />;
      },
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selectedNetwork: this.initialNetwork,
      mount: false,
      params: this.initialValues,
      formErrors: this.initialErrors,
      touched: this.initialTouched,
      disabled: true,
      currentTab: "Buy Airtime",
    };
  }

  //   switchTab: MouseEventHandler<HTMLButtonElement> = (tab: string) => {

  //   }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<IState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  validate = () => {
    const initialFormErrors = {};
    validationSchema
      .validate(this.state.params, { abortEarly: false })
      .then(() => {
        this.setState({ formErrors: initialFormErrors });
      })
      .catch((err: any) => {
        const errors: IString = initialFormErrors;
        err.inner.forEach((error: any) => {
          if (this.state.touched[error.path]) {
            errors[error.path] = error.message;
          }
        });
        this.setState({ formErrors: errors });
      });

    validationSchema
      .isValid(this.state.params)
      .then((valid) => this.setState({ disabled: !valid }));
  };

  handleChange = (selectedNetwork: any) => {
    this.setState({ selectedNetwork }, () => {
      // console.log(`Option selected:`, this.state.selectedNetwork);
    });
    this.setState({
      params: { ...this.state.params, network: selectedNetwork.value },
    });
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      params: {
        ...this.state.params,
        [e.target.name]: e.target.value,
      },
    });
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.params);
    console.log(
      JSON.stringify(
        parsePhoneNumberFromString(this.state.params.phoneNo, "NG"),
        null,
        2
      )
    );
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onBlur = () => {
    this.validate();
  };
  render() {
    const {
      selectedNetwork,
      mount,
      formErrors,
      touched,
      disabled,
      currentTab,
    } = this.state;
    const { phoneNo, amount } = this.state.params;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Utilities" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <ul className="border-stroke dark:border-strokedark text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
                      {this.tabs.map((tab, i) => (
                        <li key={i} className="w-full">
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ currentTab: tab.label })
                            }
                            className={` 
        ${i == 0 ? "rounded-l-lg" : "rounded-r-lg"} 
        ${
          currentTab === tab.label
            ? "active text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
            : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 "
        } 
        inline-block w-full p-4 focus:outline-none`}
                            aria-current="page"
                          >
                            <div className="inline-flex">
                              <span>
                                {tab.icon(
                                  `w-5 h-5 mr-2 ${
                                    currentTab === tab.label
                                      ? "text-primary-600 dark:text-primary-500"
                                      : ""
                                  }`
                                )}
                              </span>
                              <span>{tab.label}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="p-7">
                      <form action="/" onSubmit={this.submit}>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="network"
                            >
                              Service Network
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                              <Select
                                classNamePrefix="react-select"
                                isSearchable={false}
                                className=""
                                value={selectedNetwork}
                                id="network"
                                name="network"
                                onChange={this.handleChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                options={options}
                                formatOptionLabel={(item: any) => (
                                  <div className="flex gap-1">
                                    {item.icon !== "" && (
                                      <div className="">
                                        <Image
                                          src={item.icon}
                                          width={30}
                                          height={30}
                                          alt="network"
                                        />
                                      </div>
                                    )}
                                    <span className="dark:text-white">
                                      {item.label}
                                    </span>
                                  </div>
                                )}
                              />
                              <small className="form-error">
                                {touched.network && formErrors.network}
                              </small>
                            </div>
                          </div>
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNo"
                            >
                              Recipient Phone Number
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                              type="number"
                              name="phoneNo"
                              id="phoneNo"
                              value={phoneNo}
                              onChange={this.onChange}
                              onFocus={this.onFocus}
                              onBlur={this.onBlur}
                            />
                            <small className="form-error">
                              {touched.phoneNo && formErrors.phoneNo}
                            </small>
                          </div>
                        </div>

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="amount"
                            >
                              Amount
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <TbCurrencyNaira className="w-5 h-5 text-greyIcon" />
                              </span>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                                type="number"
                                name="amount"
                                id="amount"
                                value={amount}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                              />
                              <small className="form-error">
                                {touched.amount && formErrors.amount}
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4.5">
                          <button
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            disabled={disabled}
                            className={`${
                              disabled ? "disabled" : ""
                            } flex justify-center rounded bg-primary-600 py-2 px-6 font-medium text-white hover:bg-opacity-95`}
                            type="submit"
                          >
                            Continue
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <RightBar />
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

export default Utilities;
