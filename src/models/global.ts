import { Member } from '@/services/member';
import { createModel } from '@umijs/max';

interface P {
  role?: Member;
  memberList?: Member[];
}

const globalModel = createModel<P>({
  namespace: 'global',
  state: {},
});

export default globalModel;
