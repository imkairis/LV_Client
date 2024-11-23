function Popup({ children, content }) {
    return (
        <div>
            <div className='group relative'>
                {children}
                <div className='pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 top-0 group-hover:top-full duration-200 absolute right-1/2 translate-x-1/2 bg-gray-100 p-2 rounded-md shadow-md'>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Popup;
