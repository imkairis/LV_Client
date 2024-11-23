import { useEffect, useState } from "react";
import {
    getCommentsDonation,
    createComment,
    updateComment,
    deleteComment,
} from "../../services";
import { formatDate } from "../../utils/utils";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";

function Comments({ donationId }) {
    const [comments, setComments] = useState([]);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPageItems: 0,
        totalPage: 0,
        page: 1,
        limit: 5,
    });
    const userInfo = useSelector(state => state.orebiReducer.userInfo);

    useEffect(() => {
        getCommentsDonation(donationId).then(data => {
            setComments(data?.data);
            setPagination({
                totalItems: data?.pagination?.totalItems,
                totalPageItems: data?.pagination?.totalPageItems,
                totalPage: data?.pagination?.totalPage,
                page: data?.pagination?.page,
            });
        });
    }, [donationId]);

    const handleCreateComment = e => {
        e.preventDefault();
        const content = e.target["content"].value;
        createComment(donationId, content).then(data => {
            e.target?.reset();
            setComments([{ ...data?.data, user: userInfo }, ...comments]);
        });
    };

    const handleShowMore = () => {
        getCommentsDonation(donationId, pagination.page + 1).then(data => {
            if (!data?.data) return;
            setComments([...comments, ...data.data]);
            setPagination({
                totalItems: data?.pagination?.totalItems,
                totalPageItems: data?.pagination?.totalPageItems,
                totalPage: data?.pagination?.totalPage,
                page: data?.pagination?.page,
            });
        });
    };

    return (
        <div className='w-full bg-white rounded-lg border p-1 md:p-3 m-10'>
            <h3 className='font-semibold p-1'>Discussion</h3>
            <div className='flex flex-col gap-5 m-3'>
                {comments?.map((comment, index) => (
                    <CommentItem
                        key={index}
                        {...comment}
                        setComments={setComments}
                    />
                ))}
                {pagination.totalPage > pagination.page && (
                    <div className='flex justify-center'>
                        <button
                            onClick={handleShowMore}
                            className='px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg'
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>

            <form onSubmit={handleCreateComment}>
                <div className='w-full px-3 mb-2 mt-6'>
                    <textarea
                        className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white'
                        name='content'
                        placeholder='Comment'
                        required
                    />
                </div>

                <div className='w-full flex justify-end px-3 my-3'>
                    <button
                        type='submit'
                        className='px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg'
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Comments;

const CommentItem = ({ _id, user, content, createdAt, setComments }) => {
    const userInfo = useSelector(state => state.orebiReducer.userInfo);
    const [isEditing, setIsEditing] = useState(false);

    const isMyComment = userInfo?._id === user?._id;

    const handleRemoveComment = () => {
        deleteComment(_id).then(() => {
            setComments(comments =>
                comments.filter(comment => comment._id !== _id)
            );
        });
    };

    const handleEditComment = () => {
        setIsEditing(true);
    };

    const handleSubmitEditComment = e => {
        e.preventDefault();
        const content = e.target["content"].value;
        updateComment(_id, content).then(() => {
            setComments(comments =>
                comments.map(comment =>
                    comment._id === _id ? { ...comment, content } : comment
                )
            );
            setIsEditing(false);
        });
    };

    return (
        <div className='p-3'>
            <div className='flex'>
                <div className='flex-1'>
                    <h3 className='font-bold'>{user?.fullname}</h3>
                    <span>{formatDate(createdAt)}</span>
                </div>
                <div>
                    {isMyComment && (
                        <Popup
                            content={
                                <ul>
                                    <li
                                        className='cursor-pointer'
                                        onClick={handleEditComment}
                                    >
                                        Edit
                                    </li>
                                    <li
                                        className='cursor-pointer'
                                        onClick={handleRemoveComment}
                                    >
                                        Delete
                                    </li>
                                </ul>
                            }
                        >
                            <button>opts</button>
                        </Popup>
                    )}
                </div>
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmitEditComment}>
                    <textarea
                        className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white'
                        name='content'
                        defaultValue={content}
                        required
                    />
                    <div className='flex justify-end gap-2'>
                        <button
                            onClick={() => setIsEditing(false)}
                            className='px-2.5 py-1.5 rounded-md text-white text-sm bg-gray-400 text-lg'
                        >
                            Cancel
                        </button>
                        <button className='px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg'>
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <p className='text-gray-600 mt-2'>{content}</p>
            )}
        </div>
    );
};
