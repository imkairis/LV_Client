import img1 from "../../assets/images/Adopt/1.jpg";
import img2 from "../../assets/images/Adopt/2.jpg";
import img3 from "../../assets/images/Adopt/3.jpg";
import img4 from "../../assets/images/Adopt/4.jpg";
import img5 from "../../assets/images/Adopt/5.jpg";
import img6 from "../../assets/images/Adopt/6.jpg";
const adoptData = [
  {
    id: 1,
    image: img1,
    age: 2,
    name: "Tommy",
    description: "Chú mèo dễ thương, thích chơi đùa.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "123 Đường ABC, Quận 1, TP.HCM",
    status: "Đang chờ",
    species: "Anh lông ngắn"
  },
  {
    id: 2,
    image: img2,
    age: 3,
    name: "Bella",
    description: "Chó cái thân thiện và năng động.",
    medicalHistory: "Đã tiêm ngừa đầy đủ.",
    currentCondition: "Bệnh nhẹ: Viêm da.",
    giftAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    status: "Thành công",
    species: "Phốc Sốc"
  },
  {
    id: 3,
    image: img3,
    age: 1,
    name: "Max",
    description: "Chó con vui vẻ và trung thành.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "789 Đường DEF, Quận 4, TP.HCM",
    status: "Đang chờ",
    species: "Golden Retriever"
  },
  {
    id: 4,
    image: img4,
    age: 4,
    name: "Milo",
    description: "Mèo rất thân thiện và hiền lành.",
    medicalHistory: "Tiền sử bệnh tiêu chảy nhẹ.",
    currentCondition: "Ổn định.",
    giftAddress: "101 Đường GHI, Quận 5, TP.HCM",
    status: "Thành công",
    species: "Mèo Ba Tư"
  },
  {
    id: 5,
    image: img5,
    age: 2,
    name: "Oscar",
    description: "Chó con năng động, thích chạy nhảy.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "202 Đường JKL, Quận 6, TP.HCM",
    status: "Đang chờ",
    species: "Pug"
  },
  {
    id: 6,
    image: img6,
    age: 3,
    name: "Lucy",
    description: "Mèo thích yên tĩnh và thích ngủ.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "303 Đường MNO, Quận 7, TP.HCM",
    status: "Thành công",
    species: "Mèo Nga"
  },
  {
    id: 7,
    image: img1,
    age: 5,
    name: "Buddy",
    description: "Chó trưởng thành, thông minh và trung thành.",
    medicalHistory: "Đã từng mổ sỏi thận.",
    currentCondition: "Khỏe mạnh sau phẫu thuật.",
    giftAddress: "404 Đường PQR, Quận 8, TP.HCM",
    status: "Đang chờ",
    species: "Labrador Retriever"
  },
  {
    id: 8,
    image: img2,
    age: 2,
    name: "Mimi",
    description: "Mèo con nghịch ngợm và đáng yêu.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "505 Đường STU, Quận 9, TP.HCM",
    status: "Thành công",
    species: "Mèo Munchkin"
  },
  {
    id: 9,
    image: img3,
    age: 4,
    name: "Rocky",
    description: "Chó thông minh và khỏe mạnh.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "606 Đường VWX, Quận 10, TP.HCM",
    status: "Đang chờ",
    species: "Beagle"
  },
  {
    id: 10,
    image:img4,
    age: 6,
    name: "Chloe",
    description: "Mèo thích chơi đồ chơi và lười biếng.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "707 Đường YZA, Quận 11, TP.HCM",
    status: "Thành công",
    species: "Mèo Xiêm"
  },
  {
    id: 11,
    image: img5,
    age: 1,
    name: "Luna",
    description: "Mèo nhỏ thích chạy nhảy và khám phá.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "808 Đường BCD, Quận 12, TP.HCM",
    status: "Đang chờ",
    species: "Scottish Fold"
  },
  {
    id: 12,
    image: img6,
    age: 5,
    name: "Toby",
    description: "Chó trung thành và thân thiện.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "909 Đường EFG, Quận Bình Thạnh, TP.HCM",
    status: "Thành công",
    species: "Bulldog"
  },
  {
    id: 13,
    image: img3,
    age: 3,
    name: "Daisy",
    description: "Mèo thích yên tĩnh và hiền lành.",
    medicalHistory: "Đã từng bị viêm da.",
    currentCondition: "Khỏe mạnh.",
    giftAddress: "1010 Đường HIJ, Quận Gò Vấp, TP.HCM",
    status: "Đang chờ",
    species: "Mèo Anh Lông Dài"
  },
  {
    id: 14,
    image: img1,
    age: 4,
    name: "Jack",
    description: "Chó năng động và thông minh.",
    medicalHistory: "Không có tiền sử bệnh.",
    currentCondition: "Sức khỏe tốt.",
    giftAddress: "1111 Đường KLM, Quận Tân Bình, TP.HCM",
    status: "Thành công",
    species: "Shiba Inu"
  },
  {
    id: 15,
    image: img2,
    age: 7,
    name: "Charlie",
    description: "Chó lớn tuổi, hiền lành và ngoan ngoãn.",
    medicalHistory: "Bệnh nhẹ: Xương khớp.",
    currentCondition: "Đã điều trị.",
    giftAddress: "1212 Đường NOP, Quận Tân Phú, TP.HCM",
    status: "Đang chờ",
    species: "Corgi"
  }
];

export default adoptData;
