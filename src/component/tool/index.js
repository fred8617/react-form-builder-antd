import React from 'react';
import {Modal,message} from 'antd';
import axios from 'axios';
export const isIE11 = (/Trident\/7\./).test(navigator.userAgent);
export const ajax=(way,url,data={},resType=`json`,...rest)=>{
    /*构造promise函数构造函数*/
    const promiseConstructor=(success=e=>e,error=e=>e)=>{
        const xhr=new XMLHttpRequest();/*获取ajax对象*/
        let string=``;
        xhr.open(way,url,true);/*发起请求*/
        xhr.responseType=resType;
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        for(let i in data){
					if(data[i]===null||data[i]===undefined){
						continue;
					}
        	string+=`&${i}=${encodeURIComponent(data[i])}`
        }
        xhr.send(string.replace(`&`,``));/*请求参数*/
        /**
         * 成功回调
         * @param e
         */
        xhr.onload=(e)=>{
          console.log(`aaa`,e);
        	let res=e.currentTarget.response;
        	if(isIE11){
        		res=JSON.parse(res);
        	};
            success(res);
        }
        /*超时处理*/
        const timeout=(handlerObj)=>{
            xhr.timeout=handlerObj.timeout;
            xhr.ontimeout=handlerObj.fun;
        }
        xhr.onerror=(e)=>{
            error(e);
        };
        rest[0]==null?null:timeout(rest[1]);
        rest[1]==null?null:xhr.onprogress(rest[2]);
    };
    return new Promise(promiseConstructor);
}
/*暂时除了post想不到用其他函数*/
export const post=(url,data={},resType=`json`,...rest)=>{
    if(window.noModify==true){
        return axios.post(url,data).then(e=>e.data);
    }
    return ajax(`POST`,url,data,resType,...rest);
};
/**
 * 时间格式化YYYY-MM-DD
 */
export const formatDateYMD=(date)=>{
	const year=date.getFullYear();
	const month=date.getMonth() + 1<10?`0${date.getMonth() + 1}`:date.getMonth() + 1;
	const day=date.getDate()<10?`0${date.getDate()}`:date.getDate();
	return `${year}-${month}-${day}`;
}
/**
 * 时间格式化YYYY-MM-DD 00:00:00
 */
export const formatDateYMDHMS0=(date)=>{
	return `${formatDateYMD(date)} 00:00:00`;
}

/**
 * 将对象属性拼成一串a=b c=d
 */
export const getStrFromData=(data)=>{
	let str=``;
	for(let j in data){
		str+=`${j}="${data[j]}" `;
	};
	return str;
};

/**
 * 处理报错信息
 */
export const dealErrorMessage=(messages,menuKey)=>{
	Modal.error({content:<div>{messages.split(`<!------!>`).map((d,i)=>{
		return (
			<div>{d?i18n(d,menuKey):null}</div>
		)
	})}</div>})
}

export let i18n=e=>e;
export const setI18n=(fun)=>{
	i18n=fun;
}

export const download =(url, filename)=>{
  const that = this;
  return new Promise(function(resolves) {
    getBlob(url).then(function(blob) {
    saveAs(blob, filename);
      resolves(`success`)
    });
    function getBlob(url) {
        return new Promise(function(resolve) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function() {
              if(xhr.status === 200) {resolve(xhr.response)}
            };
            xhr.send();
        });
    }
    function saveAs(blob, filename) {
        if(window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            const body = document.querySelector('body');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.style.display = 'none';
            body.appendChild(link);
            link.click();
            body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }
    }
  })
}


export const dealOverflowMsg=(msg,number)=>{
  if(msg.length>number){
    return msg.substr(0,number)+`...`;
  }
  return msg;
}


export const errorRemind=(res,messge)=>{
	if(res && res.message!=``){
	let msg = res.message.split(`<!------!>`).splice(msg.length-1,1);
	const content = (
		<div>
			{
				msg.map((item)=>{
					return (<div>{i18n(item)}</div>)
				})
			}
		</div>
	)
		message.error(content, 2.5)
	}else{
    message.error(messge, 2.5)
	}
}
