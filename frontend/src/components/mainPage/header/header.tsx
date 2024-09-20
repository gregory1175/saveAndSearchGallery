import { NavLink } from "react-router-dom";
import style from "./header.module.scss";
import { useRef, useState } from "react";
import ToggleButton from "../../ui/toggleButton/toggleButton";

type HeaderType = {
  title: string;
  profile: string;
};

function Header({ title, profile }: HeaderType) {
  const [activeNavigate, setActiveNavigate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const linkContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleNavigate = () => {
    if (isAnimating) return;

    if (activeNavigate) {
      setIsAnimating(true);
      linkContainerRef.current?.classList.add(style["reverse-animation"]);
      setTimeout(() => {
        setActiveNavigate(false);
        setIsAnimating(false);
      }, 1200);
    } else {
      setActiveNavigate(true);
    }
  };

  return (
    <header className={style["header"]}>
      <div className={style["header_container"]}>
        <div className={style["header_containerTitle"]}>
          <NavLink className={style["header_titleLink"]} to="/">
            <h1 className={style["header_titleLink-title"]}>{title}</h1>
          </NavLink>
        </div>
        <hr className={style["header_line"]} />
        <div className={style["header_containerText"]}>
          <h2 className={style["header_containerText-title"]}>Welcome!</h2>
          <p className={style["header_containerText-text"]}>
            Image Gallery is a small project of mine
          </p>
          <p className={style["header_containerText-text"]}>
            The functionality is very simple
            <br /> 1 Search for images
            <br /> 2 Save images to your gallery
          </p>
        </div>
        <nav className={style["header_nav"]}>
          <ul className={style["header_nav-ul"]}>
            <li className={style["header_nav-ul-list"]}>
              <div className={style["openButton"]}>
                <ToggleButton click={toggleNavigate} disabled={isAnimating} />
              </div>
              {activeNavigate && (
                <div
                  className={`${style["header_nav-ul-list_linkContainer"]} ${
                    isAnimating ? style["reverse-animation"] : ""
                  }`}
                  ref={linkContainerRef}
                >
                  <NavLink
                    className={style["header_nav-ul-list_link"]}
                    to={"/profile"}
                  >
                    {profile}
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
