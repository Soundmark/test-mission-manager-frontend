import { Form, Input, Modal } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useUpdateMission } from './service';
import { Mission } from './type';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  record?: Mission;
  fetchMissionList: () => void;
}

function RemarkModal({ open, setOpen, record, fetchMissionList }: Readonly<P>) {
  const [form] = Form.useForm();

  const { run: update, loading } = useUpdateMission();

  useEffect(() => {
    if (record) {
      form.setFieldValue('remark', record.remark);
    }
  }, [record]);

  const onCancel = () => {
    setOpen('');
    form.resetFields();
  };

  const onOk = async () => {
    const { remark } = await form.validateFields();
    await update({ ...record, remark });
    fetchMissionList();
    onCancel();
  };

  return (
    <Modal
      title="编辑备注"
      open={open === '备注'}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form form={form} className="mt-4">
        <Form.Item
          name={'remark'}
          rules={[{ required: true, message: '请输入备注内容' }]}
        >
          <Input.TextArea></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RemarkModal;
