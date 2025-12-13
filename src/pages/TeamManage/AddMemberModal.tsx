import { Form, Modal, Select } from 'antd';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Member } from '../SelectRole/type';
import { useUpdateMember } from './service';
import { Team } from './type';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  record?: Team;
  memberList?: Member[];
  fetchMemberList: () => void;
}

function AddMemberModal({
  open,
  setOpen,
  memberList,
  record,
  fetchMemberList,
}: Readonly<P>) {
  const [form] = Form.useForm();

  const { run, loading } = useUpdateMember();

  const onCancel = () => {
    setOpen('');
    form.resetFields();
  };

  const onOk = async () => {
    const { memberId } = await form.validateFields();
    const target = memberList?.find((item) => item.id === memberId);
    if (target) {
      await run({ ...target, teamIds: [...target.teamIds, record!.id] });
      fetchMemberList();
    }
    onCancel();
  };

  const options = useMemo(() => {
    if (memberList?.length && record) {
      return memberList
        .filter((item) => !item.teamIds.includes(record.id))
        .map((item) => ({ label: item.name, value: item.id }));
    }
    return [];
  }, [memberList, record]);

  return (
    <Modal
      title="添加成员"
      open={open === '添加成员'}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={loading}
      width={400}
    >
      <div className="pt-4">
        <Form form={form}>
          <Form.Item
            label="选择成员"
            name={'memberId'}
            rules={[{ required: true }]}
          >
            <Select options={options}></Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default AddMemberModal;
