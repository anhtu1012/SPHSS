import { Card, Input, Tag } from "antd";
import { useState } from "react";
import "./index.scss";

const { Search } = Input;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Cách đối phó với stress trong mùa thi",
      excerpt:
        "Khám phá các phương pháp hiệu quả để kiểm soát căng thẳng và áp lực trong mùa thi...",
      author: "Dr. Nguyễn Văn A",
      date: "2024-01-15",
      tags: ["Stress", "Học tập", "Sức khỏe tinh thần"],
    },
    {
      id: 2,
      title: "Xây dựng mối quan hệ lành mạnh trong môi trường học đường",
      excerpt:
        "Tìm hiểu cách xây dựng và duy trì các mối quan hệ tích cực với bạn bè và thầy cô...",
      author: "Dr. Trần Thị B",
      date: "2024-01-10",
      tags: ["Mối quan hệ", "Học đường", "Kỹ năng sống"],
    },
    // Add more blog posts as needed
  ];

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-page">
      <h1 className="blog-page__title">Blog Tâm lý học đường</h1>
      <p className="blog-page__subtitle">
        Chia sẻ kiến thức và góc nhìn về sức khỏe tinh thần
      </p>

      <div className="blog-page__search">
        <Search
          placeholder="Tìm kiếm bài viết..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      <div className="blog-page__grid">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="blog-post">
            <h2 className="blog-post__title">{post.title}</h2>
            <p className="blog-post__meta">
              Bởi {post.author} •{" "}
              {new Date(post.date).toLocaleDateString("vi-VN")}
            </p>
            <p className="blog-post__excerpt">{post.excerpt}</p>
            <div className="blog-post__tags">
              {post.tags.map((tag) => (
                <Tag key={tag} color="blue">
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
