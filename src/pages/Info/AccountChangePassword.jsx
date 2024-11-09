import React from "react";
import { Field, Form, Formik } from "formik";

function AccountChangePassword() {
  return (
    <>
      <div className="text-lg font-bold text-center mb-8">
        THÔNG TIN TÀI KHOẢN
      </div>
      <div className="max-w-3xl mx-auto">
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            repeatNewPassword: "",
          }}
          onSubmit={(values) => {
            // Submit logic here
            console.log(values);
          }}
        >
          <Form>
            <div className="mb-6">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-semibold mb-2"
              >
                MẬT KHẨU HIỆN TẠI:
              </label>
              <Field
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold mb-2"
              >
                MẬT KHẨU MỚI:
              </label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="repeatNewPassword"
                className="block text-sm font-semibold mb-2"
              >
                NHẬP LẠI MẬT KHẨU MỚI:
              </label>
              <Field
                type="password"
                id="repeatNewPassword"
                name="repeatNewPassword"
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

export default AccountChangePassword;
