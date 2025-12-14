import globalModel from '@/models/global';
import { levelEnum } from '@/utils/enum';
import { useSelector } from '@umijs/max';
import { Form, Input, Modal, Select, Switch } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useUpdateMember } from '../TeamManage/service';
import { useAddMember } from './service';

interface P {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fetchMember?: () => void;
  type?: 'create' | 'edit';
}

function CreateModal({
  open,
  setOpen,
  fetchMember,
  type = 'create',
}: Readonly<P>) {
  const [form] = Form.useForm();
  const needCertificate = Form.useWatch('needCertificate', form);
  const { role } = useSelector(globalModel.selector);

  const { run: addMember, loading } = useAddMember();
  const { run: updateMember, loading: updateLoading } = useUpdateMember();

  useEffect(() => {
    if (open && type === 'edit' && role) {
      form.setFieldsValue(role);
    }
  }, [open, role]);

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onOk = async () => {
    const formData = await form.validateFields();
    if (type === 'create') {
      await addMember(formData);
      fetchMember?.();
    } else {
      const newRole = { ...role, ...formData };
      await updateMember(newRole);
      globalModel.actions.update({ role: newRole });
      localStorage.setItem('tmm-role', JSON.stringify(newRole));
    }
    onCancel();
  };

  return (
    <Modal
      title="创建身份"
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      width={450}
      confirmLoading={loading || updateLoading}
    >
      <Form form={form} labelCol={{ span: 6 }} labelAlign="left">
        <Form.Item label="姓名" name={'name'} rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="gitlab用户名"
          name={'username'}
          rules={[{ required: true }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="公司邮箱"
          name={'email'}
          rules={[{ required: true, type: 'email' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="职位" name={'level'} rules={[{ required: true }]}>
          <Select
            options={levelEnum.slice(1).map((item) => ({
              label: item.text,
              value: item.id,
            }))}
          ></Select>
        </Form.Item>
        {type === 'create' && (
          <Form.Item label="设置密码" name={'needCertificate'}>
            <Switch></Switch>
          </Form.Item>
        )}
        {needCertificate && (
          <Form.Item
            label="密码"
            name={'password'}
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default CreateModal;
