import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Image from "../designLayouts/Image";
import bannerImgOne from "../../assets/images/bannerImgOne.png";
import bannerImgTwo from "../../assets/images/bannerImgTwo.png";
import bannerImgThree from "../../assets/images/bannerImgThree.png";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true, // Đảm bảo autoplay là true
    autoplaySpeed: 2500, // Chuyển ảnh sau mỗi 3 giây
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const nav = useNavigate();

  const handleClick = (to) => {
    nav(to);
  };

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        <div
          onClick={() => handleClick("shop?targets=6723b996a8cc66e7c07a8363")}
        >
          <div>
            <Image imgSrc={bannerImgOne} />
          </div>
        </div>
        <div
          onClick={() => handleClick("shop?targets=6723b9c2a8cc66e7c07a8371")}
        >
          <div>
            <Image imgSrc={bannerImgTwo} />
          </div>
        </div>
        <div onClick={() => handleClick("adopt")}>
          <div>
            <Image imgSrc={bannerImgThree} />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
