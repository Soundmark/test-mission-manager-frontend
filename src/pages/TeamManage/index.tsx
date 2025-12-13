/* eslint-disable sonarjs/no-nested-functions */
import { getRoleInfo } from '@/utils/member';
import { Button, message, Modal, Table, TableColumnsType } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useGetMemberList, useGetTeamList } from '../SelectRole/service';
import AddMemberModal from './AddMemberModal';
import CreateModal from './CreateModal';
import MemberModal from './MemberModal';
import { useDeleteTeam } from './service';
import { Team } from './type';

function Index() {
  const [open, setOpen] = useState('');
  const [record, setRecord] = useState<Team>();

  const { run, data, loading } = useGetTeamList();
  const {
    run: getMemberList,
    data: memberList,
    loading: memberListLoading,
  } = useGetMemberList();
  const { run: deleteTeam } = useDeleteTeam();

  useEffect(() => {
    run();
    getMemberList();
  }, []);

  const columns = useMemo<TableColumnsType<any>>(() => {
    const role = getRoleInfo();
    return [
      {
        title: '名称',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 200,
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        width: 200,
        render: (t) => memberList?.find((item) => item.id === t)?.name,
      },
      {
        title: '操作',
        width: 200,
        render: (t, row) => {
          return (
            <div className="flex gap-4">
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => {
                  setRecord(row);
                  setOpen('查看成员');
                }}
              >
                查看成员
              </Button>
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => {
                  setRecord(row);
                  setOpen('添加成员');
                }}
              >
                添加成员
              </Button>
              <Button
                type="link"
                style={{ padding: 0 }}
                danger
                disabled={role?.id !== row.creator}
                onClick={() => {
                  if (
                    memberList?.some((item) => item.teamIds.includes(row.id))
                  ) {
                    message.error('该团队存在成员，不能删除！');
                    return;
                  }
                  Modal.confirm({
                    title: '确认删除团队？',
                    width: 350,
                    onOk: async () => {
                      await deleteTeam({ teamId: row.id });
                      run();
                    },
                  });
                }}
              >
                删除
              </Button>
            </div>
          );
        },
      },
    ];
  }, [data, memberList]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            setOpen('创建团队');
          }}
        >
          创建团队
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        rowKey={'id'}
        dataSource={data}
      ></Table>
      <CreateModal
        open={open}
        setOpen={setOpen}
        fetchData={run}
        data={data}
      ></CreateModal>
      <MemberModal
        record={record}
        open={open}
        setOpen={setOpen}
        data={memberList}
        loading={memberListLoading}
        fetchMemberList={getMemberList}
      ></MemberModal>
      <AddMemberModal
        open={open}
        setOpen={setOpen}
        record={record}
        memberList={memberList}
        fetchMemberList={getMemberList}
      ></AddMemberModal>
    </div>
  );
}

export default Index;
