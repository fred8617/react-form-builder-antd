import React,{Component} from 'react';
import {List} from 'antd';
import Element from './Element';
import {FormConsume} from '@/Context';

@FormConsume
export default class ElementList extends Component{
  render(){
    const {
      state:{
        elementTypes:data
      },
      addElement,
    }=this.props;
    return (
      <List
        header={
          <div>
            元素
          </div>}
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
