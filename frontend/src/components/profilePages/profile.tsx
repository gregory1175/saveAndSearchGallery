import axios from "axios";
import { useEffect, useState } from "react";
import ImageCard from "../mainPage/main/imagesCard/imagesCard";
import { NavLink } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050";

type ImageType = {
  id: number;
  title: string;
  description: string;
  alt_description: string;
  urls: {
    small: string;
  };
};

function Profile() {
  const [images, setImages] = useState<ImageType[]>([]);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const handleDeleteImage = async (id: number) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log("Error deleting image:", error);
    }
  };

  return (
    <div>
      <h1>Сохраненные изображения </h1>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Вернуться на главную</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        {images.length ? (
          <div>
            {images.map((image, index) => (
              <div key={index}>
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </div>
            ))}
          </div>
        ) : (
          <div>Yours Gallery</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
