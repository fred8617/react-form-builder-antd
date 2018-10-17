import React,{Component} from 'react';
import {List} from 'antd';
import Element from './Element';


export default class ElementList extends Component{
  render(){
    const {
      data,
      addElement,
    }=this.props;
    return (
      <List
        header={<div style={{width:100}}>item</div>}
        locale={{'emptyText':`抓点数据来`}}
        bordered
        dataSource={data}
        renderItem={
          item =>
                (
                  <List.Item>
                    <Element
                      item={item}
                      addElement={addElement}
                    />
                  </List.Item>
                )
        }
      />
    )
  }
}
