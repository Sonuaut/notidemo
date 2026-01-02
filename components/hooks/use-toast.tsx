"use client";

import { Toaster, toast } from "sonner";

export const successToast = (message: string,backgroundColor?:string) => {
    toast.success(message, {
        style: {
            backgroundColor: backgroundColor??"#9F9FF8", // Green
            color: "white"
        },
    });
};

export const errorToast = (message: string) => {
    toast.error(message, {
        style: {
            backgroundColor: "#F44336", // Red
            color: "white",
        },
    });
};

// New: Custom toast with user-selected colors
export const customToast = (message: string, bgColor?: string, textColor?: string) => {
    toast(message, {
        style: {
            backgroundColor: bgColor??"#77A1D3",
            color: textColor??"#ffffff",
        },
        position:"top-center"
    });
};

export function ToastProvider() {
    // Use top-center for position
    return <Toaster position="top-right" richColors />;
}
