import React, { ChangeEvent } from "react";
import {
  IBoolean,
  IStepFormState,
  IString,
  ITouchedBoolean,
} from "@/utils/interface";
import { BiCalendar } from "react-icons/bi";
import { eventCategories } from "@/constants/constant";

interface Props extends IStepFormState {
  params: Iparams;
  touched: ITouchedBoolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onFocus: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

type Iparams = {
  title: string;
  description: string;
  category: string;
  type: string;
};

const Step1 = (props: Props) => {
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
  const { title, type, description, category } = params;
  if (currentStep !== 1) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="title">
              Event Title
            </label>
            <input
              className="inputClass2"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.title && formErrors.title}
            </small>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="category">
            Event Category
          </label>
          <div className="relative z-20">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <BiCalendar className="w-5 h-5 text-greyIcon" />
            </span>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="selectClass"
            >
              <option value="">Select Category</option>
              {eventCategories &&
                eventCategories
                  .sort((a, b) => a.localeCompare(b))
                  .map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
            </select>
          </div>
          <small className="form-error">
            {touched.category && formErrors.category}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2"></div>
        <div className="w-full sm:w-1/2"></div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label className="inputLabelClass" htmlFor="description">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              rows={6}
              name="description"
              placeholder="Type event description here..."
              className="inputClass2"
              value={description}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.description && formErrors.description}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
