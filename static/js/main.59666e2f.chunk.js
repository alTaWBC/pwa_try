(this.webpackJsonppwa_try=this.webpackJsonppwa_try||[]).push([[0],{11:function(e,t,n){e.exports={button:"RecordButton_button__IZaY8",Red:"RecordButton_Red__22ynq"}},22:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(2),o=n.n(r),i=n(16),c=n.n(i),s=(n(22),n(5)),u=n(6),d=n(8),p=n(7),l=n(3),h=n.n(l),m=n(10),v=n.n(m),g=n(1),b=n.n(g),f=n(4),j=n(11),w=n.n(j),O=function(e){var t=[w.a.button];return e.recording&&t.push(w.a.Red),Object(a.jsx)("button",{onClick:e.recording?e.stopRecording:e.startRecording,className:t.join(" "),children:Object(a.jsx)("i",{className:"material-icons",children:e.recording?"mic_off":"mic"})})},_="https://biovisualspeech.eu.pythonanywhere.com",y=0,x=function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={recording:!1,label:"l"},e.prepareUnityCommunication=function(){e.props.unity.on("GameOver",(function(){e.stopRecording(),e.changeLabel()})),e.props.unity.on("GameStart",(function(t){e.stopRecording(),e.changeLabel(t.split("_")[1]),"Menu"!==t&&e.props.newGame()}))},e.changeLabel=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e.setState({label:t})},e.prepareMicrophone=Object(f.a)(b.a.mark((function t(){var n,a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.mediaDevices.getUserMedia({audio:!0});case 3:n=t.sent,e.mediaRecorder=new MediaRecorder(n),a=window.navigator.platform.includes("iPhone")||window.navigator.platform.includes("Mac")||window.navigator.platform.includes("iPad"),e.mediaRecorder.addEventListener("dataavailable",a?e.onDataAvailableSafari:e.onDataAvailable),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),e.mediaRecorder=void 0;case 12:case"end":return t.stop()}}),t,null,[[0,9]])}))),e.onDataAvailable=function(){var t=Object(f.a)(b.a.mark((function t(n){var a,r,o,i,c=arguments;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.data,r=n.timecode,o=c.length>1&&void 0!==c[1]?c[1]:void 0,alert(r),t.next=5,e.sendDataToServer(a,r,o);case 5:if((i=t.sent).ok){t.next=8;break}return t.abrupt("return");case 8:i.text().then((function(t){return e.props.sendMessage(t)}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onDataAvailableSafari=function(){var t=Object(f.a)(b.a.mark((function t(n){var a,r,o,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=n.data,r=n.timecode,o=new Blob([a],{type:"audio/mp4"}),i=URL.createObjectURL(o),new Audio(i).play(),e.onDataAvailable({data:o,timecode:r},"postFileMp4/");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.sendDataToServer=function(){var t=Object(f.a)(b.a.mark((function t(n,a){var r,o,i=arguments;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=i.length>2&&void 0!==i[2]?i[2]:"postFileWebm/",alert("".concat(_,"/").concat(r)),(o=new FormData).append("file",n),t.abrupt("return",fetch("".concat(_,"/").concat(r),{headers:{name:a,segment:y,id:e.props.id,label:e.state.label,gameId:e.props.gameId,"Content-Length":n.length},method:"POST",body:o}));case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.startRecording=Object(f.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(void 0===e.mediaRecorder)){t.next=3;break}return t.abrupt("return");case 3:e.mediaRecorder.start(3e3),y=0,e.setState({recording:!0});case 6:case"end":return t.stop()}}),t)}))),e.stopRecording=function(){var t=void 0===e.mediaRecorder,n=!e.state.recording;t||n||(e.mediaRecorder.stop(),e.setState({recording:!1}))},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.prepareMicrophone(),this.prepareUnityCommunication();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return""===this.state.label?null:Object(a.jsx)(O,{recording:this.state.recording,startRecording:this.startRecording,stopRecording:this.stopRecording})}}]),n}(o.a.Component),I=n(29),R=new m.UnityContent("Build/webgl1/game.json","Build/webgl1/UnityLoader.js"),k=function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;Object(s.a)(this,n),(a=t.call(this,e)).generateUUID=function(){var e=Math.round(10*Math.random());return Object(I.a)().substring(e,e+6)},a.avaliateProduction=function(e){var t=JSON.parse(e);parseInt(t.gameId)===a.state.gameId&&"true"===t.response.toLowerCase()&&(console.log("characterMoves"),R.send("Character","moveCharacter","True"))},a.increaseId=function(){a.setState({gameId:a.state.gameId+1})},a.doubleClick=function(){var e=a.generateUUID();a.changeId(e)},a.mouseDown=function(){var e=setTimeout((function(e){return a.changeId()}),1e3);a.setState({timeout:e})},a.mouseUp=function(){clearTimeout(a.state.timeout)},a.changeId=function(e){console.log(e),e||(e=prompt("Qual \xe9 o id?"))&&6===e.length?(localStorage.setItem("id",e),a.setState({id:e})):alert("Id Inv\xe1lido! Tente novamente")};var r=localStorage.getItem("id");return null===r&&(r=a.generateUUID(),localStorage.setItem("id",r)),a.state={id:r,gameId:0},a}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:h.a.App,children:Object(a.jsxs)("header",{className:h.a.header,children:[Object(a.jsx)("div",{className:h.a.Unity,children:Object(a.jsx)(v.a,{unityContent:R})}),Object(a.jsxs)("div",{className:h.a.centeredDiv,children:[Object(a.jsx)(x,{sendMessage:this.avaliateProduction,id:this.state.id,unity:R,gameId:this.state.gameId,newGame:this.increaseId}),Object(a.jsx)("p",{className:h.a.p,children:Object(a.jsx)("button",{className:h.a.button,onDoubleClick:this.doubleClick,onMouseDown:this.mouseDown,onMouseUp:this.mouseUp,children:this.state.id})})]})]})})}}]),n}(r.Component),D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,30)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),o(e),i(e)}))};c.a.render(Object(a.jsx)(k,{}),document.getElementById("root")),D(),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/sw.js").then((function(e){})).catch((function(e){}))}))},3:function(e,t,n){e.exports={App:"App_App__2EZG_","App-logo":"App_App-logo__3Yx17",header:"App_header__2Wyi5",p:"App_p__1TF4B",Unity:"App_Unity__1ss9n",centeredDiv:"App_centeredDiv__2KJI6",button:"App_button__2LSbO"}}},[[27,1,2]]]);
//# sourceMappingURL=main.59666e2f.chunk.js.map