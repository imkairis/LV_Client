import { useState, useMemo } from "react";
import AddressSelection from "../../components/Checkout/AddressSelection";
import DeliveryMethodSelection from "../../components/Checkout/DeliveryMethodSelection";
import PaymentMethodSelection from "../../components/Checkout/PaymentMethodSelection";
import OrderSummary from "../../components/Checkout/OrderSummary";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../../components/designLayouts/Image";
import { formatPrice } from "../../utils/utils";
import { createOrder } from "../../services/order.service";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../redux/orebiSlice";

function CheckoutPage() {
  const {
    state: { items: products },
  } = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [shippingCharge, setShippingCharge] = useState(0);
  const [address, setAddress] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [products]);

  const handleCreateOrder = () => {
    if (paymentMethod === "vnpay") {
      createOrder({
        productOrder: products.map((item) => item._id),
        address: JSON.stringify(address),
        deliveryStatus: "pending",
        priceShipping: shippingCharge,
        payment: paymentMethod,
      })
        .then((res) => res.data)
        .then((data) => {
          console.log(data._id);

          fetch("http://localhost:5000/v1/vnpay/create-payment_url", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order: data._id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              //   console.log(data?.vnpUrl);
              window.open(data?.vnpUrl, "_self");
              dispatch(deleteItem(products.map((item) => item._id)));
            })
            .catch((error) => {
              console.log(error);
            });
          //   dispatch(deleteItem(products.map((item) => item._id)));
          //   nav("/thanks");
        });

      return;
    }

    createOrder({
      productOrder: products.map((item) => item._id),
      address: JSON.stringify(address),
      deliveryStatus: "pending",
      priceShipping: shippingCharge,
      payment: paymentMethod,
    }).then(() => {
      dispatch(deleteItem(products.map((item) => item._id)));
      nav("/thanks");
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex max-w-6xl mx-auto gap-8">
        <div className="space-y-4 flex-1">
          <div className="space-y-2 w-full">
            {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
          <OrderSummary
            totalAmt={totalPrice}
            shippingCharge={shippingCharge}
            onSubmit={handleCreateOrder}
          />
        </div>
        <div className="space-y-4 flex-1">
          <AddressSelection address={address} setAddress={setAddress} />
          <DeliveryMethodSelection onShippingChange={setShippingCharge} />
          <PaymentMethodSelection onSelect={setPaymentMethod} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

const ProductItem = ({ product }) => {
  return (
    <div className="flex gap-4 items-center bg-white shadow rounded-md">
      <div className="flex-shrink-0">
        <Image
          className="max-w-36"
          imgSrc={product.images?.[0]}
          isServer={true}
        />
      </div>
      <div className="flex-1 p-2">
        <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
        <div className="flex justify-between items-center">
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
