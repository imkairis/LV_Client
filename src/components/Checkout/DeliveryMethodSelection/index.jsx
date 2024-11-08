function DeliveryMethodSelection({ onShippingChange }) {
    const handleDeliveryChange = charge => {
        onShippingChange(charge);
    };

    return (
        <div className='p-4 rounded-lg bg-white'>
            <h2 className='font-semibold text-lg mb-4 text-left'>
                PHƯƠNG THỨC VẬN CHUYỂN
            </h2>
            <div className='space-y-4'>
                <label className='flex items-center gap-3 p-3 border rounded'>
                    <input
                        type='radio'
                        name='delivery'
                        className='form-radio'
                        onChange={() => handleDeliveryChange(35000)}
                    />
                    <span>Nhanh: 35.000 ₫</span>
                </label>
                <label className='flex items-center gap-3 p-3 border rounded'>
                    <input
                        type='radio'
                        name='delivery'
                        className='form-radio'
                        onChange={() => handleDeliveryChange(20000)}
                    />
                    <span>Tiêu chuẩn: 20.000 ₫</span>
                </label>
            </div>
        </div>
    );
}

export default DeliveryMethodSelection;
