# Pecha Tools Public API

## Overview

The Pecha Tools Public API provides cross-origin access to our tools database, allowing external websites and applications to integrate with our Buddhist manuscript tools.

## Base URL

```
https://pecha-tools.com/api
```

## Authentication

The public endpoints do not require authentication and can be accessed from any domain.

## Endpoints

### GET /tools/public

Returns a list of all available tools in the Pecha Tools platform.

**URL:** `https://pecha-tools.com/api/tools/public`

**Method:** `GET`

**CORS:** Enabled for all domains

**Parameters:** None

**Response Format:**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string | null",
      "category": "string | null",
      "price": "number | null",
      "link": "string | null",
      "demo": "string | null",
      "icon": "string | null"
    }
  ],
  "count": "number"
}
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "pecha-ocr-1",
      "name": "Pecha OCR",
      "description": "AI-powered OCR for Buddhist manuscripts",
      "category": "OCR",
      "price": null,
      "link": "https://ocr.pecha-tools.com",
      "demo": "https://demo.pecha-tools.com/ocr",
      "icon": "data:image/png;base64,..."
    },
    {
      "id": "pecha-translator-1",
      "name": "Pecha Translator",
      "description": "AI translation tool for Tibetan Buddhist texts",
      "category": "Translation",
      "price": 0,
      "link": "https://translator.pecha-tools.com",
      "demo": null,
      "icon": "data:image/png;base64,..."
    }
  ],
  "count": 2
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Failed to fetch tools",
  "data": [],
  "count": 0
}
```

### GET /docs

Returns comprehensive API documentation in JSON format.

**URL:** `https://pecha-tools.com/api/docs`

**Method:** `GET`

**CORS:** Enabled for all domains

## Usage Examples

### JavaScript (Fetch API)

```javascript
// Get all tools
fetch("https://pecha-tools.com/api/tools/public")
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      console.log(`Found ${data.count} tools:`);
      data.data.forEach((tool) => {
        console.log(`- ${tool.name}: ${tool.description}`);
      });
    } else {
      console.error("API Error:", data.error);
    }
  })
  .catch((error) => console.error("Network Error:", error));
```

### jQuery AJAX

```javascript
$.ajax({
  url: "https://pecha-tools.com/api/tools/public",
  method: "GET",
  dataType: "json",
  success: function (data) {
    if (data.success) {
      $("#tools-list").empty();
      data.data.forEach(function (tool) {
        $("#tools-list").append(`
          <div class="tool">
            <h3>${tool.name}</h3>
            <p>${tool.description || "No description available"}</p>
            ${
              tool.link
                ? `<a href="${tool.link}" target="_blank">Visit Tool</a>`
                : ""
            }
          </div>
        `);
      });
    }
  },
  error: function (xhr, status, error) {
    console.error("Error fetching tools:", error);
  },
});
```

### Python (requests)

```python
import requests

def get_pecha_tools():
    try:
        response = requests.get('https://pecha-tools.com/api/tools/public')
        response.raise_for_status()
        data = response.json()

        if data['success']:
            tools = data['data']
            print(f"Found {data['count']} Pecha Tools:")

            for tool in tools:
                print(f"\nName: {tool['name']}")
                print(f"Description: {tool.get('description', 'N/A')}")
                print(f"Category: {tool.get('category', 'N/A')}")
                if tool.get('link'):
                    print(f"URL: {tool['link']}")
                if tool.get('demo'):
                    print(f"Demo: {tool['demo']}")

            return tools
        else:
            print(f"API Error: {data['error']}")
            return []

    except requests.exceptions.RequestException as e:
        print(f"Network Error: {e}")
        return []

# Usage
tools = get_pecha_tools()
```

### cURL

```bash
# Get all tools
curl -X GET "https://pecha-tools.com/api/tools/public" \
     -H "Content-Type: application/json"

# Get API documentation
curl -X GET "https://pecha-tools.com/api/docs" \
     -H "Content-Type: application/json"
```

### PHP

```php
<?php
function getPechaTools() {
    $url = 'https://pecha-tools.com/api/tools/public';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $data = json_decode($response, true);

        if ($data['success']) {
            echo "Found " . $data['count'] . " tools:\n";

            foreach ($data['data'] as $tool) {
                echo "\n- " . $tool['name'];
                if ($tool['description']) {
                    echo ": " . $tool['description'];
                }
                if ($tool['link']) {
                    echo "\n  URL: " . $tool['link'];
                }
            }

            return $data['data'];
        } else {
            echo "API Error: " . $data['error'];
            return [];
        }
    } else {
        echo "HTTP Error: " . $httpCode;
        return [];
    }
}

// Usage
$tools = getPechaTools();
?>
```

## Response Fields

| Field         | Type         | Description                                |
| ------------- | ------------ | ------------------------------------------ |
| `id`          | string       | Unique identifier for the tool             |
| `name`        | string\|null | Display name of the tool                   |
| `description` | string\|null | Brief description of the tool's purpose    |
| `category`    | string\|null | Tool category (e.g., "OCR", "Translation") |
| `price`       | number\|null | Price in USD (null = free)                 |
| `link`        | string\|null | URL to access the tool                     |
| `demo`        | string\|null | URL to demo/preview the tool               |
| `icon`        | string\|null | Base64-encoded icon image or icon URL      |

## Rate Limiting

Currently, no rate limiting is enforced, but excessive requests may be throttled in the future. Please be respectful with your API usage.

## CORS Policy

All public endpoints include the following CORS headers:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Support

For API support or questions:

- Email: support@pecha-tools.com
- Documentation: https://pecha-tools.com/docs

## Changelog

- **v1.0.0** (2024): Initial release of public API
  - Added `/tools/public` endpoint
  - Added `/docs` endpoint
  - Enabled CORS for cross-origin access
