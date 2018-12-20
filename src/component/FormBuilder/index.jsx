import React,{Component,Fragment} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import {
  Form,
  Row,
  Col,
  Affix,
} from 'antd';
import {observer} from 'mobx-react';
//组件
import Store from '../Store';
import {Provider} from 'mobx-react';

import styled from 'styled-components';
import Priview from './Priview';//预览
import ElementList from './ElementList';//元素列表
import ContainerList from './ContainerList';//容器元素列表
import EditingContent from './EditingContent';//编辑抽屉
import DeveloperContent from './DeveloperContent';//开发者视图


const store=new Store();
const PrivicwContainer=styled.div`
  padding: 10px;
  min-height: 200px;
  float:left;
  width:${props=>props.simple?`calc( 100% - 158px)`:`calc( 100% - 316px)`};
  ${'' /* @media screen and (max-width: 1900px) {
    width: 600px;
  }
  @media screen and (max-width: 1024px) {
    width: 500px;
  } */}
`;
const ElementListContainer=styled.div`
  float:left;
  width: 150px;
  margin-left: 8px;
`;
const ContainerListContainer=styled.div`
  ${'' /* margin-left: 5px; */}
`;

@DragDropContext(HTML5Backend,{window })
@Form.create({
  onValuesChange:(props, fields)=>{
    store.editField=Object.keys(fields)[0];
  }
})
export default class FormBuilder extends Component{
  state={
    isInit:false
  }
  static getDerivedStateFromProps(props,state){
    if(!state.isInit){
      store.init({
        ...props
      });
    }
    console.log(`getDerivedStateFromProps`);
    return {
      isInit:true,
    };
  }
  render(){
    const {
      design,
      priviewStyle,
      style,
      formLayout,
      onSave,
      elementStyle,
    }=this.props;
    return (
      <Provider
        store={store}
      >
        <Fragment>
          <style>
            {
          `
          p,ol{
            margin:0
          }
          `
            }
          </style>
          <div
            style={style}
          >
            <PrivicwContainer
              simple={store.simple}
              style={{width:!design?`100%`:null,...priviewStyle}}
            >
              {do{
                if(design){
                  <Affix style={{ position: 'relative', top: -11}}  >
                    <DeveloperContent
                      onSave={onSave}
                      form={this.props.form}
                    />
                  </Affix>
                }
              }}
              <Priview
                form={this.props.form}
                store={store}
                design={design}
              />
            </PrivicwContainer>
            {do{
              if(design){
                <Fragment>
                  <ElementListContainer
                    style={elementStyle}
                  >
                    <Affix>
                      <ElementList
                      />
                    </Affix>
                  </ElementListContainer>
                  {do{
                    if(!store.simple){
                      <ElementListContainer
                        style={elementStyle}
                      >
                        <Affix>
                          <ContainerList/>
                        </Affix>
                      </ElementListContainer>
                    }
                  }}
                </Fragment>
              }
            }}
          </div>
          {do{
            if(design){
              <EditingContent
                form={this.props.form}
              />
            }
          }}
        </Fragment>
      </Provider>
    )
  }
}
