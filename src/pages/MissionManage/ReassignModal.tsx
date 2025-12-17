import { useMemberList } from '@/hooks/useMemberList';
import { Form, Modal, Select } from 'antd';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useUpdateMission } from './service';
import { Mission } from './type';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  record?: Mission;
  fetchMissonList: () => void;
}

function ReassignModal({
  open,
  setOpen,
  record,
  fetchMissonList,
}: Readonly<P>) {
  const [form] = Form.useForm();
  const { memberList } = useMemberList();

  const { run: update, loading } = useUpdateMission();

  const options = useMemo(() => {
    if (record && memberList) {
      return memberList
        .filter(
          (item) =>
            item.id !== record.targetMemberId &&
            item.teamIds.includes(record.teamId),
        )
        .map((item) => ({ label: item.name, value: item.id }));
    }
    return [];
  }, [record, memberList]);

  const onCancel = () => {
    setOpen('');
    form.resetFields();
  };

  const onOk = async () => {
    const { memberId } = await form.validateFields();
    await update({ ...record, targetMemberId: memberId });
    fetchMissonList();
    onCancel();
  };

  return (
    <Modal
      title="改派"
      open={open === '改派'}
      onCancel={onCancel}
      width={300}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form form={form} className="mt-4">
        <Form.Item
          name="memberId"
          rules={[{ required: true, message: '请选择要改派的成员' }]}
        >
          <Select options={options}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ReassignModal;
