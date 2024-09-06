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
  };
  deleteImage: (id: number) => void;
};

function ImageCard({ image, deleteImage }: ImageCardType) {
  return (
    <div className={style["imageCard"]}>
      <img src={image.urls.small} className={style["imageCard-image"]} />
      <div>
        {/* <h2>{image.title.toUpperCase()}</h2>
        <p>{image.description || image.alt_description}</p> */}
        <button onClick={() => deleteImage(image.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ImageCard;
