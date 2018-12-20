import FormBuilder from 'react-form-builder-antd';
import React,{Fragment,Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DevTools from 'mobx-react-devtools';
import { Radio,Modal } from 'antd';
import {
  observable,
  action,
} from 'mobx';
import {
  observer
} from 'mobx-react';
const {
  Group,
  Button ,
}=Radio;



const data={
  "data": [
    {
      "type": "row",
      "name": "行",
      "demo": false,
      "fieldName": "row2",
      "label": "row2",
      "required": false,
      "requiredMessage": "",
      "children": [
        {
          "type": "col",
          "name": "列",
          "demo": true,
          "children": [],
          "span": 24
        }
      ]
    },
    {
      "type": "row",
      "name": "行",
      "demo": false,
      "fieldName": "row3",
      "label": "row3",
      "required": false,
      "requiredMessage": "",
      "children": []
    },
    {
      "type": "inputNumber",
      "name": "数字输入框",
      "demo": false,
      "fieldName": "inputNumber4",
      "label": "inputNumber4",
      "required": false,
      "requiredMessage": ""
    },
    {
      "type": "input",
      "name": "文本输入框",
      "demo": false,
      "fieldName": "input5",
      "label": "input5",
      "required": false,
      "requiredMessage": ""
    },
    {
      "type": "radio",
      "name": "单选框",
      "demo": false,
      "fieldName": "radio6",
      "label": "radio6",
      "required": false,
      "requiredMessage": "",
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
      "type": "checkbox",
      "name": "复选框",
      "demo": false,
      "fieldName": "checkbox7",
      "label": "checkbox7",
      "required": false,
      "requiredMessage": ""
    },
    {
      "type": "checkboxGroup",
      "name": "复选框组",
      "demo": false,
      "fieldName": "checkboxGroup8",
      "label": "checkboxGroup8",
      "required": false,
      "requiredMessage": "",
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
      "fieldName": "select9",
      "label": "select9",
      "required": false,
      "requiredMessage": "",
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
  "submitUrl": "1aaaaaaaaa",
  "index": 10
}

const Container=styled.div`
  ${'' /* position: absolute;//不建议这样使用，元素内部固钉会出问题
  left :50%;
  transform: translateX(-50%); */}
  float:left;
  width:calc( 100% - 50px )
`;
const ControllContainer=styled.div`
  float:left;
`;


@observer
class App extends Component{
  @observable design=true;
  @action handleChange=(e)=>{
    const {value}=e.target;
    this.design=value;
  }
  onSave=(param)=>{
    Modal.info({title:`保存表单`,content:<pre>{JSON.stringify(param,null,2)}</pre>});
  }
  render(){
    return (
      <Fragment>
        <ControllContainer>
          {/* 暂时不想提供内部预览接口 */}
          <Group
            buttonStyle="solid"
            value={this.design}
            onChange={this.handleChange}
          >
            <Button value={true}>
              开发
            </Button>
            <Button value={false}>
              预览
            </Button>
          </Group>
        </ControllContainer>
        <Container>
          <FormBuilder
            priviewStyle={{
              border:`1px solid #d3d3d3`,
              boxShadow: `-3px -1px 20px 2px #d3d3d3`,
              borderRadius: 5,
            }}
            elementStyle={{

            }}
            onSave={this.onSave}
            simple={true}
            developer={true}
            design={this.design}
            data={data}
          />
          <DevTools/>
        </Container>
      </Fragment>
    )
  }
}

ReactDOM.render(
  <App/>
,document.getElementById(`root`))
