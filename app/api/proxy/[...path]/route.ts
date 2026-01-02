import { NextRequest, NextResponse } from "next/server";

async function proxyRequest(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  const url = new URL(request.url);
  const queryString = url.search;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (key !== "host") {
      headers.append(key, value);
    }
  });

  headers.append("ngrok-skip-browser-warning", "1");

  let body = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    // For methods that can have a body
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      body = JSON.stringify(await request.json());
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      body = await request.text();
    } else {
      body = await request.text();
    }
  }

  const targetUrl = `${API_URL}/api/v1/${path}${queryString}`;
  console.log(`Proxying ${request.method} request to ${targetUrl}`);

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    // Get the response as text first
    const responseText = await response.text();

    // Check if the response contains the ngrok warning
    if (responseText.includes("ERR_NGROK_6024")) {
      console.error("Received ngrok warning page instead of API response");
      return NextResponse.json(
        {
          error: "Received ngrok warning page",
          details: "The API request was intercepted by ngrok warning page",
          solution: "Add ngrok-skip-browser-warning header to your requests",
          status: 500,
        },
        { status: 500 }
      );
    }

    // Try to parse as JSON
    try {
      const responseData = JSON.parse(responseText);
      return NextResponse.json(responseData);
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
      console.error("Response text:", responseText.substring(0, 500) + "...");

      return NextResponse.json(
        {
          error: "Failed to parse API response as JSON",
          details:
            parseError instanceof Error
              ? parseError.message
              : String(parseError),
          status: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch from API",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
      },
      { status: 500 }
    );
  }
}

// Export handlers for all HTTP methods
export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
