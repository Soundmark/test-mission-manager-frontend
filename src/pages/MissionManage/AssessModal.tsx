import { Form, Modal, Radio, Table, TableColumnsType } from 'antd';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useUpdateMission } from './service';
import { Mission } from './type';

interface P {
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
  record?: Mission;
  fetchMissionList: () => void;
}

function AssessModal({ open, setOpen, record, fetchMissionList }: Readonly<P>) {
  const [form] = Form.useForm();

  const { run: update, loading } = useUpdateMission();

  const columns = useMemo<TableColumnsType<any>>(() => {
    return [
      {
        title: '类型',
        dataIndex: 'type',
        width: 100,
        onCell: (row) => {
          return {
            rowSpan: row.rowSpan ?? 0,
          };
        },
      },
      {
        title: '测试项',
        dataIndex: 'item',
        width: 300,
      },
      {
        title: '明细',
        dataIndex: 'options',
        width: 500,
        render: (t, row) => {
          return (
            <Form.Item style={{ margin: 0 }} name={row.item} initialValue={4}>
              <Radio.Group options={t}></Radio.Group>
            </Form.Item>
          );
        },
      },
    ];
  }, []);

  const dataSource = useMemo(() => {
    return [
      {
        type: '代码测试',
        item: 'eslint错误',
        rowSpan: 10,
        weight: 1,
        options: [
          { label: '存在', value: 0 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        item: 'typescript错误',
        weight: 1.5,
        options: [
          { label: '存在警告', value: 0 },
          { label: '有any类型', value: 1 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        item: 'sonar警告',
        weight: 1,
        options: [
          { label: '数组渲染缺乏key', value: 1 },
          { label: '函数层级过深', value: 2 },
          { label: '定义变量没有使用', value: 3 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        item: '组件结构',
        weight: 1,
        options: [
          { label: '文件命名错误', value: 0 },
          { label: '文件资源存放不正确', value: 1 },
          { label: '清晰正常', value: 4 },
        ],
      },
      {
        item: '魔法值',
        weight: 1,
        options: [
          { label: '有魔法值，没有备注', value: 1 },
          { label: '有魔法值,但有备注', value: 3 },
          { label: '没有魔法值', value: 4 },
        ],
      },
      {
        item: '组件数据处理',
        weight: 1,
        options: [
          { label: '直接写在组件中', value: 1 },
          { label: '写在副作用中', value: 4 },
        ],
      },
      {
        item: 'model使用情况',
        weight: 2,
        options: [
          { label: '页面结构简单', value: 1 },
          { label: '页面有简单组件分离', value: 2 },
          { label: '页面结构复杂，超过4个组件拆分', value: 3 },
          { label: '页面结构很复杂，有深层嵌套或没有使用model', value: 4 },
        ],
      },
      {
        item: '注释代码和console',
        weight: 0.5,
        options: [
          { label: '存在无用注释代码', value: 2 },
          { label: '存在无意义console', value: 3 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        item: '数组的sort或revese方法',
        weight: 1,
        options: [
          { label: '没有使用深拷贝', value: 1 },
          { label: '使用深拷贝或没有使用', value: 4 },
        ],
      },
      {
        item: '高度重复代码',
        weight: 2,
        options: [
          { label: '两个或以上文件高度相似', value: 0 },
          { label: '文件存在≥3段>5行或2段>20行代码高度相似', value: 1 },
          { label: '文件存在2段<20行代码高度相似', value: 2 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        type: '页面测试',
        item: 'UI还原度',
        rowSpan: 8,
        weight: 3,
        options: [
          { label: '明显差别', value: 0 },
          { label: '元素大小、距离、边距、圆角、颜色有明显差别', value: 1 },
          { label: '元素大小、距离、边距、圆角、颜色有轻微差别', value: 2 },
          { label: '字体轻微差别', value: 3 },
          { label: '难以看出差别', value: 4 },
        ],
      },
      {
        item: '页面协调性',
        weight: 2,
        options: [
          { label: '页面结构坍塌，没有边距，没有布局', value: 0 },
          { label: '明显边距不一致，布局不合理，元素不对齐', value: 1 },
          { label: '有少量边距或元素对齐问题', value: 2 },
          { label: '比较协调', value: 4 },
        ],
      },
      {
        item: '交互合理性',
        weight: 2,
        options: [
          { label: '没有按照UI或原型设计交互，日期组件清空报错', value: 0 },
          { label: '同类型交互不一致，数据展示不符合业务', value: 1 },
          { label: '涉及删除数据的操作没有提示', value: 2 },
          { label: '交互合理', value: 4 },
        ],
      },
      {
        item: '控制台报错',
        weight: 1,
        options: [
          { label: '存在和页面代码相关报错', value: 1 },
          { label: '第三方包的警告类信息或没有报错', value: 4 },
        ],
      },
      {
        item: '接口报错',
        weight: 2,
        options: [
          { label: '存在', value: 0 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        item: '样式污染',
        weight: 1.5,
        options: [
          { label: '存在', value: 0 },
          { label: '不存在', value: 4 },
        ],
      },
      {
        item: '非大屏窗口尺寸变化表现',
        weight: 1,
        options: [
          { label: '元素超出窗口', value: 1 },
          { label: '元素换行', value: 2 },
          { label: '轻微变化', value: 3 },
          { label: '响应式适配', value: 4 },
        ],
      },
      {
        item: '导入文件accept',
        weight: 1,
        options: [
          { label: '没有按照业务需要设置', value: 1 },
          { label: '合理设置或没有导入功能', value: 4 },
        ],
      },
    ];
  }, []);

  const onCancel = () => {
    setOpen('');
    form.resetFields();
  };

  const onOk = async () => {
    const formData = await form.validateFields();
    await update({
      ...record,
      assessment: formData,
      status: record?.status === 'prefinish' ? 'finish' : record?.status,
    });

    fetchMissionList();
    onCancel();
  };

  return (
    <Modal
      centered
      open={open === '评价'}
      title="评价"
      onCancel={onCancel}
      onOk={onOk}
      width={1200}
      maskClosable={false}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ y: 600 }}
        ></Table>
      </Form>
    </Modal>
  );
}

export default AssessModal;
