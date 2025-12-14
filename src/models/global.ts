import { Member } from '@/pages/SelectRole/type';
import { createModel } from '@umijs/max';

interface P {
  role?: Member;
}

const globalModel = createModel<P>({
  namespace: 'global',
  state: {},
});

export default globalModel;
