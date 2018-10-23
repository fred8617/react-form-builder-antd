import React,{Component,Fragment} from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import {action} from 'mobx';
import {
  Checkbox,
  Input
} from 'antd';
@inject('store')
@observer
export default class RequiredCheckBox extends Component{
  @action requireChange=(e)=>{
    const {
      store
    }=this.props;
    store.editingData.required=e.target.checked;
  }
  @action requiredMessageChange=(e)=>{
    const {
      store,
      store:{
        editingData:data
      },
      form
    }=this.props;
    store.editingData.requiredMessage=e.target.value;
    // debugger
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
    const {
      store:{
        editingData:{
          required,
          requiredMessage
        }
      }
    }=this.props;
    return (
      <Fragment>
        <Checkbox
          checked={required}
          onChange={this.requireChange}>
          必填
        </Checkbox>
        {do{
          if(required){
              <Input
                value={requiredMessage}
                onChange={this.requiredMessageChange}
                placeholder={`输入校验必填的标语`}
                style={{width:200}}
              />
          }
        }}
      </Fragment>

    )
  }
}
