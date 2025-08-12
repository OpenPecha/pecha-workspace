import { useCallback } from "react";

interface User {
  id?: string;
  email?: string;
  name?: string;
}

interface TrackingOptions {
  userEmail?: string;
}

interface UserContext {
  user_id?: string;
  user_role?: string;
  user_email?: string;
}

interface TrackingPayload {
  metadata?: Record<string, any>;
}

export const getUserContext = (user?: User | null): UserContext => {
  return {
    user_id: user?.id,
    user_email: user?.email,
    user_role: "user", // Default role
  };
};

export const useUmamiTracking = (options: TrackingOptions = {}) => {
  const trackToolClicked = useCallback(
    async (
      toolId: string,
      toolName: string,
      category?: string,
      path?: string,
      payload?: TrackingPayload
    ) => {
      try {
        // In a real implementation, this would send to your analytics service
        console.log("Tool clicked:", {
          toolId,
          toolName,
          category,
          path,
          ...payload,
        });

        // You could also send to your API endpoint for analytics
        if (typeof window !== "undefined" && (window as any).umami) {
          (window as any).umami.track("tool-click", {
            tool_id: toolId,
            tool_name: toolName,
            category,
            path,
            ...payload?.metadata,
          });
        }
      } catch (error) {
        console.error("Error tracking tool click:", error);
      }
    },
    [options.userEmail]
  );

  const trackToolListViewed = useCallback(
    async (toolCount: number, payload?: TrackingPayload) => {
      try {
        console.log("Tool list viewed:", { toolCount, ...payload });

        if (typeof window !== "undefined" && (window as any).umami) {
          (window as any).umami.track("tool-list-viewed", {
            tool_count: toolCount,
            ...payload?.metadata,
          });
        }
      } catch (error) {
        console.error("Error tracking tool list view:", error);
      }
    },
    [options.userEmail]
  );

  return {
    trackToolClicked,
    trackToolListViewed,
  };
};
