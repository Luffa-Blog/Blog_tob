import { defineConfig } from "umi";

export default defineConfig({
  plugins: ['@umijs/plugins/dist/react-query'],
  reactQuery: {},
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    {path:'/products',component:"products"},
  ],
  npmClient: 'pnpm',
});
