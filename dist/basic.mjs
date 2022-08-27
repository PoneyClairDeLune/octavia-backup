var K=Object.create;var T=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty;var j=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var J=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Q(t))!Z.call(e,a)&&a!==n&&T(e,a,{get:()=>t[a],enumerable:!(i=q(t,a))||i.enumerable});return e};var Y=(e,t,n)=>(n=e!=null?K(W(e)):{},J(t||!e||!e.__esModule?T(n,"default",{value:e,enumerable:!0}):n,e));var R=j((wt,X)=>{(function(){"use strict";let e={debug:!1,parse:function(t,n){if(t instanceof Uint8Array)return e.Uint8(t);if(typeof t=="string")return e.Base64(t);if(t instanceof HTMLElement&&t.type==="file")return e.addListener(t,n);throw new Error("MidiParser.parse() : Invalid input provided")},addListener:function(t,n){if(!File||!FileReader)throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");if(t===void 0||!(t instanceof HTMLElement)||t.tagName!=="INPUT"||t.type.toLowerCase()!=="file")return console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element"),!1;n=n||function(){},t.addEventListener("change",function(i){if(!i.target.files.length)return!1;console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");let a=new FileReader;a.readAsArrayBuffer(i.target.files[0]),a.onload=function(o){n(e.Uint8(new Uint8Array(o.target.result)))}})},Base64:function(t){let n=function(o){var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(o=o.replace(/^.*?base64,/,""),o=String(o).replace(/[\t\n\f\r ]+/g,""),!/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/.test(o))throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");o+="==".slice(2-(3&o.length));let d,h="",r,c,f=0;for(;f<o.length;)d=s.indexOf(o.charAt(f++))<<18|s.indexOf(o.charAt(f++))<<12|(r=s.indexOf(o.charAt(f++)))<<6|(c=s.indexOf(o.charAt(f++))),h+=r===64?String.fromCharCode(d>>16&255):c===64?String.fromCharCode(d>>16&255,d>>8&255):String.fromCharCode(d>>16&255,d>>8&255,255&d);return h}(t=String(t));var i=n.length;let a=new Uint8Array(new ArrayBuffer(i));for(let o=0;o<i;o++)a[o]=n.charCodeAt(o);return e.Uint8(a)},Uint8:function(a){let n={data:null,pointer:0,movePointer:function(r){return this.pointer+=r,this.pointer},readInt:function(r){if((r=Math.min(r,this.data.byteLength-this.pointer))<1)return-1;let c=0;if(1<r)for(let f=1;f<=r-1;f++)c+=this.data.getUint8(this.pointer)*Math.pow(256,r-f),this.pointer++;return c+=this.data.getUint8(this.pointer),this.pointer++,c},readStr:function(r){let c="";for(let f=1;f<=r;f++)c+=String.fromCharCode(this.readInt(1));return c},backOne:function(){this.pointer--},readIntVLV:function(){let r=0;if(this.pointer>=this.data.byteLength)return-1;if(this.data.getUint8(this.pointer)<128)r=this.readInt(1);else{let f=[];for(;128<=this.data.getUint8(this.pointer);)f.push(this.readInt(1)-128);var c=this.readInt(1);for(let u=1;u<=f.length;u++)r+=f[f.length-u]*Math.pow(128,u);r+=c}return r}};if(n.data=new DataView(a.buffer,a.byteOffset,a.byteLength),n.readInt(4)!==1297377380)return console.warn("Header validation failed (not MIDI standard or file corrupt.)"),!1;n.readInt(4);let i={};i.formatType=n.readInt(2),i.tracks=n.readInt(2),i.track=[];var a=n.readInt(1),o=n.readInt(1);128<=a?(i.timeDivision=[],i.timeDivision[0]=a-128,i.timeDivision[1]=o):i.timeDivision=256*a+o;for(let r=1;r<=i.tracks;r++){i.track[r-1]={event:[]};var s,d=n.readInt(4);if(d===-1)break;if(d!==1297379947)return!1;n.readInt(4);let c=0,f=!1,u,l;for(;!f&&(c++,i.track[r-1].event[c-1]={},i.track[r-1].event[c-1].deltaTime=n.readIntVLV(),(u=n.readInt(1))!==-1);)if(128<=u?l=u:(u=l,n.movePointer(-1)),u===255){i.track[r-1].event[c-1].type=255,i.track[r-1].event[c-1].metaType=n.readInt(1);var h=n.readIntVLV();switch(i.track[r-1].event[c-1].metaType){case 47:case-1:f=!0;break;case 1:case 2:case 3:case 4:case 5:case 7:case 6:i.track[r-1].event[c-1].data=n.readStr(h);break;case 33:case 89:case 81:i.track[r-1].event[c-1].data=n.readInt(h);break;case 84:i.track[r-1].event[c-1].data=[],i.track[r-1].event[c-1].data[0]=n.readInt(1),i.track[r-1].event[c-1].data[1]=n.readInt(1),i.track[r-1].event[c-1].data[2]=n.readInt(1),i.track[r-1].event[c-1].data[3]=n.readInt(1),i.track[r-1].event[c-1].data[4]=n.readInt(1);break;case 88:i.track[r-1].event[c-1].data=[],i.track[r-1].event[c-1].data[0]=n.readInt(1),i.track[r-1].event[c-1].data[1]=n.readInt(1),i.track[r-1].event[c-1].data[2]=n.readInt(1),i.track[r-1].event[c-1].data[3]=n.readInt(1);break;default:this.customInterpreter!==null&&(i.track[r-1].event[c-1].data=this.customInterpreter(i.track[r-1].event[c-1].metaType,n,h)),this.customInterpreter!==null&&i.track[r-1].event[c-1].data!==!1||(n.readInt(h),i.track[r-1].event[c-1].data=n.readInt(h),this.debug&&console.info("Unimplemented 0xFF meta event! data block readed as Integer"))}}else switch((u=u.toString(16).split(""))[1]||u.unshift("0"),i.track[r-1].event[c-1].type=parseInt(u[0],16),i.track[r-1].event[c-1].channel=parseInt(u[1],16),i.track[r-1].event[c-1].type){case 15:this.customInterpreter!==null&&(i.track[r-1].event[c-1].data=this.customInterpreter(i.track[r-1].event[c-1].type,n,!1)),this.customInterpreter!==null&&i.track[r-1].event[c-1].data!==!1||(s=n.readIntVLV(),i.track[r-1].event[c-1].data=n.readInt(s),this.debug&&console.info("Unimplemented 0xF exclusive events! data block readed as Integer"));break;case 10:case 11:case 14:case 8:case 9:i.track[r-1].event[c-1].data=[],i.track[r-1].event[c-1].data[0]=n.readInt(1),i.track[r-1].event[c-1].data[1]=n.readInt(1);break;case 12:case 13:i.track[r-1].event[c-1].data=n.readInt(1);break;case-1:f=!0;break;default:if(this.customInterpreter!==null&&(i.track[r-1].event[c-1].data=this.customInterpreter(i.track[r-1].event[c-1].metaType,n,!1)),this.customInterpreter===null||i.track[r-1].event[c-1].data===!1)return console.log("Unknown EVENT detected... reading cancelled!"),!1}}return i},customInterpreter:null};if(typeof X<"u")X.exports=e;else{let t=typeof window=="object"&&window.self===window&&window||typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;t.MidiParser=e}})()});var b=class{#t={};addEventListener(e,t){this.#t[e]||(this.#t[e]=[]),this.#t[e].unshift(t)}removeEventListener(e,t){if(this.#t[e]){let n=this.#t[e].indexOf(t);n>-1&&this.#t[e].splice(n,1),this.#t[e].length<1&&delete this.#t[e]}}dispatchEvent(e,t){let n=new Event(e),i=this;n.data=t,this.#t[e]?.length>0&&this.#t[e].forEach(function(a){a?.call(i,n)}),this[`on${e}`]&&this[`on${e}`](n)}};var P=function(e,t){let n=Math.min(e.length,t.length),i=e.slice(0,n),a=t.slice(0,n),o=0,s=0;for(;s<n&&o==0;)o=Math.sign(i[s]-a[s]),s++;return o},$=function(){this.pool=[],this.point=function(e,t=!1){if(this.pool.length>0){let n=this.pool.length,i=1<<Math.floor(Math.log2(n)),a=i,o=64;for(;i>=1&&o>=0;){if(o<=0)throw new Error("TTL reached.");if(a==n)a-=i;else{let d=P(e,this.pool[a]);switch(d){case 0:{o=0;break}case 1:{a+i<=n&&(a+=i);break}case-1:{a!=0&&(a-=i);break}default:console.warn(`Unexpected result ${d}.`)}}i=i>>1,o--}let s=!0;if(a>=this.pool.length)s=!1;else{let d=this;this.pool[a].forEach(function(h,r,c){s&&h!=e[r]&&(s=!1)}),!s&&P(e,this.pool[a])>0&&a++}return s||t?a:-1}else return t?0:-1},this.add=function(e,t){return e.data=t,this.pool.splice(this.point(e,!0),0,e),this},this.default=function(e){console.warn(`No match for "${e}". Default action not defined.`)},this.get=function(e){let t=this.point(e);if(t>-1)return this.pool[t].data;this.default(e)},this.run=function(e,...t){let n=this.point(e);n>-1?this.pool[n].data(e.slice(this.pool[n].length),...t):this.default(e,...t)}};var p=["off","hall","room","stage","plate","delay LCR","delay LR","echo","cross delay","early reflections","gate reverb","reverse gate"];p[16]="white room";p[17]="tunnel";p[19]="basement";p[20]="karaoke";p[64]="pass through";p[65]="chorus";p[66]="celeste";p[67]="flanger";p[68]="symphonic";p[69]="rotary speaker";p[70]="tremelo";p[71]="auto pan";p[72]="phaser";p[73]="distortion";p[74]="overdrive";p[75]="amplifier";p[76]="3-band EQ";p[77]="2-band EQ";p[78]="auto wah";var S=["melodic","drum","drum set 1","drum set 2"],_=[17.1,18.6,20.2,21.8,23.3,24.9,26.5,28,29.6,31.2,32.8,34.3,35.9,37.5,39,40.6,42.2,43.7,45.3,46.9,48.4,50],w=[20,22,25,28,32,36,40,45,50,56,63,70,80,90,100,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,700,800,900,1e3,1100,1200,1400,1600,1800,2e3,2200,2500,2800,3200,3600,4e3,4500,5e3,5600,6300,7e3,8e3,9e3,1e4,11e3,12e3,14e3,16e3,18e3,2e4],C=[0,.04,.08,.13,.17,.21,.25,.29,.34,.38,.42,.46,.51,.55,.59,.63,.67,.72,.76,.8,.84,.88,.93,.97,1.01,1.05,1.09,1.14,1.18,1.22,1.26,1.3,1.35,1.39,1.43,1.47,1.51,1.56,1.6,1.64,1.68,1.72,1.77,1.81,1.85,1.89,1.94,1.98,2.02,2.06,2.1,2.15,2.19,2.23,2.27,2.31,2.36,2.4,2.44,2.48,2.52,2.57,2.61,2.65,2.69,2.78,2.86,2.94,3.03,3.11,3.2,3.28,3.37,3.45,3.53,3.62,3.7,3.87,4.04,4.21,4,37,4.54,4.71,4.88,5.05,5.22,5.38,5.55,5.72,6.06,6.39,6.73,7.07,7.4,7.74,8.08,8.41,8.75,9.08,9.42,9.76,10.1,10.8,11.4,12.1,12.8,13.5,14.1,14.8,15.5,16.2,16.8,17.5,18.2,19.5,20.9,22.2,23.6,24.9,26.2,27.6,28.9,30.3,31.6,33,34.3,37,39.7],D=function(e){let t=.1,n=-.3;return e>66?(t=5,n=315):e>56?(t=1,n=47):e>46&&(t=.5,n=18.5),t*e-n},A=function(e){return e>105?_[e-106]:e>100?e*1.1-100:e/10};var L=["room 1","room 2","room 3","hall 1","hall 2","plate","delay","panning delay"],B=["chorus 1","chorus 2","chorus 3","chorus 4","feedback","flanger","short delay","short delay feedback"];var m=function(e=64){return Math.round(2e3*Math.log10(e/64))/100};var E=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw"],k={};E.forEach(function(e,t){k[e]=t});var O=[[0,0,0,0,0,0,0,56,82,81],[0,0,3,0,0,127,0,0,0,0]],tt=[0,3,81,84,88],g=function(e,t,n){n[t]=0},et=function(e){let t=[[]];return e?.forEach(function(n){n==247||(n==240?t.push([]):t[t.length-1].push(n))}),t},N=function(e,t="",n="",i=2){return e?`${t}${e.toString().padStart(i,"0")}${n}`:""},U=class extends b{#t=0;#m=new Array(256);#h=0;#d=new Array(64);#e=new Uint8ClampedArray(8192);#f=new Uint8ClampedArray(64);#r=new Uint8ClampedArray(8192);#n=new Uint16Array(256);#g=new Int16Array(64);#l=new Array(64);#s=new Uint8Array(64);#k=0;#X=0;#G=100;#w=0;#b="";#y=0;#c=!1;#a=[];#p=[];#I={8:function(e){let t=e.part*128+e.data[0],n=this.#n.indexOf(t);n>-1&&(this.#n[n]=0,this.#r[t]=0)},9:function(e){this.#d[e.part]=1;let t=e.part*128+e.data[0];if(e.data[1]>0){let n=0;for(;this.#n[n]>0;)n++;n<256?(this.#n[n]=t,this.#r[t]=e.data[1],this.#s[e.part]<e.data[1]&&(this.#s[e.part]=e.data[1])):console.error("Polyphony exceeded.")}else{let n=this.#n.indexOf(t);n>-1&&(this.#n[n]=0,this.#r[t]=0)}},10:function(e){let t=e.part*128+e.data[0];this.#n.indexOf(t)>-1&&(this.#r[t]=data[1])},11:function(e){this.#d[e.part]=1,e.data[0]==0&&this.#t==k.gs&&this.#e[128*e.part]==120&&e.data[1]==0&&(e.data[1]=120),this.#e[e.part*128+e.data[0]]=e.data[1]},12:function(e){this.#d[e.part]=1,this.#f[e.part]=e.data,this.#l[e.part]=0},13:function(e){let t=this;this.#n.forEach(function(n){let i=n>>7;e.part==i&&(t.#r[n]=e.data)})},14:function(e){this.#g[e.part]=e.data[1]*128+e.data[0]-8192},15:function(e){let t=this;et(e.data).forEach(function(n){t.#v.run(n)})},255:function(e){if((this.#p[e.meta]||function(){}).call(this,e.data,e.track),tt.indexOf(e.meta)>-1)return e.reply="meta",e;self.debugMode&&console.debug(e)}};#v;#i;#o;#E;#$;#u;getActive(){let e=this.#d.slice();return this.#t==k.mt32&&(e[0]=0),e}getCc(e){let t=e*128,n=this.#e.slice(t,t+128);return n[0]=n[0]||this.#k,n[32]=n[32]||this.#X,n}getPitch(){return this.#g.slice()}getProgram(){return this.#f.slice()}getTexts(){return this.#a.slice()}getVel(e){let t=new Map,n=this;return this.#n.forEach(function(i){let a=Math.floor(i/128),o=i%128;e==a&&n.#r[i]>0&&t.set(o,n.#r[i])}),t}getBitmap(){return{bitmap:this.#m.slice(),expire:this.#h}}getCustomNames(){return this.#l.slice()}getLetter(){return{text:this.#b,expire:this.#y}}getMode(){return E[this.#t]}getMaster(){return{volume:this.#G}}getRawStrength(){let e=this;return this.#n.forEach(function(t){let n=Math.floor(t/128);e.#r[t]>e.#s[n]&&(e.#s[n]=e.#r[t])}),this.#s.slice()}getStrength(){let e=[],t=this;return this.getRawStrength().forEach(function(n,i){e[i]=Math.floor(n*t.#e[i*128+7]*t.#e[i*128+11]*t.#G/803288)}),e}init(){this.dispatchEvent("mode","?"),this.#t=0,this.#k=0,this.#X=0,this.#w=0,this.#d.forEach(g),this.#e.forEach(g),this.#f.forEach(g),this.#r.forEach(g),this.#n.forEach(g),this.#s.forEach(g),this.#G=100,this.#a=[],this.#y=0,this.#b="",this.#h=0,this.#m.forEach(g),this.#l.forEach(g),this.#c=!1,this.#e[1152]=127;for(let e=0;e<64;e++)this.#e[e*128+7]=127,this.#e[e*128+11]=127,this.#e[e*128+74]=127,this.#e[e*128+10]=64}switchMode(e,t=!1){let n=E.indexOf(e);if(n>-1)(this.#t==0||t)&&(this.#t=n,this.#k=O[0][n],this.#X=O[1][n],this.dispatchEvent("mode",e));else throw new Error(`Unknown mode ${e}`)}runJson(e){return this.#s.forEach(g),this.#I[e.type].call(this,e)}runRaw(e){}constructor(){super();let e=this;this.#v=new $,this.#i=new $,this.#o=new $,this.#E=new $,this.#$=new $,this.#u=new $,this.#v.default=function(t){console.debug("Unparsed SysEx: ",t)},this.#i.default=function(t,n){console.debug(`Unparsed GS Part on channel ${n}: `,t)},this.#E.default=function(t,n){console.debug(`Unparsed XG Part on channel ${n}: `,t)},this.#$.default=function(t,n){console.debug(`Unparsed XG Drum Part on channel ${n}: `,t)},this.#p[1]=function(t){switch(t.slice(0,2)){case"@K":{this.#c=!0,this.#a.unshift("Karaoke mode active."),console.debug(`Karaoke mode active: ${t.slice(2)}`);break}case"@L":{this.#c=!0,this.#a.unshift(`Language: ${t.slice(2)}`);break}case"@T":{this.#c=!0,this.#a.unshift(`Ka.Title: ${t.slice(3)}`);break}default:this.#c?t[0]=="\\"?this.#a.unshift(`@@ ${t.slice(1)}`):t[0]=="/"?this.#a.unshift(t.slice(1)):this.#a[0]+=t:this.#a.unshift(t)}},this.#p[2]=function(t){this.#a.unshift(`Copyrite: ${t}`)},this.#p[3]=function(t,n){n<1&&this.#w<1&&this.#a.unshift(`TrkTitle: ${t}`)},this.#p[4]=function(t,n){n<1&&this.#w<1&&this.#a.unshift(`${N(this.#w,""," ")}Instrmnt: ${t}`)},this.#p[5]=function(t){this.#a.unshift(`C.Lyrics: ${t}`)},this.#p[6]=function(t){this.#a.unshift(`${N(this.#w,""," ")}C.Marker: ${t}`)},this.#p[7]=function(t){this.#a.unshift(`CuePoint: ${t}`)},this.#p[32]=function(t){this.#w=t[0]+1},this.#v.add([126,127,9,1],function(){e.switchMode("gm",!0),e.#c=!1,console.info("MIDI reset: GM")}).add([126,127,9,3],function(){e.switchMode("g2",!0),e.#c=!1,console.info("MIDI reset: GM2")}).add([65,16,22,18,127,1],function(){e.switchMode("mt32",!0),e.#c=!1,console.info("MIDI reset: MT-32")}).add([65,16,66,18,64,0,127,0,65],function(){e.switchMode("gs",!0),e.#e[1152]=120,e.#c=!1,console.info("MIDI reset: GS")}).add([66,48,66,52,0],function(t){e.switchMode("ns5r",!0),e.#c=!1,console.info("KORG reset:",t)}).add([67,16,76,0,0,126,0],function(t){e.switchMode("xg",!0),e.#c=!1,console.info("MIDI reset: XG")}),this.#v.add([127,127,4,1],function(t){e.switchMode("gm"),e.#G=(t[1]<<7+t[0])/163.83}),this.#v.add([67,16,76,6,0],function(t){let n=t[0];e.#b=" ".repeat(n),e.#y=Date.now()+3200,t.slice(1).forEach(function(i){e.#b+=String.fromCharCode(i)})}).add([67,16,76,7,0,0],function(t){for(e.#h=Date.now()+3200;t.length<48;)t.unshift(0);t.forEach(function(n,i){let a=Math.floor(i/16),o=i%16,s=(o*3+a)*7,d=7,h=0;for(s-=o*5,a==2&&(d=2);h<d;)e.#m[s+h]=n>>6-h&1,h++})}).add([67,16,76,2,1,0],function(t){console.info(`XG reverb type: ${p[t[0]]}${t[1]>0?" "+(t[1]+1):""}`)}).add([67,16,76,2,1,2],function(t){console.info(`XG reverb time: ${D(t)}s`)}).add([67,16,76,2,1,3],function(t){console.info(`XG reverb diffusion: ${t}`)}).add([67,16,76,2,1,4],function(t){console.info(`XG reverb initial delay: ${t}`)}).add([67,16,76,2,1,5],function(t){console.info(`XG reverb high pass cutoff: ${w[t[0]]}Hz`)}).add([67,16,76,2,1,6],function(t){console.info(`XG reverb low pass cutoff: ${w[t[0]]}Hz`)}).add([67,16,76,2,1,7],function(t){console.info(`XG reverb width: ${t}`)}).add([67,16,76,2,1,8],function(t){console.info(`XG reverb height: ${t}`)}).add([67,16,76,2,1,9],function(t){console.info(`XG reverb depth: ${t}`)}).add([67,16,76,2,1,10],function(t){console.info(`XG reverb wall type: ${t}`)}).add([67,16,76,2,1,11],function(t){console.info(`XG reverb dry/wet: ${t[0]}`)}).add([67,16,76,2,1,12],function(t){console.info(`XG reverb return: ${t}`)}).add([67,16,76,2,1,13],function(t){console.info(`XG reverb pan: ${t[0]-64}`)}).add([67,16,76,2,1,16],function(t){console.info(`XG reverb delay: ${t}`)}).add([67,16,76,2,1,17],function(t){console.info(`XG density: ${t}`)}).add([67,16,76,2,1,18],function(t){console.info(`XG reverb balance: ${t}`)}).add([67,16,76,2,1,20],function(t){console.info(`XG reverb feedback: ${t}`)}).add([67,16,76,2,1,32],function(t){console.info(`XG chorus type: ${p[t[0]]}${t[1]>0?" "+(t[1]+1):""}`)}).add([67,16,76,2,1,34],function(t){console.info(`XG chorus LFO: ${C[t[0]]}Hz`)}).add([67,16,76,2,1,35],function(t){}).add([67,16,76,2,1,36],function(t){console.info(`XG chorus feedback: ${t}`)}).add([67,16,76,2,1,37],function(t){console.info(`XG chorus delay offset: ${A(t[0])}ms`)}).add([67,16,76,2,1,39],function(t){console.info(`XG chorus low: ${w[t[0]]}Hz`)}).add([67,16,76,2,1,40],function(t){console.info(`XG chorus low: ${t[0]-64}dB`)}).add([67,16,76,2,1,41],function(t){console.info(`XG chorus high: ${w[t[0]]}Hz`)}).add([67,16,76,2,1,42],function(t){console.info(`XG chorus high: ${t[0]-64}dB`)}).add([67,16,76,2,1,43],function(t){console.info(`XG chorus dry/wet: ${t}`)}).add([67,16,76,2,1,44],function(t){console.info(`XG chorus return: ${t}`)}).add([67,16,76,2,1,45],function(t){console.info(`XG chorus pan: ${t[0]-64}`)}).add([67,16,76,2,1,46],function(t){console.info(`XG chorus to reverb: ${t}`)}).add([67,16,76,2,1,64],function(t){console.info(`XG variation type: ${p[t[0]]}${t[1]>0?" "+(t[1]+1):""}`)}).add([67,16,76,2,1,66],function(t){console.info(`XG variation 1: ${t}`)}).add([67,16,76,2,1,68],function(t){console.info(`XG variation 2: ${t}`)}).add([67,16,76,2,1,70],function(t){console.info(`XG variation 3: ${t}`)}).add([67,16,76,2,1,72],function(t){console.info(`XG variation 4: ${t}`)}).add([67,16,76,2,1,74],function(t){console.info(`XG variation 5: ${t}`)}).add([67,16,76,2,1,76],function(t){console.info(`XG variation 6: ${t}`)}).add([67,16,76,2,1,78],function(t){console.info(`XG variation 7: ${t}`)}).add([67,16,76,2,1,80],function(t){console.info(`XG variation 8: ${t}`)}).add([67,16,76,2,1,82],function(t){console.info(`XG variation 9: ${t}`)}).add([67,16,76,2,1,84],function(t){console.info(`XG variation 10: ${t}`)}).add([67,16,76,2,1,86],function(t){console.info(`XG variation return: ${m(t[0])}dB`)}).add([67,16,76,2,1,87],function(t){console.info(`XG variation pan: ${t[0]-64}`)}).add([67,16,76,2,1,88],function(t){console.info(`XG variation to reverb: ${m(t[0])}dB`)}).add([67,16,76,2,1,89],function(t){console.info(`XG variation to chorus: ${m(t[0])}dB`)}).add([67,16,76,2,1,90],function(t){console.info(`XG variation connection: ${t[0]?"system":"insertion"}`)}).add([67,16,76,2,1,91],function(t){console.info(`XG variation part: ${t}`)}).add([67,16,76,2,1,92],function(t){console.info(`XG variation mod wheel: ${t[0]-64}`)}).add([67,16,76,2,1,93],function(t){console.info(`XG variation bend wheel: ${t[0]-64}`)}).add([67,16,76,2,1,94],function(t){console.info(`XG variation channel after touch: ${t[0]-64}`)}).add([67,16,76,2,1,95],function(t){console.info(`XG variation AC1: ${t[0]-64}`)}).add([67,16,76,2,1,96],function(t){console.info(`XG variation AC2: ${t[0]-64}`)}).add([67,16,76,8],function(t,n,i){e.#E.run(t.slice(1),t[0],i)}).add([67,16,76,48],function(t){e.#$.run(t.slice(1),0,t[0])}).add([67,16,76,49],function(t){e.#$.run(t.slice(1),1,t[0])}).add([67,16,76,50],function(t){e.#$.run(t.slice(1),2,t[0])}).add([67,16,76,51],function(t){e.#$.run(t.slice(1),3,t[0])}),this.#v.add([65,1],function(t){e.switchMode("mt32"),e.#u.run(t,1)}).add([65,2],function(t){e.switchMode("mt32"),e.#u.run(t,2)}).add([65,3],function(t){e.switchMode("mt32"),e.#u.run(t,3)}).add([65,4],function(t){e.switchMode("mt32"),e.#u.run(t,4)}).add([65,5],function(t){e.switchMode("mt32"),e.#u.run(t,5)}).add([65,6],function(t){e.switchMode("mt32"),e.#u.run(t,6)}).add([65,7],function(t){e.switchMode("mt32"),e.#u.run(t,7)}).add([65,8],function(t){e.switchMode("mt32"),e.#u.run(t,8)}).add([65,9],function(t){e.switchMode("mt32"),e.#d[9]=1,e.#u.run(t,9)}),this.#u.add([22,18,2,0,0],function(t,n){let i="";t.slice(0,10).forEach(function(a){a>31&&(i+=String.fromCharCode(a))}),e.#l[n]=i,console.debug(`MT-32 tone properties on channel ${n+1} (${i}): ${t.slice(10)}`)}),this.#v.add([65,16,66,18,0,0,127],function(t){e.switchMode("gs",!0),e.#e[1152]=120,e.#c=!1,console.info(`GS system set to ${t[0]?"dual":"single"} mode.`)}).add([65,16,66,18,64,0,0],function(t){}).add([65,16,66,18,64,0,4],function(t){e.#G=t[0]*129/163.83}).add([65,16,66,18,64,0,5],function(t){console.info(`GS master key shift: ${t[0]-64} semitones.`)}).add([65,16,66,18,64,0,6],function(t){console.info(`GS master pan:${t[0]-64}.`)}).add([65,16,66,18,64,1,48],function(t){console.info(`GS reverb type: ${L[t[0]]}`)}).add([65,16,66,18,64,1,49],function(t){}).add([65,16,66,18,64,1,50],function(t){console.info(`GS reverb pre-LPF: ${t[0]}`)}).add([65,16,66,18,64,1,51],function(t){console.info(`GS reverb level: ${t[0]}`)}).add([65,16,66,18,64,1,52],function(t){console.info(`GS reverb time: ${t[0]}`)}).add([65,16,66,18,64,1,53],function(t){console.info(`GS reverb delay feedback: ${t[0]}`)}).add([65,16,66,18,64,1,55],function(t){console.info(`GS reverb pre-delay time: ${t[0]}`)}).add([65,16,66,18,64,1,56],function(t){console.info(`GS chorus type: ${B[t[0]]}`)}).add([65,16,66,18,64,1,57],function(t){console.info(`GS chorus pre-LPF: ${t[0]}`)}).add([65,16,66,18,64,2,0],function(t){console.info(`GS EQ low: ${t[0]?400:200}Hz`)}).add([65,16,66,18,64,2,1],function(t){console.info(`GS EQ low: ${t[0]-64}dB`)}).add([65,16,66,18,64,2,2],function(t){console.info(`GS EQ high: ${t[0]?6e3:3e3}Hz`)}).add([65,16,66,18,64,2,3],function(t){console.info(`GS EQ high: ${t[0]-64}dB`)}).add([65,16,66,18,64,3],function(t){}).add([65,16,69,18,16,0],function(t){let n=t[0];e.#b=" ".repeat(n),e.#y=Date.now()+3200,t.pop(),t.slice(1).forEach(function(i){e.#b+=String.fromCharCode(i)})}).add([65,16,69,18,16,1,0],function(t){e.#h=Date.now()+3200,t.forEach(function(n,i){if(i<64){let a=Math.floor(i/16),o=i%16,s=(o*4+a)*5,d=5,h=0;for(s-=o*4,a==3&&(d=1);h<d;)e.#m[s+h]=n>>4-h&1,h++}})}).add([65,16,66,18,64,16],function(t){e.#i.run(t,9)}).add([65,16,66,18,64,17],function(t){e.#i.run(t,0)}).add([65,16,66,18,64,18],function(t){e.#i.run(t,1)}).add([65,16,66,18,64,19],function(t){e.#i.run(t,2)}).add([65,16,66,18,64,20],function(t){e.#i.run(t,3)}).add([65,16,66,18,64,21],function(t){e.#i.run(t,4)}).add([65,16,66,18,64,22],function(t){e.#i.run(t,5)}).add([65,16,66,18,64,23],function(t){e.#i.run(t,6)}).add([65,16,66,18,64,24],function(t){e.#i.run(t,7)}).add([65,16,66,18,64,25],function(t){e.#i.run(t,8)}).add([65,16,66,18,64,26],function(t){e.#i.run(t,10)}).add([65,16,66,18,64,27],function(t){e.#i.run(t,11)}).add([65,16,66,18,64,28],function(t){e.#i.run(t,12)}).add([65,16,66,18,64,29],function(t){e.#i.run(t,13)}).add([65,16,66,18,64,30],function(t){e.#i.run(t,14)}).add([65,16,66,18,64,31],function(t){e.#i.run(t,15)}).add([65,16,66,18,64,64],function(t){e.#o.run(t,9)}).add([65,16,66,18,64,65],function(t){e.#o.run(t,0)}).add([65,16,66,18,64,66],function(t){e.#o.run(t,1)}).add([65,16,66,18,64,67],function(t){e.#o.run(t,2)}).add([65,16,66,18,64,68],function(t){e.#o.run(t,3)}).add([65,16,66,18,64,69],function(t){e.#o.run(t,4)}).add([65,16,66,18,64,70],function(t){e.#o.run(t,5)}).add([65,16,66,18,64,71],function(t){e.#o.run(t,6)}).add([65,16,66,18,64,72],function(t){e.#o.run(t,7)}).add([65,16,66,18,64,73],function(t){e.#o.run(t,8)}).add([65,16,66,18,64,74],function(t){e.#o.run(t,10)}).add([65,16,66,18,64,75],function(t){e.#o.run(t,11)}).add([65,16,66,18,64,76],function(t){e.#o.run(t,12)}).add([65,16,66,18,64,77],function(t){e.#o.run(t,13)}).add([65,16,66,18,64,78],function(t){e.#o.run(t,14)}).add([65,16,66,18,64,79],function(t){e.#o.run(t,15)}),e.#$.add([0],function(t,n,i){console.info(`XG Drum ${n} note ${i} coarse pitch bend ${t[0]-64}.`)}).add([1],function(t,n,i){console.info(`XG Drum ${n} note ${i} fine pitch bend ${t[0]-64}.`)}).add([2],function(t,n,i){console.info(`XG Drum ${n} note ${i} level ${t[0]}.`)}).add([3],function(t,n,i){console.info(`XG Drum ${n} note ${i} alt group ${t[0]}.`)}).add([4],function(t,n,i){console.info(`XG Drum ${n} note ${i} pan ${t[0]-64}.`)}).add([5],function(t,n,i){console.info(`XG Drum ${n} note ${i} reverb send ${m(t[0])}dB.`)}).add([6],function(t,n,i){console.info(`XG Drum ${n} note ${i} chorus send ${m(t[0])}dB.`)}).add([7],function(t,n,i){console.info(`XG Drum ${n} note ${i} variation send ${m(t[0])}dB.`)}).add([8],function(t,n,i){console.info(`XG Drum ${n} note ${i} key assign as ${t[0]>0?"multi":"single"}.`)}).add([9],function(t,n,i){}).add([10],function(t,n,i){}).add([11],function(t,n,i){}).add([12],function(t,n,i){}).add([13],function(t,n,i){}).add([14],function(t,n,i){}).add([15],function(t,n,i){}),e.#E.add([0],function(t,n){console.info(`XG Part reserve ${t[0]} elements for channel ${n}.`)}).add([1],function(t,n){e.#e[n*128]=t[0]}).add([2],function(t,n){e.#e[n*128+32]=t[0]}).add([3],function(t,n){e.#f[n]=t[0]}).add([4],function(t,n){console.info(`XG Part send CH${n} to CH${t[0]}. Channel redirect feature required!`)}).add([5],function(t,n){console.info(`XG Part mono/poly set to ${t[0]?"mono":"poly"} for channel ${n}.`)}).add([6],function(t,n){console.info(`XG Part repeat pressing set to ${["single","multi","inst"][t[0]]} mode for channel ${n}.`)}).add([7],function(t,n){let i=t[0];e.#e[128*n]=i>1?127:0,console.info(`XG Part use mode "${S[i]}" for channel ${n}.`)}).add([14],function(t,n){e.#e[128*n+10]=t[0]}).add([17],function(t,n){console.info(`XG Part dry level ${t[0]} for channel ${n}.`)}).add([18],function(t,n){console.info(`XG Part chorus send ${m(t[0])}dB for channel ${n}.`)}).add([19],function(t,n){console.info(`XG Part reverb send ${m(t[0])}dB for channel ${n}.`)}).add([20],function(t,n){console.info(`XG Part variation send ${m(t[0])}dB for channel ${n}.`)}).add([21],function(t,n){console.info(`XG Part LFO speed ${t[0]} for channel ${n}.`)}).add([29],function(t,n){console.info(`XG Part MW bend ${t[0]-64} semitones for channel ${n}.`)}).add([32],function(t,n){console.info(`XG Part MW LFO pitch depth ${t[0]} for channel ${n}.`)}).add([33],function(t,n){console.info(`XG Part MW LFO filter depth ${t[0]} for channel ${n}.`)}).add([35],function(t,n){console.info(`XG Part bend pitch ${t[0]-64} semitones for channel ${n}.`)}).add([83],function(t,n){}).add([103],function(t,n){e.#e[n*128+65]=t[0]}).add([104],function(t,n){e.#e[n*128+5]=t[0]}).add([105],function(t,n){console.info(`XG Part EG initial ${t[0]-64} for channel ${n}.`)}).add([106],function(t,n){console.info(`XG Part EG attack time ${t[0]-64} for channel ${n}.`)}),e.#i.add([0],function(t,n){e.#e[n*128]==120&&(t[0]=120),e.#e[n*128]=t[0]||0,e.#f[n]=t[1]||0}).add([2],function(t,n){}).add([19],function(t,n){}).add([20],function(t,n){}).add([21],function(t,n){console.info(`GS Part ${n+1} type: ${["melodic","drum 1","drum 2"][t[0]]}.`),t[0]>0&&(e.#e[n*128]=120)}).add([25],function(t,n){e.#e[n*128+7]=t[0]}).add([28],function(t,n){e.#e[n*128+10]=t[0]}).add([33],function(t,n){e.#e[n*128+93]=t[0]}).add([34],function(t,n){e.#e[n*128+91]=t[0]}),e.#o.add([0],function(t,n){e.#e[n*128+32]=t[0]}).add([1],function(t,n){e.#e[n*128+32]=t[0]}).add([32],function(t,n){console.info(`GS Part ${n+1} turned EQ ${t[0]?"on":"off"}.`)}).add([33],function(t,n){}).add([34],function(t,n){console.info(`GS Part ${n+1} turned EFX ${t[0]?"on":"off"}.`)})}};var x=Y(R(),1);var F=class{#t=!1;constructor(e,t,n,i){this.#t=e,this.start=t,this.end=n,this.data=i}get duration(){return this.ranged?this.end-this.start:0}get ranged(){return this.#t}},I=class extends F{constructor(e,t,n){super(!0,e,t,n)}},V=class extends F{constructor(e,t){super(!1,e,e,t)}},M=class extends Array{#t=-1;constructor(){super(...arguments)}resetIndex(e){this.#t=-1}fresh(){this.sort(function(e,t){return e.start==t.start?0:(+(e.start>t.start)<<1)-1}),this.forEach(function(e,t){e.index=t})}step(e,t=!1){let n=[];if(t)for(let i=0;i<this.length&&!(this[i].start>e);i++){if(this[i].end<e)continue;n.push(this[i])}else{let i=this.getRange(e-1,e),a=this;i.forEach(function(o){o.index>a.#t&&(n.push(o),a.#t=o.index)})}return n}getRange(e,t){e>t&&([e,t]=[t,e]);let n=[],i=-1,a=Math.ceil(Math.sqrt(this.length)),o=!0;for(let s=0;s<this.length;s+=a)this[s+a]?i<0&&this[s+a].start>=e&&(i=s):i=i<0?s:i;for(;o;)this[i]?.end<t?this[i].start>=e&&n.push(this[i]):o=!1,i++;return n}};var nt=0xffffffffffff,H=function(e){let t=new M,n=this,i=e.timeDivision,a=120,o=new M,s=0,d=0;o.push(new I(0,nt,[120,0])),e.track.forEach(function(f){s=0,f.event.forEach(function(u){s+=u.deltaTime,u.type==255&&u?.metaType==81&&(a=6e7/u.data,o[o.length-1]&&o.push(new I(s,0xffffffffffff,[a,0])))})}),o.fresh(),o.forEach(function(f,u,l){u>0&&(l[u-1].end=f.start)});let h=120;o.forEach(function(f,u,l){u>0&&(f.end==f.start?l.splice(l.indexOf(f),1):h==f.data[0]&&(l[u-1].end=f.end,l.splice(l.indexOf(f),1)),h=f.data[0])});let r=0,c=120;return o.forEach(function(f){let u=f.start,l=u/c/i*60+r;c=f.data[0],r=l-u/c/i*60,f.data[1]=r}),console.debug("All tempo changes: ",o),a=120,s=0,d=0,e.track.forEach(function(f,u){s=0,d=0,f.event.forEach(function(l,v){s+=l.deltaTime;let G=o.step(s,!0)[0];G&&(a=G.data[0],d=G.data[1]);let y={type:l.type,data:l.data,track:u,part:0};l.type>14?y.meta=l.metaType:y.part=l.channel,t.push(new V(s/a/i*60+d,y))})}),t.fresh(),t};var it=["MSB","PRG","LSB"];var z=class{#t=[];get(e=0,t=0,n=0,i){let a,o=Array.from(arguments);i=="gs"&&e==0&&n!=0&&(o[2]=0),o[0]==127&&o[2]==0&&o[1]>111&&o[1]<127&&(o[1]=0),o[0]==0&&o[2]>111&&o[2]<120&&(o[2]=0);let s=" ";for(;!(a?.length>0);)a=this.#t[o[1]||0][(o[0]<<7)+o[2]],a||(o[2]=0,s="^",this.#t[o[1]||0][o[0]<<7]||(o[0]=0,s="*"));i=="gs"&&s=="^"&&(s=" "),s!=" "&&self.debugMode&&(a="");let d="??";switch(o[0]){case 0:{o[2]==0?d="GM":o[2]<120?d="XG":o[2]==127&&(d="MT");break}case 56:{d="AG";break}case 61:case 83:{d="AI";break}case 62:case 82:{d="XD";break}case 81:{d="RW";break}case 64:case 121:case 126:{d="XG";break}case 127:{d=n==127?"MT":t==0?"GM":"XG";break}case 120:d="GS";default:o[0]<48&&(d="GS")}return{name:a||(e||0).toString().padStart(3,"0")+" "+(t||0).toString().padStart(3,"0")+" "+(n||0).toString().padStart(3,"0"),ending:s,standard:d}}load(e){let t=this,n=[];e.split(`
`).forEach(function(i,a){let o=i.split("	"),s=[];a==0?(o.forEach(function(d,h){n[it.indexOf(d)]=h}),console.info(`Bank map significance: ${n}`)):o.forEach(function(d,h){h>2?(t.#t[s[n[1]]]=t.#t[s[n[1]]]||[],t.#t[s[n[1]]][(s[n[0]]<<7)+s[n[2]]]=o[3]):s.push(parseInt(o[h]))})})}async loadFiles(...e){this.#t=[];let t=this;for(let n=0;n<e.length;n++)await fetch(`./data/bank/${e[n]}.tsv`).then(function(i){return console.info(`Parsing voice map: ${e[n]}`),i.text()}).then(function(i){t.load.call(t,i)})}constructor(...e){this.loadFiles(...e)}};x.default.customInterpreter=function(e,t,n){let i=[],a=n==!1?t.readIntVLV():n;e==127&&(a=1);for(let o=0;o<a;o++){let s=t.readInt(1);if(i.push(s),s!=247){if(s!=240){if(s>127)return console.debug(`Early termination: ${i}`),t.backOne(),t.backOne(),i}}}return i};var Dt=class extends b{#t=new U;#m;#h="";voices=new z("xg","gs","ns5r");#d=[];#e=new Uint8ClampedArray(64);#f=.5;#r=120;#n=4;#g=4;#l=0;#s=0;reset(){this.dispatchEvent("reset"),this.#m?.resetIndex(),this.#t.init(),this.#h="",this.#f=.5,this.#r=120,this.#n=4,this.#g=4,this.#l=0,this.#s=0}async loadFile(e){this.#m=H(x.default.parse(new Uint8Array(await e.arrayBuffer())))}switchMode(e,t=!1){this.#t.switchMode(e,t)}getMode(){return this.#t.mode}get noteProgress(){return this.#s/this.#f}get noteOverall(){return this.noteProgress-this.#l}get noteBar(){return Math.floor(this.noteOverall/this.#n)}get noteBeat(){return this.noteOverall%this.#n}getTimeSig(){return[this.#n,this.#g]}getTempo(){return this.#r}render(e){e>this.#s&&(this.#s=e);let t=this.#m.step(e),n=0,i=new Set,a=this,o=[];t.forEach(function(u){let l=u.data;l.type==9&&(l.data[1]>0?i.add(l.part*128+l.data[0]):i.has(l.part*128+l.data[0])&&n++),u.data.type==8&&i.has(l.part*128+l.data[0])&&n++;let v=a.#t.runJson(l);switch(v?.reply){case"meta":{o.push(v);break}}v?.reply&&delete v.reply}),o?.length>0&&this.dispatchEvent("meta",o),this.#t.getStrength().forEach(function(u,l){let v=u-a.#e[l];a.#e[l]+=Math.ceil(v-v/2)});let s=this.#t.getActive(),d=[],h=a.#t.getPitch(),r=[],c=a.#t.getProgram(),f=0;return s.forEach(function(u,l){u&&(d[l]=a.#t.getVel(l),r[l]=a.#t.getCc(l),f+=d[l].size)}),{extraPoly:n,curPoly:f,chInUse:s,chKeyPr:d,chPitch:h,chProgr:c,chContr:r,eventCount:t.length,title:this.#h,bitmap:this.#t.getBitmap(),letter:this.#t.getLetter(),names:this.#t.getCustomNames(),texts:this.#t.getTexts(),master:this.#t.getMaster(),mode:this.#t.getMode(),strength:this.#e.slice(),tSig:this.getTimeSig(),tempo:this.getTempo(),noteBar:this.noteBar,noteBeat:Math.floor(this.noteBeat)}}constructor(){super();let e=this;this.addEventListener("meta",function(t){t?.data?.forEach(function(n){(e.#d[n.meta]||console.debug).call(e,n.meta,n.data)})}),this.#t.addEventListener("mode",function(t){e.dispatchEvent("mode",t.data)}),this.#d[3]=function(t,n){e.#h?.length<1&&(e.#h=n)},this.#d[81]=function(t,n){let i=e.noteProgress,a=e.#f||.5;e.#r=6e7/n,e.#f=n/1e6,e.#l+=i*(a/e.#f)-i},this.#d[88]=function(t,n){let i=e.noteProgress,a=e.noteOverall,o=e.noteBar,s=e.noteBeat,d=e.#n,h=e.#g;e.#n=n[0],e.#g=1<<n[1];let r=24*(32/n[3])/n[2];d!=e.#n&&(s<1?d<e.#n?e.#l+=i-s-o*e.#n:(e.#l+=a*e.#n/d,console.warn("Fuck me! Any trick to make tSig shrinking WORK in any condition!")):e.#l+=i-e.#n*(o+1),console.info(`${e.#n}/${e.#g}`))}}};export{Dt as RootDisplay};
