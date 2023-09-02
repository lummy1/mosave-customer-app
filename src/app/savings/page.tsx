"use client";
import React, { ChangeEvent, Component, FormEvent } from "react";
import Private from "../components/Layouts/Private";
import Private2 from "../components/Layouts/Private2";
import Image from "next/image";
import { AiOutlineBank } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaRegMessage } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumbs";
import { IBoolean, IString } from "@/utils/interface";
import { validationSchema } from "@/validations/savingsValidation";
import RightBar from "../components/rightbar";

type Props = {};

type State = {
  mount: boolean;
  params: IParams;
  formErrors: IString;
  disabled: boolean;
  touched: IBoolean;
};

interface IParams {
  accountNo: string;
  plan: string;
  amount: number;
  [key: string]: string | number;
}

class Savings extends Component<Props, State> {
  values = { accountNo: "", plan: "", amount: parseInt("") };
  initialErrors = {
    accountNo: "",
    plan: "",
    amount: "",
  };

  initialTouched = {
    accountNo: false,
    plan: false,
    amount: false,
  };
  subscribedPlans = ["Starter", "Basic", "Premium", "Any Amount"];
  constructor(props: any) {
    super(props);
    this.state = {
      mount: false,
      params: this.values,
      formErrors: this.initialErrors,
      touched: this.initialTouched,
      disabled: true,
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ): void { 
    if (prevState.params !== this.state.params ) {
      this.validate();
    }
  }

  onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, type, value } = e.target;
    this.setState({
      params: {
        ...this.state.params,
        [name]: type === "number" && name === "amount" ? Number(value) : value,
      },
    });
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.params);
  };

  onFocus = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name } = e.target;
    this.setState({touched: {...this.state.touched, [name]: true}});
 }

 onBlur = () => { 
    this.validate();
 }

  validate = () => {
    const initialFormErrors = {
        accountNo: "",
        plan: "",
        amount: "",
      };
    validationSchema
      .validate(this.state.params, { abortEarly: false })
      .then(() => {
        this.setState({formErrors: initialFormErrors });
      })
      .catch((err: any) => {
        const errors: IString = initialFormErrors;
        err.inner.forEach((error: any) => {
          if (this.state.touched[error.path]){
            errors[error.path] = error.message;
          }
        });
        this.setState({formErrors: errors });
      });

    validationSchema
      .isValid(this.state.params)
      .then((valid) => this.setState({ disabled: !valid }));
  };

  render() {
    const { accountNo, plan, amount } = this.state.params;
    const {mount, disabled, formErrors, touched } = this.state;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Savings" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Save
                      </h3>
                    </div>
                    <div className="p-7">
                      <form action="/" onSubmit={this.submit}>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="plan"
                            >
                              Savings Plan
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                <AiOutlineBank className="w-5 h-5 text-greyIcon" />
                              </span>
                              <select
                                id="plan"
                                name="plan"
                                value={plan}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary-600 active:border-primary-600 dark:border-form-strokedark dark:bg-form-input"
                              >
                                <option value="">Select Plan</option>
                                {this.subscribedPlans && this.subscribedPlans.map((p, i)=> (
                                  <option key={i} value={p}>{p}</option>
                                ))}                                
                              </select>
                            </div>
                            <small className="form-error">
                              {touched.plan &&
                                formErrors.plan}
                            </small>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="accountNo"
                            >
                              Recipient Account
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                              type="number"
                              name="accountNo"
                              id="accountNo"
                              value={accountNo}
                              onChange={this.onChange}
                              onFocus={this.onFocus}
                              onBlur={this.onBlur}
                            />
                            <small className="form-error">
                              {touched.accountNo &&
                                formErrors.accountNo}
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
                                className="w-full rounded border border-stroke bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-primary-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                                type="number"
                                name="amount"
                                id="amount"
                                value={amount}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                              />
                              <small className="form-error">
                              {touched.amount &&
                                formErrors.amount}
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
                          <button disabled={disabled}
                            className={`${disabled ? 'disabled' : '' } flex justify-center rounded bg-primary-600 py-2 px-6 font-medium text-white hover:bg-opacity-95`}
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

export default Savings;
