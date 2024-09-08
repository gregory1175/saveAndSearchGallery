import { Route, Routes } from "react-router";
import MainPage from "../mainPage/mainPage";
import Profile from "../profilePages/profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
