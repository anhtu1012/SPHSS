import styles from "./Search.module.scss";

interface SearchField {
  key: string;
  placeholder: string;
  type: "text" | "dropdown";
  options?: string[];
}

interface SearchBarProps {
  title: string;
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
                <input
                  name={field.key}
                  type="text"
                  placeholder={field.placeholder}
                  className={styles["search-input"]}
                />
            ) : (
              <div className={styles["input-container"]}>
              <select
                name={field.key}
                className={styles["dropdown"]}
                title={field.placeholder}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles["btn-view"]}
          onClick={handleSearch}
        >
          Xem
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
