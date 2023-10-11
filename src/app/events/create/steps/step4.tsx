import CountryDropdown from "@/app/components/Countries";
import { eventTypes } from "@/constants/constant";
import { IStepFormState, ITouchedBoolean } from "@/utils/interface";
import { IOnlineEvent, IPhysicalEvent } from "@/utils/types";
import React, { ChangeEvent } from "react";

interface Props extends IStepFormState {
  params: IPhysicalEvent | IOnlineEvent;
  touched: ITouchedBoolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

type Iparams = {
  type: string;
  venue: string;
  country: string;
  state: string;
};

const Step4 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    onFocus,
    onBlur,
  } = props;

  //const param:IPhysicalEvent = { type: params.type, venue, country, state };
  const { type } = params;
  const { venue, country, state } = params as IPhysicalEvent;
  const { link } = params as IOnlineEvent;

  if (currentStep !== 4) {
    return null;
  }
  return (
    <div>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Event Type
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        {eventTypes.map((eventType, i) => (
          <li key={i + 1}>
            <input
              type="radio"
              id={eventType.value}
              name={"type"}
              value={type}
              checked={eventType.value === type}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="hidden peer"
            />
            <label
              htmlFor={eventType.value}
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">
                  {eventType.value}
                </div>
                <div className="w-full">{eventType.label}</div>
              </div>
              <svg
                className="w-5 h-5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </label>
          </li>
        ))}
      </ul>

      {type === "physical" && (
        <>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="relative">
                <label className="inputLabelClass" htmlFor="title">
                  Event Venue
                </label>
                <input
                  className="inputClass2"
                  type="text"
                  name="title"
                  id="title"
                  value={venue}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <small className="form-error">
                  {touched.venue && formErrors.venue}
                </small>
              </div>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <CountryDropdown
              country={country}
              state={state}
              handleChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </>
      )}

      {type === "online" && (
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="title">
              Event Link
            </label>
            <input
              className="inputClass2"
              type="text"
              name="title"
              id="title"
              value={link}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.link && formErrors.link}
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
