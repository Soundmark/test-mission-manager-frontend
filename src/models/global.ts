import { Member } from '@/pages/RoleManage/type';
import { createModel } from '@umijs/max';

interface P {
  role?: Member;
}

const globalModel = createModel<P>({
  namespace: 'global',
  state: {},
});

export default globalModel;
