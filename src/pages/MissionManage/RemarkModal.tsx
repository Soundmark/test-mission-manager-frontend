import { Input, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}

function RemarkModal({ open, setOpen }: Readonly<P>) {
  const onCancel = () => {
    setOpen('');
  };

  return (
    <Modal title="编辑备注" open={open === '备注'} onCancel={onCancel}>
      <Input.TextArea className="mt-4"></Input.TextArea>
    </Modal>
  );
}

export default RemarkModal;
