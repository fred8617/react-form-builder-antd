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
import {SpanLH32,RowMB10} from '@/styled';
import {FormConsume} from '@/Context';
import LabelEditor from './LabelEditor';//编辑label

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@FormConsume
export default class EditingContent extends Component{
  state={
    position:`right`,
  }
  positionChange=(e)=>{
    this.setState({position:e.target.value})
  }


  requireChange=(e)=>{//必须改变
    const {checked}=e.target;
    const {
      props:{
        state:{
          editingData:data,
          actions:{
            setEditingData
          }
        },
      },
    }=this;
    setEditingData(data,0,`required`,checked);
  }

  optionRowShowChange=(e)=>{
    const {
      props:{
        state:{
          editingData:data,
          actions:{
            setEditingData
          }
        },
      },
    }=this;
    setEditingData(data,0,`optionRowShow`,e);
  }

  onClose=()=>{
    const {
      props:{
        setState,
      }
    }=this;
    setState({editing:false})
  }

  fieldNameChange=(e)=>{//必须改变
    let {value}=e.target;
    const {
      props:{
        form,
        state:{
          editingData:data,
          actions:{
            setEditingData
          }
        },
      },
    }=this;
    setEditingData(data,0,`fieldName`,value);
  }
  requiredMessageChange=(e)=>{//必须校验信息改变
    const {value}=e.target;
    const {
      props:{
        form,
        state:{
          editingData:data,
          actions:{
            setEditingData
          }
        },
      },
    }=this;
    setEditingData(data,0,`requiredMessage`,value);
    const fName=data.fieldName||`invalidField`;
    if(!form.getFieldValue(fName)){
      form.setFieldsValue({[fName]:1})
      form.setFieldsValue({[fName]:``});
      setTimeout(()=>{
        form.validateFields();
      },1)
    }
  }
  render(){
    console.log(`EditingContent render`);
    const {
      props:{
        state:{
          editing:visible,
          editingData:data,
          editingData:{
            required,
            type,
            options,
            requiredMessage,
            fieldName,
            optionRowShow,
          },
          actions:{
            setGroupData,
            addGroupData,
            deleteGroupData,
          }
        },
      },
      state:{
        position,
      },
      positionChange,
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
        <Divider orientation="left">FieldName</Divider>
          <Input
            value={fieldName}
            onChange={this.fieldNameChange}
            placeHolder={`输入传入后台字段名称`}
            style={{width:200}}
          />
        <Divider orientation="left">Label</Divider>
          <LabelEditor/>
        <Divider orientation="left">Required</Divider>
        <SpanLH32>
          <Checkbox checked={required} onChange={this.requireChange}>
            required
          </Checkbox>
        </SpanLH32>
        {do{
          if(required){
              <Input
                value={requiredMessage}
                onChange={this.requiredMessageChange}
                placeHolder={`输入校验required的标语`}
                style={{width:200}}
              />
          }
        }}
        {do{
          if(type==`checkboxGroup`||type==`radio`||type==`select`){
            <Fragment>
              <Divider orientation="left">Options</Divider>
              {
                options.map((e,i)=>{
                  return (
                    <RowMB10 gutter={15}>
                      <Col span={10}>
                        <Input
                          onChange={e=>setGroupData(data,`options`,i,`label`,e.target.value)}
                          value={e.label}
                          placeHolder="label"
                        />
                      </Col>
                      <Col span={10}>
                        <Input
                          onChange={e=>setGroupData(data,`options`,i,`value`,e.target.value)}
                          value={e.value}
                          placeHolder="value"
                        />
                      </Col>
                      <Col span={2}>
                        <Button
                          icon="plus"
                          onClick={e=>addGroupData(data,`options`,i,{label:`default`,value:`default`})}
                        />
                      </Col>
                      <Col span={2}>
                        {do{
                          if(options&&options.length>1){
                            <Button
                              icon="minus"
                              onClick={e=>deleteGroupData(data,`options`,i)}
                            />
                          }
                        }}
                      </Col>
                    </RowMB10>
                  )
                })
              }
              {do{
                if(type==`checkboxGroup`||type==`radio`){
                  <Fragment>
                    <Divider orientation="left">OptionsRowShow</Divider>
                    <Slider min={1} max={4}  onChange={this.optionRowShowChange} value={Number(optionRowShow)} />
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
