import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isJSON } from "../../../utils/utils";
import Modal from "../../Modal";
import {
    createAddress,
    createObjectAddress,
} from "../../../services/user.service";
import { updateUser } from "../../../redux/orebiSlice";

function AddressSelection({ address, setAddress }) {
    const userInfo = useSelector(state => state.orebiReducer.userInfo);
    console.log("userInfo", userInfo);
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const handleDeleteAddress = address => {
        console.log("delete address", address);
    };

    const userAddress = useMemo(() => {
        if (userInfo?.address?.length > 0) {
            return userInfo.address.map(ad => {
                if (isJSON(ad)) {
                    return JSON.parse(ad);
                } else {
                    return {
                        _id: "",
                        name: "",
                        phone: "",
                        address: ad,
                    };
                }
            });
        }
        return [];
    }, [userInfo.address]);

    const handleAddAddressSuccess = address => {
        setAddress(address);
        dispatch(
            updateUser({ address: JSON.parse([...userAddress, address]) })
        );
    };

    useEffect(() => {
        if (userInfo?.address?.length > 0) {
            setAddress(userInfo.address[0]);
        }
    }, [setAddress, userInfo.address]);

    return (
        <>
            <div className='space-y-4 p-4 rounded-lg bg-white'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-lg text-left'>
                        <FontAwesomeIcon icon={faLocationDot} /> ĐỊA CHỈ GIAO
                        HÀNG
                    </h2>

                    <button
                        className='hover:scale-110 duration-200'
                        onClick={() => setOpenModal(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className='space-y-2'>
                    {userAddress?.length === 0 && (
                        <p className='text-sm text-gray-500'>
                            Bạn chưa có địa chỉ giao hàng
                        </p>
                    )}
                    {userAddress?.map(ad => (
                        <div
                            key={ad._id}
                            className='flex items-center justify-between gap-3 p-3 border rounded'
                        >
                            <div className='flex items-center flex-1'>
                                <input
                                    type='radio'
                                    name='selectedAddress'
                                    value={ad._id}
                                    checked={address?._id === ad._id}
                                    onChange={() => setAddress(address)}
                                    className='mr-2'
                                />
                                <span>{`${ad.name} | ${ad.address} | ${ad.phone}`}</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <button
                                    className='text-blue-500 font-medium'
                                    onClick={() => setAddress(ad)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className='text-blue-500 font-medium'
                                    onClick={() => handleDeleteAddress(address)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ModalAddress
                isOpen={openModal}
                onSubmit={handleAddAddressSuccess}
                onClose={() => setOpenModal(false)}
                userId={userInfo._id}
            />
        </>
    );
}

export default AddressSelection;

const ModalAddress = ({ isOpen, onSubmit, onClose, userId }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const address = createObjectAddress({
            name: formData.get("name"),
            phone: formData.get("phone"),
            address: formData.get("address"),
        });
        createAddress({
            userId,
            ...address,
        })
            .then(() => {
                onSubmit(address);
                onClose();
            })
            .catch(err => console.log(err));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Add Address'>
            <form onSubmit={handleSubmit}>
                <div className='space-y-4'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                    <input
                        type='text'
                        name='phone'
                        placeholder='Phone'
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                    <input
                        type='text'
                        name='address'
                        placeholder='Address Detail'
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                    <button
                        type='submit'
                        className='w-full p-2 bg-blue-500 text-white rounded'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
};
