import * as yup from "yup";

// interface dateType {
//   date: Date | null;
//   time: Date | null;
// }

// Define a custom validation function for the 'unique' rule
// function uniqueRule<T>(message: string, mapper: (value: T, index?: number, list?: T[]) => T = (val) => val) {
//   return this.test('unique', message, function (list: T[] | undefined) {
//     if (list === undefined) {
//       return true; // If the list is undefined, consider it valid
//     }

//     return list.length === new Set(list.map(mapper)).size;
//   });
// }

// // Add the 'unique' method to Yup's array schema
// yup.addMethod(yup.array, 'unique', uniqueRule);

// interface CustomArraySchema<T> extends yup.ArraySchema<T> {
//   unique(message: string, mapper?: (value: T, index?: number, list?: T[]) => T[]): this;
// }

// function uniqueRule<T>(
//   this: CustomArraySchema<T>,
//   message: string,
//   mapper: (value: T, index?: number, list?: T[]) => T = (val) => val
// ) {
//   return this.test('unique', message, function (list: any) {
//     if (list === undefined) {
//       return true;
//     }
//     return list.length === new Set(list.map(mapper)).size;
//   });
// }

// // Adding the 'unique' method to Yup's array schema
// yup.addMethod<CustomArraySchema<any>>(yup.array, 'unique', uniqueRule);

// interface CustomArraySchema<T> extends yup.ArraySchema<T> {
//   unique(message: string, mapper?: (value: T, index?: number, list?: T[]) => T[]): this;
// }

// function uniqueRule<T>(
//   this: CustomArraySchema<T>,
//   message: string,
//   mapper: (value: T, index?: number, list?: T[]) => T = (val) => val
// ) {
//   return this.test('unique', message, function (list: any) {
//     if (list === undefined) {
//       return true;
//     }
//     return list.length === new Set(list.map(mapper)).size;
//   }) as CustomArraySchema<T>; // Explicitly cast to CustomArraySchema<T>
// }

// interface CustomArraySchema<T> extends yup.ArraySchema<T> {
//   unique(message: string, mapper?: (value: T, index?: number, list?: T[]) => T[]): this;
// }

// // Custom method implementation
// function uniqueRule<T>(this: CustomArraySchema<T>, message: string, mapper: (value: T) => string) {
//   return this.test('unique', message, function (list) {
//     if (list === undefined) {
//       return true;
//     }
//     const mappedValues = list.map(mapper);
//     return mappedValues.length === new Set(mappedValues).size;
//   }) as CustomArraySchema<T>;
// }

// // Adding the 'unique' method to Yup's array schema
// yup.addMethod(yup.array, 'unique', uniqueRule);

// Custom validation function
// function validateUnique<T>(list: T[], mapper: (value: T) => string): boolean {
//   const mappedValues = list.map(mapper);
//   return mappedValues.length === new Set(mappedValues).size;
// }

// TType = any, TContext = any, TDefault = any, TFlags extends Flags = ''
declare module "yup" {
  interface Schema<
    TType = any,
    TContext = any,
    TDefault = any,
    TFlags extends yup.Flags = ""
  > {
    serverError(serverErrors: undefined | string[]): this;
  }
  interface ArraySchema<
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends yup.Flags = ""
  > {
    unique(
      message: string,
      mapper?: (value: TIn, index?: number, list?: TIn[]) => TIn[]
    ): this;
  }
}

yup.addMethod(
  yup.array,
  "unique",
  function (message, mapper = (val: unknown) => val) {
    return this.test(
      "unique",
      message,
      (list = []) => list.length === new Set(list.map(mapper)).size
    );
  }
);

// yup.addMethod(yup.array, 'unique', function (message, mapper = (a: any) => a) {
//   return this.test('unique', message, function (list) {
//     return list.length === new Set(list.map(mapper)).size;
//   });
// });

