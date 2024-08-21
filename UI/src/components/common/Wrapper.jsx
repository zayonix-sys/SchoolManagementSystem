import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BackToTopButton from "./BackToTopButton";

const Wrapper = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
      <BackToTopButton/>
    </>
  );
};

export default Wrapper;
