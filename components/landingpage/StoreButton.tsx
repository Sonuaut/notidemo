import Link from "next/link";


export function StoreButtons() {
  return (
    <div className="w-full flex flex-wrap items-center gap-4 bg-gre">
             
    <Link target="_blank"
    href="https://apps.apple.com/us/app/notifly-app/id6745785595"
      // className="flex items-center justify-center w-44 sm:w-48 mt-3 text-white bg-black h-12 sm:h-12 rounded-xl text-sm sm:text-base "
       className="w-44 sm:w-48 h-12  "
    >
    <img src={"apple.png"} className="py-0"/>
    </Link>
    <Link
    href={"/"}
      className="w-44 sm:w-48 h-12  "
    >
    <img src={"google.webp"} className="py-0"/>
    </Link>


  </div>
  );
}
