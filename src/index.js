import FormBuilder from '@/main';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Container=styled.div`
  ${'' /* position: absolute;//不建议这样使用，元素内部固钉会出问题
  left :50%;
  transform: translateX(-50%); */}
`;

const data={
  "data": [
    {
      "type": "inputNumber",
      "name": "数字输入框",
      "demo": false,
      "fieldName": "inputNumber0",
      "label": "inputNumber0"
    },
    {
      "type": "input",
      "name": "文本输入框",
      "demo": false,
      "fieldName": "input1",
      "label": "input1"
    },
    {
      "type": "input",
      "name": "文本输入框",
      "demo": false,
      "fieldName": "input2",
      "label": "input2"
    },
    {
      "type": "checkbox",
      "name": "复选框",
      "demo": false,
      "fieldName": "checkbox3gg",
      "label": "<p><strong><em><ins>checkbox3ggf</ins></em></strong></p>\n"
    },
    {
      "type": "checkboxGroup",
      "name": "复选框组",
      "demo": false,
      "fieldName": "checkboxGroup4",
      "label": "checkboxGroup4",
      "options": [
        {
          "label": "default1",
          "value": "default1Value"
        },
        {
          "label": "default2",
          "value": "default2Value"
        }
      ],
      "optionRowShow": 3
    },
    {
      "type": "select",
      "name": "下拉框",
      "demo": false,
      "fieldName": "select5",
      "label": "select5",
      "options": [
        {
          "label": "default1",
          "value": "default1Value"
        },
        {
          "label": "default2",
          "value": "default2Value"
        }
      ]
    }
  ],
  "url": "1aaaaaaaaa"
}

ReactDOM.render(
  <Container>
    <FormBuilder
      developer={true}
      design={false}
      data={data}
    />
  </Container>
,root)
