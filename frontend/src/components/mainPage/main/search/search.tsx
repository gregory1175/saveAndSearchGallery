import { ChangeEvent, FormEvent } from "react";
import style from "./search.module.scss";

type SearchType = {
  word: string;
  placeholder: string;
  setWord: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function Search({ word, placeholder, setWord, handleSubmit }: SearchType) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className={style["search"]}>
      <div className={style["search_block"]}>
        <div className={style["search_block-form"]}>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <input
                  type="text"
                  value={word}
                  onChange={handleChange}
                  placeholder={placeholder}
                />
              </div>
              <div>
                <button type="submit">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
