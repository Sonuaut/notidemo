import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
  } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
  import Link from "next/link";
 
  
  export default function MobileMenu() {
  
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden cursor-pointer ml-auto flex items-center  text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </SheetTrigger>
  
          <SheetContent side="top" className="p-0  backdrop-blur-md shadow-lg min-h-[60vh] animate-slide-in-down flex items-center justify-center">
            <div className="relative p-8 pt-16">
          
              <ul className="w-fit flex flex-col gap-8 items-center justify-center mt-8 text-lg font-medium">
                {/* <SheetClose>Home</SheetClose> */}
                <li>How It Works</li> 
                <Link href="/admin/signup">
                  <button
                    className="cursor-pointer bg-gradient-to-r from-[#77A1D3] via-[#79CBCA] to-[#77A1D3] bg-[length:200%_auto] hover:bg-[position:100%] text-white uppercase px-8 py-3 rounded-full shadow-[0_0_20px_#eee] transition-all duration-500 text-sm"
                  >
                    Get Started
                  </button>
                </Link>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
  
        {/* <OptInForm   /> */}
      </>
    );
  }
  