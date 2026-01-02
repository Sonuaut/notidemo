"use client";

import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { errorToast, customToast } from "../hooks/use-toast";
import { useOptInDialog } from "../landingpage/OptInDialogProvider";

export default function OptInForm({ trigger }: { trigger?: boolean }) {
  const pathname = usePathname();
  const { open, setOpen } = useOptInDialog();

  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [promo, setPromo] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  useEffect(() => {
    // Only open dialog by default if on home page, close it on other pages
    if (pathname === "/") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pathname, setOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (phone.trim() === "") {
      toast.info("Mobile number is required.");
      return;
    }
    if (!consent) {
      toast.info("Consent is required.");
      return;
    }
    if (!privacyConsent) {
      toast.info("Privacy and Terms consent is required.");
      return;
    }

    const formData = new FormData();
    formData.append("mobile_no", `+${phone}`);
    formData.append("opt_status", consent ? "true" : "false");
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiurl}/api/v1/twilio_sms/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API Error");

      setPhone("");
      setConsent(false);
      setPromo(false);
      setPrivacyConsent(false);
      setOpen(false);
      setTimeout(() => {
        customToast("You have successfully subscribed to SMS alerts!");
      }, 1000);
    } catch (error) {
      errorToast("Something went wrong!");
    }
  };

  return (
    <div className="font-sans">
      {/* Trigger Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-3 border border-[#77a4d2] transition rounded-full text-[#77a4d2]">
            Parent sign-up
          </button>
        </DialogTrigger>

        <DialogContent className=" max-w-sm sm:max-w-md rounded-md">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Receive Academic SMS Alerts</span>
              {/* <button onClick={() => setOpen(false)} className="text-lg font-semibold px-2 hover:bg-gray-100 rounded-full">
                ×
              </button> */}
            </DialogTitle>
            <DialogDescription className="text-[14px] text-[#555] mt-1">
              Get important updates about student progress from Notifly. Message
              frequency varies. Msg & data rates may apply.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="phone" className="block font-bold mb-1">
                Mobile Number
              </label>
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                  id: "phone",
                }}
                country={"us"}
                value={phone}
                onChange={setPhone}
                placeholder="+1 555 123 4567"
                inputStyle={{ width: "100%" }}
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={() => setConsent(!consent)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-[14px]">
                I agree to receive academic progress SMS updates from Notifly.
                Reply HELP for help, STOP to unsubscribe.
                <span className="text-red-400"> *</span>
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="promo"
                checked={promo}
                onChange={() => setPromo(!promo)}
                className="mt-1"
              />
              <label htmlFor="promo" className="text-[14px]">
                I agree to receive promotional SMS messages from Notifly.
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="privacyConsent"
                checked={privacyConsent}
                onChange={() => setPrivacyConsent(!privacyConsent)}
                className="mt-1"
              />
              <label htmlFor="privacyConsent" className="text-[14px]">
                I have read and agree to the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </Link>
                . I consent to collection and processing of my personal data as
                described in these documents.
                <span className="text-red-400"> *</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white py-[10px] px-[16px] border-none rounded-[6px] cursor-pointer font-bold bg-gradient-to-r from-[#77A1D3] via-[#79CBCA] to-[#77A1D3] bg-[length:200%_auto] hover:bg-[position:100%] transition-all duration-500"
            >
              Subscribe
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
