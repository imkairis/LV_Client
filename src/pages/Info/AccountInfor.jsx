import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { initUser } from '../../redux/orebiSlice';

function AccountInfor() {
  const { userInfo } = useSelector((state) => state.orebiReducer);
  
  // If userInfo is not ready, provide default empty values to prevent errors
  const initialValues = {
    username: userInfo?.username || '',
    fullname: userInfo?.fullname || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.phone || '',
    dateOfBirth: userInfo?.date ? new Date(userInfo.date).toISOString().slice(0, 10) : '',
    address: userInfo?.address?.[0] || '', // Get the first address from the array or provide an empty string
  };

  const dispatch = useDispatch();

  const updateAccount = (values) => {
    fetch(`${import.meta.env.VITE_HOST}/auth`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values), // Send form data in the request body
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error("Chưa đăng nhập");
      })
      .then((data) => {
        dispatch(initUser(data?.data));
      })
      .catch((err) => {
        localStorage.clear("token");
        console.error(err);
      });
  };

  return (
    <>
      <div className="text-lg font-bold text-center mb-8">
        THÔNG TIN TÀI KHOẢN
      </div>
      <div className="max-w-3xl mx-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // Call updateAccount on form submission
            updateAccount(values);
          }}
        >
          <Form>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="fullname" className="block text-sm font-semibold mb-2">
                Fullname:
              </label>
              <Field
                type="text"
                id="fullname"
                name="fullname"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-2">
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
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold mb-2">
                Date of Birth:
              </label>
              <Field
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-full p-3 border border-gray-300 rounded-md text-base"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-semibold mb-2">
                Address:
              </label>
              <Field
                type="text"
                id="address"
                name="address"
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
