import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

// Base API request function with configurable options
async function makeBaseApiRequest(
  url: string,
  method: string,
  payload?: any,
  token?: string
): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // If token is provided, use it; otherwise try to get from cookie
    const authToken = token || (await getCookie(ICookiesKey.AUTHTOKEN));
    console.log("token from cookie :", authToken);
    if (!authToken) {
      return { success: false, error: "Authentication token not found" };
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (payload && method !== "GET" && method !== "DELETE") {
      requestOptions.body = JSON.stringify(payload);
    }

    const response = await fetch(url, requestOptions);
    console.log(response.body, "responsible", url);
    if (!response.ok) {
      let errorMessage: string;
      try {
        const errorText = await response.text();
        errorMessage =
          errorText ?? `API responded with status ${response.status}`;
      } catch (textError) {
        errorMessage = `API responded with status ${response.status}and the error is ${textError}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("data", data.data.result);

    // Apply custom validation if provided
    // if (config.validateResponse && !config.validateResponse(data)) {
    //   throw new Error(config.errorMessage ?? `Failed to ${method.toLowerCase()}`);
    // }

    return { success: true, data };
  } catch (error) {
    console.error(`Error in ${method.toLowerCase()} request:`, error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : `Failed to ${method.toLowerCase()}`,
    };
  }
}

// Standard API request for lib files
export async function makeApiRequest(
  url: string,
  method: string,
  payload?: any,
  token?: string
): Promise<{ success: boolean; error?: any; data?: any }> {
  return makeBaseApiRequest(url, method, payload, token);
}

// Teacher-specific API request with enhanced error handling
export async function makeTeacherApiRequest(
  url: string,
  method: string,
  payload?: any,
  token?: string
): Promise<{ success: boolean; error?: any; data?: any }> {
  return makeBaseApiRequest(url, method, payload, token);
}

// Server action API request
export async function makeActionApiRequest(
  url: string,
  method: string,
  payload?: any,
  token?: string
): Promise<{ success: boolean; error?: any; data?: any }> {
  return makeBaseApiRequest(url, method, payload, token);
}

// Template-specific server action API request
export async function makeTemplateActionApiRequest(
  url: string,
  method: string,
  payload?: any,
  token?: string
): Promise<{ success: boolean; error?: any; data?: any }> {
  const errorMessage =
    method === "POST"
      ? "Failed to create template"
      : `Failed to ${method.toLowerCase()} template`;

  return makeBaseApiRequest(url, method, payload, token);
}
