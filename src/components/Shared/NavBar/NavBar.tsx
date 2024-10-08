import Image from "next/image";
import logo from "../../../assets/nav/logo.png";
import Link from "next/link";
import Tocenter from "@/components/Helper/Tocenter";
const NavBar = () => {
  const routes = (
    <>
      <Link href={"about-us"}>About Us</Link>
      <Link href={"contact-us"}>Contact Us</Link>
      <Link href={"login"}>Login</Link>
    </>
  );

  return (
    <>
      {/* fro desktop view. */}
      <div className="bg-gray-300 py-4">
      <Tocenter>
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <Image
            
            alt="Logo"
            width={50}
            height={400}
            src={logo}
          ></Image>
        </Link>
        <ul className="flex gap-4 text-lg font-semibold">{routes}</ul>
      </div>
      </Tocenter>
      </div>
    </>
  );
};

export default NavBar;
