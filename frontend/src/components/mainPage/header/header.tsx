import { NavLink } from "react-router-dom";
import style from "./header.module.scss";
import { useRef, useState } from "react";

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
        <NavLink className={style["header_titleLink"]} to="/">
          <h1 className={style["header_titleLink-title"]}>{title}</h1>
        </NavLink>
        <nav className={style["header_nav"]}>
          <ul className={style["header_nav-ul"]}>
            <li className={style["header_nav-ul-list"]}>
              <div className={style["openButton_container"]}>
                <div className={style["openButton_container-div"]}>
                  <button
                    className={style["openButton"]}
                    onClick={toggleNavigate}
                  ></button>
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
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
