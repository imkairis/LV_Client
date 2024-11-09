import { Link } from "react-router-dom";
import ImgT from "../../assets/images/thankyou.png";
import { useNavigate } from "react-router-dom";
function ThanksPage() {
  const nav = useNavigate();
  const handleClick = (to) => {
    nav(to);
  };
  return (
    <div className="mt-6">
      <div onClick={() => handleClick("/shop")}>
        <img src={ImgT} />
      </div>
    </div>
  );
}

export default ThanksPage;
