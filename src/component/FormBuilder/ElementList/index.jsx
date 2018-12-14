import React,{Component} from 'react';
import {List} from 'antd';
import Element from './Element';
import {FormConsume} from '../../Context';
import {
  inject,
  observer,
} from 'mobx-react';

@inject('store')
@observer
export default class ElementList extends Component{
  render(){
    const {
      store:{
        elementTypes:data
      },
    }=this.props;
    return (
      <List
        header={
          <div>
            元素
          </div>
        }
        bordered
        dataSource={data}
        renderItem={
          item =>
          (
            <List.Item>
              <Element
                item={item}
              />
            </List.Item>
          )
        }
      />
    )
  }
}
