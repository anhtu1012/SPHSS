import { Input, Select, Button } from "antd";
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
  const handleSearch = () => {
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      const element = document.getElementById(field.key) as
        | HTMLInputElement
        | HTMLSelectElement;
      if (element) values[field.key] = element.value;
    });
    onSearch(values);
  };

  return (
    <div className={styles["search-bar"]}>
      <span className={styles["title"]}>{title}</span>
      <div className={styles["search-fields"]}>
        {fields.map((field) => (
          <div key={field.key} className={styles["search-field"]}>
            {field.type === "text" ? (
              <Input id={field.key} placeholder={field.placeholder} className={styles["search-input"]} />
            ) : (
              <Select
                id={field.key}
                className={styles["search-input"]}
                placeholder={field.placeholder}
                options={field.options?.map((option) => ({ label: option, value: option }))}
              />
            )}
          </div>
        ))}
        <Button type="primary" className={styles["btn-view"]} onClick={handleSearch}>
          Xem
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
