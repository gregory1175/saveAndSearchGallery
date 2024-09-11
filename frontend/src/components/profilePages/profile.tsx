import axios from "axios";
import { useEffect, useState } from "react";
import ImageCard from "./profilePagesComponents/imagesCard/imagesCard";
import { API_URL } from "../../utils/constants";
import style from "./profile.module.scss";
import Header from "./header/header";

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
    <>
      <Header title={"Image Gallery"} link={"Main page"} />
      <div className={style["profile"]}>
        <div className={style["profile_containers"]}>
          {images.length ? (
            <div className={style["profile_containers-block"]}>
              {images.map((image, index) => (
                <div key={index}>
                  <ImageCard image={image} deleteImage={handleDeleteImage} />
                </div>
              ))}
            </div>
          ) : (
            <div>On this page your saved images will be stored</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
