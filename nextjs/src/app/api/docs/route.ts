import { NextResponse } from "next/server";

export async function GET() {
  const apiDocs = {
    title: "Pecha Tools Public API",
    version: "1.0.0",
    description:
      "Public API endpoints for accessing Pecha Tools data from external domains",
    baseUrl: "https://pecha-tools.com/api",
    endpoints: {
      "/tools/public": {
        method: "GET",
        description: "Get a public list of all available tools",
        authentication: "None required",
        cors: "Enabled - can be called from any domain",
        parameters: "None",
        response: {
          success: "boolean - Whether the request was successful",
          data: "array - List of tools with their details",
          count: "number - Total number of tools returned",
        },
        example: {
          url: "https://pecha-tools.com/api/tools/public",
          method: "GET",
          response: {
            success: true,
            data: [
              {
                id: "tool-id-1",
                name: "Pecha OCR",
                description: "AI-powered OCR for Buddhist manuscripts",
                category: "OCR",
                price: null,
                link: "https://ocr.pecha-tools.com",
                demo: "https://demo.pecha-tools.com/ocr",
                icon: "base64-encoded-icon",
              },
            ],
            count: 1,
          },
        },
      },
    },
    usage: {
      javascript: `
// Using fetch API
fetch('https://pecha-tools.com/api/tools/public')
  .then(response => response.json())
  .then(data => {
    console.log('Tools:', data.data);
    console.log('Total count:', data.count);
  })
  .catch(error => console.error('Error:', error));
      `,
      curl: `
# Using cURL
curl -X GET "https://pecha-tools.com/api/tools/public" \\
  -H "Content-Type: application/json"
      `,
      python: `
# Using Python requests
import requests

response = requests.get('https://pecha-tools.com/api/tools/public')
data = response.json()

if data['success']:
    tools = data['data']
    print(f"Found {data['count']} tools:")
    for tool in tools:
        print(f"- {tool['name']}: {tool['description']}")
      `,
    },
    notes: [
      "This endpoint does not require authentication",
      "CORS is enabled for cross-origin requests",
      "Rate limiting may apply for excessive requests",
      "Data is cached and updated periodically",
      "All fields may be null except 'id'",
    ],
    contact: {
      support: "support@pecha-tools.com",
      documentation: "https://pecha-tools.com/docs",
    },
  };

  const response = NextResponse.json(apiDocs);

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}
