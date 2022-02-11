var dt=Object.defineProperty,ht=Object.defineProperties;var mt=Object.getOwnPropertyDescriptors;var De=Object.getOwnPropertySymbols;var gt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var Fe=(t,e,n)=>e in t?dt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Le=(t,e)=>{for(var n in e||(e={}))gt.call(e,n)&&Fe(t,n,e[n]);if(De)for(var n of De(e))bt.call(e,n)&&Fe(t,n,e[n]);return t},Pe=(t,e)=>ht(t,mt(e));import{d as x,w as U,t as vt,S as ue,i as ce,s as ae,e as C,a as W,b as D,c as M,f as g,g as me,h as T,j as h,k as Re,l as Ce,m as N,n as R,o as se,p as we,q as He,r as kt,u as yt,v as ge,x as _e,y as de,z as ne,A as Ct,B as J,C as $,D as he,E as be,F as Ge,G as ee,H as fe,I as ze,J as Ie,K as Ne,L as wt,M as St,N as qt,O as Ae,P as Oe,Q as Lt,R as Ve}from"./vendor.c033bc89.js";const zt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};zt();function At(){let t=function(n){};return{promise:new Promise(n=>t=n),resolve:t}}function Se(t,e){const n=[];for(let l=0;l<t;l++)n[l]=typeof e=="function"?e(l):e;return n}function Ot(t,e){const n=[];let l=0;const o=t.length;for(;l<o;)n.push(t.slice(l,l+=e));return n}function Et(t,e){return t.reduce((n,l)=>{const o=e(l);return n.find(i=>e(i)===o)||n.push(l),n},[])}function Mt(t,e,n){const l=8;Ot(n,l).forEach((i,s)=>t.gridLedRow(s*l,e,i))}async function Tt(t){return new Promise(e=>{t.on("getGridSize",n=>e(n)),t.getGridSize()})}function Ee(t,e,n,l){return Se(t,o=>{const i=e(Le({id:o},l));return n.push(i),i}),n}const ie=[];function Bt({id:t,audioContext:e}){let n;const l=e.createGain();l.connect(e.destination);const o=U(!1),i=U(1),s=U(!1);x([i,s],([a,p])=>p?0:a).subscribe(a=>l.gain.value=a);function c(a,p){return u(),n=a,a.connect(l),a.start(0,p),o.set(!0),a}function u(){n==null||n.stop(),o.set(!1)}return{id:t,level:i,muted:s,active:o,play:c,stop:u}}const je=new FileReader;function Dt(t,e){return new Promise(n=>{je.readAsArrayBuffer(t),je.onload=async({target:{result:l}})=>{n(await e.decodeAudioData(l))}})}function Ft(t){const e=new AudioBuffer({sampleRate:t.sampleRate,numberOfChannels:t.numberOfChannels,length:t.length});for(let l=0;l<t.numberOfChannels;l++){const o=t.getChannelData(l),i=e.getChannelData(l);for(var n=t.length-1;n>=0;n--)i[t.length-n-1]=o[n]}return e}function Pt(t,e,n){const l=e.createBufferSource();t&&(l.buffer=t);const{loopStart:o,loopEnd:i,loop:s,speed:r}=n;return l.loop=!!s,o!=null&&(l.loopStart=o),i!=null&&(l.loopEnd=i),r!=null&&(l.playbackRate.value=r),l}function Rt(t,e){let n,l,o;t.addEventListener("ended",s);function i(b=0){n=b,e(w()),l=c(),o=setInterval(r,1e3/60)}function s(){clearInterval(o)}function r(){const b=c();n+=(b-l)*m(),v()&&n>p()&&(n=a()+(n-p())),e(w()),l=b}function c(){return+new Date/1e3}function u(){return t.buffer.duration}function a(){return t.loopStart||0}function p(){return t.loopEnd||u()}function v(){return t.loop}function m(){return t.playbackRate.value}function w(){return Math.min(n/u()-Number.MIN_VALUE,1)}return{start:i,stop:s,check:r}}const ve=[];function Ht({id:t,audioContext:e,group:n,stepCount:l,bpm:o,scheduler:i}){n=U(n);const s=U(null),r=x(s,d=>d&&Ft(d)),c=x(s,d=>(d==null?void 0:d.duration)||0),u=U(0),a=U(!1),p=U(0),v=U(),m=U(l),w=x(m,d=>Se(l,A=>({enabled:A<d}))),b=x(o,d=>60/d),F=x([b,m],([d,A])=>d*A),P=U(0),V=U(!1),q=x([P,V,m],([d,A,k])=>A?le(Math.floor(d*k)):null),f=x([c,F,u],([d,A,k])=>d?d/A*Math.pow(2,k):1),z=x([c,m,p],([d,A,k])=>d/A*k),O=x([c,m,v],([d,A,k])=>d/A*(k!=null?k:A)),B=x(z,d=>d!=null),te={group:n,buffer:s,reffub:r,duration:c,enabledStepCount:m,steps:w,currentStep:q,octave:u,speed:f,reverse:a,loopStart:z,loopEnd:O,loop:B,playing:V,progress:P},H={};for(const d in te)te[d].subscribe(A=>H[d]=A);let L,G;z.subscribe(d=>{L&&(L.loopStart=d),G==null||G.check()}),O.subscribe(d=>{L&&(L.loopEnd=d),G==null||G.check()}),B.subscribe(d=>{L&&(L.loop=d),G==null||G.check()}),f.subscribe(d=>{L&&(L.playbackRate.value=d),G==null||G.check()}),a.subscribe(()=>{const{playing:d,duration:A,progress:k}=H;d&&S((1-k)*A)}),c.subscribe(async d=>{const{playing:A,progress:k}=H;A&&(G==null||G.check(),await vt(),S(k*d))});function _(d){!H.buffer||!K(d)||i.schedule(function(){S(y(le(d)))})}function S(d){L=E(),H.group.play(L,d),G==null||G.stop(),G=Rt(L,P.set),G.start(d),V.set(!0)}function j(){p.set(0),v.set(null)}function X(d){if(!K(d[0])||!K(d[1]))return;d=le(d);const{reverse:A}=H;p.set(A?d[1]:d[0]),v.set(A?d[0]:d[1])}function y(d){const{duration:A,enabledStepCount:k}=H;return A/k*d}function K(d){return d<H.enabledStepCount}function le(d){return Array.isArray(d)?d.map(pe):pe(d)}function pe(d){if(d==null)return d;const{enabledStepCount:A,reverse:k}=H;return k?Math.abs(d-(A-1)):d}let oe;function E(){const{reverse:d,buffer:A,reffub:k,loop:Q,loopStart:Y,loopEnd:I,speed:re}=H;return oe=+new Date+Math.random(),L=Pt(d?k:A,e,{loop:Q,loopStart:Y,loopEnd:I,speed:re}),L.onended=(_t=>()=>Z(_t))(oe),L}function Z(d){(!d||oe===d)&&V.set(!1)}return Pe(Le({id:t},te),{start:_,resetLoopPoints:j,loopBetween:X})}const ke=[];function Gt({id:t,bpm:e,scheduler:n,router:l}){const o=U(!1),i=U(!1),s=x([o,i],([f,z])=>f||z),r=U(8),c=x([e,r],([f,z])=>60/f*z);let u=()=>{},a=[],p=null;const v={recordable:o,playing:i,active:s,length:r,duration:c},m={};for(const f in v)v[f].subscribe(z=>m[f]=z);function w(){m.active?(o.set(!1),i.set(!1),q()):o.set(!0)}function b(f){const{recordable:z,duration:O}=m;!z||a.push(P(f))===1&&(p=n.schedule(F,null,{in:O}))}function F(){o.set(!1),i.set(!0)}function P({x:f,y:z,state:O}){const{duration:B}=m;return n.schedule(()=>{l.handle({x:f,y:z,state:O,source:"pattern"}),n.schedule(u)},null,{in:B,repeat:B})}function V(){p==null||p.clear(),p=null,i.set(!1)}function q(){a.forEach(f=>f.clear()),a=[],V()}return{id:t,toggle:w,record:b,recordable:o,playing:i,active:s,length:r,set onactivity(f){u=f}}}function Ke(t,e,n){const l=t.slice();return l[4]=e[n],l}function Ze(t){let e,n=t[4].name+"",l,o,i;return{c(){e=C("option"),l=W(n),o=D(),e.__value=i=t[4],e.value=e.__value},m(s,r){M(s,e,r),g(e,l),g(e,o)},p(s,r){r&4&&n!==(n=s[4].name+"")&&me(l,n),r&4&&i!==(i=s[4])&&(e.__value=i,e.value=e.__value)},d(s){s&&T(e)}}}function It(t){let e,n,l,o=t[2],i=[];for(let s=0;s<o.length;s+=1)i[s]=Ze(Ke(t,o,s));return{c(){e=C("select");for(let s=0;s<i.length;s+=1)i[s].c();h(e,"class","svelte-1hx4o8j"),t[0]===void 0&&Re(()=>t[3].call(e))},m(s,r){M(s,e,r);for(let c=0;c<i.length;c+=1)i[c].m(e,null);Ce(e,t[0]),n||(l=N(e,"change",t[3]),n=!0)},p(s,[r]){if(r&4){o=s[2];let c;for(c=0;c<o.length;c+=1){const u=Ke(s,o,c);i[c]?i[c].p(u,r):(i[c]=Ze(u),i[c].c(),i[c].m(e,null))}for(;c<i.length;c+=1)i[c].d(1);i.length=o.length}r&5&&Ce(e,s[0])},i:R,o:R,d(s){s&&T(e),se(i,s),n=!1,l()}}}function Nt(t,e,n){let l,o=R,i=()=>(o(),o=we(s,u=>n(2,l=u)),s);t.$$.on_destroy.push(()=>o());let{files:s}=e;i();let{selected:r}=e;function c(){r=He(this),n(0,r)}return t.$$set=u=>{"files"in u&&i(n(1,s=u.files)),"selected"in u&&n(0,r=u.selected)},[r,s,l,c]}class Vt extends ue{constructor(e){super();ce(this,e,Nt,It,ae,{files:1,selected:0})}}function Ue(t,e,n){const l=t.slice();return l[34]=e[n],l}function Qe(t,e,n){const l=t.slice();return l[37]=e[n],l[39]=n,l}function Je(t){let e,n,l,o,i,s,r;function c(){return t[25](t[39])}return{c(){e=C("input"),h(e,"name",n="sample_"+t[11]+"_step"),h(e,"type","radio"),e.value=l=t[39],e.checked=o=t[3]==t[39],e.disabled=i=!t[37].enabled,h(e,"autocomplete","off")},m(u,a){M(u,e,a),s||(r=N(e,"click",ge(c)),s=!0)},p(u,a){t=u,a[0]&8&&o!==(o=t[3]==t[39])&&(e.checked=o),a[0]&16&&i!==(i=!t[37].enabled)&&(e.disabled=i)},d(u){u&&T(e),s=!1,r()}}}function We(t){let e,n,l,o,i;return{c(){e=C("input"),h(e,"name",n="sample_"+t[11]+"_group"),h(e,"type","radio"),e.__value=l=t[34],e.value=e.__value,h(e,"autocomplete","off"),t[31][0].push(e)},m(s,r){M(s,e,r),e.checked=e.__value===t[10],o||(i=N(e,"change",t[30]),o=!0)},p(s,r){r[0]&1&&l!==(l=s[34])&&(e.__value=l,e.value=e.__value),r[0]&1024&&(e.checked=e.__value===s[10])},d(s){s&&T(e),t[31][0].splice(t[31][0].indexOf(e),1),o=!1,i()}}}function jt(t){let e,n,l,o,i,s,r,c,u,a,p,v,m=(t[7]>=0?"+":"")+"",w,b,F,P,V,q,f,z,O=t[8].toFixed(2)+"",B,te,H,L,G,_,S,j,X,y,K,le;function pe(k){t[24](k)}let oe={files:t[1]};t[2]!==void 0&&(oe.selected=t[2]),l=new Vt({props:oe}),kt.push(()=>yt(l,"selected",pe));let E=t[4],Z=[];for(let k=0;k<E.length;k+=1)Z[k]=Je(Qe(t,E,k));let d=t[0],A=[];for(let k=0;k<d.length;k+=1)A[k]=We(Ue(t,d,k));return{c(){e=C("tr"),n=C("td"),_e(l.$$.fragment),i=D(),s=C("td"),r=C("div");for(let k=0;k<Z.length;k+=1)Z[k].c();c=D(),u=C("input"),a=D(),p=C("td"),v=C("span"),w=W(m),b=W(t[7]),F=D(),P=C("button"),P.textContent="-",V=D(),q=C("button"),q.textContent="+",f=D(),z=C("td"),B=W(O),te=D(),H=C("td"),L=C("input"),G=D(),_=C("label"),S=W("Rev"),j=D(),X=C("td");for(let k=0;k<A.length;k+=1)A[k].c();h(n,"class","svelte-2kpfy0"),h(u,"type","range"),h(u,"min","1"),h(u,"max",t[5]),h(u,"step","1"),h(u,"class","svelte-2kpfy0"),h(s,"class","svelte-2kpfy0"),h(P,"aria-label","Decrement octave"),h(q,"aria-label","Increment octave"),h(p,"class","svelte-2kpfy0"),h(z,"class","svelte-2kpfy0"),h(L,"id","sample_"+t[11]+"_reverse"),h(L,"type","checkbox"),h(_,"for","sample_"+t[11]+"_reverse"),h(H,"class","svelte-2kpfy0"),h(X,"class","svelte-2kpfy0")},m(k,Q){M(k,e,Q),g(e,n),de(l,n,null),g(e,i),g(e,s),g(s,r);for(let Y=0;Y<Z.length;Y+=1)Z[Y].m(r,null);g(s,c),g(s,u),ne(u,t[6]),g(e,a),g(e,p),g(p,v),g(v,w),g(v,b),g(p,F),g(p,P),g(p,V),g(p,q),g(e,f),g(e,z),g(z,B),g(e,te),g(e,H),g(H,L),L.checked=t[9],g(H,G),g(H,_),g(_,S),g(e,j),g(e,X);for(let Y=0;Y<A.length;Y+=1)A[Y].m(X,null);y=!0,K||(le=[N(u,"change",t[26]),N(u,"input",t[26]),N(P,"click",t[27]),N(q,"click",t[28]),N(L,"change",t[29])],K=!0)},p(k,Q){const Y={};if(Q[0]&2&&(Y.files=k[1]),!o&&Q[0]&4&&(o=!0,Y.selected=k[2],Ct(()=>o=!1)),l.$set(Y),Q[0]&1050648){E=k[4];let I;for(I=0;I<E.length;I+=1){const re=Qe(k,E,I);Z[I]?Z[I].p(re,Q):(Z[I]=Je(re),Z[I].c(),Z[I].m(r,null))}for(;I<Z.length;I+=1)Z[I].d(1);Z.length=E.length}if((!y||Q[0]&32)&&h(u,"max",k[5]),Q[0]&64&&ne(u,k[6]),(!y||Q[0]&128)&&m!==(m=(k[7]>=0?"+":"")+"")&&me(w,m),(!y||Q[0]&128)&&me(b,k[7]),(!y||Q[0]&256)&&O!==(O=k[8].toFixed(2)+"")&&me(B,O),Q[0]&512&&(L.checked=k[9]),Q[0]&3073){d=k[0];let I;for(I=0;I<d.length;I+=1){const re=Ue(k,d,I);A[I]?A[I].p(re,Q):(A[I]=We(re),A[I].c(),A[I].m(X,null))}for(;I<A.length;I+=1)A[I].d(1);A.length=d.length}},i(k){y||(J(l.$$.fragment,k),y=!0)},o(k){$(l.$$.fragment,k),y=!1},d(k){k&&T(e),he(l),se(Z,k),se(A,k),K=!1,be(le)}}}function Kt(t,e,n){let l,o,i,s,r,c,u,a,p,v;const m=Ge("audioContext");let{sample:w={}}=e,{id:b,steps:F,enabledStepCount:P,currentStep:V,octave:q,speed:f,reverse:z,buffer:O,group:B,start:te}=w;ee(t,F,E=>n(4,r=E)),ee(t,P,E=>n(6,c=E)),ee(t,V,E=>n(3,s=E)),ee(t,q,E=>n(7,u=E)),ee(t,f,E=>n(8,a=E)),ee(t,z,E=>n(9,p=E)),ee(t,O,E=>n(32,i=E)),ee(t,B,E=>n(10,v=E));let{groups:H=[]}=e,{monome:L={}}=e,{files:G={}}=e,_;const S=[[]];function j(E){_=E,n(2,_)}const X=E=>te(E);function y(){c=fe(this.value),P.set(c)}const K=()=>ze(q,--u,u),le=()=>ze(q,++u,u);function pe(){p=this.checked,z.set(p)}function oe(){v=this.__value,B.set(v)}return t.$$set=E=>{"sample"in E&&n(21,w=E.sample),"groups"in E&&n(0,H=E.groups),"monome"in E&&n(22,L=E.monome),"files"in E&&n(1,G=E.files)},t.$$.update=()=>{t.$$.dirty[0]&16&&n(5,l=r.length),t.$$.dirty[0]&12582936&&Mt(L,o,r.map((E,Z)=>Z===s)),t.$$.dirty[0]&4&&_&&Dt(_,m).then(E=>ze(O,i=E,i))},n(23,o=b+1),[H,G,_,s,r,l,c,u,a,p,v,b,F,P,V,q,f,z,O,B,te,w,L,o,j,X,y,K,le,pe,oe,S]}class Zt extends ue{constructor(e){super();ce(this,e,Kt,jt,ae,{sample:21,groups:0,monome:22,files:1},null,[-1,-1])}}function Xe(t,e,n){const l=t.slice();return l[8]=e[n].name,l}function Ye(t){let e,n=t[3],l=[];for(let o=0;o<n.length;o+=1)l[o]=xe(Xe(t,n,o));return{c(){e=C("ul");for(let o=0;o<l.length;o+=1)l[o].c();h(e,"class","svelte-1eckyqf")},m(o,i){M(o,e,i);for(let s=0;s<l.length;s+=1)l[s].m(e,null)},p(o,i){if(i&8){n=o[3];let s;for(s=0;s<n.length;s+=1){const r=Xe(o,n,s);l[s]?l[s].p(r,i):(l[s]=xe(r),l[s].c(),l[s].m(e,null))}for(;s<l.length;s+=1)l[s].d(1);l.length=n.length}},d(o){o&&T(e),se(l,o)}}}function xe(t){let e,n,l,o,i=t[8]+"",s,r;return{c(){e=C("li"),n=Ie("svg"),l=Ie("path"),o=D(),s=W(i),r=D(),h(l,"d","M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"),h(l,"fill","currentColor"),h(l,"fill-rule","evenodd"),h(l,"clip-rule","evenodd"),h(n,"width","15"),h(n,"height","15"),h(n,"viewBox","0 0 15 15"),h(n,"fill","none"),h(n,"xmlns","http://www.w3.org/2000/svg"),h(n,"class","svelte-1eckyqf"),h(e,"class","svelte-1eckyqf")},m(c,u){M(c,e,u),g(e,n),g(n,l),g(e,o),g(e,s),g(e,r)},p(c,u){u&8&&i!==(i=c[8]+"")&&me(s,i)},d(c){c&&T(e)}}}function Ut(t){let e,n,l,o,i,s,r,c,u=t[3].length&&Ye(t);return{c(){e=C("section"),n=C("label"),n.textContent="Audio file drop",l=D(),o=C("div"),i=C("input"),s=D(),u&&u.c(),h(n,"for","files"),h(i,"accept","audio/*"),h(i,"id","files"),h(i,"name","files"),h(i,"type","file"),h(i,"class","svelte-1eckyqf"),h(o,"class","file-drop svelte-1eckyqf"),Ne(o,"dragover",t[2]),h(e,"class","svelte-1eckyqf")},m(a,p){M(a,e,p),g(e,n),g(e,l),g(e,o),g(o,i),g(o,s),u&&u.m(o,null),r||(c=[N(i,"change",t[5]),N(o,"dragover",ge(t[6])),N(o,"dragleave",ge(t[7])),N(o,"drop",ge(t[4]))],r=!0)},p(a,[p]){a[3].length?u?u.p(a,p):(u=Ye(a),u.c(),u.m(o,null)):u&&(u.d(1),u=null),p&4&&Ne(o,"dragover",a[2])},i:R,o:R,d(a){a&&T(e),u&&u.d(),r=!1,be(c)}}}function Qt(t){return t.reduce((e,n)=>{if(n.kind==="file"){const l=n.getAsFile();/^(audio|video)/.test(l.type)&&e.push(l)}return e},[])}function Jt(t,e,n){let l,o=R,i=()=>(o(),o=we(s,m=>n(3,l=m)),s);t.$$.on_destroy.push(()=>o());let{files:s}=e;i();let r,c=!1;function u({dataTransfer:m}){n(2,c=!1),s.add(Qt([...m.items]))}function a(){r=this.files,n(1,r)}const p=()=>n(2,c=!0),v=()=>n(2,c=!1);return t.$$set=m=>{"files"in m&&i(n(0,s=m.files))},t.$$.update=()=>{t.$$.dirty&3&&s.add(r)},[s,r,c,l,u,a,p,v]}class Wt extends ue{constructor(e){super();ce(this,e,Jt,Ut,ae,{files:0})}}function Xt(t){let e,n,l,o,i,s,r,c,u,a,p,v,m,w,b;return{c(){e=C("div"),n=C("label"),l=C("input"),i=W(`
    On/Off`),s=D(),r=C("label"),c=C("input"),u=W(`
    Mute`),a=D(),p=C("label"),v=W(`Level
    `),m=C("input"),h(l,"type","checkbox"),l.disabled=o=!t[0],h(n,"class","svelte-37acoc"),h(c,"type","checkbox"),h(r,"class","svelte-37acoc"),h(m,"type","range"),h(m,"min","0"),h(m,"max","1"),h(m,"step","0.01"),h(p,"class","svelte-37acoc")},m(F,P){M(F,e,P),g(e,n),g(n,l),l.checked=t[0],g(n,i),g(e,s),g(e,r),g(r,c),c.checked=t[1],g(r,u),g(e,a),g(e,p),g(p,v),g(p,m),ne(m,t[2]),w||(b=[N(l,"change",t[8]),N(c,"change",t[9]),N(m,"change",t[10]),N(m,"input",t[10])],w=!0)},p(F,[P]){P&1&&o!==(o=!F[0])&&(l.disabled=o),P&1&&(l.checked=F[0]),P&2&&(c.checked=F[1]),P&4&&ne(m,F[2])},i:R,o:R,d(F){F&&T(e),w=!1,be(b)}}}function Yt(t,e,n){let l,o,i,{group:s={}}=e,{monome:r}=e,{id:c,active:u,muted:a,level:p}=s;ee(t,u,b=>n(0,l=b)),ee(t,a,b=>n(1,o=b)),ee(t,p,b=>n(2,i=b));function v(){l=this.checked,u.set(l)}function m(){o=this.checked,a.set(o)}function w(){i=fe(this.value),p.set(i)}return t.$$set=b=>{"group"in b&&n(6,s=b.group),"monome"in b&&n(7,r=b.monome)},t.$$.update=()=>{t.$$.dirty&65&&(l||s.stop()),t.$$.dirty&129&&r.gridLed(c,0,l)},[l,o,i,u,a,p,s,r,v,m,w]}class xt extends ue{constructor(e){super();ce(this,e,Yt,Xt,ae,{group:6,monome:7})}}function $e(t,e,n){const l=t.slice();return l[12]=e[n],l}function et(t){let e,n,l=t[12]+"",o,i;return{c(){e=C("option"),n=W("1/"),o=W(l),e.__value=i=t[12],e.value=e.__value},m(s,r){M(s,e,r),g(e,n),g(e,o)},p:R,d(s){s&&T(e)}}}function $t(t){let e,n,l,o,i,s,r,c,u,a,p,v,m,w,b,F,P,V=t[4],q=[];for(let f=0;f<V.length;f+=1)q[f]=et($e(t,V,f));return{c(){e=C("label"),e.textContent="Tempo",n=D(),l=C("input"),o=D(),i=C("button"),i.textContent="-4",s=D(),r=C("button"),r.textContent="-1",c=D(),u=C("button"),u.textContent="+1",a=D(),p=C("button"),p.textContent="+4",v=D(),m=C("label"),m.textContent="Quantize",w=D(),b=C("select");for(let f=0;f<q.length;f+=1)q[f].c();h(e,"for","tempo"),h(l,"type","number"),h(l,"id","tempo"),h(l,"size","6"),h(l,"class","svelte-1texyt4"),h(m,"for","quantize"),h(b,"name","quantize"),h(b,"id","quantize"),t[3]===void 0&&Re(()=>t[11].call(b))},m(f,z){M(f,e,z),M(f,n,z),M(f,l,z),ne(l,t[2]),M(f,o,z),M(f,i,z),M(f,s,z),M(f,r,z),M(f,c,z),M(f,u,z),M(f,a,z),M(f,p,z),M(f,v,z),M(f,m,z),M(f,w,z),M(f,b,z);for(let O=0;O<q.length;O+=1)q[O].m(b,null);Ce(b,t[3]),F||(P=[N(l,"input",t[6]),N(i,"click",t[7]),N(r,"click",t[8]),N(u,"click",t[9]),N(p,"click",t[10]),N(b,"change",t[11])],F=!0)},p(f,[z]){if(z&4&&fe(l.value)!==f[2]&&ne(l,f[2]),z&16){V=f[4];let O;for(O=0;O<V.length;O+=1){const B=$e(f,V,O);q[O]?q[O].p(B,z):(q[O]=et(B),q[O].c(),q[O].m(b,null))}for(;O<q.length;O+=1)q[O].d(1);q.length=V.length}z&24&&Ce(b,f[3])},i:R,o:R,d(f){f&&T(e),f&&T(n),f&&T(l),f&&T(o),f&&T(i),f&&T(s),f&&T(r),f&&T(c),f&&T(u),f&&T(a),f&&T(p),f&&T(v),f&&T(m),f&&T(w),f&&T(b),se(q,f),F=!1,be(P)}}}function en(t,e,n){let l,o=R,i=()=>(o(),o=we(u,q=>n(2,l=q)),u),s,r=R,c=()=>(r(),r=we(a,q=>n(3,s=q)),a);t.$$.on_destroy.push(()=>o()),t.$$.on_destroy.push(()=>r());let{bpm:u}=e;i();let{quantize:a}=e;c();const p=[128,64,32,16,8,4,2];function v(q){u.update(f=>f+q)}function m(){l=fe(this.value),u.set(l)}const w=()=>v(-4),b=()=>v(-1),F=()=>v(1),P=()=>v(4);function V(){s=He(this),a.set(s),n(4,p)}return t.$$set=q=>{"bpm"in q&&i(n(0,u=q.bpm)),"quantize"in q&&c(n(1,a=q.quantize))},[u,a,l,s,p,v,m,w,b,F,P,V]}class tn extends ue{constructor(e){super();ce(this,e,en,$t,ae,{bpm:0,quantize:1})}}function nn(t){let e,n,l,o,i,s,r,c,u,a,p,v,m;return{c(){e=C("div"),n=C("label"),l=C("input"),o=W(`
    On/Off`),i=D(),s=C("label"),r=W(`Length
    `),c=C("input"),u=D(),a=C("input"),p=W(`
    beats`),h(l,"id","pattern_"+t[2]+"_active"),h(l,"name","pattern_"+t[2]+"_active"),h(l,"type","checkbox"),l.checked=t[0],h(n,"class","svelte-37acoc"),h(c,"type","range"),h(c,"min","1"),h(c,"max","32"),h(a,"type","number"),h(a,"min","1"),h(a,"max","32"),h(s,"class","svelte-37acoc")},m(w,b){M(w,e,b),g(e,n),g(n,l),g(n,o),g(e,i),g(e,s),g(s,r),g(s,c),ne(c,t[1]),g(s,u),g(s,a),ne(a,t[1]),g(s,p),v||(m=[N(l,"change",ge(t[4])),N(c,"change",t[8]),N(c,"input",t[8]),N(a,"input",t[9])],v=!0)},p(w,[b]){b&1&&(l.checked=w[0]),b&2&&ne(c,w[1]),b&2&&fe(a.value)!==w[1]&&ne(a,w[1])},i:R,o:R,d(w){w&&T(e),v=!1,be(m)}}}function ln(t,e,n){let l,o,{pattern:i={}}=e,{monome:s}=e,{id:r,active:c,toggle:u,length:a}=i;ee(t,c,w=>n(0,l=w)),ee(t,a,w=>n(1,o=w));const p=r+ie.length;i.onactivity=()=>{s.gridLed(p,0,0),setTimeout(()=>l&&s.gridLed(p,0,1),50)};function v(){o=fe(this.value),a.set(o)}function m(){o=fe(this.value),a.set(o)}return t.$$set=w=>{"pattern"in w&&n(6,i=w.pattern),"monome"in w&&n(7,s=w.monome)},t.$$.update=()=>{t.$$.dirty&129&&s.gridLed(p,0,l)},[l,o,r,c,u,a,i,s,v,m]}class on extends ue{constructor(e){super();ce(this,e,ln,nn,ae,{pattern:6,monome:7})}}function tt(t,e,n){const l=t.slice();return l[9]=e[n],l}function nt(t,e,n){const l=t.slice();return l[12]=e[n],l}function lt(t,e,n){const l=t.slice();return l[15]=e[n],l}function ot(t){let e,n,l,o,i,s,r,c,u;return{c(){e=C("p"),e.innerHTML="Before you start, svemlr requires that <strong>serialosc is disabled</strong>. On macOS open Terminal and execute:",n=D(),l=C("pre"),l.innerHTML='<code class="svelte-lgrb9r">launchctl unload /Library/LaunchAgents/org.monome.serialosc.plist</code>',o=D(),i=C("p"),i.innerHTML='To re-enable: <code class="svelte-lgrb9r">launchctl load /Library/LaunchAgents/org.monome.serialosc.plist</code>',s=D(),r=C("button"),r.textContent="Connect",h(l,"class","svelte-lgrb9r")},m(a,p){M(a,e,p),M(a,n,p),M(a,l,p),M(a,o,p),M(a,i,p),M(a,s,p),M(a,r,p),c||(u=N(r,"click",t[5]),c=!0)},p:R,d(a){a&&T(e),a&&T(n),a&&T(l),a&&T(o),a&&T(i),a&&T(s),a&&T(r),c=!1,u()}}}function sn(t){return{c:R,m:R,p:R,i:R,o:R,d:R}}function rn(t){let e,n,l,o,i,s,r,c,u,a,p,v,m,w,b,F,P,V,q=ve,f=[];for(let _=0;_<q.length;_+=1)f[_]=st(lt(t,q,_));const z=_=>$(f[_],1,1,()=>{f[_]=null});r=new Wt({props:{files:t[0]}}),u=new tn({props:{bpm:t[1],quantize:t[2]}});let O=ke,B=[];for(let _=0;_<O.length;_+=1)B[_]=it(nt(t,O,_));const te=_=>$(B[_],1,1,()=>{B[_]=null});let H=ie,L=[];for(let _=0;_<H.length;_+=1)L[_]=rt(tt(t,H,_));const G=_=>$(L[_],1,1,()=>{L[_]=null});return{c(){e=C("section"),n=C("table"),l=C("thead"),l.innerHTML=`<th>File</th> 
					<th></th> 
					<th>Octave</th> 
					<th>Speed</th> 
					<th></th> 
					<th>Group</th>`,o=D(),i=C("tbody");for(let _=0;_<f.length;_+=1)f[_].c();s=D(),_e(r.$$.fragment),c=D(),_e(u.$$.fragment),a=D(),p=C("fieldset"),v=C("legend"),v.textContent="Patterns",m=D();for(let _=0;_<B.length;_+=1)B[_].c();w=D(),b=C("fieldset"),F=C("legend"),F.textContent="Groups",P=D();for(let _=0;_<L.length;_+=1)L[_].c();h(e,"class","samples svelte-lgrb9r"),h(v,"class","svelte-lgrb9r"),h(p,"class","svelte-lgrb9r"),h(F,"class","svelte-lgrb9r"),h(b,"class","svelte-lgrb9r")},m(_,S){M(_,e,S),g(e,n),g(n,l),g(n,o),g(n,i);for(let j=0;j<f.length;j+=1)f[j].m(i,null);g(e,s),de(r,e,null),M(_,c,S),de(u,_,S),M(_,a,S),M(_,p,S),g(p,v),g(p,m);for(let j=0;j<B.length;j+=1)B[j].m(p,null);M(_,w,S),M(_,b,S),g(b,F),g(b,P);for(let j=0;j<L.length;j+=1)L[j].m(b,null);V=!0},p(_,S){if(S&17){q=ve;let y;for(y=0;y<q.length;y+=1){const K=lt(_,q,y);f[y]?(f[y].p(K,S),J(f[y],1)):(f[y]=st(K),f[y].c(),J(f[y],1),f[y].m(i,null))}for(Ae(),y=q.length;y<f.length;y+=1)z(y);Oe()}const j={};S&1&&(j.files=_[0]),r.$set(j);const X={};if(S&2&&(X.bpm=_[1]),S&4&&(X.quantize=_[2]),u.$set(X),S&16){O=ke;let y;for(y=0;y<O.length;y+=1){const K=nt(_,O,y);B[y]?(B[y].p(K,S),J(B[y],1)):(B[y]=it(K),B[y].c(),J(B[y],1),B[y].m(p,null))}for(Ae(),y=O.length;y<B.length;y+=1)te(y);Oe()}if(S&16){H=ie;let y;for(y=0;y<H.length;y+=1){const K=tt(_,H,y);L[y]?(L[y].p(K,S),J(L[y],1)):(L[y]=rt(K),L[y].c(),J(L[y],1),L[y].m(b,null))}for(Ae(),y=H.length;y<L.length;y+=1)G(y);Oe()}},i(_){if(!V){for(let S=0;S<q.length;S+=1)J(f[S]);J(r.$$.fragment,_),J(u.$$.fragment,_);for(let S=0;S<O.length;S+=1)J(B[S]);for(let S=0;S<H.length;S+=1)J(L[S]);V=!0}},o(_){f=f.filter(Boolean);for(let S=0;S<f.length;S+=1)$(f[S]);$(r.$$.fragment,_),$(u.$$.fragment,_),B=B.filter(Boolean);for(let S=0;S<B.length;S+=1)$(B[S]);L=L.filter(Boolean);for(let S=0;S<L.length;S+=1)$(L[S]);V=!1},d(_){_&&T(e),se(f,_),he(r),_&&T(c),he(u,_),_&&T(a),_&&T(p),se(B,_),_&&T(w),_&&T(b),se(L,_)}}}function st(t){let e,n;return e=new Zt({props:{sample:t[15],groups:ie,monome:t[3],files:t[0]}}),{c(){_e(e.$$.fragment)},m(l,o){de(e,l,o),n=!0},p(l,o){const i={};o&1&&(i.files=l[0]),e.$set(i)},i(l){n||(J(e.$$.fragment,l),n=!0)},o(l){$(e.$$.fragment,l),n=!1},d(l){he(e,l)}}}function it(t){let e,n;return e=new on({props:{pattern:t[12],monome:t[3]}}),{c(){_e(e.$$.fragment)},m(l,o){de(e,l,o),n=!0},p:R,i(l){n||(J(e.$$.fragment,l),n=!0)},o(l){$(e.$$.fragment,l),n=!1},d(l){he(e,l)}}}function rt(t){let e,n;return e=new xt({props:{monome:t[3],group:t[9]}}),{c(){_e(e.$$.fragment)},m(l,o){de(e,l,o),n=!0},p:R,i(l){n||(J(e.$$.fragment,l),n=!0)},o(l){$(e.$$.fragment,l),n=!1},d(l){he(e,l)}}}function un(t){return{c:R,m:R,p:R,i:R,o:R,d:R}}function cn(t){let e,n,l,o=!t[3]&&ot(t),i={ctx:t,current:null,token:null,hasCatch:!1,pending:un,then:rn,catch:sn,value:3,blocks:[,,,]};return wt(t[4].promise,i),{c(){e=C("main"),o&&o.c(),n=D(),i.block.c()},m(s,r){M(s,e,r),o&&o.m(e,null),g(e,n),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=null,l=!0},p(s,[r]){t=s,t[3]?o&&(o.d(1),o=null):o?o.p(t,r):(o=ot(t),o.c(),o.m(e,n)),St(i,t,r)},i(s){l||(J(i.block),l=!0)},o(s){for(let r=0;r<3;r+=1){const c=i.blocks[r];$(c)}l=!1},d(s){s&&T(e),o&&o.d(),i.block.d(),i.token=null,i=null}}}function an(){alert("could not connect to monome grid. please use a chromium browser and disable serialosc.")}function fn(t,e,n){const l=Ge("audioContext");let{router:o={}}=e,{files:i={}}=e,{bpm:s={}}=e,{quantize:r={}}=e,{scheduler:c={}}=e,u;const a=At();async function p(){l.resume();try{n(3,u=await qt.connect());const{x:v,y:m}=await Tt(u);Ee(4,Bt,ie,{audioContext:l}),Ee(m-1,Ht,ve,{audioContext:l,group:ie[0],stepCount:v,bpm:s,scheduler:c}),Ee(2,Gt,ke,{bpm:s,scheduler:c,router:o}),o.start(u),a.resolve(u)}catch{an()}}return t.$$set=v=>{"router"in v&&n(6,o=v.router),"files"in v&&n(0,i=v.files),"bpm"in v&&n(1,s=v.bpm),"quantize"in v&&n(2,r=v.quantize),"scheduler"in v&&n(7,c=v.scheduler)},[i,s,r,u,a,p,o,c]}class pn extends ue{constructor(e){super();ce(this,e,fn,cn,ae,{router:6,files:0,bpm:1,quantize:2,scheduler:7})}}const ut=[],ct=Se(16,()=>Se(16,0));function ye(t,e){ut.push({matcher:t,handler:e})}function _n(t){t.on("gridKeyDown",({x:e,y:n})=>Me({x:e,y:n,state:1,source:"press"})),t.on("gridKeyUp",({x:e,y:n})=>Me({x:e,y:n,state:0,source:"press"}))}function Me({x:t,y:e,state:n,source:l}){l==="press"&&(ct[e][t]=Number(n));const o=dn(t,e,n,l);if(!o)return;const i={x:t,y:e,state:n,grid:ct};Array.isArray(o.handler)?o.handler.forEach(s=>s(i)):o.handler(i)}function dn(t,e,n,l){return ut.find(({matcher:o})=>o({x:t,y:e,state:n,source:l}))}var hn=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",route:ye,start:_n,handle:Me}),at={loop:({x:t,y:e,grid:n})=>{const l=ve[e-1],o=n[e].reduce((i,s,r)=>s?i.concat(r):i,[]);o.length===1?(l.resetLoopPoints(),l.start(t)):o.length===2&&l.loopBetween(o)},replay({x:t,y:e}){const n=ve[e-1];n.resetLoopPoints(),n.start(t)}},mn={stop:({x:t})=>{ie[t].stop()}},ft={record:({x:t,y:e,state:n})=>{ke.forEach(l=>l.record({x:t,y:e,state:n}))},toggle:({x:t})=>{const e=ie.length,n=t-e;ke[n].toggle()}};ye(({y:t,state:e,source:n})=>t>0&&n==="press"&&e,[at.loop,ft.record]);ye(({y:t,state:e,source:n})=>t>0&&n==="pattern"&&e,[at.replay]);ye(({x:t,y:e,state:n})=>e===0&&t<4&&n,mn.stop);ye(({x:t,y:e,state:n})=>e==0&&(t==4||t==5)&&n,ft.toggle);const{subscribe:gn,update:bn}=U([]);function vn(t=[]){t=[...t],bn(e=>Et([...e,...t],n=>n.name))}const kn={subscribe:gn,add:vn},Te=U(120),Be=U(16);function yn({audioContext:t,bpm:e,quantize:n}){let l=new Lt(t),o=[],i=!1,s;function r(){const m=p(e,n);l.start(),s=l.setTimeout(a,m).repeat(m),i=!0}function c(){!i||(s.clear(),s=null,l.stop(),i=!1)}function u(m,w=[],b={}){if(b.in!=null){let F=l.setTimeout(()=>m.apply(null,w),b.in);return b.repeat&&(F=F.repeat(b.repeat)),F}else o.push({fn:m,args:w})}function a(){for(;o.length;){const{fn:m,args:w}=o.shift();m.apply(null,w)}}function p(m,w){return 60/m/w}function v(m){!i||l.timeStretch(t.currentTime,[s],m)}return{start:r,stop:c,schedule:u,set bpm(m){v(e/m),e=m},set quantize(m){v(n/m),n=m}}}const pt=new AudioContext,qe=yn({audioContext:pt,bpm:Ve(Te),quantize:Ve(Be)});qe.start();Te.subscribe(t=>qe.bpm=t);Be.subscribe(t=>qe.quantize=t);new pn({target:document.getElementById("app"),props:{router:hn,files:kn,bpm:Te,quantize:Be,scheduler:qe},context:new Map([["audioContext",pt]])});