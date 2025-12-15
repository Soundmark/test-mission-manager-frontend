import { Button, Dropdown, Table, TableColumnsType } from 'antd';
import { useMemo, useState } from 'react';
import CloseModal from './CloseModal';
import FinishModal from './FinishModal';
import ReassignModal from './ReassignModal';
import RemarkModal from './RemarkModal';

function Index() {
  const [open, setOpen] = useState('');

  // const { run: getMemberList } = useGetMemberList();

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
      },
      {
        title: '接受人',
        dataIndex: 'targetMemberId',
        width: 100,
      },
      {
        title: '当前流转',
        dataIndex: 'assignee',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
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
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 100,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 100,
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
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={[{ key: '1' }]}
        scroll={{ x: 'max-content' }}
      ></Table>
      <RemarkModal open={open} setOpen={setOpen}></RemarkModal>
      <CloseModal open={open} setOpen={setOpen}></CloseModal>
      <FinishModal open={open} setOpen={setOpen}></FinishModal>
      <ReassignModal open={open} setOpen={setOpen}></ReassignModal>
    </div>
  );
}

export default Index;
