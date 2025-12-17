export interface Mission {
  mrId: string;
  mrTitle: string;
  sourceMemberId: string;
  targetMemberId: string;
  mrInvolvers: string[];
  giturl: string;
  sourceBranch: string;
  targetBranch: string;
  createTime: string;
  updateTime: string;
  status: string;
  remark: string;
  teamId: string;
  closeReason: string;
}
