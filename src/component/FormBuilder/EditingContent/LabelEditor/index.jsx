import React,{Component} from 'react';
import {
  Drawer,
  Radio ,
  Row,
  Col,
  Divider,
} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import update from 'immutability-helper';
import {FormConsume} from '../../../Context';
@FormConsume
export default class LabelEditor extends Component{
  state={
    editorState:EditorState.createEmpty(),
    toolbar:[
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      //'list',
      //'textAlign',
      'colorPicker',
      'link',
      //'embedded',
      'emoji',
      'image',
      'remove',
      'history'
    ],
  }
  setEditState=(data)=>{
    let editorState;
    const newContent=convertFromHTML(data.label);
    if (!newContent.contentBlocks) {
      editorState = EditorState.createEmpty();
    }else{
      const contentState = ContentState.createFromBlockArray(newContent);
      editorState=EditorState.createWithContent(contentState);
    }
    const newState=update(this.state,{
      editorState:{
        $set:editorState
      }
    })
    this.setState(newState)
  }
  componentDidMount(){
    this.setEditState(this.props.state.editingData);
  }
  componentWillReceiveProps(nextProps){
    console.log(`EditingContent receive`);
    const {
      state:{
        editingData:data,
      }
    }=nextProps;
    const {editingData}=this.props.state
    if(editingData.fieldName&&data.fieldName==editingData.fieldName){
      return;
    }
    this.setEditState(data);
  }
  onEditorStateChange=(editorState)=>{
    const {
      state:{
        editingData:data,
        actions:{
          setEditingData
        }
      }
    }=this.props;
    const label=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setEditingData(data,0,`label`,label);
    this.setState({
      editorState,
    });
  }
  render(){
    const {
      state:{
        toolbar
      },
    }=this;
    return (
      <Editor
        toolbar={
          {options:toolbar}
        }
        editorState={this.state.editorState}
        wrapperClassName="editor"
        editorClassName="editor-main"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
