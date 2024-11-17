import img1 from "../../../assets/images/Adopt/6.png";

export const AdoptHero = () => {
  return (
    <section>
      <section
        className={`overflow-hidden bg-cover bg-top bg-no-repeat`}
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="bg-black/10 p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Nhận nuôi và quyên tặng thú cưng cùng với Pawsoul
            </h2>

            <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Pawsoul sẽ là nơi để tìm kiếm thú cưng hoặc gửi gắm thú cưng đến
              mái ấm mới. Pawsoul sẽ đồng hành cùng bạn để tìm kiếm thú cưng
              theo đúng giống loài, ngoại hình, độ tuổi theo bạn yêu cầu. Cùng
              với Pawsoul để xây dựng cộng đồng yêu thú cưng lớn mạnh và văn
              minh.
            </p>

            <div className="mt-4 sm:mt-8">
              <a
                href="#"
                className="inline-block rounded-full bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-blackfocus:outline-none focus:ring focus:ring-yellow-400"
              >
                Xem ngay
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
