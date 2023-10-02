/*

⊆≠⊃ (10 18 19) 2 'Keep this, lets remove this, and keep this also'
○⊃≠ (10 18 19) 2

*/

import './style.css'

const bar = document.getElementById("languagebar");
const text = document.getElementById("srcinput");

text.value = "⌽⊂⍒-⍨×2\\+¨=' '¨'gniroB egaugnaL detnemelpmI ylddO'";
text.addEventListener("keydown", e => {
  if(e.keyCode == 13 && e.shiftKey){
    runresult.innerText = execSource(text.value);
    e.preventDefault();
  }
}, false);

const glyphs = "⍬+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⌽⊖,#!⍳⍸&⍒⍋¨⍨⍩∵/\\∘⍤⍣⍥○()'";
const functions = "+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⌽⊖,#!⍳⍸&⍒⍋¨⍨⍩∵()";
const modifiers = "/\\∘⍤⍣⍥○";
const constants = "⍬1234567890";
const stackers = "¨⍨⍩∵()";
const info = {
  "⍬": "The empty array",
  "+": "Add\n2→1",
  "-": "Subtract\n2→1",
  "×": "Multiply\n2→1",
  "÷": "Divide\n2→1",
  "¯": "Negate\n1→1",
  "⌹": "Matrix inverse\n1→1",
  "*": "Exponent\n2→1",
  "⍟": "Logarithm\n2→1",
  "↑": "Maxmimum\n2→1",
  "↓": "Minimum\n2→1",
  "~": "Not\n1→1",
  "|": "Distance\n2→1",
  "⌈": "Ceiling\n2→1",
  "⌊": "Floor\n2→1",
  "%": "Mod\n2→1",
  "=": "Equals\n2→1",
  "≠": "Not equals\n2→1",
  "<": "Less\n2→1",
  "≤": "Less or equal\n2→1",
  "≥": "Greater or equal\n2→1",
  ">": "Greater\n2→1",
  "≡": "Match\n2→1",
  "≢": "Not match\n2→1",
  "⊃": "Replicate\n1→1",
  "⊂": "Index\n2→1",
  "⊆": "Keep\n2→1",
  "⊖": "Rotate\n2→1",
  "⌽": "Reverse\n1→1",
  ",": "Catenate\n2→1",
  "#": "Shape of\n1→1",
  "!": "Indices/Classify\n1→1",
  "⍳": "Indices-of\n2→1",
  "⍸": "Find sequence\n2→1",
  "&": "Take/drop\n2→1",
  "⍋": "Grade up\n1→1",
  "⍒": "Grade down\n1→1",
  "¨": "Dup\n1→2",
  "⍨": "Swap\n2→2",
  "⍩": "Roll\n3→3",
  "∵": "Pop\n1→0",

  "/": "Fold\n1F",
  "\\": "Scan\n1F",
  "⍤": "With-axes\n1F1",
  "⍣": "Repeat\n1F1",
  "∘": "Product\n1F1",
  "⍥": "Over\n1F",
  "○": "Under\n2F",
  "(": "Stack to array\n?→1\n(+Modifier delimiter)",
  ")": "Set array stack point\n0→0\n(+Modifier delimiter)",
  "'": "String",
}

const hl_class = g => stackers.includes(g) ? 'hi_k' : functions.includes(g) ? 'hi_f' : modifiers.includes(g) ? 'hi_m' : g[0] == "'" ? 'hi_s' : constants.includes(g) ? 'hi_c' : false;