// export const validationSchema = yup.object().shape({
//   people: yup
//     .array()
//     .of(
//       yup.object().shape({
//         phone: yup.number(),
//         firstName: yup.string().max(10),
//         lastName: yup.string().min(2)
//       })
//     )
//     .uniques('duplicate phone', (a: any) => a.phone)
//     .required("Must have friends")
//     .min(3, 'Minimum of 3 friends'),
//  // these constraints are shown if and only if inner constraints are satisfied
// });

export const step1ValidationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title can not be less than 2 characters")
    .max(50, "Title can not be more than 50 characters")
    .required("Please enter event title"),
  description: yup
    .string()
    .min(2, "Description can not be less than 2 characters")
    .max(50, "Description can not be more than 500 characters")
    .required("Please enter event description"),
  category: yup.string().trim().required("Please choose your event category"),
});

export const step2ValidationSchema = yup.object({
  start: yup.object().shape({
    date: yup.date().required("Please enter the start date"),
    time: yup.date().required("Please enter the start time"),
  }),
  end: yup.object().shape({
    date: yup.date().required("Please enter the end date"),
    time: yup.date().required("Please enter the end time"),
    // date: yup
    //   .date()
    //   .required("Please enter the end date")
    //   .when("start", (start: any) => {
    //     if (start.date) {
    //       return yup
    //         .date()
    //         .min(start, "End date must be after Start date")
    //         .typeError("End date is required");
    //     }
    //     return yup.date();
    //   }),
  }),
});

export const step3ValidationSchema = yup.object().shape({
  ticket: yup
    .array()
    .of(
      yup.object().shape(
        {
          name: yup
            .string()
            .min(2, "Please enter minimum of 2 characters")
            .required("Name is required"),
          price: yup
            .number()
            .min(0, "Please enter minimum of 0")
            .typeError("Please specify price")
            .required("Price is required"),
          quantity: yup
            .number()
            .min(1, "Please enter minimum of 1")
            .typeError("Please specify quantity")
            .required("Quantity is required"),
          currency: yup.string().required("Currency is required"),
          discount: yup
            .mixed()
            .test(
              "validNumber",
              "Discount must be a valid number",
              function (value: any) {
                console.log(value);
                return (
                  value === undefined ||
                  typeof value === "number" ||
                  /^\d+(\.\d+)?$/.test(value)
                );
              }
            )
            .test("maxDiscount", function (value) {
              const price = this.parent.price;
              const discountMode = this.parent.discountMode;
              console.log(price); // number
              console.log(discountMode);
              console.log(value); // string
              console.log(typeof value); // string
              console.log(Number(value) <= Number(price));
              console.log(
                typeof Number(value) === "number" &&
                  Number(value) <= Number(price)
              );

              if (typeof Number(value) === "number") {
                if (discountMode === "percent" && Number(value) >= 100) {
                  return this.createError({
                    path: this.path,
                    message: "Discount should not be more than 100 percent",
                  });
                } else if (
                  discountMode === "price" &&
                  Number(value) >= Number(price)
                ) {
                  return this.createError({
                    path: this.path,
                    message: "Discount should not be higher than the price",
                  });
                }
              }

              return true;
            }),

          discountMode: yup
            .string()
            .optional()
            .when("discount", {
              is: (val: number) => val >= 0,
              then: (schema) => schema.required("discount Mode is required"),
              otherwise: (schema) => schema.notRequired(),
            }),
          // .when("discount", (discount) => {
          //   console.log(discount[0]);
          //   if (Number(discount[0]) > 0) {
          //     return yup
          //       .string()
          //       .typeError("Please select discount mode")
          //       .required("Discount mode is required");
          //   }
          //   return yup.string();
          // }),
        },
        [["discountMode", "discount"]]
      )
    )
    .unique("Name must be unique", (val: any) => val.name)
    .required("Must setup ticket categories")
    .min(1, "Minimum of 1 ticket categories"),
});

export const step4ValidationSchema = yup.object({
  venue: yup.string().trim().required("Please enter your venue"),
  country: yup.string().required("Please select your country"),
  state: yup.string().required("Please choose your state"),
  type: yup.string().required("Please choose event type"),
});
