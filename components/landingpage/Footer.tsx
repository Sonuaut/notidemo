import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SocialIcon = ({ type, href, ariaLabel }: { type: 'facebook' | 'instagram' | 'twitter', href: string, ariaLabel: string }) => {
  const icons = {
    facebook: (
      <Facebook className="w-4 h-4"/>
    ),
    instagram: (
     
      <Instagram className="w-4 h-4"/>
    ),
    twitter: (
     <Image src="twitter.svg" alt="twitterimg" width={20} height={20} className="w-3 h-3  "/>
    ),
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
      aria-label={ariaLabel}
    >
      {icons[type]}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex  space-x-4 mb-4">
          <SocialIcon type="facebook" href="https://facebook.com" ariaLabel="Facebook" />
          <SocialIcon type="instagram" href="https://www.instagram.com/notiflyapp?igsh=MWVkeXdwMWZvazcxMg%3D%3D&utm_source=qr" ariaLabel="Instagram" />
          <SocialIcon type="twitter" href="https://twitter.com" ariaLabel="Twitter" />
        </div>

        {/* Links */}
        <div className="flex flex-col justify-center gap-3 my-3 text-center">
          <Link href="/terms" className="text-sm hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
           <Link href="/faq" className="text-sm hover:underline">
            Help Center
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm ">
          © 2025 Notifly. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
