import Adopt from "../../components/Adopt/Adopt";
import adoptData from "../../components/Adopt/data";

const AdoptPage = () => {
  return (
    <div className="p-6">
      {/* Thêm dòng chữ tiêu đề */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Nhận nuôi thú cưng
      </h1>

      {/* Hiển thị danh sách thú cưng */}
      <div className="grid grid-cols-4 gap-4">
        {adoptData.map((adopt) => (
          <Adopt
            id={adopt.id}
            image={adopt.image}
            age={adopt.age}
            name={adopt.name}
            description={adopt.description}
            status={adopt.status}
          />
        ))}
      </div>
    </div>
  );
};

export default AdoptPage;
