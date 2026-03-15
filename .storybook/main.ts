import tailwindcss from "@tailwindcss/vite"
import type { StorybookConfig } from "@storybook/nextjs-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs"],

  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },

  staticDirs: ["../public"],

  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    return config
  },
}

export default config
