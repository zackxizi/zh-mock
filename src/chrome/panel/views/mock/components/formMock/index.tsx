/*
 * @Description: 新增编辑mock配置
 * @Author: xi_zi
 * @Date: 2022-01-24 22:59:34
 * @LastEditTime: 2022-01-25 22:11:02
 * @LastEditors: xi_zi
 */
import { Drawer } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import FormInput from './Form';
import styles from './index.less';

interface IFormMockProps {
  visible: boolean;
  title: string;
  onClose?: () => void;
}
function FormMock({ visible, title, onClose }: IFormMockProps) {
  const [vi, setVi] = useState<boolean>(false);
  const handleClose = useCallback(() => {
    setVi(false);
    if (onClose) onClose();
  }, [onClose]);
  useEffect(() => {
    setVi(visible);
  }, [visible]);
  return (
    <div className={styles.formMock}>
      <Drawer size="large" title={title} placement="right" onClose={handleClose} visible={vi}>
        <FormInput />
      </Drawer>
    </div>
  );
}
export default FormMock;
