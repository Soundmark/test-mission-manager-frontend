import { useService } from '@umijs/max';

export interface Member {
  name: string;
  username: string;
  id: string;
  email: string;
  level: number;
  teamIds: string[];
  needCertificate: boolean;
}

export const useGetMemberList = () =>
  useService<{
    data: Member[];
  }>({ url: '/api/team/getMemberList' });
