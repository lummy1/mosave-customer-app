import * as yup from 'yup'; 
import parsePhoneNumberFromString, { isValidPhoneNumber } from "libphonenumber-js";

export const validationSchema = yup.object({
    phoneNo: yup
      .string()
      .min(10, 'Phone No can not be less than 10 characters')
      .max(16, 'Phone No can not be more than 16 characters')
      .typeError('Phone no must be valid')
      .test((value, { path, createError }) => {
        if (!isValidPhoneNumber(String(value), "NG")) {
          return createError({ path, message: "Invalid phone number" });
        }
        return true;
      })
      .required('Please enter your Phone no.'),
    //   .test({
    //     name: 'is-phone',
    //     skipAbsent: true,
    //     test(value, ctx) {
    //       if (!value.startsWith(0)) {
    //         return ctx.createError({ message: 'Phone Number missing correct prefix' })
    //       }
    //     //   if (!value.endsWith('-42a')) {
    //     //     return ctx.createError({ message: 'Phone Number missing correct suffix' })
    //     //   }
    //       if (value.length < 10 || value.length > 11) {
    //         return ctx.createError({ message: 'Phone Number is not the right length' })
    //       }
    //       return true
    //     }
    //   }),
    network: yup
      .string()
      .trim()
      .required('Please choose your plan'),
    amount: yup
      .number()
      .min(50, 'Amount can not be less than 50')
      .max(500000, 'Amount must be less than 500,000')
      .typeError('Amount must be a number')
      .required('Please enter your amount'),
  });