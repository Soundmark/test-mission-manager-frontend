/* eslint-disable sonarjs/no-nested-functions */
import { levelEnum } from '@/utils/enum';
import { getRoleInfo } from '@/utils/member';
import { commonEnum } from '@tsintergy/mcoss-utils';
import { Button, Modal, Popconfirm, Table, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Member } from '../SelectRole/type';
import { useUpdateMember } from './service';
import { Team } from './type';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  record?: Team;
  data?: Member[];
  loading: boolean;
  fetchMemberList: () => void;
}

function MemberModal({
  open,
  setOpen,
  record,
  data,
  loading,
  fetchMemberList,
}: Readonly<P>) {
  const { run } = useUpdateMember();

  const onCancel = () => {
    setOpen('');
  };

  const columns = useMemo<TableColumnsType<any>>(() => {
    const role = getRoleInfo();
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
      },
      {
        title: 'gitlab用户名',
        dataIndex: 'username',
        width: 120,
      },
      {
        title: '职位',
        dataIndex: 'level',
        width: 100,
        render: (t) => commonEnum.getEnumText(levelEnum, t),
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 200,
      },
      {
        title: '操作',
        width: 100,
        render: (t, row) => {
          return (
            <Popconfirm
              disabled={role?.id !== record?.creator}
              title="确认删除成员？"
              onConfirm={async () => {
                await run({
                  ...row,
                  teamIds: row.teamIds.filter(
                    (item: string) => item !== record!.id,
                  ),
                });
                fetchMemberList();
              }}
            >
              <Button
                type="link"
                style={{ padding: 0 }}
                disabled={role?.id !== record?.creator}
                danger
              >
                删除
              </Button>
            </Popconfirm>
          );
        },
      },
    ];
  }, [open]);

  const dataSource = useMemo(() => {
    if (data?.length && record) {
      return data.filter((item) => item.teamIds.includes(record.id));
    }
    return [];
  }, [record, data]);

  return (
    <Modal
      open={open === '查看成员'}
      title="查看成员"
      onCancel={onCancel}
      width={900}
      footer={null}
    >
      <Table
        columns={columns}
        loading={loading}
        rowKey={'id'}
        dataSource={dataSource}
      ></Table>
    </Modal>
  );
}

export default MemberModal;
