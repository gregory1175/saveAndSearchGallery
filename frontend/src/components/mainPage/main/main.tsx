import { FormEvent, useState, useEffect } from "react";
import style from "./main.module.scss";
import Search from "./search/search";
import Welcome from "./welcome/welcome";
import ImageCard from "./imagesCard/imagesCard";
import axios from "axios";

type ImageType = {
  id: number;
  title: string;
  description: string;
  alt_description: string;
  urls: {
    small: string;
  };
  saved?: boolean;
};

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050";

function Main() {
  const [word, setWord] = useState<string>("");
  const [wordRandom, setRandomWord] = useState<string>("");
  const [images, setImages] = useState<ImageType[]>([]);

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: wordRandom }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setRandomWord("");
  };

  const handleSearchAllImagesSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleSaveImage = async (id: number) => {
    const imageToBeSaved: ImageType | undefined = images.find(
      (image) => image.id === id
    );
    if (!imageToBeSaved) {
      return;
    }
    imageToBeSaved.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages((prevImages) =>
          prevImages.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
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
                  <ImageCard image={image} saveImage={handleSaveImage} />
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
