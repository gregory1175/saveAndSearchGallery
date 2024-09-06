import style from "./header.module.scss";

type HeaderType = {
  title: string;
};

function Header({ title }: HeaderType) {
  return (
    <header className={style["header"]}>
      <nav className={style["header_nav"]}>
        <ul className={style["header_nav-ul"]}>
          <li className={style["header_nav-ul-list"]}>
            <a className={style["header_nav-ul-list_link"]} href="/">
              <h1 className={style["header_nav-ul-list_link-title"]}>
                {title}
              </h1>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
