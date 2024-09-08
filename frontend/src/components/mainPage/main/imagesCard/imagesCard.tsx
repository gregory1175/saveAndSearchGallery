import style from "./imagesCard.module.scss";

type ImageCardType = {
  image: {
    title: string;
    description: string;
    id: number;
    alt_description: string;
    urls: {
      small: string;
    };
    saved?: boolean;
  };
  deleteImage?: (id: number) => void;
  saveImage?: (id: number) => void;
};

function ImageCard({ image, deleteImage, saveImage }: ImageCardType) {
  return (
    <div className={style["imageCard"]}>
      <img src={image.urls.small} className={style["imageCard-image"]} />
      <div>
        {/* <h2>{image.title.toUpperCase()}</h2>
        <p>{image.description || image.alt_description}</p> */}
        {deleteImage && (
          <button onClick={() => deleteImage(image.id)}>Delete</button>
        )}
        {saveImage && !image.saved && (
          <button onClick={() => saveImage(image.id)}>Save</button>
        )}
      </div>
    </div>
  );
}

export default ImageCard;
