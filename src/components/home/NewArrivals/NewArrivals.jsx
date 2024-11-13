import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Thay thế bằng API URL của sản phẩm hiện tại
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // API endpoint của sản phẩm
        const data = await response.json();

        // Lọc ra các sản phẩm có type = "6723b355a8cc66e7c07a8307"
        const newArrivals = data.filter(
          (product) => product.type === "6723b355a8cc66e7c07a8307"
        );
        setProducts(newArrivals);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="px-2">
              <Product
                _id={product._id}
                img={product.images?.[0] || product.img}
                productName={product.productName || product.name}
                price={product.price}
              />
            </div>
          ))
        ) : (
          <p>Đang tải sản phẩm mới...</p>
        )}
      </Slider>
    </div>
  );
};

export default NewArrivals;
