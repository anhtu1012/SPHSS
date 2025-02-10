import SearchBar from "../../../components/cSearchbar/SearchBar";
import "./manageDashboard.module.scss";

function ManageDashboard() {
  const handleSearch = (values: Record<string, string>) => {
    console.log("Tìm kiếm:", values);
  };
  return (
    <div>
      <SearchBar
        title="Báo cáo chi tiết"
        fields={[
          { key: "school", placeholder: "Trường", type: "text" },
          { key: "class", placeholder: "Lớp", type: "text" },
          {
            key: "gender",
            placeholder: "Giới tính",
            type: "dropdown",
            options: ["Nam", "Nữ", "Chưa xác định"],
          },
        ]}
        onSearch={handleSearch}
      />
    </div>
  );
}

export default ManageDashboard;
