import { instanceAxios } from "../constants/instanceAxios";

// Lấy danh sách donations (có thể lọc theo tham số)
export const fetchAllAdopts = async (params = {}) => {
    try {
        const query = new URLSearchParams(params);
        const url =
            query.size !== 0 ? `/donations?${query.toString()}` : "/donations";

        const response = await instanceAxios.get(url);
        return response.data.data; // Dữ liệu nằm trong `data.data`
    } catch (error) {
        console.error("Error fetching donations:", error);
        throw error;
    }
};
export const getAllMyDonations = async () => {
    try {
        const response = await instanceAxios.get("/donations/me"); // Đường dẫn API lấy donations của người dùng hiện tại
        return response.data.data; // Giả sử dữ liệu nằm trong `data.data`
    } catch (error) {
        console.error("Error fetching my donations:", error);
        throw error;
    }
};
// Tạo object cho donation (dùng FormData để gửi dữ liệu)
export const createObjectDonation = ({
    user,
    name,
    age,
    type, // Loại thú cưng
    historyOfIssue,
    currentIssue,
    status,
    address,
    gender,
    phone,
    images = [],
    description = "",
}) => {
    const formdata = new FormData();
    if (user) {
        formdata.append("user", user);
    }
    formdata.append("name", name);
    formdata.append("age", age);
    formdata.append("type", type);
    formdata.append("historyOfIssue", historyOfIssue);
    formdata.append("currentIssue", currentIssue);
    formdata.append("status", status);
    formdata.append("address", address);
    formdata.append("phone", phone);
    formdata.append("gender", gender);

    if (images.length > 0) {
        Array.from(images).forEach((img) => {
            formdata.append("images", img);
        });
    }

    formdata.append("description", description);
    return formdata;
};

// Tạo một donation mới
export const createDonation = async (donationData) => {    
    const donationObject = createObjectDonation(donationData);
    try {
        const response = await instanceAxios.post(
            "/donations",
            donationObject
        );
        console.log("Server Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error(
            "Error creating donation:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const updateAdopt = async (id, data) => {
    try {
        console.log("Donation Data:", data);
        const formDataAdopt = createObjectDonation(data);
        const response = await instanceAxios.put(`/donations/${id}`, formDataAdopt);
        return response.data.data;
    } catch (error) {
        console.error("Error updating adopt:", error);
        throw error;
    }
};

// Lấy các bình luận cho một donation cụ thể
export const getCommentsDonation = async (donationId, page = 1) => {
    try {
        const response = await instanceAxios.get(`/donations/${donationId}/comments?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

// Tạo bình luận cho donation
export const createComment = async (donationId, content) => {
    try {
        const response = await instanceAxios.post(`/donations/${donationId}/comments`, {
            content,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

// Cập nhật bình luận
export const updateComment = async (commentId, content) => {
    try {
        const response = await instanceAxios.put(`/donations/comments/${commentId}`, {
            content,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

// Xóa bình luận
export const deleteComment = async (commentId) => {
    try {
        const response = await instanceAxios.delete(`/donations/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};
