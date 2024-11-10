import { Field, Form, Formik } from "formik";
import { useState } from "react";

function AccountChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async (values) => {
    const { currentPassword, newPassword, repeatNewPassword } = values;

    // Validate that newPassword and repeatNewPassword match
    if (newPassword !== repeatNewPassword) {
      setErrorMessage("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword: repeatNewPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccessMessage("Mật khẩu đã được thay đổi thành công!");
        setErrorMessage("");
      } else {
        setErrorMessage(data.msg || "Đã có lỗi xảy ra. Vui lòng thử lại.");
        setSuccessMessage("");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="text-lg font-bold text-center mb-8">THÔNG TIN TÀI KHOẢN</div>
      <div className="max-w-3xl mx-auto">
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            repeatNewPassword: "",
          }}
          onSubmit={handlePasswordChange}
        >
          <Form>
            <div className="mb-6">
              <label htmlFor="currentPassword" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="repeatNewPassword" className="block text-sm font-semibold mb-2">
                NHẬP LẠI MẬT KHẨU MỚI:
              </label>
              <Field
                type="password"
                id="repeatNewPassword"
                name="repeatNewPassword"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            {errorMessage && (
              <div className="text-red-600 text-sm mb-4">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="text-green-600 text-sm mb-4">
                {successMessage}
              </div>
            )}

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
