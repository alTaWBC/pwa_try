(this.webpackJsonppwa_try=this.webpackJsonppwa_try||[]).push([[0],{17:function(e,t,n){e.exports={button:"RecordButton_button__IZaY8",Red:"RecordButton_Red__22ynq"}},34:function(e,t,n){},4:function(e,t,n){e.exports={App:"App_App__2EZG_","App-logo":"App_App-logo__3Yx17",header:"App_header__2Wyi5",p:"App_p__1TF4B",Unity:"App_Unity__1ss9n",centeredDiv:"App_centeredDiv__2KJI6",button:"App_button__2LSbO"}},42:function(e,t){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(3),o=n(28),i=n.n(o),c=(n(34),n(9)),s=n(10),d=n(12),u=n(11),l=n(4),p=n.n(l),h=n(16),m=n.n(h),v=n(5),b=n(2),g=n.n(b),f=n(6),j=n(17),O=n.n(j),w=function(e){var t=[O.a.AudioRecorder];return e.recording&&t.push(O.a.Red),Object(a.jsx)("button",{onClick:e.recording?e.stopRecording:e.startRecording,className:t.join(" "),children:Object(a.jsx)("i",{className:"material-icons",children:e.recording?"mic_off":"mic"})})},y=(n(39),"https://biovisualspeech.eu.pythonanywhere.com"),x=new Date,_=0,R=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={recording:!1,label:"l",chunks:[],audios:[],urls:[]},e.prepareUnityCommunication=function(){e.props.unity.on("GameOver",(function(){e.stopRecording(),e.changeLabel()})),e.props.unity.on("GameStart",(function(t){e.stopRecording(),e.changeLabel(t.split("_")[1]),"Menu"!==t&&e.props.newGame()}))},e.changeLabel=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e.setState({label:t})},e.prepareMicrophone=Object(f.a)(g.a.mark((function t(){var n;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({audio:!0,video:!1});case 2:n=t.sent,e.mediaRecorder=new MediaRecorder(n),e.mediaRecorder.addEventListener("dataavailable",e.onDataAvailableSafari),e.mediaRecorder.addEventListener("stop",e.onStop);case 6:case"end":return t.stop()}}),t)}))),e.onDataAvailable=function(){var t=Object(f.a)(g.a.mark((function t(n){var a,r,o,i,c=arguments;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.data,r=n.timecode,o=c.length>1&&void 0!==c[1]?c[1]:void 0,alert(a.size),t.next=5,e.sendDataToServer(a,r,o);case 5:if((i=t.sent).ok){t.next=8;break}return t.abrupt("return");case 8:i.text().then((function(t){return e.props.sendMessage(t)}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onDataAvailableSafari=function(t){var n=t.data,a=new Blob([n],{type:"audio/mp3"});e.sendDataToServer(a,x.getMilliseconds(),"postFileMp4/");var r=[].concat(Object(v.a)(e.state.chunks),[n]);e.setState({chunks:r})},e.onStop=function(t){var n=t.data,a=t.timecode,r=(void 0===a&&x.getTime(),[].concat(Object(v.a)(e.state.chunks),[n])),o=new Blob(r,{type:"audio/wav"}),i=URL.createObjectURL(o),c=new Audio(i),s=[].concat(Object(v.a)(e.state.audios),[c]);r=[];var d=[].concat(Object(v.a)(e.state.urls),[i]);e.setState({chunks:r,audios:s,urls:d})},e.sendDataToServer=function(){var t=Object(f.a)(g.a.mark((function t(n,a){var r,o,i,c=arguments;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=c.length>2&&void 0!==c[2]?c[2]:"postFileWebm/",(o=new FormData).append("file",n),i=n.length||n.size,t.abrupt("return",fetch("".concat(y,"/").concat(r),{headers:{name:"".concat(e.props.id).concat(a),segment:_,id:e.props.id,label:e.state.label,gameId:e.props.gameId,"Content-Length":i,extension:"mp3"},method:"POST",body:o}));case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.startRecording=Object(f.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(void 0===e.mediaRecorder)){t.next=3;break}return t.abrupt("return");case 3:if(!(null===e.mediaRecorder)){t.next=6;break}return t.abrupt("return");case 6:e.mediaRecorder.start(3e3),_=0,e.setState({recording:!0});case 9:case"end":return t.stop()}}),t)}))),e.stopRecording=function(){var t=void 0===e.mediaRecorder,n=!e.state.recording;t||n||(null===e.mediaRecorder||(e.mediaRecorder.stop(),e.setState({recording:!1})))},e.playAudio=function(t){e.state.audios[t].play()},e.createAudios=function(e){return e.map((function(e,t){return Object(a.jsx)("div",{children:Object(a.jsx)("button",{onClick:function(){return e.play()}})},t)}))},e.addListener=function(t){var n=Array.from(t.target.files),a=URL.createObjectURL(n[0]),r=new Audio(a);e.setState({audios:[].concat(Object(v.a)(e.state.audios),[r])});var o=n[0];console.log(o);var i=new FormData;i.append("file",o);var c=o.length||o.size;console.log(c),fetch("https://biovisualspeech.eu.pythonanywhere.com/postFileMp4/",{headers:{name:"30000",segment:0,id:"123456",label:"l",gameId:"1","Content-Length":c,extension:"wav"},method:"POST",body:i})},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.prepareMicrophone(),this.prepareUnityCommunication()}},{key:"render",value:function(){try{var e;console.log(null===(e=this.mediaRecorder)||void 0===e?void 0:e.state);var t=this.createAudios(this.state.audios);return""===this.state.label?null:Object(a.jsxs)("div",{children:[Object(a.jsx)(w,{recording:this.state.recording,startRecording:this.startRecording,stopRecording:this.stopRecording}),t,Object(a.jsx)("input",{type:"file",id:"file-selector",multiple:!0,onChange:this.addListener})]})}catch(n){return Object(a.jsx)("div",{children:n.message})}}}]),n}(r.Component),I=n(63),k=new h.UnityContent("Build/webgl1/game.json","Build/webgl1/UnityLoader.js"),S=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;Object(c.a)(this,n),(a=t.call(this,e)).generateUUID=function(){var e=Math.round(10*Math.random());return Object(I.a)().substring(e,e+6)},a.avaliateProduction=function(e){var t=JSON.parse(e);parseInt(t.gameId)===a.state.gameId&&"true"===t.response.toLowerCase()&&(console.log("characterMoves"),k.send("Character","moveCharacter","True"))},a.increaseId=function(){a.setState({gameId:a.state.gameId+1})},a.doubleClick=function(){var e=a.generateUUID();a.changeId(e)},a.mouseDown=function(){var e=setTimeout((function(e){return a.changeId()}),1e3);a.setState({timeout:e})},a.mouseUp=function(){clearTimeout(a.state.timeout)},a.changeId=function(e){console.log(e),e||(e=prompt("Qual \xe9 o id?"))&&6===e.length?(localStorage.setItem("id",e),a.setState({id:e})):alert("Id Inv\xe1lido! Tente novamente")};var r=localStorage.getItem("id");return null===r&&(r=a.generateUUID(),localStorage.setItem("id",r)),a.state={id:r,gameId:0},a}return Object(s.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:p.a.App,children:Object(a.jsxs)("header",{className:p.a.header,children:[Object(a.jsx)("div",{className:p.a.Unity,children:Object(a.jsx)(m.a,{unityContent:k})}),Object(a.jsxs)("div",{className:p.a.centeredDiv,children:[Object(a.jsx)(R,{sendMessage:this.avaliateProduction,id:this.state.id,unity:k,gameId:this.state.gameId,newGame:this.increaseId}),Object(a.jsx)("p",{className:p.a.p,children:Object(a.jsx)("button",{className:p.a.button,onDoubleClick:this.doubleClick,onMouseDown:this.mouseDown,onMouseUp:this.mouseUp,children:this.state.id})})]})]})})}}]),n}(r.Component),A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),o(e),i(e)}))};i.a.render(Object(a.jsx)(S,{}),document.getElementById("root")),A(),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/sw.js").then((function(e){})).catch((function(e){}))}))}},[[61,1,2]]]);
//# sourceMappingURL=main.a8c354f9.chunk.js.map