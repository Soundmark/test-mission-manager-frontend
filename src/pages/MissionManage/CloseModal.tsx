import { missionStatusEnum } from '@/utils/enum';
import { commonEnum } from '@tsintergy/mcoss-utils';
import { Form, Modal, Radio } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useUpdateMission } from './service';
import { Mission } from './type';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  record?: Mission;
  fetchMissionList: () => void;
}

function CloseModal({ open, setOpen, record, fetchMissionList }: Readonly<P>) {
  const [form] = Form.useForm();

  const { run: update, loading } = useUpdateMission();

  const onCancel = () => {
    setOpen('');
    form.resetFields();
  };

  const onOk = async () => {
    const { reason } = await form.validateFields();
    await update({
      ...record,
      status: commonEnum.getEnumId(missionStatusEnum, '关闭'),
      closeReason: reason,
    });
    fetchMissionList();
    onCancel();
  };

  return (
    <Modal
      title="关闭原因"
      open={open === '关闭'}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={loading}
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
