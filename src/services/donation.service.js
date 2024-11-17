import { instanceAxios } from "../constants/instanceAxios";


export const fetchAllAdopts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params);
    const url =
        query.size !== 0 ? `/donations?${query.toString()}` : "/donations";

    const response = await  instanceAxios.get(url);
    return response.data.data; // Giả sử dữ liệu nằm trong `data.data`
    console.log(data)
  } catch (error) {
    console.error("Error fetching adopts:", error);
    throw error;
  }
};

// Tạo object cho donation
export const createObjectDonation = ({
  user,
  name,
  age,
  type, // Thêm loại thú cưng
  historyOfIssue,
  currentIssue,
  status,
  address,
  gender,
  phone,
  images = [],
  description = "",
}) => {
  // return {
  //   user,
  //   name,
  //   age,
  //   type,
  //   historyOfIssue,
  //   currentIssue,
  //   status,
  //   address,
  //   phone,
  //   images,
  //   description,
  // };
  const formdata = new FormData();
  formdata.append("user", user);
  formdata.append("name", name);
  formdata.append("age", age);
  formdata.append("type", type);
  formdata.append("historyOfIssue", historyOfIssue);
  formdata.append("currentIssue", currentIssue);
  formdata.append("status", status);
  formdata.append("address", address);
  formdata.append("phone", phone);
  formdata.append("gender", gender)
  if (images.length > 0) {
    Array.from(images).forEach((img, index) => {
      formdata.append("images", img);
    });
  }
  
  formdata.append("description", description);
  return formdata;
};

// Hàm gửi yêu cầu tạo donation
export const createDonation = async (donationData) => {
  const donationObject = createObjectDonation(donationData);

  console.log("Donation Object to Send:", donationObject);

  try {
    const response = await instanceAxios.post(
      "/donations",
      donationObject,
     
    );

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating donation:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
