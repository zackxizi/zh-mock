/*
 * @Description: Search配置文件
 * @Author: xi_zi
 * @Date: 2022-01-23 23:23:06
 * @LastEditTime: 2022-01-23 23:53:55
 * @LastEditors: xi_zi
 */

import { Input } from 'antd';
import React from 'react';
import { IFromItem } from '.';

export const config: IFromItem[] = [
  {
    name: 'name',
    label: '名称',
    element: React.createElement(Input, {
      placeholder: '请输入名称',
    }),
  },
  {
    name: 'pathname',
    label: 'pathname',
    element: React.createElement(Input, {
      placeholder: '请输入pathname',
    }),
  },
  {
    name: 'domain',
    label: 'domain',
    element: React.createElement(Input, {
      placeholder: '请输入domain',
    }),
  },
];
