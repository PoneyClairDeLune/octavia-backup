var U=Object.create;var C=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var N=Object.getPrototypeOf,G=Object.prototype.hasOwnProperty;var B=(r,n)=>()=>(n||r((n={exports:{}}).exports,n),n.exports);var H=(r,n,o,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let e of L(n))!G.call(r,e)&&e!==o&&C(r,e,{get:()=>n[e],enumerable:!(a=P(n,e))||a.enumerable});return r};var _=(r,n,o)=>(o=r!=null?U(N(r)):{},H(n||!r||!r.__esModule?C(o,"default",{value:r,enumerable:!0}):o,r));var O=B((Ae,v)=>{(function(){"use strict";let r={fatal:!0},n=[new TextDecoder("iso-8859-15",r),new TextDecoder("sjis",r),new TextDecoder("euc-jp",r),new TextDecoder("utf-8",r),new TextDecoder("utf-16",r),new TextDecoder("ascii")],o={debug:!1,parse:function(a,e){if(a instanceof Uint8Array)return o.Uint8(a);if(typeof a=="string")return o.Base64(a);if(a instanceof HTMLElement&&a.type==="file")return o.addListener(a,e);throw new Error("MidiParser.parse() : Invalid input provided")},addListener:function(a,e){if(!File||!FileReader)throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");if(a===void 0||!(a instanceof HTMLElement)||a.tagName!=="INPUT"||a.type.toLowerCase()!=="file")return console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element"),!1;e=e||function(){},a.addEventListener("change",function(t){if(!t.target.files.length)return!1;console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");let c=new FileReader;c.readAsArrayBuffer(t.target.files[0]),c.onload=function(d){e(o.Uint8(new Uint8Array(d.target.result)))}})},Base64:function(a){let e=function(d){var $="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(d=d.replace(/^.*?base64,/,""),d=String(d).replace(/[\t\n\f\r ]+/g,""),!/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/.test(d))throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");d+="==".slice(2-(3&d.length));let u,p="",i,s,l=0;for(;l<d.length;)u=$.indexOf(d.charAt(l++))<<18|$.indexOf(d.charAt(l++))<<12|(i=$.indexOf(d.charAt(l++)))<<6|(s=$.indexOf(d.charAt(l++))),p+=i===64?String.fromCharCode(u>>16&255):s===64?String.fromCharCode(u>>16&255,u>>8&255):String.fromCharCode(u>>16&255,u>>8&255,255&u);return p}(a=String(a));var t=e.length;let c=new Uint8Array(new ArrayBuffer(t));for(let d=0;d<t;d++)c[d]=e.charCodeAt(d);return o.Uint8(c)},Uint8:function(c){let e={data:null,pointer:0,movePointer:function(i){return this.pointer+=i,this.pointer},readInt:function(i){if((i=Math.min(i,this.data.byteLength-this.pointer))<1)return-1;let s=0;if(1<i)for(let l=1;l<=i-1;l++)s+=this.data.getUint8(this.pointer)*Math.pow(256,i-l),this.pointer++;return s+=this.data.getUint8(this.pointer),this.pointer++,s},readStr:function(i){let s=new Uint8Array(i),l=!1,f;s.forEach((b,h)=>{s[h]=this.readInt(1)});for(let b=0;b<n.length;b++)if(!l)try{if(f=n[b].decode(s),b==0)for(let h=0;h<f.length;h++){let g=f.charCodeAt(h);if(g>191||g>127&&g<160)throw new RangeError(`Invalid code point: ${g}`)}l=!0,console.debug(`String byte sequence in ${n[b].encoding}`)}catch(h){console.debug(`SMF string ${h}`)}return f||"String byte sequence read failed."},backOne:function(){this.pointer--},readIntVLV:function(){let i=0;if(this.pointer>=this.data.byteLength)return-1;if(this.data.getUint8(this.pointer)<128)i=this.readInt(1);else{let l=[];for(;128<=this.data.getUint8(this.pointer);)l.push(this.readInt(1)-128);var s=this.readInt(1);for(let f=1;f<=l.length;f++)i+=l[l.length-f]*Math.pow(128,f);i+=s}return i}};if(e.data=new DataView(c.buffer,c.byteOffset,c.byteLength),e.readInt(4)!==1297377380)return console.warn("Header validation failed (not MIDI standard or file corrupt.)"),!1;e.readInt(4);let t={};t.formatType=e.readInt(2),t.tracks=e.readInt(2),t.track=[];var c=e.readInt(1),d=e.readInt(1);128<=c?(t.timeDivision=[],t.timeDivision[0]=c-128,t.timeDivision[1]=d):t.timeDivision=256*c+d;for(let i=1;i<=t.tracks;i++){t.track[i-1]={event:[]};var $,u=e.readInt(4);if(u===-1)break;if(u!==1297379947)return!1;e.readInt(4);let s=0,l=!1,f,b;for(;!l&&(s++,t.track[i-1].event[s-1]={},t.track[i-1].event[s-1].deltaTime=e.readIntVLV(),(f=e.readInt(1))!==-1);)if(128<=f?b=f:(f=b,e.movePointer(-1)),f===255){t.track[i-1].event[s-1].type=255,t.track[i-1].event[s-1].metaType=e.readInt(1);var p=e.readIntVLV();switch(t.track[i-1].event[s-1].metaType){case 47:case-1:l=!0;break;case 1:case 2:case 3:case 4:case 5:case 7:case 6:t.track[i-1].event[s-1].data=e.readStr(p);break;case 33:case 89:case 81:t.track[i-1].event[s-1].data=e.readInt(p);break;case 84:t.track[i-1].event[s-1].data=[],t.track[i-1].event[s-1].data[0]=e.readInt(1),t.track[i-1].event[s-1].data[1]=e.readInt(1),t.track[i-1].event[s-1].data[2]=e.readInt(1),t.track[i-1].event[s-1].data[3]=e.readInt(1),t.track[i-1].event[s-1].data[4]=e.readInt(1);break;case 88:t.track[i-1].event[s-1].data=[],t.track[i-1].event[s-1].data[0]=e.readInt(1),t.track[i-1].event[s-1].data[1]=e.readInt(1),t.track[i-1].event[s-1].data[2]=e.readInt(1),t.track[i-1].event[s-1].data[3]=e.readInt(1);break;default:this.customInterpreter!==null&&(t.track[i-1].event[s-1].data=this.customInterpreter(t.track[i-1].event[s-1].metaType,e,p)),this.customInterpreter!==null&&t.track[i-1].event[s-1].data!==!1||(e.readInt(p),t.track[i-1].event[s-1].data=e.readInt(p),this.debug&&console.info("Unimplemented 0xFF meta event! data block readed as Integer"))}}else switch((f=f.toString(16).split(""))[1]||f.unshift("0"),t.track[i-1].event[s-1].type=parseInt(f[0],16),t.track[i-1].event[s-1].channel=parseInt(f[1],16),t.track[i-1].event[s-1].type){case 15:this.customInterpreter!==null&&(t.track[i-1].event[s-1].data=this.customInterpreter(t.track[i-1].event[s-1].type,e,!1)),this.customInterpreter!==null&&t.track[i-1].event[s-1].data!==!1||($=e.readIntVLV(),t.track[i-1].event[s-1].data=e.readInt($),this.debug&&console.info("Unimplemented 0xF exclusive events! data block readed as Integer"));break;case 10:case 11:case 14:case 8:case 9:t.track[i-1].event[s-1].data=[],t.track[i-1].event[s-1].data[0]=e.readInt(1),t.track[i-1].event[s-1].data[1]=e.readInt(1);break;case 12:case 13:t.track[i-1].event[s-1].data=e.readInt(1);break;case-1:l=!0;break;default:if(this.customInterpreter!==null&&(t.track[i-1].event[s-1].data=this.customInterpreter(t.track[i-1].event[s-1].metaType,e,!1)),this.customInterpreter===null||t.track[i-1].event[s-1].data===!1)return console.log("Unknown EVENT detected... reading cancelled!"),!1}}return t},customInterpreter:null};if(typeof v<"u")v.exports=o;else{let a=typeof window=="object"&&window.self===window&&window||typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;a.MidiParser=o}})()});var E=class{#e={};addEventListener(r,n){this.#e[r]||(this.#e[r]=[]),this.#e[r].unshift(n)}removeEventListener(r,n){if(this.#e[r]){let o=this.#e[r].indexOf(n);o>-1&&this.#e[r].splice(o,1),this.#e[r].length<1&&delete this.#e[r]}}dispatchEvent(r,n){let o=new Event(r),a=this;o.data=n,this.#e[r]?.length>0&&this.#e[r].forEach(function(e){try{e?.call(a,o)}catch(t){console.error(t)}}),this[`on${r}`]&&this[`on${r}`](o)}};var F=["off","hall","room","stage","plate","delay LCR","delay LR","echo","cross delay","early reflections","gate reverb","reverse gate"].concat(new Array(4),["white room","tunnel","canyon","basement","karaoke"],new Array(43),["pass through","chorus","celeste","flanger","symphonic","rotary speaker","tremelo","auto pan","phaser","distortion","overdrive","amplifier","3-band EQ","2-band EQ","auto wah"],new Array(1),["pitch change","harmonic","touch wah","compressor","noise gate","voice channel","2-way rotary speaker","ensemble detune","ambience"],new Array(4),["talking mod","Lo-Fi","dist + delay","comp + dist + delay","wah + dist + delay","V dist","dual rotor speaker"]);var V=",a,i,u,e,o,ka,ki,ku,ke,ko,ky,kw,sa,si,su,se,so,sh,ta,ti,tu,te,to,t,ch,t,s,na,ni,nu,ne,no,ny,nn,ha,hi,hu,he,ho,hy,fa,fi,fu,fe,fo,ma,mi,mu,me,mo,my,mm,ya,yu,ye,yo,ra,ri,ru,re,ro,ry,wa,wi,we,wo,ga,gi,gu,ge,go,gy,gw,za,zi,zu,ze,zo,ja,ji,ju,je,jo,jy,da,di,du,de,do,dy,ba,bi,bu,be,bo,by,va,vi,vu,ve,vo,pa,pi,pu,pe,po,py,nga,ngi,ngu,nge,ngo,ngy,ng,hha,hhi,hhu,hhe,hho,hhy,hhw,*,_,,,~,.".split(","),X={};`hi*,
ka,か
ki,き
ku,く
ke,け
ko,こ
ky,き!
kw,くl
tsu,つ
ts,つl
sa,さ
si,すぃ
su,す
se,せ
so,そ
shi,し
sh,し!
ta,た
ti,てぃ
tu,とぅ
te,て
to,と
tchy,ち!
tchi,ち
na,な
ni,に
nu,ぬ
ne,ね
no,の
ny,に!
nn,ん
ha,は
hi,ひ
hu,ほぅ
he,へ
ho,ほ
hy,ひ!
fa,ふぁ
fi,ふぃ
fu,ふ
fe,ふぇ
fo,ふぉ
ma,ま
mi,み
mu,む
me,め
mo,も
my,み!
mm,
ra,ら
ri,り
ru,る
re,れ
ro,ろ
ry,り!
wa,わ
wi,うぃ
we,うぇ
wo,を
nga,ガ
ngi,ギ
ngu,グ
nge,ゲ
ngo,ゴ
ngy,ギ!
ng,
ga,が
gi,ぎ
gu,ぐ
ge,げ
go,ご
gy,ぎ!
gw,ぐl
za,ざ
zi,ずぃ
zu,ず
ze,ぜ
zo,ぞ
ja,じゃ
ji,じ
ju,じゅ
je,じぇ
jo,じょ
jy,じ!
da,だ
di,でぃ
du,どぅ
de,で
do,ど
dy,で!
ba,ば
bi,び
bu,ぶ
be,べ
bo,ぼ
by,び!
va,ゔぁ
vi,ゔぃ
vu,ゔ
ve,ゔぇ
vo,ゔぉ
pa,ぱ
pi,ぴ
pu,ぷ
pe,ペ
po,ぽ
py,ぴ!
!ya,ゃ
!yu,ゅ
!ye,ぇ
!yo,ょ
ya,や
yu,ゆ
ye,いぇ
yo,よ
!a,ゃ
!u,ゅ
!e,ぇ
!o,ょ
!a,ゃ
!u,ゅ
!e,ぇ
!o,ょ
la,ぁ
li,ぃ
lu,ぅ
le,ぇ
lo,ぉ
a,あ
i,い
u,う
e,え
o,お
*,っ
~,
^,
_,`.split(`
`).forEach(r=>{let n=r.split(",");X[n[0]]=n[1]});var R=function(r,n,o){let a=[],e=o==!1?n.readIntVLV():o;r==0||r==127;for(let t=0;t<e;t++){let c=n.readInt(1);if(a.push(c),c!=247){if(c!=240){if(c>127)return console.debug(`Early termination: ${a}`),a.pop(),n.backOne(),n.backOne(),new Uint8Array(a)}}}return new Uint8Array(a)};var K=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw","krs","k11","sg"];var k=[0,1,2,4,5,6,7,8,10,11,32,38,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,84,91,92,93,94,95,98,99,100,101,12,13,16,17,18,19];var z={};K.forEach((r,n)=>{z[r]=n});var m={length:k.length};k.forEach((r,n)=>{m[r]=n});var Ie={ch:128,cc:k.length,nn:128,pl:512,tr:256,cmt:14,rpn:6,efx:7};var x=_(O(),1);var I=class{#e=!1;constructor(r,n,o,a){this.#e=r,this.start=n,this.end=o,this.data=a}get duration(){return this.ranged?this.end-this.start:0}get ranged(){return this.#e}},S=class extends I{constructor(r,n,o){super(!0,r,n,o)}},D=class extends I{constructor(r,n){super(!1,r,r,n)}},T=class extends Array{#e=-1;constructor(){super(...arguments)}resetIndex(r){this.#e=-1}fresh(){this.sort(function(r,n){return r.start==n.start?0:(+(r.start>n.start)<<1)-1}),this.forEach(function(r,n){r.index=n})}step(r,n=!1){let o=[];if(n)for(let a=0;a<this.length&&!(this[a].start>r);a++){if(this[a].end<r)continue;o.push(this[a])}else{let a=this.getRange(this.#e==-1?0:r-1,r),e=this;a.forEach(function(t){t.index>e.#e&&(o.push(t),e.#e=t.index)})}return o}getRange(r,n){r>n&&([r,n]=[n,r]);let o=[],a=-1,e=Math.ceil(Math.sqrt(this.length)),t=!0;for(let c=0;c<this.length;c+=e)this[c+e]?a<0&&this[c+e].start>=r&&(a=c):a=a<0?c:a;for(;t;)this[a]?.end<n?this[a].start>=r&&o.push(this[a]):t=!1,a++;return o}};var q=0xffffffffffff,A=function(r){let n=new T,o=this,a=r.timeDivision,e=120,t=new T,c=0,d=0;t.push(new S(0,q,[120,0])),r.track.forEach(function(i){c=0,i.event.forEach(function(s){c+=s.deltaTime,s.type==255&&s?.metaType==81&&(e=6e7/s.data,t[t.length-1]&&t.push(new S(c,0xffffffffffff,[e,0])))})}),t.fresh(),t.forEach(function(i,s,l){s>0&&(l[s-1].end=i.start)});let $=120;t.forEach(function(i,s,l){s>0&&(i.end==i.start?l.splice(l.indexOf(i),1):$==i.data[0]&&(l[s-1].end=i.end,l.splice(l.indexOf(i),1)),$=i.data[0])});let u=0,p=120;return t.forEach(function(i){let s=i.start,l=s/p/a*60+u;p=i.data[0],u=l-s/p/a*60,i.data[1]=u}),console.debug("All tempo changes: ",t),e=120,c=0,d=0,r.track.forEach(function(i,s){c=0,d=0;let l=s+1;i.event.forEach(function(f,b){c+=f.deltaTime;let h=t.step(c,!0)[0];h&&(e=h.data[0],d=h.data[1]);let g={type:f.type,data:f.data,track:l,part:0};f.type>14?g.meta=f.metaType:g.part=f.channel,n.push(new D(c/e/a*60+d,g))})}),n.fresh(),self.midiEvents=n,console.debug(`Parsed a type ${r.formatType} MIDI sequence.`),n};x.default.customInterpreter=R;var ze=class extends E{device;#e;#i="";#s=[];#n=new Uint8ClampedArray(128);#h=new Uint8ClampedArray(128);#a=.5;#l=120;#t=4;#o=4;#r=0;#c=0;smoothingAtk=0;smoothingDcy=0;reset(){this.dispatchEvent("reset"),this.#e?.resetIndex(),this.device.init(),this.#i="",this.#a=.5,this.#l=120,this.#t=4,this.#o=4,this.#r=0,this.#c=0}async loadFile(r){this.#e=A(x.default.parse(new Uint8Array(await r.arrayBuffer())))}switchMode(r,n=!1){this.device.switchMode(r,n)}getMode(){return this.device.getMode()}getVoice(){return this.device.getVoice(...arguments)}getChVoice(r){return this.device.getChVoice(r)}get noteProgress(){return this.#c/this.#a}get noteOverall(){return this.noteProgress-this.#r}get noteBar(){return Math.floor(this.noteOverall/this.#t)}get noteBeat(){let r=this.noteOverall%this.#t;return r<0&&(r+=this.#t),r}getTimeSig(){return[this.#t,this.#o]}getTempo(){return this.#l}sendCmd(r){this.device.runJson(r)}render(r){r>this.#c&&(this.#c=r);let n=this.#e?.step(r)||[],o=0,a=new Set,e=this,t=[];this.device.getStrength().forEach((b,h)=>{this.#h[h]=b}),e.device.newStrength(),n.forEach(function(b){let h=b.data;h.type==9&&(h.data[1]>0?a.add(h.part*128+h.data[0]):a.has(h.part*128+h.data[0])&&o++),b.data.type==8&&a.has(h.part*128+h.data[0])&&o++;let g=e.device.runJson(h);switch(g?.reply){case"meta":{t.push(g);break}}g?.reply&&delete g.reply}),t?.length>0&&this.dispatchEvent("meta",t);let c=this.device.getActive(),d=[],$=e.device.getPitch(),u=e.device.getCcAll(),p=e.device.getProgram(),i=e.device.getChType(),s=this.device.getStrength();s.forEach(function(b,h,g){g[h]=Math.max(e.#h[h],b);let y=g[h]-e.#n[h],M=m.length*h;if(y>=0){let w=4*.25**(u[M+m[73]]/64);e.#n[h]+=Math.ceil(y-y*e.smoothingAtk**w)}else{let w=4*.25**(u[M+m[72]]/64);e.#n[h]+=Math.floor(y-y*e.smoothingDcy**w)}});let l=0;return c.forEach(function(b,h){b&&(d[h]=e.device.getVel(h),l+=d[h].size)}),{extraPoly:o,curPoly:l,chInUse:c,chKeyPr:d,chPitch:$,chProgr:p,chContr:u,chType:i,eventCount:n.length,title:this.#i,bitmap:this.device.getBitmap(),letter:this.device.getLetter(),texts:this.device.getTexts(),master:this.device.getMaster(),mode:this.device.getMode(),strength:this.#n.slice(),velo:s,rpn:this.device.getRpn(),tSig:this.getTimeSig(),tempo:this.getTempo(),noteBar:this.noteBar,noteBeat:this.noteBeat}}constructor(r,n=.5,o=.5){super();let a=this;this.smoothingAtk=n,this.smoothingDcy=o,this.device=r,this.addEventListener("meta",function(e){e?.data?.forEach(function(t){(a.#s[t.meta]||console.debug).call(a,t.meta,t.data)})}),this.device.addEventListener("mode",function(e){a.dispatchEvent("mode",e.data)}),this.device.addEventListener("channelactive",function(e){a.dispatchEvent("channelactive",e.data)}),this.device.addEventListener("channelmin",function(e){a.dispatchEvent("channelmin",e.data)}),this.device.addEventListener("channelmax",function(e){a.dispatchEvent("channelmax",e.data)}),this.device.addEventListener("channelreset",function(e){a.dispatchEvent("channelreset")}),this.device.addEventListener("screen",function(e){a.dispatchEvent("screen",e.data)}),this.#s[3]=function(e,t){a.#i?.length<1&&(a.#i=t)},this.#s[81]=function(e,t){let c=a.noteProgress,d=a.#a||.5;a.#l=6e7/t,a.#a=t/1e6,a.#r+=c*(d/a.#a)-c},this.#s[88]=function(e,t){let c=a.noteProgress,d=a.noteOverall,$=a.noteBar,u=a.noteBeat,p=a.#t,i=a.#o;a.#t=t[0],a.#o=1<<t[1];let s=24*(32/t[3])/t[2];if(p!=a.#t){let l=$;a.#r-=l*(a.#t-p),u+1>=p&&(p<a.#t?a.#r-=Math.ceil(a.#t-u-1):a.#r+=a.#t)}}}};export{ze as RootDisplay,m as ccToPos};
