import React,{Component,Fragment} from 'react';
import {
  Drawer,
  Radio ,
  Row,
  Col,
  Divider,
  Affix,
  Checkbox ,
  Input,
  Button,
  Slider,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import update from 'immutability-helper';
import {SpanLH32,RowMB10} from '../../styled';
import {FormConsume} from '../../Context';
import LabelEditor from './LabelEditor';//编辑label
import FieldNameInput from './FieldNameInput';//编辑fieldName
import RequiredCheckBox from './RequiredCheckBox';//必填复选框
import DataOptions from './DataOptions';//特殊元素选项
import OptionRowShow from './OptionRowShow';//特殊元素选项
import {inject,observer} from 'mobx-react';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('store')
@observer
export default class EditingContent extends Component{
  state={
    position:`right`,
  }
  positionChange=(e)=>{
    this.setState({position:e.target.value})
  }

  onClose=()=>{
    const {
      props:{
        store,
      }
    }=this;
    store.editing=false;
  }

  render(){
    console.log(`EditingContent render`);
    const {
      props:{
        form,
        store:{
          editing:visible,
          editingData:{
            type,
          },
        },
      },
      state:{
        position,
      },
      positionChange,
      setGroupData,
      addGroupData,
      deleteGroupData,
    }=this;
    return (
      <Drawer
        style={{background:`white`}}
        onClose={this.onClose}
        mask={false}
        title={
          <RadioGroup
            onChange={positionChange}
            value={position}
            >
            <RadioButton value="top">top</RadioButton>
            <RadioButton value="right">right</RadioButton>
            <RadioButton value="bottom">bottom</RadioButton>
            <RadioButton value="left">left</RadioButton>
          </RadioGroup>
        }
        width={500}
        height={350}
        visible={visible}
        placement={position}
      >
        <Divider orientation="left">传值字段</Divider>
          <FieldNameInput
          />
        <Divider orientation="left">显示字段名</Divider>
          <LabelEditor/>
        <Divider orientation="left">是否必填</Divider>
        <SpanLH32>
          <RequiredCheckBox form={form}/>
        </SpanLH32>
        {do{
          if(type==`checkboxGroup`||type==`radio`||type==`select`){
            <Fragment>
              <Divider orientation="left">选项</Divider>
              <DataOptions />
              {do{
                if(type==`checkboxGroup`||type==`radio`){
                  <Fragment>
                    <Divider orientation="left">每行展示数量</Divider>
                    <OptionRowShow/>
                  </Fragment>
                }
              }}
            </Fragment>
          }
        }}
      </Drawer>
    )
  }
}
