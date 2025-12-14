import globalModel from '@/models/global';
import { Member } from '@/pages/SelectRole/type';
import { sse } from '@tsintergy/mcoss-utils';
import { history, Icon, Outlet, useLocation, useSelector } from '@umijs/max';
import { Menu } from 'antd';
import { useEffect } from 'react';
import { routes } from '../../config/routes';
import SSERegister from './SSERegister';

function Layout() {
  const { role } = useSelector(globalModel.selector);
  const { pathname } = useLocation();

  useEffect(() => {
    const role: Member = JSON.parse(localStorage.getItem('tmm-role') ?? '{}');
    if (role.id) {
      globalModel.actions.update({ role });
    }
  }, []);

  useEffect(() => {
    if (role) {
      sse.setSSEUrl(`http://localhost:3000/api/notification/sse/${role.id}`);
    }
  }, [role]);

  return (
    <div className="bg-[#141414] h-screen flex">
      {role && <SSERegister></SSERegister>}
      <div className="h-full">
        <div
          className="w-[226px] flex items-center p-4 gap-2"
          style={{ borderInlineEnd: '1px solid rgba(253,253,253,0.12)' }}
        >
          <div className="relative">
            <div className="absolute bottom-px left-0 bg-white w-[18px] h-4"></div>
            <Icon
              icon="local:test"
              width="24"
              height="24"
              className="relative z-10"
            ></Icon>
          </div>
          <span className="text-white">test-mission-manager</span>
        </div>
        <Menu
          style={{ height: 'calc(100% - 56px)' }}
          selectedKeys={[pathname]}
          onSelect={(info) => {
            history.push(info.key);
          }}
          items={routes[0].routes?.map((item) => ({
            label: item.name,
            key: item.path,
          }))}
        ></Menu>
      </div>
      <div className="h-full p-8" style={{ width: 'calc(100% - 226px)' }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Layout;
