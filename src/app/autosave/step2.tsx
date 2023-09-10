import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IDateProps } from "./page";
import { BsCalendarEvent, BsCheckCircleFill } from "react-icons/bs";
import RadioInputCard from "../components/Cards/RadioInputCard";
import { sourceOptions } from "./constants";
import moment from "moment";
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
  timeline: string;
  frequency: string;
};

const Step2 = (props: Props) => {
  const { currentStep, params, handleChange, handleDateChange } = props;
  const { fundSource, time, startDate, endDate, timeline, frequency } = params;
  const weekdays = moment.weekdays();
  const monthdays = Array.apply(null, Array(28)).map((x, i) => i + 1);

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
            Set Primary Source of Funds
          </label>

          <ul className="grid w-full gap-6 md:grid-cols-3">
            {sourceOptions.map((item: any, i: number) => (
              <li key={i}>
                <RadioInputCard
                  key={i}
                  item={item}
                  id={"fundSource" + i}
                  name={"fundSource"}
                  value={fundSource}
                  handleChange={handleChange}
                />
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
        {(frequency === "Weekly" || frequency === "Monthly") && (
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="timeline"
            >
              Day of the {frequency.replaceAll("ly", "")}
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                <BsCalendarEvent className="w-5 h-5 text-greyIcon" />
              </span>
              <select
                id="timeline"
                name="timeline"
                value={timeline}
                onChange={handleChange}
                //   onFocus={this.onFocus}
                //   onBlur={this.onBlur}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary-600 active:border-primary-600 dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">
                  Day of the {frequency.replaceAll("ly", "")}
                </option>
                {frequency === "Weekly" && weekdays
                  ? weekdays.map((t, i) => (
                      <option key={i} value={t}>
                        {`Every ${t}s `}
                      </option>
                    ))
                  : monthdays &&
                    monthdays.map((t, i) => (
                      <option key={i} value={t}>
                        {`Every ${
                          t == 1
                            ? t + "st"
                            : t == 2
                            ? t + "nd"
                            : t == 3
                            ? t + "rd"
                            : t + "th"
                        } `}
                      </option>
                    ))}
              </select>
            </div>
            <small className="form-error">
              {/* {touched.plan && formErrors.plan} */}
            </small>
          </div>
        )}
      </div>
    </>
  );
};

export default Step2;
