import { Input, Select, Button } from "antd";
import { useState } from "react";
import styles from "./Search.module.scss";

interface SearchField {
  key: string;
  placeholder: string;
  type: "text" | "dropdown";
  options?: string[];
}

interface SearchBarProps {
  title?: string;
  fields: SearchField[];
  onSearch: (values: Record<string, string>) => void;
}

const SearchBar = ({ title, fields, onSearch }: SearchBarProps) => {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("🔍 Giá trị tìm kiếm:", searchValues); // Debug giá trị tìm kiếm
    onSearch(searchValues);
  };

  return (
    <div className={styles["search-bar"]}>
      {title && <span className={styles["title"]}>{title}</span>}
      <div className={styles["search-fields"]}>
        {fields.map((field) => (
          <div key={field.key} className={styles["search-field"]}>
            {field.type === "text" ? (
              <Input
                placeholder={field.placeholder}
                className={styles["search-input"]}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            ) : (
              <Select
                className={styles["search-input"]}
                placeholder={field.placeholder}
                options={field.options?.map((option) => ({ label: option, value: option }))}
                onChange={(value) => handleChange(field.key, value)}
              />
            )}
          </div>
        ))}
        <Button type="primary" className={styles["btn-view"]} onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
