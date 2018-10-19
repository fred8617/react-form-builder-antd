import React,{Component,Fragment} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import {Form} from 'antd';
//组件
import {Provider} from '@/Context';
import Priview from './Priview';//预览
import ElementList from './ElementList';//元素列表
import styled from 'styled-components';
import EditingContent from './EditingContent';//编辑抽屉



const PrivicwContainer=styled.div`
  float: left;
  @media screen and (max-width: 1900px) {
    width: 600px;
  }
  @media screen and (max-width: 1024px) {
    width: 500px;
  }
`;
const ElementListContainer=styled.div`
  float: left;
`;

@DragDropContext(HTML5Backend,{window })
@Form.create({
  onFieldsChange:(props, fields)=>{
    console.log(props, fields);
  }
})
export default class FormBuilder extends Component{

  state={
    data:[],
    editing:false,
    editingData:{label:``},
    editingIndex:null,
    elementTypes:[
      {
        type:`input`,
        name:`文本输入框`,
        demo:true,
      },
      {
        type:`inputNumber`,
        name:`数字输入框`,
        demo:true,
      },
      {
        type:`radio`,
        name:`单选框`,
        demo:true,
      },
      {
        type:`checkbox`,
        name:`复选框`,
        demo:true,
      },
      {
        type:`checkboxGroup`,
        name:`复选框组`,
        demo:true,
      },
      {
        type:`select`,
        name:`下拉框`,
        demo:true,
      },
    ],
  };
  widgetIndex=0;
  constructor(...args){
    super(...args);
    this.provide={
      state:this.state,
      form:this.props.form,
    }
    const {
      moveElement,
      createElement,
      addElement,
      setDownElement,
      editShow,
      setEditingData,
      setGroupData,
      addGroupData,
      deleteGroupData,
      deleteItem,
    }=this;
    this.state.actions={
      moveElement,
      createElement,
      addElement,
      setDownElement,
      editShow,
      setEditingData,
      setGroupData,
      addGroupData,
      deleteGroupData,
      deleteItem,
    }
  }
  componentWillMount(){
    const {
      data,
      design=true,
    }=this.props;
    if(data){
      this.setState({data,design})
    }
  }
  deleteItem=(item)=>{
    const i=this.getIndex(item);
    const newState=update(this.state,{
      data:{
        $splice:[[i,1]]
      }
    })
    this.setState(newState)
  }
  moveElement=( dragIndex, hoverIndex)=>{
    const { data } = this.state;
		const dragCard = data[dragIndex];
    const hoverCard = data[hoverIndex];
    const newData =	update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    });
    this.setState(newData);
  }
  setDownElement=(element)=>{
    if(element.demo){
      delete element.demo;
      const newDemo={...element,demo:true};
      const index=this.state.elementTypes.indexOf(element);
      const newState=update(this.state,{
        elementTypes:{
          $splice:[[index,1],[index,0,newDemo]]
        }
      });
      this.setState(newState);
    }
  }

  getIndex=(data)=>{//获取元素索引
    return this.state.data.indexOf(data);
  }

  setGroupData=(data,field,index,gpfield,value)=>{
    const i=this.getIndex(data)
    const newState=update(this.state,{
      data:{
        [i]:{
          [field]:{
            [index]:{
              [gpfield]:{
                $set:value,
              }
            }
          }
        }
      }
    });
    newState.editingData=newState.data[i];
    this.setState(newState)
  }


  addGroupData=(data,field,index,insertData)=>{
    const i=this.getIndex(data);
    const newState=update(this.state,{
      data:{
        [i]:{
          [field]:{
            $splice:[[index+1,0,insertData]]
          }
        }
      }
    });
    newState.editingData=newState.data[i];
    this.setState(newState)
  }

  deleteGroupData=(data,field,index)=>{
    const i=this.getIndex(data);
    const newState=update(this.state,{
      data:{
        [i]:{
          [field]:{
            $splice:[[index,1]]
          }
        }
      }
    });
    newState.editingData=newState.data[i];
    this.setState(newState)
  }

  addElement=(element)=>{
    console.log(`addElement`);
    const {
      data,
    }=this.state;
    console.log(this);
    const fl=`${element.type}${this.widgetIndex}`;
    const newEl={...element,demo:false}
    newEl.fieldName=fl;
    newEl.label=fl;
    this.checkType(newEl);
    const newState=update(this.state,{
      data:{
        $push:[newEl]
      }
    })
    this.widgetIndex++;
    this.setState(newState)
  }
  checkType=(item)=>{
    const {
      type,
    }=item;
    if(type==`checkboxGroup`||type==`radio`||type==`select`){
      item.options=[
        {label: 'default1', value: 'default1Value'},
        {label: 'default2', value: 'default2Value'}
      ]
      if(type==`checkboxGroup`||type==`radio`){
        item.optionRowShow=3;
      }
    }
  }



  createElement=(dragItem,hoverIndex)=>{
    console.log(`createElement`);
    const fl=`${dragItem.type}${this.widgetIndex}`;
    //const newEl={...dragItem}
    dragItem.fieldName=fl;
    dragItem.label=fl;
    dragItem.adding=true;
    this.checkType(dragItem);
    this.widgetIndex++;
    this.state.data.splice(hoverIndex, 0, dragItem);
    const newData =	update(this.state, {
      data: {
        $splice: [[hoverIndex, 1], [hoverIndex, 0, dragItem]],
      },
    });
    this.setState(newData)
  }

  editShow=(editingData)=>{//编辑界面出现
    this.setState({
      editing:true,
      editingData,
      editingIndex:this.state.data.indexOf(editingData)
    })
  }


  editingClose=()=>{//编辑界面关闭
    this.setState({editing:false})
  }


  setEditingData=(data,index,field,value)=>{//编辑表单元素
    //this.state.data[index][field]=value;
    index=this.state.data.indexOf(data)
    const newState=update(this.state,{
      data:{
        [index]:{
          [field]:{
            $set:value
          }
        }
      },
    });
    newState.editingData=newState.data[index];
    this.setState(newState)
  }

  render(){
    console.log(`FormBuilder render`);
    const {
      props:{
        form
      },
    }=this;
    return (
      <Provider value={{state:this.state,form,setState:this.setState.bind(this)}}>
        <style>
        {
          `
          p,ol{
            margin:0
          }
          `
        }
        </style>
        <EditingContent/>
        <PrivicwContainer>
          <Priview/>
        </PrivicwContainer>
        <ElementListContainer>
          <ElementList/>
        </ElementListContainer>
      </Provider>
    )
  }
}
