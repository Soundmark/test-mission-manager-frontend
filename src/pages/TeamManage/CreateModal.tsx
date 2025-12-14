import globalModel from '@/models/global';
import { Form, Input, message, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useCreateTeam } from './service';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  data?: { name: string; id: string }[];
  fetchData: () => void;
}

function CreateModal({ open, setOpen, data, fetchData }: Readonly<P>) {
  const [form] = Form.useForm();

  const { run: create, loading: createLoading } = useCreateTeam();

  const onCancel = () => {
    setOpen('');
    form.resetFields();
  };

  const onOk = async () => {
    const { name } = await form.validateFields();
    if (data?.find((item) => item.name === name)) {
      message.error('该团队已存在！');
      return;
    }
    const { role } = globalModel.getState();
    const { id } = role!;
    await create({ name, creator: id });
    fetchData();
    onCancel();
  };

  return (
    <Modal
      width={400}
      title="创建团队"
      open={open === '创建团队'}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={createLoading}
    >
      <div className="pt-4">
        <Form form={form}>
          <Form.Item label="名称" name={'name'} rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default CreateModal;
