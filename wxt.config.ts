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
              id: "{01b776e4-a3fd-40a8-adcb-f7f5fee9ea52}",
              data_collection_permissions: {
                required: ["none"],
              },
            },
          },
        }
      : {}),
  }),
});
