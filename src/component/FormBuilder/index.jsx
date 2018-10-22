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


// import {
//   Provider,
//   changField,
//   setChangeField,
// } from '../Context';
import Store from '../Store';
import {Provider} from 'mobx-react';

import styled from 'styled-components';
import Priview from './Priview';//预览
import ElementList from './ElementList';//元素列表
import EditingContent from './EditingContent';//编辑抽屉
import DeveloperContent from './DeveloperContent';//开发者视图


const store=new Store();
const PrivicwContainer=styled.div`
  padding: 10px;
  border:1px solid #d3d3d3;
  box-shadow: -3px -1px 20px 2px #d3d3d3;
  border-radius: 5px;
  min-height: 200px;
  ${'' /* @media screen and (max-width: 1900px) {
    width: 600px;
  }
  @media screen and (max-width: 1024px) {
    width: 500px;
  } */}
`;
const ElementListContainer=styled.div`
  ${'' /* margin-left: 5px; */}
`;

@DragDropContext(HTML5Backend,{window })
@Form.create({
  onValuesChange:(props, fields)=>{
    store.editField=Object.keys(fields)[0];
  }
})
export default class FormBuilder extends Component{

  componentWillMount(){
    store.init({
      ...this.props
    })
  }
  render(){
    const {design}=this.props;
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
          <Row
            style={{
              width:800,
              margin:`auto`
            }}
            gutter={8}
          >
            <Col span={20}>
              <PrivicwContainer>
                {do{
                  if(design){
                    <Affix style={{ position: 'relative', top: -11}}  >
                      <DeveloperContent
                        form={this.props.form}
                      />
                    </Affix>
                  }
                }}
                <Priview
                  form={this.props.form}
                  store={store}
                />
              </PrivicwContainer>
            </Col>
            <Col span={4}>
              <Affix>
                <ElementListContainer>
                  <ElementList/>
                </ElementListContainer>
              </Affix>
            </Col>
          </Row>
          <EditingContent
            form={this.props.form}
          />
        </Fragment>
      </Provider>
    )
  }
}
