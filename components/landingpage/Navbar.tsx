
import Link from "next/link";
import OptInForm from "./OptInForm";
import MobileMenu from "./MobileMenu";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey, IRole } from "@/types";

const Navbar = async () => {
  const role = await getCookie(ICookiesKey.ROLE);
  const token = await getCookie(ICookiesKey.AUTHTOKEN);

  const redirectLink =
    role && token
      ? role === IRole.ADMIN
        ? "/admin/dashboard"
        : "/super-admin/dashboard"
      : "/admin/signup";

  return (
    <nav className="w-full max-w-[90rem] mx-auto md:px-16 py-4 flex items-center justify-between">
      {/* Left Section: Logo + Mobile Menu */}
      <div className="w-full flex items-center justify-between px-3 sm:px-0">
        <Link href="/">
          <img src="Logo.png" alt="Notifyly Logo" className="h-11" />
        </Link>
        <MobileMenu />
      </div>

      {/* Right Section: Desktop Menu */}
      <div className="w-full hidden md:flex flex-row gap-10 items-center ml-auto">
        <ul className="flex flex-row gap-3 items-center ml-auto">
          <a href="/contact" className="px-4 py-3 border border-[#77a4d2] transition rounded-full text-[#77a4d2]">Get a Demo</a>
          <OptInForm />
          <Link href={redirectLink}>
            <button
              className="cursor-pointer bg-gradient-to-r from-[#77A1D3] via-[#79CBCA] to-[#77A1D3] 
                         bg-[length:200%_auto] hover:bg-[position:100%] text-white uppercase 
                         px-8 py-3 rounded-full shadow-[0_0_20px_#eee] transition-all 
                         duration-500 text-sm md:text-base"
            >
              {token ? "Dashboard" : "School Sign-Up"}
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
