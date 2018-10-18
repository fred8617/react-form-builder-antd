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
    this.setEditState(this.props.data);
  }
  componentWillReceiveProps(nextProps){
    console.log(`EditingContent receive`);
    const {data}=nextProps;
    if(this.props.data.fieldName&&data.fieldName==this.props.data.fieldName){
      return;
    }
    this.setEditState(data);
  }
  onEditorStateChange=(editorState)=>{
    const {
      props:{
        data,
        index,
        setEditingData,
      }
    }=this;
    const label=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setEditingData(data,index,`label`,label);
    this.setState({
      editorState,
    });
  }
  render(){
    console.log(this.props.data);
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
