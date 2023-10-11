import { ChangeEvent } from "react";

export type ILogin = {
  email: string;
  password: string;
  [key: string]: string;
};

export type IRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneno: string;
  terms: boolean;
  [key: string]: string | boolean;
};

export type IUser = {
  firstName: string;
  lastName: String;
  email: string;
  image?: {
    url: string | any;
    publicId: string;
  };
};

export type IForgotPassword = {
  email: string;
  [key: string]: string;
};

export type IResetPassword = {
  password: string;
  confirmPassword: string;
  [key: string]: string;
};

export type IVerifyOTP = {
  otp: string;
};

export type IPasswordValidation = {
  label: string;
  color: string;
  bgColor: string;
  percent: number;
};

export type IBoolean = {
  [key: string]: boolean;
};

export type IString = {
  [key: string]: string;
};

export type IStepFormState = {
  mount?: boolean;
  currentStep: number;
  formErrors: IString | any;
  disabled: IBoolean;
};

export interface IDateProps {
  value: Date;
  name: string;
  type?: string;
}

export interface IDateFocus {
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  name: string;
  type?: string;
}

export type IBooleanDate = {
  date: boolean;
  time: boolean;
};

export type ITouchedBoolean = {
  title: boolean;
  description: boolean;
  category: boolean;
  type: boolean;
  tags: boolean;
  start: IBooleanDate;
  end: IBooleanDate;
  ticket: ITicketBoolean[];
  [key: string]: boolean | IBooleanDate | ITicketBoolean[] | any;
  //ticket: IBoolean[];
  //ticket: { [key: string]: boolean }[];
  //[key: string]: boolean | IBooleanDate;
};

export interface ITicketBoolean {
  name: boolean;
  price: boolean;
  quantity: boolean;
  discount: boolean;
  discountMode: boolean;
  currency: boolean;
}

export interface ISocials {
  website?: string;
  facebook?: string;
  twitter?: string;
}

export interface IEventDate {
  date: Date | null;
  time: Date | null;
}

export interface ITicket {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
  discountMode?: string;
  currency: string;
}
// export interface ITicketBoolean {
//   name: boolean;
//   price: boolean;
//   quantity: boolean;
//   discount?: boolean;
//   discountMode?: boolean;
//   currency: boolean;
// }

export interface IValidationResult {
  isValid: boolean;
  errors: Record<string, string>[];
}
