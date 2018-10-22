import React,{Component,createContext} from 'react';
const {Provider:Pro,Consumer}=createContext({

});
export let changField;
export const setChangeField=(fieldName)=>{
  changField=fieldName;
}
export const Provider=Pro;
export const FormConsume=(Component)=>{
  return (props)=>(
    <Consumer>
      {
        e=><Component {...props} {...e}/>
      }
    </Consumer>
  )

}
