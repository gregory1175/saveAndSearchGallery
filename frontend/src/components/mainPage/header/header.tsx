import { NavLink } from "react-router-dom";
import style from "./header.module.scss";

type HeaderType = {
  title: string;
  profile: string;
};

function Header({ title, profile }: HeaderType) {
  return (
    <header className={style["header"]}>
      <div className={style["header_container"]}>
        <NavLink className={style["header_titleLink"]} to="/">
          <h1 className={style["header_titleLink-title"]}>{title}</h1>
        </NavLink>
        <nav className={style["header_nav"]}>
          <ul className={style["header_nav-ul"]}>
            <li className={style["header_nav-ul-list"]}>
              <div className={style["header_nav-ul-list_linkContainer"]}>
                <NavLink
                  className={style["header_nav-ul-list_link"]}
                  to={"/profile"}
                >
                  {profile}
                </NavLink>
                <NavLink
                  className={style["header_nav-ul-list_link"]}
                  to={"/profile"}
                >
                  {profile}
                </NavLink>
                <NavLink
                  className={style["header_nav-ul-list_link"]}
                  to={"/profile"}
                >
                  {profile}
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
