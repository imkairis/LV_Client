import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { instanceAxios } from "../../constants/instanceAxios";
import Image from "../../components/designLayouts/Image";
import Slider from "react-slick";
import Comments from "../../components/Comments";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import Modal from "../../components/Modal";
import { IoIosMore } from "react-icons/io";
import { deleteAdopt } from "../../services";
import toast from "react-hot-toast";

const AdoptDetailPage = () => {
    const { id } = useParams(); // Lấy `id` từ URL
    const [adoptItem, setAdoptItem] = useState(null); // Dữ liệu chi tiết thú cưng
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userInfo = useSelector(state => state.orebiReducer.userInfo);
    const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
    const nav = useNavigate();

    console.log("AdoptDetailPage -> adoptItem", adoptItem);

    const handleDeleteAdopt = async () => {
        deleteAdopt(id).then(() => {
            toast.success("Xóa thành công");
            nav(-1);
        }).catch(() => {
            toast.error("Xóa thất bại");
        });
    };

    useEffect(() => {
        const fetchAdoptDetail = async () => {
            try {
                setLoading(true);
                const response = await instanceAxios.get(`/donations/${id}`); // API endpoint chi tiết
                setAdoptItem(response.data.data); // Giả sử dữ liệu chi tiết trong `data.data`
            } catch (err) {
                console.error("Error fetching adopt detail:", err);
                setError("Không thể tải thông tin thú cưng.");
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptDetail();
    }, [id]);

    if (loading) return <p>Đang tải thông tin thú cưng...</p>;
    if (error) return <p>{error}</p>;
    if (!adoptItem) return <p>Không tìm thấy thông tin thú cưng.</p>;

    const settings = {
        customPaging: function (i) {
            const img = adoptItem.images[i];
            return (
                <li>
                    <a>
                        <Image
                            imgSrc={img}
                            isServer={true}
                            alt={adoptItem.name}
                            className='w-20 h-20 object-cover rounded-lg'
                        />
                    </a>
                </li>
            );
        },
        dots: true,
        appendDots: dots => (
            <div>
                <ul className='flex justify-center gap-2'> {dots} </ul>
            </div>
        ),
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <>
            <div className='w-full mx-auto border-b-[1px] border-b-gray-300 bg-gray-50'>
                <div className='max-w-container mx-auto px-8 bg-gray-50 py-8 rounded-lg'>
                    <div className='md:grid justify-between md:grid-cols-3 gap-8 mt-5'>
                        {/* Hình ảnh thú cưng */}
                        <div className='col-span-1'>
                            <div className='p-4 bg-white shadow-lg rounded-lg w-full border-gray-300 h-auto'>
                                <Slider {...settings}>
                                    {adoptItem.images?.map((image, index) => (
                                        <div key={index}>
                                            <Image
                                                imgSrc={image}
                                                isServer
                                                alt={adoptItem.name}
                                                className='w-full h-auto object-cover rounded-lg'
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
    
                        {/* Thông tin thú cưng */}
                        <div className='bg-white shadow-lg rounded-lg p-6 border-gray-300 col-span-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-green-500 font-semibold mt-4'>
                                    {adoptItem.type}
                                </span>
                                {adoptItem.user._id === userInfo._id && (
                                    <Popup
                                        content={
                                            <div className="w-20">
                                                <Link
                                                    className="block hover:translate-x-1 duration-200"
                                                    to={`/adopt/update/${adoptItem._id}`}
                                                >
                                                    Cập nhật
                                                </Link>
                                                <button
                                                    className="w-full text-left hover:translate-x-1 duration-200"
                                                    onClick={() => setIsOpenModalConfirmDelete(true)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        }
                                    >
                                        <IoIosMore  className="cursor-pointer" />
                                    </Popup>
                                )}
                            </div>
    
                            <h1 className='text-3xl font-bold leading-relaxed mt-4'>
                                {adoptItem.name}
                            </h1>
                            <p className='font-medium text-lg mt-4'>
                                <strong>Giới tính:</strong> {adoptItem.gender}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Tuổi:</strong> {adoptItem.age}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Tiền sử bệnh:</strong>{" "}
                                {adoptItem.historyOfIssue || "Không có"}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Bệnh hiện tại:</strong>{" "}
                                {adoptItem.currentIssue || "Không có"}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Trạng thái:</strong> {adoptItem.status}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Địa chỉ:</strong> {adoptItem.address}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Số điện thoại:</strong>{" "}
                                {adoptItem.phone || "Không có"}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Mô tả:</strong>{" "}
                                {adoptItem.description || "Không có mô tả"}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Ngày đăng:</strong>{" "}
                                {new Date(
                                    adoptItem.createDate
                                ).toLocaleDateString() || "Không rõ"}
                            </p>
    
                            <p className='font-medium text-lg mt-4'>
                                <strong>Người đăng:</strong>&nbsp;
                                {adoptItem.user?.fullname || "Không rõ"}
                            </p>
    
                            {/* Nút thu gọn */}
                        </div>
                    </div>
    
                    <Comments donationId={id} />
                </div>
            </div>

            <Modal
                title="Bạn có chắc chắn muốn xóa?"
                isOpen={isOpenModalConfirmDelete}
                onClose={() => setIsOpenModalConfirmDelete(false)}
            >
                <p>
                    Hành động này sẽ xóa vĩnh viễn thông tin về thú cưng này.
                </p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => setIsOpenModalConfirmDelete(false)}
                        className="px-3 py-1 bg-gray-500 text-white rounded-lg"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleDeleteAdopt}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                    >
                        Xóa
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default AdoptDetailPage;
