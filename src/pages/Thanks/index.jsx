import { Link } from "react-router-dom";

function ThanksPage() {
    return (
        <div>
            <h1>Cảm ơn bạn đã mua hàng</h1>
            <Link to='/'>Quay lại trang chủ</Link>
        </div>
    );
}

export default ThanksPage;
