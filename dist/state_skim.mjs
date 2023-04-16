var C=function(e,t){let s=Math.min(e.length,t.length),i=e.slice(0,s),a=t.slice(0,s),r=0,n=0;for(;n<s&&r==0;)r=Math.sign(i[n]-a[n]),n++;return r},b=function(){this.pool=[],this.point=function(e,t=!1){if(this.pool.length>0){let s=this.pool.length,i=1<<Math.floor(Math.log2(s)),a=i,r=64;for(;i>=1&&r>=0;){if(r<=0)throw new Error("TTL reached.");if(a==s)a-=i;else{let c=C(e,this.pool[a]);switch(c){case 0:{r=0;break}case 1:{a+i<=s&&(a+=i);break}case-1:{a!=0&&(a-=i);break}default:console.warn(`Unexpected result ${c}.`)}}i=i>>1,r--}let n=!0;if(a>=this.pool.length)n=!1;else{let c=this;this.pool[a].forEach(function(f,d,l){n&&f!=e[d]&&(n=!1)}),!n&&C(e,this.pool[a])>0&&a++}return n||t?a:-1}else return t?0:-1},this.add=function(e,t){return e.data=t,this.pool.splice(this.point(e,!0),0,e),this},this.default=function(e){console.warn(`No match for "${e}". Default action not defined.`)},this.get=function(e){let t=this.point(e);if(t>-1)return this.pool[t].data;this.default(e)},this.run=function(e,...t){let s=this.point(e);s>-1?this.pool[s].data(e.slice(this.pool[s].length),...t):this.default(e,...t)}};var m=class{#t={};addEventListener(e,t){this.#t[e]||(this.#t[e]=[]),this.#t[e].unshift(t)}removeEventListener(e,t){if(this.#t[e]){let s=this.#t[e].indexOf(t);s>-1&&this.#t[e].splice(s,1),this.#t[e].length<1&&delete this.#t[e]}}dispatchEvent(e,t){let s=new Event(e),i=this;s.data=t,this.#t[e]?.length>0&&this.#t[e].forEach(function(a){try{a?.call(i,s)}catch(r){console.error(r)}}),this[`on${e}`]&&this[`on${e}`](s)}};var D=["off","hall","room","stage","plate","delay LCR","delay LR","echo","cross delay","early reflections","gate reverb","reverse gate"].concat(new Array(4),["white room","tunnel","canyon","basement","karaoke"],new Array(43),["pass through","chorus","celeste","flanger","symphonic","rotary speaker","tremelo","auto pan","phaser","distortion","overdrive","amplifier","3-band EQ","2-band EQ","auto wah"],new Array(1),["pitch change","harmonic","touch wah","compressor","noise gate","voice channel","2-way rotary speaker","ensemble detune","ambience"],new Array(4),["talking mod","Lo-Fi","dist + delay","comp + dist + delay","wah + dist + delay","V dist","dual rotor speaker"]);var U=",a,i,u,e,o,ka,ki,ku,ke,ko,ky,kw,sa,si,su,se,so,sh,ta,ti,tu,te,to,t,ch,t,s,na,ni,nu,ne,no,ny,nn,ha,hi,hu,he,ho,hy,fa,fi,fu,fe,fo,ma,mi,mu,me,mo,my,mm,ya,yu,ye,yo,ra,ri,ru,re,ro,ry,wa,wi,we,wo,ga,gi,gu,ge,go,gy,gw,za,zi,zu,ze,zo,ja,ji,ju,je,jo,jy,da,di,du,de,do,dy,ba,bi,bu,be,bo,by,va,vi,vu,ve,vo,pa,pi,pu,pe,po,py,nga,ngi,ngu,nge,ngo,ngy,ng,hha,hhi,hhu,hhe,hho,hhy,hhw,*,_,,,~,.".split(","),N={};`hi*,
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
`).forEach(e=>{let t=e.split(",");N[t[0]]=t[1]});var G=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw","krs","k11","sg"];var E=[0,1,2,4,5,6,7,8,10,11,32,38,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,84,91,92,93,94,95,98,99,100,101,12,13,16,17,18,19];var P={};G.forEach((e,t)=>{P[e]=t});var B={length:E.length};E.forEach((e,t)=>{B[e]=t});var we={ch:128,cc:E.length,nn:128,pl:512,tr:256,cmt:14,rpn:6,ace:8,efx:7};var I=["MSB","PRG","LSB"];var S=function(e){let t=Math.floor(e/10),s=e%10;return`${t.toString(16)}${s}`},k=class{#t;strictMode=!1;get(e=0,t=0,s=0,i){let a,r=Array.from(arguments);switch(i){case"xg":{e==32?r[2]+=4:e==33||e==35||e==36?r[2]+=5:e==79?r[0]=95:e==80?r[0]=96:e==81?r[0]=97:e==82?r[0]=98:e==83?r[0]=99:e==84&&(r[0]=100);break}case"gs":{e==0&&s<5?r[2]=0:e>125&&s<5&&s!=2&&(r[2]=e,r[0]=0);break}case"sg":{e==8&&s==0&&(r[2]=5);break}}let n=" ",c="M",f=!1,d=0;switch(r[0]){case 0:{r[2]==127?c="MT-a":r[2]==126?c="MT-b":r[2]==7?c="GM-k":r[2]==5?c="SG-a":r[2]==4?c="SP-l":r[2]==0||i=="gs"&&r[2]<5?c="GM-a":(c="y",f=!0);break}case 8:{i=="sg"?c="GM-s":c="r:";break}case 48:{c=`yM${(r[2]>>3).toString().padStart(2,"0")}`,f=!0;break}case 56:{c="GM-b";break}case 61:case 120:{c="rDrm";break}case 62:{c="kDrm";break}case 63:{let u=r[2];c=u<10?"kP:":"kC:",c+=u%10;break}case 64:{c="ySFX";break}case 67:{c="DX:S";break}case 80:case 81:case 82:case 83:{c=`Prg${"UABC"[r[0]-80]}`;break}case 88:case 89:case 90:case 91:{c=`Cmb${"UABC"[r[0]-88]}`;break}case 95:{c=`${["DR","PC"][r[2]]}-d`;break}case 96:{c=r[2]==106?"AP-a":"PF",r[2]>63&&(d=63),f=!0;break}case 97:{c="VL:",f=!0,d=112;break}case 98:{c="SG-a";break}case 99:{c="DX",r[2]>63&&(d=63),f=!0;break}case 100:{c="AN",r[2]>63&&(d=63),f=!0;break}case 121:{c=`GM-${r[2]?"":"a"}`,f=!0;break}case 122:{c="lDrm";break}case 126:{c="yDrS";break}case 127:{r[2]==127?c="rDrm":c="yDrm";break}default:r[0]<48?c="r:":c="M"}for(c.length<4&&(c+=`${(f?s:e)-d}`.padStart(4-c.length,"0")),i=="xg"&&e==16&&(a=`Voice${(s*128+t+1).toString().padStart(3,"0")}`,n=" ");!(a?.length>=0);)a=this.#t[r[1]||0][(r[0]<<7)+r[2]],a||(this.strictMode?(a="",n="?"):this.#t[r[1]||0][r[0]<<7]?r[0]==0?(r[2]=0,n="^"):r[2]<1?(r[0]=0,n="*"):(r[2]--,n="^"):e==48?(r[0]=0,r[2]=0,n="!"):e==62?(r[1]--,n=" ",r[1]<1&&!a?.length&&(r[0]=0,n="!")):e<64?r[0]==0?(r[2]=0,n="^"):r[2]<1?(r[0]=0,n="*"):r[2]--:e==80?(a=`PrgU:${t.toString().padStart(3,"0")}`,n="!"):e==88?(a=`CmbU:${t.toString().padStart(3,"0")}`,n="!"):e==121?(a=`GM2Vox0${s}`,n="#"):e==122?(r[1]==32?r[1]==0:r[1]%=7,a=this.#t[r[1]||0][(r[0]<<7)+r[2]],a?n=" ":(a="",n="*")):r[1]==0?(a=`${e.toString().padStart(3,"0")} ${t.toString().padStart(3,"0")} ${s.toString().padStart(3,"0")}`,n="!"):r[0]==0?(r[2]=0,n="^"):r[2]>0?r[2]--:r[1]>0?(r[1]=0,n="!"):(r[0]=0,n="?"));(i=="gs"||i=="ns5r")&&n=="^"&&(n=" "),e==127&&n=="^"&&(n=" "),n!=" "&&self.debugMode&&(a="");let l="??";switch(r[0]){case 0:{r[2]==0?l="GM":r[2]==5||r[2]==7?l="KG":r[2]<120?l="XG":r[2]==127&&(l="MT");break}case 48:{l="MU";break}case 56:{l="AG";break}case 61:case 80:case 83:case 88:case 89:case 91:{l="AI";break}case 62:case 82:case 90:{l="XD";break}case 63:l="KR";case 64:case 126:{l="XG";break}case 67:case 99:{l="DX";break}case 81:{l="RW";break}case 95:{l=["DR","PC"][r[2]];break}case 96:{l=r[2]==106?"AP":"PF";break}case 97:{l="VL";break}case 98:{l="SG";break}case 100:{l="AN";break}case 120:{l="GS";break}case 121:{l=r[2]?"G2":"GM";break}case 122:{l="KG";break}case 127:{l=r[2]==127?"MT":t==0?"GM":"XG";break}default:r[0]<48&&(r[0]==16&&i=="xg"?l="XG":l="GS")}return{name:a||`${S(e||0)} ${S(t||0)} ${S(s||0)}`,ending:n,sect:c,standard:l}}async load(e,t,s){let i=this,a=[],r=0,n=0;e.split(`
`).forEach(function(c,f){let d=c.split("	"),l=[];f==0?d.forEach(function(u,w){a[I.indexOf(u)]=w}):d.forEach(async function(u,w){w>2?(i.#t[l[a[1]]]=i.#t[l[a[1]]]||[],(!i.#t[l[a[1]]][(l[a[0]]<<7)+l[a[2]]]?.length||t)&&(i.#t[l[a[1]]][(l[a[0]]<<7)+l[a[2]]]=d[3],r++),n++):l.push(parseInt(d[w]))})}),t||console.debug(`Map "${s||"(internal)"}": ${n} total, ${r} loaded.`)}clearRange(e){let t=e.prg!=null?e.prg.constructor==Array?e.prg:[e.prg,e.prg]:[0,127],s=e.msb!=null?e.msb.constructor==Array?e.msb:[e.msb,e.msb]:[0,127],i=e.lsb!=null?e.lsb.constructor==Array?e.lsb:[e.lsb,e.lsb]:[0,127];for(let a=s[0];a<=s[1];a++){let r=a<<7;for(let n=i[0];n<=i[1];n++){let c=r+n;for(let f=t[0];f<=t[1];f++)delete this.#t[f][c]}}}init(){this.#t=[];for(let e=0;e<128;e++)this.#t.push([""])}async loadFiles(...e){this.init();let t=this;e.forEach(async function(s,i){try{await fetch(`./data/bank/${s}.tsv`).then(function(a){return a.text()}).then(a=>{t.load(a,!1,s)})}catch{console.error(`Failed loading "${s}.tsv".`)}})}constructor(...e){this.loadFiles(...e)}};var g=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw","krs","k11","sg"],T=[[0,0,0,0,121,0,0,56,82,81,63,0,0],[0,0,4,0,0,127,0,0,0,0,0,0,0]],y=[120,127,120,127,120,127,61,62,62,62,120,122,122],L=[0,3,81,84,88],v={8:"Off",9:"On",10:"Note aftertouch",11:"cc",12:"pc",13:"Channel aftertouch",14:"Pitch"},x={0:0,1:1,2:3,5:4},R=[[0,24],[0,127],[0,127],[40,88],[0,127],[0,127]],O=[36,37];var M=[0,1,2,4,5,6,7,8,10,11,32,38,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,84,91,92,93,94,95,98,99,100,101,12,13,16,17,18,19],H=[33,99,100,32,102,8,9,10];var p={};g.forEach((e,t)=>{p[e]=t});var o={length:M.length};M.forEach((e,t)=>{o[e]=t});var $=function(){return!!self.Bun||self.debugMode||!1},_=function(e){let t=[],s=0;return e?.forEach(function(i,a){i==247?t.push(e.subarray(s,a)):i==240&&(s=a+1)}),t.length||t.push(e.subarray(0)),$(),t},A=function(e,t="",s="",i=2){return e?`${t}${e.toString().padStart(i,"0")}${s}`:""},h={ch:128,cc:M.length,nn:128,pl:512,tr:256,cmt:14,rpn:6},ve=class extends m{#t=0;#m=0;#p=0;#g=new Array(11);get#o(){return this.#g[this.#m]}set#o(e){this.#g[this.#m]=e}#$=new Uint8Array(h.ch);#I=new Uint8Array(h.ch);#e=new Uint8ClampedArray(h.ch*h.cc);#y=new Uint8ClampedArray(h.ch);#h=new Uint8ClampedArray(h.ch*h.nn);#A=new Uint8Array(h.ch);#n=new Uint16Array(h.pl);#f=new Uint8Array(h.pl);#M=new Int16Array(h.ch);#d=new Uint8Array(h.ch);#C=0;#l=new Uint8Array(h.ch*h.rpn);#D=new Int8Array(h.ch*O.length);#U=new Uint8Array(h.ch);#F=new Uint8Array(128);#L=new Uint8Array(h.cmt*8);#V=new Uint8Array(1024);#H=new Uint8Array(h.cmt*64);#E=0;#u=0;#T=100;#w=0;#_=500;#z=0;#a="";#b=0;#q=0;#Q=!0;#i=!1;#K;#Y=new Uint8Array(2);#s=[];#k=new Uint8Array(h.ch);#S=new Uint8Array(h.tr);baseBank=new k("gm","gm2","xg","gs","ns5r","gmega","plg-150vl","plg-150pf","plg-150dx","plg-150an","plg-150dr","plg-100sg","kross");userBank=new k("gm");initOnReset=!1;chRedir(e,t,s){if(this.#S[t])return(this.#S[t]-1)*16+e;if([p.gs,p.ns5r].indexOf(this.#t)>-1){if(s==1)return e;let i=0,a=!0;for(;a;)this.#k[e+i]==0?(this.#k[e+i]=t,console.debug(`Assign track ${t} to channel ${e+i+1}.`),a=!1):this.#k[e+i]==t?a=!1:(i+=16,i>=128&&(i=0,a=!1));return e+i}else return e}#c=[];#v;#r={nOff:(e,t)=>{let s=e*128+t,i=this.#n.lastIndexOf(s);i>-1&&(this.#e[h.cc*e+o[64]]>63&&!this.config?.disableCc64?this.#f[i]=4:(this.#n[i]=0,this.#h[s]=0,this.#f[i]=0))},nOn:(e,t,s)=>{let i=e*128+t,a=0;for(this.#A[e]&&this.#r.ano(e);this.#f[a]>0&&this.#n[a]!=i;)a++;a<h.pl?(this.#n[a]=i,this.#h[i]=s,this.#f[a]=3,this.#d[e]<s&&(this.#d[e]=s)):console.error("Polyphony exceeded.")},nAt:(e,t,s)=>{},cAt:(e,t)=>{},hoOf:e=>{this.#f.forEach((t,s)=>{if(t==4){let i=this.#n[s],a=i>>7;e==a&&(this.#f[s]=0,this.#n[s]=0,this.#h[i]=0)}})},soOf:e=>{},ano:e=>{this.#n.forEach((t,s,i)=>{let a=t>>7,r=t&127;t==0&&this.#h[0]==0||a==e&&this.#r.nOff(a,r)})}};#X={8:function(e){let t=e.channel,s=e.data[0];this.#r.nOff(t,s)},9:function(e){let t=e.channel;this.#$[t]=1;let s=e.data[0],i=e.data[1];i>0?this.#r.nOn(t,s,i):this.#r.nOff(t,s)},10:function(e){let s=e.channel*128+e.data[0];this.#n.indexOf(s)>-1&&(this.#h[s]=data[1])},11:function(e){let t=e.channel;this.#$[t]=1;let s=t*h.cc;switch(e.data[0]){case 96:return;case 97:return;case 120:return;case 121:{this.#r.ano(t),this.#M[t]=0;let i=t*h.cc;this.#e[i+o[1]]=0,this.#e[i+o[5]]=0,this.#e[i+o[64]]=0,this.#e[i+o[65]]=0,this.#e[i+o[66]]=0,this.#e[i+o[67]]=0,this.#e[i+o[11]]=127,this.#e[i+o[101]]=127,this.#e[i+o[100]]=127,this.#e[i+o[99]]=127,this.#e[i+o[98]]=127;return}case 123:{this.#r.ano(t);return}case 124:{this.#r.ano(t);return}case 125:{this.#r.ano(t);return}case 126:{this.#A[t]=1,this.#r.ano(t);return}case 127:{this.#A[t]=0,this.#r.ano(t);return}}if(o[e.data[0]]==null)console.warn(`cc${e.data[0]} is not accepted.`);else{switch(e.data[0]){case 0:{if($()&&console.debug(`${g[this.#t]}, CH${t+1}: ${e.data[1]}`),this.#t==0)e.data[1]<48?(this.#e[s]>119&&(e.data[1]=this.#e[s],e.data[1]=120,console.debug(`Forced channel ${t+1} to stay drums.`)),e.data[1]>0&&(console.debug(`Roland GS detected with MSB: ${e.data[1]}`),this.switchMode("gs"))):e.data[1]==62?this.switchMode("x5d"):e.data[1]==63?this.switchMode("krs"):(e.data[1]==64||e.data[1]==127)&&this.switchMode("xg");else if(this.#t==p.gs)e.data[1]<56&&this.#e[s]>119&&(e.data[1]=this.#e[s],e.data[1]=120,console.debug(`Forced channel ${t+1} to stay drums.`));else if(this.#t==p.gm)e.data[1]<48?this.#e[s]>119&&(e.data[1]=120,this.switchMode("gs",!0),console.debug(`Forced channel ${t+1} to stay drums.`)):(e.data[1]==64||e.data[1]==127)&&this.switchMode("xg",!0);else if(this.#t==p.x5d){if(e.data[1]>0&&e.data[1]<8)this.switchMode("05rw",!0);else if(e.data[1]==56){let i=0;for(let a=0;a<16;a++){let r=this.#e[h.cc*a];(r==56||r==62)&&i++}i>14&&this.switchMode("ag10",!0)}}break}case 6:{if(this.#C){let i=this.#e[s+o[99]],a=this.#e[s+o[98]];if(i==1){let r=H.indexOf(a);if(r>-1)this.#e[s+o[71+r]]=e.data[1],$()&&console.debug(`Redirected NRPN 1 ${a} to cc${71+r}.`);else{let n=O.indexOf(a);n>-1&&(this.#D[t*10+n]=e.data[1]-64),$()&&console.debug(`CH${t+1} voice NRPN ${a} commit`)}}}else{let i=x[this.#e[s+o[100]]];this.#e[s+o[101]]==0&&i!=null&&($()&&console.debug(`CH${t+1} RPN 0 ${this.#e[s+o[100]]} commit: ${e.data[1]}`),e.data[1]=Math.min(Math.max(e.data[1],R[i][0]),R[i][1]),this.#l[t*h.rpn+i]=e.data[1])}break}case 38:{this.#C||this.#e[s+101]==0&&x[this.#e[s+100]]!=null&&(this.#l[t*h.rpn+x[this.#e[s+100]]+1]=e.data[1]);break}case 64:{e.data[1]<64&&this.#r.hoOf(t);break}case 66:{console.debug(`Sostenuto pedal: ${e.data[1]}`);break}case 98:case 99:{this.#C=1;break}case 100:case 101:{this.#C=0;break}}this.#e[s+o[e.data[0]]]=e.data[1]}},12:function(e){let t=e.channel;this.#$[t]=1,this.#y[t]=e.data,this.#U[t]=0,$()&&console.debug(`T:${e.track} C:${t} P:${e.data}`)},13:function(e){let t=this,s=e.channel;this.#n.forEach(function(i){let a=i>>7;s==a&&(t.#h[i]=e.data)})},14:function(e){let t=e.channel;this.#M[t]=e.data[1]*128+e.data[0]-8192},15:function(e){_(e.data).forEach(t=>{let s=t[0],i=t[1];(this.#J[s]||function(){console.debug(`Unknown manufacturer ${s}.`)})(i,t.subarray(2),e.track)})},248:function(e){},250:function(e){},251:function(e){},252:function(e){},254:function(e){},255:function(e){if((this.#c[e.meta]||function(s,i,a){}).call(this,e.data,e.track,e.meta),e.meta!=32&&(this.#w=0),L.indexOf(e.meta)>-1)return e.reply="meta",e;$()&&console.debug(e)}};#J={64:(e,t,s)=>{this.#P.run(t,s,e)},65:(e,t,s)=>{if(t[0]<16)this.#x.run(t,s,e),console.warn("Unknown device SysEx!");else{let i=t[t.length-1],a=gsChecksum(t.subarray(2,t.length-1));i==a?this.#x.run(t.subarray(0,t.length-1),s,e):console.warn(`Bad GS checksum ${i}. Should be ${a}.`)}},66:(e,t,s)=>{this.#O.run(t,s,e)},67:(e,t,s)=>{this.#R.run(t,s,e)},68:(e,t,s)=>{this.#W.run(t,s,e)},71:(e,t,s)=>{this.#B.run(t,s,e)},126:(e,t,s)=>{this.#N.run(t,s,e)},127:(e,t,s)=>{this.switchMode("gm"),this.#G.run(t,s,e)}};#N;#G;#R;#x;#O;#P;#B;#W;buildRchTree(){let e=[];this.#I.forEach((t,s)=>{e[t]?.constructor||(e[t]=[]),e[t].push(s)}),this.#K=e}getActive(){let e=this.#$.slice();return this.#t==p.mt32,e}getCc(e){let t=e*h.cc,s=this.#e.slice(t,t+h.cc);return s[o[0]]=s[o[0]]||this.#E,s[o[32]]=s[o[32]]||this.#u,s}getCcAll(){let e=this.#e.slice();for(let t=0;t<h.ch;t++){let s=t*h.cc;e[s+o[0]]=e[s+o[0]]||this.#E,e[s+o[32]]=e[s+o[32]]||this.#u}return e}getPitch(){return this.#M}getProgram(){return this.#y}getTexts(){return this.#s.slice()}getVel(e){let t=new Map,s=this;return s.#n.forEach(function(i,a){let r=Math.floor(i/128),n=i%128;e==r&&s.#h[i]>0&&t.set(n,{v:s.#h[i],s:s.#f[a]})}),t}getBitmap(){return{bitmap:this.#o,expire:this.#p}}getLetter(){return{text:this.#a,expire:this.#b}}getMode(){return g[this.#t]}getMaster(){return{volume:this.#T}}getRawStrength(){let e=this;return this.#n.forEach(function(t){let s=Math.floor(t/128);e.#h[t]>e.#d[s]&&(e.#d[s]=e.#h[t])}),this.#d}getStrength(){let e=[],t=this;return this.getRawStrength().forEach(function(s,i){e[i]=Math.floor(s*t.#e[i*h.cc+o[7]]*t.#e[i*h.cc+o[11]]*t.#T/803288)}),e}getRpn(){return this.#l}getNrpn(){return this.#D}getVoice(e,t,s,i){let a=e||this.#E,r=t,n=s||this.#u;g[this.#t]=="ns5r"&&a>0&&a<56&&(n=3);let c=this.userBank.get(a,r,n,i);if(g[this.#t]=="mt32"&&c.name.indexOf("MT-m:")==0){let f=parseInt(c.name.slice(5)),d=f*h.cmt,l="";this.#H.subarray(d,d+10).forEach(u=>{u>31&&(l+=String.fromCharCode(u))}),this.userBank.load(`MSB	LSB	PRG
0	127	${r}	${l}`,!0),c.name=l,c.ending=" "}return(c.ending!=" "||!c.name.length)&&(c=this.baseBank.get(a,r,n,i)),c}getChVoice(e){let t=this.getVoice(this.#e[e*h.cc+o[0]],this.#y[e],this.#e[e*h.cc+o[32]],g[this.#t]);if(this.#U[e])switch(this.#t){case p.mt32:t.ending="~",t.name="",this.#L.subarray(14*(e-1),14*(e-1)+10).forEach(s=>{s>31&&(t.name+=String.fromCharCode(s))})}return t}init(e=0){this.dispatchEvent("mode","?"),this.#t=0,this.#E=0,this.#u=0,this.#w=0,this.#$.fill(0),this.#e.fill(0),this.#y.fill(0),this.#h.fill(0),this.#n.fill(0),this.#d.fill(0),this.#M.fill(0),this.#D.fill(0),this.#T=100,this.#s=[],this.#_=500,this.#z=0,this.#b=0,this.#a="",this.#p=0,this.#m=0,this.#o.fill(0),this.#i=!1,this.#q=0,this.#Q=!0,this.#I.forEach(function(t,s,i){i[s]=s}),this.buildRchTree(),e==0&&(this.#k.fill(0),this.#S.fill(0)),this.#e[h.cc*9]=y[0],this.#e[h.cc*25]=y[0],this.#e[h.cc*41]=y[0],this.#e[h.cc*57]=y[0],this.#Y.fill(0),this.#V.fill(0),this.#H.fill(0),this.#F.fill(0),this.#L.fill(0),this.#U.fill(0),this.userBank.clearRange({msb:0,lsb:127,prg:[0,127]});for(let t=0;t<h.ch;t++){let s=t*h.cc;this.#e[s+o[7]]=100,this.#e[s+o[11]]=127,this.#e[s+o[10]]=64,this.#e[s+o[71]]=64,this.#e[s+o[72]]=64,this.#e[s+o[73]]=64,this.#e[s+o[74]]=64,this.#e[s+o[75]]=64,this.#e[s+o[76]]=64,this.#e[s+o[77]]=64,this.#e[s+o[78]]=64,this.#e[s+o[91]]=40,this.#e[s+o[101]]=127,this.#e[s+o[100]]=127,this.#e[s+o[99]]=127,this.#e[s+o[98]]=127;let i=t*h.rpn;this.#l[i]=2,this.#l[i+1]=64,this.#l[i+2]=0,this.#l[i+3]=64,this.#l[i+4]=0,this.#l[i+5]=0}}switchMode(e,t=!1){let s=g.indexOf(e);if(s>-1){if(this.#t==0||t){this.#t=s,this.#m=0,this.#E=T[0][s],this.#u=T[1][s];for(let i=0;i<h.ch;i++)y.indexOf(this.#e[i*h.cc])>-1&&(this.#e[i*h.cc]=y[s]);switch(this.initOnReset,s){case p.mt32:{mt32DefProg.forEach((i,a)=>{let r=a+1;this.#$[r]||(this.#y[r]=i,this.#e[r*h.cc+o[91]]=127)});break}}this.dispatchEvent("mode",e)}}else throw new Error(`Unknown mode ${e}`)}newStrength(){this.#d.fill(0)}runJson(e){if(e.type>14)return e.type==15&&e.data.constructor!=Uint8Array&&(e.data=Uint8Array.from(e.data)),this.#X[e.type].call(this,e);{let t=this.chRedir(e.part,e.track),s=!1;this.#K[t]?.forEach(i=>{e.channel=i,s=!0,this.#X[e.type].call(this,e)}),s||console.warn(`${v[e.type]?v[e.type]:e.type}${[11,12].includes(e.type)?(e.data[0]!=null?e.data[0]:e.data).toString():""} event sent to CH${t+1} without any recipient.`)}this.#s.length>100&&this.#s.splice(100,this.#s.length-99)}runRaw(e){}constructor(){super();let e=this;this.#o=new Uint8Array(256),this.#g[10]=new Uint8Array(512),this.#v=new b,this.userBank.strictMode=!0,this.userBank.load(`MSB	PRG	LSB	NME
062	000	000	
122	000	000	
122	001	000	
122	002	000	
122	003	000	
122	004	000	
122	005	000	
122	006	000	`),this.#c[1]=function(t){switch(t.slice(0,2)){case"@I":{this.#i=!0,this.#s.unshift(`Kar.Info: ${t.slice(2)}`);break}case"@K":{this.#i=!0,this.#s.unshift("Karaoke mode active."),console.debug(`Karaoke mode active: ${t.slice(2)}`);break}case"@L":{this.#i=!0,this.#s.unshift(`Language: ${t.slice(2)}`);break}case"@T":{this.#i=!0,this.#s.unshift(`Ka.Title: ${t.slice(2)}`);break}case"@V":{this.#i=!0,this.#s.unshift(`Kara.Ver: ${t.slice(2)}`);break}case"XF":{let s=t.slice(2).split(":");switch(s[0]){case"hd":{s.slice(1).forEach((i,a)=>{i.length&&this.#s.unshift(`${["SongDate","SnRegion","SongCat.","SongBeat","SongInst","Sn.Vocal","SongCmp.","SongLrc.","SongArr.","SongPerf","SongPrg.","SongTags"][a]}: ${i}`)});break}case"ln":{s.slice(1).forEach((i,a)=>{i.length&&this.#s.unshift(`${["Kar.Lang","Kar.Name","Kar.Cmp.","Kar.Lrc.","kar.Arr.","Kar.Perf","Kar.Prg."][a]}: ${i}`)});break}default:this.#s.unshift(`XGF_Data: ${t}`)}break}default:this.#i?t[0]=="\\"?this.#s.unshift(`@ ${t.slice(1)}`):t[0]=="/"?this.#s.unshift(t.slice(1)):this.#s[0]+=t:(this.#s[0]=t,this.#s.unshift(""))}},this.#c[2]=function(t){this.#s.unshift(`Copyrite: ${t}`)},this.#c[3]=function(t,s){s<1&&this.#w<1&&this.#s.unshift(`TrkTitle: ${t}`)},this.#c[4]=function(t,s){this.#s.unshift(`${A(this.#w,""," ")}Instrmnt: ${t}`)},this.#c[5]=function(t){t.trim()==""?this.#s.unshift(""):this.#s[0]+=`${t}`},this.#c[6]=function(t){this.#s.unshift(`${A(this.#w,""," ")}C.Marker: ${t}`)},this.#c[7]=function(t){this.#s.unshift(`CuePoint: ${t}`)},this.#c[32]=function(t){this.#w=t[0]+1},this.#c[33]=function(t,s){console.debug(`Track ${s} requests to get assigned to output ${t}.`),e.#S[s]=t+1},this.#c[81]=function(t,s){e.#_=t/1e3},this.#c[127]=function(t,s){e.#v.run(t,s)},this.#v.default=function(t){console.warn(`Unrecognized sequencer-specific byte sequence: ${t}`)},this.#v.add([67,0,1],function(t,s){e.#S[s]=t[0]+1}),this.#N=new b,this.#G=new b,this.#R=new b,this.#x=new b,this.#O=new b,this.#P=new b,this.#B=new b,this.#N.add([9],t=>{e.switchMode(["gm","?","g2"][t[0]-1],!0),e.#i=e.#i||!1,console.info(`MIDI reset: ${["GM","Init","GM2"][t[0]-1]}`),t[0]==2&&e.init()}),this.#G.add([4,1],t=>{e.#T=((t[1]<<7)+t[0])/16383*100}).add([4,3],t=>((t[1]<<7)+t[0]-8192)/8192).add([4,4],t=>t[1]-64),this.#R.add([76,0,0],t=>{switch(t[0]){case 126:{e.switchMode("xg",!0),e.#i=!1,console.info("MIDI reset: XG");break}}}).add([76,6,0],t=>{let s=t[0];s<64?(e.#a=" ".repeat(s),e.#b=Date.now()+3200,t.subarray(1).forEach(function(i){e.#a+=String.fromCharCode(i)}),e.#a=e.#a.padEnd(32," ")):e.#b=Date.now()}).add([76,7,0],t=>{let s=t[0];e.#p=Date.now()+3200,e.#o.fill(0);let i=t.subarray(1);for(let a=0;a<s;a++)i.unshift(0);i.forEach(function(a,r){let n=Math.floor(r/16),c=r%16,f=(c*3+n)*7,d=7,l=0;for(f-=c*5,n==2&&(d=2);l<d;)e.#o[f+l]=a>>6-l&1,l++})}),this.#R.add([43,7,0],(t,s,i)=>{e.#a=" ".repeat(offset),e.#b=Date.now()+3200,t.subarray(1).forEach(function(a){e.#a+=String.fromCharCode(a)}),e.#a=e.#a.padEnd(32," ")}).add([43,7,1],(t,s,i)=>{e.#p=Date.now()+3200,e.#o.fill(0),t.forEach(function(a,r){let n=Math.floor(r/16),c=r%16,f=(c*3+n)*7,d=7,l=0;for(f-=c*5,n==2&&(d=2);l<d;)e.#o[f+l]=a>>6-l&1,l++})}),this.#x.add([66,18,0,0,127],(t,s,i)=>{e.switchMode("gs",!0),e.#e[h.cc*9]=120,e.#e[h.cc*25]=120,e.#e[h.cc*41]=120,e.#e[h.cc*57]=120,e.#u=3,e.#i=!1,e.#k.fill(0),console.info(`GS system to ${["single","dual"][t[0]]} mode.`)}).add([66,18,64,0],(t,s,i)=>{switch(t[0]){case 127:{e.switchMode("gs",!0),e.#e[h.cc*9]=120,e.#e[h.cc*25]=120,e.#e[h.cc*41]=120,e.#e[h.cc*57]=120,e.#i=!1,e.#k.fill(0),console.info("MIDI reset: GS");break}}}).add([69,18,16],t=>{switch(t[0]){case 0:{e.#b=Date.now()+3200;let s=t[1];e.#a=" ".repeat(s),t.subarray(2).forEach(function(i){i<128&&(e.#a+=String.fromCharCode(i))});break}case 32:{e.#p=Date.now()+3200,t[1]==0&&(e.#m=Math.max(Math.min(t[2]-1,9),0));break}default:if(t[0]<11){e.#p=Date.now()+3200,e.#g[t[0]-1]?.length||(e.#g[t[0]-1]=new Uint8Array(256));let s=e.#g[t[0]-1],i=t[1];s.fill(0);let a=t.subarray(2);for(let r=0;r<i;r++)a.unshift(0);a.forEach(function(r,n){let c=Math.floor(n/16),f=n%16,d=(f*4+c)*5,l=5,u=0;for(d-=f*4,c==3&&(l=1);u<l;)s[d+u]=r>>4-u&1,u++})}else console.warn(`Unknown GS display section: ${t[0]}`)}}),this.#x.add([22,18,127],t=>{e.switchMode("mt32",!0),e.#i=!1,e.userBank.clearRange({msb:0,lsb:127,prg:[0,127]}),console.info("MIDI reset: MT-32")}).add([22,18,32],t=>{e.switchMode("mt32");let s=t[1],i=" ".repeat(s);t.subarray(2).forEach(a=>{a>31&&(i+=String.fromCharCode(a))}),e.#a=i.padStart(20," "),e.#b=Date.now()+3200}).add([22,18,82],(t,s)=>{let i=e.chRedir(0,s,!0);for(let a=0;a<16;a++)e.#r.ano(i+a),a&&a<10&&(e.#y[i+a]=mt32DefProg[a-1]);console.info("MT-32 alt reset complete.")}),this.#O.add([66,0],(t,s)=>{e.switchMode("ns5r",!0),e.#i=!1,console.debug(`NS5R mode switch requested: ${["global","multi","prog edit","comb edit","drum edit","effect edit"][t[0]]} mode.`)}).add([66,1],(t,s)=>{e.switchMode(["ns5r","05rw"][t[0]],!0),e.#i=!1}).add([66,18,0,0],(t,s)=>{switch(t[0]){case 124:case 126:case 127:{e.switchMode("ns5r",!0),e.#i=!1;break}}}).add([66,18,8,0],(t,s)=>{}).add([66,125],t=>{e.dispatchEvent("backlight",["green","orange","red",!1,"yellow","blue","purple"][t[0]]||"white")}).add([66,127],t=>{let s=new Uint8Array(5760);korgFilter(t,(i,a,r)=>{if(a<720)for(let n=0;n<8;n++)s[a*8+n]=i>>7-n&1}),e.dispatchEvent("screen",{type:"ns5r",data:s})}).add([76],(t,s,i)=>{e.#O.run([66,...t],s,i)}),this.#P.add([16,0,8,0],(t,s,i)=>{let a=(t[2]<<4)+t[3],r="K11 ";([()=>{e.switchMode("k11",!0),e.#i=!1,e.#u=a?4:0,console.info("MIDI reset: GMega/K11")}][t[0]]||(()=>{}))()}),this.#B.add([66,93,64],(t,s,i)=>{let a=t[2];switch(t[0]){case 0:{switch(t[1]){case 127:{e.switchMode("sg",!0);break}}break}}})}};export{ve as OctaviaDevice,h as allocated,o as ccToPos};
