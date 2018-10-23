import React,{Component} from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import {action} from 'mobx';
import {Input} from 'antd';
@inject('store')
@observer
export default class FieldNameInput extends Component{
  @action handleChange=(e)=>{
    const {
      store
    }=this.props;
    store.editingData.fieldName=e.target.value;
  }

  @action handleBlur=()=>{
    const {
      store:{
        editingData,
        editingData:{
          fieldName
        },
        checkName,
      }
    }=this.props;
    editingData.fieldName=checkName(fieldName,editingData.type,1);
  }

  render(){
    const {
      store:{
        editingData:{
          fieldName
        }
      }
    }=this.props;
    return (
      <Input
        value={fieldName}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        placeholder={`输入传入后台字段名称`}
        style={{width:200}}
      />
    )
  }
}
