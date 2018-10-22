import React,{Component,Fragment} from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import {action} from 'mobx';
import {SpanLH32,RowMB10} from '../../../styled';
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
@inject('store')
@observer
export default class DataOptions extends Component{

  render(){
    const {
      store:{
        editingData:data,
        editingData:{
          options
        },
        setGroupData,
        addGroupData,
        deleteGroupData,
      }
    }=this.props;
    return (
      <Fragment>
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
      </Fragment>
    )
  }
}
