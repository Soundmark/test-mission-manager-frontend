import { Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}

function FinishModal({ open, setOpen }: Readonly<P>) {
  const onCancel = () => {
    setOpen('');
  };

  return (
    <Modal title="完成评价" open={open === '完成'} onCancel={onCancel}>
      2
    </Modal>
  );
}

export default FinishModal;
