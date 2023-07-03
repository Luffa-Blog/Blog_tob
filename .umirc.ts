import { defineConfig } from "umi";

export default defineConfig({


  plugins: ['@umijs/plugins/dist/react-query'],
  reactQuery: {},
  routes: [
    { path: "/login", component: "@/pages/Login" },

    {
      path: "/", component: "index",
      routes: [
        { path: "/", component: "@/pages/pps", name: "home" },
        { path: "/docs", component: "@/pages/docs", name: 'docs' },
        { path: '/products', component: "@/pages/products", name: 'products' },
        { path: "/lus", component: "@/pages/lus", name: "lus" },
        { path: "/pps", component: "@/pages/pps", name: "pps" },

      ]

    },

  ],


  npmClient: 'pnpm',


  proxy: {
    '/api': {
      'target': 'http://sksigua.com/',
      'changeOrigin': true,
    
    },
  }
});