function hl(s){
  const smap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  };
  const sanitize = s=>s.replace(/[&<>"'/]/ig, match=>smap[match]);

  s = s.split("'");
  s = s.map((v, i) => {
    if(i % 2 == 0){
      return v.replace(new RegExp([...functions, ...modifiers, ...constants].map(f=>f.match(/[0-9]/)?f:"\\"+f).join("|"), "g"), f=>"<span class=\"" + hl_class(f) + "\">" + sanitize(f) +"</span>");;
    } else if(i !== s.length - 1) {
      return "<span class='hi_s'>'" + v + "'</span>";
    } else {
      return "<span class='hi_s'>'" + v + "</span>";
    }
  }).join("");

  return s;
}

const highlight = document.getElementById("srcdisplay");
text.addEventListener("input", () => {
  highlight.innerHTML = hl(text.value);
});
highlight.innerHTML = hl(text.value);

function insertAtCursor(area, text) {
  if (document.selection) {
    area.focus();
    document.selection.createRange().text = myValue;
  } else if (area.selectionStart || area.selectionStart == '0') {
    const start = area.selectionStart;
    area.value = area.value.substring(0, start) + text + area.value.substring(area.selectionEnd, area.value.length);
    area.focus();
    area.selectionStart = start + text.length;
    area.selectionEnd = start + text.length;
  } else {
    area.value += text;
  }
}

for(let glyph of glyphs){
  const ng = document.createElement("button");
  ng.classList.add("glyphbutton");
  const hc = hl_class(glyph);
  if(hc) ng.classList.add(hc);
  ng.innerText = glyph;
  bar.appendChild(ng);

  const tt = document.createElement("div");
  tt.classList.add("glyphbuttontooltip");
  tt.innerText = info[glyph];
  ng.appendChild(tt);

  ng.addEventListener("click", e => {
    insertAtCursor(text, glyph);
    text.dispatchEvent(new CustomEvent("input"));
  }, false);
}

const run = document.getElementById("run");
run.addEventListener("click", e => {
  runresult.innerText = execSource(text.value);
}, false);

// exec

function lex(v){
  let tokens = [];
  for(let i = 0; i < v.length; i ++){
    let c = v[i];

    if(c == " ") continue;

    if(c == "'"){
      let str = "";
      do {
        str += c;
        c = v[++i];
        if(i >= v.length) break;
      } while (c != "'");
      tokens.push(str);
    }

    else if(c == "\n" || glyphs.includes(c)){
      tokens.push(c);
    }

    else if(c.match(/[a-z]/i)){
      let str = "";
      while(c.match(/[a-z]/i)){
        str += c;
        c = v[++i];
        if(i >= v.length) break;
      }
      i --;
      tokens.push(str);
    }

    else if(c.match(/[0-9]/)){
      let num = "";
      while(c.match(/[0-9]/)){
        num += c;
        c = v[++i];
        if(i >= v.length) break;
      }
      if(c == "."){
        num += c;
        c = v[++i];
        if(i < v.length) while(c.match(/[0-9]/)){
          num += c;
          c = v[++i];
          if(i >= v.length) break;
        }
      }
      i --;

      tokens.push(parseFloat(num));
    }

    else return [false, c, i];
  }

  return tokens;
}

const BC = [
  "CONST",
  "FUNCTION",

  "ADD",
  "NEGATE",
  "SUB",
  "MUL",
  "DIV",
  "EXP",
  "LOG",
  "MATINV",
  "ARROPEN",
  "ARRCLOSE",
  "MAX",
  "MIN",
  "NOT",
  "DISTANCE",
  "CEILING",
  "FLOOR",
  "MATCH",
  "NMATCH",
  "EQUAL",
  "NEQUAL",
  "LESS",
  "GREATER",
  "LESSEQ",
  "GREATEREQ",
  "INDEX",
  "KEEP",
  "REPLICATE",
  "ROTATE",
  "REVERSE",
  "CATENATE",
  "SHAPEOF",
  "INDICES",
  "INDICESOF",
  "FINDSEQ",
  "TAKEDROP",
  "GRADEUP",
  "GRADEDOWN",
  "DUP",
  "SWAP",
  "ROLL",
  "POP",

  "OPROD",
  "FOLD",
  "SCAN"
].map((k,i)=>({[k]:i+1})).reduce((a,b)=>({...a,...b}));

function formatBC(bc){
  let r = [];
  for(let i = 0; i < bc.length; i ++){ 
    r.push(Object.keys(BC).find(k=>BC[k] === bc[i]));
    if(bc[i] === BC.CONST) r.push(bc[++i]);
    else if(bc[i] === BC.FUNCTION) r.push(formatBC(bc[++i]));
  }
  return r;
}
function printBC(bc){
  console.log(formatBC(bc));
}

function parse(ts){
  let parse_index = 0;
  const bcr = [];

  let last_was_cpr = false;
  while(parse_index < ts.length){    
    const thists = ts[parse_index];

    if(typeof(thists) == 'number') {
      bcr.push(BC.CONST, thists);
    }

    else if(thists.length && thists[0] == "'"){
      bcr.push(BC.CONST, thists.length == 2 ? thists.slice(1) : [...thists.slice(1)]);
    }

    else if(thists == '⍬') {
      bcr.push(BC.CONST, []);
    }

    else if(typeof(thists) == 'string' && functions.includes(thists)) {
      const r = {
        "+": BC.ADD,
        "-": BC.SUB,
        "×": BC.MUL,
        "÷": BC.DIV,
        "*": BC.EXP,
        "⍟": BC.LOG,
        "⌹": BC.MATINV,
        "¯": BC.NEGATE,
        "↑": BC.MAX,
        "↓": BC.MIN,
        "~": BC.NOT,
        "|": BC.DISTANCE,
        "⌈": BC.CEILING,
        "⌊": BC.FLOOR,
        "%": BC.MOD,
        "=": BC.EQUAL,
        "≠": BC.NEQUAL,
        "<": BC.LESS,
        ">": BC.GREATER,
        "≤": BC.LESSEQ,
        "≥": BC.GREATEREQ,
        "≡": BC.MATCH,
        "≢": BC.NMATCH,
        "⊃": BC.REPLICATE,
        "⊂": BC.INDEX,
        "⊆": BC.KEEP,
        "⌽": BC.REVERSE,
        "⊖": BC.ROTATE,
        ",": BC.CATENATE,
        "#": BC.SHAPEOF,
        "!": BC.INDICES,
        "⍳": BC.INDICESOF,
        "⍸": BC.FINDSEQ,
        "&": BC.TAKEDROP,
        "⍋": BC.GRADEUP,
        "⍒": BC.GRADEDOWN,

        "(": BC.ARRCLOSE,
        ")": BC.ARROPEN,

        "¨": BC.DUP,
        "⍨": BC.SWAP,
        "⍩": BC.ROLL,
        "∵": BC.POP
      }[thists];
      if(r === undefined){
         return [false, "internalerror on '" + thists + "'"]; 
      } 
      bcr.push(r);

      if(r === BC.ARRCLOSE) { last_was_cpr = true; parse_index ++; continue; }
    } else if(typeof(thists) == 'string' && modifiers.includes(thists)) {
      if(last_was_cpr){
        bcr.pop();
        let parens = [];
        for(let i = 0; i < bcr.length; i ++){
          if(bcr[i] == BC.CONST) { i ++; continue; }
          if(bcr[i] == BC.ARROPEN) parens.push([')', i]);
          if(bcr[i] == BC.ARRCLOSE) parens.push(['(', i]);
        }
        let height = 1;
        let res;
        for(let i = parens.length - 1; i >= 0; i --){
          if(parens[i][0] == ')') height --;
          else height ++;

          if(height == 0) {
            res = parens[i][1];
            break;
          }
        }
        bcr.splice(res, 1);
        let fs = [];
        for(let i = 0, n = bcr.length - res; i < n; i ++){
          fs.push(bcr.pop());
        }
        bcr.push(BC.FUNCTION, fs.reverse());
      }

      const r = {
        "/": BC.FOLD,
        "\\": BC.SCAN,
        "∘": BC.OPROD
      }[thists];
      if(r === undefined){
         return [false, "internalerror on '" + thists + "'"]; 
      } 
      bcr.splice(bcr.length - 1 - +last_was_cpr, 0, r);
    }

    else return [false, "parse error on '" + thists + "'"];

    parse_index ++;
    last_was_cpr = false;
  }

  return bcr;
}

function matmul(m1, m2) {
  let res = [];
  for (let i = 0; i < m1.length; i++) {
    res[i] = [];
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m1[0].length; k++) {
          sum += m1[i][k] * m2[k][j];
      }
      res[i][j] = sum;
    }
  }
  return res;
}

