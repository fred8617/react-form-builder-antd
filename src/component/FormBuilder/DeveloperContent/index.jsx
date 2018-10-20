import React,{Component,Fragment} from 'react';
import {FormConsume} from '@/Context';
import {
  Collapse,
  Icon,
  Divider,
  Input,
  Form,
  Button,
} from 'antd';
const Search = Input.Search;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
@FormConsume
export default class DeveloperContent extends Component{
  saveFormDesign=()=>{
    const {
      form:{
        getFieldValue,
      },
      state:{
        data
      }
    }=this.props;
    const url=getFieldValue(`testSubmitUrl`);
    const param={data,url};
    console.log(JSON.stringify(param,null,2));
  }
  testSubmit=()=>{
    const {
      form,
    }=this.props;
    console.log(form.getFieldsValue());
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const {
      form:{
        getFieldProps
      },
      state:{url}
    }=this.props;
    console.log(`DeveloperContent render`);
    return (
      <Collapse
        bordered={false}
      >
        <Panel
          style={{
            background:`white`,
            border:`none`
          }}
          showArrow={false}
          header={
            <div>
              <Divider orientation="left">
                <Icon type="setting"/>
                开发者选项
              </Divider>
            </div>
          }
          key="1">
          <FormItem
            {...formItemLayout}
            colon={true}
            label="提交的url"
          >
            <Search
              placeholder="输入url"
              enterButton="测试提交"
              onSearch={this.testSubmit}
              {...getFieldProps("testSubmitUrl",{initialValue:url})}
            />
          </FormItem>
          <div  style={{textAlign:`center`}}>
            <Button
              onClick={this.saveFormDesign}
              type="primary"
              >
              保存表单
            </Button>
          </div>
        </Panel>
      </Collapse>
    )
  }
}
