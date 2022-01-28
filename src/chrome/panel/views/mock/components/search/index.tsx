/*
 * @Description: 搜索
 * @Author: xi_zi
 * @Date: 2022-01-23 23:06:47
 * @LastEditTime: 2022-01-24 23:16:01
 * @LastEditors: xi_zi
 */

import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Rule } from 'antd/lib/form';
import { config } from './config';

export interface IFromItem {
  name: string;
  label: string;
  rules?: Rule[];
  element: JSX.Element;
}

interface IExpandProps {
  config: IFromItem[];
  setExpand: (expand: boolean) => void;
  expand: boolean;
}
function Expand({ config, setExpand, expand }: IExpandProps) {
  return (
    <>
      {config.length > 6 && (
        <a
          style={{ fontSize: 12 }}
          onClick={() => {
            setExpand(!expand);
          }}>
          {expand ? (
            <>
              <UpOutlined />
              收起
            </>
          ) : (
            <>
              <DownOutlined />
              展开
            </>
          )}
        </a>
      )}
    </>
  );
}

interface ISearchProps {
  btn?: JSX.Element;
}
const Search = ({ btn }: ISearchProps) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getFields = (config: IFromItem[]) => {
    const count = expand ? config.length : 6;
    return config.map((item: IFromItem, index) => {
      if (count < index) return null;
      return (
        <Col span={8} key={item.name}>
          <Form.Item name={item.name} label={item.label} rules={item.rules}>
            {item.element}
          </Form.Item>
        </Col>
      );
    });
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      className={`ant-advanced-search-form  box-wrapper ${styles.wrapper}`}
      onFinish={onFinish}>
      <Row gutter={24}>{getFields(config)}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ marginLeft: '8px' }}
            onClick={() => {
              form.resetFields();
            }}>
            清除
          </Button>
          <Expand config={config} setExpand={setExpand} expand={expand} />
          <span style={{ margin: '0 8px' }}>|</span>
          {btn}
        </Col>
      </Row>
    </Form>
  );
};
export default Search;
