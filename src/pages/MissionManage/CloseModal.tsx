import { Modal, Radio } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}

function CloseModal({ open, setOpen }: Readonly<P>) {
  const onCancel = () => {
    setOpen('');
  };

  return (
    <Modal title="关闭原因" open={open === '关闭'} onCancel={onCancel}>
      <Radio.Group
        className="mt-4"
        options={['bug修复或细微调整', '不小心直接合并了']}
      ></Radio.Group>
    </Modal>
  );
}

export default CloseModal;
