import globalModel from '@/models/global';
import { useGetMemberList } from '@/services/member';
import { useSelector } from '@umijs/max';
import { useEffect } from 'react';

export const useMemberList = () => {
  const { memberList } = useSelector(globalModel.selector);

  const { run: getMemberList, loading, data } = useGetMemberList();

  useEffect(() => {
    if (!memberList) {
      getMemberList();
    }
  }, []);

  useEffect(() => {
    if (data) {
      globalModel.actions.update({ memberList: data });
    }
  }, [data]);

  return { memberList, getMemberList, loading };
};
