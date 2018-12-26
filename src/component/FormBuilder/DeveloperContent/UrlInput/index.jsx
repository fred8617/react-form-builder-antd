import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {
  Input,
  Modal
} from 'antd';
import {
  action
} from 'mobx';
const Search = Input.Search;

@inject('store')
@observer
export default class UrlInput extends Component{
  testSubmit=()=>{
    const {
      form,
    }=this.props;
    form.validateFields()
    // form.validateFieldsAndScroll((err,values)=>{
    //   console.log(err,values);
    //   form.setFields(err)
    //   if(err){
    //     return;
    //   }
    //   Modal.info({title:'测试表单提交',content:<pre>{JSON.stringify(form.getFieldsValue(),null,2)}</pre>});
    // });

  }
  @action urlChange=(e)=>{
    this.props.store.submitUrl=e.target.value;
  };
  render(){
    const {
      store:{
        submitUrl
      }
    }=this.props;
    return (
      <Search
        value={submitUrl}
        placeholder="输入url"
        enterButton="测试提交"
        onSearch={this.testSubmit}
        onChange={this.urlChange}
      />
    )
  }
}
