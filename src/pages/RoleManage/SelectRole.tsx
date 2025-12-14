import globalModel from '@/models/global';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Team } from '../TeamManage/type';
import CreateModal from './CreateModal';
import { useCertificate, useGetMemberList } from './service';

interface P {
  teamList?: Team[];
}

function SelectRole({ teamList }: Readonly<P>) {
  const [form] = Form.useForm();
  const teamId = Form.useWatch('teamId', form);
  const memberId = Form.useWatch('memberId', form);
  const [open, setOpen] = useState(false);

  const { run: getMemberList, data: memberList } = useGetMemberList();
  const { run: certificate, loading: certificateLoading } = useCertificate();

  useEffect(() => {
    getMemberList();
  }, []);

  const fetchMember = () => {
    getMemberList({ teamId });
  };

  const options = useMemo(() => {
    if (memberList?.length) {
      return memberList
        .filter((item) => {
          if (teamId) {
            return item.teamIds.includes(teamId);
          }
          return true;
        })
        .map((item) => ({ label: item.name, value: item.id }));
    }
    return [];
  }, [memberList, teamId]);

  const needCertificate = useMemo(() => {
    if (memberId) {
      const target = memberList?.find((item) => item.id === memberId);
      if (target && target.needCertificate) {
        return true;
      }
    }
    return false;
  }, [memberId]);

  return (
    <div className="p-5 bg-[#272727] rounded-lg w-96">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl text-white">选择身份</div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          创建
        </Button>
      </div>
      <Form form={form} labelCol={{ style: { width: 82 } }} labelAlign="left">
        <Form.Item label="你的团队" name={'teamId'}>
          <Select
            options={teamList?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            allowClear
          ></Select>
        </Form.Item>
        <Form.Item
          label="你是谁"
          name={'memberId'}
          rules={[{ required: true }]}
        >
          <Select
            options={options}
            showSearch
            filterOption={(input, option) => !!option?.label.includes(input)}
          ></Select>
        </Form.Item>
        {needCertificate && (
          <Form.Item
            label="密码"
            name={'password'}
            rules={[{ required: true }]}
          >
            <Input type="password"></Input>
          </Form.Item>
        )}
      </Form>
      <div className="flex justify-end gap-4">
        <Button
          type="primary"
          onClick={async () => {
            const { memberId, password } = await form.validateFields();
            if (needCertificate) {
              const res = await certificate({ id: memberId, password });
              if (!res) {
                message.error('密码错误！');
                return;
              }
            }
            const target = memberList?.find((item) => item.id === memberId);
            if (target) {
              localStorage.setItem('tmm-role', JSON.stringify(target));
              globalModel.actions.update({ role: target });
            }
          }}
          loading={certificateLoading}
        >
          确认
        </Button>
      </div>

      <CreateModal
        open={open}
        setOpen={setOpen}
        fetchMember={fetchMember}
      ></CreateModal>
    </div>
  );
}

export default SelectRole;
