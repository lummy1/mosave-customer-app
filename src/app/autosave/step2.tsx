import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IDateProps } from "./page";
import { BsCheckCircleFill } from "react-icons/bs";
// import "react-datepicker/dist/react-datepicker.css";

type Props = {
  currentStep: number;
  params: Iparams;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDateChange: (value: IDateProps) => void;
};

type Iparams = {
  fundSource: string;
  time: Date | null;
  startDate: Date | null;
  endDate: Date | null;
};

const Step2 = (props: Props) => {
  const { currentStep, params, handleChange, handleDateChange } = props;
  const { fundSource, time, startDate, endDate } = params;
  const sourceOptions = [
    {
      value: "Gt bank",
      label: "Gt bank",
      text: "0125155202",
      color: "primary-700",
      bgColor: "primary-25",
      borderColor: "primary-600",
    },
    {
      value: "wallet",
      label: "wallet",
      text: "₦20,000",
      color: "secondary-500",
      bgColor: "secondary-100",
      borderColor: "secondary-600",
    },
    {
      value: "Bank account",
      label: "Bank account",
      text: "Enter bank details",
      color: "tertiary-500",
      bgColor: "tertiary-50",
      borderColor: "tertiary-600",
    },
  ];

  if (currentStep !== 2) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="startsDate"
          >
            Start Date
          </label>

          {/* <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">How much do you expect to use each month?</h3> */}
          <ul className="grid w-full gap-6 md:grid-cols-3">
            {sourceOptions.map((item: any, i: number) => (
              <li key={i}>
                <input
                  type="radio"
                  id={"fundSource" + i}
                  name={"fundSource"}
                  value={item.value}
                  className="hidden peer"
                  onChange={handleChange}
                />
                <label
                  htmlFor={"fundSource" + i}
                  className={`relative bg-${item.bgColor} text-${item.color} border-${item.bgColor} dark:border-${item.bgColor} dark:peer-checked:text-${item.color} peer-checked:border-${item.borderColor} peer-checked:text-${item.color} inline-flex items-center justify-between w-full p-2 border-2 rounded-lg cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800`}
                >
                  <div
                    className={`-top-3 -right-3 absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full dark:border-gray-900`}
                  >
                    <BsCheckCircleFill
                      className={`text-${item.borderColor} w-3 h-3`}
                    />
                  </div>
                  <div className="mt-10">
                    <div className="text-sm text-black font-semibold uppercase">
                      {item.value}
                    </div>
                    <div className="text-xs font-bold">{item.text}</div>
                  </div>
                </label>
              </li>
            ))}
          </ul>

          {/* <input
            className="inputClass2"
            type="text"
            name="fundSowrce"
            id="fundSource"
            value={fundSource}
            onChange={handleChange}
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
          />
          <small className="form-error">
           {touched.accountNo && formErrors.accountNo}
          </small> */}
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="startDate"
            >
              Start Date
            </label>
            <DatePicker
              className="inputClass2"
              id="startDate"
              selectsStart
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="d MMMM, yyyy"
              nextMonthButtonLabel={
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              }
              previousMonthButtonLabel={
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              }
              popperClassName="react-datepicker-left"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "startDate" })
              }
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="endDate"
            >
              End Date
            </label>
            <DatePicker
              className="inputClass2"
              selectsEnd
              id="endDate"
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate !== null ? startDate : new Date()}
              dateFormat="d MMMM, yyyy"
              nextMonthButtonLabel={
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              }
              previousMonthButtonLabel={
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              }
              popperClassName="react-datepicker-right"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "endDate" })
              }
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="time"
            >
              Preferred Time
            </label>
            <DatePicker
              className="inputClass2"
              selected={time}
              id="time"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "time" })
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
