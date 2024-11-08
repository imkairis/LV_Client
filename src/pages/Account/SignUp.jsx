import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  // ============= Initial State Start here =============
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errFullName, setErrFullName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errBirthday, setErrBirthday] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");

  const nav = useNavigate();

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setErrFullName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
    setErrBirthday("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!fullName) {
        setErrFullName("Enter your full name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a valid email");
        }
      }
      if (!birthday) {
        setErrBirthday("Enter your birthday");
      }
      if (!phone) {
        setErrPhone("Enter your phone number");
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }
      if (!address) {
        setErrAddress("Enter your address");
      }
      // ============== Getting the value ==============
      if (
        fullName &&
        email &&
        EmailValidation(email) &&
        birthday &&
        phone &&
        password &&
        password.length >= 6 &&
        address
      ) {
        setSuccessMsg(
          `Hello dear ${fullName}, your Sign up request is being processed. Stay connected, additional assistance will be sent to your mail at ${email}`
        );
        setFullName("");
        setEmail("");
        setBirthday("");
        setPhone("");
        setPassword("");
        setAddress("");
      }
    }
    registerRequest();
  };

  const registerRequest = () => {
    fetch(`${import.meta.env.VITE_HOST}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // nếu gói tin không có chưa file thì thêm dòng này, và body là json
      },
      body: JSON.stringify({
        username: email.split("@")[0],
        fullname: fullName,
        birthday,
        phone,
        address,
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error(res.json());
      })
      .then((data) => {
        localStorage.setItem("token", data?.token);
        nav("/signin");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full lgl:w-[500px] h-auto flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
                tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[85%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor border border-gray-300 shadow-md rounded-md">
              <h1 className="font-titleFont decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Đăng ký tài khoản
              </h1>
              <div className="flex flex-col gap-3">
                {/* Full Name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleFullName}
                    value={fullName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Hồ Nhỉ Khang"
                  />
                  {errFullName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errFullName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Work Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="khanghonhi62@gmail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Birthday */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Birthday
                  </p>
                  <input
                    onChange={handleBirthday}
                    value={birthday}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="date"
                  />
                  {errBirthday && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errBirthday}
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="tel"
                    placeholder="0965370763"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Xuân Khánh, Ninh Kiều, Cần Thơ"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Create a password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="xxxxxxxx"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSignUp}
                  className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
                tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  Sign Up
                </button>
                <div className="flex items-center gap-2">
                  <input
                    onChange={(e) => setChecked(e.target.checked)}
                    className="w-4 h-4"
                    type="checkbox"
                  />
                  <p className="text-base text-gray-600">
                    Đăng ký tài khoản đồng nghĩa bạn sẽ chấp nhận các chính sách
                    của chúng tôi
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
