import { sse, useSSE } from '@tsintergy/mcoss-utils';
import { notification } from 'antd';
import { useEffect } from 'react';

function SSERegister() {
  useSSE((data) => {
    console.log(data);
    notification.info({ message: '收到了sse信息' });
  }, []);

  useEffect(() => {
    return () => {
      sse.disconnect();
    };
  }, []);

  return null;
}

export default SSERegister;