function matrix_invert(M){
  if(!Array.isArray(M)) return 1/M;
  if(!M.length) return [];
  if(!Array.isArray(M[0])){
    let n = M.map(m=>m*m).reduce((a,b)=>a+b);
    return M.map(m=>m/n);
  }

  if(M[0].length != M.length || !M.every(v => v.length == M[0].length)) return [false, "⌹: Nonsquare matrix."];

  const n = M.length;
  const M0 = M;
  const I = [];
  const z = [];
  for(let i = 0; i < n; i ++){
    z.push(0);
  }
  for(let i = 0; i < n; i ++){
    I.push([...z]);
    I[i][i] = 1;
  }

  let inverse;
  function LV(iter){
    if(iter === 0) return [[1], I];
    let [cp, MP] = LV(iter-1);
    let X = matmul(M0, MP);
    let c = 0;
    for(let i = 0; i < n; i ++){
      c += X[i][i];
    }
    c /= -iter;
    let msum = [];
    for(let i = 0; i < n; i ++){
      msum.push([]);
      for(let j = 0; j < n; j ++){
        msum[i].push(X[i][j] + I[i][j] * c);
      }
    }
    if(iter == n - 1) inverse = msum;
    return [cp.concat(c), msum];
  }
  const cp = LV(n)[0];
  const cplast = cp[cp.length - 1];

  if(cplast === 0) return [false, "⌹: Domain error"];

  for(let i = 0; i < n; i ++){
    for(let j = 0; j < n; j ++){
      inverse[i][j] /= -cplast;
    }
  }

  return inverse;
}

