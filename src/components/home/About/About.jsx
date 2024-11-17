import aboutimg from "../../../assets/images/About.png";

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Về Pawsoul
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            PawSoul là website chuyên cung cấp các sản phẩm chăm sóc chó mèo và
            dịch vụ nhận nuôi thú cưng, giúp kết nối những người yêu thương động
            vật. Với danh mục sản phẩm đa dạng như thức ăn, phụ kiện, và đồ dùng
            hỗ trợ chăm sóc thú cưng, PawSoul mang đến giải pháp tiện lợi và
            chất lượng cho người nuôi thú. Ngoài ra, trang web còn là cầu nối
            cho các hoạt động nhận nuôi chó mèo, giúp những người bạn bốn chân
            tìm được mái ấm mới đầy yêu thương. PawSoul cam kết xây dựng một
            cộng đồng đồng hành vì sức khỏe và hạnh phúc của thú cưng.
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="#"
              className="inline-block rounded bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Tìm hiểu về chúng tôi
            </a>
          </div>
        </div>
      </div>

      <img
        alt=""
        src={aboutimg}
        className="h-56 w-full object-cover sm:h-full"
      />
    </section>
  );
}
