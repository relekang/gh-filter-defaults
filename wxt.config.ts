import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  outDir: "dist",
  manifest: ({ browser }) => ({
    name: "GitHub filter defaults",
    ...(browser === "firefox"
      ? {
          browser_specific_settings: {
            gecko: {
              data_collection_permissions: {
                required: ["none"],
              },
            },
          },
        }
      : {}),
  }),
});
