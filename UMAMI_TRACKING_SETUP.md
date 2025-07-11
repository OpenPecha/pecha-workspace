# Umami Analytics Tracking Implementation

This document describes the Umami analytics tracking implementation for the Pecha Tools application.

## Overview

Umami analytics has been integrated to track user interactions and tool usage across the application. The implementation includes:

1. **Frontend tracking** - User interactions, tool clicks, and navigation
2. **Backend analytics endpoint** - Server-side tracking and logging
3. **Tool usage analytics** - Detailed tracking of which tools are used most frequently
4. **User identification** - Track specific users using `umami.identify()`

## Setup Instructions

### 1. Umami Account Setup

1. Create an account at [Umami Analytics](https://umami.is/)
2. Create a new website in your Umami dashboard
3. Copy your website ID and domain information

### 2. Environment Configuration

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Umami Analytics Configuration
VITE_UMAMI_WEBSITE_ID=your-umami-website-id
VITE_UMAMI_DOMAINS=localhost,yourdomain.com
VITE_UMAMI_SCRIPT_URL=https://analytics.umami.is/script.js
VITE_UMAMI_ENABLED=true
```

### 3. Configuration Options

The Umami configuration is managed in `frontend/src/config/umami.ts`:

- `websiteId`: Your Umami website ID
- `domains`: Comma-separated list of domains to track
- `scriptUrl`: URL to the Umami script (default: https://analytics.umami.is/script.js)
- `enabled`: Whether tracking is enabled (automatically enabled in production)

## User Identification

The system automatically identifies users when they are authenticated and when Umami is initialized:

### Automatic Identification

- **Script Load Identification**: Users are automatically identified when the Umami script loads
- **Authentication State Changes**: Users are identified/cleared when they log in/out
- **Queued Identification**: If a user logs in before Umami loads, identification is queued and processed when ready
- **Email as Identifier**: Uses the user's email address as the unique identifier
- **Comprehensive Properties**: Tracks name, role, admin status, and other available user data

### How It Works

1. **Umami Script Injection**: When `injectUmami()` is called, it loads the Umami script
2. **Script Load Handler**: Once loaded, it automatically identifies any authenticated user
3. **Authentication Changes**: The AuthContext monitors auth state and updates user identification
4. **Queuing System**: If users log in before Umami loads, identification is queued and processed later

### Manual Identification

You can also manually set users for identification:

```typescript
import { setUmamiUser, clearUmamiUser } from "./analytics";

// Set a user for identification
setUmamiUser({
  email: "user@example.com",
  name: "John Doe",
  role: "admin",
  isAdmin: true,
});

// Clear user identification
clearUmamiUser();
```

### User Properties Tracked

- `email`: User's email address (used as unique identifier)
- `id`: User's unique ID from authentication system
- `sub`: User's subject identifier from Auth0
- `name`: User's full name
- `role`: User's role in the system
- `isAdmin`: Whether the user has admin privileges
- `identified_at`: Timestamp of identification

### Environment Variables

Make sure to set these environment variables:

```env
# Umami Analytics Configuration
VITE_UMAMI_WEBSITE_ID=your-umami-website-id
VITE_UMAMI_SRC=https://analytics.umami.is/script.js
VITE_UMAMI_ENABLED=true  # Enable in development
```

## Tracked Events

### Tool-Specific Events

1. **tool-clicked** - When a user clicks on a tool card
   - Properties: tool_id, tool_name, tool_category, tool_link, access_type, referrer_page, user_email
2. **tool-accessed** - When a user accesses a tool
   - Properties: tool_id, tool_name, access_type, referrer_page, user_email
3. **tool-list-viewed** - When the tools list is displayed
   - Properties: metadata.tools_count, page, user_email
4. **tool-created** - When an admin creates a new tool
   - Properties: tool_name, tool_category, admin_action, user_email
5. **tool-updated** - When an admin updates a tool
   - Properties: tool_id, tool_name, admin_action, user_email
6. **tool-deleted** - When an admin deletes a tool
   - Properties: tool_id, tool_name, admin_action, user_email

### General Events

The application also tracks various other events including:

- Page visits
- User authentication events
- Navigation events
- UI interactions
- Error events

All events now include user identification data when available.

## Usage

### Frontend Tracking

The tracking is automatically initialized when the application starts. Use the `useUmamiTracking` hook in components:

```typescript
import { useUmamiTracking, getUserContext } from "@/hooks/use-umami-tracking";

const MyComponent = () => {
  const { trackToolClicked } = useUmamiTracking({ userEmail: user?.email });
  const { user } = useAuth();

  const handleToolClick = async (toolId: string, toolName: string) => {
    await trackToolClicked(toolId, toolName, category, link, {
      ...getUserContext(user),
      metadata: {
        custom_property: "value",
      },
    });
  };
};
```

### Backend Analytics

The backend provides an analytics endpoint at `/api/tools/analytics` for server-side tracking:

```typescript
POST /api/tools/analytics
{
  "tool_id": "tool-123",
  "tool_name": "Translation Tool",
  "event_type": "accessed",
  "access_type": "direct",
  "user_id": "user@example.com",
  "metadata": {
    "custom_data": "value"
  }
}
```

## Data Structure

All tracking events include the following standard properties:

```typescript
interface UmamiEventProperties {
  // Common properties
  user_id?: string;
  user_role?: string;
  user_email?: string;
  page_path?: string;
  timestamp?: number;
  session_id?: string;

  // Tool-specific properties
  tool_id?: string;
  tool_name?: string;
  tool_category?: string;
  tool_link?: string;
  tool_price?: number;
  access_type?: string;
  referrer_page?: string;

  // Additional context
  metadata?: Record<string, string | number | boolean | null>;
}
```

## Analytics Dashboard

Once configured, you can view analytics in your Umami dashboard:

1. **Real-time visitors** - See current active users
2. **Page views** - Track which pages are most popular
3. **Events** - Monitor tool usage and user interactions
4. **Custom events** - View detailed tool-specific analytics
5. **User identification** - Track specific users and their behavior patterns

## Key Metrics to Monitor

### Tool Usage Metrics

- Most clicked tools by specific users
- Tool access patterns per user
- User engagement with different tool categories
- Conversion from tool view to tool access
- Admin vs regular user tool usage patterns

### User Behavior Metrics

- Individual user journeys through the application
- Authentication patterns by user
- Admin tool management activity by specific admins
- User retention and return visits
- Error rates per user

## Development vs Production

- **Development**: Tracking is disabled by default, events are logged to console
- **Production**: Tracking is enabled automatically, events are sent to Umami

To enable tracking in development, set `VITE_UMAMI_ENABLED=true` in your environment variables.

## Privacy Considerations

Umami is privacy-focused and GDPR compliant:

- No cookies used for tracking
- User identification is optional and based on authenticated users only
- All data is anonymized in aggregate views
- Users cannot be tracked across different websites
- User identification data is only stored if explicitly provided

## Troubleshooting

### Common Issues

1. **Events not appearing in dashboard**

   - Check that `VITE_UMAMI_WEBSITE_ID` is correct
   - Verify the domain is added to `VITE_UMAMI_DOMAINS`
   - Ensure the script is loading (check browser network tab)

2. **User identification not working**

   - Verify user email is being passed to `useUmamiTracking`
   - Check console for identification logs in development
   - Ensure user is authenticated before identification

3. **Development tracking not working**

   - Set `VITE_UMAMI_ENABLED=true` in your environment
   - Check console for tracking logs

4. **Script loading errors**
   - Verify `VITE_UMAMI_SCRIPT_URL` is correct
   - Check for ad blockers or script blockers

### Debug Mode

In development, all tracking events and user identification are logged to the console:

```
🔍 Umami Track: event-name { properties }
🔍 Umami Identify: user-id { user-properties }
🔍 Umami Identify User: user-id { comprehensive-properties }
```

## Future Enhancements

Potential improvements to the tracking system:

1. **Database storage** - Store analytics data in the backend database
2. **Custom dashboard** - Build internal analytics dashboard with user-specific views
3. **A/B testing** - Implement feature flag tracking per user
4. **Performance monitoring** - Track page load times and errors per user
5. **Conversion tracking** - Monitor user conversion funnels
6. **User segmentation** - Analyze behavior patterns by user type
7. **Cohort analysis** - Track user retention over time

## Contributing

When adding new trackable events:

1. Add the event type to `UmamiEventType` in `use-umami-tracking.ts`
2. Add relevant properties to `UmamiEventProperties` interface
3. Create a specific tracking method if needed
4. Ensure user identification is passed where applicable
5. Update this documentation

## Support

For issues related to Umami tracking:

1. Check the browser console for errors
2. Verify environment configuration
3. Test user identification in development mode
4. Test in production environment
5. Consult Umami documentation at https://umami.is/docs
