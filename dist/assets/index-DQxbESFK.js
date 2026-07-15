(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const No="158",ju=0,vl=1,Ku=2,uh=1,sa=2,Wn=3,pi=0,We=1,vn=2,ci=0,pr=1,xl=2,Ml=3,yl=4,Zu=5,Ui=100,$u=101,Ju=102,Sl=103,wl=104,Qu=200,td=201,ed=202,nd=203,co=204,ho=205,id=206,rd=207,sd=208,ad=209,od=210,ld=211,cd=212,hd=213,ud=214,dd=0,fd=1,pd=2,Ws=3,md=4,gd=5,_d=6,vd=7,dh=0,xd=1,Md=2,hi=0,yd=1,Sd=2,wd=3,Ed=4,Td=5,fh=300,Mr=301,yr=302,uo=303,fo=304,aa=306,po=1e3,Rn=1001,mo=1002,He=1003,El=1004,ya=1005,_n=1006,bd=1007,jr=1008,ui=1009,Ad=1010,Rd=1011,Oo=1012,ph=1013,ii=1014,ri=1015,Kr=1016,mh=1017,gh=1018,Oi=1020,Cd=1021,Cn=1023,Ld=1024,Pd=1025,Fi=1026,Sr=1027,Dd=1028,_h=1029,Ud=1030,vh=1031,xh=1033,Sa=33776,wa=33777,Ea=33778,Ta=33779,Tl=35840,bl=35841,Al=35842,Rl=35843,Id=36196,Cl=37492,Ll=37496,Pl=37808,Dl=37809,Ul=37810,Il=37811,Nl=37812,Ol=37813,Fl=37814,zl=37815,Bl=37816,Gl=37817,kl=37818,Hl=37819,Vl=37820,Wl=37821,ba=36492,Xl=36494,Yl=36495,Nd=36283,ql=36284,jl=36285,Kl=36286,Mh=3e3,zi=3001,Od=3200,Fd=3201,yh=0,zd=1,xn="",De="srgb",jn="srgb-linear",Fo="display-p3",oa="display-p3-linear",Xs="linear",ce="srgb",Ys="rec709",qs="p3",qi=7680,Zl=519,Bd=512,Gd=513,kd=514,Hd=515,Vd=516,Wd=517,Xd=518,Yd=519,$l=35044,Jl="300 es",go=1035,qn=2e3,js=2001;class Pr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Aa=Math.PI/180,Ks=180/Math.PI;function os(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[r&255]+Ie[r>>8&255]+Ie[r>>16&255]+Ie[r>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Ye(r,t,e){return Math.max(t,Math.min(e,r))}function qd(r,t){return(r%t+t)%t}function Ra(r,t,e){return(1-e)*r+e*t}function Ql(r){return(r&r-1)===0&&r!==0}function _o(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Nr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Xe(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,n,i,s,o,a,l,c){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],_=n[8],g=i[0],p=i[3],f=i[6],w=i[1],x=i[4],y=i[7],E=i[2],b=i[5],M=i[8];return s[0]=o*g+a*w+l*E,s[3]=o*p+a*x+l*b,s[6]=o*f+a*y+l*M,s[1]=c*g+h*w+u*E,s[4]=c*p+h*x+u*b,s[7]=c*f+h*y+u*M,s[2]=d*g+m*w+_*E,s[5]=d*p+m*x+_*b,s[8]=d*f+m*y+_*M,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,m=c*s-o*l,_=e*u+n*d+i*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(i*c-h*n)*g,t[2]=(a*n-i*o)*g,t[3]=d*g,t[4]=(h*e-i*l)*g,t[5]=(i*s-a*e)*g,t[6]=m*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ca.makeScale(t,e)),this}rotate(t){return this.premultiply(Ca.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ca.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ca=new Yt;function Sh(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Zs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function jd(){const r=Zs("canvas");return r.style.display="block",r}const tc={};function Wr(r){r in tc||(tc[r]=!0,console.warn(r))}const ec=new Yt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nc=new Yt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ps={[jn]:{transfer:Xs,primaries:Ys,toReference:r=>r,fromReference:r=>r},[De]:{transfer:ce,primaries:Ys,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[oa]:{transfer:Xs,primaries:qs,toReference:r=>r.applyMatrix3(nc),fromReference:r=>r.applyMatrix3(ec)},[Fo]:{transfer:ce,primaries:qs,toReference:r=>r.convertSRGBToLinear().applyMatrix3(nc),fromReference:r=>r.applyMatrix3(ec).convertLinearToSRGB()}},Kd=new Set([jn,oa]),re={enabled:!0,_workingColorSpace:jn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Kd.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=ps[t].toReference,i=ps[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return ps[r].primaries},getTransfer:function(r){return r===xn?Xs:ps[r].transfer}};function mr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function La(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ji;class wh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ji===void 0&&(ji=Zs("canvas")),ji.width=t.width,ji.height=t.height;const n=ji.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ji}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Zs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=mr(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(mr(e[n]/255)*255):e[n]=mr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Zd=0;class Eh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=os(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Pa(i[o].image)):s.push(Pa(i[o]))}else s=Pa(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Pa(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?wh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $d=0;class ln extends Pr{constructor(t=ln.DEFAULT_IMAGE,e=ln.DEFAULT_MAPPING,n=Rn,i=Rn,s=_n,o=jr,a=Cn,l=ui,c=ln.DEFAULT_ANISOTROPY,h=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=os(),this.name="",this.source=new Eh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Wr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===zi?De:xn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==fh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case po:t.x=t.x-Math.floor(t.x);break;case Rn:t.x=t.x<0?0:1;break;case mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case po:t.y=t.y-Math.floor(t.y);break;case Rn:t.y=t.y<0?0:1;break;case mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Wr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===De?zi:Mh}set encoding(t){Wr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===zi?De:xn}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=fh;ln.DEFAULT_ANISOTROPY=1;class Ce{constructor(t=0,e=0,n=0,i=1){Ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],_=l[9],g=l[2],p=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,y=(m+1)/2,E=(f+1)/2,b=(h+d)/4,M=(u+g)/4,P=(_+p)/4;return x>y&&x>E?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=b/n,s=M/n):y>E?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=b/i,s=P/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=M/s,i=P/s),this.set(n,i,s,e),this}let w=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(p-_)/w,this.y=(u-g)/w,this.z=(d-h)/w,this.w=Math.acos((c+m+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jd extends Pr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Wr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===zi?De:xn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ln(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Eh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wi extends Jd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Th extends ln{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=He,this.minFilter=He,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qd extends ln{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=He,this.minFilter=He,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ls{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],m=s[o+1],_=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=m,t[e+2]=_,t[e+3]=g;return}if(u!==g||l!==d||c!==m||h!==_){let p=1-a;const f=l*d+c*m+h*_+u*g,w=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const E=Math.sqrt(x),b=Math.atan2(E,f*w);p=Math.sin(p*b)/E,a=Math.sin(a*b)/E}const y=a*w;if(l=l*p+d*y,c=c*p+m*y,h=h*p+_*y,u=u*p+g*y,p===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],m=s[o+2],_=s[o+3];return t[e]=a*_+h*u+l*m-c*d,t[e+1]=l*_+h*d+c*u-a*m,t[e+2]=c*_+h*m+a*d-l*u,t[e+3]=h*_-a*u-l*d-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),m=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*m*_,this._y=c*m*u-d*h*_,this._z=c*h*_+d*m*u,this._w=c*h*u-d*m*_;break;case"YXZ":this._x=d*h*u+c*m*_,this._y=c*m*u-d*h*_,this._z=c*h*_-d*m*u,this._w=c*h*u+d*m*_;break;case"ZXY":this._x=d*h*u-c*m*_,this._y=c*m*u+d*h*_,this._z=c*h*_+d*m*u,this._w=c*h*u-d*m*_;break;case"ZYX":this._x=d*h*u-c*m*_,this._y=c*m*u+d*h*_,this._z=c*h*_-d*m*u,this._w=c*h*u+d*m*_;break;case"YZX":this._x=d*h*u+c*m*_,this._y=c*m*u+d*h*_,this._z=c*h*_-d*m*u,this._w=c*h*u-d*m*_;break;case"XZY":this._x=d*h*u-c*m*_,this._y=c*m*u-d*h*_,this._z=c*h*_+d*m*u,this._w=c*h*u+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(o-i)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(s-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ic.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ic.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Da.copy(this).projectOnVector(t),this.sub(Da)}reflect(t){return this.sub(Da.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Da=new B,ic=new ls;class cs{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,wn):wn.fromBufferAttribute(s,o),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ms.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ms.copy(n.boundingBox)),ms.applyMatrix4(t.matrixWorld),this.union(ms)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Or),gs.subVectors(this.max,Or),Ki.subVectors(t.a,Or),Zi.subVectors(t.b,Or),$i.subVectors(t.c,Or),Jn.subVectors(Zi,Ki),Qn.subVectors($i,Zi),Si.subVectors(Ki,$i);let e=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-Si.z,Si.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,Si.z,0,-Si.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-Si.y,Si.x,0];return!Ua(e,Ki,Zi,$i,gs)||(e=[1,0,0,0,1,0,0,0,1],!Ua(e,Ki,Zi,$i,gs))?!1:(_s.crossVectors(Jn,Qn),e=[_s.x,_s.y,_s.z],Ua(e,Ki,Zi,$i,gs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Bn=[new B,new B,new B,new B,new B,new B,new B,new B],wn=new B,ms=new cs,Ki=new B,Zi=new B,$i=new B,Jn=new B,Qn=new B,Si=new B,Or=new B,gs=new B,_s=new B,wi=new B;function Ua(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){wi.fromArray(r,s);const a=i.x*Math.abs(wi.x)+i.y*Math.abs(wi.y)+i.z*Math.abs(wi.z),l=t.dot(wi),c=e.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const tf=new cs,Fr=new B,Ia=new B;class la{constructor(t=new B,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):tf.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fr.subVectors(t,this.center);const e=Fr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Fr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ia.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fr.copy(t.center).add(Ia)),this.expandByPoint(Fr.copy(t.center).sub(Ia))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new B,Na=new B,vs=new B,ti=new B,Oa=new B,xs=new B,Fa=new B;class bh{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Na.copy(t).add(e).multiplyScalar(.5),vs.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(Na);const s=t.distanceTo(e)*.5,o=-this.direction.dot(vs),a=ti.dot(this.direction),l=-ti.dot(vs),c=ti.lengthSq(),h=Math.abs(1-o*o);let u,d,m,_;if(h>0)if(u=o*l-a,d=o*a-l,_=s*h,u>=0)if(d>=-_)if(d<=_){const g=1/h;u*=g,d*=g,m=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Na).addScaledVector(vs,d),m}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,i,s){Oa.subVectors(e,t),xs.subVectors(n,t),Fa.crossVectors(Oa,xs);let o=this.direction.dot(Fa),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);const l=a*this.direction.dot(xs.crossVectors(ti,xs));if(l<0)return null;const c=a*this.direction.dot(Oa.cross(ti));if(c<0||l+c>o)return null;const h=-a*ti.dot(Fa);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class we{constructor(t,e,n,i,s,o,a,l,c,h,u,d,m,_,g,p){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,d,m,_,g,p)}set(t,e,n,i,s,o,a,l,c,h,u,d,m,_,g,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=m,f[7]=_,f[11]=g,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ji.setFromMatrixColumn(t,0).length(),s=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,m=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+_*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=_+m*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,m=l*u,_=c*h,g=c*u;e[0]=d+g*a,e[4]=_*a-m,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=m*a-_,e[6]=g+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,m=l*u,_=c*h,g=c*u;e[0]=d-g*a,e[4]=-o*u,e[8]=_+m*a,e[1]=m+_*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,m=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=_*c-m,e[8]=d*c+g,e[1]=l*u,e[5]=g*c+d,e[9]=m*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,m=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=g-d*u,e[8]=_*u+m,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*u+_,e[10]=d-g*u}else if(t.order==="XZY"){const d=o*l,m=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+g,e[5]=o*h,e[9]=m*u-_,e[2]=_*u-m,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ef,t,nf)}lookAt(t,e,n){const i=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),ei.crossVectors(n,en),ei.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ei.crossVectors(n,en)),ei.normalize(),Ms.crossVectors(en,ei),i[0]=ei.x,i[4]=Ms.x,i[8]=en.x,i[1]=ei.y,i[5]=Ms.y,i[9]=en.y,i[2]=ei.z,i[6]=Ms.z,i[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],_=n[2],g=n[6],p=n[10],f=n[14],w=n[3],x=n[7],y=n[11],E=n[15],b=i[0],M=i[4],P=i[8],v=i[12],T=i[1],N=i[5],F=i[9],V=i[13],C=i[2],I=i[6],G=i[10],z=i[14],Q=i[3],$=i[7],Z=i[11],L=i[15];return s[0]=o*b+a*T+l*C+c*Q,s[4]=o*M+a*N+l*I+c*$,s[8]=o*P+a*F+l*G+c*Z,s[12]=o*v+a*V+l*z+c*L,s[1]=h*b+u*T+d*C+m*Q,s[5]=h*M+u*N+d*I+m*$,s[9]=h*P+u*F+d*G+m*Z,s[13]=h*v+u*V+d*z+m*L,s[2]=_*b+g*T+p*C+f*Q,s[6]=_*M+g*N+p*I+f*$,s[10]=_*P+g*F+p*G+f*Z,s[14]=_*v+g*V+p*z+f*L,s[3]=w*b+x*T+y*C+E*Q,s[7]=w*M+x*N+y*I+E*$,s[11]=w*P+x*F+y*G+E*Z,s[15]=w*v+x*V+y*z+E*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],m=t[14],_=t[3],g=t[7],p=t[11],f=t[15];return _*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*m-n*l*m)+g*(+e*l*m-e*c*d+s*o*d-i*o*m+i*c*h-s*l*h)+p*(+e*c*u-e*a*m-s*o*u+n*o*m+s*a*h-n*c*h)+f*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],m=t[11],_=t[12],g=t[13],p=t[14],f=t[15],w=u*p*c-g*d*c+g*l*m-a*p*m-u*l*f+a*d*f,x=_*d*c-h*p*c-_*l*m+o*p*m+h*l*f-o*d*f,y=h*g*c-_*u*c+_*a*m-o*g*m-h*a*f+o*u*f,E=_*u*l-h*g*l-_*a*d+o*g*d+h*a*p-o*u*p,b=e*w+n*x+i*y+s*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/b;return t[0]=w*M,t[1]=(g*d*s-u*p*s-g*i*m+n*p*m+u*i*f-n*d*f)*M,t[2]=(a*p*s-g*l*s+g*i*c-n*p*c-a*i*f+n*l*f)*M,t[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*m-n*l*m)*M,t[4]=x*M,t[5]=(h*p*s-_*d*s+_*i*m-e*p*m-h*i*f+e*d*f)*M,t[6]=(_*l*s-o*p*s-_*i*c+e*p*c+o*i*f-e*l*f)*M,t[7]=(o*d*s-h*l*s+h*i*c-e*d*c-o*i*m+e*l*m)*M,t[8]=y*M,t[9]=(_*u*s-h*g*s-_*n*m+e*g*m+h*n*f-e*u*f)*M,t[10]=(o*g*s-_*a*s+_*n*c-e*g*c-o*n*f+e*a*f)*M,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*m-e*a*m)*M,t[12]=E*M,t[13]=(h*g*i-_*u*i+_*n*d-e*g*d-h*n*p+e*u*p)*M,t[14]=(_*a*i-o*g*i-_*n*l+e*g*l+o*n*p-e*a*p)*M,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*M,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,m=s*h,_=s*u,g=o*h,p=o*u,f=a*u,w=l*c,x=l*h,y=l*u,E=n.x,b=n.y,M=n.z;return i[0]=(1-(g+f))*E,i[1]=(m+y)*E,i[2]=(_-x)*E,i[3]=0,i[4]=(m-y)*b,i[5]=(1-(d+f))*b,i[6]=(p+w)*b,i[7]=0,i[8]=(_+x)*M,i[9]=(p-w)*M,i[10]=(1-(d+g))*M,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ji.set(i[0],i[1],i[2]).length();const o=Ji.set(i[4],i[5],i[6]).length(),a=Ji.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],En.copy(this);const c=1/s,h=1/o,u=1/a;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,e.setFromRotationMatrix(En),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=qn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let m,_;if(a===qn)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===js)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=qn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*c,m=(n+i)*h;let _,g;if(a===qn)_=(o+s)*u,g=-2*u;else if(a===js)_=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new B,En=new we,ef=new B(0,0,0),nf=new B(1,1,1),ei=new B,Ms=new B,en=new B,rc=new we,sc=new ls;class ca{constructor(t=0,e=0,n=0,i=ca.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sc.setFromEuler(this),this.setFromQuaternion(sc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ca.DEFAULT_ORDER="XYZ";class Ah{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let rf=0;const ac=new B,Qi=new ls,kn=new we,ys=new B,zr=new B,sf=new B,af=new ls,oc=new B(1,0,0),lc=new B(0,1,0),cc=new B(0,0,1),of={type:"added"},lf={type:"removed"};class Ee extends Pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new B,e=new ca,n=new ls,i=new B(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new we},normalMatrix:{value:new Yt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Ah,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(oc,t)}rotateY(t){return this.rotateOnAxis(lc,t)}rotateZ(t){return this.rotateOnAxis(cc,t)}translateOnAxis(t,e){return ac.copy(t).applyQuaternion(this.quaternion),this.position.add(ac.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oc,t)}translateY(t){return this.translateOnAxis(lc,t)}translateZ(t){return this.translateOnAxis(cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ys.copy(t):ys.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(zr,ys,this.up):kn.lookAt(ys,zr,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),Qi.setFromRotationMatrix(kn),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(of)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e){let n=[];this[t]===e&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(t,e);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,t,sf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,af,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),m=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ee.DEFAULT_UP=new B(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new B,Hn=new B,za=new B,Vn=new B,tr=new B,er=new B,hc=new B,Ba=new B,Ga=new B,ka=new B;let Ss=!1;class bn{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Tn.subVectors(t,e),i.cross(Tn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Tn.subVectors(i,e),Hn.subVectors(n,e),za.subVectors(t,e);const o=Tn.dot(Tn),a=Tn.dot(Hn),l=Tn.dot(za),c=Hn.dot(Hn),h=Hn.dot(za),u=o*c-a*a;if(u===0)return s.set(-2,-1,-1);const d=1/u,m=(c*l-a*h)*d,_=(o*h-a*l)*d;return s.set(1-m-_,_,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Vn),Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getUV(t,e,n,i,s,o,a,l){return Ss===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ss=!0),this.getInterpolation(t,e,n,i,s,o,a,l)}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,Vn),l.setScalar(0),l.addScaledVector(s,Vn.x),l.addScaledVector(o,Vn.y),l.addScaledVector(a,Vn.z),l}static isFrontFacing(t,e,n,i){return Tn.subVectors(n,e),Hn.subVectors(t,e),Tn.cross(Hn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),Tn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Ss===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ss=!0),bn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}getInterpolation(t,e,n,i,s){return bn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;tr.subVectors(i,n),er.subVectors(s,n),Ba.subVectors(t,n);const l=tr.dot(Ba),c=er.dot(Ba);if(l<=0&&c<=0)return e.copy(n);Ga.subVectors(t,i);const h=tr.dot(Ga),u=er.dot(Ga);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(tr,o);ka.subVectors(t,s);const m=tr.dot(ka),_=er.dot(ka);if(_>=0&&m<=_)return e.copy(s);const g=m*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(n).addScaledVector(er,a);const p=h*_-m*u;if(p<=0&&u-h>=0&&m-_>=0)return hc.subVectors(s,i),a=(u-h)/(u-h+(m-_)),e.copy(i).addScaledVector(hc,a);const f=1/(p+g+d);return o=g*f,a=d*f,e.copy(n).addScaledVector(tr,o).addScaledVector(er,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},ws={h:0,s:0,l:0};function Ha(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=re.workingColorSpace){if(t=qd(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Ha(o,s,t+1/3),this.g=Ha(o,s,t),this.b=Ha(o,s,t-1/3)}return re.toWorkingColorSpace(this,i),this}setStyle(t,e=De){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=Rh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=mr(t.r),this.g=mr(t.g),this.b=mr(t.b),this}copyLinearToSRGB(t){return this.r=La(t.r),this.g=La(t.g),this.b=La(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return re.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Ye(Ne.r*255,0,255))*65536+Math.round(Ye(Ne.g*255,0,255))*256+Math.round(Ye(Ne.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,i=Ne.g,s=Ne.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=De){re.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,i=Ne.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(ws);const n=Ra(ni.h,ws.h,e),i=Ra(ni.s,ws.s,e),s=Ra(ni.l,ws.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new jt;jt.NAMES=Rh;let cf=0;class Dr extends Pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=os(),this.name="",this.type="Material",this.blending=pr,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=co,this.blendDst=ho,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pr&&(n.blending=this.blending),this.side!==pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==co&&(n.blendSrc=this.blendSrc),this.blendDst!==ho&&(n.blendDst=this.blendDst),this.blendEquation!==Ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ln extends Dr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new B,Es=new Jt;class Sn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$l,this.updateRange={offset:0,count:-1},this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Es.fromBufferAttribute(this,e),Es.applyMatrix3(t),this.setXY(e,Es.x,Es.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Nr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Nr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Nr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Nr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Nr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$l&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}}class Ch extends Sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Lh extends Sn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Fe extends Sn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let hf=0;const pn=new we,Va=new Ee,nr=new B,nn=new cs,Br=new cs,Re=new B;class hn extends Pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=os(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sh(t)?Lh:Ch)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Yt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,n){return pn.makeTranslation(t,e,n),this.applyMatrix4(pn),this}scale(t,e,n){return pn.makeScale(t,e,n),this.applyMatrix4(pn),this}lookAt(t){return Va.lookAt(t),Va.updateMatrix(),this.applyMatrix4(Va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Fe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new la);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Br.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(nn.min,Br.min),nn.expandByPoint(Re),Re.addVectors(nn.max,Br.max),nn.expandByPoint(Re)):(nn.expandByPoint(Br.min),nn.expandByPoint(Br.max))}nn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Re.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Re.fromBufferAttribute(a,c),l&&(nr.fromBufferAttribute(t,c),Re.add(nr)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<a;T++)c[T]=new B,h[T]=new B;const u=new B,d=new B,m=new B,_=new Jt,g=new Jt,p=new Jt,f=new B,w=new B;function x(T,N,F){u.fromArray(i,T*3),d.fromArray(i,N*3),m.fromArray(i,F*3),_.fromArray(o,T*2),g.fromArray(o,N*2),p.fromArray(o,F*2),d.sub(u),m.sub(u),g.sub(_),p.sub(_);const V=1/(g.x*p.y-p.x*g.y);isFinite(V)&&(f.copy(d).multiplyScalar(p.y).addScaledVector(m,-g.y).multiplyScalar(V),w.copy(m).multiplyScalar(g.x).addScaledVector(d,-p.x).multiplyScalar(V),c[T].add(f),c[N].add(f),c[F].add(f),h[T].add(w),h[N].add(w),h[F].add(w))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let T=0,N=y.length;T<N;++T){const F=y[T],V=F.start,C=F.count;for(let I=V,G=V+C;I<G;I+=3)x(n[I+0],n[I+1],n[I+2])}const E=new B,b=new B,M=new B,P=new B;function v(T){M.fromArray(s,T*3),P.copy(M);const N=c[T];E.copy(N),E.sub(M.multiplyScalar(M.dot(N))).normalize(),b.crossVectors(P,N);const V=b.dot(h[T])<0?-1:1;l[T*4]=E.x,l[T*4+1]=E.y,l[T*4+2]=E.z,l[T*4+3]=V}for(let T=0,N=y.length;T<N;++T){const F=y[T],V=F.start,C=F.count;for(let I=V,G=V+C;I<G;I+=3)v(n[I+0]),v(n[I+1]),v(n[I+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Sn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new B,s=new B,o=new B,a=new B,l=new B,c=new B,h=new B,u=new B;if(t)for(let d=0,m=t.count;d<m;d+=3){const _=t.getX(d+0),g=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,p),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,m=e.count;d<m;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let m=0,_=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?m=l[g]*a.data.stride+a.offset:m=l[g]*h;for(let f=0;f<h;f++)d[_++]=c[m++]}return new Sn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new hn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=t(d,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uc=new we,Ei=new bh,Ts=new la,dc=new B,ir=new B,rr=new B,sr=new B,Wa=new B,bs=new B,As=new Jt,Rs=new Jt,Cs=new Jt,fc=new B,pc=new B,mc=new B,Ls=new B,Ps=new B;class q extends Ee{constructor(t=new hn,e=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){bs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Wa.fromBufferAttribute(u,t),o?bs.addScaledVector(Wa,h):bs.addScaledVector(Wa.sub(e),h))}e.add(bs)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(s),Ei.copy(t.ray).recast(t.near),!(Ts.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Ts,dc)===null||Ei.origin.distanceToSquared(dc)>(t.far-t.near)**2))&&(uc.copy(s).invert(),Ei.copy(t.ray).applyMatrix4(uc),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const p=d[_],f=o[p.materialIndex],w=Math.max(p.start,m.start),x=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let y=w,E=x;y<E;y+=3){const b=a.getX(y),M=a.getX(y+1),P=a.getX(y+2);i=Ds(this,f,t,n,c,h,u,b,M,P),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const _=Math.max(0,m.start),g=Math.min(a.count,m.start+m.count);for(let p=_,f=g;p<f;p+=3){const w=a.getX(p),x=a.getX(p+1),y=a.getX(p+2);i=Ds(this,o,t,n,c,h,u,w,x,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const p=d[_],f=o[p.materialIndex],w=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let y=w,E=x;y<E;y+=3){const b=y,M=y+1,P=y+2;i=Ds(this,f,t,n,c,h,u,b,M,P),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const _=Math.max(0,m.start),g=Math.min(l.count,m.start+m.count);for(let p=_,f=g;p<f;p+=3){const w=p,x=p+1,y=p+2;i=Ds(this,o,t,n,c,h,u,w,x,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function uf(r,t,e,n,i,s,o,a){let l;if(t.side===We?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===pi,a),l===null)return null;Ps.copy(a),Ps.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ps);return c<e.near||c>e.far?null:{distance:c,point:Ps.clone(),object:r}}function Ds(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,ir),r.getVertexPosition(l,rr),r.getVertexPosition(c,sr);const h=uf(r,t,e,n,ir,rr,sr,Ls);if(h){i&&(As.fromBufferAttribute(i,a),Rs.fromBufferAttribute(i,l),Cs.fromBufferAttribute(i,c),h.uv=bn.getInterpolation(Ls,ir,rr,sr,As,Rs,Cs,new Jt)),s&&(As.fromBufferAttribute(s,a),Rs.fromBufferAttribute(s,l),Cs.fromBufferAttribute(s,c),h.uv1=bn.getInterpolation(Ls,ir,rr,sr,As,Rs,Cs,new Jt),h.uv2=h.uv1),o&&(fc.fromBufferAttribute(o,a),pc.fromBufferAttribute(o,l),mc.fromBufferAttribute(o,c),h.normal=bn.getInterpolation(Ls,ir,rr,sr,fc,pc,mc,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new B,materialIndex:0};bn.getNormal(ir,rr,sr,u.normal),h.face=u}return h}class Bt extends hn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,m=0;_("z","y","x",-1,-1,n,e,t,o,s,0),_("z","y","x",1,-1,n,e,-t,o,s,1),_("x","z","y",1,1,t,n,e,i,o,2),_("x","z","y",1,-1,t,n,-e,i,o,3),_("x","y","z",1,-1,t,e,n,i,s,4),_("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(h,3)),this.setAttribute("uv",new Fe(u,2));function _(g,p,f,w,x,y,E,b,M,P,v){const T=y/M,N=E/P,F=y/2,V=E/2,C=b/2,I=M+1,G=P+1;let z=0,Q=0;const $=new B;for(let Z=0;Z<G;Z++){const L=Z*N-V;for(let D=0;D<I;D++){const j=D*T-F;$[g]=j*w,$[p]=L*x,$[f]=C,c.push($.x,$.y,$.z),$[g]=0,$[p]=0,$[f]=b>0?1:-1,h.push($.x,$.y,$.z),u.push(D/M),u.push(1-Z/P),z+=1}}for(let Z=0;Z<P;Z++)for(let L=0;L<M;L++){const D=d+L+I*Z,j=d+L+I*(Z+1),tt=d+(L+1)+I*(Z+1),nt=d+(L+1)+I*Z;l.push(D,j,nt),l.push(j,tt,nt),Q+=6}a.addGroup(m,Q,v),m+=Q,d+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function wr(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ke(r){const t={};for(let e=0;e<r.length;e++){const n=wr(r[e]);for(const i in n)t[i]=n[i]}return t}function df(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Ph(r){return r.getRenderTarget()===null?r.outputColorSpace:re.workingColorSpace}const ff={clone:wr,merge:ke};var pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xi extends Dr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wr(t.uniforms),this.uniformsGroups=df(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Dh extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ve extends Dh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Aa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(Aa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Aa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ar=-90,or=1;class gf extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ve(ar,or,t,e);i.layers=this.layers,this.add(i);const s=new Ve(ar,or,t,e);s.layers=this.layers,this.add(s);const o=new Ve(ar,or,t,e);o.layers=this.layers,this.add(o);const a=new Ve(ar,or,t,e);a.layers=this.layers,this.add(a);const l=new Ve(ar,or,t,e);l.layers=this.layers,this.add(l);const c=new Ve(ar,or,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===qn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===js)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Uh extends ln{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Mr,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _f extends Wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Wr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===zi?De:xn),this.texture=new Uh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Bt(5,5,5),s=new Xi({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:ci});s.uniforms.tEquirect.value=e;const o=new q(i,s),a=e.minFilter;return e.minFilter===jr&&(e.minFilter=_n),new gf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const Xa=new B,vf=new B,xf=new Yt;class Ri{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Xa.subVectors(n,e).cross(vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||xf.getNormalMatrix(t),i=this.coplanarPoint(Xa).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new la,Us=new B;class zo{constructor(t=new Ri,e=new Ri,n=new Ri,i=new Ri,s=new Ri,o=new Ri){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=qn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],m=i[8],_=i[9],g=i[10],p=i[11],f=i[12],w=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,p-m,y-f).normalize(),n[1].setComponents(l+s,d+c,p+m,y+f).normalize(),n[2].setComponents(l+o,d+h,p+_,y+w).normalize(),n[3].setComponents(l-o,d-h,p-_,y-w).normalize(),n[4].setComponents(l-a,d-u,p-g,y-x).normalize(),e===qn)n[5].setComponents(l+a,d+u,p+g,y+x).normalize();else if(e===js)n[5].setComponents(a,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Us.x=i.normal.x>0?t.max.x:t.min.x,Us.y=i.normal.y>0?t.max.y:t.min.y,Us.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ih(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Mf(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,m=r.createBuffer();r.bindBuffer(h,m),r.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=r.SHORT;else if(u instanceof Uint32Array)_=r.UNSIGNED_INT;else if(u instanceof Int32Array)_=r.INT;else if(u instanceof Int8Array)_=r.BYTE;else if(u instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const d=h.array,m=h.updateRange;r.bindBuffer(u,c),m.count===-1?r.bufferSubData(u,0,d):(e?r.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):r.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:o,remove:a,update:l}}class Kn extends hn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,m=[],_=[],g=[],p=[];for(let f=0;f<h;f++){const w=f*d-o;for(let x=0;x<c;x++){const y=x*u-s;_.push(y,-w,0),g.push(0,0,1),p.push(x/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<a;w++){const x=w+c*f,y=w+c*(f+1),E=w+1+c*(f+1),b=w+1+c*f;m.push(x,y,b),m.push(y,E,b)}this.setIndex(m),this.setAttribute("position",new Fe(_,3)),this.setAttribute("normal",new Fe(g,3)),this.setAttribute("uv",new Fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.width,t.height,t.widthSegments,t.heightSegments)}}var yf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ef=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,bf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Af=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Df=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Uf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Hf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Wf=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Xf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,$f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,np=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ap=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,op=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,up=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_p=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,vp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ep=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Tp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Op=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,em=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,im=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,am=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,om=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,um=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ym=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,bm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Am=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dm=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Um=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Im=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Om=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,km=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jm=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:yf,alphahash_pars_fragment:Sf,alphamap_fragment:wf,alphamap_pars_fragment:Ef,alphatest_fragment:Tf,alphatest_pars_fragment:bf,aomap_fragment:Af,aomap_pars_fragment:Rf,begin_vertex:Cf,beginnormal_vertex:Lf,bsdfs:Pf,iridescence_fragment:Df,bumpmap_pars_fragment:Uf,clipping_planes_fragment:If,clipping_planes_pars_fragment:Nf,clipping_planes_pars_vertex:Of,clipping_planes_vertex:Ff,color_fragment:zf,color_pars_fragment:Bf,color_pars_vertex:Gf,color_vertex:kf,common:Hf,cube_uv_reflection_fragment:Vf,defaultnormal_vertex:Wf,displacementmap_pars_vertex:Xf,displacementmap_vertex:Yf,emissivemap_fragment:qf,emissivemap_pars_fragment:jf,colorspace_fragment:Kf,colorspace_pars_fragment:Zf,envmap_fragment:$f,envmap_common_pars_fragment:Jf,envmap_pars_fragment:Qf,envmap_pars_vertex:tp,envmap_physical_pars_fragment:dp,envmap_vertex:ep,fog_vertex:np,fog_pars_vertex:ip,fog_fragment:rp,fog_pars_fragment:sp,gradientmap_pars_fragment:ap,lightmap_fragment:op,lightmap_pars_fragment:lp,lights_lambert_fragment:cp,lights_lambert_pars_fragment:hp,lights_pars_begin:up,lights_toon_fragment:fp,lights_toon_pars_fragment:pp,lights_phong_fragment:mp,lights_phong_pars_fragment:gp,lights_physical_fragment:_p,lights_physical_pars_fragment:vp,lights_fragment_begin:xp,lights_fragment_maps:Mp,lights_fragment_end:yp,logdepthbuf_fragment:Sp,logdepthbuf_pars_fragment:wp,logdepthbuf_pars_vertex:Ep,logdepthbuf_vertex:Tp,map_fragment:bp,map_pars_fragment:Ap,map_particle_fragment:Rp,map_particle_pars_fragment:Cp,metalnessmap_fragment:Lp,metalnessmap_pars_fragment:Pp,morphcolor_vertex:Dp,morphnormal_vertex:Up,morphtarget_pars_vertex:Ip,morphtarget_vertex:Np,normal_fragment_begin:Op,normal_fragment_maps:Fp,normal_pars_fragment:zp,normal_pars_vertex:Bp,normal_vertex:Gp,normalmap_pars_fragment:kp,clearcoat_normal_fragment_begin:Hp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:Wp,iridescence_pars_fragment:Xp,opaque_fragment:Yp,packing:qp,premultiplied_alpha_fragment:jp,project_vertex:Kp,dithering_fragment:Zp,dithering_pars_fragment:$p,roughnessmap_fragment:Jp,roughnessmap_pars_fragment:Qp,shadowmap_pars_fragment:tm,shadowmap_pars_vertex:em,shadowmap_vertex:nm,shadowmask_pars_fragment:im,skinbase_vertex:rm,skinning_pars_vertex:sm,skinning_vertex:am,skinnormal_vertex:om,specularmap_fragment:lm,specularmap_pars_fragment:cm,tonemapping_fragment:hm,tonemapping_pars_fragment:um,transmission_fragment:dm,transmission_pars_fragment:fm,uv_pars_fragment:pm,uv_pars_vertex:mm,uv_vertex:gm,worldpos_vertex:_m,background_vert:vm,background_frag:xm,backgroundCube_vert:Mm,backgroundCube_frag:ym,cube_vert:Sm,cube_frag:wm,depth_vert:Em,depth_frag:Tm,distanceRGBA_vert:bm,distanceRGBA_frag:Am,equirect_vert:Rm,equirect_frag:Cm,linedashed_vert:Lm,linedashed_frag:Pm,meshbasic_vert:Dm,meshbasic_frag:Um,meshlambert_vert:Im,meshlambert_frag:Nm,meshmatcap_vert:Om,meshmatcap_frag:Fm,meshnormal_vert:zm,meshnormal_frag:Bm,meshphong_vert:Gm,meshphong_frag:km,meshphysical_vert:Hm,meshphysical_frag:Vm,meshtoon_vert:Wm,meshtoon_frag:Xm,points_vert:Ym,points_frag:qm,shadow_vert:jm,shadow_frag:Km,sprite_vert:Zm,sprite_frag:$m},ht={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Un={basic:{uniforms:ke([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:ke([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new jt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:ke([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:ke([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:ke([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new jt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:ke([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:ke([ht.points,ht.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:ke([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:ke([ht.common,ht.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:ke([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:ke([ht.sprite,ht.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:ke([ht.common,ht.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:ke([ht.lights,ht.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Un.physical={uniforms:ke([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Is={r:0,b:0,g:0};function Jm(r,t,e,n,i,s,o){const a=new jt(0);let l=s===!0?0:1,c,h,u=null,d=0,m=null;function _(p,f){let w=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?e:t).get(x)),x===null?g(a,l):x&&x.isColor&&(g(x,1),w=!0);const y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===aa)?(h===void 0&&(h=new q(new Bt(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:wr(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,b,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=re.getTransfer(x.colorSpace)!==ce,(u!==x||d!==x.version||m!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,m=r.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new q(new Kn(2,2),new Xi({name:"BackgroundMaterial",uniforms:wr(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=re.getTransfer(x.colorSpace)!==ce,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||m!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,m=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function g(p,f){p.getRGB(Is,Ph(r)),n.buffers.color.setClear(Is.r,Is.g,Is.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(p,f=1){a.set(p),l=f,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,g(a,l)},render:_}}function Qm(r,t,e,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,h=!1;function u(C,I,G,z,Q){let $=!1;if(o){const Z=g(z,G,I);c!==Z&&(c=Z,m(c.object)),$=f(C,z,G,Q),$&&w(C,z,G,Q)}else{const Z=I.wireframe===!0;(c.geometry!==z.id||c.program!==G.id||c.wireframe!==Z)&&(c.geometry=z.id,c.program=G.id,c.wireframe=Z,$=!0)}Q!==null&&e.update(Q,r.ELEMENT_ARRAY_BUFFER),($||h)&&(h=!1,P(C,I,G,z),Q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(C){return n.isWebGL2?r.bindVertexArray(C):s.bindVertexArrayOES(C)}function _(C){return n.isWebGL2?r.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function g(C,I,G){const z=G.wireframe===!0;let Q=a[C.id];Q===void 0&&(Q={},a[C.id]=Q);let $=Q[I.id];$===void 0&&($={},Q[I.id]=$);let Z=$[z];return Z===void 0&&(Z=p(d()),$[z]=Z),Z}function p(C){const I=[],G=[],z=[];for(let Q=0;Q<i;Q++)I[Q]=0,G[Q]=0,z[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:z,object:C,attributes:{},index:null}}function f(C,I,G,z){const Q=c.attributes,$=I.attributes;let Z=0;const L=G.getAttributes();for(const D in L)if(L[D].location>=0){const tt=Q[D];let nt=$[D];if(nt===void 0&&(D==="instanceMatrix"&&C.instanceMatrix&&(nt=C.instanceMatrix),D==="instanceColor"&&C.instanceColor&&(nt=C.instanceColor)),tt===void 0||tt.attribute!==nt||nt&&tt.data!==nt.data)return!0;Z++}return c.attributesNum!==Z||c.index!==z}function w(C,I,G,z){const Q={},$=I.attributes;let Z=0;const L=G.getAttributes();for(const D in L)if(L[D].location>=0){let tt=$[D];tt===void 0&&(D==="instanceMatrix"&&C.instanceMatrix&&(tt=C.instanceMatrix),D==="instanceColor"&&C.instanceColor&&(tt=C.instanceColor));const nt={};nt.attribute=tt,tt&&tt.data&&(nt.data=tt.data),Q[D]=nt,Z++}c.attributes=Q,c.attributesNum=Z,c.index=z}function x(){const C=c.newAttributes;for(let I=0,G=C.length;I<G;I++)C[I]=0}function y(C){E(C,0)}function E(C,I){const G=c.newAttributes,z=c.enabledAttributes,Q=c.attributeDivisors;G[C]=1,z[C]===0&&(r.enableVertexAttribArray(C),z[C]=1),Q[C]!==I&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,I),Q[C]=I)}function b(){const C=c.newAttributes,I=c.enabledAttributes;for(let G=0,z=I.length;G<z;G++)I[G]!==C[G]&&(r.disableVertexAttribArray(G),I[G]=0)}function M(C,I,G,z,Q,$,Z){Z===!0?r.vertexAttribIPointer(C,I,G,Q,$):r.vertexAttribPointer(C,I,G,z,Q,$)}function P(C,I,G,z){if(n.isWebGL2===!1&&(C.isInstancedMesh||z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();const Q=z.attributes,$=G.getAttributes(),Z=I.defaultAttributeValues;for(const L in $){const D=$[L];if(D.location>=0){let j=Q[L];if(j===void 0&&(L==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),L==="instanceColor"&&C.instanceColor&&(j=C.instanceColor)),j!==void 0){const tt=j.normalized,nt=j.itemSize,mt=e.get(j);if(mt===void 0)continue;const Tt=mt.buffer,yt=mt.type,vt=mt.bytesPerElement,It=n.isWebGL2===!0&&(yt===r.INT||yt===r.UNSIGNED_INT||j.gpuType===ph);if(j.isInterleavedBufferAttribute){const Gt=j.data,W=Gt.stride,Pe=j.offset;if(Gt.isInstancedInterleavedBuffer){for(let wt=0;wt<D.locationSize;wt++)E(D.location+wt,Gt.meshPerAttribute);C.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Gt.meshPerAttribute*Gt.count)}else for(let wt=0;wt<D.locationSize;wt++)y(D.location+wt);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let wt=0;wt<D.locationSize;wt++)M(D.location+wt,nt/D.locationSize,yt,tt,W*vt,(Pe+nt/D.locationSize*wt)*vt,It)}else{if(j.isInstancedBufferAttribute){for(let Gt=0;Gt<D.locationSize;Gt++)E(D.location+Gt,j.meshPerAttribute);C.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Gt=0;Gt<D.locationSize;Gt++)y(D.location+Gt);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let Gt=0;Gt<D.locationSize;Gt++)M(D.location+Gt,nt/D.locationSize,yt,tt,nt*vt,nt/D.locationSize*Gt*vt,It)}}else if(Z!==void 0){const tt=Z[L];if(tt!==void 0)switch(tt.length){case 2:r.vertexAttrib2fv(D.location,tt);break;case 3:r.vertexAttrib3fv(D.location,tt);break;case 4:r.vertexAttrib4fv(D.location,tt);break;default:r.vertexAttrib1fv(D.location,tt)}}}}b()}function v(){F();for(const C in a){const I=a[C];for(const G in I){const z=I[G];for(const Q in z)_(z[Q].object),delete z[Q];delete I[G]}delete a[C]}}function T(C){if(a[C.id]===void 0)return;const I=a[C.id];for(const G in I){const z=I[G];for(const Q in z)_(z[Q].object),delete z[Q];delete I[G]}delete a[C.id]}function N(C){for(const I in a){const G=a[I];if(G[C.id]===void 0)continue;const z=G[C.id];for(const Q in z)_(z[Q].object),delete z[Q];delete G[C.id]}}function F(){V(),h=!0,c!==l&&(c=l,m(c.object))}function V(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:F,resetDefaultState:V,dispose:v,releaseStatesOfGeometry:T,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:y,disableUnusedAttributes:b}}function t0(r,t,e,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,h){r.drawArrays(s,c,h),e.update(h,s,1)}function l(c,h,u){if(u===0)return;let d,m;if(i)d=r,m="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,c,h,u),e.update(h,s,u)}this.setMode=o,this.render=a,this.renderInstances=l}function e0(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),f=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,y=o||t.has("OES_texture_float"),E=x&&y,b=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:f,maxFragmentUniforms:w,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:E,maxSamples:b}}function n0(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Ri,a=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,m){const _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,f=r.get(u);if(!i||_===null||_.length===0||s&&!p)s?h(null):c();else{const w=s?0:n,x=w*4;let y=f.clippingState||null;l.value=y,y=h(_,d,x,m);for(let E=0;E!==x;++E)y[E]=e[E];f.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,m,_){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const f=m+g*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<f)&&(p=new Float32Array(f));for(let x=0,y=m;x!==g;++x,y+=4)o.copy(u[x]).applyMatrix4(w,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function i0(r){let t=new WeakMap;function e(o,a){return a===uo?o.mapping=Mr:a===fo&&(o.mapping=yr),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===uo||a===fo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new _f(l.height/2);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Nh extends Dh{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ur=4,gc=[.125,.215,.35,.446,.526,.582],Ii=20,Ya=new Nh,_c=new jt;let qa=null,ja=0,Ka=0;const Ci=(1+Math.sqrt(5))/2,lr=1/Ci,vc=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Ci,lr),new B(0,Ci,-lr),new B(lr,0,Ci),new B(-lr,0,Ci),new B(Ci,lr,0),new B(-Ci,lr,0)];class xc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){qa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qa,ja,Ka),t.scissorTest=!1,Ns(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Mr||t.mapping===yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qa=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Kr,format:Cn,colorSpace:jn,depthBuffer:!1},i=Mc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mc(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=r0(s)),this._blurMaterial=s0(s,t,e)}return i}_compileMaterial(t){const e=new q(this._lodPlanes[0],t);this._renderer.compile(e,Ya)}_sceneToCubeUV(t,e,n,i){const a=new Ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(_c),h.toneMapping=hi,h.autoClear=!1;const m=new Ln({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),_=new q(new Bt,m);let g=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,g=!0):(m.color.copy(_c),g=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):w===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const x=this._cubeSize;Ns(i,w*x,f>2?x:0,x,x),h.setRenderTarget(i),g&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Mr||t.mapping===yr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new q(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Ns(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ya)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=vc[(i-1)%vc.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new q(this._lodPlanes[i],c),d=c.uniforms,m=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Ii-1),g=s/_,p=isFinite(s)?1+Math.floor(h*g):Ii;p>Ii&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ii}`);const f=[];let w=0;for(let M=0;M<Ii;++M){const P=M/g,v=Math.exp(-P*P/2);f.push(v),M===0?w+=v:M<p&&(w+=2*v)}for(let M=0;M<f.length;M++)f[M]=f[M]/w;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const y=this._sizeLods[i],E=3*y*(i>x-ur?i-x+ur:0),b=4*(this._cubeSize-y);Ns(e,E,b,3*y,2*y),l.setRenderTarget(e),l.render(u,Ya)}}function r0(r){const t=[],e=[],n=[];let i=r;const s=r-ur+1+gc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-ur?l=gc[o-r+ur-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,_=6,g=3,p=2,f=1,w=new Float32Array(g*_*m),x=new Float32Array(p*_*m),y=new Float32Array(f*_*m);for(let b=0;b<m;b++){const M=b%3*2/3-1,P=b>2?0:-1,v=[M,P,0,M+2/3,P,0,M+2/3,P+1,0,M,P,0,M+2/3,P+1,0,M,P+1,0];w.set(v,g*_*b),x.set(d,p*_*b);const T=[b,b,b,b,b,b];y.set(T,f*_*b)}const E=new hn;E.setAttribute("position",new Sn(w,g)),E.setAttribute("uv",new Sn(x,p)),E.setAttribute("faceIndex",new Sn(y,f)),t.push(E),i>ur&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Mc(r,t,e){const n=new Wi(r,t,e);return n.texture.mapping=aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ns(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function s0(r,t,e){const n=new Float32Array(Ii),i=new B(0,1,0);return new Xi({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function yc(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Sc(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Bo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function a0(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===uo||l===fo,h=l===Mr||l===yr;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new xc(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new xc(r));const d=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function o0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function l0(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,f=g.length;p<f;p++)t.remove(g[p])}d.removeEventListener("dispose",o),delete i[d.id];const m=s.get(d);m&&(t.remove(m),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const _ in d)t.update(d[_],r.ARRAY_BUFFER);const m=u.morphAttributes;for(const _ in m){const g=m[_];for(let p=0,f=g.length;p<f;p++)t.update(g[p],r.ARRAY_BUFFER)}}function c(u){const d=[],m=u.index,_=u.attributes.position;let g=0;if(m!==null){const w=m.array;g=m.version;for(let x=0,y=w.length;x<y;x+=3){const E=w[x+0],b=w[x+1],M=w[x+2];d.push(E,b,b,M,M,E)}}else if(_!==void 0){const w=_.array;g=_.version;for(let x=0,y=w.length/3-1;x<y;x+=3){const E=x+0,b=x+1,M=x+2;d.push(E,b,b,M,M,E)}}else return;const p=new(Sh(d)?Lh:Ch)(d,1);p.version=g;const f=s.get(u);f&&t.remove(f),s.set(u,p)}function h(u){const d=s.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function c0(r,t,e,n){const i=n.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,m){r.drawElements(s,m,a,d*l),e.update(m,s,1)}function u(d,m,_){if(_===0)return;let g,p;if(i)g=r,p="drawElementsInstanced";else if(g=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[p](s,m,a,d*l,_),e.update(m,s,_)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u}function h0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function u0(r,t){return r[0]-t[0]}function d0(r,t){return Math.abs(t[1])-Math.abs(r[1])}function f0(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,o=new Ce,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(t.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let p=s.get(h);if(p===void 0||p.count!==g){let I=function(){V.dispose(),s.delete(h),h.removeEventListener("dispose",I)};var m=I;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,E=h.morphAttributes.color!==void 0,b=h.morphAttributes.position||[],M=h.morphAttributes.normal||[],P=h.morphAttributes.color||[];let v=0;x===!0&&(v=1),y===!0&&(v=2),E===!0&&(v=3);let T=h.attributes.position.count*v,N=1;T>t.maxTextureSize&&(N=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const F=new Float32Array(T*N*4*g),V=new Th(F,T,N,g);V.type=ri,V.needsUpdate=!0;const C=v*4;for(let G=0;G<g;G++){const z=b[G],Q=M[G],$=P[G],Z=T*N*4*G;for(let L=0;L<z.count;L++){const D=L*C;x===!0&&(o.fromBufferAttribute(z,L),F[Z+D+0]=o.x,F[Z+D+1]=o.y,F[Z+D+2]=o.z,F[Z+D+3]=0),y===!0&&(o.fromBufferAttribute(Q,L),F[Z+D+4]=o.x,F[Z+D+5]=o.y,F[Z+D+6]=o.z,F[Z+D+7]=0),E===!0&&(o.fromBufferAttribute($,L),F[Z+D+8]=o.x,F[Z+D+9]=o.y,F[Z+D+10]=o.z,F[Z+D+11]=$.itemSize===4?o.w:1)}}p={count:g,texture:V,size:new Jt(T,N)},s.set(h,p),h.addEventListener("dispose",I)}let f=0;for(let x=0;x<d.length;x++)f+=d[x];const w=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(r,"morphTargetBaseInfluence",w),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",p.texture,e),u.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const _=d===void 0?0:d.length;let g=n[h.id];if(g===void 0||g.length!==_){g=[];for(let y=0;y<_;y++)g[y]=[y,0];n[h.id]=g}for(let y=0;y<_;y++){const E=g[y];E[0]=y,E[1]=d[y]}g.sort(d0);for(let y=0;y<8;y++)y<_&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(u0);const p=h.morphAttributes.position,f=h.morphAttributes.normal;let w=0;for(let y=0;y<8;y++){const E=a[y],b=E[0],M=E[1];b!==Number.MAX_SAFE_INTEGER&&M?(p&&h.getAttribute("morphTarget"+y)!==p[b]&&h.setAttribute("morphTarget"+y,p[b]),f&&h.getAttribute("morphNormal"+y)!==f[b]&&h.setAttribute("morphNormal"+y,f[b]),i[y]=M,w+=M):(p&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),f&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}const x=h.morphTargetsRelative?1:1-w;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function p0(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const Oh=new ln,Fh=new Th,zh=new Qd,Bh=new Uh,wc=[],Ec=[],Tc=new Float32Array(16),bc=new Float32Array(9),Ac=new Float32Array(4);function Ur(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=wc[i];if(s===void 0&&(s=new Float32Array(i),wc[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Te(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function be(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function ha(r,t){let e=Ec[t];e===void 0&&(e=new Int32Array(t),Ec[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function m0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function g0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2fv(this.addr,t),be(e,t)}}function _0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;r.uniform3fv(this.addr,t),be(e,t)}}function v0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4fv(this.addr,t),be(e,t)}}function x0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Te(e,n))return;Ac.set(n),r.uniformMatrix2fv(this.addr,!1,Ac),be(e,n)}}function M0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Te(e,n))return;bc.set(n),r.uniformMatrix3fv(this.addr,!1,bc),be(e,n)}}function y0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Te(e,n))return;Tc.set(n),r.uniformMatrix4fv(this.addr,!1,Tc),be(e,n)}}function S0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function w0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2iv(this.addr,t),be(e,t)}}function E0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;r.uniform3iv(this.addr,t),be(e,t)}}function T0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4iv(this.addr,t),be(e,t)}}function b0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function A0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2uiv(this.addr,t),be(e,t)}}function R0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;r.uniform3uiv(this.addr,t),be(e,t)}}function C0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4uiv(this.addr,t),be(e,t)}}function L0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||Oh,i)}function P0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||zh,i)}function D0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Bh,i)}function U0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Fh,i)}function I0(r){switch(r){case 5126:return m0;case 35664:return g0;case 35665:return _0;case 35666:return v0;case 35674:return x0;case 35675:return M0;case 35676:return y0;case 5124:case 35670:return S0;case 35667:case 35671:return w0;case 35668:case 35672:return E0;case 35669:case 35673:return T0;case 5125:return b0;case 36294:return A0;case 36295:return R0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return L0;case 35679:case 36299:case 36307:return P0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return U0}}function N0(r,t){r.uniform1fv(this.addr,t)}function O0(r,t){const e=Ur(t,this.size,2);r.uniform2fv(this.addr,e)}function F0(r,t){const e=Ur(t,this.size,3);r.uniform3fv(this.addr,e)}function z0(r,t){const e=Ur(t,this.size,4);r.uniform4fv(this.addr,e)}function B0(r,t){const e=Ur(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function G0(r,t){const e=Ur(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function k0(r,t){const e=Ur(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function H0(r,t){r.uniform1iv(this.addr,t)}function V0(r,t){r.uniform2iv(this.addr,t)}function W0(r,t){r.uniform3iv(this.addr,t)}function X0(r,t){r.uniform4iv(this.addr,t)}function Y0(r,t){r.uniform1uiv(this.addr,t)}function q0(r,t){r.uniform2uiv(this.addr,t)}function j0(r,t){r.uniform3uiv(this.addr,t)}function K0(r,t){r.uniform4uiv(this.addr,t)}function Z0(r,t,e){const n=this.cache,i=t.length,s=ha(e,i);Te(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Oh,s[o])}function $0(r,t,e){const n=this.cache,i=t.length,s=ha(e,i);Te(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||zh,s[o])}function J0(r,t,e){const n=this.cache,i=t.length,s=ha(e,i);Te(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Bh,s[o])}function Q0(r,t,e){const n=this.cache,i=t.length,s=ha(e,i);Te(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Fh,s[o])}function tg(r){switch(r){case 5126:return N0;case 35664:return O0;case 35665:return F0;case 35666:return z0;case 35674:return B0;case 35675:return G0;case 35676:return k0;case 5124:case 35670:return H0;case 35667:case 35671:return V0;case 35668:case 35672:return W0;case 35669:case 35673:return X0;case 5125:return Y0;case 36294:return q0;case 36295:return j0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return Z0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return J0;case 36289:case 36303:case 36311:case 36292:return Q0}}class eg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=I0(e.type)}}class ng{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=tg(e.type)}}class ig{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function Rc(r,t){r.seq.push(t),r.map[t.id]=t}function rg(r,t,e){const n=r.name,i=n.length;for(Za.lastIndex=0;;){const s=Za.exec(n),o=Za.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Rc(e,c===void 0?new eg(a,r,t):new ng(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new ig(a),Rc(e,u)),e=u}}}class Bs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);rg(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Cc(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const sg=37297;let ag=0;function og(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function lg(r){const t=re.getPrimaries(re.workingColorSpace),e=re.getPrimaries(r);let n;switch(t===e?n="":t===qs&&e===Ys?n="LinearDisplayP3ToLinearSRGB":t===Ys&&e===qs&&(n="LinearSRGBToLinearDisplayP3"),r){case jn:case oa:return[n,"LinearTransferOETF"];case De:case Fo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Lc(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+og(r.getShaderSource(t),o)}else return i}function cg(r,t){const e=lg(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function hg(r,t){let e;switch(t){case yd:e="Linear";break;case Sd:e="Reinhard";break;case wd:e="OptimizedCineon";break;case Ed:e="ACESFilmic";break;case Td:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ug(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(kr).join(`
`)}function dg(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function fg(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function kr(r){return r!==""}function Pc(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dc(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function vo(r){return r.replace(pg,gg)}const mg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function gg(r,t){let e=Vt[t];if(e===void 0){const n=mg.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return vo(e)}const _g=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uc(r){return r.replace(_g,vg)}function vg(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ic(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function xg(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===uh?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===sa?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function Mg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Mr:case yr:t="ENVMAP_TYPE_CUBE";break;case aa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yg(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case yr:t="ENVMAP_MODE_REFRACTION";break}return t}function Sg(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case dh:t="ENVMAP_BLENDING_MULTIPLY";break;case xd:t="ENVMAP_BLENDING_MIX";break;case Md:t="ENVMAP_BLENDING_ADD";break}return t}function wg(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Eg(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=xg(e),c=Mg(e),h=yg(e),u=Sg(e),d=wg(e),m=e.isWebGL2?"":ug(e),_=dg(s),g=i.createProgram();let p,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(kr).join(`
`),p.length>0&&(p+=`
`),f=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(kr).join(`
`),f.length>0&&(f+=`
`)):(p=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),f=[m,Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?Vt.tonemapping_pars_fragment:"",e.toneMapping!==hi?hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,cg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(kr).join(`
`)),o=vo(o),o=Pc(o,e),o=Dc(o,e),a=vo(a),a=Pc(a,e),a=Dc(a,e),o=Uc(o),a=Uc(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=w+p+o,y=w+f+a,E=Cc(i,i.VERTEX_SHADER,x),b=Cc(i,i.FRAGMENT_SHADER,y);i.attachShader(g,E),i.attachShader(g,b),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function M(N){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(g).trim(),V=i.getShaderInfoLog(E).trim(),C=i.getShaderInfoLog(b).trim();let I=!0,G=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(I=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,E,b);else{const z=Lc(i,E,"vertex"),Q=Lc(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+F+`
`+z+`
`+Q)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(V===""||C==="")&&(G=!1);G&&(N.diagnostics={runnable:I,programLog:F,vertexShader:{log:V,prefix:p},fragmentShader:{log:C,prefix:f}})}i.deleteShader(E),i.deleteShader(b),P=new Bs(i,g),v=fg(i,g)}let P;this.getUniforms=function(){return P===void 0&&M(this),P};let v;this.getAttributes=function(){return v===void 0&&M(this),v};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(g,sg)),T},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ag++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=E,this.fragmentShader=b,this}let Tg=0;class bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ag(t),e.set(t,n)),n}}class Ag{constructor(t){this.id=Tg++,this.code=t,this.usedTimes=0}}function Rg(r,t,e,n,i,s,o){const a=new Ah,l=new bg,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let m=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return v===0?"uv":`uv${v}`}function p(v,T,N,F,V){const C=F.fog,I=V.geometry,G=v.isMeshStandardMaterial?F.environment:null,z=(v.isMeshStandardMaterial?e:t).get(v.envMap||G),Q=z&&z.mapping===aa?z.image.height:null,$=_[v.type];v.precision!==null&&(m=i.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const Z=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,L=Z!==void 0?Z.length:0;let D=0;I.morphAttributes.position!==void 0&&(D=1),I.morphAttributes.normal!==void 0&&(D=2),I.morphAttributes.color!==void 0&&(D=3);let j,tt,nt,mt;if($){const xe=Un[$];j=xe.vertexShader,tt=xe.fragmentShader}else j=v.vertexShader,tt=v.fragmentShader,l.update(v),nt=l.getVertexShaderID(v),mt=l.getFragmentShaderID(v);const Tt=r.getRenderTarget(),yt=V.isInstancedMesh===!0,vt=!!v.map,It=!!v.matcap,Gt=!!z,W=!!v.aoMap,Pe=!!v.lightMap,wt=!!v.bumpMap,Lt=!!v.normalMap,Ct=!!v.displacementMap,le=!!v.emissiveMap,kt=!!v.metalnessMap,Nt=!!v.roughnessMap,Qt=v.anisotropy>0,ge=v.clearcoat>0,Et=v.iridescence>0,R=v.sheen>0,S=v.transmission>0,H=Qt&&!!v.anisotropyMap,it=ge&&!!v.clearcoatMap,et=ge&&!!v.clearcoatNormalMap,rt=ge&&!!v.clearcoatRoughnessMap,Mt=Et&&!!v.iridescenceMap,lt=Et&&!!v.iridescenceThicknessMap,dt=R&&!!v.sheenColorMap,Pt=R&&!!v.sheenRoughnessMap,te=!!v.specularMap,st=!!v.specularColorMap,ie=!!v.specularIntensityMap,Ot=S&&!!v.transmissionMap,Dt=S&&!!v.thicknessMap,bt=!!v.gradientMap,gt=!!v.alphaMap,$t=v.alphaTest>0,U=!!v.alphaHash,ut=!!v.extensions,at=!!I.attributes.uv1,J=!!I.attributes.uv2,ot=!!I.attributes.uv3;let At=hi;return v.toneMapped&&(Tt===null||Tt.isXRRenderTarget===!0)&&(At=r.toneMapping),{isWebGL2:h,shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:j,fragmentShader:tt,defines:v.defines,customVertexShaderID:nt,customFragmentShaderID:mt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,instancing:yt,instancingColor:yt&&V.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Tt===null?r.outputColorSpace:Tt.isXRRenderTarget===!0?Tt.texture.colorSpace:jn,map:vt,matcap:It,envMap:Gt,envMapMode:Gt&&z.mapping,envMapCubeUVHeight:Q,aoMap:W,lightMap:Pe,bumpMap:wt,normalMap:Lt,displacementMap:d&&Ct,emissiveMap:le,normalMapObjectSpace:Lt&&v.normalMapType===zd,normalMapTangentSpace:Lt&&v.normalMapType===yh,metalnessMap:kt,roughnessMap:Nt,anisotropy:Qt,anisotropyMap:H,clearcoat:ge,clearcoatMap:it,clearcoatNormalMap:et,clearcoatRoughnessMap:rt,iridescence:Et,iridescenceMap:Mt,iridescenceThicknessMap:lt,sheen:R,sheenColorMap:dt,sheenRoughnessMap:Pt,specularMap:te,specularColorMap:st,specularIntensityMap:ie,transmission:S,transmissionMap:Ot,thicknessMap:Dt,gradientMap:bt,opaque:v.transparent===!1&&v.blending===pr,alphaMap:gt,alphaTest:$t,alphaHash:U,combine:v.combine,mapUv:vt&&g(v.map.channel),aoMapUv:W&&g(v.aoMap.channel),lightMapUv:Pe&&g(v.lightMap.channel),bumpMapUv:wt&&g(v.bumpMap.channel),normalMapUv:Lt&&g(v.normalMap.channel),displacementMapUv:Ct&&g(v.displacementMap.channel),emissiveMapUv:le&&g(v.emissiveMap.channel),metalnessMapUv:kt&&g(v.metalnessMap.channel),roughnessMapUv:Nt&&g(v.roughnessMap.channel),anisotropyMapUv:H&&g(v.anisotropyMap.channel),clearcoatMapUv:it&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:et&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&g(v.sheenRoughnessMap.channel),specularMapUv:te&&g(v.specularMap.channel),specularColorMapUv:st&&g(v.specularColorMap.channel),specularIntensityMapUv:ie&&g(v.specularIntensityMap.channel),transmissionMapUv:Ot&&g(v.transmissionMap.channel),thicknessMapUv:Dt&&g(v.thicknessMap.channel),alphaMapUv:gt&&g(v.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Lt||Qt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:at,vertexUv2s:J,vertexUv3s:ot,pointsUvs:V.isPoints===!0&&!!I.attributes.uv&&(vt||gt),fog:!!C,useFog:v.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:V.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:D,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&N.length>0,shadowMapType:r.shadowMap.type,toneMapping:At,useLegacyLights:r._useLegacyLights,decodeVideoTexture:vt&&v.map.isVideoTexture===!0&&re.getTransfer(v.map.colorSpace)===ce,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===vn,flipSided:v.side===We,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:ut&&v.extensions.derivatives===!0,extensionFragDepth:ut&&v.extensions.fragDepth===!0,extensionDrawBuffers:ut&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:ut&&v.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function f(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const N in v.defines)T.push(N),T.push(v.defines[N]);return v.isRawShaderMaterial===!1&&(w(T,v),x(T,v),T.push(r.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function w(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function x(v,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),v.push(a.mask)}function y(v){const T=_[v.type];let N;if(T){const F=Un[T];N=ff.clone(F.uniforms)}else N=v.uniforms;return N}function E(v,T){let N;for(let F=0,V=c.length;F<V;F++){const C=c[F];if(C.cacheKey===T){N=C,++N.usedTimes;break}}return N===void 0&&(N=new Eg(r,T,v,s),c.push(N)),N}function b(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),v.destroy()}}function M(v){l.remove(v)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:y,acquireProgram:E,releaseProgram:b,releaseShaderCache:M,programs:c,dispose:P}}function Cg(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Lg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Nc(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Oc(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,m,_,g,p){let f=r[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:m,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},r[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=m,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=g,f.group=p),t++,f}function a(u,d,m,_,g,p){const f=o(u,d,m,_,g,p);m.transmission>0?n.push(f):m.transparent===!0?i.push(f):e.push(f)}function l(u,d,m,_,g,p){const f=o(u,d,m,_,g,p);m.transmission>0?n.unshift(f):m.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||Lg),n.length>1&&n.sort(d||Nc),i.length>1&&i.sort(d||Nc)}function h(){for(let u=t,d=r.length;u<d;u++){const m=r[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Pg(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new Oc,r.set(n,[o])):i>=s.length?(o=new Oc,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function Dg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new jt};break;case"SpotLight":e={position:new B,direction:new B,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new B,halfWidth:new B,halfHeight:new B};break}return r[t.id]=e,e}}}function Ug(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Ig=0;function Ng(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Og(r,t){const e=new Dg,n=Ug(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new B);const s=new B,o=new we,a=new we;function l(h,u){let d=0,m=0,_=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let g=0,p=0,f=0,w=0,x=0,y=0,E=0,b=0,M=0,P=0,v=0;h.sort(Ng);const T=u===!0?Math.PI:1;for(let F=0,V=h.length;F<V;F++){const C=h[F],I=C.color,G=C.intensity,z=C.distance,Q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=I.r*G*T,m+=I.g*G*T,_+=I.b*G*T;else if(C.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(C.sh.coefficients[$],G);v++}else if(C.isDirectionalLight){const $=e.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity*T),C.castShadow){const Z=C.shadow,L=n.get(C);L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize=Z.mapSize,i.directionalShadow[g]=L,i.directionalShadowMap[g]=Q,i.directionalShadowMatrix[g]=C.shadow.matrix,y++}i.directional[g]=$,g++}else if(C.isSpotLight){const $=e.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(I).multiplyScalar(G*T),$.distance=z,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,i.spot[f]=$;const Z=C.shadow;if(C.map&&(i.spotLightMap[M]=C.map,M++,Z.updateMatrices(C),C.castShadow&&P++),i.spotLightMatrix[f]=Z.matrix,C.castShadow){const L=n.get(C);L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize=Z.mapSize,i.spotShadow[f]=L,i.spotShadowMap[f]=Q,b++}f++}else if(C.isRectAreaLight){const $=e.get(C);$.color.copy(I).multiplyScalar(G),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),i.rectArea[w]=$,w++}else if(C.isPointLight){const $=e.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity*T),$.distance=C.distance,$.decay=C.decay,C.castShadow){const Z=C.shadow,L=n.get(C);L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize=Z.mapSize,L.shadowCameraNear=Z.camera.near,L.shadowCameraFar=Z.camera.far,i.pointShadow[p]=L,i.pointShadowMap[p]=Q,i.pointShadowMatrix[p]=C.shadow.matrix,E++}i.point[p]=$,p++}else if(C.isHemisphereLight){const $=e.get(C);$.skyColor.copy(C.color).multiplyScalar(G*T),$.groundColor.copy(C.groundColor).multiplyScalar(G*T),i.hemi[x]=$,x++}}w>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=m,i.ambient[2]=_;const N=i.hash;(N.directionalLength!==g||N.pointLength!==p||N.spotLength!==f||N.rectAreaLength!==w||N.hemiLength!==x||N.numDirectionalShadows!==y||N.numPointShadows!==E||N.numSpotShadows!==b||N.numSpotMaps!==M||N.numLightProbes!==v)&&(i.directional.length=g,i.spot.length=f,i.rectArea.length=w,i.point.length=p,i.hemi.length=x,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=b+M-P,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=v,N.directionalLength=g,N.pointLength=p,N.spotLength=f,N.rectAreaLength=w,N.hemiLength=x,N.numDirectionalShadows=y,N.numPointShadows=E,N.numSpotShadows=b,N.numSpotMaps=M,N.numLightProbes=v,i.version=Ig++)}function c(h,u){let d=0,m=0,_=0,g=0,p=0;const f=u.matrixWorldInverse;for(let w=0,x=h.length;w<x;w++){const y=h[w];if(y.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),d++}else if(y.isSpotLight){const E=i.spot[_];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),_++}else if(y.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(f),a.identity(),o.copy(y.matrixWorld),o.premultiply(f),a.extractRotation(o),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const E=i.point[m];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(f),m++}else if(y.isHemisphereLight){const E=i.hemi[p];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(f),p++}}}return{setup:l,setupView:c,state:i}}function Fc(r,t){const e=new Og(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Fg(r,t){let e=new WeakMap;function n(s,o=0){const a=e.get(s);let l;return a===void 0?(l=new Fc(r,t),e.set(s,[l])):o>=a.length?(l=new Fc(r,t),a.push(l)):l=a[o],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class zg extends Dr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bg extends Dr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Gg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hg(r,t,e){let n=new zo;const i=new Jt,s=new Jt,o=new Ce,a=new zg({depthPacking:Fd}),l=new Bg,c={},h=e.maxTextureSize,u={[pi]:We,[We]:pi,[vn]:vn},d=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:Gg,fragmentShader:kg}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new hn;_.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new q(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let f=this.type;this.render=function(E,b,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const P=r.getRenderTarget(),v=r.getActiveCubeFace(),T=r.getActiveMipmapLevel(),N=r.state;N.setBlending(ci),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const F=f!==Wn&&this.type===Wn,V=f===Wn&&this.type!==Wn;for(let C=0,I=E.length;C<I;C++){const G=E[C],z=G.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const Q=z.getFrameExtents();if(i.multiply(Q),s.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/Q.x),i.x=s.x*Q.x,z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/Q.y),i.y=s.y*Q.y,z.mapSize.y=s.y)),z.map===null||F===!0||V===!0){const Z=this.type!==Wn?{minFilter:He,magFilter:He}:{};z.map!==null&&z.map.dispose(),z.map=new Wi(i.x,i.y,Z),z.map.texture.name=G.name+".shadowMap",z.camera.updateProjectionMatrix()}r.setRenderTarget(z.map),r.clear();const $=z.getViewportCount();for(let Z=0;Z<$;Z++){const L=z.getViewport(Z);o.set(s.x*L.x,s.y*L.y,s.x*L.z,s.y*L.w),N.viewport(o),z.updateMatrices(G,Z),n=z.getFrustum(),y(b,M,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===Wn&&w(z,M),z.needsUpdate=!1}f=this.type,p.needsUpdate=!1,r.setRenderTarget(P,v,T)};function w(E,b){const M=t.update(g);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Wi(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(b,null,M,d,g,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(b,null,M,m,g,null)}function x(E,b,M,P){let v=null;const T=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)v=T;else if(v=M.isPointLight===!0?l:a,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const N=v.uuid,F=b.uuid;let V=c[N];V===void 0&&(V={},c[N]=V);let C=V[F];C===void 0&&(C=v.clone(),V[F]=C),v=C}if(v.visible=b.visible,v.wireframe=b.wireframe,P===Wn?v.side=b.shadowSide!==null?b.shadowSide:b.side:v.side=b.shadowSide!==null?b.shadowSide:u[b.side],v.alphaMap=b.alphaMap,v.alphaTest=b.alphaTest,v.map=b.map,v.clipShadows=b.clipShadows,v.clippingPlanes=b.clippingPlanes,v.clipIntersection=b.clipIntersection,v.displacementMap=b.displacementMap,v.displacementScale=b.displacementScale,v.displacementBias=b.displacementBias,v.wireframeLinewidth=b.wireframeLinewidth,v.linewidth=b.linewidth,M.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=r.properties.get(v);N.light=M}return v}function y(E,b,M,P,v){if(E.visible===!1)return;if(E.layers.test(b.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Wn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);const F=t.update(E),V=E.material;if(Array.isArray(V)){const C=F.groups;for(let I=0,G=C.length;I<G;I++){const z=C[I],Q=V[z.materialIndex];if(Q&&Q.visible){const $=x(E,Q,P,v);r.renderBufferDirect(M,null,F,$,E,z)}}}else if(V.visible){const C=x(E,V,P,v);r.renderBufferDirect(M,null,F,C,E,null)}}const N=E.children;for(let F=0,V=N.length;F<V;F++)y(N[F],b,M,P,v)}}function Vg(r,t,e){const n=e.isWebGL2;function i(){let U=!1;const ut=new Ce;let at=null;const J=new Ce(0,0,0,0);return{setMask:function(ot){at!==ot&&!U&&(r.colorMask(ot,ot,ot,ot),at=ot)},setLocked:function(ot){U=ot},setClear:function(ot,At,ee,xe,fn){fn===!0&&(ot*=xe,At*=xe,ee*=xe),ut.set(ot,At,ee,xe),J.equals(ut)===!1&&(r.clearColor(ot,At,ee,xe),J.copy(ut))},reset:function(){U=!1,at=null,J.set(-1,0,0,0)}}}function s(){let U=!1,ut=null,at=null,J=null;return{setTest:function(ot){ot?vt(r.DEPTH_TEST):It(r.DEPTH_TEST)},setMask:function(ot){ut!==ot&&!U&&(r.depthMask(ot),ut=ot)},setFunc:function(ot){if(at!==ot){switch(ot){case dd:r.depthFunc(r.NEVER);break;case fd:r.depthFunc(r.ALWAYS);break;case pd:r.depthFunc(r.LESS);break;case Ws:r.depthFunc(r.LEQUAL);break;case md:r.depthFunc(r.EQUAL);break;case gd:r.depthFunc(r.GEQUAL);break;case _d:r.depthFunc(r.GREATER);break;case vd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}at=ot}},setLocked:function(ot){U=ot},setClear:function(ot){J!==ot&&(r.clearDepth(ot),J=ot)},reset:function(){U=!1,ut=null,at=null,J=null}}}function o(){let U=!1,ut=null,at=null,J=null,ot=null,At=null,ee=null,xe=null,fn=null;return{setTest:function(oe){U||(oe?vt(r.STENCIL_TEST):It(r.STENCIL_TEST))},setMask:function(oe){ut!==oe&&!U&&(r.stencilMask(oe),ut=oe)},setFunc:function(oe,Be,Pn){(at!==oe||J!==Be||ot!==Pn)&&(r.stencilFunc(oe,Be,Pn),at=oe,J=Be,ot=Pn)},setOp:function(oe,Be,Pn){(At!==oe||ee!==Be||xe!==Pn)&&(r.stencilOp(oe,Be,Pn),At=oe,ee=Be,xe=Pn)},setLocked:function(oe){U=oe},setClear:function(oe){fn!==oe&&(r.clearStencil(oe),fn=oe)},reset:function(){U=!1,ut=null,at=null,J=null,ot=null,At=null,ee=null,xe=null,fn=null}}}const a=new i,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let d={},m={},_=new WeakMap,g=[],p=null,f=!1,w=null,x=null,y=null,E=null,b=null,M=null,P=null,v=new jt(0,0,0),T=0,N=!1,F=null,V=null,C=null,I=null,G=null;const z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,$=0;const Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Q=$>=1):Z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Q=$>=2);let L=null,D={};const j=r.getParameter(r.SCISSOR_BOX),tt=r.getParameter(r.VIEWPORT),nt=new Ce().fromArray(j),mt=new Ce().fromArray(tt);function Tt(U,ut,at,J){const ot=new Uint8Array(4),At=r.createTexture();r.bindTexture(U,At),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ee=0;ee<at;ee++)n&&(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)?r.texImage3D(ut,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ot):r.texImage2D(ut+ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ot);return At}const yt={};yt[r.TEXTURE_2D]=Tt(r.TEXTURE_2D,r.TEXTURE_2D,1),yt[r.TEXTURE_CUBE_MAP]=Tt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(yt[r.TEXTURE_2D_ARRAY]=Tt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),yt[r.TEXTURE_3D]=Tt(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),vt(r.DEPTH_TEST),l.setFunc(Ws),kt(!1),Nt(vl),vt(r.CULL_FACE),Ct(ci);function vt(U){d[U]!==!0&&(r.enable(U),d[U]=!0)}function It(U){d[U]!==!1&&(r.disable(U),d[U]=!1)}function Gt(U,ut){return m[U]!==ut?(r.bindFramebuffer(U,ut),m[U]=ut,n&&(U===r.DRAW_FRAMEBUFFER&&(m[r.FRAMEBUFFER]=ut),U===r.FRAMEBUFFER&&(m[r.DRAW_FRAMEBUFFER]=ut)),!0):!1}function W(U,ut){let at=g,J=!1;if(U)if(at=_.get(ut),at===void 0&&(at=[],_.set(ut,at)),U.isWebGLMultipleRenderTargets){const ot=U.texture;if(at.length!==ot.length||at[0]!==r.COLOR_ATTACHMENT0){for(let At=0,ee=ot.length;At<ee;At++)at[At]=r.COLOR_ATTACHMENT0+At;at.length=ot.length,J=!0}}else at[0]!==r.COLOR_ATTACHMENT0&&(at[0]=r.COLOR_ATTACHMENT0,J=!0);else at[0]!==r.BACK&&(at[0]=r.BACK,J=!0);J&&(e.isWebGL2?r.drawBuffers(at):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(at))}function Pe(U){return p!==U?(r.useProgram(U),p=U,!0):!1}const wt={[Ui]:r.FUNC_ADD,[$u]:r.FUNC_SUBTRACT,[Ju]:r.FUNC_REVERSE_SUBTRACT};if(n)wt[Sl]=r.MIN,wt[wl]=r.MAX;else{const U=t.get("EXT_blend_minmax");U!==null&&(wt[Sl]=U.MIN_EXT,wt[wl]=U.MAX_EXT)}const Lt={[Qu]:r.ZERO,[td]:r.ONE,[ed]:r.SRC_COLOR,[co]:r.SRC_ALPHA,[od]:r.SRC_ALPHA_SATURATE,[sd]:r.DST_COLOR,[id]:r.DST_ALPHA,[nd]:r.ONE_MINUS_SRC_COLOR,[ho]:r.ONE_MINUS_SRC_ALPHA,[ad]:r.ONE_MINUS_DST_COLOR,[rd]:r.ONE_MINUS_DST_ALPHA,[ld]:r.CONSTANT_COLOR,[cd]:r.ONE_MINUS_CONSTANT_COLOR,[hd]:r.CONSTANT_ALPHA,[ud]:r.ONE_MINUS_CONSTANT_ALPHA};function Ct(U,ut,at,J,ot,At,ee,xe,fn,oe){if(U===ci){f===!0&&(It(r.BLEND),f=!1);return}if(f===!1&&(vt(r.BLEND),f=!0),U!==Zu){if(U!==w||oe!==N){if((x!==Ui||b!==Ui)&&(r.blendEquation(r.FUNC_ADD),x=Ui,b=Ui),oe)switch(U){case pr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xl:r.blendFunc(r.ONE,r.ONE);break;case Ml:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yl:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case pr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xl:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Ml:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yl:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,E=null,M=null,P=null,v.set(0,0,0),T=0,w=U,N=oe}return}ot=ot||ut,At=At||at,ee=ee||J,(ut!==x||ot!==b)&&(r.blendEquationSeparate(wt[ut],wt[ot]),x=ut,b=ot),(at!==y||J!==E||At!==M||ee!==P)&&(r.blendFuncSeparate(Lt[at],Lt[J],Lt[At],Lt[ee]),y=at,E=J,M=At,P=ee),(xe.equals(v)===!1||fn!==T)&&(r.blendColor(xe.r,xe.g,xe.b,fn),v.copy(xe),T=fn),w=U,N=!1}function le(U,ut){U.side===vn?It(r.CULL_FACE):vt(r.CULL_FACE);let at=U.side===We;ut&&(at=!at),kt(at),U.blending===pr&&U.transparent===!1?Ct(ci):Ct(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const J=U.stencilWrite;c.setTest(J),J&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ge(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?vt(r.SAMPLE_ALPHA_TO_COVERAGE):It(r.SAMPLE_ALPHA_TO_COVERAGE)}function kt(U){F!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),F=U)}function Nt(U){U!==ju?(vt(r.CULL_FACE),U!==V&&(U===vl?r.cullFace(r.BACK):U===Ku?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):It(r.CULL_FACE),V=U}function Qt(U){U!==C&&(Q&&r.lineWidth(U),C=U)}function ge(U,ut,at){U?(vt(r.POLYGON_OFFSET_FILL),(I!==ut||G!==at)&&(r.polygonOffset(ut,at),I=ut,G=at)):It(r.POLYGON_OFFSET_FILL)}function Et(U){U?vt(r.SCISSOR_TEST):It(r.SCISSOR_TEST)}function R(U){U===void 0&&(U=r.TEXTURE0+z-1),L!==U&&(r.activeTexture(U),L=U)}function S(U,ut,at){at===void 0&&(L===null?at=r.TEXTURE0+z-1:at=L);let J=D[at];J===void 0&&(J={type:void 0,texture:void 0},D[at]=J),(J.type!==U||J.texture!==ut)&&(L!==at&&(r.activeTexture(at),L=at),r.bindTexture(U,ut||yt[U]),J.type=U,J.texture=ut)}function H(){const U=D[L];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function it(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function rt(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ot(U){nt.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),nt.copy(U))}function Dt(U){mt.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),mt.copy(U))}function bt(U,ut){let at=u.get(ut);at===void 0&&(at=new WeakMap,u.set(ut,at));let J=at.get(U);J===void 0&&(J=r.getUniformBlockIndex(ut,U.name),at.set(U,J))}function gt(U,ut){const J=u.get(ut).get(U);h.get(ut)!==J&&(r.uniformBlockBinding(ut,J,U.__bindingPointIndex),h.set(ut,J))}function $t(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},L=null,D={},m={},_=new WeakMap,g=[],p=null,f=!1,w=null,x=null,y=null,E=null,b=null,M=null,P=null,v=new jt(0,0,0),T=0,N=!1,F=null,V=null,C=null,I=null,G=null,nt.set(0,0,r.canvas.width,r.canvas.height),mt.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:vt,disable:It,bindFramebuffer:Gt,drawBuffers:W,useProgram:Pe,setBlending:Ct,setMaterial:le,setFlipSided:kt,setCullFace:Nt,setLineWidth:Qt,setPolygonOffset:ge,setScissorTest:Et,activeTexture:R,bindTexture:S,unbindTexture:H,compressedTexImage2D:it,compressedTexImage3D:et,texImage2D:st,texImage3D:ie,updateUBOMapping:bt,uniformBlockBinding:gt,texStorage2D:Pt,texStorage3D:te,texSubImage2D:rt,texSubImage3D:Mt,compressedTexSubImage2D:lt,compressedTexSubImage3D:dt,scissor:Ot,viewport:Dt,reset:$t}}function Wg(r,t,e,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let g;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(R,S){return f?new OffscreenCanvas(R,S):Zs("canvas")}function x(R,S,H,it){let et=1;if((R.width>it||R.height>it)&&(et=it/Math.max(R.width,R.height)),et<1||S===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const rt=S?_o:Math.floor,Mt=rt(et*R.width),lt=rt(et*R.height);g===void 0&&(g=w(Mt,lt));const dt=H?w(Mt,lt):g;return dt.width=Mt,dt.height=lt,dt.getContext("2d").drawImage(R,0,0,Mt,lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Mt+"x"+lt+")."),dt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function y(R){return Ql(R.width)&&Ql(R.height)}function E(R){return a?!1:R.wrapS!==Rn||R.wrapT!==Rn||R.minFilter!==He&&R.minFilter!==_n}function b(R,S){return R.generateMipmaps&&S&&R.minFilter!==He&&R.minFilter!==_n}function M(R){r.generateMipmap(R)}function P(R,S,H,it,et=!1){if(a===!1)return S;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let rt=S;if(S===r.RED&&(H===r.FLOAT&&(rt=r.R32F),H===r.HALF_FLOAT&&(rt=r.R16F),H===r.UNSIGNED_BYTE&&(rt=r.R8)),S===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(rt=r.R8UI),H===r.UNSIGNED_SHORT&&(rt=r.R16UI),H===r.UNSIGNED_INT&&(rt=r.R32UI),H===r.BYTE&&(rt=r.R8I),H===r.SHORT&&(rt=r.R16I),H===r.INT&&(rt=r.R32I)),S===r.RG&&(H===r.FLOAT&&(rt=r.RG32F),H===r.HALF_FLOAT&&(rt=r.RG16F),H===r.UNSIGNED_BYTE&&(rt=r.RG8)),S===r.RGBA){const Mt=et?Xs:re.getTransfer(it);H===r.FLOAT&&(rt=r.RGBA32F),H===r.HALF_FLOAT&&(rt=r.RGBA16F),H===r.UNSIGNED_BYTE&&(rt=Mt===ce?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(rt=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(rt=r.RGB5_A1)}return(rt===r.R16F||rt===r.R32F||rt===r.RG16F||rt===r.RG32F||rt===r.RGBA16F||rt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function v(R,S,H){return b(R,H)===!0||R.isFramebufferTexture&&R.minFilter!==He&&R.minFilter!==_n?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function T(R){return R===He||R===El||R===ya?r.NEAREST:r.LINEAR}function N(R){const S=R.target;S.removeEventListener("dispose",N),V(S),S.isVideoTexture&&_.delete(S)}function F(R){const S=R.target;S.removeEventListener("dispose",F),I(S)}function V(R){const S=n.get(R);if(S.__webglInit===void 0)return;const H=R.source,it=p.get(H);if(it){const et=it[S.__cacheKey];et.usedTimes--,et.usedTimes===0&&C(R),Object.keys(it).length===0&&p.delete(H)}n.remove(R)}function C(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const H=R.source,it=p.get(H);delete it[S.__cacheKey],o.memory.textures--}function I(R){const S=R.texture,H=n.get(R),it=n.get(S);if(it.__webglTexture!==void 0&&(r.deleteTexture(it.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(H.__webglFramebuffer[et]))for(let rt=0;rt<H.__webglFramebuffer[et].length;rt++)r.deleteFramebuffer(H.__webglFramebuffer[et][rt]);else r.deleteFramebuffer(H.__webglFramebuffer[et]);H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer[et])}else{if(Array.isArray(H.__webglFramebuffer))for(let et=0;et<H.__webglFramebuffer.length;et++)r.deleteFramebuffer(H.__webglFramebuffer[et]);else r.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&r.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let et=0;et<H.__webglColorRenderbuffer.length;et++)H.__webglColorRenderbuffer[et]&&r.deleteRenderbuffer(H.__webglColorRenderbuffer[et]);H.__webglDepthRenderbuffer&&r.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let et=0,rt=S.length;et<rt;et++){const Mt=n.get(S[et]);Mt.__webglTexture&&(r.deleteTexture(Mt.__webglTexture),o.memory.textures--),n.remove(S[et])}n.remove(S),n.remove(R)}let G=0;function z(){G=0}function Q(){const R=G;return R>=l&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+l),G+=1,R}function $(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function Z(R,S){const H=n.get(R);if(R.isVideoTexture&&ge(R),R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){const it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{vt(H,R,S);return}}e.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+S)}function L(R,S){const H=n.get(R);if(R.version>0&&H.__version!==R.version){vt(H,R,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+S)}function D(R,S){const H=n.get(R);if(R.version>0&&H.__version!==R.version){vt(H,R,S);return}e.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+S)}function j(R,S){const H=n.get(R);if(R.version>0&&H.__version!==R.version){It(H,R,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+S)}const tt={[po]:r.REPEAT,[Rn]:r.CLAMP_TO_EDGE,[mo]:r.MIRRORED_REPEAT},nt={[He]:r.NEAREST,[El]:r.NEAREST_MIPMAP_NEAREST,[ya]:r.NEAREST_MIPMAP_LINEAR,[_n]:r.LINEAR,[bd]:r.LINEAR_MIPMAP_NEAREST,[jr]:r.LINEAR_MIPMAP_LINEAR},mt={[Bd]:r.NEVER,[Yd]:r.ALWAYS,[Gd]:r.LESS,[Hd]:r.LEQUAL,[kd]:r.EQUAL,[Xd]:r.GEQUAL,[Vd]:r.GREATER,[Wd]:r.NOTEQUAL};function Tt(R,S,H){if(H?(r.texParameteri(R,r.TEXTURE_WRAP_S,tt[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,tt[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,tt[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,nt[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,nt[S.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(S.wrapS!==Rn||S.wrapT!==Rn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,T(S.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,T(S.minFilter)),S.minFilter!==He&&S.minFilter!==_n&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,mt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const it=t.get("EXT_texture_filter_anisotropic");if(S.magFilter===He||S.minFilter!==ya&&S.minFilter!==jr||S.type===ri&&t.has("OES_texture_float_linear")===!1||a===!1&&S.type===Kr&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(r.texParameterf(R,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function yt(R,S){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",N));const it=S.source;let et=p.get(it);et===void 0&&(et={},p.set(it,et));const rt=$(S);if(rt!==R.__cacheKey){et[rt]===void 0&&(et[rt]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),et[rt].usedTimes++;const Mt=et[R.__cacheKey];Mt!==void 0&&(et[R.__cacheKey].usedTimes--,Mt.usedTimes===0&&C(S)),R.__cacheKey=rt,R.__webglTexture=et[rt].texture}return H}function vt(R,S,H){let it=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(it=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(it=r.TEXTURE_3D);const et=yt(R,S),rt=S.source;e.bindTexture(it,R.__webglTexture,r.TEXTURE0+H);const Mt=n.get(rt);if(rt.version!==Mt.__version||et===!0){e.activeTexture(r.TEXTURE0+H);const lt=re.getPrimaries(re.workingColorSpace),dt=S.colorSpace===xn?null:re.getPrimaries(S.colorSpace),Pt=S.colorSpace===xn||lt===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const te=E(S)&&y(S.image)===!1;let st=x(S.image,te,!1,h);st=Et(S,st);const ie=y(st)||a,Ot=s.convert(S.format,S.colorSpace);let Dt=s.convert(S.type),bt=P(S.internalFormat,Ot,Dt,S.colorSpace,S.isVideoTexture);Tt(it,S,ie);let gt;const $t=S.mipmaps,U=a&&S.isVideoTexture!==!0,ut=Mt.__version===void 0||et===!0,at=v(S,st,ie);if(S.isDepthTexture)bt=r.DEPTH_COMPONENT,a?S.type===ri?bt=r.DEPTH_COMPONENT32F:S.type===ii?bt=r.DEPTH_COMPONENT24:S.type===Oi?bt=r.DEPTH24_STENCIL8:bt=r.DEPTH_COMPONENT16:S.type===ri&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Fi&&bt===r.DEPTH_COMPONENT&&S.type!==Oo&&S.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=ii,Dt=s.convert(S.type)),S.format===Sr&&bt===r.DEPTH_COMPONENT&&(bt=r.DEPTH_STENCIL,S.type!==Oi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Oi,Dt=s.convert(S.type))),ut&&(U?e.texStorage2D(r.TEXTURE_2D,1,bt,st.width,st.height):e.texImage2D(r.TEXTURE_2D,0,bt,st.width,st.height,0,Ot,Dt,null));else if(S.isDataTexture)if($t.length>0&&ie){U&&ut&&e.texStorage2D(r.TEXTURE_2D,at,bt,$t[0].width,$t[0].height);for(let J=0,ot=$t.length;J<ot;J++)gt=$t[J],U?e.texSubImage2D(r.TEXTURE_2D,J,0,0,gt.width,gt.height,Ot,Dt,gt.data):e.texImage2D(r.TEXTURE_2D,J,bt,gt.width,gt.height,0,Ot,Dt,gt.data);S.generateMipmaps=!1}else U?(ut&&e.texStorage2D(r.TEXTURE_2D,at,bt,st.width,st.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,st.width,st.height,Ot,Dt,st.data)):e.texImage2D(r.TEXTURE_2D,0,bt,st.width,st.height,0,Ot,Dt,st.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){U&&ut&&e.texStorage3D(r.TEXTURE_2D_ARRAY,at,bt,$t[0].width,$t[0].height,st.depth);for(let J=0,ot=$t.length;J<ot;J++)gt=$t[J],S.format!==Cn?Ot!==null?U?e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,gt.width,gt.height,st.depth,Ot,gt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,bt,gt.width,gt.height,st.depth,0,gt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?e.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,gt.width,gt.height,st.depth,Ot,Dt,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,J,bt,gt.width,gt.height,st.depth,0,Ot,Dt,gt.data)}else{U&&ut&&e.texStorage2D(r.TEXTURE_2D,at,bt,$t[0].width,$t[0].height);for(let J=0,ot=$t.length;J<ot;J++)gt=$t[J],S.format!==Cn?Ot!==null?U?e.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,gt.width,gt.height,Ot,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,J,bt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?e.texSubImage2D(r.TEXTURE_2D,J,0,0,gt.width,gt.height,Ot,Dt,gt.data):e.texImage2D(r.TEXTURE_2D,J,bt,gt.width,gt.height,0,Ot,Dt,gt.data)}else if(S.isDataArrayTexture)U?(ut&&e.texStorage3D(r.TEXTURE_2D_ARRAY,at,bt,st.width,st.height,st.depth),e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Ot,Dt,st.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,bt,st.width,st.height,st.depth,0,Ot,Dt,st.data);else if(S.isData3DTexture)U?(ut&&e.texStorage3D(r.TEXTURE_3D,at,bt,st.width,st.height,st.depth),e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Ot,Dt,st.data)):e.texImage3D(r.TEXTURE_3D,0,bt,st.width,st.height,st.depth,0,Ot,Dt,st.data);else if(S.isFramebufferTexture){if(ut)if(U)e.texStorage2D(r.TEXTURE_2D,at,bt,st.width,st.height);else{let J=st.width,ot=st.height;for(let At=0;At<at;At++)e.texImage2D(r.TEXTURE_2D,At,bt,J,ot,0,Ot,Dt,null),J>>=1,ot>>=1}}else if($t.length>0&&ie){U&&ut&&e.texStorage2D(r.TEXTURE_2D,at,bt,$t[0].width,$t[0].height);for(let J=0,ot=$t.length;J<ot;J++)gt=$t[J],U?e.texSubImage2D(r.TEXTURE_2D,J,0,0,Ot,Dt,gt):e.texImage2D(r.TEXTURE_2D,J,bt,Ot,Dt,gt);S.generateMipmaps=!1}else U?(ut&&e.texStorage2D(r.TEXTURE_2D,at,bt,st.width,st.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,Ot,Dt,st)):e.texImage2D(r.TEXTURE_2D,0,bt,Ot,Dt,st);b(S,ie)&&M(it),Mt.__version=rt.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function It(R,S,H){if(S.image.length!==6)return;const it=yt(R,S),et=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+H);const rt=n.get(et);if(et.version!==rt.__version||it===!0){e.activeTexture(r.TEXTURE0+H);const Mt=re.getPrimaries(re.workingColorSpace),lt=S.colorSpace===xn?null:re.getPrimaries(S.colorSpace),dt=S.colorSpace===xn||Mt===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Pt=S.isCompressedTexture||S.image[0].isCompressedTexture,te=S.image[0]&&S.image[0].isDataTexture,st=[];for(let J=0;J<6;J++)!Pt&&!te?st[J]=x(S.image[J],!1,!0,c):st[J]=te?S.image[J].image:S.image[J],st[J]=Et(S,st[J]);const ie=st[0],Ot=y(ie)||a,Dt=s.convert(S.format,S.colorSpace),bt=s.convert(S.type),gt=P(S.internalFormat,Dt,bt,S.colorSpace),$t=a&&S.isVideoTexture!==!0,U=rt.__version===void 0||it===!0;let ut=v(S,ie,Ot);Tt(r.TEXTURE_CUBE_MAP,S,Ot);let at;if(Pt){$t&&U&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,gt,ie.width,ie.height);for(let J=0;J<6;J++){at=st[J].mipmaps;for(let ot=0;ot<at.length;ot++){const At=at[ot];S.format!==Cn?Dt!==null?$t?e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,0,0,At.width,At.height,Dt,At.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,gt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$t?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,0,0,At.width,At.height,Dt,bt,At.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,gt,At.width,At.height,0,Dt,bt,At.data)}}}else{at=S.mipmaps,$t&&U&&(at.length>0&&ut++,e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,gt,st[0].width,st[0].height));for(let J=0;J<6;J++)if(te){$t?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,st[J].width,st[J].height,Dt,bt,st[J].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,gt,st[J].width,st[J].height,0,Dt,bt,st[J].data);for(let ot=0;ot<at.length;ot++){const ee=at[ot].image[J].image;$t?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,0,0,ee.width,ee.height,Dt,bt,ee.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,gt,ee.width,ee.height,0,Dt,bt,ee.data)}}else{$t?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Dt,bt,st[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,gt,Dt,bt,st[J]);for(let ot=0;ot<at.length;ot++){const At=at[ot];$t?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,0,0,Dt,bt,At.image[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,gt,Dt,bt,At.image[J])}}}b(S,Ot)&&M(r.TEXTURE_CUBE_MAP),rt.__version=et.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Gt(R,S,H,it,et,rt){const Mt=s.convert(H.format,H.colorSpace),lt=s.convert(H.type),dt=P(H.internalFormat,Mt,lt,H.colorSpace);if(!n.get(S).__hasExternalTextures){const te=Math.max(1,S.width>>rt),st=Math.max(1,S.height>>rt);et===r.TEXTURE_3D||et===r.TEXTURE_2D_ARRAY?e.texImage3D(et,rt,dt,te,st,S.depth,0,Mt,lt,null):e.texImage2D(et,rt,dt,te,st,0,Mt,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),Qt(S)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,it,et,n.get(H).__webglTexture,0,Nt(S)):(et===r.TEXTURE_2D||et>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,it,et,n.get(H).__webglTexture,rt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function W(R,S,H){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer&&!S.stencilBuffer){let it=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(H||Qt(S)){const et=S.depthTexture;et&&et.isDepthTexture&&(et.type===ri?it=r.DEPTH_COMPONENT32F:et.type===ii&&(it=r.DEPTH_COMPONENT24));const rt=Nt(S);Qt(S)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,rt,it,S.width,S.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,rt,it,S.width,S.height)}else r.renderbufferStorage(r.RENDERBUFFER,it,S.width,S.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(S.depthBuffer&&S.stencilBuffer){const it=Nt(S);H&&Qt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,it,r.DEPTH24_STENCIL8,S.width,S.height):Qt(S)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,it,r.DEPTH24_STENCIL8,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const it=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let et=0;et<it.length;et++){const rt=it[et],Mt=s.convert(rt.format,rt.colorSpace),lt=s.convert(rt.type),dt=P(rt.internalFormat,Mt,lt,rt.colorSpace),Pt=Nt(S);H&&Qt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Pt,dt,S.width,S.height):Qt(S)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Pt,dt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,dt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Z(S.depthTexture,0);const it=n.get(S.depthTexture).__webglTexture,et=Nt(S);if(S.depthTexture.format===Fi)Qt(S)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,it,0,et):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,it,0);else if(S.depthTexture.format===Sr)Qt(S)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,it,0,et):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function wt(R){const S=n.get(R),H=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Pe(S.__webglFramebuffer,R)}else if(H){S.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[it]),S.__webglDepthbuffer[it]=r.createRenderbuffer(),W(S.__webglDepthbuffer[it],R,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=r.createRenderbuffer(),W(S.__webglDepthbuffer,R,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Lt(R,S,H){const it=n.get(R);S!==void 0&&Gt(it.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&wt(R)}function Ct(R){const S=R.texture,H=n.get(R),it=n.get(S);R.addEventListener("dispose",F),R.isWebGLMultipleRenderTargets!==!0&&(it.__webglTexture===void 0&&(it.__webglTexture=r.createTexture()),it.__version=S.version,o.memory.textures++);const et=R.isWebGLCubeRenderTarget===!0,rt=R.isWebGLMultipleRenderTargets===!0,Mt=y(R)||a;if(et){H.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(a&&S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[lt]=[];for(let dt=0;dt<S.mipmaps.length;dt++)H.__webglFramebuffer[lt][dt]=r.createFramebuffer()}else H.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(a&&S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let lt=0;lt<S.mipmaps.length;lt++)H.__webglFramebuffer[lt]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(rt)if(i.drawBuffers){const lt=R.texture;for(let dt=0,Pt=lt.length;dt<Pt;dt++){const te=n.get(lt[dt]);te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&Qt(R)===!1){const lt=rt?S:[S];H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let dt=0;dt<lt.length;dt++){const Pt=lt[dt];H.__webglColorRenderbuffer[dt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[dt]);const te=s.convert(Pt.format,Pt.colorSpace),st=s.convert(Pt.type),ie=P(Pt.internalFormat,te,st,Pt.colorSpace,R.isXRRenderTarget===!0),Ot=Nt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ot,ie,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,H.__webglColorRenderbuffer[dt])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),W(H.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(et){e.bindTexture(r.TEXTURE_CUBE_MAP,it.__webglTexture),Tt(r.TEXTURE_CUBE_MAP,S,Mt);for(let lt=0;lt<6;lt++)if(a&&S.mipmaps&&S.mipmaps.length>0)for(let dt=0;dt<S.mipmaps.length;dt++)Gt(H.__webglFramebuffer[lt][dt],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt);else Gt(H.__webglFramebuffer[lt],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);b(S,Mt)&&M(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){const lt=R.texture;for(let dt=0,Pt=lt.length;dt<Pt;dt++){const te=lt[dt],st=n.get(te);e.bindTexture(r.TEXTURE_2D,st.__webglTexture),Tt(r.TEXTURE_2D,te,Mt),Gt(H.__webglFramebuffer,R,te,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,0),b(te,Mt)&&M(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?lt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(lt,it.__webglTexture),Tt(lt,S,Mt),a&&S.mipmaps&&S.mipmaps.length>0)for(let dt=0;dt<S.mipmaps.length;dt++)Gt(H.__webglFramebuffer[dt],R,S,r.COLOR_ATTACHMENT0,lt,dt);else Gt(H.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,lt,0);b(S,Mt)&&M(lt),e.unbindTexture()}R.depthBuffer&&wt(R)}function le(R){const S=y(R)||a,H=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let it=0,et=H.length;it<et;it++){const rt=H[it];if(b(rt,S)){const Mt=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,lt=n.get(rt).__webglTexture;e.bindTexture(Mt,lt),M(Mt),e.unbindTexture()}}}function kt(R){if(a&&R.samples>0&&Qt(R)===!1){const S=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],H=R.width,it=R.height;let et=r.COLOR_BUFFER_BIT;const rt=[],Mt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(R),dt=R.isWebGLMultipleRenderTargets===!0;if(dt)for(let Pt=0;Pt<S.length;Pt++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Pt=0;Pt<S.length;Pt++){rt.push(r.COLOR_ATTACHMENT0+Pt),R.depthBuffer&&rt.push(Mt);const te=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(te===!1&&(R.depthBuffer&&(et|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(et|=r.STENCIL_BUFFER_BIT)),dt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Pt]),te===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Mt]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Mt])),dt){const st=n.get(S[Pt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,st,0)}r.blitFramebuffer(0,0,H,it,0,0,H,it,et,r.NEAREST),m&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rt)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),dt)for(let Pt=0;Pt<S.length;Pt++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Pt]);const te=n.get(S[Pt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pt,r.TEXTURE_2D,te,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function Nt(R){return Math.min(u,R.samples)}function Qt(R){const S=n.get(R);return a&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ge(R){const S=o.render.frame;_.get(R)!==S&&(_.set(R,S),R.update())}function Et(R,S){const H=R.colorSpace,it=R.format,et=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===go||H!==jn&&H!==xn&&(re.getTransfer(H)===ce?a===!1?t.has("EXT_sRGB")===!0&&it===Cn?(R.format=go,R.minFilter=_n,R.generateMipmaps=!1):S=wh.sRGBToLinear(S):(it!==Cn||et!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),S}this.allocateTextureUnit=Q,this.resetTextureUnits=z,this.setTexture2D=Z,this.setTexture2DArray=L,this.setTexture3D=D,this.setTextureCube=j,this.rebindTextures=Lt,this.setupRenderTarget=Ct,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Gt,this.useMultisampledRTT=Qt}function Xg(r,t,e){const n=e.isWebGL2;function i(s,o=xn){let a;const l=re.getTransfer(o);if(s===ui)return r.UNSIGNED_BYTE;if(s===mh)return r.UNSIGNED_SHORT_4_4_4_4;if(s===gh)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Ad)return r.BYTE;if(s===Rd)return r.SHORT;if(s===Oo)return r.UNSIGNED_SHORT;if(s===ph)return r.INT;if(s===ii)return r.UNSIGNED_INT;if(s===ri)return r.FLOAT;if(s===Kr)return n?r.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Cd)return r.ALPHA;if(s===Cn)return r.RGBA;if(s===Ld)return r.LUMINANCE;if(s===Pd)return r.LUMINANCE_ALPHA;if(s===Fi)return r.DEPTH_COMPONENT;if(s===Sr)return r.DEPTH_STENCIL;if(s===go)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Dd)return r.RED;if(s===_h)return r.RED_INTEGER;if(s===Ud)return r.RG;if(s===vh)return r.RG_INTEGER;if(s===xh)return r.RGBA_INTEGER;if(s===Sa||s===wa||s===Ea||s===Ta)if(l===ce)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Sa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===wa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ea)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ta)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Sa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===wa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ea)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ta)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Tl||s===bl||s===Al||s===Rl)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Tl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===bl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Al)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Rl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Id)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Cl||s===Ll)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Cl)return l===ce?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ll)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Pl||s===Dl||s===Ul||s===Il||s===Nl||s===Ol||s===Fl||s===zl||s===Bl||s===Gl||s===kl||s===Hl||s===Vl||s===Wl)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Pl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Dl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ul)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Il)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Nl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ol)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Fl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===zl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Bl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Gl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===kl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Hl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Vl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Wl)return l===ce?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ba||s===Xl||s===Yl)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===ba)return l===ce?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Xl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Yl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Nd||s===ql||s===jl||s===Kl)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===ba)return a.COMPRESSED_RED_RGTC1_EXT;if(s===ql)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Kl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Oi?n?r.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Yg extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class xt extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qg={type:"move"};class $a{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,n),f=this._getHandJoint(c,g);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,_=.005;c.inputState.pinching&&d>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(qg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new xt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class jg extends ln{constructor(t,e,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:Fi,h!==Fi&&h!==Sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fi&&(n=ii),n===void 0&&h===Sr&&(n=Oi),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:He,this.minFilter=l!==void 0?l:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Kg extends Pr{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,_=null;const g=e.getContextAttributes();let p=null,f=null;const w=[],x=[],y=new Ve;y.layers.enable(1),y.viewport=new Ce;const E=new Ve;E.layers.enable(2),E.viewport=new Ce;const b=[y,E],M=new Yg;M.layers.enable(1),M.layers.enable(2);let P=null,v=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let D=w[L];return D===void 0&&(D=new $a,w[L]=D),D.getTargetRaySpace()},this.getControllerGrip=function(L){let D=w[L];return D===void 0&&(D=new $a,w[L]=D),D.getGripSpace()},this.getHand=function(L){let D=w[L];return D===void 0&&(D=new $a,w[L]=D),D.getHandSpace()};function T(L){const D=x.indexOf(L.inputSource);if(D===-1)return;const j=w[D];j!==void 0&&(j.update(L.inputSource,L.frame,c||o),j.dispatchEvent({type:L.type,data:L.inputSource}))}function N(){i.removeEventListener("select",T),i.removeEventListener("selectstart",T),i.removeEventListener("selectend",T),i.removeEventListener("squeeze",T),i.removeEventListener("squeezestart",T),i.removeEventListener("squeezeend",T),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",F);for(let L=0;L<w.length;L++){const D=x[L];D!==null&&(x[L]=null,w[L].disconnect(D))}P=null,v=null,t.setRenderTarget(p),m=null,d=null,u=null,i=null,f=null,Z.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){s=L,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){a=L,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(L){if(i=L,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",T),i.addEventListener("selectstart",T),i.addEventListener("selectend",T),i.addEventListener("squeeze",T),i.addEventListener("squeezestart",T),i.addEventListener("squeezeend",T),i.addEventListener("end",N),i.addEventListener("inputsourceschange",F),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const D={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,e,D),i.updateRenderState({baseLayer:m}),f=new Wi(m.framebufferWidth,m.framebufferHeight,{format:Cn,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let D=null,j=null,tt=null;g.depth&&(tt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,D=g.stencil?Sr:Fi,j=g.stencil?Oi:ii);const nt={colorFormat:e.RGBA8,depthFormat:tt,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(nt),i.updateRenderState({layers:[d]}),f=new Wi(d.textureWidth,d.textureHeight,{format:Cn,type:ui,depthTexture:new jg(d.textureWidth,d.textureHeight,j,void 0,void 0,void 0,void 0,void 0,void 0,D),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const mt=t.properties.get(f);mt.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Z.setContext(i),Z.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function F(L){for(let D=0;D<L.removed.length;D++){const j=L.removed[D],tt=x.indexOf(j);tt>=0&&(x[tt]=null,w[tt].disconnect(j))}for(let D=0;D<L.added.length;D++){const j=L.added[D];let tt=x.indexOf(j);if(tt===-1){for(let mt=0;mt<w.length;mt++)if(mt>=x.length){x.push(j),tt=mt;break}else if(x[mt]===null){x[mt]=j,tt=mt;break}if(tt===-1)break}const nt=w[tt];nt&&nt.connect(j)}}const V=new B,C=new B;function I(L,D,j){V.setFromMatrixPosition(D.matrixWorld),C.setFromMatrixPosition(j.matrixWorld);const tt=V.distanceTo(C),nt=D.projectionMatrix.elements,mt=j.projectionMatrix.elements,Tt=nt[14]/(nt[10]-1),yt=nt[14]/(nt[10]+1),vt=(nt[9]+1)/nt[5],It=(nt[9]-1)/nt[5],Gt=(nt[8]-1)/nt[0],W=(mt[8]+1)/mt[0],Pe=Tt*Gt,wt=Tt*W,Lt=tt/(-Gt+W),Ct=Lt*-Gt;D.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(Ct),L.translateZ(Lt),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert();const le=Tt+Lt,kt=yt+Lt,Nt=Pe-Ct,Qt=wt+(tt-Ct),ge=vt*yt/kt*le,Et=It*yt/kt*le;L.projectionMatrix.makePerspective(Nt,Qt,ge,Et,le,kt),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}function G(L,D){D===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(D.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(i===null)return;M.near=E.near=y.near=L.near,M.far=E.far=y.far=L.far,(P!==M.near||v!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,v=M.far);const D=L.parent,j=M.cameras;G(M,D);for(let tt=0;tt<j.length;tt++)G(j[tt],D);j.length===2?I(M,y,E):M.projectionMatrix.copy(y.projectionMatrix),z(L,M,D)};function z(L,D,j){j===null?L.matrix.copy(D.matrixWorld):(L.matrix.copy(j.matrixWorld),L.matrix.invert(),L.matrix.multiply(D.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(D.projectionMatrix),L.projectionMatrixInverse.copy(D.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=Ks*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(L){l=L,d!==null&&(d.fixedFoveation=L),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=L)};let Q=null;function $(L,D){if(h=D.getViewerPose(c||o),_=D,h!==null){const j=h.views;m!==null&&(t.setRenderTargetFramebuffer(f,m.framebuffer),t.setRenderTarget(f));let tt=!1;j.length!==M.cameras.length&&(M.cameras.length=0,tt=!0);for(let nt=0;nt<j.length;nt++){const mt=j[nt];let Tt=null;if(m!==null)Tt=m.getViewport(mt);else{const vt=u.getViewSubImage(d,mt);Tt=vt.viewport,nt===0&&(t.setRenderTargetTextures(f,vt.colorTexture,d.ignoreDepthValues?void 0:vt.depthStencilTexture),t.setRenderTarget(f))}let yt=b[nt];yt===void 0&&(yt=new Ve,yt.layers.enable(nt),yt.viewport=new Ce,b[nt]=yt),yt.matrix.fromArray(mt.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(mt.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(Tt.x,Tt.y,Tt.width,Tt.height),nt===0&&(M.matrix.copy(yt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),tt===!0&&M.cameras.push(yt)}}for(let j=0;j<w.length;j++){const tt=x[j],nt=w[j];tt!==null&&nt!==void 0&&nt.update(tt,D,c||o)}Q&&Q(L,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),_=null}const Z=new Ih;Z.setAnimationLoop($),this.setAnimationLoop=function(L){Q=L},this.dispose=function(){}}}function Zg(r,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Ph(r)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function i(p,f,w,x,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),u(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,y)):f.isMeshMatcapMaterial?(s(p,f),_(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),g(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,w,x):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===We&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===We&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const w=t.get(f).envMap;if(w&&(p.envMap.value=w,p.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*x,e(f.lightMap,p.lightMapTransform)}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,w,x){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*w,p.scale.value=x*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),t.get(f).envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,w){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===We&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,f){f.matcap&&(p.matcap.value=f.matcap)}function g(p,f){const w=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $g(r,t,e,n){let i={},s={},o=[];const a=e.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(w,x){const y=x.program;n.uniformBlockBinding(w,y)}function c(w,x){let y=i[w.id];y===void 0&&(_(w),y=h(w),i[w.id]=y,w.addEventListener("dispose",p));const E=x.program;n.updateUBOMapping(w,E);const b=t.render.frame;s[w.id]!==b&&(d(w),s[w.id]=b)}function h(w){const x=u();w.__bindingPointIndex=x;const y=r.createBuffer(),E=w.__size,b=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,E,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const x=i[w.id],y=w.uniforms,E=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let b=0,M=y.length;b<M;b++){const P=y[b];if(m(P,b,E)===!0){const v=P.__offset,T=Array.isArray(P.value)?P.value:[P.value];let N=0;for(let F=0;F<T.length;F++){const V=T[F],C=g(V);typeof V=="number"?(P.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,v+N,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=V.elements[0],P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=V.elements[0],P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=V.elements[0]):(V.toArray(P.__data,N),N+=C.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,v,P.__data)}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(w,x,y){const E=w.value;if(y[x]===void 0){if(typeof E=="number")y[x]=E;else{const b=Array.isArray(E)?E:[E],M=[];for(let P=0;P<b.length;P++)M.push(b[P].clone());y[x]=M}return!0}else if(typeof E=="number"){if(y[x]!==E)return y[x]=E,!0}else{const b=Array.isArray(y[x])?y[x]:[y[x]],M=Array.isArray(E)?E:[E];for(let P=0;P<b.length;P++){const v=b[P];if(v.equals(M[P])===!1)return v.copy(M[P]),!0}}return!1}function _(w){const x=w.uniforms;let y=0;const E=16;let b=0;for(let M=0,P=x.length;M<P;M++){const v=x[M],T={boundary:0,storage:0},N=Array.isArray(v.value)?v.value:[v.value];for(let F=0,V=N.length;F<V;F++){const C=N[F],I=g(C);T.boundary+=I.boundary,T.storage+=I.storage}if(v.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),v.__offset=y,M>0){b=y%E;const F=E-b;b!==0&&F-T.boundary<0&&(y+=E-b,v.__offset=y)}y+=T.storage}return b=y%E,b>0&&(y+=E-b),w.__size=y,w.__cache={},this}function g(w){const x={boundary:0,storage:0};return typeof w=="number"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function p(w){const x=w.target;x.removeEventListener("dispose",p);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function f(){for(const w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:l,update:c,dispose:f}}class ua{constructor(t={}){const{canvas:e=jd(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const f=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this._useLegacyLights=!1,this.toneMapping=hi,this.toneMappingExposure=1;const x=this;let y=!1,E=0,b=0,M=null,P=-1,v=null;const T=new Ce,N=new Ce;let F=null;const V=new jt(0);let C=0,I=e.width,G=e.height,z=1,Q=null,$=null;const Z=new Ce(0,0,I,G),L=new Ce(0,0,I,G);let D=!1;const j=new zo;let tt=!1,nt=!1,mt=null;const Tt=new we,yt=new Jt,vt=new B,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Gt(){return M===null?z:1}let W=n;function Pe(A,k){for(let X=0;X<A.length;X++){const Y=A[X],K=e.getContext(Y,k);if(K!==null)return K}return null}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${No}`),e.addEventListener("webglcontextlost",$t,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",ut,!1),W===null){const k=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&k.shift(),W=Pe(k,A),W===null)throw Pe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&W instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let wt,Lt,Ct,le,kt,Nt,Qt,ge,Et,R,S,H,it,et,rt,Mt,lt,dt,Pt,te,st,ie,Ot,Dt;function bt(){wt=new o0(W),Lt=new e0(W,wt,t),wt.init(Lt),ie=new Xg(W,wt,Lt),Ct=new Vg(W,wt,Lt),le=new h0(W),kt=new Cg,Nt=new Wg(W,wt,Ct,kt,Lt,ie,le),Qt=new i0(x),ge=new a0(x),Et=new Mf(W,Lt),Ot=new Qm(W,wt,Et,Lt),R=new l0(W,Et,le,Ot),S=new p0(W,R,Et,le),Pt=new f0(W,Lt,Nt),Mt=new n0(kt),H=new Rg(x,Qt,ge,wt,Lt,Ot,Mt),it=new Zg(x,kt),et=new Pg,rt=new Fg(wt,Lt),dt=new Jm(x,Qt,ge,Ct,S,d,l),lt=new Hg(x,S,Lt),Dt=new $g(W,le,Lt,Ct),te=new t0(W,wt,le,Lt),st=new c0(W,wt,le,Lt),le.programs=H.programs,x.capabilities=Lt,x.extensions=wt,x.properties=kt,x.renderLists=et,x.shadowMap=lt,x.state=Ct,x.info=le}bt();const gt=new Kg(x,W);this.xr=gt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const A=wt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=wt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(A){A!==void 0&&(z=A,this.setSize(I,G,!1))},this.getSize=function(A){return A.set(I,G)},this.setSize=function(A,k,X=!0){if(gt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=A,G=k,e.width=Math.floor(A*z),e.height=Math.floor(k*z),X===!0&&(e.style.width=A+"px",e.style.height=k+"px"),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(I*z,G*z).floor()},this.setDrawingBufferSize=function(A,k,X){I=A,G=k,z=X,e.width=Math.floor(A*X),e.height=Math.floor(k*X),this.setViewport(0,0,A,k)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy(Z)},this.setViewport=function(A,k,X,Y){A.isVector4?Z.set(A.x,A.y,A.z,A.w):Z.set(A,k,X,Y),Ct.viewport(T.copy(Z).multiplyScalar(z).floor())},this.getScissor=function(A){return A.copy(L)},this.setScissor=function(A,k,X,Y){A.isVector4?L.set(A.x,A.y,A.z,A.w):L.set(A,k,X,Y),Ct.scissor(N.copy(L).multiplyScalar(z).floor())},this.getScissorTest=function(){return D},this.setScissorTest=function(A){Ct.setScissorTest(D=A)},this.setOpaqueSort=function(A){Q=A},this.setTransparentSort=function(A){$=A},this.getClearColor=function(A){return A.copy(dt.getClearColor())},this.setClearColor=function(){dt.setClearColor.apply(dt,arguments)},this.getClearAlpha=function(){return dt.getClearAlpha()},this.setClearAlpha=function(){dt.setClearAlpha.apply(dt,arguments)},this.clear=function(A=!0,k=!0,X=!0){let Y=0;if(A){let K=!1;if(M!==null){const ft=M.texture.format;K=ft===xh||ft===vh||ft===_h}if(K){const ft=M.texture.type,St=ft===ui||ft===ii||ft===Oo||ft===Oi||ft===mh||ft===gh,Rt=dt.getClearColor(),Ut=dt.getClearAlpha(),Xt=Rt.r,Ft=Rt.g,Ht=Rt.b;St?(m[0]=Xt,m[1]=Ft,m[2]=Ht,m[3]=Ut,W.clearBufferuiv(W.COLOR,0,m)):(_[0]=Xt,_[1]=Ft,_[2]=Ht,_[3]=Ut,W.clearBufferiv(W.COLOR,0,_))}else Y|=W.COLOR_BUFFER_BIT}k&&(Y|=W.DEPTH_BUFFER_BIT),X&&(Y|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$t,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),et.dispose(),rt.dispose(),kt.dispose(),Qt.dispose(),ge.dispose(),S.dispose(),Ot.dispose(),Dt.dispose(),H.dispose(),gt.dispose(),gt.removeEventListener("sessionstart",fn),gt.removeEventListener("sessionend",oe),mt&&(mt.dispose(),mt=null),Be.stop()};function $t(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const A=le.autoReset,k=lt.enabled,X=lt.autoUpdate,Y=lt.needsUpdate,K=lt.type;bt(),le.autoReset=A,lt.enabled=k,lt.autoUpdate=X,lt.needsUpdate=Y,lt.type=K}function ut(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function at(A){const k=A.target;k.removeEventListener("dispose",at),J(k)}function J(A){ot(A),kt.remove(A)}function ot(A){const k=kt.get(A).programs;k!==void 0&&(k.forEach(function(X){H.releaseProgram(X)}),A.isShaderMaterial&&H.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,X,Y,K,ft){k===null&&(k=It);const St=K.isMesh&&K.matrixWorld.determinant()<0,Rt=Wu(A,k,X,Y,K);Ct.setMaterial(Y,St);let Ut=X.index,Xt=1;if(Y.wireframe===!0){if(Ut=R.getWireframeAttribute(X),Ut===void 0)return;Xt=2}const Ft=X.drawRange,Ht=X.attributes.position;let _e=Ft.start*Xt,Qe=(Ft.start+Ft.count)*Xt;ft!==null&&(_e=Math.max(_e,ft.start*Xt),Qe=Math.min(Qe,(ft.start+ft.count)*Xt)),Ut!==null?(_e=Math.max(_e,0),Qe=Math.min(Qe,Ut.count)):Ht!=null&&(_e=Math.max(_e,0),Qe=Math.min(Qe,Ht.count));const Ae=Qe-_e;if(Ae<0||Ae===1/0)return;Ot.setup(K,Y,Rt,X,Ut);let zn,pe=te;if(Ut!==null&&(zn=Et.get(Ut),pe=st,pe.setIndex(zn)),K.isMesh)Y.wireframe===!0?(Ct.setLineWidth(Y.wireframeLinewidth*Gt()),pe.setMode(W.LINES)):pe.setMode(W.TRIANGLES);else if(K.isLine){let Kt=Y.linewidth;Kt===void 0&&(Kt=1),Ct.setLineWidth(Kt*Gt()),K.isLineSegments?pe.setMode(W.LINES):K.isLineLoop?pe.setMode(W.LINE_LOOP):pe.setMode(W.LINE_STRIP)}else K.isPoints?pe.setMode(W.POINTS):K.isSprite&&pe.setMode(W.TRIANGLES);if(K.isInstancedMesh)pe.renderInstances(_e,Ae,K.count);else if(X.isInstancedBufferGeometry){const Kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,_a=Math.min(X.instanceCount,Kt);pe.renderInstances(_e,Ae,_a)}else pe.render(_e,Ae)};function At(A,k,X){A.transparent===!0&&A.side===vn&&A.forceSinglePass===!1?(A.side=We,A.needsUpdate=!0,fs(A,k,X),A.side=pi,A.needsUpdate=!0,fs(A,k,X),A.side=vn):fs(A,k,X)}this.compile=function(A,k,X=null){X===null&&(X=A),p=rt.get(X),p.init(),w.push(p),X.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),A!==X&&A.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights(x._useLegacyLights);const Y=new Set;return A.traverse(function(K){const ft=K.material;if(ft)if(Array.isArray(ft))for(let St=0;St<ft.length;St++){const Rt=ft[St];At(Rt,X,K),Y.add(Rt)}else At(ft,X,K),Y.add(ft)}),w.pop(),p=null,Y},this.compileAsync=function(A,k,X=null){const Y=this.compile(A,k,X);return new Promise(K=>{function ft(){if(Y.forEach(function(St){kt.get(St).currentProgram.isReady()&&Y.delete(St)}),Y.size===0){K(A);return}setTimeout(ft,10)}wt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let ee=null;function xe(A){ee&&ee(A)}function fn(){Be.stop()}function oe(){Be.start()}const Be=new Ih;Be.setAnimationLoop(xe),typeof self<"u"&&Be.setContext(self),this.setAnimationLoop=function(A){ee=A,gt.setAnimationLoop(A),A===null?Be.stop():Be.start()},gt.addEventListener("sessionstart",fn),gt.addEventListener("sessionend",oe),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),gt.enabled===!0&&gt.isPresenting===!0&&(gt.cameraAutoUpdate===!0&&gt.updateCamera(k),k=gt.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,k,M),p=rt.get(A,w.length),p.init(),w.push(p),Tt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),j.setFromProjectionMatrix(Tt),nt=this.localClippingEnabled,tt=Mt.init(this.clippingPlanes,nt),g=et.get(A,f.length),g.init(),f.push(g),Pn(A,k,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(Q,$),this.info.render.frame++,tt===!0&&Mt.beginShadows();const X=p.state.shadowsArray;if(lt.render(X,A,k),tt===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset(),dt.render(g,A),p.setupLights(x._useLegacyLights),k.isArrayCamera){const Y=k.cameras;for(let K=0,ft=Y.length;K<ft;K++){const St=Y[K];dl(g,A,St,St.viewport)}}else dl(g,A,k);M!==null&&(Nt.updateMultisampleRenderTarget(M),Nt.updateRenderTargetMipmap(M)),A.isScene===!0&&A.onAfterRender(x,A,k),Ot.resetDefaultState(),P=-1,v=null,w.pop(),w.length>0?p=w[w.length-1]:p=null,f.pop(),f.length>0?g=f[f.length-1]:g=null};function Pn(A,k,X,Y){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||j.intersectsSprite(A)){Y&&vt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Tt);const St=S.update(A),Rt=A.material;Rt.visible&&g.push(A,St,Rt,X,vt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||j.intersectsObject(A))){const St=S.update(A),Rt=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),vt.copy(A.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),vt.copy(St.boundingSphere.center)),vt.applyMatrix4(A.matrixWorld).applyMatrix4(Tt)),Array.isArray(Rt)){const Ut=St.groups;for(let Xt=0,Ft=Ut.length;Xt<Ft;Xt++){const Ht=Ut[Xt],_e=Rt[Ht.materialIndex];_e&&_e.visible&&g.push(A,St,_e,X,vt.z,Ht)}}else Rt.visible&&g.push(A,St,Rt,X,vt.z,null)}}const ft=A.children;for(let St=0,Rt=ft.length;St<Rt;St++)Pn(ft[St],k,X,Y)}function dl(A,k,X,Y){const K=A.opaque,ft=A.transmissive,St=A.transparent;p.setupLightsView(X),tt===!0&&Mt.setGlobalState(x.clippingPlanes,X),ft.length>0&&Vu(K,ft,k,X),Y&&Ct.viewport(T.copy(Y)),K.length>0&&ds(K,k,X),ft.length>0&&ds(ft,k,X),St.length>0&&ds(St,k,X),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function Vu(A,k,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const ft=Lt.isWebGL2;mt===null&&(mt=new Wi(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")?Kr:ui,minFilter:jr,samples:ft?4:0})),x.getDrawingBufferSize(yt),ft?mt.setSize(yt.x,yt.y):mt.setSize(_o(yt.x),_o(yt.y));const St=x.getRenderTarget();x.setRenderTarget(mt),x.getClearColor(V),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Rt=x.toneMapping;x.toneMapping=hi,ds(A,X,Y),Nt.updateMultisampleRenderTarget(mt),Nt.updateRenderTargetMipmap(mt);let Ut=!1;for(let Xt=0,Ft=k.length;Xt<Ft;Xt++){const Ht=k[Xt],_e=Ht.object,Qe=Ht.geometry,Ae=Ht.material,zn=Ht.group;if(Ae.side===vn&&_e.layers.test(Y.layers)){const pe=Ae.side;Ae.side=We,Ae.needsUpdate=!0,fl(_e,X,Y,Qe,Ae,zn),Ae.side=pe,Ae.needsUpdate=!0,Ut=!0}}Ut===!0&&(Nt.updateMultisampleRenderTarget(mt),Nt.updateRenderTargetMipmap(mt)),x.setRenderTarget(St),x.setClearColor(V,C),x.toneMapping=Rt}function ds(A,k,X){const Y=k.isScene===!0?k.overrideMaterial:null;for(let K=0,ft=A.length;K<ft;K++){const St=A[K],Rt=St.object,Ut=St.geometry,Xt=Y===null?St.material:Y,Ft=St.group;Rt.layers.test(X.layers)&&fl(Rt,k,X,Ut,Xt,Ft)}}function fl(A,k,X,Y,K,ft){A.onBeforeRender(x,k,X,Y,K,ft),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),K.onBeforeRender(x,k,X,Y,A,ft),K.transparent===!0&&K.side===vn&&K.forceSinglePass===!1?(K.side=We,K.needsUpdate=!0,x.renderBufferDirect(X,k,Y,K,A,ft),K.side=pi,K.needsUpdate=!0,x.renderBufferDirect(X,k,Y,K,A,ft),K.side=vn):x.renderBufferDirect(X,k,Y,K,A,ft),A.onAfterRender(x,k,X,Y,K,ft)}function fs(A,k,X){k.isScene!==!0&&(k=It);const Y=kt.get(A),K=p.state.lights,ft=p.state.shadowsArray,St=K.state.version,Rt=H.getParameters(A,K.state,ft,k,X),Ut=H.getProgramCacheKey(Rt);let Xt=Y.programs;Y.environment=A.isMeshStandardMaterial?k.environment:null,Y.fog=k.fog,Y.envMap=(A.isMeshStandardMaterial?ge:Qt).get(A.envMap||Y.environment),Xt===void 0&&(A.addEventListener("dispose",at),Xt=new Map,Y.programs=Xt);let Ft=Xt.get(Ut);if(Ft!==void 0){if(Y.currentProgram===Ft&&Y.lightsStateVersion===St)return ml(A,Rt),Ft}else Rt.uniforms=H.getUniforms(A),A.onBuild(X,Rt,x),A.onBeforeCompile(Rt,x),Ft=H.acquireProgram(Rt,Ut),Xt.set(Ut,Ft),Y.uniforms=Rt.uniforms;const Ht=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ht.clippingPlanes=Mt.uniform),ml(A,Rt),Y.needsLights=Yu(A),Y.lightsStateVersion=St,Y.needsLights&&(Ht.ambientLightColor.value=K.state.ambient,Ht.lightProbe.value=K.state.probe,Ht.directionalLights.value=K.state.directional,Ht.directionalLightShadows.value=K.state.directionalShadow,Ht.spotLights.value=K.state.spot,Ht.spotLightShadows.value=K.state.spotShadow,Ht.rectAreaLights.value=K.state.rectArea,Ht.ltc_1.value=K.state.rectAreaLTC1,Ht.ltc_2.value=K.state.rectAreaLTC2,Ht.pointLights.value=K.state.point,Ht.pointLightShadows.value=K.state.pointShadow,Ht.hemisphereLights.value=K.state.hemi,Ht.directionalShadowMap.value=K.state.directionalShadowMap,Ht.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ht.spotShadowMap.value=K.state.spotShadowMap,Ht.spotLightMatrix.value=K.state.spotLightMatrix,Ht.spotLightMap.value=K.state.spotLightMap,Ht.pointShadowMap.value=K.state.pointShadowMap,Ht.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.currentProgram=Ft,Y.uniformsList=null,Ft}function pl(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=Bs.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function ml(A,k){const X=kt.get(A);X.outputColorSpace=k.outputColorSpace,X.instancing=k.instancing,X.instancingColor=k.instancingColor,X.skinning=k.skinning,X.morphTargets=k.morphTargets,X.morphNormals=k.morphNormals,X.morphColors=k.morphColors,X.morphTargetsCount=k.morphTargetsCount,X.numClippingPlanes=k.numClippingPlanes,X.numIntersection=k.numClipIntersection,X.vertexAlphas=k.vertexAlphas,X.vertexTangents=k.vertexTangents,X.toneMapping=k.toneMapping}function Wu(A,k,X,Y,K){k.isScene!==!0&&(k=It),Nt.resetTextureUnits();const ft=k.fog,St=Y.isMeshStandardMaterial?k.environment:null,Rt=M===null?x.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:jn,Ut=(Y.isMeshStandardMaterial?ge:Qt).get(Y.envMap||St),Xt=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ft=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ht=!!X.morphAttributes.position,_e=!!X.morphAttributes.normal,Qe=!!X.morphAttributes.color;let Ae=hi;Y.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Ae=x.toneMapping);const zn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,pe=zn!==void 0?zn.length:0,Kt=kt.get(Y),_a=p.state.lights;if(tt===!0&&(nt===!0||A!==v)){const tn=A===v&&Y.id===P;Mt.setState(Y,A,tn)}let Me=!1;Y.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==_a.state.version||Kt.outputColorSpace!==Rt||K.isInstancedMesh&&Kt.instancing===!1||!K.isInstancedMesh&&Kt.instancing===!0||K.isSkinnedMesh&&Kt.skinning===!1||!K.isSkinnedMesh&&Kt.skinning===!0||K.isInstancedMesh&&Kt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Kt.instancingColor===!1&&K.instanceColor!==null||Kt.envMap!==Ut||Y.fog===!0&&Kt.fog!==ft||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Mt.numPlanes||Kt.numIntersection!==Mt.numIntersection)||Kt.vertexAlphas!==Xt||Kt.vertexTangents!==Ft||Kt.morphTargets!==Ht||Kt.morphNormals!==_e||Kt.morphColors!==Qe||Kt.toneMapping!==Ae||Lt.isWebGL2===!0&&Kt.morphTargetsCount!==pe)&&(Me=!0):(Me=!0,Kt.__version=Y.version);let Mi=Kt.currentProgram;Me===!0&&(Mi=fs(Y,k,K));let gl=!1,Ir=!1,va=!1;const Ge=Mi.getUniforms(),yi=Kt.uniforms;if(Ct.useProgram(Mi.program)&&(gl=!0,Ir=!0,va=!0),Y.id!==P&&(P=Y.id,Ir=!0),gl||v!==A){Ge.setValue(W,"projectionMatrix",A.projectionMatrix),Ge.setValue(W,"viewMatrix",A.matrixWorldInverse);const tn=Ge.map.cameraPosition;tn!==void 0&&tn.setValue(W,vt.setFromMatrixPosition(A.matrixWorld)),Lt.logarithmicDepthBuffer&&Ge.setValue(W,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ge.setValue(W,"isOrthographic",A.isOrthographicCamera===!0),v!==A&&(v=A,Ir=!0,va=!0)}if(K.isSkinnedMesh){Ge.setOptional(W,K,"bindMatrix"),Ge.setOptional(W,K,"bindMatrixInverse");const tn=K.skeleton;tn&&(Lt.floatVertexTextures?(tn.boneTexture===null&&tn.computeBoneTexture(),Ge.setValue(W,"boneTexture",tn.boneTexture,Nt),Ge.setValue(W,"boneTextureSize",tn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const xa=X.morphAttributes;if((xa.position!==void 0||xa.normal!==void 0||xa.color!==void 0&&Lt.isWebGL2===!0)&&Pt.update(K,X,Mi),(Ir||Kt.receiveShadow!==K.receiveShadow)&&(Kt.receiveShadow=K.receiveShadow,Ge.setValue(W,"receiveShadow",K.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(yi.envMap.value=Ut,yi.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),Ir&&(Ge.setValue(W,"toneMappingExposure",x.toneMappingExposure),Kt.needsLights&&Xu(yi,va),ft&&Y.fog===!0&&it.refreshFogUniforms(yi,ft),it.refreshMaterialUniforms(yi,Y,z,G,mt),Bs.upload(W,pl(Kt),yi,Nt)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Bs.upload(W,pl(Kt),yi,Nt),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ge.setValue(W,"center",K.center),Ge.setValue(W,"modelViewMatrix",K.modelViewMatrix),Ge.setValue(W,"normalMatrix",K.normalMatrix),Ge.setValue(W,"modelMatrix",K.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const tn=Y.uniformsGroups;for(let Ma=0,qu=tn.length;Ma<qu;Ma++)if(Lt.isWebGL2){const _l=tn[Ma];Dt.update(_l,Mi),Dt.bind(_l,Mi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mi}function Xu(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function Yu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(A,k,X){kt.get(A.texture).__webglTexture=k,kt.get(A.depthTexture).__webglTexture=X;const Y=kt.get(A);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,k){const X=kt.get(A);X.__webglFramebuffer=k,X.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(A,k=0,X=0){M=A,E=k,b=X;let Y=!0,K=null,ft=!1,St=!1;if(A){const Ut=kt.get(A);Ut.__useDefaultFramebuffer!==void 0?(Ct.bindFramebuffer(W.FRAMEBUFFER,null),Y=!1):Ut.__webglFramebuffer===void 0?Nt.setupRenderTarget(A):Ut.__hasExternalTextures&&Nt.rebindTextures(A,kt.get(A.texture).__webglTexture,kt.get(A.depthTexture).__webglTexture);const Xt=A.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(St=!0);const Ft=kt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ft[k])?K=Ft[k][X]:K=Ft[k],ft=!0):Lt.isWebGL2&&A.samples>0&&Nt.useMultisampledRTT(A)===!1?K=kt.get(A).__webglMultisampledFramebuffer:Array.isArray(Ft)?K=Ft[X]:K=Ft,T.copy(A.viewport),N.copy(A.scissor),F=A.scissorTest}else T.copy(Z).multiplyScalar(z).floor(),N.copy(L).multiplyScalar(z).floor(),F=D;if(Ct.bindFramebuffer(W.FRAMEBUFFER,K)&&Lt.drawBuffers&&Y&&Ct.drawBuffers(A,K),Ct.viewport(T),Ct.scissor(N),Ct.setScissorTest(F),ft){const Ut=kt.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ut.__webglTexture,X)}else if(St){const Ut=kt.get(A.texture),Xt=k||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ut.__webglTexture,X||0,Xt)}P=-1},this.readRenderTargetPixels=function(A,k,X,Y,K,ft,St){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=kt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&St!==void 0&&(Rt=Rt[St]),Rt){Ct.bindFramebuffer(W.FRAMEBUFFER,Rt);try{const Ut=A.texture,Xt=Ut.format,Ft=Ut.type;if(Xt!==Cn&&ie.convert(Xt)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ht=Ft===Kr&&(wt.has("EXT_color_buffer_half_float")||Lt.isWebGL2&&wt.has("EXT_color_buffer_float"));if(Ft!==ui&&ie.convert(Ft)!==W.getParameter(W.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ft===ri&&(Lt.isWebGL2||wt.has("OES_texture_float")||wt.has("WEBGL_color_buffer_float")))&&!Ht){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-Y&&X>=0&&X<=A.height-K&&W.readPixels(k,X,Y,K,ie.convert(Xt),ie.convert(Ft),ft)}finally{const Ut=M!==null?kt.get(M).__webglFramebuffer:null;Ct.bindFramebuffer(W.FRAMEBUFFER,Ut)}}},this.copyFramebufferToTexture=function(A,k,X=0){const Y=Math.pow(2,-X),K=Math.floor(k.image.width*Y),ft=Math.floor(k.image.height*Y);Nt.setTexture2D(k,0),W.copyTexSubImage2D(W.TEXTURE_2D,X,0,0,A.x,A.y,K,ft),Ct.unbindTexture()},this.copyTextureToTexture=function(A,k,X,Y=0){const K=k.image.width,ft=k.image.height,St=ie.convert(X.format),Rt=ie.convert(X.type);Nt.setTexture2D(X,0),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,X.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,X.unpackAlignment),k.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Y,A.x,A.y,K,ft,St,Rt,k.image.data):k.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Y,A.x,A.y,k.mipmaps[0].width,k.mipmaps[0].height,St,k.mipmaps[0].data):W.texSubImage2D(W.TEXTURE_2D,Y,A.x,A.y,St,Rt,k.image),Y===0&&X.generateMipmaps&&W.generateMipmap(W.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(A,k,X,Y,K=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ft=A.max.x-A.min.x+1,St=A.max.y-A.min.y+1,Rt=A.max.z-A.min.z+1,Ut=ie.convert(Y.format),Xt=ie.convert(Y.type);let Ft;if(Y.isData3DTexture)Nt.setTexture3D(Y,0),Ft=W.TEXTURE_3D;else if(Y.isDataArrayTexture)Nt.setTexture2DArray(Y,0),Ft=W.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Y.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,Y.unpackAlignment);const Ht=W.getParameter(W.UNPACK_ROW_LENGTH),_e=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Qe=W.getParameter(W.UNPACK_SKIP_PIXELS),Ae=W.getParameter(W.UNPACK_SKIP_ROWS),zn=W.getParameter(W.UNPACK_SKIP_IMAGES),pe=X.isCompressedTexture?X.mipmaps[0]:X.image;W.pixelStorei(W.UNPACK_ROW_LENGTH,pe.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,pe.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,A.min.x),W.pixelStorei(W.UNPACK_SKIP_ROWS,A.min.y),W.pixelStorei(W.UNPACK_SKIP_IMAGES,A.min.z),X.isDataTexture||X.isData3DTexture?W.texSubImage3D(Ft,K,k.x,k.y,k.z,ft,St,Rt,Ut,Xt,pe.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Ft,K,k.x,k.y,k.z,ft,St,Rt,Ut,pe.data)):W.texSubImage3D(Ft,K,k.x,k.y,k.z,ft,St,Rt,Ut,Xt,pe),W.pixelStorei(W.UNPACK_ROW_LENGTH,Ht),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,_e),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Qe),W.pixelStorei(W.UNPACK_SKIP_ROWS,Ae),W.pixelStorei(W.UNPACK_SKIP_IMAGES,zn),K===0&&Y.generateMipmaps&&W.generateMipmap(Ft),Ct.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?Nt.setTextureCube(A,0):A.isData3DTexture?Nt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Nt.setTexture2DArray(A,0):Nt.setTexture2D(A,0),Ct.unbindTexture()},this.resetState=function(){E=0,b=0,M=null,Ct.reset(),Ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Fo?"display-p3":"srgb",e.unpackColorSpace=re.workingColorSpace===oa?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(t){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!t}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===De?zi:Mh}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===zi?De:jn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Jg extends ua{}Jg.prototype.isWebGL1Renderer=!0;class hs{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new jt(t),this.density=e}clone(){return new hs(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Go extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Gh extends Dr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const zc=new we,xo=new bh,Os=new la,Fs=new B;class Qg extends Ee{constructor(t=new hn,e=new Gh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(i),Os.radius+=s,t.ray.intersectsSphere(Os)===!1)return;zc.copy(i).invert(),xo.copy(t.ray).applyMatrix4(zc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let _=d,g=m;_<g;_++){const p=c.getX(_);Fs.fromBufferAttribute(u,p),Bc(Fs,p,l,i,t,e,this)}}else{const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=d,g=m;_<g;_++)Fs.fromBufferAttribute(u,_),Bc(Fs,_,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Bc(r,t,e,n,i,s,o){const a=xo.distanceSqToPoint(r);if(a<e){const l=new B;xo.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class zt extends hn{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],m=[];let _=0;const g=[],p=n/2;let f=0;w(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Fe(u,3)),this.setAttribute("normal",new Fe(d,3)),this.setAttribute("uv",new Fe(m,2));function w(){const y=new B,E=new B;let b=0;const M=(e-t)/n;for(let P=0;P<=s;P++){const v=[],T=P/s,N=T*(e-t)+t;for(let F=0;F<=i;F++){const V=F/i,C=V*l+a,I=Math.sin(C),G=Math.cos(C);E.x=N*I,E.y=-T*n+p,E.z=N*G,u.push(E.x,E.y,E.z),y.set(I,M,G).normalize(),d.push(y.x,y.y,y.z),m.push(V,1-T),v.push(_++)}g.push(v)}for(let P=0;P<i;P++)for(let v=0;v<s;v++){const T=g[v][P],N=g[v+1][P],F=g[v+1][P+1],V=g[v][P+1];h.push(T,N,V),h.push(N,F,V),b+=6}c.addGroup(f,b,0),f+=b}function x(y){const E=_,b=new Jt,M=new B;let P=0;const v=y===!0?t:e,T=y===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,p*T,0),d.push(0,T,0),m.push(.5,.5),_++;const N=_;for(let F=0;F<=i;F++){const C=F/i*l+a,I=Math.cos(C),G=Math.sin(C);M.x=v*G,M.y=p*T,M.z=v*I,u.push(M.x,M.y,M.z),d.push(0,T,0),b.x=I*.5+.5,b.y=G*.5*T+.5,m.push(b.x,b.y),_++}for(let F=0;F<i;F++){const V=E+F,C=N+F;y===!0?h.push(C,C+1,V):h.push(C+1,C,V),P+=3}c.addGroup(f,P,y===!0?1:2),f+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zr extends zt{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Zr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ko extends hn{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,m=new B,_=new Jt;for(let g=0;g<=i;g++){for(let p=0;p<=n;p++){const f=s+p/n*o;m.x=u*Math.cos(f),m.y=u*Math.sin(f),l.push(m.x,m.y,m.z),c.push(0,0,1),_.x=(m.x/e+1)/2,_.y=(m.y/e+1)/2,h.push(_.x,_.y)}u+=d}for(let g=0;g<i;g++){const p=g*(n+1);for(let f=0;f<n;f++){const w=f+p,x=w,y=w+n+1,E=w+n+2,b=w+1;a.push(x,y,b),a.push(y,E,b)}}this.setIndex(a),this.setAttribute("position",new Fe(l,3)),this.setAttribute("normal",new Fe(c,3)),this.setAttribute("uv",new Fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ko(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Wt extends hn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new B,d=new B,m=[],_=[],g=[],p=[];for(let f=0;f<=n;f++){const w=[],x=f/n;let y=0;f===0&&o===0?y=.5/e:f===n&&l===Math.PI&&(y=-.5/e);for(let E=0;E<=e;E++){const b=E/e;u.x=-t*Math.cos(i+b*s)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+b*s)*Math.sin(o+x*a),_.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),p.push(b+y,1-x),w.push(c++)}h.push(w)}for(let f=0;f<n;f++)for(let w=0;w<e;w++){const x=h[f][w+1],y=h[f][w],E=h[f+1][w],b=h[f+1][w+1];(f!==0||o>0)&&m.push(x,y,b),(f!==n-1||l<Math.PI)&&m.push(y,E,b)}this.setIndex(m),this.setAttribute("position",new Fe(_,3)),this.setAttribute("normal",new Fe(g,3)),this.setAttribute("uv",new Fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class pt extends Dr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yh,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ho extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class Vo extends Ho{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ja=new we,Gc=new B,kc=new B;class kh{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zo,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Gc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gc),kc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kc),e.updateMatrixWorld(),Ja.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ja)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class t_ extends kh{constructor(){super(new Ve(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Ks*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class e_ extends Ho{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new t_}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class n_ extends kh{constructor(){super(new Nh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wo extends Ho{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new n_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Xo{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Hc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Hc(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);function Xn(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Hh(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var cn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},$r={duration:.5,overwrite:!1,delay:0},Yo,Ue,he,Mn=1e8,ae=1/Mn,Mo=Math.PI*2,i_=Mo/4,r_=0,Vh=Math.sqrt,s_=Math.cos,a_=Math.sin,Le=function(t){return typeof t=="string"},me=function(t){return typeof t=="function"},Zn=function(t){return typeof t=="number"},qo=function(t){return typeof t>"u"},Fn=function(t){return typeof t=="object"},je=function(t){return t!==!1},jo=function(){return typeof window<"u"},zs=function(t){return me(t)||Le(t)},Wh=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ze=Array.isArray,o_=/random\([^)]+\)/g,l_=/,\s*/g,Vc=/(?:-?\.?\d|\.)+/gi,Xh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,dr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Qa=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Yh=/[+-]=-?[.\d]+/,c_=/[^,'"\[\]\s]+/gi,h_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,de,Dn,yo,Ko,un={},$s={},qh,jh=function(t){return($s=Er(t,un))&&Je},Zo=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Jr=function(t,e){return!e&&console.warn(t)},Kh=function(t,e){return t&&(un[t]=e)&&$s&&($s[t]=e)||un},Qr=function(){return 0},u_={suppressEvents:!0,isStart:!0,kill:!1},Gs={suppressEvents:!0,kill:!1},d_={suppressEvents:!0},$o={},di=[],So={},Zh,rn={},to={},Wc=30,ks=[],Jo="",Qo=function(t){var e=t[0],n,i;if(Fn(e)||me(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=ks.length;i--&&!ks[i].targetTest(e););n=ks[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new vu(t[i],n)))||t.splice(i,1);return t},Bi=function(t){return t._gsap||Qo(yn(t))[0]._gsap},$h=function(t,e,n){return(n=t[e])&&me(n)?t[e]():qo(n)&&t.getAttribute&&t.getAttribute(e)||n},Ke=function(t,e){return(t=t.split(",")).forEach(e)||t},ve=function(t){return Math.round(t*1e5)/1e5||0},ue=function(t){return Math.round(t*1e7)/1e7||0},gr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},f_=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Js=function(){var t=di.length,e=di.slice(0),n,i;for(So={},di.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},tl=function(t){return!!(t._initted||t._startAt||t.add)},Jh=function(t,e,n,i){di.length&&!Ue&&Js(),t.render(e,n,!!(Ue&&e<0&&tl(t))),di.length&&!Ue&&Js()},Qh=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(c_).length<2?e:Le(t)?t.trim():t},tu=function(t){return t},dn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},p_=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Er=function(t,e){for(var n in e)t[n]=e[n];return t},Xc=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Fn(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Qs=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Xr=function(t){var e=t.parent||de,n=t.keyframes?p_(ze(t.keyframes)):dn;if(je(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},m_=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},eu=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},da=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},mi=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Gi=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},g_=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},wo=function(t,e,n,i){return t._startAt&&(Ue?t._startAt.revert(Gs):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},__=function r(t){return!t||t._ts&&r(t.parent)},Yc=function(t){return t._repeat?Tr(t._tTime,t=t.duration()+t._rDelay)*t:0},Tr=function(t,e){var n=Math.floor(t=ue(t/e));return t&&n===t?n-1:n},ta=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},fa=function(t){return t._end=ue(t._start+(t._tDur/Math.abs(t._ts||t._rts||ae)||0))},pa=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=ue(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),fa(t),n._dirty||Gi(n,t)),t},nu=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=ta(t.rawTime(),e),(!e._dur||us(0,e.totalDuration(),n)-e._tTime>ae)&&e.render(n,!0)),Gi(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ae}},Nn=function(t,e,n,i){return e.parent&&mi(e),e._start=ue((Zn(n)?n:n||t!==de?mn(t,n,e):t._time)+e._delay),e._end=ue(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),eu(t,e,"_first","_last",t._sort?"_start":0),Eo(e)||(t._recent=e),i||nu(t,e),t._ts<0&&pa(t,t._tTime),t},iu=function(t,e){return(un.ScrollTrigger||Zo("scrollTrigger",e))&&un.ScrollTrigger.create(e,t)},ru=function(t,e,n,i,s){if(nl(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Ue&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Zh!==sn.frame)return di.push(t),t._lazy=[s,i],1},v_=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Eo=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},x_=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&v_(t)&&!(!t._initted&&Eo(t))||(t._ts<0||t._dp._ts<0)&&!Eo(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=us(0,t._tDur,e),h=Tr(l,a),t._yoyo&&h&1&&(o=1-o),h!==Tr(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||Ue||i||t._zTime===ae||!e&&t._zTime){if(!t._initted&&ru(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?ae:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&wo(t,e,n,!0),t._onUpdate&&!n&&an(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&an(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&mi(t,1),!n&&!Ue&&(an(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},M_=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},br=function(t,e,n,i){var s=t._repeat,o=ue(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:ue(o*(s+1)+t._rDelay*s):o,a>0&&!i&&pa(t,t._tTime=t._tDur*a),t.parent&&fa(t),n||Gi(t.parent,t),t},qc=function(t){return t instanceof qe?Gi(t):br(t,t._dur)},y_={_start:0,endTime:Qr,totalDuration:Qr},mn=function r(t,e,n){var i=t.labels,s=t._recent||y_,o=t.duration()>=Mn?s.endTime(!1):t._dur,a,l,c;return Le(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(ze(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Yr=function(t,e,n){var i=Zn(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=je(l.vars.inherit)&&l.parent;o.immediateRender=je(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new Se(e[0],o,e[s+1])},xi=function(t,e){return t||t===0?e(t):e},us=function(t,e,n){return n<t?t:n>e?e:n},Oe=function(t,e){return!Le(t)||!(e=h_.exec(t))?"":e[1]},S_=function(t,e,n){return xi(n,function(i){return us(t,e,i)})},To=[].slice,su=function(t,e){return t&&Fn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Fn(t[0]))&&!t.nodeType&&t!==Dn},w_=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Le(i)&&!e||su(i,1)?(s=n).push.apply(s,yn(i)):n.push(i)})||n},yn=function(t,e,n){return he&&!e&&he.selector?he.selector(t):Le(t)&&!n&&(yo||!Ar())?To.call((e||Ko).querySelectorAll(t),0):ze(t)?w_(t,n):su(t)?To.call(t,0):t?[t]:[]},bo=function(t){return t=yn(t)[0]||Jr("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return yn(e,n.querySelectorAll?n:n===t?Jr("Invalid scope")||Ko.createElement("div"):t)}},au=function(t){return t.sort(function(){return .5-Math.random()})},ou=function(t){if(me(t))return t;var e=Fn(t)?t:{each:t},n=ki(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,u=i;return Le(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],u=i[1]),function(d,m,_){var g=(_||e).length,p=o[g],f,w,x,y,E,b,M,P,v;if(!p){if(v=e.grid==="auto"?0:(e.grid||[1,Mn])[1],!v){for(M=-Mn;M<(M=_[v++].getBoundingClientRect().left)&&v<g;);v<g&&v--}for(p=o[g]=[],f=l?Math.min(v,g)*h-.5:i%v,w=v===Mn?0:l?g*u/v-.5:i/v|0,M=0,P=Mn,b=0;b<g;b++)x=b%v-f,y=w-(b/v|0),p[b]=E=c?Math.abs(c==="y"?y:x):Vh(x*x+y*y),E>M&&(M=E),E<P&&(P=E);i==="random"&&au(p),p.max=M-P,p.min=P,p.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(v>g?g-1:c?c==="y"?g/v:v:Math.max(v,g/v))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=Oe(e.amount||e.each)||0,n=n&&g<0?O_(n):n}return g=(p[d]-p.min)/p.max||0,ue(p.b+(n?n(g):g)*p.v)+p.u}},Ao=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=ue(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Zn(n)?0:Oe(n))}},lu=function(t,e){var n=ze(t),i,s;return!n&&Fn(t)&&(i=n=t.radius||Mn,t.values?(t=yn(t.values),(s=!Zn(t[0]))&&(i*=i)):t=Ao(t.increment)),xi(e,n?me(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Mn,h=0,u=t.length,d,m;u--;)s?(d=t[u].x-a,m=t[u].y-l,d=d*d+m*m):d=Math.abs(t[u]-a),d<c&&(c=d,h=u);return h=!i||c<=i?t[h]:o,s||h===o||Zn(o)?h:h+Oe(o)}:Ao(t))},cu=function(t,e,n,i){return xi(ze(t)?!e:n===!0?!!(n=0):!i,function(){return ze(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},E_=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},T_=function(t,e){return function(n){return t(parseFloat(n))+(e||Oe(n))}},b_=function(t,e,n){return uu(t,e,0,1,n)},hu=function(t,e,n){return xi(n,function(i){return t[~~e(i)]})},A_=function r(t,e,n){var i=e-t;return ze(t)?hu(t,r(0,t.length),e):xi(n,function(s){return(i+(s-t)%i)%i+t})},R_=function r(t,e,n){var i=e-t,s=i*2;return ze(t)?hu(t,r(0,t.length-1),e):xi(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},ts=function(t){return t.replace(o_,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(l_);return cu(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},uu=function(t,e,n,i,s){var o=e-t,a=i-n;return xi(s,function(l){return n+((l-t)/o*a||0)})},C_=function r(t,e,n,i){var s=isNaN(t+e)?0:function(m){return(1-m)*t+m*e};if(!s){var o=Le(t),a={},l,c,h,u,d;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(ze(t)&&!ze(e)){for(h=[],u=t.length,d=u-2,c=1;c<u;c++)h.push(r(t[c-1],t[c]));u--,s=function(_){_*=u;var g=Math.min(d,~~_);return h[g](_-g)},n=e}else i||(t=Er(ze(t)?[]:{},t));if(!h){for(l in e)el.call(a,t,l,"get",e[l]);s=function(_){return sl(_,a)||(o?t.p:t)}}}return xi(n,s)},jc=function(t,e,n){var i=t.labels,s=Mn,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},an=function(t,e,n){var i=t.vars,s=i[e],o=he,a=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&di.length&&Js(),a&&(he=a),h=l?s.apply(c,l):s.call(c),he=o,h},Hr=function(t){return mi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ue),t.progress()<1&&an(t,"onInterrupt"),t},fr,du=[],fu=function(t){if(t)if(t=!t.name&&t.default||t,jo()||t.headless){var e=t.name,n=me(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Qr,render:sl,add:el,kill:Y_,modifier:X_,rawVars:0},o={targetTest:0,get:0,getSetter:rl,aliases:{},register:0};if(Ar(),t!==i){if(rn[e])return;dn(i,dn(Qs(t,s),o)),Er(i.prototype,Er(s,Qs(t,o))),rn[i.prop=e]=i,t.targetTest&&(ks.push(i),$o[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Kh(e,i),t.register&&t.register(Je,i,Ze)}else du.push(t)},se=255,Vr={aqua:[0,se,se],lime:[0,se,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,se],navy:[0,0,128],white:[se,se,se],olive:[128,128,0],yellow:[se,se,0],orange:[se,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[se,0,0],pink:[se,192,203],cyan:[0,se,se],transparent:[se,se,se,0]},eo=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*se+.5|0},pu=function(t,e,n){var i=t?Zn(t)?[t>>16,t>>8&se,t&se]:0:Vr.black,s,o,a,l,c,h,u,d,m,_;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Vr[t])i=Vr[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&se,i&se,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&se,t&se]}else if(t.substr(0,3)==="hsl"){if(i=_=t.match(Vc),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,s=h*2-o,i.length>3&&(i[3]*=1),i[0]=eo(l+1/3,s,o),i[1]=eo(l,s,o),i[2]=eo(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Xh),n&&i.length<4&&(i[3]=1),i}else i=t.match(Vc)||Vr.transparent;i=i.map(Number)}return e&&!_&&(s=i[0]/se,o=i[1]/se,a=i[2]/se,u=Math.max(s,o,a),d=Math.min(s,o,a),h=(u+d)/2,u===d?l=c=0:(m=u-d,c=h>.5?m/(2-u-d):m/(u+d),l=u===s?(o-a)/m+(o<a?6:0):u===o?(a-s)/m+2:(s-o)/m+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},mu=function(t){var e=[],n=[],i=-1;return t.split(fi).forEach(function(s){var o=s.match(dr)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Kc=function(t,e,n){var i="",s=(t+i).match(fi),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!s)return t;if(s=s.map(function(d){return(d=pu(d,e,1))&&o+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=mu(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(fi,"1").split(dr),u=c.length-1;a<u;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(fi),u=c.length-1;a<u;a++)i+=c[a]+s[a];return i+c[u]},fi=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Vr)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),L_=/hsl[a]?\(/,gu=function(t){var e=t.join(" "),n;if(fi.lastIndex=0,fi.test(e))return n=L_.test(e),t[1]=Kc(t[1],n),t[0]=Kc(t[0],n,mu(t[1])),!0},es,sn=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,h,u,d,m,_=function g(p){var f=r()-i,w=p===!0,x,y,E,b;if((f>t||f<0)&&(n+=f-e),i+=f,E=i-n,x=E-o,(x>0||w)&&(b=++u.frame,d=E-u.time*1e3,u.time=E=E/1e3,o+=x+(x>=s?4:s-x),y=1),w||(l=c(g)),y)for(m=0;m<a.length;m++)a[m](E,d,b,p)};return u={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){qh&&(!yo&&jo()&&(Dn=yo=window,Ko=Dn.document||{},un.gsap=Je,(Dn.gsapVersions||(Dn.gsapVersions=[])).push(Je.version),jh($s||Dn.GreenSockGlobals||!Dn.gsap&&Dn||{}),du.forEach(fu)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(p){return setTimeout(p,o-u.time*1e3+1|0)},es=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),es=0,c=Qr},lagSmoothing:function(p,f){t=p||1/0,e=Math.min(f||33,t)},fps:function(p){s=1e3/(p||240),o=u.time*1e3+s},add:function(p,f,w){var x=f?function(y,E,b,M){p(y,E,b,M),u.remove(x)}:p;return u.remove(p),a[w?"unshift":"push"](x),Ar(),x},remove:function(p,f){~(f=a.indexOf(p))&&a.splice(f,1)&&m>=f&&m--},_listeners:a},u}(),Ar=function(){return!es&&sn.wake()},Zt={},P_=/^[\d.\-M][\d.\-,\s]/,D_=/["']/g,U_=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(D_,"").trim():+c,i=l.substr(a+1).trim();return e},I_=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},N_=function(t){var e=(t+"").split("("),n=Zt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[U_(e[1])]:I_(t).split(",").map(Qh)):Zt._CE&&P_.test(t)?Zt._CE("",t):n},O_=function(t){return function(e){return 1-t(1-e)}},ki=function(t,e){return t&&(me(t)?t:Zt[t]||N_(t))||e},Yi=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return Ke(t,function(a){Zt[a]=un[a]=s,Zt[o=a.toLowerCase()]=n;for(var l in s)Zt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Zt[a+"."+l]=s[l]}),s},_u=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},no=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/Mo*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*a_((h-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:_u(a);return s=Mo/s,l.config=function(c,h){return r(t,c,h)},l},io=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:_u(n);return i.config=function(s){return r(t,s)},i};Ke("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;Yi(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Zt.Linear.easeNone=Zt.none=Zt.Linear.easeIn;Yi("Elastic",no("in"),no("out"),no());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};Yi("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Yi("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Yi("Circ",function(r){return-(Vh(1-r*r)-1)});Yi("Sine",function(r){return r===1?1:-s_(r*i_)+1});Yi("Back",io("in"),io("out"),io());Zt.SteppedEase=Zt.steps=un.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-ae;return function(a){return((i*us(0,o,a)|0)+s)*n}}};$r.ease=Zt["quad.out"];Ke("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Jo+=r+","+r+"Params,"});var vu=function(t,e){this.id=r_++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:$h,this.set=e?e.getSetter:rl},ns=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,br(this,+e.duration,1,1),this.data=e.data,he&&(this._ctx=he,he.data.push(this)),es||sn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,br(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Ar(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(pa(this,n),!s._dp||s.parent||nu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Nn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ae||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Jh(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Yc(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Yc(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Tr(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ae?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?ta(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ae?0:this._rts,this.totalTime(us(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),fa(this),g_(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ar(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ae&&(this._tTime-=ae)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=ue(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Nn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(je(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ta(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=d_);var i=Ue;return Ue=n,tl(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ue=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,qc(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,qc(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(mn(this,n),je(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,je(i)),this._dur||(this._zTime=-ae),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ae:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ae,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-ae)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=me(n)?n:tu,l=function(){var h=i.then;i.then=null,s&&s(),me(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Hr(this)},r}();dn(ns.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ae,_prom:0,_ps:!1,_rts:1});var qe=function(r){Hh(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=je(n.sortChildren),de&&Nn(n.parent||de,Xn(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&iu(Xn(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return Yr(0,arguments,this),this},e.from=function(i,s,o){return Yr(1,arguments,this),this},e.fromTo=function(i,s,o,a){return Yr(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,Xr(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Se(i,s,mn(this,o),1),this},e.call=function(i,s,o){return Nn(this,Se.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new Se(i,o,mn(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,h){return o.runBackwards=1,Xr(o).immediateRender=je(o.immediateRender),this.staggerTo(i,s,o,a,l,c,h)},e.staggerFromTo=function(i,s,o,a,l,c,h,u){return a.startAt=o,Xr(a).immediateRender=je(a.immediateRender),this.staggerTo(i,s,a,l,c,h,u)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:ue(i),u=this._zTime<0!=i<0&&(this._initted||!c),d,m,_,g,p,f,w,x,y,E,b,M;if(this!==de&&h>l&&i>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),d=h,y=this._start,x=this._ts,f=!x,u&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(d=ue(h%p),h===l?(g=this._repeat,d=c):(E=ue(h/p),g=~~E,g&&g===E&&(d=c,g--),d>c&&(d=c)),E=Tr(this._tTime,p),!a&&this._tTime&&E!==g&&this._tTime-E*p-this._dur<=0&&(E=g),b&&g&1&&(d=c-d,M=1),g!==E&&!this._lock){var P=b&&E&1,v=P===(b&&g&1);if(g<E&&(P=!P),a=P?0:h%c?c:h,this._lock=1,this.render(a||(M?0:ue(g*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&an(this,"onRepeat"),this.vars.repeatRefresh&&!M&&(this.invalidate()._lock=1,E=g),a&&a!==this._time||f!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,v&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!M&&this.invalidate()),this._lock=0,!this._ts&&!f)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(w=M_(this,ue(a),ue(d)),w&&(h-=d-(d=w._start))),this._tTime=h,this._time=d,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!s&&!E&&(an(this,"onStart"),this._tTime!==h))return this;if(d>=a&&i>=0)for(m=this._first;m;){if(_=m._next,(m._act||d>=m._start)&&m._ts&&w!==m){if(m.parent!==this)return this.render(i,s,o);if(m.render(m._ts>0?(d-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(d-m._start)*m._ts,s,o),d!==this._time||!this._ts&&!f){w=0,_&&(h+=this._zTime=-ae);break}}m=_}else{m=this._last;for(var T=i<0?i:d;m;){if(_=m._prev,(m._act||T<=m._end)&&m._ts&&w!==m){if(m.parent!==this)return this.render(i,s,o);if(m.render(m._ts>0?(T-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(T-m._start)*m._ts,s,o||Ue&&tl(m)),d!==this._time||!this._ts&&!f){w=0,_&&(h+=this._zTime=T?-ae:ae);break}}m=_}}if(w&&!s&&(this.pause(),w.render(d>=a?0:-ae)._zTime=d>=a?1:-1,this._ts))return this._start=y,fa(this),this.render(i,s,o);this._onUpdate&&!s&&an(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(y===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&mi(this,1),!s&&!(i<0&&!a)&&(h||a||!l)&&(an(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(Zn(s)||(s=mn(this,s,i)),!(i instanceof ns)){if(ze(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Le(i))return this.addLabel(i,s);if(me(i))i=Se.delayedCall(0,i);else return this}return this!==i?Nn(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Mn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Se?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return Le(i)?this.removeLabel(i):me(i)?this.killTweensOf(i):(i.parent===this&&da(this,i),i===this._recent&&(this._recent=this._last),Gi(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ue(sn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=mn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=Se.delayedCall(0,s||Qr,o);return a.data="isPause",this._hasPause=1,Nn(this,a,mn(this,i))},e.removePause=function(i){var s=this._first;for(i=mn(this,i);s;)s._start===i&&s.data==="isPause"&&mi(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)si!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=yn(i),l=this._first,c=Zn(s),h;l;)l instanceof Se?f_(l._targets,a)&&(c?(!si||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=mn(o,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,d=l.immediateRender,m,_=Se.to(o,dn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||ae,onStart:function(){if(o.pause(),!m){var p=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==p&&br(_,p,0,1).render(_._time,!0,!0),m=1}h&&h.apply(_,u||[])}},s));return d?_.render(0):_},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,dn({startAt:{time:mn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),jc(this,mn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),jc(this,mn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ae)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=ue(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Gi(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Gi(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=Mn,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Nn(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=ue(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;br(o,o===de&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(de._ts&&(Jh(de,ta(i,de)),Zh=sn.frame),sn.frame>=Wc){Wc+=cn.autoSleep||120;var s=de._first;if((!s||!s._ts)&&cn.autoSleep&&sn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||sn.sleep()}}},t}(ns);dn(qe.prototype,{_lock:0,_hasPause:0,_forcing:0});var F_=function(t,e,n,i,s,o,a){var l=new Ze(this._pt,t,e,0,1,Eu,null,s),c=0,h=0,u,d,m,_,g,p,f,w;for(l.b=n,l.e=i,n+="",i+="",(f=~i.indexOf("random("))&&(i=ts(i)),o&&(w=[n,i],o(w,t,e),n=w[0],i=w[1]),d=n.match(Qa)||[];u=Qa.exec(i);)_=u[0],g=i.substring(c,u.index),m?m=(m+1)%5:g.substr(-5)==="rgba("&&(m=1),_!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:g||h===1?g:",",s:p,c:_.charAt(1)==="="?gr(p,_)-p:parseFloat(_)-p,m:m&&m<4?Math.round:0},c=Qa.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Yh.test(i)||f)&&(l.e=0),this._pt=l,l},el=function(t,e,n,i,s,o,a,l,c,h){me(i)&&(i=i(s||0,t,o));var u=t[e],d=n!=="get"?n:me(u)?c?t[e.indexOf("set")||!me(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,m=me(u)?c?H_:Su:il,_;if(Le(i)&&(~i.indexOf("random(")&&(i=ts(i)),i.charAt(1)==="="&&(_=gr(d,i)+(Oe(d)||0),(_||_===0)&&(i=_))),!h||d!==i||Ro)return!isNaN(d*i)&&i!==""?(_=new Ze(this._pt,t,e,+d||0,i-(d||0),typeof u=="boolean"?W_:wu,0,m),c&&(_.fp=c),a&&_.modifier(a,this,t),this._pt=_):(!u&&!(e in t)&&Zo(e,i),F_.call(this,t,e,d,i,m,l||cn.stringFilter,c))},z_=function(t,e,n,i,s){if(me(t)&&(t=qr(t,s,e,n,i)),!Fn(t)||t.style&&t.nodeType||ze(t)||Wh(t))return Le(t)?qr(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=qr(t[a],s,e,n,i);return o},xu=function(t,e,n,i,s,o){var a,l,c,h;if(rn[t]&&(a=new rn[t]).init(s,a.rawVars?e[t]:z_(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Ze(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==fr))for(c=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)c[a._props[h]]=l;return a},si,Ro,nl=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,d=i.keyframes,m=i.autoRevert,_=t._dur,g=t._startAt,p=t._targets,f=t.parent,w=f&&f.data==="nested"?f.vars.targets:p,x=t._overwrite==="auto"&&!Yo,y=t.timeline,E=i.easeReverse||u,b,M,P,v,T,N,F,V,C,I,G,z,Q;if(y&&(!d||!s)&&(s="none"),t._ease=ki(s,$r.ease),t._rEase=E&&(ki(E)||t._ease),t._from=!y&&!!i.runBackwards,t._from&&(t.ratio=1),!y||d&&!i.stagger){if(V=p[0]?Bi(p[0]).harness:0,z=V&&i[V.prop],b=Qs(i,$o),g&&(g._zTime<0&&g.progress(1),e<0&&h&&a&&!m?g.render(-1,!0):g.revert(h&&_?Gs:u_),g._lazy=0),o){if(mi(t._startAt=Se.set(p,dn({data:"isStart",overwrite:!1,parent:f,immediateRender:!0,lazy:!g&&je(l),startAt:null,delay:0,onUpdate:c&&function(){return an(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ue||!a&&!m)&&t._startAt.revert(Gs),a&&_&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&_&&!g){if(e&&(a=!1),P=dn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&je(l),immediateRender:a,stagger:0,parent:f},b),z&&(P[V.prop]=z),mi(t._startAt=Se.set(p,P)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ue?t._startAt.revert(Gs):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,ae,ae);else if(!e)return}for(t._pt=t._ptCache=0,l=_&&je(l)||l&&!_,M=0;M<p.length;M++){if(T=p[M],F=T._gsap||Qo(p)[M]._gsap,t._ptLookup[M]=I={},So[F.id]&&di.length&&Js(),G=w===p?M:w.indexOf(T),V&&(C=new V).init(T,z||b,t,G,w)!==!1&&(t._pt=v=new Ze(t._pt,T,C.name,0,1,C.render,C,0,C.priority),C._props.forEach(function($){I[$]=v}),C.priority&&(N=1)),!V||z)for(P in b)rn[P]&&(C=xu(P,b,t,G,T,w))?C.priority&&(N=1):I[P]=v=el.call(t,T,P,"get",b[P],G,w,0,i.stringFilter);t._op&&t._op[M]&&t.kill(T,t._op[M]),x&&t._pt&&(si=t,de.killTweensOf(T,I,t.globalTime(e)),Q=!t.parent,si=0),t._pt&&l&&(So[F.id]=1)}N&&Tu(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Q,d&&e<=0&&y.render(Mn,!0,!0)},B_=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,d,m;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,m=t._targets.length;m--;){if(h=d[m][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Ro=1,t.vars[e]="+=0",nl(t,a),Ro=0,l?Jr(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(m=c.length;m--;)u=c[m],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=ve(n)+Oe(u.e)),u.b&&(u.b=h.s+Oe(u.b))},G_=function(t,e){var n=t[0]?Bi(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=Er({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},k_=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(ze(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},qr=function(t,e,n,i,s){return me(t)?t.call(e,n,i,s):Le(t)&&~t.indexOf("random(")?ts(t):t},Mu=Jo+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",yu={};Ke(Mu+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return yu[r]=1});var Se=function(r){Hh(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Xr(i))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,d=l.stagger,m=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,f=i.parent||de,w=(ze(n)||Wh(n)?Zn(n[0]):"length"in i)?[n]:yn(n),x,y,E,b,M,P,v,T;if(a._targets=w.length?Qo(w):Jr("GSAP target "+n+" not found. https://gsap.com",!cn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=m,_||d||zs(c)||zs(h)){i=a.vars;var N=i.easeReverse||i.yoyoEase;if(x=a.timeline=new qe({data:"nested",defaults:g||{},targets:f&&f.data==="nested"?f.vars.targets:w}),x.kill(),x.parent=x._dp=Xn(a),x._start=0,d||zs(c)||zs(h)){if(b=w.length,v=d&&ou(d),Fn(d))for(M in d)~Mu.indexOf(M)&&(T||(T={}),T[M]=d[M]);for(y=0;y<b;y++)E=Qs(i,yu),E.stagger=0,N&&(E.easeReverse=N),T&&Er(E,T),P=w[y],E.duration=+qr(c,Xn(a),y,P,w),E.delay=(+qr(h,Xn(a),y,P,w)||0)-a._delay,!d&&b===1&&E.delay&&(a._delay=h=E.delay,a._start+=h,E.delay=0),x.to(P,E,v?v(y,P,w):0),x._ease=Zt.none;x.duration()?c=h=0:a.timeline=0}else if(_){Xr(dn(x.vars.defaults,{ease:"none"})),x._ease=ki(_.ease||i.ease||"none");var F=0,V,C,I;if(ze(_))_.forEach(function(G){return x.to(w,G,">")}),x.duration();else{E={};for(M in _)M==="ease"||M==="easeEach"||k_(M,_[M],E,_.easeEach);for(M in E)for(V=E[M].sort(function(G,z){return G.t-z.t}),F=0,y=0;y<V.length;y++)C=V[y],I={ease:C.e,duration:(C.t-(y?V[y-1].t:0))/100*c},I[M]=C.v,x.to(w,I,F),F+=I.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return m===!0&&!Yo&&(si=Xn(a),de.killTweensOf(w),si=0),Nn(f,Xn(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(u||!c&&!_&&a._start===ue(f._time)&&je(u)&&__(Xn(a))&&f.data!=="nested")&&(a._tTime=-ae,a.render(Math.max(0,-h)||0)),p&&iu(Xn(a),p),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-ae&&!h?l:i<ae?0:i,d,m,_,g,p,f,w,x;if(!c)x_(this,i,s,o);else if(u!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=u,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+i,s,o);if(d=ue(u%g),u===l?(_=this._repeat,d=c):(p=ue(u/g),_=~~p,_&&_===p?(d=c,_--):d>c&&(d=c)),f=this._yoyo&&_&1,f&&(d=c-d),p=Tr(this._tTime,g),d===a&&!o&&this._initted&&_===p)return this._tTime=u,this;_!==p&&this.vars.repeatRefresh&&!f&&!this._lock&&d!==g&&this._initted&&(this._lock=o=1,this.render(ue(g*_),!0).invalidate()._lock=0)}if(!this._initted){if(ru(this,h?i:d,o,s,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var y=d<a;if(y!==this._inv){var E=y?a:c-a;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=E?(y?-1:1)/E:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=w=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=w=this._ease(d/c);if(this._from&&(this.ratio=w=1-w),this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&u&&!s&&!p&&(an(this,"onStart"),this._tTime!==u))return this;for(m=this._pt;m;)m.r(w,m.d),m=m._next;x&&x.render(i<0?i:x._dur*x._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&wo(this,i,s,o),an(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&an(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&wo(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&mi(this,1),!s&&!(h&&!a)&&(u||a||f)&&(an(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){es||sn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||nl(this,c),h=this._ease(c/this._dur),B_(this,i,s,o,a,h,c,l)?this.resetTo(i,s,o,a,1):(pa(this,0),this.parent||eu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Hr(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ue),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,si&&si.vars.overwrite!==!0)._first||Hr(this),this.parent&&o!==this.timeline.totalDuration()&&br(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?yn(i):a,c=this._ptLookup,h=this._pt,u,d,m,_,g,p,f;if((!s||s==="all")&&m_(a,l))return s==="all"&&(this._pt=0),Hr(this);for(u=this._op=this._op||[],s!=="all"&&(Le(s)&&(g={},Ke(s,function(w){return g[w]=1}),s=g),s=G_(a,s)),f=a.length;f--;)if(~l.indexOf(a[f])){d=c[f],s==="all"?(u[f]=s,_=d,m={}):(m=u[f]=u[f]||{},_=s);for(g in _)p=d&&d[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&da(this,p,"_pt"),delete d[g]),m!=="all"&&(m[g]=1)}return this._initted&&!this._pt&&h&&Hr(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Yr(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Yr(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return de.killTweensOf(i,s,o)},t}(ns);dn(Se.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ke("staggerTo,staggerFrom,staggerFromTo",function(r){Se[r]=function(){var t=new qe,e=To.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var il=function(t,e,n){return t[e]=n},Su=function(t,e,n){return t[e](n)},H_=function(t,e,n,i){return t[e](i.fp,n)},V_=function(t,e,n){return t.setAttribute(e,n)},rl=function(t,e){return me(t[e])?Su:qo(t[e])&&t.setAttribute?V_:il},wu=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},W_=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Eu=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},sl=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},X_=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},Y_=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?da(this,e,"_pt"):e.dep||(n=1),e=i;return!n},q_=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Tu=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},Ze=function(){function r(e,n,i,s,o,a,l,c,h){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||wu,this.d=l||this,this.set=c||il,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=q_,this.m=n,this.mt=s,this.tween=i},r}();Ke(Jo+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return $o[r]=1});un.TweenMax=un.TweenLite=Se;un.TimelineLite=un.TimelineMax=qe;de=new qe({sortChildren:!1,defaults:$r,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});cn.stringFilter=gu;var Hi=[],Hs={},j_=[],Zc=0,K_=0,ro=function(t){return(Hs[t]||j_).map(function(e){return e()})},Co=function(){var t=Date.now(),e=[];t-Zc>2&&(ro("matchMediaInit"),Hi.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Dn.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),ro("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Zc=t,ro("matchMedia"))},bu=function(){function r(e,n){this.selector=n&&bo(n),this.data=[],this._r=[],this.isReverted=!1,this.id=K_++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){me(n)&&(s=i,i=n,n=me);var o=this,a=function(){var c=he,h=o.selector,u;return c&&c!==o&&c.data.push(o),s&&(o.selector=bo(s)),he=o,u=i.apply(o,arguments),me(u)&&o._r.push(u),he=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===me?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=he;he=null,n(this),he=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Se&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof qe?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Se)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Hi.length;o--;)Hi[o].id===this.id&&Hi.splice(o,1)},t.revert=function(n){this.kill(n||{})},r}(),Z_=function(){function r(e){this.contexts=[],this.scope=e,he&&he.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Fn(n)||(n={matches:n});var o=new bu(0,s||this.scope),a=o.conditions={},l,c,h;he&&!o.selector&&(o.selector=he.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=Dn.matchMedia(n[c]),l&&(Hi.indexOf(o)<0&&Hi.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(Co):l.addEventListener("change",Co)));return h&&i(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ea={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return fu(i)})},timeline:function(t){return new qe(t)},getTweensOf:function(t,e){return de.getTweensOf(t,e)},getProperty:function(t,e,n,i){Le(t)&&(t=yn(t)[0]);var s=Bi(t||{}).get,o=n?tu:Qh;return n==="native"&&(n=""),t&&(e?o((rn[e]&&rn[e].get||s)(t,e,n,i)):function(a,l,c){return o((rn[a]&&rn[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=yn(t),t.length>1){var i=t.map(function(h){return Je.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var o=rn[e],a=Bi(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;fr._pt=0,u.init(t,n?h+n:h,fr,0,[t]),u.render(1,u),fr._pt&&sl(1,fr)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,s=Je.to(t,dn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return s.resetTo(e,l,c,h)};return o.tween=s,o},isTweening:function(t){return de.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ki(t.ease,$r.ease)),Xc($r,t||{})},config:function(t){return Xc(cn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!rn[a]&&!un[a]&&Jr(e+" effect requires "+a+" plugin.")}),to[e]=function(a,l,c){return n(yn(a),dn(l||{},s),c)},o&&(qe.prototype[e]=function(a,l,c){return this.add(to[e](a,Fn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){Zt[t]=ki(e)},parseEase:function(t,e){return arguments.length?ki(t,e):Zt},getById:function(t){return de.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new qe(t),i,s;for(n.smoothChildTiming=je(t.smoothChildTiming),de.remove(n),n._dp=0,n._time=n._tTime=de._time,i=de._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Se&&i.vars.onComplete===i._targets[0]))&&Nn(n,i,i._start-i._delay),i=s;return Nn(de,n,0),n},context:function(t,e){return t?new bu(t,e):he},matchMedia:function(t){return new Z_(t)},matchMediaRefresh:function(){return Hi.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Co()},addEventListener:function(t,e){var n=Hs[t]||(Hs[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Hs[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:A_,wrapYoyo:R_,distribute:ou,random:cu,snap:lu,normalize:b_,getUnit:Oe,clamp:S_,splitColor:pu,toArray:yn,selector:bo,mapRange:uu,pipe:E_,unitize:T_,interpolate:C_,shuffle:au},install:jh,effects:to,ticker:sn,updateRoot:qe.updateRoot,plugins:rn,globalTimeline:de,core:{PropTween:Ze,globals:Kh,Tween:Se,Timeline:qe,Animation:ns,getCache:Bi,_removeLinkedListItem:da,reverting:function(){return Ue},context:function(t){return t&&he&&(he.data.push(t),t._ctx=he),he},suppressOverwrites:function(t){return Yo=t}}};Ke("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ea[r]=Se[r]});sn.add(qe.updateRoot);fr=ea.to({},{duration:0});var $_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},J_=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=$_(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},so=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Le(s)&&(l={},Ke(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}J_(a,s)}}}},Je=ea.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)Ue?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},so("roundProps",Ao),so("modifiers"),so("snap",lu))||ea;Se.version=qe.version=Je.version="3.15.0";qh=1;jo()&&Ar();Zt.Power0;Zt.Power1;Zt.Power2;Zt.Power3;Zt.Power4;Zt.Linear;Zt.Quad;Zt.Cubic;Zt.Quart;Zt.Quint;Zt.Strong;Zt.Elastic;Zt.Back;Zt.SteppedEase;Zt.Bounce;Zt.Sine;Zt.Expo;Zt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var $c,ai,_r,al,Ni,Jc,ol,Q_=function(){return typeof window<"u"},$n={},Li=180/Math.PI,vr=Math.PI/180,cr=Math.atan2,Qc=1e8,ll=/([A-Z])/g,tv=/(left|right|width|margin|padding|x)/i,ev=/[\s,\(]\S/,On={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Lo=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},nv=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},iv=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},rv=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},sv=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Au=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Ru=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},av=function(t,e,n){return t.style[e]=n},ov=function(t,e,n){return t.style.setProperty(e,n)},lv=function(t,e,n){return t._gsap[e]=n},cv=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},hv=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},uv=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},fe="transform",$e=fe+"Origin",dv=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in $n&&s){if(this.tfm=this.tfm||{},t!=="transform")t=On[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Yn(i,a)}):this.tfm[t]=o.x?o[t]:Yn(i,t),t===$e&&(this.tfm.zOrigin=o.zOrigin);else return On.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(fe)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push($e,e,"")),t=fe}(s||e)&&this.props.push(t,e,s[t])},Cu=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},fv=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(ll,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=ol(),(!s||!s.isStart)&&!n[fe]&&(Cu(n),i.zOrigin&&n[$e]&&(n[$e]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Lu=function(t,e){var n={target:t,props:[],revert:fv,save:dv};return t._gsap||Je.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Pu,Po=function(t,e){var n=ai.createElementNS?ai.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ai.createElement(t);return n&&n.style?n:ai.createElement(t)},on=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(ll,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Rr(e)||e,1)||""},th="O,Moz,ms,Ms,Webkit".split(","),Rr=function(t,e,n){var i=e||Ni,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(th[o]+t in s););return o<0?null:(o===3?"ms":o>=0?th[o]:"")+t},Do=function(){Q_()&&window.document&&($c=window,ai=$c.document,_r=ai.documentElement,Ni=Po("div")||{style:{}},Po("div"),fe=Rr(fe),$e=fe+"Origin",Ni.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Pu=!!Rr("perspective"),ol=Je.core.reverting,al=1)},eh=function(t){var e=t.ownerSVGElement,n=Po("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),_r.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),_r.removeChild(n),s},nh=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Du=function(t){var e,n;try{e=t.getBBox()}catch{e=eh(t),n=1}return e&&(e.width||e.height)||n||(e=eh(t)),e&&!e.width&&!e.x&&!e.y?{x:+nh(t,["x","cx","x1"])||0,y:+nh(t,["y","cy","y1"])||0,width:0,height:0}:e},Uu=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Du(t))},gi=function(t,e){if(e){var n=t.style,i;e in $n&&e!==$e&&(e=fe),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(ll,"-$1").toLowerCase())):n.removeAttribute(e)}},oi=function(t,e,n,i,s,o){var a=new Ze(t._pt,e,n,0,1,o?Ru:Au);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},ih={deg:1,rad:1,turn:1},pv={grid:1,flex:1},_i=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ni.style,l=tv.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,d=i==="px",m=i==="%",_,g,p,f;if(i===o||!s||ih[i]||ih[o])return s;if(o!=="px"&&!d&&(s=r(t,e,n,"px")),f=t.getCTM&&Uu(t),(m||o==="%")&&($n[e]||~e.indexOf("adius")))return _=f?t.getBBox()[l?"width":"height"]:t[h],ve(m?s/_*u:s/100*_);if(a[l?"width":"height"]=u+(d?o:i),g=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,f&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===ai||!g.appendChild)&&(g=ai.body),p=g._gsap,p&&m&&p.width&&l&&p.time===sn.time&&!p.uncache)return ve(s/p.width*u);if(m&&(e==="height"||e==="width")){var w=t.style[e];t.style[e]=u+i,_=t[h],w?t.style[e]=w:gi(t,e)}else(m||o==="%")&&!pv[on(g,"display")]&&(a.position=on(t,"position")),g===t&&(a.position="static"),g.appendChild(Ni),_=Ni[h],g.removeChild(Ni),a.position="absolute";return l&&m&&(p=Bi(g),p.time=sn.time,p.width=g[h]),ve(d?_*s/u:_&&s?u/_*s:0)},Yn=function(t,e,n,i){var s;return al||Do(),e in On&&e!=="transform"&&(e=On[e],~e.indexOf(",")&&(e=e.split(",")[0])),$n[e]&&e!=="transform"?(s=rs(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:ia(on(t,$e))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=na[e]&&na[e](t,e,n)||on(t,e)||$h(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?_i(t,e,s,n)+n:s},mv=function(t,e,n,i){if(!n||n==="none"){var s=Rr(e,t,1),o=s&&on(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=on(t,"borderTopColor"))}var a=new Ze(this._pt,t.style,e,0,1,Eu),l=0,c=0,h,u,d,m,_,g,p,f,w,x,y,E;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=on(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=t.style[e],t.style[e]=i,i=on(t,e)||i,g?t.style[e]=g:gi(t,e)),h=[n,i],gu(h),n=h[0],i=h[1],d=n.match(dr)||[],E=i.match(dr)||[],E.length){for(;u=dr.exec(i);)p=u[0],w=i.substring(l,u.index),_?_=(_+1)%5:(w.substr(-5)==="rgba("||w.substr(-5)==="hsla(")&&(_=1),p!==(g=d[c++]||"")&&(m=parseFloat(g)||0,y=g.substr((m+"").length),p.charAt(1)==="="&&(p=gr(m,p)+y),f=parseFloat(p),x=p.substr((f+"").length),l=dr.lastIndex-x.length,x||(x=x||cn.units[e]||y,l===i.length&&(i+=x,a.e+=x)),y!==x&&(m=_i(t,e,g,x)||0),a._pt={_next:a._pt,p:w||c===1?w:",",s:m,c:f-m,m:_&&_<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?Ru:Au;return Yh.test(i)&&(a.e=0),this._pt=a,a},rh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},gv=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=rh[n]||n,e[1]=rh[i]||i,e.join(" ")},_v=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],$n[a]&&(l=1,a=a==="transformOrigin"?$e:fe),gi(n,a);l&&(gi(n,fe),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",rs(n,1),o.uncache=1,Cu(i)))}},na={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new Ze(t._pt,e,n,0,0,_v);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},is=[1,0,0,1,0,0],Iu={},Nu=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},sh=function(t){var e=on(t,fe);return Nu(e)?is:e.substr(7).match(Xh).map(ve)},cl=function(t,e){var n=t._gsap||Bi(t),i=t.style,s=sh(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?is:s):(s===is&&!t.offsetParent&&t!==_r&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,_r.appendChild(t)),s=sh(t),l?i.display=l:gi(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):_r.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Uo=function(t,e,n,i,s,o){var a=t._gsap,l=s||cl(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,d=a.yOffset||0,m=l[0],_=l[1],g=l[2],p=l[3],f=l[4],w=l[5],x=e.split(" "),y=parseFloat(x[0])||0,E=parseFloat(x[1])||0,b,M,P,v;n?l!==is&&(M=m*p-_*g)&&(P=y*(p/M)+E*(-g/M)+(g*w-p*f)/M,v=y*(-_/M)+E*(m/M)-(m*w-_*f)/M,y=P,E=v):(b=Du(t),y=b.x+(~x[0].indexOf("%")?y/100*b.width:y),E=b.y+(~(x[1]||x[0]).indexOf("%")?E/100*b.height:E)),i||i!==!1&&a.smooth?(f=y-c,w=E-h,a.xOffset=u+(f*m+w*g)-f,a.yOffset=d+(f*_+w*p)-w):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=E,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[$e]="0px 0px",o&&(oi(o,a,"xOrigin",c,y),oi(o,a,"yOrigin",h,E),oi(o,a,"xOffset",u,a.xOffset),oi(o,a,"yOffset",d,a.yOffset)),t.setAttribute("data-svg-origin",y+" "+E)},rs=function(t,e){var n=t._gsap||new vu(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=on(t,$e)||"0",h,u,d,m,_,g,p,f,w,x,y,E,b,M,P,v,T,N,F,V,C,I,G,z,Q,$,Z,L,D,j,tt,nt;return h=u=d=g=p=f=w=x=y=0,m=_=1,n.svg=!!(t.getCTM&&Uu(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[fe]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[fe]!=="none"?l[fe]:"")),i.scale=i.rotate=i.translate="none"),M=cl(t,n.svg),n.svg&&(n.uncache?(Q=t.getBBox(),c=n.xOrigin-Q.x+"px "+(n.yOrigin-Q.y)+"px",z=""):z=!e&&t.getAttribute("data-svg-origin"),Uo(t,z||c,!!z||n.originIsAbsolute,n.smooth!==!1,M)),E=n.xOrigin||0,b=n.yOrigin||0,M!==is&&(N=M[0],F=M[1],V=M[2],C=M[3],h=I=M[4],u=G=M[5],M.length===6?(m=Math.sqrt(N*N+F*F),_=Math.sqrt(C*C+V*V),g=N||F?cr(F,N)*Li:0,w=V||C?cr(V,C)*Li+g:0,w&&(_*=Math.abs(Math.cos(w*vr))),n.svg&&(h-=E-(E*N+b*V),u-=b-(E*F+b*C))):(nt=M[6],j=M[7],Z=M[8],L=M[9],D=M[10],tt=M[11],h=M[12],u=M[13],d=M[14],P=cr(nt,D),p=P*Li,P&&(v=Math.cos(-P),T=Math.sin(-P),z=I*v+Z*T,Q=G*v+L*T,$=nt*v+D*T,Z=I*-T+Z*v,L=G*-T+L*v,D=nt*-T+D*v,tt=j*-T+tt*v,I=z,G=Q,nt=$),P=cr(-V,D),f=P*Li,P&&(v=Math.cos(-P),T=Math.sin(-P),z=N*v-Z*T,Q=F*v-L*T,$=V*v-D*T,tt=C*T+tt*v,N=z,F=Q,V=$),P=cr(F,N),g=P*Li,P&&(v=Math.cos(P),T=Math.sin(P),z=N*v+F*T,Q=I*v+G*T,F=F*v-N*T,G=G*v-I*T,N=z,I=Q),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,f=180-f),m=ve(Math.sqrt(N*N+F*F+V*V)),_=ve(Math.sqrt(G*G+nt*nt)),P=cr(I,G),w=Math.abs(P)>2e-4?P*Li:0,y=tt?1/(tt<0?-tt:tt):0),n.svg&&(z=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Nu(on(t,fe)),z&&t.setAttribute("transform",z))),Math.abs(w)>90&&Math.abs(w)<270&&(s?(m*=-1,w+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,w+=w<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=ve(m),n.scaleY=ve(_),n.rotation=ve(g)+a,n.rotationX=ve(p)+a,n.rotationY=ve(f)+a,n.skewX=w+a,n.skewY=x+a,n.transformPerspective=y+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[$e]=ia(c)),n.xOffset=n.yOffset=0,n.force3D=cn.force3D,n.renderTransform=n.svg?xv:Pu?Ou:vv,n.uncache=0,n},ia=function(t){return(t=t.split(" "))[0]+" "+t[1]},ao=function(t,e,n){var i=Oe(e);return ve(parseFloat(e)+parseFloat(_i(t,"x",n+"px",i)))+i},vv=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Ou(t,e)},bi="0deg",Gr="0px",Ai=") ",Ou=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,m=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,f=n.force3D,w=n.target,x=n.zOrigin,y="",E=f==="auto"&&t&&t!==1||f===!0;if(x&&(u!==bi||h!==bi)){var b=parseFloat(h)*vr,M=Math.sin(b),P=Math.cos(b),v;b=parseFloat(u)*vr,v=Math.cos(b),o=ao(w,o,M*v*-x),a=ao(w,a,-Math.sin(b)*-x),l=ao(w,l,P*v*-x+x)}p!==Gr&&(y+="perspective("+p+Ai),(i||s)&&(y+="translate("+i+"%, "+s+"%) "),(E||o!==Gr||a!==Gr||l!==Gr)&&(y+=l!==Gr||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ai),c!==bi&&(y+="rotate("+c+Ai),h!==bi&&(y+="rotateY("+h+Ai),u!==bi&&(y+="rotateX("+u+Ai),(d!==bi||m!==bi)&&(y+="skew("+d+", "+m+Ai),(_!==1||g!==1)&&(y+="scale("+_+", "+g+Ai),w.style[fe]=y||"translate(0, 0)"},xv=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,m=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,f=n.yOffset,w=n.forceCSS,x=parseFloat(o),y=parseFloat(a),E,b,M,P,v;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=vr,c*=vr,E=Math.cos(l)*u,b=Math.sin(l)*u,M=Math.sin(l-c)*-d,P=Math.cos(l-c)*d,c&&(h*=vr,v=Math.tan(c-h),v=Math.sqrt(1+v*v),M*=v,P*=v,h&&(v=Math.tan(h),v=Math.sqrt(1+v*v),E*=v,b*=v)),E=ve(E),b=ve(b),M=ve(M),P=ve(P)):(E=u,P=d,b=M=0),(x&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(x=_i(m,"x",o,"px"),y=_i(m,"y",a,"px")),(_||g||p||f)&&(x=ve(x+_-(_*E+g*M)+p),y=ve(y+g-(_*b+g*P)+f)),(i||s)&&(v=m.getBBox(),x=ve(x+i/100*v.width),y=ve(y+s/100*v.height)),v="matrix("+E+","+b+","+M+","+P+","+x+","+y+")",m.setAttribute("transform",v),w&&(m.style[fe]=v)},Mv=function(t,e,n,i,s){var o=360,a=Le(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Li:1),c=l-i,h=i+c+"deg",u,d;return a&&(u=s.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*Qc)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*Qc)%o-~~(c/o)*o)),t._pt=d=new Ze(t._pt,e,n,i,c,nv),d.e=h,d.u="deg",t._props.push(n),d},ah=function(t,e){for(var n in e)t[n]=e[n];return t},yv=function(t,e,n){var i=ah({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,d,m,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[fe]=e,a=rs(n,1),gi(n,fe),n.setAttribute("transform",c)):(c=getComputedStyle(n)[fe],o[fe]=e,a=rs(n,1),o[fe]=c);for(l in $n)c=i[l],h=a[l],c!==h&&s.indexOf(l)<0&&(m=Oe(c),_=Oe(h),u=m!==_?_i(n,l,c,_):parseFloat(c),d=parseFloat(h),t._pt=new Ze(t._pt,a,l,u,d-u,Lo),t._pt.u=_||0,t._props.push(l));ah(a,i)};Ke("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});na[t>1?"border"+r:r]=function(a,l,c,h,u){var d,m;if(arguments.length<4)return d=o.map(function(_){return Yn(a,_,c)}),m=d.join(" "),m.split(d[0]).length===5?d[0]:m;d=(h+"").split(" "),m={},o.forEach(function(_,g){return m[_]=d[g]=d[g]||d[(g-1)/2|0]}),a.init(l,m,u)}});var Fu={name:"css",register:Do,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,d,m,_,g,p,f,w,x,y,E,b,M,P,v;al||Do(),this.styles=this.styles||Lu(t),P=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(h=e[g],!(rn[g]&&xu(g,e,n,i,t,s)))){if(m=typeof h,_=na[g],m==="function"&&(h=h.call(n,i,t,s),m=typeof h),m==="string"&&~h.indexOf("random(")&&(h=ts(h)),_)_(this,t,g,h,n)&&(M=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),h+="",fi.lastIndex=0,fi.test(c)||(p=Oe(c),f=Oe(h),f?p!==f&&(c=_i(t,g,c,f)+f):p&&(h+=p)),this.add(a,"setProperty",c,h,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(m!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,t,s):l[g],Le(c)&&~c.indexOf("random(")&&(c=ts(c)),Oe(c+"")||c==="auto"||(c+=cn.units[g]||Oe(Yn(t,g))||""),(c+"").charAt(1)==="="&&(c=Yn(t,g))):c=Yn(t,g),d=parseFloat(c),w=m==="string"&&h.charAt(1)==="="&&h.substr(0,2),w&&(h=h.substr(2)),u=parseFloat(h),g in On&&(g==="autoAlpha"&&(d===1&&Yn(t,"visibility")==="hidden"&&u&&(d=0),P.push("visibility",0,a.visibility),oi(this,a,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),g!=="scale"&&g!=="transform"&&(g=On[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in $n,x){if(this.styles.save(g),v=h,m==="string"&&h.substring(0,6)==="var(--"){if(h=on(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var T=t.style.perspective;t.style.perspective=h,h=on(t,"perspective"),T?t.style.perspective=T:gi(t,"perspective")}u=parseFloat(h)}if(y||(E=t._gsap,E.renderTransform&&!e.parseTransform||rs(t,e.parseTransform),b=e.smoothOrigin!==!1&&E.smooth,y=this._pt=new Ze(this._pt,a,fe,0,1,E.renderTransform,E,0,-1),y.dep=1),g==="scale")this._pt=new Ze(this._pt,E,"scaleY",E.scaleY,(w?gr(E.scaleY,w+u):u)-E.scaleY||0,Lo),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push($e,0,a[$e]),h=gv(h),E.svg?Uo(t,h,0,b,0,this):(f=parseFloat(h.split(" ")[2])||0,f!==E.zOrigin&&oi(this,E,"zOrigin",E.zOrigin,f),oi(this,a,g,ia(c),ia(h)));continue}else if(g==="svgOrigin"){Uo(t,h,1,b,0,this);continue}else if(g in Iu){Mv(this,E,g,d,w?gr(d,w+h):h);continue}else if(g==="smoothOrigin"){oi(this,E,"smooth",E.smooth,h);continue}else if(g==="force3D"){E[g]=h;continue}else if(g==="transform"){yv(this,h,t);continue}}else g in a||(g=Rr(g)||g);if(x||(u||u===0)&&(d||d===0)&&!ev.test(h)&&g in a)p=(c+"").substr((d+"").length),u||(u=0),f=Oe(h)||(g in cn.units?cn.units[g]:p),p!==f&&(d=_i(t,g,c,f)),this._pt=new Ze(this._pt,x?E:a,g,d,(w?gr(d,w+u):u)-d,!x&&(f==="px"||g==="zIndex")&&e.autoRound!==!1?sv:Lo),this._pt.u=f||0,x&&v!==h?(this._pt.b=c,this._pt.e=v,this._pt.r=rv):p!==f&&f!=="%"&&(this._pt.b=c,this._pt.r=iv);else if(g in a)mv.call(this,t,g,c,w?w+h:h);else if(g in t)this.add(t,g,c||t[g],w?w+h:h,i,s);else if(g!=="parseTransform"){Zo(g,h);continue}x||(g in a?P.push(g,0,a[g]):typeof t[g]=="function"?P.push(g,2,t[g]()):P.push(g,1,c||t[g])),o.push(g)}}M&&Tu(this)},render:function(t,e){if(e.tween._time||!ol())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Yn,aliases:On,getSetter:function(t,e,n){var i=On[e];return i&&i.indexOf(",")<0&&(e=i),e in $n&&e!==$e&&(t._gsap.x||Yn(t,"x"))?n&&Jc===n?e==="scale"?cv:lv:(Jc=n||{})&&(e==="scale"?hv:uv):t.style&&!qo(t.style[e])?av:~e.indexOf("-")?ov:rl(t,e)},core:{_removeProperty:gi,_getMatrix:cl}};Je.utils.checkPrefix=Rr;Je.core.getStyleSaver=Lu;(function(r,t,e,n){var i=Ke(r+","+t+","+e,function(s){$n[s]=1});Ke(t,function(s){cn.units[s]="deg",Iu[s]=1}),On[i[13]]=r+","+t,Ke(n,function(s){var o=s.split(":");On[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ke("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){cn.units[r]="px"});Je.registerPlugin(Fu);var ct=Je.registerPlugin(Fu)||Je;ct.core.Tween;class Sv{constructor(t){this.container=t,this.width=window.innerWidth,this.height=window.innerHeight,this.clock=new Xo,this.movementEnabled=!1,this.keys={},this.yaw=Math.PI,this.pitch=-.15,this.targetYaw=Math.PI,this.targetPitch=-.15,this.isDragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.init()}init(){this.renderer=new ua({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.width,this.height),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=sa,this.container.appendChild(this.renderer.domElement),this.scene=new Go,this.scene.background=new jt(0),this.scene.fog=new hs(0,.005),this.camera=new Ve(55,this.width/this.height,.1,2e3),this.camera.position.set(0,1.6,8),this.hemiLight=new Vo(1710634,0,0),this.scene.add(this.hemiLight),this.sunLight=new Wo(16773584,0),this.sunLight.position.set(120,180,220),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.scene.add(this.sunLight);const t=new Wt(950,32,32);this.skyMat=new Ln({color:0,side:We,fog:!1}),this.sky=new q(t,this.skyMat),this.scene.add(this.sky);const e=new Kn(450,450,80,80);e.rotateX(-Math.PI/2);const n=e.attributes.position;for(let b=0;b<n.count;b++){const M=n.getX(b),P=n.getZ(b),v=Math.sin(M*.015)*Math.cos(P*.015)*6.5+Math.sin(M*.05+P*.03)*1.8+Math.cos(M*.1)*Math.sin(P*.08)*.5;n.setY(b,v)}e.computeVertexNormals(),this.groundMat=new pt({color:2242070,roughness:.9,metalness:0,flatShading:!0}),this.ground=new q(e,this.groundMat),this.ground.position.y=-60,this.ground.receiveShadow=!0,this.scene.add(this.ground),this.waterMat=new pt({color:799050,roughness:.1,metalness:.15,transparent:!0,opacity:0,flatShading:!0}),this.waterGeo=new Kn(500,500,60,60),this.waterGeo.rotateX(-Math.PI/2),this.water=new q(this.waterGeo,this.waterMat),this.water.position.y=-1.2,this.water.receiveShadow=!0,this.scene.add(this.water),this.sunDisc=new q(new Wt(25,16,16),new Ln({color:16774097,fog:!1})),this.sunDisc.visible=!1,this.scene.add(this.sunDisc),this.moonDisc=new q(new Wt(16,16,16),new Ln({color:14082800,fog:!1})),this.moonDisc.visible=!1,this.scene.add(this.moonDisc);const i=new hn,s=1500,o=new Float32Array(s*3);for(let b=0;b<s;b++){const P=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1);o[b*3]=800*Math.sin(v)*Math.cos(P),o[b*3+1]=Math.abs(800*Math.cos(v)),o[b*3+2]=800*Math.sin(v)*Math.sin(P)}i.setAttribute("position",new Sn(o,3)),this.starsMat=new Gh({color:16777215,size:1.5,transparent:!0,opacity:0,sizeAttenuation:!0}),this.stars=new Qg(i,this.starsMat),this.scene.add(this.stars),this.treeGroup=new xt,this.treeGroup.visible=!1;const a=[1847574,2243611,1584146],l=[2903579,3629346,4025381],c=[3957784,4748828,3232276],h=new pt({color:16718876,roughness:.6,flatShading:!0});for(let b=0;b<80;b++){const M=b%3,P=new xt;if(M===0){const I=new zt(.12,.22,2,5),G=new pt({color:4008990,roughness:.9,flatShading:!0}),z=new q(I,G);z.position.y=1,z.castShadow=!0;const Q=new Zr(1.2,3.2,5),$=new pt({color:a[Math.floor(Math.random()*a.length)],roughness:.9,flatShading:!0}),Z=new q(Q,$);Z.position.y=2.8,Z.castShadow=!0,P.add(z),P.add(Z)}else if(M===1){const I=new zt(.16,.26,1.8,6),G=new pt({color:5125668,roughness:.9,flatShading:!0}),z=new q(I,G);z.position.y=.9,z.castShadow=!0;const Q=new xt,$=new pt({color:l[Math.floor(Math.random()*l.length)],roughness:.9,flatShading:!0}),Z=new q(new Wt(1,6,6),$);Z.position.y=2.2,Z.castShadow=!0,Q.add(Z);for(let L=0;L<4;L++){const D=new q(new Wt(.65,5,5),$);D.position.set((Math.random()-.5)*.9,2+Math.random()*.7,(Math.random()-.5)*.9),D.castShadow=!0,Q.add(D)}for(let L=0;L<6;L++){const D=new q(new Wt(.08,4,4),h),j=Math.random()*Math.PI*2,tt=.5+Math.random()*.45;D.position.set(Math.cos(j)*tt,1.7+Math.random()*.8,Math.sin(j)*tt),Q.add(D)}P.add(z),P.add(Q)}else{const I=new zt(.08,.16,2.8,5),G=new pt({color:7232586,roughness:.9,flatShading:!0}),z=new q(I,G);z.position.y=1.4,z.rotation.z=.05+Math.random()*.1,z.castShadow=!0;const Q=new pt({color:c[Math.floor(Math.random()*c.length)],roughness:.8,flatShading:!0}),$=new xt;$.position.set(-.14,2.7,0);for(let Z=0;Z<5;Z++){const L=new q(new Bt(1.3,.05,.22),Q);L.rotation.y=Z*Math.PI*2/5,L.rotation.z=-.3,L.position.x=.5;const D=new xt;D.rotation.y=Z*Math.PI*2/5,D.add(L),$.add(D)}P.add(z),P.add($)}const v=Math.random()*Math.PI*2,T=18+Math.random()*90,N=Math.cos(v)*T,F=Math.sin(v)*T,V=this.getTerrainHeight(N,F);P.position.set(N,V,F);const C=.7+Math.random()*.9;P.scale.set(C,C,C),P.userData={originalScale:C},this.treeGroup.add(P)}this.scene.add(this.treeGroup),this.foliageGroup=new xt,this.foliageGroup.visible=!1;const u=3693608,d=[3958312,4749874,2772762];for(let b=0;b<180;b++){const M=new xt,P=new pt({color:u,roughness:.9,flatShading:!0});for(let I=0;I<3;I++){const G=new q(new Bt(.06,.45,.02),P);G.rotation.y=I*Math.PI/3,G.rotation.x=.15-Math.random()*.3,G.position.y=.22,M.add(G)}const v=Math.random()*Math.PI*2,T=12+Math.random()*100,N=Math.cos(v)*T,F=Math.sin(v)*T,V=this.getTerrainHeight(N,F);M.position.set(N,V,F);const C=.7+Math.random()*.8;M.scale.set(C,C,C),M.userData={originalScale:C,type:"grass"},this.foliageGroup.add(M)}for(let b=0;b<60;b++){const M=new xt,P=new pt({color:d[Math.floor(Math.random()*d.length)],roughness:.9,flatShading:!0}),v=new q(new Wt(.45,4,4),P);v.position.y=.45,v.castShadow=!0,M.add(v);for(let G=0;G<3;G++){const z=new q(new Wt(.28,4,4),P);z.position.set((Math.random()-.5)*.5,.3+Math.random()*.25,(Math.random()-.5)*.5),z.castShadow=!0,M.add(z)}const T=Math.random()*Math.PI*2,N=15+Math.random()*90,F=Math.cos(T)*N,V=Math.sin(T)*N,C=this.getTerrainHeight(F,V);M.position.set(F,C,V);const I=.6+Math.random()*.7;M.scale.set(I,I,I),M.userData={originalScale:I,type:"shrub"},this.foliageGroup.add(M)}this.scene.add(this.foliageGroup),this.fishGroup=new xt,this.fishGroup.visible=!1;const m=[16734976,16711740,16758528];for(let b=0;b<35;b++){const M=new xt,P=m[Math.floor(Math.random()*m.length)],v=new pt({color:P,emissive:P,emissiveIntensity:.95,roughness:.3,flatShading:!0}),T=new q(new Zr(.18,.55,4),v);T.rotation.x=Math.PI/2,M.add(T);const N=new q(new Bt(.02,.22,.15),v);N.position.z=-.3,M.add(N);const F=Math.random()*Math.PI*2,V=6+Math.random()*84,C=Math.cos(F)*V,I=Math.sin(F)*V,G=-1.45-Math.random()*.4;M.position.set(C,G,I);const z=.8+Math.random()*.8;M.scale.setScalar(z),M.userData={angle:Math.random()*Math.PI*2,radius:V,speed:.15+Math.random()*.15,depth:G,wiggleSpeed:5+Math.random()*3,tail:N,phaseOffset:Math.random()*Math.PI*2},this.fishGroup.add(M)}this.scene.add(this.fishGroup),this.birdGroup=new xt,this.birdGroup.visible=!1;const _=[1118481,2236962,3355443];for(let b=0;b<35;b++){const M=new hn,P=new Float32Array([0,0,.3,-.4,0,-.1,0,0,-.1,0,0,-.1,.4,0,-.1,0,0,.3]);M.setAttribute("position",new Sn(P,3)),M.computeVertexNormals();const v=new pt({color:_[Math.floor(Math.random()*_.length)],side:vn,roughness:.8}),T=new q(M,v);T.castShadow=!0;const N=new xt;N.add(T);const F=Math.random()*Math.PI*2,V=20+Math.random()*120,C=8+Math.random()*15,I=.12+Math.random()*.1;N.userData={offset:F,radius:V,height:C,speed:I,mesh:T,yawOffset:Math.random()*Math.PI*2},this.birdGroup.add(N)}this.scene.add(this.birdGroup),this.animalGroup=new xt,this.animalGroup.visible=!1;for(let b=0;b<26;b++){const M=new xt,P=new pt({color:15658734,roughness:.9,flatShading:!0}),v=new pt({color:1710618,roughness:.9}),T=new q(new Wt(.48,5,5),P);T.scale.set(1.3,1,1),T.position.y=.65,T.castShadow=!0,M.add(T);const N=new q(new Wt(.18,5,5),v);N.position.set(0,.9,.55),N.castShadow=!0,M.add(N);for(let z of[-.2,.2])for(let Q of[-.3,.3]){const $=new q(new zt(.05,.05,.45),v);$.position.set(z,.225,Q),$.castShadow=!0,M.add($)}const F=Math.random()*Math.PI*2,V=6+Math.random()*134,C=Math.cos(F)*V,I=Math.sin(F)*V,G=this.getTerrainHeight(C,I);M.position.set(C,G,I),M.lookAt(0,G,0),M.scale.setScalar(.9+Math.random()*.3),M.userData={type:"sheep",wanderAngle:Math.random()*Math.PI*2},this.animalGroup.add(M)}for(let b=0;b<14;b++){const M=new xt,P=new pt({color:13279334,roughness:.8,flatShading:!0}),v=new pt({color:4861469,roughness:.9,flatShading:!0}),T=new q(new Bt(.65,.55,1.2),P);T.position.y=.65,T.castShadow=!0,M.add(T);const N=new q(new zt(.38,.44,.5,6),v);N.position.set(0,.95,.45),N.rotation.x=Math.PI/3,N.castShadow=!0,M.add(N);const F=new q(new Bt(.35,.35,.35),P);F.position.set(0,1.15,.65),F.castShadow=!0,M.add(F);for(let Q of[-.22,.22])for(let $ of[-.35,.35]){const Z=new q(new Bt(.14,.5,.14),P);Z.position.set(Q,.25,$),Z.castShadow=!0,M.add(Z)}const V=Math.random()*Math.PI*2,C=10+Math.random()*150,I=Math.cos(V)*C,G=Math.sin(V)*C,z=this.getTerrainHeight(I,G);M.position.set(I,z,G),M.lookAt(0,z,0),M.scale.setScalar(1+Math.random()*.3),M.userData={type:"lion",wanderAngle:Math.random()*Math.PI*2},this.animalGroup.add(M)}for(let b=0;b<24;b++){const M=new xt,P=new pt({color:9394225,roughness:.9}),v=new q(new Bt(.2,.16,.32),P);v.position.y=.12,v.castShadow=!0,M.add(v);const T=new q(new Bt(.08,.25,.12),P);T.position.set(0,.22,-.16),T.rotation.x=-.4,T.castShadow=!0,M.add(T);const N=new q(new Bt(.12,.12,.12),P);N.position.set(0,.24,.12),N.castShadow=!0,M.add(N);const F=Math.random()*Math.PI*2,V=5+Math.random()*105,C=Math.cos(F)*V,I=Math.sin(F)*V,G=this.getTerrainHeight(C,I);M.position.set(C,G,I),M.lookAt(0,G,0),M.scale.setScalar(.8+Math.random()*.5),M.userData={type:"squirrel",wanderAngle:Math.random()*Math.PI*2},this.animalGroup.add(M)}this.scene.add(this.animalGroup),this.adam=new xt;const g=new pt({color:13409400,roughness:.8,flatShading:!0}),p=new q(new zt(.24,.28,1.1,8),g);p.position.y=1.05,p.castShadow=!0;const f=new q(new Wt(.2,10,10),g);f.position.y=1.72,f.castShadow=!0;const w=new q(new zt(.08,.07,.9,6),g);w.position.set(-.35,1.1,0),w.castShadow=!0;const x=w.clone();x.position.x=.35;const y=new q(new zt(.1,.09,.95,6),g);y.position.set(-.13,.48,0),y.castShadow=!0;const E=y.clone();E.position.x=.13,this.adam.add(p,f,w,x,y,E),this.adam.position.set(0,this.getTerrainHeight(0,4),4),this.adam.rotation.y=Math.PI,this.adam.visible=!1,this.scene.add(this.adam),window.addEventListener("resize",this.onWindowResize.bind(this)),this.renderer.domElement.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("keydown",b=>this.keys[b.code]=!0),window.addEventListener("keyup",b=>this.keys[b.code]=!1)}getTerrainHeight(t,e){return Math.sin(t*.015)*Math.cos(e*.015)*6.5+Math.sin(t*.05+e*.03)*1.8+Math.cos(t*.1)*Math.sin(e*.08)*.5+this.ground.position.y}onWindowResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}onMouseDown(t){this.movementEnabled&&(this.isDragging=!0,this.lastMouseX=t.clientX,this.lastMouseY=t.clientY)}onMouseUp(){this.isDragging=!1}onMouseMove(t){if(!this.isDragging||!this.movementEnabled)return;const e=t.clientX-this.lastMouseX,n=t.clientY-this.lastMouseY;this.targetYaw-=e*.0025,this.targetPitch-=n*.0025,this.targetPitch=Math.max(-Math.PI/4,Math.min(Math.PI/4,this.targetPitch)),this.lastMouseX=t.clientX,this.lastMouseY=t.clientY}async transitionDayOne(){ct.to(this.hemiLight,{intensity:.65,duration:3.5,ease:"power2.out"}),ct.to(this.skyMat.color,{r:43/255,g:58/255,b:82/255,duration:4,ease:"power2.out"}),this.scene.fog.color.set(2832978)}async transitionDayTwo(){ct.to(this.skyMat.color,{r:68/255,g:102/255,b:135/255,duration:3.5,ease:"power2.out"}),this.scene.fog.color.set(4482695)}async transitionDayThree(){ct.to(this.ground.position,{y:0,duration:4.5,ease:"power2.out"}),ct.to(this.waterMat,{opacity:.52,duration:4,ease:"power2.out"}),this.treeGroup.visible=!0,this.treeGroup.children.forEach(t=>{t.scale.set(0,0,0);const e=t.userData.originalScale,n=t.position.x,i=t.position.z;t.position.y=this.getTerrainHeight(n,i)+40,ct.to(t.position,{y:this.getTerrainHeight(n,i)-this.ground.position.y,duration:4.5,ease:"power2.out"}),ct.to(t.scale,{x:e,y:e,z:e,duration:2.5+Math.random()*2,delay:1+Math.random()*1.5,ease:"elastic.out(1, 0.75)"})}),this.foliageGroup.visible=!0,this.foliageGroup.children.forEach(t=>{t.scale.set(0,0,0);const e=t.userData.originalScale,n=t.position.x,i=t.position.z;t.position.y=this.getTerrainHeight(n,i)+40,ct.to(t.position,{y:this.getTerrainHeight(n,i)-this.ground.position.y,duration:4.5,ease:"power2.out"}),ct.to(t.scale,{x:e,y:e,z:e,duration:2+Math.random()*1.5,delay:.5+Math.random()*1.8,ease:"power2.out"})})}async transitionDayFour(){this.sunDisc.visible=!0,this.moonDisc.visible=!0,this.sunDisc.position.set(120,180,220),this.moonDisc.position.set(-140,120,260),ct.to(this.sunLight,{intensity:1.3,duration:4,ease:"power2.out"}),ct.to(this.starsMat,{opacity:.85,duration:3.5,ease:"power2.inOut"}),ct.to(this.skyMat.color,{r:96/255,g:125/255,b:158/255,duration:4,ease:"power2.out"}),this.scene.fog.color.set(6323614)}async transitionDayFive(){this.birdGroup.visible=!0,this.birdGroup.children.forEach(t=>{t.scale.set(0,0,0),ct.to(t.scale,{x:1,y:1,z:1,duration:2,ease:"back.out(1.7)"})}),this.fishGroup.visible=!0,this.fishGroup.children.forEach(t=>{t.scale.set(0,0,0);const e=t.scale.x===0?.7+Math.random()*.7:t.scale.x;ct.to(t.scale,{x:e,y:e,z:e,duration:2.5,ease:"power2.out",delay:Math.random()*1.5})})}async transitionDaySix(){this.animalGroup.visible=!0,this.animalGroup.children.forEach(t=>{t.scale.set(0,0,0),ct.to(t.scale,{x:1,y:1,z:1,duration:2.2,ease:"back.out(1.5)",delay:Math.random()*1.2})})}async formAdam(){this.adam.visible=!0,this.adam.position.y=this.getTerrainHeight(0,4)-2,ct.to(this.camera.position,{x:0,y:this.getTerrainHeight(0,4)+1.2,z:7.5,duration:6,ease:"power1.inOut"}),ct.to(this.adam.position,{y:this.getTerrainHeight(0,4),duration:7,ease:"power2.out"})}unlockControls(){this.movementEnabled=!0,this.targetYaw=Math.PI,this.targetPitch=-.15}update(t,e){const n=t;if(this.water.visible){const i=this.waterGeo.attributes.position;for(let s=0;s<i.count;s++){const o=i.getX(s),a=i.getZ(s),l=Math.sin(o*.05+n*1.2)*Math.cos(a*.05+n*1)*.2+Math.sin(o*.12-n*1.8)*.08;i.setY(s,l)}this.waterGeo.computeVertexNormals(),i.needsUpdate=!0}if(this.fishGroup.visible&&this.fishGroup.children.forEach(i=>{const s=i.userData;s.angle+=e*s.speed*(1+Math.sin(n*.8+s.phaseOffset)*.2);const o=s.radius+Math.sin(n*.5+s.phaseOffset)*1.5,a=Math.cos(s.angle)*o,l=Math.sin(s.angle)*o;i.position.x=a,i.position.z=l,i.position.y=s.depth+Math.sin(n*1.5+s.phaseOffset)*.15,i.lookAt(Math.cos(s.angle+.05)*o,i.position.y,Math.sin(s.angle+.05)*o),s.tail&&(s.tail.rotation.y=Math.sin(n*s.wiggleSpeed)*.35)}),this.birdGroup.visible&&this.birdGroup.children.forEach(i=>{const s=i.userData,o=n*s.speed+s.offset,a=s.radius+Math.cos(n*.3+s.yawOffset)*4,l=s.height+Math.sin(n*.8+s.offset)*.8;i.position.set(Math.cos(o)*a,l,Math.sin(o)*a),i.lookAt(Math.cos(o+.05)*a,l+Math.sin((n+.05)*.8+s.offset)*.05,Math.sin(o+.05)*a);const h=s.mesh.geometry.attributes.position,u=Math.sin(n*8+s.offset)*.16;h.setY(1,u),h.setY(4,u),h.needsUpdate=!0}),this.animalGroup.visible&&this.animalGroup.children.forEach(i=>{const s=i.userData.type;let o=0;s==="sheep"?o=.25:s==="lion"?o=.4:s==="squirrel"&&(o=.6),Math.random()<.015&&(i.userData.wanderAngle+=(Math.random()-.5)*2);const a=e*o,l=Math.sin(i.userData.wanderAngle)*a,c=Math.cos(i.userData.wanderAngle)*a,h=i.position.x+l,u=i.position.z+c,d=Math.sqrt(h*h+u*u);d>5&&d<190?(i.position.x=h,i.position.z=u,i.position.y=this.getTerrainHeight(h,u),i.lookAt(h+l*10,i.position.y,u+c*10)):i.userData.wanderAngle+=Math.PI}),this.yaw+=(this.targetYaw-this.yaw)*.1,this.pitch+=(this.targetPitch-this.pitch)*.1,this.movementEnabled){const i=2.4*e,s=new B;this.camera.getWorldDirection(s),s.y=0,s.normalize();const o=new B;o.crossVectors(s,this.camera.up).normalize();const a=new B;if(this.keys.KeyW&&a.add(s),this.keys.KeyS&&a.sub(s),this.keys.KeyD&&a.add(o),this.keys.KeyA&&a.sub(o),a.lengthSq()>0){a.normalize().multiplyScalar(i),this.adam.position.add(a),this.adam.position.y=this.getTerrainHeight(this.adam.position.x,this.adam.position.z);const d=Math.atan2(a.x,a.z);this.adam.rotation.y=d;const m=Math.sin(n*9)*.42;this.adam.children[4].rotation.x=m,this.adam.children[5].rotation.x=-m,this.adam.children[2].rotation.x=-m,this.adam.children[3].rotation.x=m}else this.adam.children[4].rotation.x*=.85,this.adam.children[5].rotation.x*=.85,this.adam.children[2].rotation.x*=.85,this.adam.children[3].rotation.x*=.85;const l=4.5,c=new B(Math.sin(this.yaw)*Math.cos(this.pitch)*l,Math.sin(this.pitch)*l+1.4,Math.cos(this.yaw)*Math.cos(this.pitch)*l),h=this.adam.position.clone().add(c);this.camera.position.lerp(h,.12);const u=new B(this.adam.position.x,this.adam.position.y+1.2,this.adam.position.z);this.camera.lookAt(u)}this.renderer.render(this.scene,this.camera)}}class wv{constructor(t){this.container=t,this.width=window.innerWidth,this.height=window.innerHeight,this.clock=new Xo,this.movementEnabled=!1,this.keys={},this.yaw=Math.PI,this.pitch=-.15,this.targetYaw=Math.PI,this.targetPitch=-.15,this.isDragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.isFallen=!1,this.fruitInHand=null,this.init()}init(){this.renderer=new ua({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.width,this.height),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=sa,this.container.appendChild(this.renderer.domElement),this.scene=new Go,this.scene.background=new jt(14477040),this.scene.fog=new hs(14477040,.005),this.camera=new Ve(55,this.width/this.height,.1,2e3),this.camera.position.set(0,1.6,12),this.hemiLight=new Vo(16774630,4017968,.95),this.scene.add(this.hemiLight),this.sunLight=new Wo(16772822,1.45),this.sunLight.position.set(80,120,100),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.scene.add(this.sunLight),this.presenceLight=new e_(16774048,0,35,Math.PI/7,.5,1),this.presenceLight.position.set(0,18,-10),this.presenceLight.castShadow=!0,this.scene.add(this.presenceLight),this.scene.add(this.presenceLight.target);const t=new Kn(450,450,80,80);t.rotateX(-Math.PI/2);const e=t.attributes.position;for(let L=0;L<e.count;L++){const D=e.getX(L),j=e.getZ(L),tt=Math.sin(D*.012)*Math.cos(j*.012)*5+Math.sin(D*.06+j*.04)*1.2;e.setY(L,tt)}t.computeVertexNormals(),this.groundMat=new pt({color:3825445,roughness:.85,metalness:0,flatShading:!0}),this.ground=new q(t,this.groundMat),this.ground.receiveShadow=!0,this.scene.add(this.ground),this.waterMat=new pt({color:1200486,roughness:.08,metalness:.1,transparent:!0,opacity:.72,flatShading:!0}),this.riversGroup=new xt;for(let L=0;L<4;L++){const D=new Kn(12,220);D.rotateX(-Math.PI/2);const j=new q(D,this.waterMat);j.rotation.y=L*Math.PI/2,j.position.set(0,-1.45,0),this.riversGroup.add(j)}this.scene.add(this.riversGroup),this.foliageGroup=new xt;const n=[16735067,16765503,3900150,15485081];for(let L=0;L<200;L++){const D=new xt,j=new pt({color:5209394,roughness:.9,flatShading:!0});for(let vt=0;vt<3;vt++){const It=new q(new Bt(.06,.45,.02),j);It.rotation.y=vt*Math.PI/3,It.rotation.x=.15-Math.random()*.3,It.position.y=.22,D.add(It)}const tt=Math.random()*Math.PI*2,nt=6+Math.random()*95,mt=Math.cos(tt)*nt,Tt=Math.sin(tt)*nt,yt=this.getTerrainHeight(mt,Tt);D.position.set(mt,yt,Tt),D.scale.setScalar(.8+Math.random()*.6),this.foliageGroup.add(D)}for(let L=0;L<110;L++){const D=new xt,j=new q(new zt(.02,.02,.4),new pt({color:5209394}));j.position.y=.2,D.add(j);const tt=n[Math.floor(Math.random()*n.length)],nt=new q(new Wt(.08,4,4),new pt({color:tt,flatShading:!0}));nt.position.y=.42,D.add(nt);const mt=Math.random()*Math.PI*2,Tt=5+Math.random()*80,yt=Math.cos(mt)*Tt,vt=Math.sin(mt)*Tt,It=this.getTerrainHeight(yt,vt);D.position.set(yt,It,vt),D.scale.setScalar(.8+Math.random()*.6),this.foliageGroup.add(D)}this.scene.add(this.foliageGroup),this.treeGroup=new xt;const i=[3100446,3892260,4749869];for(let L=0;L<60;L++){const D=new xt,j=new q(new zt(.12,.22,2.2,5),new pt({color:5125668,roughness:.9}));j.position.y=1.1,j.castShadow=!0,D.add(j);const tt=new q(new Wt(1.1,6,6),new pt({color:i[Math.floor(Math.random()*i.length)],roughness:.9,flatShading:!0}));tt.position.y=2.4,tt.castShadow=!0,D.add(tt);const nt=Math.random()*Math.PI*2,mt=18+Math.random()*95,Tt=Math.cos(nt)*mt,yt=Math.sin(nt)*mt,vt=this.getTerrainHeight(Tt,yt);D.position.set(Tt,vt,yt),D.scale.setScalar(.8+Math.random()*.9),this.treeGroup.add(D)}const s=new xt;s.position.set(10,this.getTerrainHeight(10,-10),-10);for(let L=0;L<3;L++){const D=new xt,j=new q(new zt(.15,.25,2.8,6),new pt({color:5125668}));j.position.y=1.4,j.castShadow=!0;const tt=new q(new Wt(1.6,6,6),new pt({color:2244632,flatShading:!0}));tt.position.y=3.2,tt.castShadow=!0,D.add(j,tt);const nt=L*Math.PI*2/3;D.position.set(Math.cos(nt)*1.5,0,Math.sin(nt)*1.5),s.add(D)}for(let L=0;L<5;L++){const D=new q(new Wt(.85,4,4),new pt({color:1915412,flatShading:!0}));D.castShadow=!0;const j=L*Math.PI*2/5;D.position.set(Math.cos(j)*2.2,.45,Math.sin(j)*2.2),s.add(D)}this.treeGroup.add(s),this.scene.add(this.treeGroup),this.centerTree=new xt;const o=new pt({color:2823433,roughness:.95,flatShading:!0});for(let L=0;L<3;L++){const D=new q(new zt(.14,.24,4.8,5),o);D.castShadow=!0,D.receiveShadow=!0;const j=L*Math.PI*2/3;D.position.set(Math.cos(j)*.22,2.4,Math.sin(j)*.22),D.rotation.y=j,D.rotation.z=.08,this.centerTree.add(D)}this.cLeavesMat=new pt({color:1455645,roughness:.85,flatShading:!0}),this.cLeavesGoldMat=new pt({color:4012048,roughness:.8,flatShading:!0});const a=new q(new Wt(2.8,8,8),this.cLeavesMat);a.position.y=5.2,a.castShadow=!0,this.centerTree.add(a);const l=new q(new Wt(1.6,7,7),this.cLeavesGoldMat);l.position.set(0,6.8,0),l.castShadow=!0,this.centerTree.add(l);const c=new pt({color:1125143,roughness:.9});for(let L=0;L<8;L++){const D=new q(new Zr(.15,1.8,4),c),j=L*Math.PI*2/8;D.position.set(Math.cos(j)*2.2,3.8,Math.sin(j)*2.2),this.centerTree.add(D)}this.forbiddenFruits=new xt;const h=[16727040,9055202];for(let L=0;L<9;L++){const D=h[L%2],j=new pt({color:D,emissive:D,emissiveIntensity:.95,roughness:.3}),tt=new q(new Wt(.24,8,8),j),nt=L*Math.PI*2/9;tt.position.set(Math.cos(nt)*1.8,4.4+Math.random()*.8,Math.sin(nt)*1.8),this.forbiddenFruits.add(tt)}this.centerTree.add(this.forbiddenFruits),this.centerTree.position.set(0,this.getTerrainHeight(0,0),0),this.scene.add(this.centerTree),this.serpent=new xt;const u=[1145379,1118481,16770560],d=28;for(let L=0;L<d;L++){const D=1-L/d*.65,j=new q(new Wt(.15*D,8,8),new pt({color:u[L%3],roughness:.25,flatShading:!0})),tt=L*.45,nt=.5+L*.05;j.position.set(Math.cos(tt)*.42,nt,Math.sin(tt)*.42),j.castShadow=!0,this.serpent.add(j)}this.serpentHead=new xt;const m=new q(new Bt(.24,.14,.32),new pt({color:1004060,roughness:.3})),_=new q(new Wt(.045,6,6),new Ln({color:16711680}));_.position.set(.09,.04,.1);const g=_.clone();g.position.x=-.09;const p=new q(new Bt(.02,.01,.18),new Ln({color:16716049}));p.position.set(0,-.04,.22);const f=new q(new Bt(.01,.01,.08),new Ln({color:16716049}));f.position.set(-.02,-.04,.3),f.rotation.y=.4;const w=f.clone();w.position.x=.02,w.rotation.y=-.4,this.serpentHead.add(m,_,g,p,f,w);const x=d*.45;this.serpentHead.position.set(Math.cos(x)*.44,.5+d*.05,Math.sin(x)*.44),this.serpentHead.lookAt(-7,.5+d*.05,9),this.serpent.add(this.serpentHead),this.serpent.position.copy(this.centerTree.position),this.scene.add(this.serpent),this.eastGateGroup=new xt,this.eastGateGroup.position.set(22,this.getTerrainHeight(22,0),0),this.eastGateGroup.visible=!1;const y=new pt({color:16766720,metalness:.95,roughness:.1,emissive:16758528,emissiveIntensity:.15});for(let L=0;L<2;L++){const D=new xt,j=new q(new zt(.25,.35,1.8,8),y);j.position.y=.9,j.castShadow=!0;const tt=new q(new Wt(.2,10,10),y);tt.position.y=1.95;const nt=new q(new Bt(.06,1.6,.65),y);nt.position.set(-.4,1.3,-.2),nt.rotation.y=.3,nt.rotation.z=-.25;const mt=nt.clone();mt.position.x=.4,mt.rotation.y=-.3,mt.rotation.z=.25,D.add(j,tt,nt,mt),D.position.set(0,0,L===0?-2.8:2.8),D.lookAt(0,0,0),this.eastGateGroup.add(D)}this.flamingSword=new xt;const E=new q(new Bt(.08,1.4,.24),new pt({color:16724736,emissive:16720384,emissiveIntensity:3}));E.position.y=.8,E.castShadow=!0;const b=new q(new Bt(.45,.08,.12),y);b.position.y=.1,this.flamingSword.add(E,b),this.flamingSword.position.set(0,1.5,0),this.eastGateGroup.add(this.flamingSword),this.scene.add(this.eastGateGroup),this.eve=new xt,this.eve.name="Eve";const M=new pt({color:15447188,roughness:.85}),P=new pt({color:15124597,roughness:.9}),v=new q(new zt(.2,.25,1,8),M);v.position.y=1,v.castShadow=!0;const T=new q(new Wt(.18,10,10),M);T.position.y=1.62,T.castShadow=!0;const N=new q(new Bt(.24,.6,.24),P);N.position.set(0,1.5,-.06),this.eveArmL=new q(new zt(.06,.05,.85),M),this.eveArmL.position.set(-.3,1,0),this.eveArmL.castShadow=!0,this.eveArmR=this.eveArmL.clone(),this.eveArmR.position.x=.3;const F=new q(new zt(.08,.08,.9,6),M);F.position.set(-.1,.45,0),F.castShadow=!0;const V=F.clone();V.position.x=.1,this.eve.add(v,T,N,this.eveArmL,this.eveArmR,F,V),this.eve.position.set(-7,this.getTerrainHeight(-7,9),9),this.eve.lookAt(0,this.eve.position.y,0),this.scene.add(this.eve),this.adam=new xt,this.adam.name="Adam";const C=new pt({color:13409400,roughness:.8,flatShading:!0}),I=new pt({color:4337445,roughness:.9}),G=new q(new zt(.24,.28,1.1,8),C);G.position.y=1.05,G.castShadow=!0;const z=new q(new Wt(.2,10,10),C);z.position.y=1.72,z.castShadow=!0;const Q=new q(new Bt(.26,.2,.26),I);Q.position.set(0,1.84,0),this.adamArmL=new q(new zt(.08,.07,.9,6),C),this.adamArmL.position.set(-.35,1.1,0),this.adamArmL.castShadow=!0,this.adamArmR=this.adamArmL.clone(),this.adamArmR.position.x=.35;const $=new q(new zt(.1,.09,.95,6),C);$.position.set(-.12,.48,0),$.castShadow=!0;const Z=$.clone();Z.position.x=.12,this.adam.add(G,z,Q,this.adamArmL,this.adamArmR,$,Z),this.adam.position.set(-9,this.getTerrainHeight(-9,9),9),this.adam.lookAt(0,this.adam.position.y,0),this.scene.add(this.adam),this.animalGroup=new xt;for(let L=0;L<30;L++){const D=L%3,j=new xt;if(D===0){const vt=new q(new Wt(.48,5,5),new pt({color:15658734,roughness:.9}));vt.scale.set(1.3,1,1),vt.position.y=.65,j.add(vt);const It=new q(new Wt(.18,5,5),new pt({color:1710618}));It.position.set(0,.9,.55),j.add(It),j.userData={type:"sheep",wanderAngle:Math.random()*Math.PI*2,speed:.22}}else if(D===1){const vt=new q(new Bt(.65,.55,1.2),new pt({color:13279334,roughness:.8}));vt.position.y=.65,j.add(vt);const It=new q(new zt(.38,.44,.5,6),new pt({color:4861469}));It.position.set(0,.95,.45),It.rotation.x=Math.PI/3,j.add(It),j.userData={type:"lion",wanderAngle:Math.random()*Math.PI*2,speed:.38}}else{const vt=new q(new Bt(.2,.16,.32),new pt({color:9394225}));vt.position.y=.12,j.add(vt);const It=new q(new Bt(.08,.25,.12),new pt({color:9394225}));It.position.set(0,.22,-.16),It.rotation.x=-.4,j.add(It),j.userData={type:"squirrel",wanderAngle:Math.random()*Math.PI*2,speed:.55}}const tt=Math.random()*Math.PI*2,nt=10+Math.random()*110,mt=Math.cos(tt)*nt,Tt=Math.sin(tt)*nt,yt=this.getTerrainHeight(mt,Tt);j.position.set(mt,yt,Tt),j.lookAt(0,yt,0),j.scale.setScalar(.85+Math.random()*.3),this.animalGroup.add(j)}this.scene.add(this.animalGroup),window.addEventListener("resize",this.onWindowResize.bind(this)),this.renderer.domElement.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("keydown",L=>this.keys[L.code]=!0),window.addEventListener("keyup",L=>this.keys[L.code]=!1)}getTerrainHeight(t,e){return Math.sin(t*.012)*Math.cos(e*.012)*5+Math.sin(t*.06+e*.04)*1.2+this.ground.position.y}checkCollision(t,e){return Math.sqrt(t*t+e*e)<1.35}onWindowResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}onMouseDown(t){this.movementEnabled&&(this.isDragging=!0,this.lastMouseX=t.clientX,this.lastMouseY=t.clientY)}onMouseUp(){this.isDragging=!1}onMouseMove(t){if(!this.isDragging||!this.movementEnabled)return;const e=t.clientX-this.lastMouseX,n=t.clientY-this.lastMouseY;this.targetYaw-=e*.0025,this.targetPitch-=n*.0025,this.targetPitch=Math.max(-Math.PI/4,Math.min(Math.PI/4,this.targetPitch)),this.lastMouseX=t.clientX,this.lastMouseY=t.clientY}coverThemselves(){ct.to(this.eveArmL.rotation,{z:.65,x:-.3,duration:1.5}),ct.to(this.eveArmR.rotation,{z:-.65,x:-.3,duration:1.5}),ct.to(this.adamArmL.rotation,{z:.65,x:-.3,duration:1.5}),ct.to(this.adamArmR.rotation,{z:-.65,x:-.3,duration:1.5})}triggerTheFall(){this.isFallen=!0,ct.to(this.scene.background,{r:.1,g:.09,b:.14,duration:6,ease:"power2.inOut"}),ct.to(this.scene.fog.color,{r:.1,g:.09,b:.14,duration:6,ease:"power2.inOut"}),ct.to(this.scene.fog,{density:.012,duration:6,ease:"power2.inOut"}),ct.to(this.hemiLight,{intensity:.25,duration:5.5,ease:"power2.out"}),ct.to(this.sunLight,{intensity:.15,duration:5.5,ease:"power2.out"}),ct.to(this.groundMat.color,{r:92/255,g:79/255,b:64/255,duration:5.5}),this.riversGroup.children.forEach(t=>{ct.to(t.material.color,{r:24/255,g:26/255,b:31/255,duration:5})}),this.foliageGroup.children.forEach(t=>{ct.to(t.scale,{x:.1,y:.01,z:.1,duration:4,ease:"power2.in"})}),this.treeGroup.children.forEach(t=>{const e=t.children[1];e&&e.material&&ct.to(e.material.color,{r:85/255,g:68/255,b:51/255,duration:5})}),ct.to(this.cLeavesMat.color,{r:56/255,g:39/255,b:24/255,duration:5}),ct.to(this.cLeavesGoldMat.color,{r:40/255,g:32/255,b:20/255,duration:5}),this.forbiddenFruits.children.forEach(t=>{ct.to(t.material,{emissiveIntensity:0,duration:3.5}),ct.to(t.material.color,{r:.15,g:.05,b:.1,duration:4})}),this.animalGroup.children.forEach(t=>{t.userData.speed*=2.6;const e=Math.atan2(t.position.z,t.position.x);t.userData.wanderAngle=e+(Math.random()-.5)*.5})}unlockControls(){this.movementEnabled=!0,this.targetYaw=Math.PI,this.targetPitch=-.15}update(t,e){const n=t;if(this.riversGroup.children.forEach(i=>{const s=i.geometry.attributes.position;for(let o=0;o<s.count;o++){const a=s.getX(o),l=s.getZ(o),c=Math.sin(a*.04+n*.8)*Math.cos(l*.04+n*.7)*.18;s.setY(o,c)}i.geometry.computeVertexNormals(),s.needsUpdate=!0}),this.forbiddenFruits&&!this.isFallen&&this.forbiddenFruits.children.forEach((i,s)=>{const o=1+Math.sin(n*2.5+s)*.12;i.scale.setScalar(o),i.material.emissiveIntensity=.85+Math.sin(n*2.5+s)*.15}),this.serpent&&!this.isFallen){this.serpent.children.forEach((o,a)=>{if(a<28){const l=a*.45+Math.sin(n*2-a*.15)*.08;o.position.x=Math.cos(l)*.42,o.position.z=Math.sin(l)*.42}});const s=28*.45+Math.sin(n*2-28*.15)*.05;this.serpentHead.position.set(Math.cos(s)*.44,.5+28*.05,Math.sin(s)*.44)}if(this.animalGroup.visible&&this.animalGroup.children.forEach(i=>{const s=i.userData.speed;!this.isFallen&&Math.random()<.015&&(i.userData.wanderAngle+=(Math.random()-.5)*2);const o=e*s,a=Math.sin(i.userData.wanderAngle)*o,l=Math.cos(i.userData.wanderAngle)*o,c=i.position.x+a,h=i.position.z+l,u=Math.sqrt(c*c+h*h);u>3&&u<210?(i.position.x=c,i.position.z=h,i.position.y=this.getTerrainHeight(c,h),i.lookAt(c+a*10,i.position.y,h+l*10)):i.userData.wanderAngle+=Math.PI}),this.movementEnabled&&!this.isFallen&&this.adam)if(this.eve.position.distanceTo(this.adam.position)>2.8){this.eve.lookAt(this.adam.position.x,this.eve.position.y,this.adam.position.z);const s=1.6*e,o=new B().subVectors(this.adam.position,this.eve.position);o.y=0,o.normalize().multiplyScalar(s),this.eve.position.add(o),this.eve.position.y=this.getTerrainHeight(this.eve.position.x,this.eve.position.z);const a=Math.sin(n*8.5)*.4;this.eve.children[5].rotation.x=a,this.eve.children[6].rotation.x=-a}else this.eve.lookAt(this.adam.position.x,this.eve.position.y,this.adam.position.z),this.eve.children[5].rotation.x*=.85,this.eve.children[6].rotation.x*=.85;if(this.presenceLight&&this.presenceLight.intensity>0&&(this.presenceLight.target.position.x=Math.sin(n*1.5)*4.5,this.presenceLight.target.position.z=Math.cos(n*1.5)*4.5),this.eastGateGroup.visible&&this.flamingSword&&(this.flamingSword.rotation.y+=e*4.5,this.flamingSword.position.y=1.5+Math.sin(n*3.5)*.15),this.yaw+=(this.targetYaw-this.yaw)*.1,this.pitch+=(this.targetPitch-this.pitch)*.1,this.movementEnabled){const i=2.4*e,s=new B;this.camera.getWorldDirection(s),s.y=0,s.normalize();const o=new B;o.crossVectors(s,this.camera.up).normalize();const a=new B;if(this.keys.KeyW&&a.add(s),this.keys.KeyS&&a.sub(s),this.keys.KeyD&&a.add(o),this.keys.KeyA&&a.sub(o),a.lengthSq()>0){a.normalize().multiplyScalar(i);const d=this.adam.position.x+a.x,m=this.adam.position.z+a.z;this.checkCollision(d,m)||(this.adam.position.x=d,this.adam.position.z=m,this.adam.position.y=this.getTerrainHeight(this.adam.position.x,this.adam.position.z));const _=Math.atan2(a.x,a.z);this.adam.rotation.y=_;const g=Math.sin(n*9)*.42;this.adam.children[5].rotation.x=g,this.adam.children[6].rotation.x=-g,this.adam.children[3].rotation.x=-g,this.adam.children[4].rotation.x=g}else this.adam.children[5].rotation.x*=.85,this.adam.children[6].rotation.x*=.85,this.adam.children[3].rotation.x*=.85,this.adam.children[4].rotation.x*=.85;const l=5,c=new B(Math.sin(this.yaw)*Math.cos(this.pitch)*l,Math.sin(this.pitch)*l+1.4,Math.cos(this.yaw)*Math.cos(this.pitch)*l),h=this.adam.position.clone().add(c);this.camera.position.lerp(h,.12);const u=new B(this.adam.position.x,this.adam.position.y+1.2,this.adam.position.z);this.camera.lookAt(u)}this.renderer.render(this.scene,this.camera)}}class Ev{constructor(t){this.container=t,this.width=window.innerWidth,this.height=window.innerHeight,this.clock=new Xo,this.movementEnabled=!1,this.keys={},this.yaw=Math.PI,this.pitch=-.15,this.targetYaw=Math.PI,this.targetPitch=-.15,this.isDragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.altarLightActive=!1,this.altarSmokeActive=!1,this.smokeParticles=[],this.init()}init(){this.renderer=new ua({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.width,this.height),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=sa,this.container.appendChild(this.renderer.domElement),this.scene=new Go,this.scene.background=new jt(14410709),this.scene.fog=new hs(14410709,.006),this.camera=new Ve(55,this.width/this.height,.1,2e3),this.camera.position.set(-9,2,15),this.hemiLight=new Vo(16773856,5070656,.95),this.scene.add(this.hemiLight),this.sunLight=new Wo(16772306,1.3),this.sunLight.position.set(70,110,80),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=1024,this.sunLight.shadow.mapSize.height=1024,this.scene.add(this.sunLight);const t=new Kn(400,400,60,60);t.rotateX(-Math.PI/2);const e=t.attributes.position;for(let Et=0;Et<e.count;Et++){const R=e.getX(Et),S=e.getZ(Et),H=Math.sin(R*.015)*Math.cos(S*.015)*4.2+Math.sin(R*.07+S*.05)*.95;e.setY(Et,H)}t.computeVertexNormals(),this.groundMat=new pt({color:4811828,roughness:.9,metalness:0,flatShading:!0}),this.ground=new q(t,this.groundMat),this.ground.receiveShadow=!0,this.scene.add(this.ground),this.soilGroup=new xt;const n=new pt({color:4860438,roughness:.95,flatShading:!0});for(let Et=0;Et<4;Et++){const R=new q(new Kn(8,12),n);R.rotateX(-Math.PI/2);const S=-12-Et*3,H=-6+Et*4;R.position.set(S,this.getTerrainHeight(S,H)+.02,H),R.receiveShadow=!0,this.soilGroup.add(R);for(let it=-4;it<=4;it+=2){const et=new q(new Bt(.15,.08,11.5),n);et.position.set(it,.04,0),R.add(et)}}this.scene.add(this.soilGroup);const i=new pt({color:5916730,roughness:.9});this.fencesGroup=new xt,[{x:12,z:6,rot:.3},{x:18,z:12,rot:-.4},{x:24,z:8,rot:.7},{x:15,z:-2,rot:-.1},{x:22,z:-8,rot:.5}].forEach(Et=>{const R=new q(new Bt(.12,1.2,.12),i);R.position.set(Et.x,this.getTerrainHeight(Et.x,Et.z)+.6,Et.z),R.rotation.y=Et.rot,R.castShadow=!0;const S=new q(new Bt(3.5,.1,.05),i);S.position.set(1.5,.2,0),R.add(S);const H=S.clone();H.position.y=-.3,R.add(H),this.fencesGroup.add(R)}),this.scene.add(this.fencesGroup),this.altarGroup=new xt;const o=new pt({color:7237230,roughness:.9,flatShading:!0}),a=(Et,R)=>{const S=new xt;for(let et=0;et<9;et++){const rt=new q(new Bt(.6+Math.random()*.2,.4,.6+Math.random()*.2),o),Mt=et*Math.PI*2/6;rt.position.set(Math.cos(Mt)*.45+(Math.random()-.5)*.1,.2+Math.floor(et/3)*.38,Math.sin(Mt)*.45+(Math.random()-.5)*.1),rt.rotation.set(Math.random()*.2,Math.random()*3,Math.random()*.2),rt.castShadow=!0,S.add(rt)}const H=new q(new Bt(1.5,.22,1.5),o);H.position.y=1.25,H.castShadow=!0,S.add(H);const it=this.getTerrainHeight(Et,R);return S.position.set(Et,it,R),S};this.cainAltar=a(-2.8,0),this.abelAltar=a(2.8,0),this.altarGroup.add(this.cainAltar,this.abelAltar),this.scene.add(this.altarGroup);const l=new pt({color:16185078,roughness:.9}),c=new xt,h=new q(new Wt(.2,5,5),l);h.scale.set(1.4,1,1);const u=new q(new Wt(.08,4,4),new pt({color:2236962}));u.position.set(.18,.1,0),c.add(h,u),c.position.set(0,1.45,0),c.rotation.z=.2,this.abelAltar.add(c);const d=new xt,m=new q(new zt(.3,.24,.2,8),i);m.position.y=1.38,d.add(m);const _=[14496512,14529536,3385873];for(let Et=0;Et<6;Et++){const R=new q(new Wt(.07,4,4),new pt({color:_[Et%3],roughness:.4}));R.position.set((Math.random()-.5)*.25,1.5,(Math.random()-.5)*.25),d.add(R)}this.cainAltar.add(d),this.abelLightPillar=new q(new zt(.9,.9,35,12,1,!0),new Ln({color:16767104,transparent:!0,opacity:0,side:vn})),this.abelLightPillar.position.set(0,17.5,0),this.abelAltar.add(this.abelLightPillar),this.shelterGroup=new xt;const g=-16,p=12,f=this.getTerrainHeight(g,p);this.shelterGroup.position.set(g,f,p);const w=new q(new Bt(.15,2.5,3.5),i);w.position.set(-2.2,1.25,0);const x=w.clone();x.position.x=2.2;const y=new q(new Bt(5,.15,4.2),new pt({color:9072721,roughness:.95}));y.position.set(0,2.5,0),y.rotation.z=.06,this.crib=new xt;const E=new q(new Bt(1.2,.5,.75),i);E.position.set(0,.25,0),this.crib.add(E);const b=new pt({color:16770273,roughness:.6});this.babyCainMesh=new xt;const M=new q(new zt(.1,.1,.45,6),b);M.rotation.z=Math.PI/2;const P=new q(new Wt(.12,6,6),new pt({color:15447188}));P.position.set(-.25,0,0),this.babyCainMesh.add(M,P),this.babyCainMesh.position.set(-.2,.52,0),this.crib.add(this.babyCainMesh),this.babyAbelMesh=new xt;const v=new q(new zt(.1,.1,.45,6),b);v.rotation.z=Math.PI/2;const T=new q(new Wt(.12,6,6),new pt({color:15447188}));T.position.set(-.25,0,0),this.babyAbelMesh.add(v,T),this.babyAbelMesh.position.set(.2,.52,0),this.crib.add(this.babyAbelMesh),this.shelterGroup.add(w,x,y,this.crib),this.scene.add(this.shelterGroup),this.edenGate=new xt,this.edenGate.position.set(-30,this.getTerrainHeight(-30,-35),-35);const N=new pt({color:16766720,metalness:.95,roughness:.1,emissive:16758528,emissiveIntensity:.12});for(let Et=0;Et<2;Et++){const R=new xt,S=new q(new zt(.25,.35,2,6),N);S.position.y=1;const H=new q(new Wt(.22,6,6),N);H.position.y=2.1;const it=new q(new Bt(.06,1.8,.65),N);it.position.set(-.45,1.4,-.2),it.rotation.y=.3,it.rotation.z=-.2;const et=it.clone();et.position.x=.45,et.rotation.y=-.3,et.rotation.z=.2,R.add(S,H,it,et),R.position.set(Et===0?-3:3,0,0),R.lookAt(0,0,10),this.edenGate.add(R)}this.flamingSword=new xt;const F=new q(new Bt(.08,1.6,.24),new pt({color:16726784,emissive:16720384,emissiveIntensity:3.5}));F.position.y=.9;const V=new q(new Bt(.48,.08,.12),N);V.position.y=.1,this.flamingSword.add(F,V),this.flamingSword.position.set(0,1.6,0),this.edenGate.add(this.flamingSword),this.scene.add(this.edenGate),this.adam=new xt,this.adam.name="Adam";const C=new pt({color:13409400,roughness:.85}),I=new pt({color:4337445,roughness:.9}),G=new q(new zt(.24,.28,1.1,8),C);G.position.y=1.05;const z=new q(new Wt(.2,10,10),C);z.position.y=1.72;const Q=new q(new Bt(.26,.2,.26),I);Q.position.set(0,1.84,0),this.adamArmL=new q(new zt(.08,.07,.9,6),C),this.adamArmL.position.set(-.35,1.1,0),this.adamArmR=this.adamArmL.clone(),this.adamArmR.position.x=.35;const $=new q(new zt(.1,.09,.95,6),C);$.position.set(-.12,.48,0);const Z=$.clone();Z.position.x=.12,this.adam.add(G,z,Q,this.adamArmL,this.adamArmR,$,Z),this.adam.position.set(-14.5,this.getTerrainHeight(-14.5,10),10),this.adam.lookAt(-16,this.adam.position.y,12),this.scene.add(this.adam),this.eve=new xt,this.eve.name="Eve";const L=new pt({color:15124597,roughness:.9}),D=new q(new zt(.2,.25,1,8),C);D.position.y=1;const j=new q(new Wt(.18,10,10),C);j.position.y=1.62;const tt=new q(new Bt(.24,.6,.24),L);tt.position.set(0,1.5,-.06),this.eveArmL=new q(new zt(.06,.05,.85),C),this.eveArmL.position.set(-.3,1,0),this.eveArmR=this.eveArmL.clone(),this.eveArmR.position.x=.3;const nt=new q(new zt(.08,.08,.9,6),C);nt.position.set(-.1,.45,0);const mt=nt.clone();mt.position.x=.1,this.eve.add(D,j,tt,this.eveArmL,this.eveArmR,nt,mt),this.eve.position.set(-15.5,this.getTerrainHeight(-15.5,10),10),this.eve.lookAt(-16,this.eve.position.y,12),this.scene.add(this.eve),this.cain=new xt,this.cain.name="Cain",this.cain.visible=!1;const Tt=new pt({color:7228983,roughness:.9}),yt=new q(new zt(.22,.26,1.05,8),Tt);yt.position.y=1.05;const vt=new q(new Wt(.19,10,10),C);vt.position.y=1.7;const It=new q(new Bt(.26,.24,.26),I);It.position.set(0,1.8,0),this.cainArmL=new q(new zt(.07,.06,.85),C),this.cainArmL.position.set(-.32,1.05,0),this.cainArmR=this.cainArmL.clone(),this.cainArmR.position.x=.32,this.weaponGroup=new xt;const Gt=new q(new zt(.03,.03,1.4,6),i);Gt.rotation.z=Math.PI/2;const W=new q(new Bt(.4,.18,.06),o);W.position.set(-.7,.1,0),this.weaponGroup.add(Gt,W),this.weaponGroup.position.set(.2,-.4,.25),this.weaponGroup.rotation.y=-.3,this.cainArmR.add(this.weaponGroup);const Pe=new q(new zt(.09,.08,.9,6),C);Pe.position.set(-.1,.45,0);const wt=Pe.clone();wt.position.x=.1,this.cain.add(yt,vt,It,this.cainArmL,this.cainArmR,Pe,wt),this.cain.position.set(-13,this.getTerrainHeight(-13,8),8),this.cain.lookAt(0,this.cain.position.y,0),this.scene.add(this.cain),this.abel=new xt,this.abel.name="Abel",this.abel.visible=!1;const Lt=new pt({color:13488068,roughness:.95}),Ct=new q(new zt(.2,.24,1,8),Lt);Ct.position.y=1;const le=new q(new Wt(.18,10,10),C);le.position.y=1.62;const kt=new q(new Bt(.24,.32,.24),L);kt.position.set(0,1.65,0),this.abelArmL=new q(new zt(.06,.05,.85),C),this.abelArmL.position.set(-.3,1,0),this.abelArmR=this.abelArmL.clone(),this.abelArmR.position.x=.3;const Nt=new q(new zt(.024,.024,1.5,6),i);Nt.position.set(.18,-.2,.2),Nt.rotation.x=.1,this.abelArmR.add(Nt);const Qt=new q(new zt(.08,.08,.9,6),C);Qt.position.set(-.1,.45,0);const ge=Qt.clone();ge.position.x=.1,this.abel.add(Ct,le,kt,this.abelArmL,this.abelArmR,Qt,ge),this.abel.position.set(-11,this.getTerrainHeight(-11,7.5),7.5),this.abel.lookAt(0,this.abel.position.y,0),this.scene.add(this.abel),this.cainMark=new q(new ko(.2,.35,8),new Ln({color:16711680,side:vn,transparent:!0,opacity:0})),this.cainMark.rotation.x=Math.PI/2,this.cainMark.position.y=2.15,this.cain.add(this.cainMark),this.sheepGroup=new xt;for(let Et=0;Et<7;Et++){const R=new xt,S=new q(new Wt(.36,5,5),l);S.scale.set(1.3,1,1),S.position.y=.48;const H=new q(new Wt(.14,5,5),new pt({color:2039583}));H.position.set(.4,.65,0),R.add(S,H);const it=14+Math.random()*8,et=2+Math.random()*8;R.position.set(it,this.getTerrainHeight(it,et),et),R.userData={wanderAngle:Math.random()*Math.PI*2,speed:.15+Math.random()*.1},this.sheepGroup.add(R)}this.scene.add(this.sheepGroup),window.addEventListener("resize",this.onWindowResize.bind(this)),this.renderer.domElement.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("keydown",Et=>this.keys[Et.code]=!0),window.addEventListener("keyup",Et=>this.keys[Et.code]=!1)}getTerrainHeight(t,e){return Math.sin(t*.015)*Math.cos(e*.015)*4.2+Math.sin(t*.07+e*.05)*.95+this.ground.position.y}onWindowResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}onMouseDown(t){this.movementEnabled&&(this.isDragging=!0,this.lastMouseX=t.clientX,this.lastMouseY=t.clientY)}onMouseUp(){this.isDragging=!1}onMouseMove(t){if(!this.isDragging||!this.movementEnabled)return;const e=t.clientX-this.lastMouseX,n=t.clientY-this.lastMouseY;this.targetYaw-=e*.0025,this.targetPitch-=n*.0025,this.targetPitch=Math.max(-Math.PI/4,Math.min(Math.PI/4,this.targetPitch)),this.lastMouseX=t.clientX,this.lastMouseY=t.clientY}unlockControls(){this.movementEnabled=!0,this.targetYaw=Math.PI,this.targetPitch=-.15}checkCollision(t,e){if(Math.sqrt((t+2.8)*(t+2.8)+e*e)<1.35||Math.sqrt((t-2.8)*(t-2.8)+e*e)<1.35||Math.sqrt((t+16)*(t+16)+(e-12)*(e-12))<2.8)return!0;const o=[{x:12,z:6},{x:18,z:12},{x:24,z:8},{x:15,z:-2},{x:22,z:-8}];for(const a of o)if(Math.sqrt((t-a.x)*(t-a.x)+(e-a.z)*(e-a.z))<1.25)return!0;return!1}update(t,e){const n=t;if(this.flamingSword&&(this.flamingSword.rotation.y+=e*4.2,this.flamingSword.position.y=1.6+Math.sin(n*3.5)*.12),this.sheepGroup.children.forEach(i=>{const s=i.userData.speed;Math.random()<.02&&(i.userData.wanderAngle+=(Math.random()-.5)*2.5);const o=Math.sin(i.userData.wanderAngle)*s*e,a=Math.cos(i.userData.wanderAngle)*s*e,l=i.position.x+o,c=i.position.z+a;l>11&&l<26&&c>-10&&c<14?(i.position.set(l,this.getTerrainHeight(l,c),c),i.lookAt(l+o*10,i.position.y,c+a*10)):i.userData.wanderAngle+=Math.PI}),this.altarLightActive&&this.abelLightPillar&&(this.abelLightPillar.rotation.y+=e*.5),this.altarSmokeActive&&Math.random()<.25){const i=new q(new Wt(.18+Math.random()*.1,4,4),new Ln({color:2236962,transparent:!0,opacity:.65}));i.position.set(-2.8+(Math.random()-.5)*.4,this.getTerrainHeight(-2.8,0)+1.45,(Math.random()-.5)*.4),this.scene.add(i),this.smokeParticles.push({mesh:i,vx:-.8-Math.random()*.8,vy:.8+Math.random()*.8,age:0,maxAge:2.2})}for(let i=this.smokeParticles.length-1;i>=0;i--){const s=this.smokeParticles[i];s.age+=e,s.mesh.position.x+=s.vx*e,s.mesh.position.y+=s.vy*e,s.mesh.scale.setScalar(1+s.age*1.5),s.mesh.material.opacity=.65*(1-s.age/s.maxAge),s.age>=s.maxAge&&(this.scene.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose(),this.smokeParticles.splice(i,1))}if(this.cainMark&&this.cainMark.material.opacity>0&&(this.cainMark.rotation.z+=e*2.8,this.cainMark.position.y=2.15+Math.sin(n*4)*.08),this.yaw+=(this.targetYaw-this.yaw)*.1,this.pitch+=(this.targetPitch-this.pitch)*.1,this.movementEnabled&&this.cain.visible){const i=2.4*e,s=new B;this.camera.getWorldDirection(s),s.y=0,s.normalize();const o=new B;o.crossVectors(s,this.camera.up).normalize();const a=new B;if(this.keys.KeyW&&a.add(s),this.keys.KeyS&&a.sub(s),this.keys.KeyD&&a.add(o),this.keys.KeyA&&a.sub(o),a.lengthSq()>0){a.normalize().multiplyScalar(i);const d=this.cain.position.x+a.x,m=this.cain.position.z+a.z;this.checkCollision(d,m)||(this.cain.position.x=d,this.cain.position.z=m,this.cain.position.y=this.getTerrainHeight(this.cain.position.x,this.cain.position.z));const _=Math.atan2(a.x,a.z);this.cain.rotation.y=_;const g=Math.sin(n*9)*.42;this.cain.children[5].rotation.x=g,this.cain.children[6].rotation.x=-g,this.cain.children[3].rotation.x=-g}else this.cain.children[5].rotation.x*=.85,this.cain.children[6].rotation.x*=.85,this.cain.children[3].rotation.x*=.85;const l=6.2,c=new B(Math.sin(this.yaw)*Math.cos(this.pitch)*l,Math.sin(this.pitch)*l+1.6,Math.cos(this.yaw)*Math.cos(this.pitch)*l),h=this.cain.position.clone().add(c);this.camera.position.lerp(h,.12);const u=new B(this.cain.position.x,this.cain.position.y+1.2,this.cain.position.z);this.camera.lookAt(u)}this.renderer.render(this.scene,this.camera)}}let O=null,qt=null,An=null,gn=null,Cr=!1,ss=null,ma=!1,ga=!1,ra=[],_t=0,In=null;const Vs=document.getElementById("canvas-wrap"),hr=document.getElementById("narration"),xr=document.getElementById("continue-hint"),oo=document.getElementById("day-label"),ne=document.getElementById("veil"),Lr=document.getElementById("movement-hint"),vi=document.getElementById("scripture-label"),oh=document.getElementById("scroll-panel"),Tv=document.getElementById("close-scroll"),bv=document.getElementById("scroll-title"),Av=document.getElementById("scroll-content"),li=document.getElementById("speech-bubble"),Rv=document.getElementById("hub-toggle-btn"),lo=document.getElementById("hub-panel"),Cv=document.getElementById("close-hub"),zu=document.querySelectorAll(".era-btn");let Pi=[];typeof window<"u"&&"speechSynthesis"in window&&(window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged=()=>{Pi=window.speechSynthesis.getVoices()});function Lv(){if(!qt)try{qt=new(window.AudioContext||window.webkitAudioContext);const r=2*qt.sampleRate,t=qt.createBuffer(1,r,qt.sampleRate),e=t.getChannelData(0);let n=0;for(let o=0;o<r;o++){const a=Math.random()*2-1;n=(n+.02*a)/1.02,e[o]=n*3.5}const i=qt.createBufferSource();i.buffer=t,i.loop=!0,gn=qt.createBiquadFilter(),gn.type="lowpass",gn.frequency.value=350,An=qt.createGain(),An.gain.value=0,i.connect(gn),gn.connect(An),An.connect(qt.destination),i.start(0);const s=qt.currentTime;An.gain.setValueAtTime(0,s),An.gain.linearRampToValueAtTime(.04,s+3)}catch(r){console.warn("Audio Context could not be initialized:",r)}}function Io(r,t,e){if(!An||!qt)return;const n=qt.currentTime;An.gain.cancelScheduledValues(n),gn&&gn.frequency.cancelScheduledValues(n),An.gain.setValueAtTime(An.gain.value,n),gn&&gn.frequency.setValueAtTime(gn.frequency.value,n),An.gain.linearRampToValueAtTime(r,n+e),gn&&gn.frequency.linearRampToValueAtTime(t,n+e)}function lh(){if(!qt)return;const r=qt.createOscillator(),t=qt.createGain();r.connect(t),t.connect(qt.destination),r.type="sine";const e=qt.currentTime,n=1600+Math.random()*600,i=2600+Math.random()*600,s=.08+Math.random()*.08;r.frequency.setValueAtTime(n,e),r.frequency.exponentialRampToValueAtTime(i,e+s),t.gain.setValueAtTime(0,e),t.gain.linearRampToValueAtTime(.012,e+.02),t.gain.exponentialRampToValueAtTime(1e-4,e+s),r.start(e),r.stop(e+s+.05)}function Pv(){if(!qt)return;const r=qt.currentTime,t=qt.createOscillator(),e=qt.createOscillator(),n=qt.createBiquadFilter(),i=qt.createGain();t.type="sawtooth",t.frequency.setValueAtTime(75,r),t.frequency.linearRampToValueAtTime(32,r+1.2),e.type="triangle",e.frequency.setValueAtTime(40,r),e.frequency.linearRampToValueAtTime(22,r+1.2),n.type="bandpass",n.frequency.setValueAtTime(140,r),n.frequency.linearRampToValueAtTime(80,r+1.2),n.Q.value=3.5,t.connect(n),e.connect(n),n.connect(i),i.connect(qt.destination),i.gain.setValueAtTime(0,r),i.gain.linearRampToValueAtTime(.022,r+.25);for(let s=0;s<1.2;s+=.07)i.gain.setValueAtTime(.018+Math.random()*.012,r+s);i.gain.exponentialRampToValueAtTime(1e-4,r+1.35),t.start(r),e.start(r),t.stop(r+1.4),e.stop(r+1.4)}function Dv(){if(!qt)return;const r=qt.currentTime,t=qt.createOscillator(),e=qt.createGain(),n=qt.createBiquadFilter();t.type="sawtooth";const i=170+Math.random()*30;t.frequency.setValueAtTime(i,r);const s=qt.createOscillator(),o=qt.createGain();s.frequency.value=17,o.gain.value=14,s.connect(o),o.connect(t.frequency),n.type="bandpass",n.frequency.value=900,n.Q.value=2,t.connect(n),n.connect(e),e.connect(qt.destination),e.gain.setValueAtTime(0,r),e.gain.linearRampToValueAtTime(.014,r+.12),e.gain.exponentialRampToValueAtTime(1e-4,r+.55),s.start(r),t.start(r),s.stop(r+.6),t.stop(r+.6)}function ch(){if(!qt)return;const r=qt.currentTime,t=qt.createOscillator(),e=qt.createGain();t.connect(e),e.connect(qt.destination),t.type="sine",t.frequency.setValueAtTime(3200+Math.random()*300,r),t.frequency.exponentialRampToValueAtTime(3800,r+.04),e.gain.setValueAtTime(0,r),e.gain.linearRampToValueAtTime(.007,r+.008),e.gain.exponentialRampToValueAtTime(1e-4,r+.045),t.start(r),t.stop(r+.05)}function Uv(){Bu();const r=()=>{ma&&(lh(),Math.random()>.4&&setTimeout(lh,140));const e=4e3+Math.random()*7e3;ra.push(setTimeout(r,e))},t=()=>{if(ga){const n=Math.random();n<.45?Dv():n<.75?(ch(),setTimeout(ch,120)):Pv()}const e=9e3+Math.random()*11e3;ra.push(setTimeout(t,e))};r(),t()}function Bu(){ra.forEach(r=>clearTimeout(r)),ra=[]}const as=r=>new Promise(t=>setTimeout(t,r));function Gu(r,t){if(typeof window>"u"||!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const e=r.replace(/["“”]/g,""),n=new SpeechSynthesisUtterance(e);Pi.length===0&&(Pi=window.speechSynthesis.getVoices());let i=null;t==="Eve"?(i=Pi.find(s=>s.name.toLowerCase().includes("female")||s.name.toLowerCase().includes("zira")||s.name.toLowerCase().includes("samantha")||s.name.toLowerCase().includes("hazel")),n.pitch=1.15,n.rate=.95):t==="Serpent"?(i=Pi.find(s=>s.name.toLowerCase().includes("google uk english male")||s.name.toLowerCase().includes("david")||s.name.toLowerCase().includes("male")),n.pitch=.55,n.rate=.78):t==="God"?(i=Pi.find(s=>s.name.toLowerCase().includes("david")||s.name.toLowerCase().includes("male")||s.name.toLowerCase().includes("google uk english male")),n.pitch=.7,n.rate=.82):(i=Pi.find(s=>s.name.toLowerCase().includes("male")||s.name.toLowerCase().includes("david")),n.pitch=.95,n.rate=.92),i&&(n.voice=i),window.speechSynthesis.speak(n)}function hl(r,t=2800,e="Narrator"){return new Promise(n=>{Gu(r,e),hr.textContent=r,hr.classList.remove("show"),xr.classList.remove("show"),hr.offsetWidth,hr.classList.add("show"),setTimeout(()=>{xr.classList.add("show"),Cr=!0,ss=()=>{Cr=!1,xr.classList.remove("show"),hr.classList.remove("show"),window.speechSynthesis&&window.speechSynthesis.cancel(),setTimeout(n,850)}},t)})}function ku(r,t,e=2600){return new Promise(n=>{if(!t||!O){li.style.display="none",In=null,n();return}Gu(t,r),li.innerHTML=`<strong>${r}</strong><br/>${t}`,li.style.display="block",r==="Serpent"?In=O.serpentHead:r==="Eve"?In=O.eve:r==="Adam"?In=O.adam:In=null,xr.classList.add("show"),Cr=!0,ss=()=>{Cr=!1,xr.classList.remove("show"),li.style.display="none",In=null,window.speechSynthesis&&window.speechSynthesis.cancel(),setTimeout(n,600)}})}function Vi(){hr.classList.remove("show"),xr.classList.remove("show")}function Hu(){Lv(),Cr&&ss&&ss()}window.addEventListener("click",Hu);window.addEventListener("keydown",r=>{r.code==="Space"&&Hu()});async function Di(r){oo.textContent=r,oo.classList.add("show"),await as(2500),oo.classList.remove("show"),await as(600)}function Iv(){Bu(),ma=!1,ga=!1,Cr=!1,ss=null,In=null,window.speechSynthesis&&window.speechSynthesis.cancel(),li&&(li.style.display="none"),Lr.classList.remove("show"),vi.classList.remove("show"),O&&(window.removeEventListener("resize",O.onWindowResize),O.scene.traverse(r=>{r.isMesh&&(r.geometry&&r.geometry.dispose(),r.material&&(Array.isArray(r.material)?r.material.forEach(t=>t.dispose()):r.material.dispose()))}),O.renderer&&(O.renderer.dispose(),Vs.innerHTML=""),O=null)}function ul(r,t){bv.innerHTML=r,Av.innerHTML=t}async function Nv(r){const t=async(n,i,s)=>r!==_t?!1:(await hl(n,i,s),r===_t),e=async n=>r!==_t?!1:(await as(n),r===_t);vi.classList.remove("show"),ul('Genesis 1:1 &ndash; 2:7 <span style="font-weight:400;opacity:.6">(KJV)</span>',`
      <p><span class="verse-num">1</span>In the beginning God created the heaven and the earth.</p>
      <p><span class="verse-num">2</span>And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.</p>
      <p><span class="verse-num">3</span>And God said, Let there be light: and there was light.</p>
      <p><span class="verse-num">4</span>And God saw the light, that it was good: and God divided the light from the darkness.</p>
      <p><span class="verse-num">6&ndash;8</span>And God said, Let there be a firmament in the midst of the waters&hellip; And God called the firmament Heaven.</p>
      <p><span class="verse-num">9&ndash;13</span>And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear&hellip; and the earth brought forth grass, and herb yielding seed, and the fruit tree yielding fruit.</p>
      <p><span class="verse-num">14&ndash;19</span>And God said, Let there be lights in the firmament of the heaven&hellip; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.</p>
      <p><span class="verse-num">20&ndash;23</span>And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth&hellip;</p>
      <p><span class="verse-num">24&ndash;25</span>And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.</p>
      <p><span class="verse-num">26&ndash;27</span>And God said, Let us make man in our image, after our likeness&hellip; So God created man in his own image, in the image of God created he him; male and female created he them.</p>
      <p><span class="verse-num">2:7</span>And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.</p>
    `),await e(1500)&&await t("In the beginning, God created the heavens and the earth.",3400,"Narrator")&&await t("The earth was without form, and void; and darkness was upon the face of the deep.",3800,"Narrator")&&(Vi(),await e(2800)&&await t('And God said, "Let there be light."',2200,"God")&&r===_t&&(ne.style.transition="background 0.1s ease",ne.style.background="#fff9eb",await e(120)&&(ne.style.transition="background 3.5s cubic-bezier(0.25, 1, 0.5, 1)",ne.style.background="rgba(0,0,0,0)",r===_t&&(await O.transitionDayOne(),Io(.06,450,3),await e(2e3)&&r===_t&&(await Di("Day One"),await t("And God saw the light, that it was good: and God divided the light from the darkness.",3200,"Narrator")&&r===_t&&(await Di("Day Two"),await t('And God said, "Let there be a firmament in the midst of the waters." And God called the firmament Heaven.',3400,"God")&&(await O.transitionDayTwo(),await e(1500)&&r===_t&&(await Di("Day Three"),await t('And God said, "Let the dry land appear." And the earth brought forth grass, and the fruit tree yielding fruit.',3600,"God")&&(await O.transitionDayThree(),Io(.02,180,5),await e(3200)&&r===_t&&(await Di("Day Four"),await t("And God made two great lights, the greater light to rule the day, and the lesser to rule the night: he made the stars also.",3600,"Narrator")&&(await O.transitionDayFour(),await e(2e3)&&r===_t&&(await Di("Day Five"),await t('And God said, "Let the waters bring forth abundantly," and let birds fly above the earth.',3400,"God")&&(await O.transitionDayFive(),ma=!0,await e(2200)&&r===_t&&(await Di("Day Six"),await t("And God made the beasts of the earth after their kind. And it was so.",3e3,"Narrator")&&(await O.transitionDaySix(),ga=!0,await e(2e3)&&await t("Then the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",4500,"Narrator")&&r===_t&&(await O.formAdam(),await e(6500)&&(Vi(),await e(1800)&&r===_t&&(O.unlockControls(),Lr.classList.add("show"),vi.classList.add("show")))))))))))))))))))}async function Ov(r){const t=async(h,u,d="Narrator")=>r!==_t?!1:(await hl(h,u,d),r===_t),e=async h=>r!==_t?!1:(await as(h),r===_t),n=async(h,u,d)=>r!==_t?!1:(await ku(h,u,d),r===_t);if(vi.classList.remove("show"),ul('Genesis 3:1 &ndash; 24 <span style="font-weight:400;opacity:.6">(KJV)</span>',`
      <p><span class="verse-num">1</span>Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?</p>
      <p><span class="verse-num">2&ndash;3</span>And the woman said unto the serpent, We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.</p>
      <p><span class="verse-num">4&ndash;5</span>And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.</p>
      <p><span class="verse-num">6</span>And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.</p>
      <p><span class="verse-num">7</span>And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.</p>
      <p><span class="verse-num">8&ndash;19</span>And they heard the voice of the LORD God walking in the garden in the cool of the day... unto Adam he said, Because thou hearkened unto the voice of thy wife, and hast eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life...</p>
      <p><span class="verse-num">23&ndash;24</span>Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.</p>
    `),r!==_t||(ne.style.transition="background 1.5s ease",ne.style.background="rgba(0,0,0,0)",!await t("And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.",3400,"Narrator"))||!await t("And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food...",3600,"Narrator")||!await t("The tree of life also in the midst of the garden, and the tree of knowledge of good and evil.",3600,"Narrator")||(Vi(),r!==_t)||(await Di("The Garden"),r!==_t)||(O.unlockControls(),Lr.classList.add("show"),ma=!0,ga=!0,!await t("Walk up to the center Tree of Knowledge to witness the Fall.",4e3,"Narrator")))return;Vi();let i=!0;for(;i;){if(!await e(150)||r!==_t)return;if(O&&O.adam){const h=O.adam.position;Math.sqrt(h.x*h.x+h.z*h.z)<3.2&&(i=!1)}else i=!1}if(r!==_t)return;O.movementEnabled=!1,Lr.classList.remove("show"),O.eve.position.set(1.2,O.getTerrainHeight(1.2,1.4),1.4),O.eve.lookAt(0,O.eve.position.y,0),O.adam.position.set(-1.2,O.getTerrainHeight(-1.2,1.4),1.4),O.adam.lookAt(0,O.adam.position.y,0);const s=O.camera.position;if(ct.to(s,{x:0,y:2.2,z:6.8,duration:3.5,ease:"power2.inOut",onUpdate:()=>{O&&O.camera&&O.camera.lookAt(0,1.6,.5)}}),!await e(3700)||!await t("Now the serpent was more subtil than any beast of the field which the LORD God had made.",3600,"Narrator")||!await n("Serpent","Yea, hath God said, Ye shall not eat of every tree of the garden?",4200)||!await n("Eve","We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.",5800)||!await n("Serpent","Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.",6200)||!await t("The woman saw that the tree was good for food, and that it was pleasant to the eyes...",3800,"Narrator")||r!==_t)return;ct.to(O.eveArmR.rotation,{x:-Math.PI/2.2,duration:1.2});const o=O.forbiddenFruits.children[0];if(o&&ct.to(o.position,{x:1.2,y:.95,z:1.5,duration:1.8,ease:"bounce.out"}),!await e(2e3)||!await t("She took of the fruit thereof, and did eat...",3200,"Narrator")||(ct.to(O.eveArmR.rotation,{x:-Math.PI/1.5,duration:.8}),!await e(900))||(ct.to(O.eveArmR.rotation,{x:0,duration:.6}),!await e(700))||r!==_t)return;const a=setInterval(()=>{if(O&&r===_t){const h=Math.sin(performance.now()*.01)*.45;O.eve.children[5].rotation.x=h,O.eve.children[6].rotation.x=-h}else clearInterval(a)},30);if(ct.to(O.eve.position,{x:-.4,z:1.4,duration:2,onComplete:()=>{clearInterval(a),O&&(O.eve.children[5].rotation.x=0,O.eve.children[6].rotation.x=0)}}),o&&ct.to(o.position,{x:-.8,y:.95,z:1.4,duration:2}),O.eve.lookAt(-1.2,O.eve.position.y,1.4),!await e(2200)||!await n("Eve","Eat of it, and thine eyes shall be opened.",3500)||!await t("...and gave also unto her husband with her; and he did eat.",3800,"Narrator")||r!==_t||(ct.to(O.adamArmR.rotation,{x:-Math.PI/2.2,duration:1}),o&&ct.to(o.position,{x:-1.2,y:.95,z:1.4,duration:.8}),!await e(1100))||(ct.to(O.adamArmR.rotation,{x:-Math.PI/1.5,duration:.8}),o&&(ct.to(o.position,{x:-1.2,y:1.6,z:1.3,duration:.6}),ct.to(o.scale,{x:0,y:0,z:0,duration:.6,delay:.2})),!await e(1e3))||(ct.to(O.adamArmR.rotation,{x:0,duration:.8}),ct.to(O.eveArmR.rotation,{x:0,duration:.8}),!await e(800))||r!==_t||(ne.style.transition="background 0.15s ease",ne.style.background="#300808",!await e(200))||(ne.style.transition="background 4.5s ease",ne.style.background="rgba(0,0,0,0)",r!==_t)||(O.triggerTheFall(),Io(.08,480,5),!await e(2500))||!await t("And the eyes of them both were opened, and they knew that they were naked.",3600,"Narrator")||r!==_t||(O.coverThemselves(),!await e(2e3))||!await t("And they heard the voice of the LORD God walking in the garden in the cool of the day.",3800,"Narrator")||r!==_t)return;ct.to(O.presenceLight,{intensity:5.5,duration:2});const l=setInterval(()=>{if(O&&r===_t){const h=Math.sin(performance.now()*.015)*.45;O.eve.children[5].rotation.x=h,O.eve.children[6].rotation.x=-h,O.adam.children[5].rotation.x=h,O.adam.children[6].rotation.x=-h}else clearInterval(l)},30);if(ct.to(O.adam.position,{x:9,z:-8,duration:2.5}),ct.to(O.eve.position,{x:10.5,z:-7.5,duration:2.5}),ct.to(s,{x:8,y:2,z:-4.5,duration:3,onUpdate:()=>{O&&O.camera&&O.camera.lookAt(9.8,1.4,-8)},onComplete:()=>{clearInterval(l),O&&(O.eve.children[5].rotation.x=0,O.eve.children[6].rotation.x=0,O.adam.children[5].rotation.x=0,O.adam.children[6].rotation.x=0)}}),!await e(3200)||!await t("...and Adam and his wife hid themselves from the presence of the LORD God amongst the trees.",3800,"Narrator")||!await t('And the LORD God called unto Adam, and said unto him, "Where art thou?"',4200,"God")||!await n("Adam","I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.",5200)||!await t('And the LORD God said, "Who told thee that thou wast naked? Hast thou eaten of the tree whereof I commanded thee?"',5500,"God")||!await n("Adam","The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.",4800)||!await t('And the LORD God said unto the woman, "What is this that thou hast done?"',4200,"God")||!await n("Eve","The serpent beguiled me, and I did eat.",4400)||!await t('And the LORD God said unto the serpent, "Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life..."',6800,"God")||!await t('Unto the woman God said, "I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children..."',5200,"God")||!await t('And unto Adam he said, "Because thou hast hearkened unto the voice of thy wife, and hast eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life..."',5800,"God")||!await t("Therefore the LORD God sent him forth from the garden of Eden, to till the ground.",3800,"Narrator")||r!==_t||(O.eastGateGroup.visible=!0,ct.to(s,{x:18,y:2.2,z:4.5,duration:3.5,onUpdate:()=>{O&&O.camera&&O.camera.lookAt(22,1.5,0)}}),!await e(3800))||r!==_t)return;O.eve.lookAt(22,O.eve.position.y,0),O.adam.lookAt(22,O.adam.position.y,0);const c=setInterval(()=>{if(O&&r===_t){const h=Math.sin(performance.now()*.01)*.45;O.eve.children[5].rotation.x=h,O.eve.children[6].rotation.x=-h,O.adam.children[5].rotation.x=h,O.adam.children[6].rotation.x=-h}else clearInterval(c)},30);if(ct.to(O.eve.position,{x:26,z:.5,duration:6}),ct.to(O.adam.position,{x:25,z:-.5,duration:6}),ne.style.transition="background 5.0s ease",ne.style.background="#000000",!await e(5500)){clearInterval(c);return}clearInterval(c),await t("So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.",6500,"Narrator")&&(Vi(),r===_t&&vi.classList.add("show"))}async function Fv(r){const t=async(l,c,h="Narrator")=>r!==_t?!1:(await hl(l,c,h),r===_t),e=async l=>r!==_t?!1:(await as(l),r===_t),n=async(l,c,h)=>r!==_t?!1:(await ku(l,c,h),r===_t);if(vi.classList.remove("show"),ul('Genesis 4:1 &ndash; 16 <span style="font-weight:400;opacity:.6">(KJV)</span>',`
      <p><span class="verse-num">1</span>And Adam knew Eve his wife; and she conceived, and bare Cain, and said, I have gotten a man from the LORD.</p>
      <p><span class="verse-num">2</span>And she again bare his brother Abel. And Abel was a keeper of sheep, but Cain was a tiller of the ground.</p>
      <p><span class="verse-num">3</span>And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.</p>
      <p><span class="verse-num">4</span>And Abel, he also brought of the firstlings of his flock and of the fat thereof. And the LORD had respect unto Abel and to his offering:</p>
      <p><span class="verse-num">5</span>But unto Cain and to his offering he had not respect. And Cain was very wroth, and his countenance fell.</p>
      <p><span class="verse-num">6&ndash;7</span>And the LORD said unto Cain, Why art thou wroth? and why is thy countenance fallen? If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door...</p>
      <p><span class="verse-num">8</span>And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.</p>
      <p><span class="verse-num">9</span>And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper?</p>
      <p><span class="verse-num">10&ndash;12</span>And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground. And now art thou cursed from the earth... When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be...</p>
      <p><span class="verse-num">13&ndash;14</span>And Cain said unto the LORD, My punishment is greater than I can bear... every one that findeth me shall slay me.</p>
      <p><span class="verse-num">15&ndash;16</span>And the LORD said unto him, Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold. And the LORD set a mark upon Cain... And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.</p>
    `),r!==_t)return;ne.style.transition="background 1.5s ease",ne.style.background="rgba(0,0,0,0)";const i=O.camera.position;if(i.set(-11,2.5,14),O.camera.lookAt(-16,1.3,11.5),!await t("And Adam knew Eve his wife; and she conceived, and bare Cain...",3800,"Narrator")||!await n("Eve","I have gotten a man from the LORD.",3200)||!await t("And she again bare his brother Abel.",3400,"Narrator")||!await t("And the brothers grew; Abel became a keeper of sheep, but Cain was a tiller of the ground.",4200,"Narrator")||r!==_t||(ne.style.transition="background 0.5s ease",ne.style.background="#ffffff",!await e(550))||(O.crib.visible=!1,O.cain.visible=!0,O.abel.visible=!0,O.cain.position.set(-12,O.getTerrainHeight(-12,-2),-2),O.cain.lookAt(-2.8,O.cain.position.y,0),O.abel.position.set(14,O.getTerrainHeight(14,6),6),O.abel.lookAt(2.8,O.abel.position.y,0),ne.style.transition="background 1.5s ease",ne.style.background="rgba(0,0,0,0)",!await e(1e3))||!await t("And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.",4200,"Narrator")||!await t("And Abel, he also brought of the firstlings of his flock and of the fat thereof.",4200,"Narrator")||r!==_t||(O.unlockControls(),Lr.classList.add("show"),!await t("Walk to the central Altar of Stones to present your offering.",4200,"Narrator")))return;Vi();let s=!0;for(;s;){if(!await e(150)||r!==_t)return;if(O&&O.cain){const l=O.cain.position;Math.sqrt((l.x+2.8)*(l.x+2.8)+l.z*l.z)<3&&(s=!1)}else s=!1}if(r!==_t||(O.movementEnabled=!1,Lr.classList.remove("show"),ct.to(O.cain.position,{x:-2.8,z:2.2,duration:1}),O.cain.lookAt(-2.8,O.cain.position.y,0),ct.to(O.abel.position,{x:2.8,z:2.2,duration:1}),O.abel.lookAt(2.8,O.abel.position.y,0),ct.to(i,{x:0,y:2.4,z:5.8,duration:2,onUpdate:()=>{O&&O.camera&&O.camera.lookAt(0,1.2,0)}}),!await e(2200))||(ct.to(O.cainArmR.rotation,{x:-Math.PI/2.2,duration:.8}),ct.to(O.abelArmR.rotation,{x:-Math.PI/2.2,duration:.8}),!await e(1e3))||r!==_t||(O.altarLightActive=!0,ct.to(O.abelLightPillar.material,{opacity:.85,duration:1.8}),O.altarSmokeActive=!0,!await e(1200))||!await t("And the LORD had respect unto Abel and to his offering...",3800,"Narrator")||!await t("But unto Cain and to his offering he had not respect.",3800,"Narrator")||r!==_t||(ct.to(O.cainArmL.rotation,{z:.5,duration:1}),ct.to(O.cainArmR.rotation,{z:-.5,duration:1}),!await t("And Cain was very wroth, and his countenance fell.",3600,"Narrator"))||!await t('And the LORD said unto Cain, "Why art thou wroth? and why is thy countenance fallen?"',4200,"God")||!await t('"If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door..."',5200,"God")||r!==_t||(ct.to(O.cainArmL.rotation,{z:0,duration:.8}),ct.to(O.cainArmR.rotation,{z:0,duration:.8}),O.cain.lookAt(O.abel.position.x,O.cain.position.y,O.abel.position.z),!await n("Cain","Let us go into the field.",3200))||r!==_t)return;const o=setInterval(()=>{if(O&&r===_t){const l=Math.sin(performance.now()*.012)*.45;O.cain.children[5].rotation.x=l,O.cain.children[6].rotation.x=-l,O.abel.children[5].rotation.x=l,O.abel.children[6].rotation.x=-l}else clearInterval(o)},30);if(ct.to(O.cain.position,{x:-.6,z:-12,duration:3.5}),ct.to(O.abel.position,{x:.6,z:-12,duration:3.5}),ct.to(i,{x:0,y:2.2,z:-7.5,duration:3.5,onUpdate:()=>{O&&O.camera&&O.camera.lookAt(0,1.4,-12)},onComplete:()=>{clearInterval(o),O&&(O.cain.children[5].rotation.x=0,O.cain.children[6].rotation.x=0,O.abel.children[5].rotation.x=0,O.abel.children[6].rotation.x=0)}}),!await e(3800)||r!==_t||(O.cain.lookAt(O.abel.position.x,O.cain.position.y,O.abel.position.z),ct.to(O.cainArmR.rotation,{x:-Math.PI/1.1,duration:.7}),!await e(900))||(ct.to(O.cainArmR.rotation,{x:-Math.PI/3,duration:.2,ease:"power2.in"}),r!==_t)||(ne.style.transition="background 0.05s ease",ne.style.background="#4a0808",ct.to(O.abel.rotation,{x:Math.PI/2,duration:.5}),ct.to(O.abel.position,{y:O.getTerrainHeight(.6,-12)+.1,duration:.5}),!await e(100))||(ne.style.transition="background 2.5s ease",ne.style.background="rgba(0,0,0,0)",!await e(600))||!await t("And it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.",4500,"Narrator")||(ct.to(O.cainArmR.rotation,{x:0,duration:.8}),!await t('And the LORD said unto Cain, "Where is Abel thy brother?"',4200,"God"))||!await n("Cain","I know not: Am I my brother's keeper?",3600)||!await t(`And God said, "What hast thou done? the voice of thy brother's blood crieth unto me from the ground."`,5200,"God")||!await t(`"And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood..."`,5200,"God")||!await t('"When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be..."',5600,"God")||r!==_t||(ct.to(O.cain.position,{y:O.getTerrainHeight(-.6,-12)-.45,duration:1}),!await n("Cain","My punishment is greater than I can bear. Behold, thou hast driven me out this day...",5200))||!await t('And the LORD said, "Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold."',4500,"God")||r!==_t||(ct.to(O.cainMark.material,{opacity:.9,duration:1.5}),!await t("And the LORD set a mark upon Cain, lest any finding him should kill him.",3800,"Narrator"))||r!==_t||(ct.to(O.cain.position,{y:O.getTerrainHeight(-.6,-12),duration:.8}),!await e(900)))return;O.cain.lookAt(20,O.cain.position.y,-30);const a=setInterval(()=>{if(O&&r===_t){const l=Math.sin(performance.now()*.01)*.45;O.cain.children[5].rotation.x=l,O.cain.children[6].rotation.x=-l}else clearInterval(a)},30);if(ct.to(O.cain.position,{x:20,z:-30,duration:6}),ne.style.transition="background 5.0s ease",ne.style.background="#000000",!await e(5500)){clearInterval(a);return}clearInterval(a),await t("And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.",6200,"Narrator")&&(Vi(),r===_t&&vi.classList.add("show"))}function hh(r){_t++;const t=_t;Iv(),zu.forEach(i=>{i.getAttribute("data-scene")===r?i.classList.add("active"):i.classList.remove("active")}),ne.style.transition="none",ne.style.background="#000000",ne.offsetWidth,ne.style.transition="background 1.5s ease",ne.style.background="rgba(0,0,0,0)";let e=0;function n(i){if(t!==_t||!O)return;const s=i*.001,o=s-e;if(e=s,In&&O){const a=new B;In.getWorldPosition(a),In===O.serpentHead?a.y+=.45:a.y+=1.85,a.project(O.camera);const l=(a.x*.5+.5)*window.innerWidth;let c=(a.y*-.5+.5)*window.innerHeight;c<80&&(c=80),li.style.left=`${l}px`,li.style.top=`${c}px`}O.update(s,o),requestAnimationFrame(n)}r==="creation"?(O=new Sv(Vs),requestAnimationFrame(n),Nv(t)):r==="eden"?(O=new wv(Vs),requestAnimationFrame(n),Ov(t)):r==="cainabel"&&(O=new Ev(Vs),requestAnimationFrame(n),Fv(t))}document.addEventListener("DOMContentLoaded",()=>{Rv.addEventListener("click",()=>{lo.classList.add("show")}),Cv.addEventListener("click",()=>{lo.classList.remove("show")}),zu.forEach(s=>{s.addEventListener("click",o=>{o.stopPropagation();const a=s.getAttribute("data-scene");a&&!s.classList.contains("disabled")&&(lo.classList.remove("show"),hh(a))})}),Tv.addEventListener("click",s=>{s.stopPropagation(),oh.classList.remove("show")}),vi.addEventListener("click",()=>{oh.classList.add("show")});const r=document.getElementById("begin-btn"),t=document.getElementById("title-screen"),e=document.getElementById("loading-screen"),n=document.getElementById("progress-bar-fill"),i=document.getElementById("loading-text");r.addEventListener("click",()=>{t.style.opacity=0,setTimeout(()=>{t.style.visibility="hidden"},1e3),e.classList.add("show");let s=0;const o=setInterval(()=>{s+=Math.floor(Math.random()*12)+4,s>=100&&(s=100,clearInterval(o),setTimeout(()=>{e.classList.remove("show"),Uv(),hh("creation")},500)),n.style.width=`${s}%`,i.textContent=`Loading Assets... ${s}%`},100)})});
