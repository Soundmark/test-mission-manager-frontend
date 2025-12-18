import { useMemberList } from '@/hooks/useMemberList';
import globalModel from '@/models/global';
import { missionStatusEnum } from '@/utils/enum';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { commonEnum } from '@tsintergy/mcoss-utils';
import { useSelector } from '@umijs/max';
import { Button, Dropdown, Table, TableColumnsType, Tag, Tooltip } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { useEffect, useMemo, useState } from 'react';
import AssessModal from './AssessModal';
import CloseModal from './CloseModal';
import ReassignModal from './ReassignModal';
import RemarkModal from './RemarkModal';
import { useGetMissionList, useUpdateMission } from './service';
import { Mission } from './type';

function Index() {
  const { role } = useSelector(globalModel.selector);
  const [open, setOpen] = useState('');
  const [record, setRecord] = useState<Mission>();

  const { memberList } = useMemberList();
  const {
    run: getMissionList,
    data: missionList,
    loading,
  } = useGetMissionList();
  const { run: update } = useUpdateMission();

  const fetchMissonList = () => {
    if (role) {
      getMissionList({ memberId: role.id });
    }
  };

  useEffect(() => {
    fetchMissonList();
  }, [role]);

  const memberIdMap = useMemo(() => {
    if (memberList?.length) {
      return Object.fromEntries(memberList.map((item) => [item.id, item]));
    }
    return {};
  }, [memberList]);

  const memberUsernameMap = useMemo(() => {
    if (memberList?.length) {
      return Object.fromEntries(
        memberList.map((item) => [item.username, item]),
      );
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
          return memberIdMap[t]?.name;
        },
      },
      {
        title: '接受人',
        dataIndex: 'targetMemberId',
        width: 100,
        render: (t) => {
          return memberIdMap[t]?.name;
        },
      },
      {
        title: (
          <div className="flex gap-2">
            <span>参与者</span>
            <Tooltip title="参与过这个mr的gitlab用户">
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        ),
        dataIndex: 'mrInvolvers',
        width: 200,
        render: (t: string[]) => {
          return t
            .map((item) => memberUsernameMap[item]?.name ?? item)
            .join('、');
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
            关闭: 'volcano',
            待评价: 'magenta',
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
        render: (t, row) => {
          const menuItems = (
            [
              row.status === 'prepare' &&
                row.sourceMemberId === role?.id && {
                  label: '确认',
                  key: '确认',
                  async onClick() {
                    await update({ ...row, status: 'open' });
                    fetchMissonList();
                  },
                },
              row.status === 'prepare' &&
                row.sourceMemberId === role?.id && {
                  label: '关闭',
                  key: '关闭',
                  onClick() {
                    setRecord(row);
                    setOpen('关闭');
                  },
                },
              ['open', 'prefinish'].includes(row.status) &&
                row.targetMemberId === role?.id && {
                  label: '评价',
                  key: '评价',
                  onClick() {
                    setRecord(row);
                    setOpen('评价');
                  },
                },
            ] as ItemType[]
          ).filter(Boolean);
          return (
            <div className="flex gap-4">
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => {
                  setRecord(row);
                  setOpen('备注');
                }}
              >
                备注
              </Button>
              {!!menuItems.length && (
                <Dropdown
                  menu={{
                    items: menuItems,
                  }}
                >
                  <Button type="link" style={{ padding: 0 }}>
                    操作
                  </Button>
                </Dropdown>
              )}
              {((row.status !== 'finish' && row.targetMemberId === role?.id) ||
                (row.status === 'prepare' &&
                  row.sourceMemberId === role?.id)) && (
                <Button
                  type="link"
                  style={{ padding: 0 }}
                  onClick={() => {
                    setRecord(row);
                    setOpen('改派');
                  }}
                >
                  改派
                </Button>
              )}
            </div>
          );
        },
      },
    ];
  }, [memberIdMap, memberUsernameMap]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={missionList?.toReversed()}
        scroll={{ x: 'max-content' }}
        loading={loading}
      ></Table>
      <RemarkModal
        open={open}
        setOpen={setOpen}
        record={record}
        fetchMissionList={fetchMissonList}
      ></RemarkModal>
      <CloseModal
        open={open}
        setOpen={setOpen}
        record={record}
        fetchMissionList={fetchMissonList}
      ></CloseModal>
      <AssessModal
        open={open}
        setOpen={setOpen}
        record={record}
        fetchMissionList={fetchMissonList}
      ></AssessModal>
      <ReassignModal
        open={open}
        setOpen={setOpen}
        record={record}
        fetchMissonList={fetchMissonList}
      ></ReassignModal>
    </div>
  );
}

export default Index;
