import Footer from "./footer/footer";
import Header from "./header/header";
import Main from "./main/main";

function MainPage() {
  return (
    <>
      <Header title={"Image Gallery"} profile={"My profile"} />
      <Main></Main>
      <Footer />
    </>
  );
}

export default MainPage;
