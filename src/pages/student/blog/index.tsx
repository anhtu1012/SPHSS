import { Card, Input, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BlogData } from "../../../models/student";
import { getBlog } from "../../../services/student/PsychologistDetail/api";
import "./index.scss";

const { Search } = Input;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const navigate = useNavigate();

  const fetchBlog = useCallback(async () => {
    try {
      const res = await getBlog();
      const data = res.data.data;
      if (data.length < 0) toast.error("Chưa có blog nào");
      setBlogData(data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, []);

  useEffect(() => {
    fetchBlog();
  }, []);

  const tagList = [
    "#Stress",
    "#Học tập",
    "#Sức khỏe tinh thần",
    "#Mối quan hệ",
    "#Học đường",
    "#locau",
  ];

  const handleClickTag = (tag: any) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const filteredPosts = blogData.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.hashtag.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="blog-page">
      <h1 className="blog-page__title">Blog Tâm lý học đường</h1>
      <p className="blog-page__subtitle">
        Chia sẻ kiến thức và góc nhìn về sức khỏe tinh thần
      </p>
      <div className="blog-page__category">
        {tagList.map((tag) => (
          <Tag
            key={tag}
            className={`blog-page__tagCustom ${
              selectedTag === tag ? "blog-page__selectedTag" : ""
            }`}
            onClick={() => handleClickTag(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>

      <div className="blog-page__search">
        <Search
          placeholder="Tìm kiếm bài viết..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      <div className="blog-page__grid">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="blog-post"
            onClick={() => navigate(`/blog/${post.id}`, { state: post.id })}
          >
            <h2 className="blog-post__title">{post.title}</h2>
            <p className="blog-post__meta">
              Bởi {post.user.firstName + " " + post.user.lastName} •{" "}
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </p>
            <img
              src={post.imgageUrl}
              alt="Image For Blog"
              className="blog-post__img"
            />
            <p className="blog-post__excerpt">{post.contentMarkdown}</p>
            <div className="blog-post__tags">
              {post.hashtag.map((tag) => (
                <Tag key={tag} color="blue" className="blog-post__tagSize">
                  {tag}
                </Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
