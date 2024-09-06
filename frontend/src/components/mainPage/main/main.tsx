import { FormEvent, useState } from "react";
import style from "./main.module.scss";
import Search from "./search/search";
import Welcome from "./welcome/welcome";
import ImageCard from "./imagesCard/imagesCard";

type ImageType = {
  id: number;
  title: string;
  description: string;
  alt_description: string;
  urls: {
    small: string;
  };
};

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050";
console.log(API_URL);

function Main() {
  const [word, setWord] = useState<string>("");
  const [wordRandom, setRandomWord] = useState<string>("");
  const [images, setImages] = useState<ImageType[]>([]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${API_URL}/new-image?query=${wordRandom}`)
      .then((res) => res.json())
      .then((data: ImageType) => {
        setImages([{ ...data, title: wordRandom }, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });

    setRandomWord("");
  };

  const handleSearchAllImagesSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${API_URL}/search/photos?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(
          data.results.map((image: ImageType) => ({ ...image, title: word }))
        );
      })
      .catch((err) => {
        console.log(err);
      });

    setWord("");
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <main className={style["main"]}>
      <div className={style["main_container"]}>
        <h1 title={"Image Gallery"} />
        <div className={style["main_container-search"]}>
          <Search
            word={word}
            placeholder="Search images"
            setWord={setWord}
            handleSubmit={handleSearchAllImagesSubmit}
          />
          <Search
            word={wordRandom}
            placeholder="Search random image"
            setWord={setRandomWord}
            handleSubmit={handleSearchSubmit}
          />
        </div>
        <div className={style["main_block"]}>
          {images.length ? (
            <div className={style["main_ImagesContainer"]}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={style["main_ImagesContainer-image"]}
                >
                  <ImageCard image={image} deleteImage={handleDeleteImage} />
                </div>
              ))}
            </div>
          ) : (
            <div className={style["main_welcomeContainer"]}>
              <Welcome />
            </div>
          )}
        </div>
      </div>
      <hr />
    </main>
  );
}

export default Main;
