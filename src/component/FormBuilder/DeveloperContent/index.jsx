import React,{Component,Fragment} from 'react';
import {
  FormConsume,
} from '../../Context';
import {
  observer,
  inject
} from 'mobx-react';


import {
  Collapse,
  Icon,
  Divider,
  Input,
  Form,
  Button,
  Modal,
} from 'antd';

import UrlInput from './UrlInput';

const Search = Input.Search;
const Panel = Collapse.Panel;
const FormItem = Form.Item;





@inject('store')
@observer
export default class DeveloperContent extends Component{

  saveFormDesign=()=>{
    const {
      form:{
        getFieldValue,
      },
      store:{
        data,
        submitUrl,
        index,
      }
    }=this.props;
    const param={data,submitUrl,index};
    Modal.info({title:`保存表单`,content:<pre>{JSON.stringify(param,null,2)}</pre>})
  }


  // shouldComponentUpdate(nextProps){
  //   return (
  //     (this.props.changField===nextProps.changField)
  //   );
  // }

  render(){
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const {
      form,
      store:{
        developer,
      }
    }=this.props;
    console.log(`DeveloperContent render`);
    return (
      <Collapse
        bordered={false}
      >
        <Panel
          style={{
            background:`white`,
            border:`none`,
          }}
          showArrow={false}
          header={
            <div>
              <Divider orientation="left">
                <Icon type="setting"/>
                表单选项
              </Divider>
            </div>
          }
          key="1">
          {do{
            if(developer){
              <FormItem
                {...formItemLayout}
                colon={true}
                label="提交的url"
              >
                <UrlInput form={form}/>
              </FormItem>
            }
          }}
          <div  style={{textAlign:`center`}}>
            <Button
              onClick={this.saveFormDesign}
              type="primary"
              >
              保存表单
            </Button>
          </div>
          <Divider style={{margin:`10px 0`}}/>
        </Panel>
      </Collapse>
    )
  }
}
