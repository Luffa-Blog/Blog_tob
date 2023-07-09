

import { ProLayout } from '@ant-design/pro-layout';
import { Link, Outlet, useAppData, useLocation } from 'umi';
import {loginDetection} from "../utils/loginDetection"



import logo from '@/assets/image/logo.svg'





export default function index() {




  loginDetection()
  const { clientRoutes } = useAppData();
  const location = useLocation();


  // console.log(clientRoutes[1]);
  const chick=()=>{
    console.log(1);
    
  }

  return (
    <ProLayout
      logo={logo}
      
      route={clientRoutes[1]}
      location={location}
      title="SK-Luffa"
      onMenuHeaderClick={chick}//点击头部触发
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            <Link to={menuItemProps.path} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          );
        }
        return defaultDom;
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
