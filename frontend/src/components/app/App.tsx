import { Route, Routes } from "react-router";
import MainPage from "../mainPage/mainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
