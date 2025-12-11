import { sse } from '@tsintergy/mcoss-utils';
import { request } from '@umijs/max';
import { Button } from 'antd';

const HomePage: React.FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          sse.disconnect();
        }}
      >
        sse dis
      </Button>
      <Button
        onClick={() => {
          const role = JSON.parse(localStorage.getItem('tmm-role') ?? '{}');
          if (role.id) {
            request(`/api/webhook/triggerNotification?memberId=${role.id}`);
          }
        }}
      >
        send msg
      </Button>
    </div>
  );
};

export default HomePage;
