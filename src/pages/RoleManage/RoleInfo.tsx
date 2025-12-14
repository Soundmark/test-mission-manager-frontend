import globalModel from '@/models/global';
import { levelEnum } from '@/utils/enum';
import { commonEnum } from '@tsintergy/mcoss-utils';
import { useSelector } from '@umijs/max';
import { Button, Modal, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { Team } from '../TeamManage/type';
import CreateModal from './CreateModal';
import { Member } from './type';

interface P {
  teamList?: Team[];
}

function RoleInfo({ teamList }: Readonly<P>) {
  const { role } = useSelector(globalModel.selector);
  const [open, setOpen] = useState(false);

  const config = useMemo(() => {
    const teamMap = Object.fromEntries(
      teamList?.map((item) => [item.id, item.name]) ?? [],
    );
    return [
      { label: '姓名', name: 'name' },
      { label: '用户名', name: 'username' },
      {
        label: '职位',
        name: 'level',
        cb: (v: string) => {
          return commonEnum.getEnumText(levelEnum, v);
        },
      },
      { label: '邮箱', name: 'email' },
      {
        label: '所属团队',
        name: 'teamIds',
        cb: (teamIds: string[]) => {
          return teamIds.map((item) => <Tag key={item}>{teamMap[item]}</Tag>);
        },
      },
    ];
  }, [teamList]);

  return (
    <div className="p-5 bg-[#272727] rounded-lg w-96">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl text-white">身份信息</div>
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            修改信息
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: '切换身份会清空现有身份信息，是否继续？',
                onOk: () => {
                  localStorage.removeItem('tmm-role');
                  globalModel.actions.update({ role: undefined });
                },
              });
            }}
          >
            切换身份
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {config.map((item) => {
          const value = role![item.name as keyof Member] ?? '--';
          return (
            <div key={item.name} className="flex items-start gap-2">
              <span className="text-gray-400 inline-block w-20">
                {item.label}：
              </span>
              <div
                className="text-white flex flex-wrap gap-y-2"
                style={{ width: 'calc(100% - 80px - 8px)' }}
              >
                {item.cb?.(value as any) ?? value}
              </div>
            </div>
          );
        })}
      </div>
      <CreateModal open={open} setOpen={setOpen} type="edit"></CreateModal>
    </div>
  );
}

export default RoleInfo;
