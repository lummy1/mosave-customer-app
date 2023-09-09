import React, { ChangeEvent } from "react";

type Props = {
  currentStep: number;
  params: Iparams;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

type Iparams = {};

const Step3 = (props: Props) => {
  return (
    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2"></div>
    </div>
  );
};

export default Step3;