function is_atomic(v){
  return typeof(v) == 'number' || typeof(v) == 'string';
}

function is_match(a, b){
  if(typeof(a) != typeof(b)) return 0;
  if(is_atomic(a)) return +(a == b);

  if(a.length != b.length) return 0;
  for(let i = 0; i < a.length; i ++){
    if(!is_match(a[i], b[i])) return 0;
  }
  return 1;
}

function pervade(f, a, b){
  if(typeof(a) != typeof(b)) {
    if(is_atomic(a)){
      let res = [];
      for(let i = 0; i < b.length; i ++){
        res.push(pervade(f, a, b[i]));
      }
      return res;
    } else {
      let res = [];
      for(let i = 0; i < a.length; i ++){
        res.push(pervade(f, a[i], b));
      }
      return res;
    }
  }

  if(is_atomic(a)) return f(a, b);

  if(a.length != b.length) return undefined;
  let res = [];
  for(let i = 0; i < a.length; i ++){
    res.push(pervade(f, a[i], b[i]));
  }
  return res;
}

function mpervade(f, a){
  if(is_atomic(a)) return f(a);

  let res = [];
  for(let i = 0; i < a.length; i ++){
    res.push(mpervade(f, a[i]));
  }
  return res;
}

let stack = [];
let array_stack = [];
function apply_f(f){
  switch(f){
    case BC.ADD: {
      let a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>a+b,stack[l],a);
      if(r === undefined) return [false, "+: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.SUB: {
      let a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>a-b,stack[l],a);
      if(r === undefined) return [false, "-: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.NEGATE: {
      let l = stack.length - 1;
      stack[l] = mpervade(a=>-a,stack[l]);
      break;
    }
    case BC.MUL: {
      let a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>a*b,stack[l],a);
      if(r === undefined) return [false, "×: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.DIV: {
      let a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>a/b,stack[l],a);
      if(r === undefined) return [false, "÷: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.EXP: {
      let a = stack.pop();
      let l = stack.length - 1;
      let r = pervade(Math.pow,stack[l],a);
      if(r === undefined) return [false, "*: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.LOG: {
      let a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>Math.log(a) / Math.log(b),stack[l],a);
      if(r === undefined) return [false, "⍟: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.MATINV: {
      let l = stack.length - 1;
      const r = matrix_invert(stack[l]);
      if(r.length && r[0] === false) return r;
      stack[l] = r;
      break;
    }
    case BC.ARROPEN: {
      array_stack.push(stack.length);
      break;
    }
    case BC.ARRCLOSE: {
      const top = array_stack.pop();
      const l = stack.length;
      let res = [];
      for(let i = 0; i < l - top; i ++){
        res.push(stack.pop());
      }
      stack.push(res);
      break;
    }
    case BC.MAX: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade(Math.max,stack[l],a);
      if(r === undefined) return [false, "↑: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.MIN: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade(Math.min,stack[l],a);
      if(r === undefined) return [false, "↑: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.NOT: {
      let l = stack.length - 1;
      stack[l] = mpervade(a=>+!a, stack[l]);
      break;
    }
    case BC.DISTANCE: {
      const a = stack.pop();
      const b = stack.pop();
      if(a.length != b.length) return [false, '|: Length error'];
      let sum = 0;
      for(let i = 0; i < a.length; i ++){
        const l = a[i];
        const r = b[i];
        if(!is_atomic(l) || !is_atomic(r)) return [false, '|: Rank error'];

        sum += Math.pow(r - l, 2);
      }
      stack.push(Math.sqrt(sum));
      break;
    }
    case BC.CEILING: {
      let l = stack.length - 1;
      stack[l] = mpervade(Math.ceil, stack[l]);
      break;
    }
    case BC.FLOOR: {
      let l = stack.length - 1;
      stack[l] = mpervade(Math.floor, stack[l]);
      break;
    }
    case BC.MOD: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>((a % b) + b) % b,stack[l],a);
      if(r === undefined) return [false, "%: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.MATCH: {
      const a = stack.pop();
      let l = stack.length - 1;
      stack[l] = is_match(stack[l], a);
      break;
    }
    case BC.NMATCH: {
      const a = stack.pop();
      let l = stack.length - 1;
      stack[l] = +!is_match(stack[l], a);
      break;
    }
    case BC.EQUAL: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>+(a===b),stack[l],a);
      if(r === undefined) return [false, "=: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.NEQUAL: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>+(a!==b),stack[l],a);
      if(r === undefined) return [false, "≠: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.LESS: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>+(a<b),stack[l],a);
      if(r === undefined) return [false, "<: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.GREATER: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>+(a>b),stack[l],a);
      if(r === undefined) return [false, ">: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.LESSEQ: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>+(a<=b),stack[l],a);
      if(r === undefined) return [false, "≤: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.GREATEREQ: {
      const a = stack.pop();
      let l = stack.length - 1;
      let r = pervade((a,b)=>+(a>=b),stack[l],a);
      if(r === undefined) return [false, "≥: Shape mismatch"];
      stack[l] = r;
      break;
    }
    case BC.INDEX: {
      const a = stack.pop();
      let l = stack.length - 1;
      stack[l] = mpervade(a=>stack[l][a-1],a);
      break;
    }
    case BC.REPLICATE: {
      let indices = stack.pop();

      if(is_atomic(indices)) indices = [indices];

      let result = [];
      for(let i = 0; i < indices.length; i ++){
        for(let j = 0; j < indices[i]; j ++){
          result.push(i+1);
        }
      }
      stack.push(result);
      break;
    }
    case BC.KEEP: {
      let indices = stack.pop();
      const array = stack.pop();
      if(is_atomic(indices)) indices = [indices];

      let result = [];
      for(let i = 0; i < indices.length; i ++){
        if(indices[i]){
          result.push(array[i]);
        }
      }
      stack.push(result);
      break;
    }
    case BC.ROTATE: {
      const a = stack.pop();
      let l = stack.length - 1;
      if(a > 0){
        for(let i = 0; i < a; i ++){
          stack[l].push(stack[l].shift());
        }
      } else {
        for(let i = 0; i < -a; i ++){
          stack[l].unshift(stack[l].pop());
        }
      }
      break;
    }
    case BC.REVERSE: {
      let l = stack.length - 1;
      let tl = stack[l].length;
      for(let i = 0; i < tl / 2; i ++){
        let tmp = stack[l][i];
        stack[l][i] = stack[l][tl - i - 1];
        stack[l][tl - i - 1] = tmp;
      }
      break;
    }
    case BC.CATENATE: {
      let a = stack.pop();
      let l = stack.length-1;
      if(is_atomic(a)) a = [a];
      if(is_atomic(stack[l])) stack[l] = [...a, stack[l]];
      else stack[l] = a.concat(stack[l]);
      break; 
    }
    // todo: full shape?
    case BC.SHAPEOF: {
      let l = stack.length-1;
      if(is_atomic(stack[l])) stack[l] = 1;
      else stack[l] = stack[l].length;
      break;
    }
    case BC.INDICES: {
      const a = stack.pop();
      let r = [];
      if(is_atomic(a)){
        for(let i = 0; i < a; i ++){
          r.push(i+1);
        }
      } else {
        let exists = [];
        for(let i = 0; i < a.length; i ++){
          const f = exists.findIndex(x=>is_match(a[i], x));
          if(f < 0){
            exists.push(a[i]);
            r.push(exists.length);
          } else r.push(f+1);
        }
      }
      stack.push(r);
      break;
    }
    case BC.INDICESOF: {
      let a = stack.pop();
      let b = stack.pop();
      if(is_atomic(b)) b = [b];
      if(is_atomic(a)) a = [a];

      let r = [];
      let upto = [];
      for(let i = 0; i < b.length; i ++){
        upto.push(b[i]);

        if(upto.length > a.length) upto.shift();
        if(is_match(upto, a)){
          r.push(i - a.length + 2);
        }
      }
      stack.push(r);
      break;
    }
    case BC.FINDSEQ: {
      let a = stack.pop();
      let b = stack.pop();
      if(is_atomic(b)) b = [b];
      if(is_atomic(a)) a = [a];

      let r = [];
      let upto = [];
      for(let i = 0; i < b.length; i ++){
        upto.push(b[i]);
        r.push(0);

        if(upto.length > a.length) upto.shift();
        if(is_match(upto, a)){
          r[i - a.length + 1] = 1;
        }
      }
      stack.push(r);
      break;
    }
    case BC.TAKEDROP: {
      let a = stack.pop();
      let l = stack.length-1;
      if(is_atomic(stack[l])) stack[l] = [stack[l]];
      if(a < 0) {
        stack[l] = stack[l].slice(0, stack[l].length + a);
      } else {
        stack[l] = stack[l].slice(0, a);
      }
      break;
    }
    case BC.GRADEUP: {
      let a = stack.pop();
      let r = [];
      for (let i = 0; i < a.length; i++) {
        a[i] = [a[i], i];
      }
      a.sort(function(a, b) {
        return a[0] < b[0] ? -1 : 1;
      });
      stack.push(a.map(a=>a[1]+1));
      break;
    }
    case BC.GRADEDOWN: {
      let a = stack.pop();
      let r = [];
      for (let i = 0; i < a.length; i++) {
        a[i] = [a[i], i];
      }
      a.sort(function(a, b) {
        return a[0] > b[0] ? -1 : 1;
      });
      stack.push(a.map(a=>a[1]+1));
      break;
    }
    case BC.DUP: {
      stack.push(JSON.parse(JSON.stringify(stack[stack.length - 1])));
      break;
    }
    case BC.SWAP: {
      const a = stack.pop();
      const b = stack.pop();
      stack.push(a);
      stack.push(b);
      break;
    }
    case BC.ROLL: {
      const a = stack.pop();
      const b = stack.pop();
      const c = stack.pop();
      stack.push(a);
      stack.push(c);
      stack.push(b);
      break;      
    }
    case BC.POP: {
      stack.pop();
      break;
    }

    default:
      return [false, "bytecode error on '" + Object.keys(BC).find(k => BC[k] === f) + "'"];
  }
}

function vm(bc){
  //printBC(bc);
  let pc = 0;
  while(pc < bc.length){
    let modifier_stack = [];

    while(pc < bc.length && bc[pc] == BC.CONST){
      stack.push(bc[++pc]);
      pc ++;
    }

    while(pc < bc.length && [BC.FOLD, BC.SCAN, BC.OPROD].includes(bc[pc])){
      modifier_stack.push(bc[pc++]);
    }

    if(pc >= bc.length) continue;

    if(modifier_stack.length == 0) {
      const r = apply_f(bc[pc]);
      if(r) return r;
    } else {
      let to_f;
      if(bc[pc] === BC.FUNCTION){
        pc++;
        to_f = () => {
          const r = vm(bc[pc]);
          if(r.length && r[0] === false) return r;
        };
      }
      else {
        to_f = () => {
          const r = apply_f(bc[pc]);
          if(r) return r;
        };
      }
      while(modifier_stack.length > 0){
        const pm = modifier_stack.pop();
        const old_f = to_f;
        switch(pm){
          case BC.FOLD: {
            to_f = () => {
              const array = stack.pop();
              if(array.length == 0) stack.push(0);
              else if(array.length == 1) stack.push(array[0]);

              else {
                stack.push(array.shift());
                while(array.length > 0){
                  stack.push(array.shift());
                  const r = old_f();
                  if(r) return r;
                }
              }
            };
            break;
          }

          case BC.SCAN: {
            to_f = () => {
              const array = stack.pop();
              if(array.length == 0) stack.push([]);
              else if(array.length == 1) stack.push([array[0]]);

              else {
                let res = [];
                res.push(array[0]);
                stack.push(array.shift());
                while(array.length > 0){
                  stack.push(array.shift());
                  const r = old_f();
                  if(r) return r;
                  res.push(stack[stack.length - 1]);
                }
                stack.pop();
                stack.push(res);
              }
            };
            break;
          }

          // todo: actual nth product?
          case BC.OPROD: {
            to_f = () => {
              // todo: actual arity check
              if(stack.length == 1){
                let res = [];
                let a = stack.pop();
                for(let i = 0; i < a.length; i ++){
                  stack.push(a[i]);

                  const r = old_f();
                  if(r) return r;

                  res.push(stack.pop());
                }
                stack.push(res);
                return;
              }

              let a = stack.pop();
              let b = stack.pop();
              let res = [];

              let consta = false;
              let constb = false;
              if(is_atomic(a)) { a = [a]; consta = true; }
              if(is_atomic(b)) { b = [b]; constb = true; }
              // todo: maybe not?

              for(let i = 0; i < a.length; i ++){
                res.push([]);
                for(let j = 0; j < b.length; j ++){
                  stack.push(b[j]);
                  stack.push(a[i]);

                  const r = old_f();
                  if(r) return r;

                  res[i].push(stack.pop());
                }
                if(constb) res = res.concat(res.pop());
              }
              if(consta) res = res[0];
              stack.push(res);
            };
            break;
          }

          default:
            return [false, "bytecode error on '" + pm + "'"];
        }
      }

      const r = to_f();
      if(r) return r;
    }
    
    pc ++;
  }

  return stack.map(Stringify).join("\n");
}

function Stringify(v){
  if(Array.isArray(v)) {
    return "(" + v.map(e => Stringify(e)).join(" ") + ")";
  }
  else return v;
}

function execSource(v){
  let tokens = lex(v);
  if(tokens.length && tokens[0] === false){
    let string = "error: unknown token " + tokens[1] + "\n\n";

    let index = 0;
    for(let line of v.split("\n")){
      const oldindex = index;
      index += line.length + 1;

      if(index > tokens[2]){
        string += line + '\n';
        string += ' '.repeat(tokens[2]-oldindex);
        string += '↑ here\n';
        break;
      }
    }

    return string;
  }
  if(tokens[tokens.length - 1] !== "\n") tokens.push("\n");

  let result = [];
  let temp = [];
  tokens.map(x => {  
    if(x !== "\n") {
      temp.push(x);
    } else {
      result.push(temp);
      temp = [];
    }
  });
  tokens = result.map(r => r.reverse()).flat();
  const parsed = parse(tokens);

  if(parsed.length && parsed[0] === false) return parsed[1];

  stack = [];
  array_stack = [];
  const res = vm(parsed);
  if(res.length && res[0] === false) return res[1];
  return res;
}

runresult.innerText = execSource(text.value);