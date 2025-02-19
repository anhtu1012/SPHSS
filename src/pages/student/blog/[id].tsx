import { Card, Carousel } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BlogData } from "../../../models/student";
import { getBlogDetail } from "../../../services/student/PsychologistDetail/api";
import "./blogDetail.scss";

function BlogDetail() {
  const location = useLocation();
  const postId = location.state;
  const [blogDetail, setBlogDetail] = useState<BlogData>();
  const fetchBlogDetail = useCallback(async () => {
    try {
      const res = await getBlogDetail(postId);
      const data = res.data.data;
      console.log(data);

      setBlogDetail(data);
    } catch (error: any) {
      toast.error(error?.response.message || "Lỗi khi lấy data");
    }
  }, []);

  useEffect(() => {
    fetchBlogDetail();
  }, []);

  return (
    <div className="blog-detail">
      {blogDetail ? (
        <>
          <div className="blog-detail__title">{blogDetail.title}</div>
          <p className="blog-detail__meta">
            Bởi {blogDetail.user.firstName + " " + blogDetail.user.lastName} •{" "}
            {new Date(blogDetail.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <p className="blog-detail__excerpt">{blogDetail.description}</p>
          <img
            src={blogDetail.imgageUrl}
            alt="DEMO FOR THE STRESS IN EXAM"
            style={{ width: "100%", height: 450, marginBottom: "20px" }}
          />
          <hr style={{ color: "#444", marginBottom: "15px" }} />
          <p className="blog-detail__related">Tin liên quan</p>
          <div className="blog-related">
            <Carousel dots={false} arrows slidesToShow={1}>
              <Card
                className="blog-related__post"
                title="Xây dựng mối quan hệ lành mạnh trong môi trường học đường"
              >
                <p style={{ fontSize: "1rem" }}>
                  Tìm hiểu cách xây dựng và duy trì các mối quan hệ tích cực với
                  bạn bè và thầy cô...
                </p>
              </Card>
            </Carousel>
          </div>
        </>
      ) : (
        <p>Đang tải dữ liệu</p>
      )}
    </div>
  );
}

export default BlogDetail;
