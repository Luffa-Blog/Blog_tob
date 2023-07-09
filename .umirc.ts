import { defineConfig } from "umi";

export default defineConfig({


  plugins: ['@umijs/plugins/dist/react-query'],
  reactQuery: {},
  routes: [
    { path: "/login", component: "@/pages/Login" },

    {
      path: "/", component: "index",
      routes: [
        { path: "/", component: "@/pages/articel", name: "文章管理" },
        { path: "/docs", component: "@/pages/docs", name: '个人信息' },
        { path: '/products', component: "@/pages/products", name: '友链信息' },
        { path: "/lus", component: "@/pages/lus", name: "lus" },

      ]

    },

  ],


  npmClient: 'pnpm',


  proxy: {
    '/api': {
      'target': 'http://localhost:3000',
      'changeOrigin': true,

    },
    // '/api': {
    //   'target': 'http://sksigua.com/',
    //   'changeOrigin': true,
    
    // },
  }
});
