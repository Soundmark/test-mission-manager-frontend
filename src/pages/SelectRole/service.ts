import { useService } from '@umijs/max';

export const useGetTeamList = () =>
  useService<{ data: { name: string; id: string }[] }>({
    url: '/api/team/getTeamList',
  });

export const useGetMemberList = () =>
  useService<{
    data: {
      name: string;
      id: string;
      email: string;
      level: number;
      teamId: string;
      needCertificate: boolean;
    }[];
  }>({ url: '/api/team/getMemberList' });

export const useCertificate = () =>
  useService<{ data: boolean }>({
    url: '/api/team/certificate',
    method: 'post',
  });
