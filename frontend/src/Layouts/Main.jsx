import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";
const Main = () => {
  return (
    <div className="font-lancelot container mx-auto bg-[#EFE4D2]">
      <Navbar />
      <div className="  px-2 py-4">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
