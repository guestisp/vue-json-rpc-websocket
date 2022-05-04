!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["Vue-JSONRPC-WS"]=e():t["Vue-JSONRPC-WS"]=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(o,s,function(e){return t[e]}.bind(null,s));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class o{constructor(t,e){this.instance=null,this.url=t,this.options=e||this.defaultOptions(),this.options&&(e.reconnectEnabled&&(this.reconnectEnabled=e.reconnectEnabled,this.reconnectEnabled&&(this.reconnectInterval=e.reconnectInterval,this.reconnectAttempts=e.recconectAttempts,this.reconnectCount=1)),e.store&&(this.store=e.store),e.eventAfterMutation&&(this.eventAfterMutation=e.eventAfterMutation)),this.beforeConnected=[],this.wsData=[],this.onOpen=null,this.onMessage=null,this.onClose=null,this.onError=null}createMessage(t,e,n){let o={jsonrpc:"2.0",method:t,params:e,id:n};return JSON.stringify(o)}defaultOptions(){return{reconnectEnabled:!1,reconnectInterval:0,recconectAttempts:0,eventAfterMutation:!0,store:null}}passToStore(t,e){if(!t.startsWith("socket_"))return;let n=t,o=e;e.data&&(o=JSON.parse(e.data)),this.store.commit(n,o)}connect(){this.instance=new WebSocket(this.url),this.instance.onopen=()=>{this.beforeConnected.forEach(t=>this.instance.send(t)),this.beforeConnected=[],this.reconnectEnabled&&(this.reconnectCount=1),"function"==typeof this.onOpen&&this.onOpen(),this.store&&this.passToStore("socket_on_open",event)},this.instance.onmessage=t=>{let e=JSON.parse(t.data);if(this.store){let t=this.wsData.filter(t=>t.id===e.id)[0];t&&this.store.commit(t.mutation,e.result?e.result:e.params),this.passToStore("socket_on_message",e)}!this.eventAfterMutation&&this.store||"function"==typeof this.onMessage&&this.onMessage(e)},this.instance.onclose=t=>{"function"==typeof this.onClose?this.onClose(t):this.store&&this.passToStore("socket_on_close",t),!t.wasClean&&this.reconnectEnabled&&this.reconnect()},this.instance.onerror=t=>{"function"==typeof this.onError?this.onError(t):this.store&&this.passToStore("socket_on_error",t)}}reconnect(){this.reconnectCount<=this.reconnectAttempts?(this.reconnectCount++,delete this.instance,setTimeout(()=>{this.connect(),this.store&&this.passToStore("socket_reconnect",this.reconnectCount)},this.reconnectInterval)):this.store&&this.passToStore("socket_reconnect_error",!0)}sendData(t,e,n=null){let o=Math.floor(1e4*Math.random())+1;n&&this.wsData.push({id:o,mutation:n});const s=this.createMessage(t,e,o);this.instance.readyState===WebSocket.OPEN?this.instance.send(s):this.beforeConnected.push(s)}}e.default={install(t,e,n){const s=new o(e,n);s.connect(),t.prototype.$socket=s}}}])}));