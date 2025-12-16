import globalModel from '@/models/global';
import { missionStatusEnum } from '@/utils/enum';
import { commonEnum } from '@tsintergy/mcoss-utils';
import { useSelector } from '@umijs/max';
import { Button, Dropdown, Table, TableColumnsType, Tag, Tooltip } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useGetMemberList } from '../RoleManage/service';
import CloseModal from './CloseModal';
import FinishModal from './FinishModal';
import ReassignModal from './ReassignModal';
import RemarkModal from './RemarkModal';
import { useGetMissionList } from './service';

function Index() {
  const { role } = useSelector(globalModel.selector);
  const [open, setOpen] = useState('');

  const { run: getMemberList, data: memberList } = useGetMemberList();
  const {
    run: getMissionList,
    data: missionList,
    loading,
  } = useGetMissionList();

  useEffect(() => {
    getMemberList();
  }, []);

  useEffect(() => {
    if (role) {
      getMissionList({ memberId: role.id });
    }
  }, [role]);

  const memberMap = useMemo(() => {
    if (memberList?.length) {
      return Object.fromEntries(memberList.map((item) => [item.id, item]));
    }
    return {};
  }, [memberList]);

  const columns = useMemo<TableColumnsType<any>>(() => {
    return [
      {
        title: '任务id',
        dataIndex: 'mrId',
        width: 100,
      },
      {
        title: '标题',
        dataIndex: 'mrTitle',
        width: 300,
      },
      {
        title: '发起人',
        dataIndex: 'sourceMemberId',
        width: 100,
        render: (t) => {
          return memberMap[t].name;
        },
      },
      {
        title: '接受人',
        dataIndex: 'targetMemberId',
        width: 100,
        render: (t) => {
          return memberMap[t].name;
        },
      },
      {
        title: '当前流转',
        dataIndex: 'assignee',
        width: 100,
        render: (t) => {
          return memberMap[t].name;
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: (t) => {
          const text = commonEnum.getEnumText(missionStatusEnum, t);
          const colorMap: Record<string, string> = {
            待确认: 'gold',
            进行中: 'blue',
            完成: 'green',
            异常: 'red',
          };
          return <Tag color={colorMap[text!]}>{text}</Tag>;
        },
      },
      {
        title: '发起分支',
        dataIndex: 'sourceBranch',
        width: 100,
      },
      {
        title: '目标分支',
        dataIndex: 'targetBranch',
        width: 100,
      },
      {
        title: '仓库',
        dataIndex: 'giturl',
        width: 200,
        render: (t) => {
          return (
            <Tooltip title={t}>
              <div
                style={{ width: 200 - 32 }}
                className="overflow-hidden text-ellipsis whitespace-nowrap text-[#1668dc] cursor-pointer"
                onClick={() => {
                  if (t) {
                    window.open(t, '_blank');
                  }
                }}
              >
                {t}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 160,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 160,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 300,
      },
      {
        fixed: 'right',
        width: 160,
        render: () => {
          return (
            <div className="flex gap-4">
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => {
                  setOpen('备注');
                }}
              >
                备注
              </Button>
              <Dropdown
                menu={{
                  items: [
                    { label: '确认', key: '确认', onClick() {} },
                    {
                      label: '关闭',
                      key: '关闭',
                      onClick() {
                        setOpen('关闭');
                      },
                    },
                    {
                      label: '完成',
                      key: '完成',
                      onClick() {
                        setOpen('完成');
                      },
                    },
                  ],
                }}
              >
                <Button type="link" style={{ padding: 0 }}>
                  操作
                </Button>
              </Dropdown>
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => {
                  setOpen('改派');
                }}
              >
                改派
              </Button>
            </div>
          );
        },
      },
    ];
  }, [memberMap]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={missionList}
        scroll={{ x: 'max-content' }}
        loading={loading}
      ></Table>
      <RemarkModal open={open} setOpen={setOpen}></RemarkModal>
      <CloseModal open={open} setOpen={setOpen}></CloseModal>
      <FinishModal open={open} setOpen={setOpen}></FinishModal>
      <ReassignModal open={open} setOpen={setOpen}></ReassignModal>
    </div>
  );
}

export default Index;
