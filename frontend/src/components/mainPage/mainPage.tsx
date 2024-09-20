import style from "./mainPage.module.scss";
import Footer from "./footer/footer";
import Header from "./header/header";
import Main from "./main/main";

function MainPage() {
  return (
    <>
      <section className={style["section"]}>
        <Header title={"Image Gallery"} profile={"My profile"} />
      </section>
      <section>
        <Main />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

export default MainPage;
