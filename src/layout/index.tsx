import { Member } from '@/pages/SelectRole/type';
import { sse } from '@tsintergy/mcoss-utils';
import { Outlet } from '@umijs/max';
import { useEffect, useState } from 'react';
import SSERegister from './SSERegister';

function Layout() {
  const [identify, setIdentify] = useState(false);

  useEffect(() => {
    const role: Member = JSON.parse(localStorage.getItem('tmm-role') ?? '{}');

    if (role.id) {
      sse.setSSEUrl(`http://localhost:3000/api/notification/sse/${role.id}`);
      setIdentify(true);
    }
  }, []);

  return (
    <>
      {identify && <SSERegister></SSERegister>}
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
