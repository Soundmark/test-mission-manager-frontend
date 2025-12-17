import { Form, Modal, Radio } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}

function CloseModal({ open, setOpen }: Readonly<P>) {
  const [form] = Form.useForm();

  const onCancel = () => {
    setOpen('');
  };

  const onOk = async () => {
    // const { reason } = await form.validateFields();
  };

  return (
    <Modal
      title="关闭原因"
      open={open === '关闭'}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form className="mt-4" form={form}>
        <Form.Item
          name={'reason'}
          rules={[{ required: true, message: '请选择关闭原因' }]}
        >
          <Radio.Group
            className="flex flex-col gap-2"
            options={[
              'bug修复或细微调整',
              '不小心直接合并了',
              '任务紧急不求质量只求快',
              '周末加班没有人手支撑',
            ]}
          ></Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CloseModal;
