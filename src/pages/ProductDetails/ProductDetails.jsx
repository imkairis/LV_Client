import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { getProductById } from "../../services";
import Image from "../../components/designLayouts/Image";

const ProductDetails = () => {
    const location = useLocation();
    const { _id } = useParams();
    const [prevLocation, setPrevLocation] = useState("");
    const [productInfo, setProductInfo] = useState([]);

    useEffect(() => {
        if (location.state?.item && location.state?.item?.img) {
            setProductInfo(location.state.item);
        } else {
            getProductById(_id).then(res => setProductInfo(res.data));
        }
        setPrevLocation(location.pathname);
    }, [_id, location.pathname, location.state?.item]);

    return (
        <div className='w-full mx-auto border-b-[1px] border-b-gray-300'>
            <div className='max-w-container mx-auto px-4'>
                <div className='xl:-mt-10 -mt-7'>
                    <Breadcrumbs title='' prevLocation={prevLocation} />
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4'>
                    <div className='h-full'>
                        <ProductsOnSale />
                    </div>
                    <div className='h-full xl:col-span-2'>
                        <Image
                            className='w-full h-full object-cover'
                            imgSrc={
                                productInfo?.img || productInfo?.images?.[0]
                            }
                            isServer={productInfo?.images}
                            alt={productInfo.img}
                        />
                    </div>
                    <div className='h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center'>
                        <ProductInfo productInfo={productInfo} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
