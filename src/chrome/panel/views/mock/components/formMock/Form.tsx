/*
 * @Description: 表单
 * @Author: xi_zi
 * @Date: 2022-01-25 21:20:34
 * @LastEditTime: 2022-01-28 09:56:38
 * @LastEditors: xi_zi
 */
import React, { useCallback } from 'react';
import { Form, Input, Button, Select, Tooltip, Radio, Switch } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import CodeMirror, { ICodeMirrorValue } from '../codeMirror';
import { RuleObject } from 'antd/lib/form';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
interface IFormProps {
  domain: string; // 域名 http(s)://xxxx.xx
  path: string; // /xxx/xxx
  method: string; // 请求方法
  headers: Record<string, string>; // 响应头部
  status: number; // 响应状态
  open: boolean; // 是否开启
  body: Record<string, string>; // 响应
  responseTime: number; // 响应时间
  desc: string; // 描述
}

function FormInput() {
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  const checkBody = useCallback((_: RuleObject, { code }: ICodeMirrorValue = { code: '' }) => {
    if (code) return Promise.resolve();
    return Promise.reject(new Error('"body" is is required'));
  }, []);

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="domain"
        label={
          <>
            domain
            <Tooltip placement="top" title="格式为：http(s)://xxxx.xx">
              <QuestionCircleOutlined style={{ cursor: 'pointer', marginLeft: '5px' }} />
            </Tooltip>
          </>
        }
        rules={[{ required: true }]}>
        <Input placeholder="请输入域名" />
      </Form.Item>

      <Form.Item
        name="path"
        label={
          <>
            path
            <Tooltip placement="top" title="格式为：/xxx/xxx">
              <QuestionCircleOutlined style={{ cursor: 'pointer', marginLeft: '5px' }} />
            </Tooltip>
          </>
        }
        rules={[{ required: true }]}>
        <Input placeholder="请输入路径" />
      </Form.Item>

      <Form.Item name="method" label="method" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="GET">GET</Radio>
          <Radio value="POST">POST</Radio>
          <Radio value="PUT">PUT</Radio>
          <Radio value="DELETE">DELETE</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="open" label="open">
        <Switch checked />
      </Form.Item>

      <Form.Item name="body" label="body" rules={[{ required: true, validator: checkBody }]}>
        <CodeMirror />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormInput;
