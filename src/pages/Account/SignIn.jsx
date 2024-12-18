import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { initUser } from "../../redux/orebiSlice";
import toast from "react-hot-toast";

const SignIn = () => {
  // Initial State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) checkLogin();
  }, []);

  const checkLogin = () => {
    fetch(`${import.meta.env.VITE_HOST}/auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error("Chưa đăng nhập");
      })
      .then((data) => {
        // Check if user is blocked
        if (data.user.status === 2) {
          toast.error("Tài khoản của bạn đã bị khóa");
          localStorage.clear("token");
          localStorage.clear("user");
          return;
        }

        dispatch(initUser(data?.user));
        nav("/");
        toast.success("Đăng nhập thành công");
      })
      .catch((err) => {
        localStorage.clear("token");
        console.error(err);
        toast.error("Lỗi khi kiểm tra đăng nhập");
      });
  };

  const nav = useNavigate();

  // Event Handlers
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username) setErrEmail("Nhập vào tên tài khoản");
    if (!password) setErrPassword("Tạo mật khẩu");

    if (username && password) {
      handleLogin();
      setUsername("");
      setPassword("");
    }
  };

  const handleLogin = () => {
    fetch(`${import.meta.env.VITE_HOST}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error(res.json());
      })
      .then((data) => {
        if (data.user.status === 2) {
          toast.error("Tài khoản của bạn đã bị khóa");
          localStorage.clear("token");
          localStorage.clear("user");
          return;
        }
        localStorage.setItem("token", data?.token);

        dispatch(initUser(data?.user));
        localStorage.setItem("user", JSON.stringify(data?.user));
        nav("/");
        toast.success("Đăng nhập thành công");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Thông tin đăng nhập không chính xác");
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {successMsg ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-green-500 font-medium mb-4">{successMsg}</p>
            <Link to="/signup">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Đăng nhập
              </button>
            </Link>
          </div>
        ) : (
          <form className="flex flex-col">
            <h1 className="text-3xl font-semibold text-center mb-6">
              Đăng nhập
            </h1>
            <div className="flex flex-col gap-3 mb-4">
              <label className="text-base font-semibold text-gray-600">
                Tên tài khoản
              </label>
              <input
                onChange={handleUsername}
                value={username}
                className="w-full px-4 py-2 text-base font-medium border rounded-md border-gray-400 outline-none"
                type="email"
                placeholder="khanghonhi62(@gmail.com)"
              />
              {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <label className="text-base font-semibold text-gray-600">
                Mật khẩu
              </label>
              <input
                onChange={handlePassword}
                value={password}
                className="w-full px-4 py-2 text-base font-medium border rounded-md border-gray-400 outline-none"
                type="password"
                placeholder="xxxxxxxx"
              />
              {errPassword && (
                <p className="text-red-500 text-sm">{errPassword}</p>
              )}
            </div>
            <button
              onClick={handleSignUp}
              className="w-full py-2 bg-primeColor text-gray-200 rounded-md text-base font-medium hover:bg-black hover:text-white duration-300"
            >
              Đăng nhập
            </button>
            <p className="text-center mt-4">
              Bạn chưa có tài khoản?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Đăng ký
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
