(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const h of l)if(h.type==="childList")for(const i of h.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(l){const h={};return l.integrity&&(h.integrity=l.integrity),l.referrerPolicy&&(h.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?h.credentials="include":l.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function r(l){if(l.ep)return;l.ep=!0;const h=n(l);fetch(l.href,h)}})();const X=document.getElementById("languagebar"),S=document.getElementById("srcinput"),I=[`1
{⍵*.5}⍣[5] 9`];let T=Math.floor(Math.random()*I.length);document.getElementById("forward").addEventListener("click",t=>{T=(T+1)%I.length,S.value=I[T],S.dispatchEvent(new CustomEvent("input")),U.dispatchEvent(new CustomEvent("click"))},!1);document.getElementById("back").addEventListener("click",t=>{T=((T-1)%I.length+I.length)%I.length,S.value=I[T],S.dispatchEvent(new CustomEvent("input")),U.dispatchEvent(new CustomEvent("click"))},!1);S.value=I[T];S.addEventListener("keydown",t=>{t.keyCode===13&&t.shiftKey&&(runresult.innerText=x(S.value),t.preventDefault())},!1);const k="⍬ + ¯ - × ÷ ⌹ * ⍟ ↑ ↓ ~ | ⌈ ⌊ % < ≤ = ≥ > ≠ ≡ ≢ ⊃ ⊂ ⊆ ⊥ ⊤ ⍳ ⍸ ⍒ ⍋ ⌽ ⊖ & , # ! ⍴ ⍣ / \\ ? ← ⍅ () '' ⍺ ⍵ ∇ {} [] ⋄",P="+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⊥⊤⍳⍸⍒⍋⌽⊖&,#!⍴()∇",F="⍣/\\?",Q="⍬1234567890.",B="←⍅()∇{}[]",q={"⍬":"Zilde","+":`Add
2→1`,"-":`Subtract
2→1`,"×":`Multiply
2→1`,"÷":`Divide
2→1`,"¯":`Negate
1→1`,"⌹":`Matrix inverse
1→1`,"*":`Exponent
2→1`,"⍟":`Logarithm
2→1`,"↑":`Maxmimum
2→1`,"↓":`Minimum
2→1`,"~":`Not
1→1`,"|":`Distance
2→1`,"⌈":`Ceiling
2→1`,"⌊":`Floor
2→1`,"%":`Mod
2→1`,"=":`Equals
2→1`,"≠":`Not equals
2→1`,"<":`Less
2→1`,"≤":`Less or equal
2→1`,"≥":`Greater or equal
2→1`,">":`Greater
2→1`,"≡":`Match
2→1`,"≢":`Not match
2→1`,"⊃":`Replicate
1→1`,"⊂":`Index
2→1`,"⊆":`Keep
2→1`,"⊥":`Splice
3→1`,"⊤":`Pick
3→1`,"⊖":`Rotate
2→1`,"⌽":`Reverse
1→1`,",":`Catenate
2→1`,"#":`Shape of
1→1`,"!":`Indices/Classify
1→1`,"⍳":`Indices-of
2→1`,"⍸":`Find sequence
2→1`,"&":`Take/drop
2→1`,"⍴":`Reshape
2→1`,"⍋":`Grade up
1→1`,"⍒":`Grade down
1→1`,"/":`Fold
1F`,"\\":`Scan
1F`,"⍣":`Repeat/Until
1F[1]/2F`,"?":`If
2F1`,"←":"Assign","⍅":"Function assign","()":"Array","⍺":"Left argument","⍵":"Right argument","∇":"Recur","{}":"Defined function","[]":"Axis-index","''":"String","⋄":"Statement separator"},b=t=>B.includes(t)?"hi_k":P.includes(t)?"hi_f":F.includes(t)?"hi_m":t[0]==="'"?"hi_s":Q.includes(t)?"hi_c":t[0]==="\\"?"hi_e":t[0]==="¯"?"hi_c":!1;function H(t){const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},n=r=>r.replace(/[&<>"'/]/ig,l=>e[l]);return t=t.split(/('(?:[^'\\]|\\.)*')/),t=t.map(r=>r[0]!=="'"?r.replace(new RegExp("¯[0-9.]|"+[...P,...F,...Q].map(l=>l.match(/[0-9]/)?l:"\\"+l).join("|"),"g"),l=>'<span class="'+b(l)+'">'+n(l)+"</span>"):"<span class='hi_s'>"+r.split(/(\\.)/g).map(l=>l.length===2&&l[0]==="\\"?"<span class='hi_e'>"+n(l)+"</span>":l).join("")+"</span>").join(""),t}const j=document.getElementById("srcdisplay");S.addEventListener("input",()=>{j.innerHTML=H(S.value)});j.innerHTML=H(S.value);function z(t,e){if(document.selection)t.focus(),document.selection.createRange().text=myValue;else if(t.selectionStart||t.selectionStart==="0"){const n=t.selectionStart;t.value=t.value.substring(0,n)+e+t.value.substring(t.selectionEnd,t.value.length),t.focus(),t.selectionStart=n+e.length,t.selectionEnd=n+e.length}else t.value+=e}for(let t of k.split(" ")){const e=document.createElement("button");e.classList.add("glyphbutton");const n=b(t);n&&e.classList.add(n),e.innerText=t,X.appendChild(e);const r=document.createElement("div");r.classList.add("glyphbuttontooltip"),r.innerText=q[t],e.appendChild(r),e.addEventListener("click",l=>{z(S,t),S.dispatchEvent(new CustomEvent("input")),t.length>1&&(S.focus(),S.selectionStart--,S.selectionEnd--)},!1)}const U=document.getElementById("run");U.addEventListener("click",t=>{runresult.innerText=x(S.value)},!1);function W(t){let e=[];for(let n=0;n<t.length;n++){let r=t[n];if(r!==" ")if(r==="'"){let l="";do if(r==="\\"&&(r=t[++n]),l+=r,r=t[++n],n>=t.length)return[!1,"Expected string terminator",n];while(r!="'");e.push(l)}else if(r.match(/[a-z]/i)){let l="";for(;r.match(/[a-z]/i)&&(l+=r,r=t[++n],!(n>=t.length)););n--,e.push(l)}else if(r==="¯"&&n<t.length-1&&(t[n+1]==="."||t[n+1].match(/[0-9]/))||r==="."||r.match(/[0-9]/)){let l=1;r==="¯"&&(l=-1,r=t[++n]);let h="";for(;r.match(/[0-9]/)&&(h+=r,r=t[++n],!(n>=t.length)););if(r==="."&&(h+=r,r=t[++n],n<t.length))for(;r.match(/[0-9]/)&&(h+=r,r=t[++n],!(n>=t.length)););n--,e.push(l*parseFloat(h))}else if(r===`
`||k.includes(r))e.push(r);else return[!1,"Unknown token "+r,n]}return e}const a=["CONST","FOPEN","MFUNCTION","DFUNCTION","ASSIGN","ASSIGNFN","NAME","ADD","NEGATE","SUB","MUL","DIV","EXP","LOG","MATINV","ARROPEN","ARRCLOSE","MAX","MIN","MOD","NOT","DISTANCE","CEILING","FLOOR","MATCH","NMATCH","EQUAL","NEQUAL","LESS","GREATER","LESSEQ","GREATEREQ","INDEX","KEEP","REPLICATE","ROTATE","REVERSE","CATENATE","LAMINATE","SHAPEOF","INDICES","INDICESOF","FINDSEQ","TAKEDROP","RESHAPE","GRADEUP","GRADEDOWN","SPLICE","PICK","RECUR","REPEAT","UNTIL","FOLD","SCAN","IF","OMEGA","ALPHA","POP","POPM","POPD"].map((t,e)=>({[t]:e+1})).reduce((t,e)=>({...t,...e}));function c(t,e){return{shape:t,ravel:e}}function Z(t){if(typeof t[0]=="number")if(t.length>1&&typeof t[1]=="number"){let e=[t.shift()];for(;t.length>0&&typeof t[0]=="number";)e.push(t.shift());return[a.CONST,c([e.length],e)]}else return[a.CONST,t.shift()];else{if(t[0]==="⍬")return t.shift(),[a.CONST,c([0],[])];if(t[0]==="⍵")return t.shift(),[a.OMEGA];if(t[0]==="⍺")return t.shift(),[a.ALPHA];if(t[0].length&&t[0][0]==="'"){const e=t.shift();return[a.CONST,e.length===2?e.slice(1):c([e.length-1],[...e.slice(1)])]}else{if(typeof t[0]=="string"&&!k.includes(t[0]))return[a.NAME,t.shift()];if(t[0]==="("){t.shift();let e=R(t),n=!1;for(;`⋄
`.includes(t[0]);)t.shift(),e=R(t).concat(e).concat([n?a.CATENATE:a.LAMINATE]),n=!0;return t.length<1||t[0]!==")"?[!1,"Expected closing )"]:(t.shift(),e)}else return[!1,"Syntax error: expected expression"]}}}function G(t){if(t[0]==="{"){t.shift();const e=JSON.parse(JSON.stringify(t)),n=K(t);if(n.length&&n[0]===!1)return n;if(t.length<1||t[0]!=="}")return[!1,"Mismatched {"];t.shift(),e.splice(t.length,e.length-t.length);let r=!1;for(let l of e)if(l==="⍺"){r=!0;break}return[r?a.DFUNCTION:a.MFUNCTION,n]}else if(typeof t[0]=="string"&&P.includes(t[0])){const e=t.shift(),n={"+":a.ADD,"-":a.SUB,"×":a.MUL,"÷":a.DIV,"*":a.EXP,"⍟":a.LOG,"⌹":a.MATINV,"¯":a.NEGATE,"↑":a.MAX,"↓":a.MIN,"~":a.NOT,"|":a.DISTANCE,"⌈":a.CEILING,"⌊":a.FLOOR,"%":a.MOD,"=":a.EQUAL,"≠":a.NEQUAL,"<":a.LESS,">":a.GREATER,"≤":a.LESSEQ,"≥":a.GREATEREQ,"≡":a.MATCH,"≢":a.NMATCH,"⊃":a.REPLICATE,"⊂":a.INDEX,"⊆":a.KEEP,"⊥":a.SPLICE,"⊤":a.PICK,"⌽":a.REVERSE,"⊖":a.ROTATE,",":a.CATENATE,"#":a.SHAPEOF,"!":a.INDICES,"⍳":a.INDICESOF,"⍸":a.FINDSEQ,"&":a.TAKEDROP,"⍴":a.RESHAPE,"⍋":a.GRADEUP,"⍒":a.GRADEDOWN,"(":a.ARROPEN,")":a.ARRCLOSE,"∇":a.RECUR}[e];return n===void 0?[!1,"internalerror on '"+e+"'"]:[n]}else return typeof t[0]=="string"&&!k.includes(t[0])?[a.NAME,t.shift()]:[!1,"Syntax error: expected a function"]}function w(t){let e=G(t);if(e.length&&e[0]===!1)return e;for(;typeof t[0]=="string"&&(F.includes(t[0])||t[0]==="[");){const n=t.shift();if(n==="["){if(e=R(t).concat(e),t.length<1||t[0]!=="]")return[!1,"Expected closing ]"];t.shift();continue}const r={"/":a.FOLD,"\\":a.SCAN,"⍣":a.UNTIL,"?":a.IF}[n];if(r===void 0)return[!1,"internalerror on '"+n+"'"];if(e=[r].concat(e),r===a.UNTIL&&t.length&&t[0]==="["){if(t.shift(),e[0]=a.REPEAT,e=R(t).concat(e),t.length<1||t[0]!=="]")return[!1,"Expected closing ]"];t.shift();continue}if(r===a.IF||r===a.UNTIL){let l=G(t);if(l.length&&l[0]===!1)return l;e=e.concat(l)}}return e}const J=`)]}
⋄`;function Y(t){return t==="("||t==="⍵"||t==="⍺"||typeof t=="string"&&!k.includes(t)&&$(t[0])||typeof t=="number"||t==="⍬"||t.length&&t[0]==="'"}function $(t){return t===t.toLowerCase()&&t!==t.toUpperCase()}function R(t){if(t.length===0||J.includes(t[0]))return[!1,"Expected an expression."];let e=[];if(Y(t[0])&&(e=Z(t),e.length&&e[0]===!1))return e;if(t.length>0&&!J.includes(t[0])){if(t[0]==="←"){if(e.length<2||e[0]!=a.NAME)return[!1,"Expected a name to assign to"];t.shift();let l=R(t);return l.length&&l[0]===!1?l:l.concat([a.ASSIGN,e[1]])}else if(t[0]==="⍅"){if(e.length<2||e[0]!=a.NAME)return[!1,"Expected a name to assign to"];t.shift();let l=w(t);return l.length&&l[0]===!1?l:[a.ASSIGNFN,e[1][0].toUpperCase()+e[1].slice(1),[a.FUNCTION,l[0]===a.FUNCTION?l:l[0]]]}let n=w(t);if(n.length&&n[0]===!1)return n;let r=R(t);if(r.length&&r[0]===!1)return r;e=r.concat(e).concat(n)}return e}function K(t,e){for(;t.length>0&&`
⋄`.includes(t[0]);)t.shift();let n=[];for(let r=0;r<100&&t.length>0&&t[0]!=="}";r++){const l=R(t);if(l.length&&l[0]===!1)return l;for(n=n.concat(l);t.length>0&&`
⋄`.includes(t[0]);)t.shift();(!e&&t[0]!=="}"||l.length>1&&l[l.length-2]===a.ASSIGN)&&n.push(a.POP)}return n}function ee(t){const e=K(t,!0);return e.length>0&&e[0]===!1?e:t.length>0?[!1,"Mismatched }"]:e}function te(t,e,n){let r=[];for(let l=0;l<n;l++)for(let h=0;h<n;h++){let i=0;for(let p=0;p<n;p++)i+=t[l*n+p]*e[p*n+h];r.push(i)}return r}function ne(t){if(d(t))return 1/t;if(t.shape.length===1){let f=t.ravel.map(u=>u*u).reduce((u,m)=>u+m,0);return t.map(u=>u/f)}if(t.shape.length>2||t.shape[0]!==t.shape[1])return[!1,"⌹: Shape error"];const e=t.shape[0],n=t.ravel,r=[];for(let f=0;f<e*e;f++)r.push(+(f%(e+1)===0));let l;function h(f){if(f===0)return[[1],r];let[u,m]=h(f-1),o=te(n,m,e),E=0;for(let g=0;g<e;g++)E+=o[g*e+g];E/=-f;let N=[];for(let g=0;g<e;g++)for(let v=0;v<e;v++)N.push(o[g*e+v]+r[g*e+v]*E);return f===e-1&&(l=N),[u.concat(E),N]}const i=h(e)[0],p=i[i.length-1];if(p===0)return[!1,"⌹: Domain error"];for(let f=0;f<e*e;f++)l[f]/=-p;return c([e,e],l)}function d(t){return typeof t=="number"||typeof t=="string"}function y(t,e){if(typeof t!=typeof e)return 0;if(d(t))return+(t===e);if(t.shape.length!=e.shape.length)return 0;for(let n=0;n<t.shape.length;n++)if(t.shape[n]!==e.shape[n])return 0;if(t.ravel.length!=e.ravel.length)return 0;for(let n=0;n<t.ravel.length;n++)if(!y(t.ravel[n],e.ravel[n]))return 0;return 1}function le(t,e,n){const r=d(e),l=d(n);if(r&&l)return t(e,n);if(r){let p=[];for(let f=0;f<n.ravel.length;f++)p.push(t(e,n.ravel[f]));return c(n.shape,p)}if(l){let p=[];for(let f=0;f<e.ravel.length;f++)p.push(t(e.ravel[f],n));return c(e.shape,p)}const h=Math.min(e.shape.length,n.shape.length);let i=!0;for(let p=0;p<h;p++)if(e.shape[p]!=n.shape[p]){i=!1;break}if(i)if(e.shape.length>n.shape.length){const p=e.shape.slice(h).reduce((u,m)=>u*m,1);let f=[];for(let u=0;u<n.ravel.length;u++){const m=n.ravel[u];for(let o=0;o<p;o++)f.push(t(e.ravel[u*p+o],m))}return c(e.shape,f)}else{const p=n.shape.slice(h).reduce((u,m)=>u*m,1);let f=[];for(let u=0;u<e.ravel.length;u++){const m=e.ravel[u];for(let o=0;o<p;o++)f.push(t(m,n.ravel[u*p+o]))}return c(n.shape,f)}}function V(t,e){if(d(e))return t(e);let n=[];for(let r=0;r<e.ravel.length;r++)n.push(t(e.ravel[r]));return c(e.shape,n)}let s=[],C=[];const re=[a.ADD,a.SUB,a.MUL,a.DIV,a.EXP,a.LOG,a.MAX,a.MIN,a.MOD,a.EQUAL,a.NEQUAL,a.LESS,a.GREATER,a.LESSEQ,a.GREATEREQ],M=["+","-","×","÷","*","⍟","↑","↓","%","=","≠","<",">","≤","≥"],se=[(t,e)=>t+e,(t,e)=>t-e,(t,e)=>t*e,(t,e)=>t/e,Math.pow,(t,e)=>Math.log(t)/Math.log(e),Math.max,Math.min,(t,e)=>(t%e+e)%e,(t,e)=>+(t===e),(t,e)=>+(t!==e),(t,e)=>+(t<e),(t,e)=>+(t>e),(t,e)=>+(t<=e),(t,e)=>+(t>=e)];function ae(t){const e=re.indexOf(t);let n=s.pop();if(n===void 0)return[!1,M[e]+": Expected a value"];let r=s.length-1;if(r<0)return[!1,M[e]+": Expected another value"];let l=le(se[e],n,s[r]);if(l===void 0)return[!1,M[e]+": Shape mismatch"];s[r]=l}const ie=[a.NEGATE,a.NOT,a.CEILING,a.FLOOR],he=["¯","~","⌈","⌊"],oe=[t=>-t,t=>+!t,Math.ceil,Math.floor];function pe(t){const e=ie.indexOf(t);let n=s.length-1;if(n<0)return[!1,he[e]+": Expected a value"];s[n]=V(oe[e],s[n])}function D(t){switch(t){case a.NEGATE:case a.NOT:case a.CEILING:case a.FLOOR:{const e=pe(t);if(e)return e;break}case a.ADD:case a.SUB:case a.MUL:case a.DIV:case a.EXP:case a.LOG:case a.MAX:case a.MIN:case a.MOD:case a.EQUAL:case a.NEQUAL:case a.LESS:case a.GREATER:case a.LESSEQ:case a.GREATEREQ:{const e=ae(t);if(e)return e;break}case a.MATINV:{let e=s.length-1;if(e<0)return[!1,"⌹: Expected a value"];const n=ne(s[e]);if(n.length&&n[0]===!1)return n;s[e]=n;break}case a.ARROPEN:{C.push(s.length);break}case a.ARRCLOSE:{if(!C.length)return[!1,"(: Mismatched parenthesis"];const e=C.pop(),n=s.length;let r=c([],[]),l=!1;for(let h=0;h<n-e;h++){const i=s.pop();let p;if(d(i)?(r.ravel.unshift(i),p=[]):(r.ravel=i.ravel.concat(r.ravel),p=i.shape),l===!1)l=p;else if(l.length!==p.length||!l.every((f,u)=>f===p[u]))return[!1,"(): Shape mismatch"]}r.shape.push(n-e),r.shape=r.shape.concat(l||[]),s.push(r);break}case a.DISTANCE:{const e=s.pop(),n=s.pop();if(d(e)&&d(n)){s.push(Math.abs(e-n));break}if(typeof e!=typeof n)return[!1,"|: Rank error"];if(e.ravel.length!=n.ravel.length)return[!1,"|: Length error"];let r=0;for(let l=0;l<e.ravel.length;l++){const h=e.ravel[l],i=n.ravel[l];r+=Math.pow(i-h,2)}s.push(Math.sqrt(r));break}case a.MATCH:{const e=s.pop();let n=s.length-1;s[n]=y(s[n],e);break}case a.NMATCH:{const e=s.pop();let n=s.length-1;s[n]=+!y(s[n],e);break}case a.INDEX:{const e=s.pop();let n=s.length-1;const r=s[n].ravel.length/s[n].shape[0];if(d(e)){const h=(e-1)*r;s[n]=s[n].shape.length===1?s[n].ravel[h]:c(s[n].shape.slice(1),s[n].ravel.slice(h,h+r));break}let l=[];for(let h=0;h<e.ravel.length;h++){const i=(e.ravel[h]-1)*r;l=l.concat(s[n].ravel.slice(i,i+r))}s[n]=c(e.shape.concat(s[n].shape.slice(1)),l);break}case a.REPLICATE:{let e=s.pop();if(d(e)&&(e=c([1],[e])),e.shape.length>1)return[!1,"⊃: Rank error"];let n=[];for(let r=0;r<e.ravel.length;r++)for(let l=0;l<e.ravel[r];l++)n.push(r+1);s.push(c([n.length],n));break}case a.SPLICE:{const e=s.pop(),n=s.pop(),r=s.pop();if(r.shape.length!=n.shape.length)return[!1,"⊥: Rank mismatch"];for(let i=1;i<r.shape.length;i++)if(r.shape[i]!=n.shape[i])return[!1,"⊥: Shape mismatch"];if(e.shape[0]!=r.shape[0])return[!1,"⊥: Length mismatch"];let l=r.shape.slice(1).reduce((i,p)=>i*p,1),h=c([0,...r.shape.slice(1)],[]);for(let i=0;i<e.ravel.length;i++)e.ravel[i]?(h.ravel=h.ravel.concat(n.ravel),h.shape[0]+=n.shape[0]):(h.ravel=h.ravel.concat(r.ravel.slice(i*l,i*l+l)),h.shape[0]++);s.push(h);break}case a.PICK:{const e=s.pop(),n=s.pop(),r=s.pop();if(n.shape.length!=r.shape.length)return[!1,"⊤: Rank mismatch"];for(let i=0;i<n.shape.length;i++)if(n.shape[i]!=r.shape[i])return[!1,"⊤: Shape mismatch"];if(e.shape[0]!=n.shape[0])return[!1,"⊤: Length mismatch"];let l=n.shape.slice(1).reduce((i,p)=>i*p,1),h=c(n.shape,[]);for(let i=0;i<e.ravel.length;i++)e.ravel[i]?h.ravel=h.ravel.concat(n.ravel.slice(i*l,i*l+l)):h.ravel=h.ravel.concat(r.ravel.slice(i*l,i*l+l));s.push(h);break}case a.KEEP:{let e=s.pop();const n=s.pop();if(d(n)&&d(e)){let i=[];for(let p=0;p<e;p++)i.push(n);s.push(c([i.length],i));break}if(typeof n!=typeof e)return[!1,"⊆: Rank mismatch"];if(e.ravel.length!=n.shape[0])return[!1,"⊆: Length mismatch"];let r=[],l=0,h=n.ravel.length/n.shape[0];for(let i=0;i<e.ravel.length;i++)for(let p=0;p<e.ravel[i];p++)r=r.concat(n.ravel.slice(i*h,i*h+h)),l++;s.push(c([l,...n.shape.slice(1)],r));break}case a.ROTATE:{const e=s.pop();let n=s.length-1;const r=s[n].ravel.length/s[n].shape[0];if(e>0)for(let l=0;l<e;l++){const h=s[n].ravel.splice(0,r);s[n].ravel=s[n].ravel.concat(h)}else for(let l=0;l<-e;l++){const h=s[n].ravel.splice(s[n].ravel.length-r,r);s[n].ravel=h.concat(s[n].ravel)}break}case a.REVERSE:{let e=s.length-1;const n=s[e].shape[0],r=s[e].ravel.length/n;for(let l=0;l<n/2;l++){let h=s[e].ravel.slice(l*r,l*r+r);const i=n-l-1;s[e].ravel.splice(l*r,r,...s[e].ravel.slice(i*r,i*r+r)),s[e].ravel.splice(i*r,r,...h)}break}case a.LAMINATE:{let e=s.pop(),n=s.length-1;if(d(e)&&(e=c([1],[...e])),d(s[n])&&(s[n]=c([1],[...s[n]])),e.shape.length!==s[n].shape.length)return[!1,"Laminate: Rank error"];for(let r=0;r<e.shape.length;r++)if(e.shape[r]!==s[n].shape[r])return[!1,"Laminate: Shape error"];s[n].shape.unshift(2),s[n].ravel=e.ravel.concat(s[n].ravel);break}case a.CATENATE:{let e=s.pop(),n=s.length-1;if(d(e)&&(e=c([1],[...e])),d(s[n])&&(s[n]=c([1],[...s[n]])),s[n].shape.length===e.shape.length){for(let r=1;r<s[n].shape.length;r++)if(s[n].shape[r]!==e.shape[r])return[!1,",: Shape mismatch"];s[n].shape[0]+=e.shape[0]}else if(s[n].shape.length===e.shape.length+1){for(let r=1;r<s[n].shape.length;r++)if(s[n].shape[r]!==e.shape[r-1])return[!1,",: Shape mismatch"];s[n].shape[0]++}else if(e.shape.length===s[n].shape.length+1){for(let r=1;r<e.shape.length;r++)if(e.shape[r]!==s[n].shape[r-1])return[!1,",: Shape mismatch"];s[n].shape=e.shape,s[n].shape[0]++}else return[!1,",: Shape mismatch"];s[n].ravel=e.ravel.concat(s[n].ravel);break}case a.SHAPEOF:{let e=s.length-1;d(s[e])?s[e]=c([0],[]):s[e]=c([s[e].shape.length],s[e].shape);break}case a.INDICES:{const e=s.pop();let n=[];if(d(e)){for(let r=0;r<e;r++)n.push(r+1);s.push(c([n.length],n))}else{let r=[];for(let l=0;l<e.ravel.length;l++){const h=r.findIndex(i=>y(e.ravel[l],i));h<0?(r.push(e.ravel[l]),n.push(r.length)):n.push(h+1)}s.push(c(e.shape,n))}break}case a.INDICESOF:{let e=s.pop(),n=s.pop();if(d(n)&&(n=c([1],[n])),d(e)&&(e=c([1],[e])),e.shape.length!==n.shape.length)return[!1,"⍳: Rank error"];for(let i=1;i<n.shape.length;i++)if(e.shape[i]!==n.shape[i])return[!1,"⍳: Rank error"];let r=c([0],[]),l=c([0,...n.shape.slice(1)],[]);const h=n.ravel.length/n.shape[0];for(let i=0;i<n.shape[0];i++)l.ravel=l.ravel.concat(n.ravel.slice(i*h,i*h+h)),l.shape[0]++,l.shape[0]>e.shape[0]&&(l.ravel.splice(0,h),l.shape[0]--),y(l,e)&&(r.ravel.push(i-e.shape[0]+2),r.shape[0]++);s.push(r);break}case a.FINDSEQ:{let e=s.pop(),n=s.pop();d(n)&&(n=c([1],[n])),d(e)&&(e=c([1],[e]));let r=c([0],[]),l=c([0,...n.shape.slice(1)],[]);const h=n.ravel.length/n.shape[0];for(let i=0;i<n.shape[0];i++)l.ravel=l.ravel.concat(n.ravel.slice(i*h,i*h+h)),l.shape[0]++,r.ravel.push(0),r.shape[0]++,l.shape[0]>e.shape[0]&&(l.ravel.splice(0,h),l.shape[0]--),y(l,e)&&(r.ravel[i-e.shape[0]+1]=1);s.push(r);break}case a.TAKEDROP:{let e=s.pop(),n=s.length-1;d(s[n])&&(s[n]=c([1],[s[n]])),e<0?(s[n].ravel=s[n].ravel.slice(-e*s[n].ravel.length/s[n].shape[0],s[n].ravel.length),s[n].shape[0]-=e):(s[n].ravel=s[n].ravel.slice(0,e*s[n].ravel.length/s[n].shape[0]),s[n].shape[0]=e);break}case a.RESHAPE:{let e=s.pop();if(d(e)&&(e=c([1],[e])),e.shape.length>1)return[!1,"Cannot reshape with non-vector shape."];let n=s.pop();d(n)&&(n=c([1],[n]));let r=[];const l=e.ravel.reduce((h,i)=>h*i,1);for(let h=0;h<l;h++)r.push(n.ravel[h%n.ravel.length]);s.push(c(e.ravel,r));break}case a.GRADEUP:{let e=s.pop(),n=e.ravel;for(let r=0;r<n.length;r++)n[r]=[n[r],r];n.sort(function(r,l){return r[0]<l[0]?-1:1}),s.push(c(e.shape,n.map(r=>r[1]+1)));break}case a.GRADEDOWN:{let e=s.pop(),n=e.ravel;for(let r=0;r<n.length;r++)n[r]=[n[r],r];n.sort(function(r,l){return r[0]>l[0]?-1:1}),s.push(c(e.shape,n.map(r=>r[1]+1)));break}case a.POP:{for(;s.length;)s.pop();break}case a.POPM:{const e=s.pop();s.pop(),s.push(e);break}case a.POPD:{const e=s.pop();s.pop(),s.pop(),s.push(e);break}case a.OMEGA:{s.push(JSON.parse(JSON.stringify(A["⍵"])));break}case a.ALPHA:{s.push(JSON.parse(JSON.stringify(A["⍺"])));break}default:return[!1,"bytecode error on '"+Object.keys(a).find(e=>a[e]===t)+"'"]}}let A={};function O(t,e,n){const r=JSON.parse(JSON.stringify(A));A["⍵"]=n===void 0?n:JSON.parse(JSON.stringify(n)),A["⍺"]=e===void 0?e:JSON.parse(JSON.stringify(e));let l=0;for(;l<t.length;){if(t[l]===a.ASSIGNFN){const i=t[++l];let p=t[++l];!Array.isArray(p[1])&&p[1]===a.RECUR&&(p[1]=JSON.parse(JSON.stringify(t))),A[i]=p,l++;continue}let h=[];for(;l<t.length&&t[l]===a.CONST||t[l]===a.NAME;){if(t[l]===a.NAME){const i=JSON.parse(JSON.stringify(A[t[++l]]));if(Array.isArray(i)){const p=O(i);if(p.length&&p[0]===!1)return p}else s.push(i)}else s.push(t[++l]);l++}for(;l<t.length&&[a.FOLD,a.SCAN,a.REPEAT,a.UNTIL,a.IF].includes(t[l]);)h.push(t[l++]);if(!(l>=t.length)){if(t[l]===a.ASSIGN){if(h.length)return[!1,"bytecode error: modifiers for ←"];A[t[++l]]=s.pop(),s.push(JSON.parse(JSON.stringify(A[t[l]]))),l++;continue}if(h.length===0)if(t[l]===a.MFUNCTION||t[l]===a.DFUNCTION){const i=t[l]===a.DFUNCTION;let p,f;i&&(p=s.pop()),f=s.pop();const u=O(t[++l],p,f);if(u.length&&u[0]===!1)return u}else if(t[l]===a.RECUR){const i=O(t);if(i.length&&i[0]===!1)return i}else{const i=D(t[l]);if(i)return i}else{let i;if(t[l]===a.MFUNCTION||t[l]===a.DFUNCTION){const f=t[l]===a.DFUNCTION;l++;const u=t[l];i=()=>{let m,o;f&&(m=s.pop()),o=s.pop();const E=O(u,m,o);if(E.length&&E[0]===!1)return E}}else if(t[l]===a.RECUR)i=()=>{const f=O(t);if(f.length&&f[0]===!1)return f};else{const f=t[l];i=()=>{const u=D(f);if(u)return u}}for(;h.length>0;){const f=h.pop(),u=i;let m;if([a.UNTIL,a.IF].includes(f))if(l++,t[l]===a.MFUNCTION||t[l]===a.DFUNCTION){const o=t[l]===a.DFUNCTION;l++;const E=t[l];m=()=>{let N,g;o&&(N=s.pop()),g=s.pop();const v=O(E,N,g);if(v.length&&v[0]===!1)return v}}else if(t[l]===a.RECUR)m=()=>{const o=O(t);if(o.length&&o[0]===!1)return o};else{const o=t[l];m=()=>{const E=D(o);if(E)return E}}switch(f){case a.FOLD:{i=()=>{const o=s.pop(),E=o.ravel.length/o.shape[0];if(o.shape[0]===0)s.push(c(o.shape.slice(1),new Array(o.shape.slice(1).reduce((N,g)=>N*g,1)).fill().map(N=>0)));else if(o.shape[0]===1)s.push(o.shape.length===1?o.ravel[0]:c(o.shape.slice(1),o.ravel));else{const N=o.ravel.slice(0,E);s.push(o.shape.length===1?N[0]:c(o.shape.slice(1),N));for(let g=1;g<o.shape[0];g++){const v=o.ravel.slice(g*E,g*E+E);s.push(o.shape.length===1?v[0]:c(o.shape.slice(1),v));const L=u();if(L)return L}}};break}case a.SCAN:{i=()=>{const o=s.pop(),E=o.ravel.length/o.shape[0];if(o.shape[0]===0)s.push(c([0,...o.shape.slice(1)],[]));else if(o.shape[0]===1)s.push(c([1,...o.shape.slice(1)],o.ravel));else{let N=c(o.shape,[]);const g=o.ravel.slice(0,E);s.push(o.shape.length===1?g[0]:c(o.shape.slice(1),g)),N.ravel=N.ravel.concat(g);for(let v=1;v<o.shape[0];v++){const L=o.ravel.slice(v*E,v*E+E);s.push(o.shape.length===1?L[0]:c(o.shape.slice(1),L));const _=u();if(_)return _;N.ravel=N.ravel.concat(d(s[s.length-1])?s[s.length-1]:s[s.length-1].ravel)}s.pop(),s.push(N)}};break}case a.REPEAT:{i=()=>{const o=s.pop(),E=s.pop();s.push(V(N=>{s.push(E);for(let g=0;g<N;g++)u();return s.pop()},o))};break}case a.UNTIL:{i=()=>{let o=!1;for(;;){u();const E=JSON.parse(JSON.stringify(s[s.length-1]));if(o!==!1){const N=JSON.parse(JSON.stringify(s));s.push(o),m();let g=s.pop();if(s=N,g===1)break}o=E}};break}case a.IF:{i=()=>{const o=s.pop();let E=0;const N=JSON.parse(JSON.stringify(s));(d(o)?o:o.ravel[0])?u():m();const g=s.pop();E=N.length-s.length,s=N;for(let v=0;v<E;v++)s.pop();s.push(g)};break}default:return[!1,"bytecode error on '"+Object.keys(a).find(o=>a[o]===f)+"'"]}}const p=i();if(p)return p}l++,t[l]===a.ASSIGN&&(A[t[++l]]=s.pop(),s.push(JSON.parse(JSON.stringify(A[t[l]]))),l++)}}return C.length?[!1,"): Mismatched parenthesis"]:(A=r,s.map(ce).join(`
`))}function ce(t){if(typeof t=="object"){let e=[],n=1;for(let l=t.shape.length-1;l>=0;l--)n*=t.shape[l],e.push(n);let r="";t.ravel.length||(t.shape.length>1?r+="⍬["+t.shape+"]":r+="⍬");for(let l=0;l<t.ravel.length;l++){if(l!==0)for(let h of e)l%h===0&&(r+=`
`);r+=""+t.ravel[l]+(typeof t.ravel[l]=="string"?"":" ")}return r}else return""+t}function x(t){let e=W(t);if(e.length&&e[0]===!1){let l="error: "+e[1]+`

`,h=0;for(let i of t.split(`
`)){const p=h;if(h+=i.length+1,h>e[2]){l+=i+`
`,l+=" ".repeat(e[2]-p),l+=`↑ here
`;break}}return l}const n=ee(e);if(n.length&&n[0]===!1){let l="";for(let h=0;h<e.length&&e[h]!==`
`;h++)l+=e[h].length&&e[h][0]==="'"?e[h]+"'":e[h],l+=" ";return n[1]+`

... `+l+`
    ↑ here`}s=[],C=[];const r=O(n);return r.length&&r[0]===!1?r[1]:r}runresult.innerText=x(S.value);