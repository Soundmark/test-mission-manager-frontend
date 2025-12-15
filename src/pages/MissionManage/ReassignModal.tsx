import { Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}

function ReassignModal({ open, setOpen }: Readonly<P>) {
  const onCancel = () => {
    setOpen('');
  };

  return (
    <Modal title="改派" open={open === '改派'} onCancel={onCancel}>
      2
    </Modal>
  );
}

export default ReassignModal;
