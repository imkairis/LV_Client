import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [errUserName, setErrUserName] = useState("");
  const [errFullName, setErrFullName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errBirthday, setErrBirthday] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const nav = useNavigate();

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setErrFullName("");
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setErrUserName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleBirthday = (e) => {
    setBirthday(e.target.value);
    setErrBirthday("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!fullName) setErrFullName("Enter your full name");
      if (!email) {
        setErrEmail("Enter your email");
      } else if (!EmailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
      if (!birthday) setErrBirthday("Enter your birthday");
      if (!password) {
        setErrPassword("Create a password");
      } else if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
      if (fullName && email && birthday && password.length >= 6) {
        setSuccessMsg(`Hello ${fullName}, your Sign up request is processed.`);
        setFullName("");
        setUserName("");
        setEmail("");
        setBirthday("");
        setPassword("");
      }
    }
    registerRequest();
  };

  const registerRequest = () => {
    fetch(`${import.meta.env.VITE_HOST}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        fullname: fullName,
        birthday,
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
      <div className="w-full max-w-md h-auto p-6 flex flex-col justify-center bg-white shadow-lg rounded-lg">
        {successMsg ? (
          <div>
            <p className="text-green-500 font-medium">{successMsg}</p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-white font-semibold hover:bg-black duration-300 mt-4">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full">
            <h1 className="font-semibold text-2xl mb-4 text-center">
              Đăng ký tài khoản
            </h1>
            <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Full Name</label>
                <input
                  onChange={handleFullName}
                  value={fullName}
                  className="border rounded-md p-2"
                  type="text"
                  placeholder="Hồ Nhỉ Khang"
                />
                {errFullName && (
                  <p className="text-red-500 text-sm">{errFullName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Email</label>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="border rounded-md p-2"
                  type="email"
                  placeholder="khanghonhi62@gmail.com"
                />
                {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Birthday</label>
                <input
                  onChange={handleBirthday}
                  value={birthday}
                  className="border rounded-md p-2"
                  type="date"
                />
                {errBirthday && (
                  <p className="text-red-500 text-sm">{errBirthday}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Username</label>
                <input
                  onChange={handleUserName}
                  value={userName}
                  className="border rounded-md p-2"
                  type="text"
                  placeholder="hnk"
                />
                {errFullName && (
                  <p className="text-red-500 text-sm">{errFullName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Password</label>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="border rounded-md p-2"
                  type="password"
                  placeholder="********"
                />
                {errPassword && (
                  <p className="text-red-500 text-sm">{errPassword}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-4 h-4"
                  type="checkbox"
                />
                <p className="text-gray-600 text-sm">
                  Đăng ký tài khoản đồng nghĩa bạn sẽ chấp nhận các chính sách
                  của chúng tôi
                </p>
              </div>
              <button
                onClick={handleSignUp}
                className="w-full h-10 bg-primeColor rounded-md text-white font-semibold hover:bg-black duration-300 mt-4"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
