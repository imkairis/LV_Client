import { useState, useEffect } from "react";
import AddressSelection from "../../components/Checkout/AddressSelection";
import DeliveryMethodSelection from "../../components/Checkout/DeliveryMethodSelection";
import PaymentMethodSelection from "../../components/Checkout/PaymentMethodSelection";
import OrderSummary from "../../components/Checkout/OrderSummary";
import { useLocation } from "react-router-dom";
import Image from "../../components/designLayouts/Image";
import { formatPrice } from "../../utils/utils";

function CheckoutPage() {
    const {
        state: { items: products },
    } = useLocation();

    // Biến lưu tổng số tiền và phí vận chuyển
    const [totalAmt, setTotalAmt] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(0);
    const [address, setAddress] = useState([]);
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    useEffect(() => {
        let price = 0;
        products.forEach(item => {
            price += item.price * item.quantity;
        });
        setTotalAmt(price);

        if (price <= 200) {
            setShippingCharge(30);
        } else if (price <= 400) {
            setShippingCharge(25);
        } else {
            setShippingCharge(30000);
        }
    }, [products]);

    return (
        <div className='p-8 bg-gray-50 min-h-screen'>
            <div className='flex max-w-6xl mx-auto gap-8'>
                <div className='space-y-4 flex-1'>
                    <div className='space-y-2 w-full'>
                        {products.map(product => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                    <OrderSummary
                        totalAmt={totalAmt}
                        shippingCharge={shippingCharge}
                    />
                </div>
                <div className='space-y-4 flex-1'>
                    <AddressSelection
                        address={address}
                        setAddress={setAddress}
                    />
                    <DeliveryMethodSelection />
                    <PaymentMethodSelection />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;

const ProductItem = ({ product }) => {
    return (
        <div className='flex gap-4 items-center bg-white shadow rounded-md'>
            <div className='flex-shrink-0'>
                <Image
                    className='max-w-36'
                    imgSrc={product.images?.[0]}
                    isServer={true}
                />
            </div>
            <div className='flex-1 p-2'>
                <h3 className='font-medium text-lg line-clamp-2'>
                    {product.name}
                </h3>
                <div className='flex justify-between items-center'>
                    <div>
                        <p>{formatPrice(product.price)}</p>
                        <p>x{product.quantity}</p>
                    </div>
                    <p>{formatPrice(product.price * product.quantity)}</p>
                </div>
            </div>
        </div>
    );
};
