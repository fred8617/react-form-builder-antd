import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {List} from 'antd';
import Element from './Element';
@inject('store')
@observer
export default class ContainerList extends Component{
  render(){
    const {
      store:{
        containerTypes:data
      },
    }=this.props;
    return (
      <List
        header={
          <div>
            布局
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
