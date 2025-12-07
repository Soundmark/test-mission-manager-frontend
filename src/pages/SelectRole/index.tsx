import { history } from '@umijs/max';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useCertificate, useGetMemberList, useGetTeamList } from './service';

function Index() {
  const [form] = Form.useForm();
  const teamId = Form.useWatch('teamId', form);
  const memberId = Form.useWatch('memberId', form);

  const { run: getTeamList, data: teamList } = useGetTeamList();
  const { run: getMemberList, data: memberList } = useGetMemberList();
  const { run: certificate, loading: certificateLoading } = useCertificate();

  useEffect(() => {
    getTeamList();
  }, []);

  useEffect(() => {
    if (teamId) {
      getMemberList({ teamId });
    }
  }, [teamId]);

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
    <div
      className="fixed h-screen w-screen left-0 top-0 bg-gray-200 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div className="p-5 bg-white shadow-lg rounded-lg w-96">
        <div className="text-xl mb-4">选择身份</div>
        <Form form={form} labelCol={{ style: { width: 82 } }} labelAlign="left">
          <Form.Item
            label="你的团队"
            name={'teamId'}
            rules={[{ required: true }]}
          >
            <Select
              options={teamList?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="你是谁"
            name={'memberId'}
            rules={[{ required: true }]}
          >
            <Select
              options={memberList?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              disabled={!memberList?.length}
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
        <div className="flex justify-end">
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
              }
              history.push('/');
            }}
            loading={certificateLoading}
          >
            确认
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
