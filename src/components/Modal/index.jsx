import { AnimatePresence, motion } from "framer-motion";
import { ImCross } from "react-icons/im";

function Modal({ isOpen, onClose, children, title = "Title" }) {
    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            className='bg-white p-8 rounded-lg'
                        >
                            <div className='flex justify-center mb-4 relative'>
                                <h4 className='font-medium text-lg'>{title}</h4>
                                <ImCross
                                    onClick={onClose}
                                    className='text-primeColor hover:text-red-500 duration-300 cursor-pointer absolute right-0 top-0'
                                />
                            </div>

                            {children}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Modal;
