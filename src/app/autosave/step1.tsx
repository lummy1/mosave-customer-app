import React, { ChangeEvent } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";

type Props = {
  currentStep: number;
  params: Iparams;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

type Iparams = {
  frequency: string;
  amount: number;
};

const Step1 = (props: Props) => {
  const { currentStep, params, handleChange } = props;
  const { frequency, amount } = params;
  const frequencyOptions = ["Daily", "weekly", "Monthly"];
  if (currentStep !== 1) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="frequency"
          >
            Payment Frequency
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <BsCalendarEvent className="w-5 h-5 text-greyIcon" />
            </span>
            <select
              id="frequency"
              name="frequency"
              value={frequency}
              onChange={handleChange}
              //   onFocus={this.onFocus}
              //   onBlur={this.onBlur}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary-600 active:border-primary-600 dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="">Select Frequency</option>
              {frequencyOptions &&
                frequencyOptions.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
            </select>
          </div>
          <small className="form-error">
            {/* {touched.plan && formErrors.plan} */}
          </small>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="accountNo"
          >
            Recipient Account
          </label>
          {/* <input
            className="inputClass2"
            type="number"
            name="accountNo"
            id="accountNo"
            value={accountNo}
            onChange={handleChange}
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
          /> */}
          <small className="form-error">
            {/* {touched.accountNo && formErrors.accountNo} */}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="amount"
          >
            Preferred Amount you want to save
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
              onChange={handleChange}
              //   onFocus={onFocus}
              //   onBlur={onBlur}
            />
            <small className="form-error">
              {/* {touched.amount && formErrors.amount} */}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
