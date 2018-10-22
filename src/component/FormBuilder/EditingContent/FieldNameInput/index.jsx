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
        placeholder={`输入传入后台字段名称`}
        style={{width:200}}
      />
    )
  }
}
