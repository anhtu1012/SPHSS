export const programList = [
  {
    id: "1",
    title: "Tư vấn tâm lý cá nhân",
    description:
      "Chương trình tư vấn 1-1 với chuyên gia tâm lý, giúp bạn giải quyết các vấn đề cá nhân và phát triển bản thân",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pet-management-94cf6.appspot.com/o/program-1.jpg?alt=media&token=4afd4cb5-fa0c-4fdb-931e-85d5d7c50e0f",
    rating: 4.8,
    reviews: 128,
    price: 500000,
    meetLink: "https://meet.google.com/abc-defg-hij",
    schedule: {
      startDate: "01/03/2024",
      endDate: "30/03/2024",
      time: "19:00 - 21:00",
      frequency: "Thứ 3 và Thứ 5 hàng tuần",
    },
    instructor: {
      name: "TS. Nguyễn Văn A",
      avatar: "https://example.com/avatar1.jpg",
      title: "Tiến sĩ Tâm lý học",
      experience: "15 năm kinh nghiệm tư vấn tâm lý",
      description:
        "Chuyên gia tâm lý với nhiều năm kinh nghiệm trong lĩnh vực tư vấn học đường và phát triển cá nhân",
    },
    guests: [
      {
        name: "ThS. Trần Thị B",
        title: "Thạc sĩ Tâm lý học Lâm sàng",
        topic: "Kỹ năng quản lý cảm xúc",
      },
      {
        name: "TS. Lê Văn C",
        title: "Tiến sĩ Tâm lý học Giáo dục",
        topic: "Phương pháp học tập hiệu quả",
      },
    ],
    features: [
      {
        title: "Tư vấn trực tiếp",
        description:
          "Gặp gỡ trực tiếp với chuyên gia tâm lý trong không gian riêng tư",
      },
      {
        title: "Theo dõi tiến triển",
        description: "Nhận báo cáo đánh giá và kế hoạch phát triển cá nhân",
      },
      {
        title: "Linh hoạt thời gian",
        description: "Lịch hẹn linh hoạt theo thời gian của bạn",
      },
    ],
    benefits: [
      "Hiểu rõ hơn về bản thân và các vấn đề đang gặp phải",
      "Học được các kỹ năng quản lý cảm xúc hiệu quả",
      "Phát triển các chiến lược ứng phó với stress",
      "Cải thiện các mối quan hệ cá nhân và học tập",
    ],
  },
  {
    id: "2",
    title: "Chương trình tư vấn nhóm",
    description:
      "Tham gia các buổi tư vấn nhóm để chia sẻ, học hỏi và phát triển kỹ năng xã hội cùng những người có cùng mối quan tâm",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pet-management-94cf6.appspot.com/o/program-2.webp?alt=media&token=249dc743-4354-48f3-ae5d-ad32e7ea9016",
    rating: 4.6,
    reviews: 95,
    price: 300000,
    meetLink: "https://meet.google.com/def-ghij-klm",
    schedule: {
      startDate: "15/03/2024",
      endDate: "15/04/2024",
      time: "18:30 - 20:30",
      frequency: "Thứ 4 và Thứ 7 hàng tuần",
    },
    instructor: {
      name: "TS. Phạm Thị D",
      avatar: "https://example.com/avatar2.jpg",
      title: "Tiến sĩ Tâm lý học Xã hội",
      experience: "12 năm kinh nghiệm tư vấn nhóm",
      description:
        "Chuyên gia trong lĩnh vực tâm lý nhóm và phát triển kỹ năng xã hội",
    },
    guests: [
      {
        name: "ThS. Hoàng Văn E",
        title: "Thạc sĩ Công tác Xã hội",
        topic: "Kỹ năng giao tiếp hiệu quả",
      },
    ],
    features: [
      {
        title: "Hoạt động nhóm",
        description:
          "Tham gia các hoạt động nhóm tương tác và chia sẻ kinh nghiệm",
      },
      {
        title: "Thực hành kỹ năng",
        description: "Thực hành các kỹ năng xã hội trong môi trường an toàn",
      },
    ],
    benefits: [
      "Phát triển kỹ năng giao tiếp và tương tác xã hội",
      "Xây dựng mạng lưới hỗ trợ đồng đẳng",
      "Tăng cường sự tự tin trong các tình huống xã hội",
      "Học hỏi từ kinh nghiệm của người khác",
    ],
  },
  {
    id: "3",
    title: "Workshop Quản lý Stress",
    description:
      "Workshop chuyên sâu về các kỹ thuật quản lý stress và cân bằng cuộc sống học tập",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pet-management-94cf6.appspot.com/o/program-3.jpg?alt=media&token=ae338815-451d-4e25-a420-a5ed40dfe1a5",
    rating: 4.9,
    reviews: 156,
    price: 400000,
    meetLink: "https://meet.google.com/mno-pqrs-tuv",
    schedule: {
      startDate: "10/03/2024",
      endDate: "24/03/2024",
      time: "14:00 - 17:00",
      frequency: "Chủ nhật hàng tuần",
    },
    instructor: {
      name: "PGS.TS. Lê Thị F",
      avatar: "https://example.com/avatar3.jpg",
      title: "Phó Giáo sư Tâm lý học",
      experience: "20 năm nghiên cứu về stress học đường",
      description:
        "Chuyên gia hàng đầu về quản lý stress và sức khỏe tinh thần trong môi trường học tập",
    },
    guests: [
      {
        name: "TS. Nguyễn Văn G",
        title: "Tiến sĩ Y học",
        topic: "Mối liên hệ giữa stress và sức khỏe thể chất",
      },
    ],
    features: [
      {
        title: "Thực hành thiền mindfulness",
        description:
          "Học và thực hành các kỹ thuật thiền mindfulness để giảm stress",
      },
      {
        title: "Kỹ thuật thư giãn",
        description: "Các bài tập thư giãn và hít thở để kiểm soát căng thẳng",
      },
    ],
    benefits: [
      "Hiểu rõ về cơ chế của stress và tác động đến cơ thể",
      "Nắm vững các kỹ thuật quản lý stress hiệu quả",
      "Xây dựng thói quen lành mạnh để duy trì sức khỏe tinh thần",
      "Cải thiện khả năng tập trung và học tập",
    ],
  },
];
