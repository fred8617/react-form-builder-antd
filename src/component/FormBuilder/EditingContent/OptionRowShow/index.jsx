import React,{Component,Fragment} from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import {action} from 'mobx';
import {
  Slider
} from 'antd';
@inject('store')
@observer
export default class OptionRowShow extends Component{
  optionRowShowChange=(e)=>{
    const {
      props:{
        store:{
          editingData:data,
          setEditingData
        },
      },
    }=this;
    setEditingData(`optionRowShow`,e);
  }
  render(){
    const {
      store:{
        editingData:{
          optionRowShow
        }
      }
    }=this.props;
    return (
      <Slider min={1} max={4}  onChange={this.optionRowShowChange} value={Number(optionRowShow)} />
    )
  }
}
