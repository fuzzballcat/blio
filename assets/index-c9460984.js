(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();const j=document.getElementById("languagebar"),v=document.getElementById("srcinput"),O=[`'factorial of 5 is'
×/!5`,"⌽(⍒2×+\\' '=s)⊂s←' talF LPA .selur'",`s←'questionably, beatably, deniably, doubtedly,'
¯1&' un'⊥[' '=r]r←' ',s
'the best language ever'`];let R=Math.floor(Math.random()*O.length);document.getElementById("forward").addEventListener("click",n=>{R=(R+1)%O.length,v.value=O[R],v.dispatchEvent(new CustomEvent("input")),F.dispatchEvent(new CustomEvent("click"))},!1);document.getElementById("back").addEventListener("click",n=>{R=((R-1)%O.length+O.length)%O.length,v.value=O[R],v.dispatchEvent(new CustomEvent("input")),F.dispatchEvent(new CustomEvent("click"))},!1);v.value=O[R];v.addEventListener("keydown",n=>{n.keyCode===13&&n.shiftKey&&(runresult.innerText=x(v.value),n.preventDefault())},!1);const C="⍬ + ¯ - × ÷ ⌹ * ⍟ ↑ ↓ ~ | ⌈ ⌊ % < ≤ = ≥ > ≠ ≡ ≢ ⊃ ⊂ ⊆ ⊥ ⊤ ⍳ ⍸ ⍒ ⍋ ⌽ ⊖ & , # ! ⍴ ⍣ ⍤ / \\ ? ← ⍅ () '' ⍺ ⍵ ∇ {} [] ⋄",M="+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⊥⊤⍳⍸⍒⍋⌽⊖&,#!⍴()∇",D="⍤⍣/\\?",G="⍬1234567890.",K="←⍅()∇{}[]",V={"⍬":"Zilde","+":`Add
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
1F`,"⍣":`Repeat
1F1`,"⍤":`Until
2F`,"?":`If
2F1`,"←":"Assign","⍅":"Function assign","()":"Array","⍺":"Left argument","⍵":"Right argument","∇":"Recur","{}":"Defined function","[]":"Axis-index","''":"String","⋄":"Statement separator"},w=n=>K.includes(n)?"hi_k":M.includes(n)?"hi_f":D.includes(n)?"hi_m":n[0]==="'"?"hi_s":G.includes(n)?"hi_c":n[0]==="\\"?"hi_e":n[0]==="¯"?"hi_c":!1;function b(n){const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},t=r=>r.replace(/[&<>"'/]/ig,l=>e[l]);return n=n.split(/('(?:[^'\\]|\\.)*')/),n=n.map(r=>r[0]!=="'"?r.replace(new RegExp("¯[0-9.]|"+[...M,...D,...G].map(l=>l.match(/[0-9]/)?l:"\\"+l).join("|"),"g"),l=>'<span class="'+w(l)+'">'+t(l)+"</span>"):"<span class='hi_s'>"+r.split(/(\\.)/g).map(l=>l.length===2&&l[0]==="\\"?"<span class='hi_e'>"+t(l)+"</span>":l).join("")+"</span>").join(""),n}const J=document.getElementById("srcdisplay");v.addEventListener("input",()=>{J.innerHTML=b(v.value)});J.innerHTML=b(v.value);function X(n,e){if(document.selection)n.focus(),document.selection.createRange().text=myValue;else if(n.selectionStart||n.selectionStart==="0"){const t=n.selectionStart;n.value=n.value.substring(0,t)+e+n.value.substring(n.selectionEnd,n.value.length),n.focus(),n.selectionStart=t+e.length,n.selectionEnd=t+e.length}else n.value+=e}for(let n of C.split(" ")){const e=document.createElement("button");e.classList.add("glyphbutton");const t=w(n);t&&e.classList.add(t),e.innerText=n,j.appendChild(e);const r=document.createElement("div");r.classList.add("glyphbuttontooltip"),r.innerText=V[n],e.appendChild(r),e.addEventListener("click",l=>{X(v,n),v.dispatchEvent(new CustomEvent("input")),n.length>1&&(v.focus(),v.selectionStart--,v.selectionEnd--)},!1)}const F=document.getElementById("run");F.addEventListener("click",n=>{runresult.innerText=x(v.value)},!1);function B(n){let e=[];for(let t=0;t<n.length;t++){let r=n[t];if(r!==" ")if(r==="'"){let l="";do if(r==="\\"&&(r=n[++t]),l+=r,r=n[++t],t>=n.length)return[!1,"Expected string terminator",t];while(r!="'");e.push(l)}else if(r.match(/[a-z]/i)){let l="";for(;r.match(/[a-z]/i)&&(l+=r,r=n[++t],!(t>=n.length)););t--,e.push(l)}else if(r==="¯"&&t<n.length-1&&(n[t+1]==="."||n[t+1].match(/[0-9]/))||r==="."||r.match(/[0-9]/)){let l=1;r==="¯"&&(l=-1,r=n[++t]);let i="";for(;r.match(/[0-9]/)&&(i+=r,r=n[++t],!(t>=n.length)););if(r==="."&&(i+=r,r=n[++t],t<n.length))for(;r.match(/[0-9]/)&&(i+=r,r=n[++t],!(t>=n.length)););t--,e.push(l*parseFloat(i))}else if(r===`
`||C.includes(r))e.push(r);else return[!1,"Unknown token "+r,t]}return e}const a=["CONST","FOPEN","FUNCTION","ASSIGN","ASSIGNFN","NAME","ADD","NEGATE","SUB","MUL","DIV","EXP","LOG","MATINV","ARROPEN","ARRCLOSE","MAX","MIN","MOD","NOT","DISTANCE","CEILING","FLOOR","MATCH","NMATCH","EQUAL","NEQUAL","LESS","GREATER","LESSEQ","GREATEREQ","INDEX","KEEP","REPLICATE","ROTATE","REVERSE","CATENATE","LAMINATE","SHAPEOF","INDICES","INDICESOF","FINDSEQ","TAKEDROP","RESHAPE","GRADEUP","GRADEDOWN","SPLICE","PICK","RECUR","REPEAT","UNTIL","FOLD","SCAN","IF","OMEGA","ALPHA","POP","POPD","POPM"].map((n,e)=>({[n]:e+1})).reduce((n,e)=>({...n,...e}));function p(n,e){return{shape:n,ravel:e}}function q(n){if(typeof n[0]=="number")if(n.length>1&&typeof n[1]=="number"){let e=[n.shift()];for(;n.length>0&&typeof n[0]=="number";)e.push(n.shift());return[a.CONST,p([e.length],e)]}else return[a.CONST,n.shift()];else{if(n[0]==="⍬")return n.shift(),[a.CONST,p([0],[])];if(n[0]==="⍵")return n.shift(),[a.OMEGA];if(n[0]==="⍺")return n.shift(),[a.ALPHA];if(n[0].length&&n[0][0]==="'"){const e=n.shift();return[a.CONST,e.length===2?e.slice(1):p([e.length-1],[...e.slice(1)])]}else{if(typeof n[0]=="string"&&!C.includes(n[0]))return[a.NAME,n.shift()];if(n[0]==="("){n.shift();let e=L(n),t=!1;for(;`⋄
`.includes(n[0]);)n.shift(),e=L(n).concat(e).concat([t?a.CATENATE:a.LAMINATE]),t=!0;return n.length<1||n[0]!==")"?[!1,"Expected closing )"]:(n.shift(),e)}else return[!1,"Syntax error: expected expression"]}}}function _(n){if(n[0]==="{"){n.shift();const e=Q(n);return e.length&&e[0]===!1?e:n.length<1||n[0]!=="}"?[!1,"Mismatched {"]:(n.shift(),[a.FUNCTION,e])}else if(typeof n[0]=="string"&&M.includes(n[0])){const e=n.shift(),t={"+":a.ADD,"-":a.SUB,"×":a.MUL,"÷":a.DIV,"*":a.EXP,"⍟":a.LOG,"⌹":a.MATINV,"¯":a.NEGATE,"↑":a.MAX,"↓":a.MIN,"~":a.NOT,"|":a.DISTANCE,"⌈":a.CEILING,"⌊":a.FLOOR,"%":a.MOD,"=":a.EQUAL,"≠":a.NEQUAL,"<":a.LESS,">":a.GREATER,"≤":a.LESSEQ,"≥":a.GREATEREQ,"≡":a.MATCH,"≢":a.NMATCH,"⊃":a.REPLICATE,"⊂":a.INDEX,"⊆":a.KEEP,"⊥":a.SPLICE,"⊤":a.PICK,"⌽":a.REVERSE,"⊖":a.ROTATE,",":a.CATENATE,"#":a.SHAPEOF,"!":a.INDICES,"⍳":a.INDICESOF,"⍸":a.FINDSEQ,"&":a.TAKEDROP,"⍴":a.RESHAPE,"⍋":a.GRADEUP,"⍒":a.GRADEDOWN,"(":a.ARROPEN,")":a.ARRCLOSE,"∇":a.RECUR}[e];return t===void 0?[!1,"internalerror on '"+e+"'"]:[t]}else return typeof n[0]=="string"&&!C.includes(n[0])?[a.NAME,n.shift()]:[!1,"Syntax error: expected a function"]}function U(n){let e=_(n);if(e.length&&e[0]===!1)return e;for(;typeof n[0]=="string"&&(D.includes(n[0])||n[0]==="[");){const t=n.shift();if(t==="["){if(e=L(n).concat(e),n.length<1||n[0]!=="]")return[!1,"Expected closing ]"];n.shift();continue}const r={"/":a.FOLD,"\\":a.SCAN,"⍣":a.REPEAT,"⍤":a.UNTIL,"?":a.IF}[t];if(r===void 0)return[!1,"internalerror on '"+t+"'"];if(e=[r].concat(e),r===a.IF||r===a.UNTIL){let l=_(n);if(l.length&&l[0]===!1)return l;e=e.concat(l)}}return e}const z=`)]}
⋄`;function W(n){return n==="("||n==="⍵"||n==="⍺"||typeof n=="string"&&!C.includes(n)&&Z(n[0])||typeof n=="number"||n==="⍬"||n.length&&n[0]==="'"}function Z(n){return n===n.toLowerCase()&&n!==n.toUpperCase()}function L(n){if(n.length===0)return[!1,"Expected an expression."];let e=[];if(W(n[0])&&(e=q(n),e.length&&e[0]===!1))return e;if(n.length>0&&!z.includes(n[0])){if(n[0]==="←"){if(e.length<2||e[0]!=a.NAME)return[!1,"Expected a name to assign to"];n.shift();let l=L(n);return l.length&&l[0]===!1?l:l.concat([a.ASSIGN,e[1]])}else if(n[0]==="⍅"){if(e.length<2||e[0]!=a.NAME)return[!1,"Expected a name to assign to"];n.shift();let l=U(n);return l.length&&l[0]===!1?l:[a.ASSIGNFN,e[1][0].toUpperCase()+e[1].slice(1),[a.FUNCTION,l[0]===a.FUNCTION?l:l[0]]]}let t=U(n);if(t.length&&t[0]===!1)return t;let r=L(n);if(r.length&&r[0]===!1)return r;e=r.concat(e).concat(t).concat([e.length?a.POPD:a.POPM])}return e}function Q(n){for(;n.length>0&&`
⋄`.includes(n[0]);)n.shift();let e=[];for(let t=0;t<100&&n.length>0;t++){const r=L(n);if(r.length&&r[0]===!1)return r;for(e=e.concat(r);n.length>0&&`
⋄`.includes(n[0]);)n.shift();r.length>1&&r[r.length-2]===a.ASSIGN&&e.push(a.POP)}return e}function Y(n,e,t){let r=[];for(let l=0;l<t;l++)for(let i=0;i<t;i++){let h=0;for(let c=0;c<t;c++)h+=n[l*t+c]*e[c*t+i];r.push(h)}return r}function $(n){if(E(n))return 1/n;if(n.shape.length===1){let f=n.ravel.map(o=>o*o).reduce((o,u)=>o+u,0);return n.map(o=>o/f)}if(n.shape.length>2||n.shape[0]!==n.shape[1])return[!1,"⌹: Shape error"];const e=n.shape[0],t=n.ravel,r=[];for(let f=0;f<e*e;f++)r.push(+(f%(e+1)===0));let l;function i(f){if(f===0)return[[1],r];let[o,u]=i(f-1),g=Y(t,u,e),d=0;for(let m=0;m<e;m++)d+=g[m*e+m];d/=-f;let N=[];for(let m=0;m<e;m++)for(let I=0;I<e;I++)N.push(g[m*e+I]+r[m*e+I]*d);return f===e-1&&(l=N),[o.concat(d),N]}const h=i(e)[0],c=h[h.length-1];if(c===0)return[!1,"⌹: Domain error"];for(let f=0;f<e*e;f++)l[f]/=-c;return p([e,e],l)}function E(n){return typeof n=="number"||typeof n=="string"}function y(n,e){if(typeof n!=typeof e)return 0;if(E(n))return+(n===e);if(n.shape.length!=e.shape.length)return 0;for(let t=0;t<n.shape.length;t++)if(n.shape[t]!==e.shape[t])return 0;if(n.ravel.length!=e.ravel.length)return 0;for(let t=0;t<n.ravel.length;t++)if(!y(n.ravel[t],e.ravel[t]))return 0;return 1}function ee(n,e,t){const r=E(e),l=E(t);if(r&&l)return n(e,t);if(r){let c=[];for(let f=0;f<t.ravel.length;f++)c.push(n(e,t.ravel[f]));return p(t.shape,c)}if(l){let c=[];for(let f=0;f<e.ravel.length;f++)c.push(n(e.ravel[f],t));return p(e.shape,c)}const i=Math.min(e.shape.length,t.shape.length);let h=!0;for(let c=0;c<i;c++)if(e.shape[c]!=t.shape[c]){h=!1;break}if(h)if(e.shape.length>t.shape.length){const c=e.shape.slice(i).reduce((o,u)=>o*u,1);let f=[];for(let o=0;o<t.ravel.length;o++){const u=t.ravel[o];for(let g=0;g<c;g++)f.push(n(e.ravel[o*c+g],u))}return p(e.shape,f)}else{const c=t.shape.slice(i).reduce((o,u)=>o*u,1);let f=[];for(let o=0;o<e.ravel.length;o++){const u=e.ravel[o];for(let g=0;g<c;g++)f.push(n(u,t.ravel[o*c+g]))}return p(t.shape,f)}}function H(n,e){if(E(e))return n(e);let t=[];for(let r=0;r<e.ravel.length;r++)t.push(n(e.ravel[r]));return p(e.shape,t)}let s=[],T=[];const te=[a.ADD,a.SUB,a.MUL,a.DIV,a.EXP,a.LOG,a.MAX,a.MIN,a.MOD,a.EQUAL,a.NEQUAL,a.LESS,a.GREATER,a.LESSEQ,a.GREATEREQ],k=["+","-","×","÷","*","⍟","↑","↓","%","=","≠","<",">","≤","≥"],ne=[(n,e)=>n+e,(n,e)=>n-e,(n,e)=>n*e,(n,e)=>n/e,Math.pow,(n,e)=>Math.log(n)/Math.log(e),Math.max,Math.min,(n,e)=>(n%e+e)%e,(n,e)=>+(n===e),(n,e)=>+(n!==e),(n,e)=>+(n<e),(n,e)=>+(n>e),(n,e)=>+(n<=e),(n,e)=>+(n>=e)];function re(n){const e=te.indexOf(n);let t=s.pop();if(t===void 0)return[!1,k[e]+": Expected a value"];let r=s.length-1;if(r<0)return[!1,k[e]+": Expected another value"];let l=ee(ne[e],t,s[r]);if(l===void 0)return[!1,k[e]+": Shape mismatch"];s[r]=l}const le=[a.NEGATE,a.NOT,a.CEILING,a.FLOOR],se=["¯","~","⌈","⌊"],ae=[n=>-n,n=>+!n,Math.ceil,Math.floor];function ie(n){const e=le.indexOf(n);let t=s.length-1;if(t<0)return[!1,se[e]+": Expected a value"];s[t]=H(ae[e],s[t])}function P(n){switch(n){case a.NEGATE:case a.NOT:case a.CEILING:case a.FLOOR:{const e=ie(n);if(e)return e;break}case a.ADD:case a.SUB:case a.MUL:case a.DIV:case a.EXP:case a.LOG:case a.MAX:case a.MIN:case a.MOD:case a.EQUAL:case a.NEQUAL:case a.LESS:case a.GREATER:case a.LESSEQ:case a.GREATEREQ:{const e=re(n);if(e)return e;break}case a.MATINV:{let e=s.length-1;if(e<0)return[!1,"⌹: Expected a value"];const t=$(s[e]);if(t.length&&t[0]===!1)return t;s[e]=t;break}case a.ARROPEN:{T.push(s.length);break}case a.ARRCLOSE:{if(!T.length)return[!1,"(: Mismatched parenthesis"];const e=T.pop(),t=s.length;let r=p([],[]),l=!1;for(let i=0;i<t-e;i++){const h=s.pop();let c;if(E(h)?(r.ravel.unshift(h),c=[]):(r.ravel=h.ravel.concat(r.ravel),c=h.shape),l===!1)l=c;else if(l.length!==c.length||!l.every((f,o)=>f===c[o]))return[!1,"(): Shape mismatch"]}r.shape.push(t-e),r.shape=r.shape.concat(l||[]),s.push(r);break}case a.DISTANCE:{const e=s.pop(),t=s.pop();if(E(e)&&E(t)){s.push(Math.abs(e-t));break}if(typeof e!=typeof t)return[!1,"|: Rank error"];if(e.ravel.length!=t.ravel.length)return[!1,"|: Length error"];let r=0;for(let l=0;l<e.ravel.length;l++){const i=e.ravel[l],h=t.ravel[l];r+=Math.pow(h-i,2)}s.push(Math.sqrt(r));break}case a.MATCH:{const e=s.pop();let t=s.length-1;s[t]=y(s[t],e);break}case a.NMATCH:{const e=s.pop();let t=s.length-1;s[t]=+!y(s[t],e);break}case a.INDEX:{const e=s.pop();let t=s.length-1;const r=s[t].ravel.length/s[t].shape[0];if(E(e)){const i=(e-1)*r;s[t]=s[t].shape.length===1?s[t].ravel[i]:p(s[t].shape.slice(1),s[t].ravel.slice(i,i+r));break}let l=[];for(let i=0;i<e.ravel.length;i++){const h=(e.ravel[i]-1)*r;l=l.concat(s[t].ravel.slice(h,h+r))}s[t]=p(e.shape.concat(s[t].shape.slice(1)),l);break}case a.REPLICATE:{let e=s.pop();if(E(e)&&(e=p([1],[e])),e.shape.length>1)return[!1,"⊃: Rank error"];let t=[];for(let r=0;r<e.ravel.length;r++)for(let l=0;l<e.ravel[r];l++)t.push(r+1);s.push(p([t.length],t));break}case a.SPLICE:{const e=s.pop(),t=s.pop(),r=s.pop();if(r.shape.length!=t.shape.length)return[!1,"⊥: Rank mismatch"];for(let h=1;h<r.shape.length;h++)if(r.shape[h]!=t.shape[h])return[!1,"⊥: Shape mismatch"];if(e.shape[0]!=r.shape[0])return[!1,"⊥: Length mismatch"];let l=r.shape.slice(1).reduce((h,c)=>h*c,1),i=p([0,...r.shape.slice(1)],[]);for(let h=0;h<e.ravel.length;h++)e.ravel[h]?(i.ravel=i.ravel.concat(t.ravel),i.shape[0]+=t.shape[0]):(i.ravel=i.ravel.concat(r.ravel.slice(h*l,h*l+l)),i.shape[0]++);s.push(i);break}case a.PICK:{const e=s.pop(),t=s.pop(),r=s.pop();if(t.shape.length!=r.shape.length)return[!1,"⊤: Rank mismatch"];for(let h=0;h<t.shape.length;h++)if(t.shape[h]!=r.shape[h])return[!1,"⊤: Shape mismatch"];if(e.shape[0]!=t.shape[0])return[!1,"⊤: Length mismatch"];let l=t.shape.slice(1).reduce((h,c)=>h*c,1),i=p(t.shape,[]);for(let h=0;h<e.ravel.length;h++)e.ravel[h]?i.ravel=i.ravel.concat(t.ravel.slice(h*l,h*l+l)):i.ravel=i.ravel.concat(r.ravel.slice(h*l,h*l+l));s.push(i);break}case a.KEEP:{let e=s.pop();const t=s.pop();if(E(t)&&E(e)){let h=[];for(let c=0;c<e;c++)h.push(t);s.push(p([h.length],h));break}if(typeof t!=typeof e)return[!1,"⊆: Rank mismatch"];if(e.ravel.length!=t.shape[0])return[!1,"⊆: Length mismatch"];let r=[],l=0,i=t.ravel.length/t.shape[0];for(let h=0;h<e.ravel.length;h++)for(let c=0;c<e.ravel[h];c++)r=r.concat(t.ravel.slice(h*i,h*i+i)),l++;s.push(p([l,...t.shape.slice(1)],r));break}case a.ROTATE:{const e=s.pop();let t=s.length-1;const r=s[t].ravel.length/s[t].shape[0];if(e>0)for(let l=0;l<e;l++){const i=s[t].ravel.splice(0,r);s[t].ravel=s[t].ravel.concat(i)}else for(let l=0;l<-e;l++){const i=s[t].ravel.splice(s[t].ravel.length-r,r);s[t].ravel=i.concat(s[t].ravel)}break}case a.REVERSE:{let e=s.length-1;const t=s[e].shape[0],r=s[e].ravel.length/t;for(let l=0;l<t/2;l++){let i=s[e].ravel.slice(l*r,l*r+r);const h=t-l-1;s[e].ravel.splice(l*r,r,...s[e].ravel.slice(h*r,h*r+r)),s[e].ravel.splice(h*r,r,...i)}break}case a.LAMINATE:{let e=s.pop(),t=s.length-1;if(E(e)&&(e=p([1],[...e])),E(s[t])&&(s[t]=p([1],[...s[t]])),e.shape.length!==s[t].shape.length)return[!1,"Laminate: Rank error"];for(let r=0;r<e.shape.length;r++)if(e.shape[r]!==s[t].shape[r])return[!1,"Laminate: Shape error"];s[t].shape.unshift(2),s[t].ravel=e.ravel.concat(s[t].ravel);break}case a.CATENATE:{let e=s.pop(),t=s.length-1;if(E(e)&&(e=p([1],[...e])),E(s[t])&&(s[t]=p([1],[...s[t]])),s[t].shape.length===e.shape.length){for(let r=1;r<s[t].shape.length;r++)if(s[t].shape[r]!==e.shape[r])return[!1,",: Shape mismatch"];s[t].shape[0]+=e.shape[0]}else if(s[t].shape.length===e.shape.length+1){for(let r=1;r<s[t].shape.length;r++)if(s[t].shape[r]!==e.shape[r-1])return[!1,",: Shape mismatch"];s[t].shape[0]++}else if(e.shape.length===s[t].shape.length+1){for(let r=1;r<e.shape.length;r++)if(e.shape[r]!==s[t].shape[r-1])return[!1,",: Shape mismatch"];s[t].shape=e.shape,s[t].shape[0]++}else return[!1,",: Shape mismatch"];s[t].ravel=e.ravel.concat(s[t].ravel);break}case a.SHAPEOF:{let e=s.length-1;E(s[e])?s[e]=p([0],[]):s[e]=p([s[e].shape.length],s[e].shape);break}case a.INDICES:{const e=s.pop();let t=[];if(E(e)){for(let r=0;r<e;r++)t.push(r+1);s.push(p([t.length],t))}else{let r=[];for(let l=0;l<e.ravel.length;l++){const i=r.findIndex(h=>y(e.ravel[l],h));i<0?(r.push(e.ravel[l]),t.push(r.length)):t.push(i+1)}s.push(p(e.shape,t))}break}case a.INDICESOF:{let e=s.pop(),t=s.pop();if(E(t)&&(t=p([1],[t])),E(e)&&(e=p([1],[e])),e.shape.length!==t.shape.length)return[!1,"⍳: Rank error"];for(let h=1;h<t.shape.length;h++)if(e.shape[h]!==t.shape[h])return[!1,"⍳: Rank error"];let r=p([0],[]),l=p([0,...t.shape.slice(1)],[]);const i=t.ravel.length/t.shape[0];for(let h=0;h<t.shape[0];h++)l.ravel=l.ravel.concat(t.ravel.slice(h*i,h*i+i)),l.shape[0]++,l.shape[0]>e.shape[0]&&(l.ravel.splice(0,i),l.shape[0]--),y(l,e)&&(r.ravel.push(h-e.shape[0]+2),r.shape[0]++);s.push(r);break}case a.FINDSEQ:{let e=s.pop(),t=s.pop();E(t)&&(t=p([1],[t])),E(e)&&(e=p([1],[e]));let r=p([0],[]),l=p([0,...t.shape.slice(1)],[]);const i=t.ravel.length/t.shape[0];for(let h=0;h<t.shape[0];h++)l.ravel=l.ravel.concat(t.ravel.slice(h*i,h*i+i)),l.shape[0]++,r.ravel.push(0),r.shape[0]++,l.shape[0]>e.shape[0]&&(l.ravel.splice(0,i),l.shape[0]--),y(l,e)&&(r.ravel[h-e.shape[0]+1]=1);s.push(r);break}case a.TAKEDROP:{let e=s.pop(),t=s.length-1;E(s[t])&&(s[t]=p([1],[s[t]])),e<0?(s[t].ravel=s[t].ravel.slice(-e*s[t].ravel.length/s[t].shape[0],s[t].ravel.length),s[t].shape[0]-=e):(s[t].ravel=s[t].ravel.slice(0,e*s[t].ravel.length/s[t].shape[0]),s[t].shape[0]=e);break}case a.RESHAPE:{let e=s.pop();if(E(e)&&(e=p([1],[e])),e.shape.length>1)return[!1,"Cannot reshape with non-vector shape."];let t=s.pop();E(t)&&(t=p([1],[t]));let r=[];const l=e.ravel.reduce((i,h)=>i*h,1);for(let i=0;i<l;i++)r.push(t.ravel[i%t.ravel.length]);s.push(p(e.ravel,r));break}case a.GRADEUP:{let e=s.pop(),t=e.ravel;for(let r=0;r<t.length;r++)t[r]=[t[r],r];t.sort(function(r,l){return r[0]<l[0]?-1:1}),s.push(p(e.shape,t.map(r=>r[1]+1)));break}case a.GRADEDOWN:{let e=s.pop(),t=e.ravel;for(let r=0;r<t.length;r++)t[r]=[t[r],r];t.sort(function(r,l){return r[0]>l[0]?-1:1}),s.push(p(e.shape,t.map(r=>r[1]+1)));break}case a.POP:{for(;s.length;)s.pop();break}case a.POPM:break;case a.POPD:break;case a.OMEGA:{s.push(JSON.parse(JSON.stringify(A["⍵"])));break}case a.ALPHA:{s.push(JSON.parse(JSON.stringify(A["⍺"])));break}default:return[!1,"bytecode error on '"+Object.keys(a).find(e=>a[e]===n)+"'"]}}let A={};function S(n){const e=JSON.parse(JSON.stringify(A));s.length>0&&(A["⍵"]=JSON.parse(JSON.stringify(s[s.length-1]))),s.length>1&&(A["⍺"]=A["⍵"],A["⍵"]=JSON.parse(JSON.stringify(s[s.length-2])));let t=0;for(;t<n.length;){if(n[t]===a.ASSIGNFN){const l=n[++t];let i=n[++t];!Array.isArray(i[1])&&i[1]===a.RECUR&&(i[1]=JSON.parse(JSON.stringify(n))),A[l]=i,t++;continue}let r=[];for(;t<n.length&&n[t]===a.CONST||n[t]===a.NAME;){if(n[t]===a.NAME){const l=JSON.parse(JSON.stringify(A[n[++t]]));if(Array.isArray(l)){const i=S(l);if(i.length&&i[0]===!1)return i}else s.push(l)}else s.push(n[++t]);t++}for(;t<n.length&&[a.FOLD,a.SCAN,a.REPEAT,a.UNTIL,a.IF].includes(n[t]);)r.push(n[t++]);if(!(t>=n.length)){if(n[t]===a.ASSIGN){if(r.length)return[!1,"bytecode error: modifiers for ←"];A[n[++t]]=s.pop(),s.push(JSON.parse(JSON.stringify(A[n[t]]))),t++;continue}if(r.length===0)if(n[t]===a.FUNCTION){const l=S(n[++t]);if(l.length&&l[0]===!1)return l}else if(n[t]===a.RECUR){const l=S(n);if(l.length&&l[0]===!1)return l}else{const l=P(n[t]);if(l)return l}else{let l;if(n[t]===a.FUNCTION){t++;const h=n[t];l=()=>{const c=S(h);if(c.length&&c[0]===!1)return c}}else if(n[t]===a.RECUR)l=()=>{const h=S(n);if(h.length&&h[0]===!1)return h};else{const h=n[t];l=()=>{const c=P(h);if(c)return c}}for(;r.length>0;){const h=r.pop(),c=l;let f;if([a.UNTIL,a.IF].includes(h))if(t++,n[t]===a.FUNCTION){t++;const o=n[t];f=()=>{const u=S(o);if(u.length&&u[0]===!1)return u}}else if(n[t]===a.RECUR)f=()=>{const o=S(n);if(o.length&&o[0]===!1)return o};else{const o=n[t];f=()=>{const u=P(o);if(u)return u}}switch(h){case a.FOLD:{l=()=>{const o=s.pop(),u=o.ravel.length/o.shape[0];if(o.shape[0]===0)s.push(p(o.shape.slice(1),new Array(o.shape.slice(1).reduce((g,d)=>g*d,1)).fill().map(g=>0)));else if(o.shape[0]===1)s.push(o.shape.length===1?o.ravel[0]:p(o.shape.slice(1),o.ravel));else{const g=o.ravel.slice(0,u);s.push(o.shape.length===1?g[0]:p(o.shape.slice(1),g));for(let d=1;d<o.shape[0];d++){const N=o.ravel.slice(d*u,d*u+u);s.push(o.shape.length===1?N[0]:p(o.shape.slice(1),N));const m=c();if(m)return m}}};break}case a.SCAN:{l=()=>{const o=s.pop(),u=o.ravel.length/o.shape[0];if(o.shape[0]===0)s.push(p([0,...o.shape.slice(1)],[]));else if(o.shape[0]===1)s.push(p([1,...o.shape.slice(1)],o.ravel));else{let g=p(o.shape,[]);const d=o.ravel.slice(0,u);s.push(o.shape.length===1?d[0]:p(o.shape.slice(1),d)),g.ravel=g.ravel.concat(d);for(let N=1;N<o.shape[0];N++){const m=o.ravel.slice(N*u,N*u+u);s.push(o.shape.length===1?m[0]:p(o.shape.slice(1),m));const I=c();if(I)return I;g.ravel=g.ravel.concat(E(s[s.length-1])?s[s.length-1]:s[s.length-1].ravel)}s.pop(),s.push(g)}};break}case a.REPEAT:{l=()=>{const o=s.pop(),u=s.pop();s.push(H(g=>{s.push(u);for(let d=0;d<g;d++)c();return s.pop()},o))};break}case a.UNTIL:{l=()=>{let o=!1;for(;;){f();const u=JSON.parse(JSON.stringify(s[s.length-1]));if(o!==!1){const g=JSON.parse(JSON.stringify(s));s.push(o),c();let d=s.pop();if(s=g,d===1)break}o=u}};break}case a.IF:{l=()=>{const o=s.pop();let u=0;const g=JSON.parse(JSON.stringify(s));(E(o)?o:o.ravel[0])?c():f();const d=s.pop();u=g.length-s.length,s=g;for(let N=0;N<u;N++)s.pop();s.push(d)};break}default:return[!1,"bytecode error on '"+Object.keys(a).find(o=>a[o]===h)+"'"]}}const i=l();if(i)return i}t++,n[t]===a.ASSIGN&&(A[n[++t]]=s.pop(),s.push(JSON.parse(JSON.stringify(A[n[t]]))),t++)}}return T.length?[!1,"): Mismatched parenthesis"]:(A=e,s.map(he).join(`
`))}function he(n){if(typeof n=="object"){let e=[],t=1;for(let l=n.shape.length-1;l>=0;l--)t*=n.shape[l],e.push(t);let r="";n.ravel.length||(n.shape.length>1?r+="⍬["+n.shape+"]":r+="⍬");for(let l=0;l<n.ravel.length;l++){if(l!==0)for(let i of e)l%i===0&&(r+=`
`);r+=""+n.ravel[l]+(typeof n.ravel[l]=="string"?"":" ")}return r}else return""+n}function x(n){let e=B(n);if(e.length&&e[0]===!1){let l="error: "+e[1]+`

`,i=0;for(let h of n.split(`
`)){const c=i;if(i+=h.length+1,i>e[2]){l+=h+`
`,l+=" ".repeat(e[2]-c),l+=`↑ here
`;break}}return l}const t=Q(e);if(t.length&&t[0]===!1){let l="";for(let i=0;i<e.length&&e[i]!==`
`;i++)l+=e[i].length&&e[i][0]==="'"?e[i]+"'":e[i],l+=" ";return t[1]+`

... `+l+`
    ↑ here`}s=[],T=[];const r=S(t);return r.length&&r[0]===!1?r[1]:r}runresult.innerText=x(v.value);