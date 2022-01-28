/*
 * @Description: 代码编辑器
 * @Author: xi_zi
 * @Date: 2022-01-25 22:47:36
 * @LastEditTime: 2022-01-28 10:42:00
 * @LastEditors: xi_zi
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { useMounted } from 'src/chrome/panel/hooks';
import { Select } from 'antd';
import styles from './index.less';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';

const { Option } = Select;

enum ELanguage {
  TS = 'typescript',
  JS = 'javascript',
  JSON = 'json',
}
export interface ICodeMirrorValue {
  language?: ELanguage;
  code?: string;
}
interface ICodeMirrorProps {
  value?: ICodeMirrorValue;
  onChange?: (value: ICodeMirrorValue) => void;
}

function CodeMirror({ value = {}, onChange }: ICodeMirrorProps) {
  const container = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<ELanguage>(ELanguage.JSON);
  const [editorIns, setEditorIns] = useState<editor.IStandaloneCodeEditor>(null);
  const [scale, setScale] = useState(false);

  useMounted(() => {
    const defaultCode = '{\n  "ret": 0,\n  "msg": "",\n  "data": []\n}';
    const editorIns: editor.IStandaloneCodeEditor = monaco.editor.create(container.current, {
      value: defaultCode,
      language: 'json',
      theme: 'vs-dark',
      automaticLayout: true,
    });
    setEditorIns(editorIns);
    triggerChange({ code: defaultCode });
    editorIns.onDidChangeModelContent(() => {
      const val: string = editorIns.getValue();
      triggerChange({ code: val });
      setCode(val);
    });
  });

  const triggerChange = useCallback(
    (changeValue: ICodeMirrorValue) => {
      onChange?.({ code, language, ...value, ...changeValue });
    },
    [code, language, onChange, value]
  );

  const onLanguageChange = useCallback(
    (newLanguage: ELanguage) => {
      triggerChange({ language: newLanguage });
      setLanguage(newLanguage);

      // 修改Monaco的语言
      monaco.editor.setModelLanguage(editorIns.getModel(), newLanguage);
    },
    [editorIns, triggerChange]
  );
  const handleScaleClick = useCallback(() => {
    setScale(!scale);
  }, [scale]);
  return (
    <div className={`${styles.wrapper} ${scale && styles.amplification}`}>
      <div className={styles.options}>
        <Select
          value={value.language || language}
          style={{ marginBottom: '8px' }}
          onChange={onLanguageChange}
          className={styles.language}>
          {Object.entries(ELanguage).map(([key, value]) => {
            return (
              <Option key={key} value={value}>
                {key}
              </Option>
            );
          })}
        </Select>
        <>
          {scale ? (
            <ShrinkOutlined className={styles.icon} onClick={handleScaleClick} />
          ) : (
            <ArrowsAltOutlined className={styles.icon} onClick={handleScaleClick} />
          )}
        </>
      </div>
      <div className={styles.monaco} ref={container}></div>
    </div>
  );
}
export default CodeMirror;
