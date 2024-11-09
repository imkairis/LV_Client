import { Field, Form, Formik } from "formik";
import React from "react";

function AccountInfor() {
  const fakeinfor = {
    id: 1,
    username: "hhd",
    email: "hhd111@gmail.com",
    phoneNumber: "0707278154",
    gender: "Male",
    dateOfBirth: "2024-03-21",
  };
  const optionGender = ["Male", "Female", "Other"];

  return (
    <>
      <div className="text-lg font-bold text-center mb-8">
        THÔNG TIN TÀI KHOẢN
      </div>
      <div className="max-w-3xl mx-auto">
        <Formik
          initialValues={{
            username: fakeinfor?.username ?? "",
            email: fakeinfor?.email ?? "",
            phoneNumber: fakeinfor?.phoneNumber ?? "",
            gender: fakeinfor?.gender ?? "",
            dateOfBirth: fakeinfor?.dateOfBirth ?? "",
          }}
          onSubmit={(values) => {
            // Submit logic here
            console.log(values);
          }}
        >
          <Form>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2"
              >
                Username:
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold mb-2"
              >
                Phone Number:
              </label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block text-sm font-semibold mb-2"
              >
                Gender:
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              >
                <option value="">Select Gender</option>
                {optionGender.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-6">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-semibold mb-2"
              >
                Date of Birth:
              </label>
              <Field
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-semibold text-base rounded-md hover:opacity-80"
            >
              LƯU THAY ĐỔI
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default AccountInfor;
