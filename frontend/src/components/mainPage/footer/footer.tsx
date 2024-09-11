import style from "./footer.module.scss";
// images
import copyright from "../../../assets/images/svgSymbol.svg";

function Footer() {
  return (
    <div className={style["footer"]}>
      <div className={style["footer_container"]}>
        <h3 className={style["footer_container-title"]}>GD1175</h3>
        <p className={style["footer_container-text"]}></p>
        <img
          src={copyright}
          alt="copyright ©"
          className={style["footer_container-image"]}
        />
      </div>
    </div>
  );
}

export default Footer;
