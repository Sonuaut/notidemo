"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

interface UseInactivityLogoutOptions {
  inactivityTime: number; // in milliseconds
  type: "admin" | "super-admin";
}

export function useInactivityLogout({
  inactivityTime,
  type,
}: UseInactivityLogoutOptions) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      console.log(
        `Auto-logout triggered after ${
          inactivityTime / 1000
        } seconds of inactivity`
      );

      // Logout user
      logout(type);

      // Redirect to login
      const loginPath =
        type === "super-admin" ? "/super-admin/login" : "/admin/login";
      router.push(loginPath);
    }, inactivityTime);
  }, [inactivityTime, type, router]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      return;
    }

    // Event handlers for user activity
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      resetTimer();
    };

    // Add event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize timer
    resetTimer();

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer]);
}
