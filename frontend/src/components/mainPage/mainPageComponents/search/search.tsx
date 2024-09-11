import { ChangeEvent, FormEvent } from "react";
import style from "./search.module.scss";

type SearchType = {
  word: string;
  placeholder: string;
  search: string;
  setWord: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function Search({
  word,
  placeholder,
  search,
  setWord,
  handleSubmit,
}: SearchType) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className={style["search"]}>
      <div className={style["search_block"]}>
        <form onSubmit={handleSubmit} className={style["search_block_form"]}>
          <div className={style["search_block_form-content"]}>
            <input
              type="text"
              value={word}
              onChange={handleChange}
              placeholder={placeholder}
              className={style["search_block_form-content-input"]}
            />
            <button
              type="submit"
              className={style["search_block_form-content-submit"]}
            >
              {search}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
