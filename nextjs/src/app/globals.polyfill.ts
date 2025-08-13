// Global polyfills for server-side rendering
if (typeof global !== "undefined") {
  // Define self and window for server-side rendering
  if (typeof (global as any).self === "undefined") {
    (global as any).self = global;
  }

  if (typeof (global as any).window === "undefined") {
    (global as any).window = undefined;
  }

  // Add other browser globals that might be missing
  if (typeof (global as any).document === "undefined") {
    (global as any).document = undefined;
  }

  if (typeof (global as any).navigator === "undefined") {
    (global as any).navigator = undefined;
  }
}
