(this.webpackJsonppwa_try=this.webpackJsonppwa_try||[]).push([[0],{12:function(e,t,n){e.exports={button:"RecordButton_button__IZaY8",Red:"RecordButton_Red__22ynq"}},23:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(2),o=n(17),c=n.n(o),i=(n(23),n(6)),s=n(7),d=n(9),u=n(8),l=n(3),p=n.n(l),h=n(11),b=n.n(h),g=n(5),v=n(1),m=n.n(v),f=n(4),j=n(12),O=n.n(j),y=function(e){var t=[O.a.button];return e.recording&&t.push(O.a.Red),Object(a.jsx)("button",{onClick:e.recording?e.stopRecording:e.startRecording,className:t.join(" "),children:Object(a.jsx)("i",{className:"material-icons",children:e.recording?"mic_off":"mic"})})},w="https://biovisualspeech.eu.pythonanywhere.com",_=new Date,R=0,x=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).state={recording:!1,label:"l",chunks:[],audios:[],urls:[]},e.prepareUnityCommunication=function(){e.props.unity.on("GameOver",(function(){e.stopRecording(),e.changeLabel()})),e.props.unity.on("GameStart",(function(t){e.stopRecording(),e.changeLabel(t.split("_")[1]),"Menu"!==t&&e.props.newGame()}))},e.changeLabel=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e.setState({label:t})},e.prepareMicrophone=Object(f.a)(m.a.mark((function t(){var n;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({audio:!0});case 2:n=t.sent,e.mediaRecorder=new MediaRecorder(n),e.mediaRecorder.addEventListener("dataavailable",e.onDataAvailableSafari),e.mediaRecorder.addEventListener("stop",e.onStop);case 6:case"end":return t.stop()}}),t)}))),e.onDataAvailable=function(){var t=Object(f.a)(m.a.mark((function t(n){var a,r,o,c,i=arguments;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.data,r=n.timecode,o=i.length>1&&void 0!==i[1]?i[1]:void 0,alert(a.size),t.next=5,e.sendDataToServer(a,r,o);case 5:if((c=t.sent).ok){t.next=8;break}return t.abrupt("return");case 8:c.text().then((function(t){return e.props.sendMessage(t)}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onDataAvailableSafari=function(t){var n=t.data,a=[].concat(Object(g.a)(e.state.chunks),[n]);e.setState({chunks:a})},e.onStop=function(t){var n=t.data,a=t.timecode,r=void 0===a?_.getTime():a,o=[].concat(Object(g.a)(e.state.chunks),[n]),c=new Blob(o,{type:"audio/wav"});e.sendDataToServer(c,r,"postFileMp4/");var i=URL.createObjectURL(c),s=new Audio(i),d=[].concat(Object(g.a)(e.state.audios),[s]);o=[];var u=[].concat(Object(g.a)(e.state.urls),[i]);e.setState({chunks:o,audios:d,urls:u})},e.sendDataToServer=function(){var t=Object(f.a)(m.a.mark((function t(n,a){var r,o,c,i=arguments;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=i.length>2&&void 0!==i[2]?i[2]:"postFileWebm/",(o=new FormData).append("file",n),console.log(n.type),alert(n.type),c=n.length||n.size,t.abrupt("return",fetch("".concat(w,"/").concat(r),{headers:{name:"".concat(e.props.id).concat(a),segment:R,id:e.props.id,label:e.state.label,gameId:e.props.gameId,"Content-Range":"bytes 0-".concat(c,"/").concat(c),"Accept-Ranges":"bytes","Content-Transfer-Encoding":"binary","Content-Length":c},method:"POST",body:o}));case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.startRecording=Object(f.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(void 0===e.mediaRecorder)){t.next=3;break}return t.abrupt("return");case 3:if(!(null===e.mediaRecorder)){t.next=6;break}return t.abrupt("return");case 6:e.mediaRecorder.start(3e3),R=0,e.setState({recording:!0});case 9:case"end":return t.stop()}}),t)}))),e.stopRecording=function(){var t=void 0===e.mediaRecorder,n=!e.state.recording;t||n||(null===e.mediaRecorder||(e.mediaRecorder.stop(),e.setState({recording:!1})))},e.playAudio=function(t){e.state.audios[t].play()},e.createAudios=function(t){return t.map((function(t,n){return Object(a.jsx)("div",{children:Object(a.jsx)("a",{href:e.state.urls[n],download:"".concat(n,".wav"),children:n})},n)}))},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.prepareMicrophone(),this.prepareUnityCommunication()}},{key:"render",value:function(){try{var e;console.log(null===(e=this.mediaRecorder)||void 0===e?void 0:e.state);var t=this.createAudios(this.state.audios);return""===this.state.label?null:Object(a.jsxs)("div",{children:[Object(a.jsx)(y,{recording:this.state.recording,startRecording:this.startRecording,stopRecording:this.stopRecording}),t]})}catch(n){return Object(a.jsx)("div",{children:n.message})}}}]),n}(r.Component),I=n(30),k=new h.UnityContent("Build/webgl1/game.json","Build/webgl1/UnityLoader.js"),S=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;Object(i.a)(this,n),(a=t.call(this,e)).generateUUID=function(){var e=Math.round(10*Math.random());return Object(I.a)().substring(e,e+6)},a.avaliateProduction=function(e){var t=JSON.parse(e);parseInt(t.gameId)===a.state.gameId&&"true"===t.response.toLowerCase()&&(console.log("characterMoves"),k.send("Character","moveCharacter","True"))},a.increaseId=function(){a.setState({gameId:a.state.gameId+1})},a.doubleClick=function(){var e=a.generateUUID();a.changeId(e)},a.mouseDown=function(){var e=setTimeout((function(e){return a.changeId()}),1e3);a.setState({timeout:e})},a.mouseUp=function(){clearTimeout(a.state.timeout)},a.changeId=function(e){console.log(e),e||(e=prompt("Qual \xe9 o id?"))&&6===e.length?(localStorage.setItem("id",e),a.setState({id:e})):alert("Id Inv\xe1lido! Tente novamente")};var r=localStorage.getItem("id");return null===r&&(r=a.generateUUID(),localStorage.setItem("id",r)),a.state={id:r,gameId:0},a}return Object(s.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:p.a.App,children:Object(a.jsxs)("header",{className:p.a.header,children:[Object(a.jsx)("div",{className:p.a.Unity,children:Object(a.jsx)(b.a,{unityContent:k})}),Object(a.jsxs)("div",{className:p.a.centeredDiv,children:[Object(a.jsx)(x,{sendMessage:this.avaliateProduction,id:this.state.id,unity:k,gameId:this.state.gameId,newGame:this.increaseId}),Object(a.jsx)("p",{className:p.a.p,children:Object(a.jsx)("button",{className:p.a.button,onDoubleClick:this.doubleClick,onMouseDown:this.mouseDown,onMouseUp:this.mouseUp,children:this.state.id})})]})]})})}}]),n}(r.Component),A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,31)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),o(e),c(e)}))};c.a.render(Object(a.jsx)(S,{}),document.getElementById("root")),A(),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/sw.js").then((function(e){})).catch((function(e){}))}))},3:function(e,t,n){e.exports={App:"App_App__2EZG_","App-logo":"App_App-logo__3Yx17",header:"App_header__2Wyi5",p:"App_p__1TF4B",Unity:"App_Unity__1ss9n",centeredDiv:"App_centeredDiv__2KJI6",button:"App_button__2LSbO"}}},[[28,1,2]]]);
//# sourceMappingURL=main.cbc9bcc6.chunk.js.map