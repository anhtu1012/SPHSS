export const mockQuestions = {
  depression: [
    {
      id: 1,
      question:
        "Trong 2 tuần vừa qua, bạn có thường xuyên cảm thấy chán nản, trầm cảm hoặc tuyệt vọng không?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Vài ngày" },
        { value: 2, label: "Hơn nửa số ngày" },
        { value: 3, label: "Gần như mỗi ngày" },
      ],
    },
    {
      id: 2,
      question:
        "Bạn có cảm thấy mất hứng thú hoặc niềm vui trong các hoạt động thường ngày không?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Thỉnh thoảng" },
        { value: 2, label: "Thường xuyên" },
        { value: 3, label: "Rất thường xuyên" },
      ],
    },
    // Add more depression questions...
  ],
  anxiety: [
    {
      id: 1,
      question:
        "Bạn có thường xuyên cảm thấy lo lắng, căng thẳng hoặc bồn chồn không?",
      options: [
        { value: 0, label: "Không bao giờ" },
        { value: 1, label: "Đôi khi" },
        { value: 2, label: "Thường xuyên" },
        { value: 3, label: "Liên tục" },
      ],
    },
    // Add more anxiety questions...
  ],
  // Add other survey types...
};
