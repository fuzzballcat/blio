import './style.css'

const bar = document.getElementById("languagebar");
const text = document.getElementById("srcinput");

text.value = "⌽⊂⍒-⍨×2\\+¨=' '¨',oN s\\'ereht on gninaem ot eht .eman'";
text.addEventListener("keydown", e => {
  if(e.keyCode == 13 && e.shiftKey){
    runresult.innerText = execSource(text.value);
    e.preventDefault();
  }
}, false);

const glyphs = "⍬+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⍳⍸⍒⍋⌽⊖&,#!¨⍨⍩∵/\\()'";
const functions = "+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⍳⍸⍒⍋⌽⊖&,#!¨⍨⍩∵()";
const modifiers = "/\\";
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
  "(": "Stack to array\n?→1\n(+Modifier delimiter)",
  ")": "Set array stack point\n0→0\n(+Modifier delimiter)",
  "'": "String",
}

const hl_class = g => stackers.includes(g) ? 'hi_k' : functions.includes(g) ? 'hi_f' : modifiers.includes(g) ? 'hi_m' : g[0] == "'" ? 'hi_s' : constants.includes(g) ? 'hi_c' : g[0] === "\\" ? 'hi_e' : false;

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

  s = s.split(/(?<=(?<!\\)(?:\\\\)*)\'/);
  s = s.map((v, i) => {
    if(i % 2 == 0){
      return v.replace(new RegExp([...functions, ...modifiers, ...constants].map(f=>f.match(/[0-9]/)?f:"\\"+f).join("|"), "g"), f=>"<span class=\"" + hl_class(f) + "\">" + sanitize(f) +"</span>");
    } else if(i !== s.length - 1) {
      return "<span class='hi_s'>'" + v.split(/(\\.)/g).map(c => c.length == 2 && c[0] == "\\" ? "<span class='hi_e'>" + sanitize(c) + "</span>" : c).join("") + "'</span>";
    } else {
      return "<span class='hi_s'>'" + sanitize(v) + "</span>";
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
        if(c == '\\'){
          c = v[++i];
        }
        str += c;
        c = v[++i];
        if(i >= v.length) return [false, 'Expected string terminator', i];
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

    else return [false, 'Unknown token ' + c, i];
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
  "MOD",
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

function array(sh, v){
  return {shape: sh, ravel: v};
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
      bcr.push(BC.CONST, thists.length == 2 ? thists.slice(1) : array([thists.length - 1], [...thists.slice(1)]));
    }

    else if(thists == '⍬') {
      bcr.push(BC.CONST, array([0], []));
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
        "\\": BC.SCAN
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

// TODO: Flat array

function matmul(m1, m2, n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
          sum += m1[i * n + k] * m2[k * n + j];
      }
      res.push(sum);
    }
  }
  return res;
}

function matrix_invert(M){
  if(is_atomic(M)) return 1/M;

  if(M.shape.length === 1){
    let n = M.ravel.map(m=>m*m).reduce((a,b)=>a+b, 0);
    return M.map(m => m / n);
  }

  if(M.shape.length > 2 || M.shape[0] !== M.shape[1]){
    return [false, '⌹: Shape error'];
  }

  const n = M.shape[0];

  const M0 = M.ravel;
  const I = [];
  for(let i = 0; i < n * n; i ++){
    I.push(+(i % (n + 1) === 0));
  }

  let inverse;
  function LV(iter){
    if(iter === 0) return [[1], I];
    let [cp, MP] = LV(iter-1);
    let X = matmul(M0, MP, n);
    let c = 0;
    for(let i = 0; i < n; i ++){
      c += X[i * n + i];
    }
    c /= -iter;
    let msum = [];
    for(let i = 0; i < n; i ++){
      for(let j = 0; j < n; j ++){
        msum.push(X[i * n + j] + I[i * n + j] * c);
      }
    }
    if(iter == n - 1) inverse = msum;
    return [cp.concat(c), msum];
  }
  const cp = LV(n)[0];
  const cplast = cp[cp.length - 1];

  if(cplast === 0) return [false, "⌹: Domain error"];

  for(let i = 0; i < n * n; i ++){
    inverse[i] /= -cplast;
  }

  return array([n, n], inverse);
}

function is_atomic(v){
  return typeof(v) == 'number' || typeof(v) == 'string';
}

function is_match(a, b){
  if(typeof(a) != typeof(b)) return 0;
  if(is_atomic(a)) return +(a === b);

  if(a.shape.length != b.shape.length) return 0;
  for(let i = 0; i < a.shape.length; i ++){
    if(a.shape[i] !== b.shape[i]) return 0;
  }

  if(a.ravel.length != b.ravel.length) return 0;
  for(let i = 0; i < a.ravel.length; i ++){
    if(!is_match(a.ravel[i], b.ravel[i])) return 0;
  }
  return 1;
}

function pervade(f, a, b){
  const aatom = is_atomic(a),
        batom = is_atomic(b);

  if(aatom && batom) return f(a, b);

  if(aatom){
    let res = [];
    for(let i = 0; i < b.ravel.length; i ++){
      res.push(f(a, b.ravel[i]));
    }
    return array(b.shape, res);
  } 

  if(batom){
    let res = [];
    for(let i = 0; i < a.ravel.length; i ++){
      res.push(f(a.ravel[i], b));
    }
    return array(a.shape, res);
  }

  const mshl = Math.min(a.shape.length, b.shape.length);
  let pm = true;
  for(let i = 0; i < mshl; i ++){
    if(a.shape[i] != b.shape[i]) {
      pm = false;
      break;
    }
  }
  if(!pm) return undefined;

  if(a.shape.length > b.shape.length){
    const atrail = a.shape.slice(mshl).reduce((a,b)=>a*b, 1);

    let res = [];
    for(let i = 0; i < b.ravel.length; i ++){
      const be = b.ravel[i];
      for(let j = 0; j < atrail; j ++){
        res.push(f(a.ravel[i * atrail + j], be));
      }
    }
    return array(a.shape, res);
  } else {
    const btrail = b.shape.slice(mshl).reduce((a,b)=>a*b, 1);

    let res = [];
    for(let i = 0; i < a.ravel.length; i ++){
      const ae = a.ravel[i];
      for(let j = 0; j < btrail; j ++){
        res.push(f(ae, b.ravel[i * btrail + j]));
      }
    }
    return array(b.shape, res);
  }
}

function mpervade(f, a){
  if(is_atomic(a)) return f(a);

  let res = [];
  for(let i = 0; i < a.ravel.length; i ++){
    res.push(f(a.ravel[i]));
  }
  return array(a.shape, res);
}

let stack = [];
let array_stack = [];

const dyadic_ariths = [BC.ADD, BC.SUB, BC.MUL, BC.DIV, BC.EXP, BC.LOG, BC.MAX, BC.MIN, BC.MOD, BC.EQUAL, BC.NEQUAL, BC.LESS, BC.GREATER, BC.LESSEQ, BC.GREATEREQ];
const darith_to_fname = ["+", "-", "×", "÷", "*", "⍟", "↑", "↓", "%", "=", "≠"];
const darith_fns = [(a,b)=>a+b, (a,b)=>a-b, (a,b)=>a*b, (a,b)=>a/b, Math.pow, (a,b)=>Math.log(a) / Math.log(b), Math.max, Math.min, (a,b)=>((a % b) + b) % b, (a,b)=>+(a === b), (a,b)=>+(a !== b), (a,b)=>+(a<b), (a,b)=>+(a>b), (a,b)=>+(a<=b), (a,b)=>+(a>=b)];
function dyadic_arith(f){
  const i = dyadic_ariths.indexOf(f);
  let a = stack.pop();
  if(a === undefined) return [false, darith_to_fname[i] + ': Expected a value'];
  let l = stack.length - 1;
  if(l < 0) return [false, darith_to_fname[i] + ': Expected another value'];

  let r = pervade(darith_fns[i],stack[l],a);
  if(r === undefined)  return [false, darith_to_fname[i] + ': Shape mismatch'];
  stack[l] = r;
}

const monadic_ariths = [BC.NEGATE, BC.NOT, BC.CEILING, BC.FLOOR];
const marith_to_fname = ["¯", "~", "⌈", "⌊"];
const marith_fns = [a=>-a, a=>+!a, Math.ceil, Math.floor];
function monadic_arith(f){
  const i = monadic_ariths.indexOf(f);

  let l = stack.length - 1;
  if(l < 0) return [false, marith_to_fname[i] + ': Expected a value'];
  stack[l] = mpervade(marith_fns[i], stack[l]);
}

function apply_f(f){
  switch(f){
    case BC.NEGATE:
    case BC.NOT:
    case BC.CEILING:
    case BC.FLOOR: {
      const r = monadic_arith(f);
      if(r) return r;
      break;
    }

    case BC.ADD: 
    case BC.SUB: 
    case BC.MUL:
    case BC.DIV:
    case BC.EXP:
    case BC.LOG:
    case BC.MAX:
    case BC.MIN: 
    case BC.MOD:
    case BC.EQUAL:
    case BC.NEQUAL:
    case BC.LESS:
    case BC.GREATER:
    case BC.LESSEQ:
    case BC.GREATEREQ: {
      const r = dyadic_arith(f);
      if(r) return r;
      break;
    }

    case BC.MATINV: {
      let l = stack.length - 1;
      if(l < 0) return [false, "⌹: Expected a value"];
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
      if(!array_stack.length) return [false, "(: Mismatched parenthesis"];
      const top = array_stack.pop();
      const l = stack.length;
      let res = array([], []);
      let trailing = false;
      for(let i = 0; i < l - top; i ++){
        const e = stack.pop();
        let shape;
        if(is_atomic(e)) {
          res.ravel.push(e);
          shape = [];
        } else {
          res.ravel = res.ravel.concat(e.ravel);
          shape = e.shape;
        }
        if(trailing === false) trailing = shape;
        else if(trailing.length !== shape.length ||
        !trailing.every((val, index) => val === shape[index])) return [false, "(): Shape mismatch"];
      }
      res.shape.push(l - top);
      res.shape = res.shape.concat(trailing ? trailing : []);
      stack.push(res);
      break;
    }

    case BC.DISTANCE: {
      const a = stack.pop();
      const b = stack.pop();
      if(is_atomic(a) && is_atomic(b)) return Math.abs(a - b);
      if(typeof(a) != typeof(b)) return [false, '|: Rank error'];

      if(a.ravel.length != b.ravel.length) return [false, '|: Length error'];
      let sum = 0;
      for(let i = 0; i < a.ravel.length; i ++){
        const l = a.ravel[i];
        const r = b.ravel[i];

        sum += Math.pow(r - l, 2);
      }
      stack.push(Math.sqrt(sum));
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
    
    case BC.INDEX: {
      const a = stack.pop();
      let l = stack.length - 1;

      const per = stack[l].ravel.length / stack[l].shape[0];

      if(is_atomic(a)){
        const st = (a-1) * per;
        stack[l] = array(stack[l].shape.slice(1), stack[l].ravel.slice(st, st + per));
        break;
      }

      let ravel = [];
      for(let i = 0; i < a.ravel.length; i ++){
        const st = (a.ravel[i]-1) * per;
        ravel = ravel.concat(stack[l].ravel.slice(st, st + per));
      }
      stack[l] = array(a.shape.concat(stack[l].shape.slice(1)), ravel);
      break;
    }
    case BC.REPLICATE: {
      let indices = stack.pop();

      if(is_atomic(indices)) indices = array([1], [indices]);

      if(indices.shape.length > 1) return [false, "⊃: Rank error"];

      let result = [];
      for(let i = 0; i < indices.ravel.length; i ++){
        for(let j = 0; j < indices.ravel[i]; j ++){
          result.push(i+1);
        }
      }
      stack.push(array([result.length], result));
      break;
    }
    case BC.KEEP: {
      let indices = stack.pop();
      const arr = stack.pop();

      if(is_atomic(arr) && is_atomic(indices)) {
        if(indices) stack.push(array([1], [arr]));
        else stack.push(array([0], []));
        break;
      }

      if(typeof(arr) != typeof(indices)) return [false, '⊆: Rank mismatch'];
      if(indices.ravel.length != arr.shape[0]) return [false, '⊆: Length mismatch'];

      let result = [];
      let klen = 0;
      let leadingper = arr.ravel.length / arr.shape[0];
      for(let i = 0; i < indices.ravel.length; i ++){
        if(indices.ravel[i]){
          result = result.concat(arr.ravel.slice(i * leadingper, i * leadingper + leadingper));
          klen ++;
        }
      }
      stack.push(array([klen, ...arr.shape.slice(1)], result));
      break;
    }
    case BC.ROTATE: {
      const a = stack.pop();
      let l = stack.length - 1;
      const per = stack[l].ravel.length / stack[l].shape[0];
      if(a > 0){
        for(let i = 0; i < a; i ++){
          const rr = stack[l].ravel.splice(0, per);
          stack[l].ravel = stack[l].ravel.concat(rr);
        }
      } else {
        for(let i = 0; i < -a; i ++){
          const rr = stack[l].ravel.splice(stack[l].ravel.length - per, per);
          stack[l].ravel = rr.concat(stack[l].ravel);
        }
      }
      break;
    }
    case BC.REVERSE: {
      let l = stack.length - 1;
      const tl = stack[l].shape[0];
      const per = stack[l].ravel.length / tl;
      for(let i = 0; i < tl / 2; i ++){
        let tmp = stack[l].ravel.slice(i * per, i * per + per);
        const bi = tl - i - 1;
        stack[l].ravel.splice(i * per, per, ...stack[l].ravel.slice(bi * per, bi * per + per));
        stack[l].ravel.splice(bi * per, per, ...tmp);
      }
      break;
    }
    case BC.CATENATE: {
      let a = stack.pop();
      let l = stack.length-1;
      if(is_atomic(a)) a = array([1], [a]);
      if(is_atomic(stack[l])) stack[l] = array([1], stack[l]);
      
      if(stack[l].shape.length === a.shape.length) {
        for(let i = 1; i < stack[l].shape.length; i ++){
          if(stack[l].shape[i] !== a.shape[i]) return [false, ",: Shape mismatch"];
        }
        stack[l].shape[0] += a.shape[0];
      } else if(stack[l].shape.length === a.shape.length + 1) {
        for(let i = 1; i < stack[l].shape.length; i ++){
          if(stack[l].shape[i] !== a.shape[i - 1]) return [false, ",: Shape mismatch"];
        }
        stack[l].shape[0] ++;
      } else if(a.shape.length === stack[l].shape.length + 1) {
        for(let i = 1; i < a.shape.length; i ++){
          if(a.shape[i] !== stack[l].shape[i - 1]) return [false, ",: Shape mismatch"];
        }
        stack[l].shape = a.shape;
        stack[l].shape[0] ++;
      } else return [false, ",: Shape mismatch"];

      stack[l].ravel = a.ravel.concat(stack[l].ravel);
      break; 
    }
    case BC.SHAPEOF: {
      let l = stack.length-1;
      if(is_atomic(stack[l])) stack[l] = array([0], []);
      else stack[l] = array([stack[l].shape.length], stack[l].shape);
      break;
    }
    case BC.INDICES: {
      const a = stack.pop();
      let r = [];
      if(is_atomic(a)){
        for(let i = 0; i < a; i ++){
          r.push(i+1);
        }
        stack.push(array([r.length], r));
      } else {
        let exists = [];
        for(let i = 0; i < a.ravel.length; i ++){
          const f = exists.findIndex(x=>is_match(a.ravel[i], x));
          if(f < 0){
            exists.push(a.ravel[i]);
            r.push(exists.length);
          } else r.push(f+1);
        }
        stack.push(array(a.shape, r));
      }
      break;
    }
    case BC.INDICESOF: {
      let a = stack.pop();
      let b = stack.pop();
      if(is_atomic(b)) b = array([1], [b]);
      if(is_atomic(a)) a = array([1], [a]);

      if(a.shape.length !== b.shape.length) return [false, '⍳: Rank error'];
      for(let i = 1; i < b.shape.length; i ++){
        if(a.shape[i] !== b.shape[i]) return [false, '⍳: Rank error'];
      }

      let r = array([0], []);
      let upto = array([0, ...b.shape.slice(1)], []);
      const per = b.ravel.length / b.shape[0];
      for(let i = 0; i < b.shape[0]; i ++){
        upto.ravel = upto.ravel.concat(b.ravel.slice(i * per, i * per + per));
        upto.shape[0] ++;

        if(upto.shape[0] > a.shape[0]) {
          upto.ravel.splice(0, per);
          upto.shape[0] --;
        }

        if(is_match(upto, a)){
          r.ravel.push(i - a.shape[0] + 2);
          r.shape[0] ++;
        }
      }
      stack.push(r);
      break;
    }
    case BC.FINDSEQ: {
      let a = stack.pop();
      let b = stack.pop();
      if(is_atomic(b)) b = array([1], [b]);
      if(is_atomic(a)) a = array([1], [a]);

      let r = array([0], []);
      let upto = array([0, ...b.shape.slice(1)], []);
      const per = b.ravel.length / b.shape[0];
      for(let i = 0; i < b.shape[0]; i ++){
        upto.ravel = upto.ravel.concat(b.ravel.slice(i * per, i * per + per));
        upto.shape[0] ++;

        r.ravel.push(0);
        r.shape[0] ++;

        if(upto.shape[0] > a.shape[0]) {
          upto.ravel.splice(0, per);
          upto.shape[0] --;
        }

        if(is_match(upto, a)){
          r.ravel[i - a.shape[0] + 1] = 1;
        }
      }
      stack.push(r);
      break;
    }
    case BC.TAKEDROP: {
      let a = stack.pop();
      let l = stack.length-1;
      if(is_atomic(stack[l])) stack[l] = array([1], [stack[l]]);
      
      if(a < 0) {
        stack[l].ravel = stack[l].ravel.slice(-a * stack[l].ravel.length / stack[l].shape[0], stack[l].ravel.length);
        stack[l].shape[0] -= a;
      } else {
        stack[l].ravel = stack[l].ravel.slice(0, a * stack[l].ravel.length / stack[l].shape[0]);
        stack[l].shape[0] = a;
      }
      break;
    }
    case BC.GRADEUP: {
      let a_full = stack.pop();
      let r = [];
      let a = a_full.ravel;
      for (let i = 0; i < a.length; i++) {
        a[i] = [a[i], i];
      }
      a.sort(function(a, b) {
        return a[0] < b[0] ? -1 : 1;
      });
      stack.push(array(a_full.shape, a.map(a=>a[1]+1)));
      break;
    }
    case BC.GRADEDOWN: {
      let a_full = stack.pop();
      let r = [];
      let a = a_full.ravel;
      for (let i = 0; i < a.length; i++) {
        a[i] = [a[i], i];
      }
      a.sort(function(a, b) {
        return a[0] > b[0] ? -1 : 1;
      });
      stack.push(array(a_full.shape, a.map(a=>a[1]+1)));
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

    while(pc < bc.length && [BC.FOLD, BC.SCAN].includes(bc[pc])){
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
              const arr = stack.pop();

              const per = arr.ravel.length / arr.shape[0];

              if(arr.shape[0] == 0) stack.push(array(arr.shape.slice(1), new Array(arr.shape.slice(1).reduce((a,b)=>a*b, 1)).fill().map(_=>0)));
              else if(arr.shape[0] == 1) stack.push(arr.shape.length == 1 ? arr.ravel[0] : array(arr.shape.slice(1), arr.ravel));

              else {
                const z = arr.ravel.slice(0, per);
                stack.push(arr.shape.length == 1 ? z[0] : array(arr.shape.slice(1), z));
                for(let i = 1; i < arr.shape[0]; i ++){
                  const z = arr.ravel.slice(i * per, i * per + per);
                  stack.push(arr.shape.length == 1 ? z[0] : array(arr.shape.slice(1), z));

                  const r = old_f();
                  if(r) return r;
                }
              }
            };
            break;
          }

          case BC.SCAN: {
            to_f = () => {
              const arr = stack.pop();

              const per = arr.ravel.length / arr.shape[0];

              if(arr.shape[0] == 0) stack.push(array([0, ...arr.shape.slice(1)], []));
              else if(arr.shape[0] == 1) stack.push(array([1, ...arr.shape.slice(1)], arr.ravel));

              else {
                let result = array(arr.shape, []);
                const z = arr.ravel.slice(0, per);
                stack.push(arr.shape.length == 1 ? z[0] : array(arr.shape.slice(1), z));
                result.ravel = result.ravel.concat(z);
                for(let i = 1; i < arr.shape[0]; i ++){
                  const z = arr.ravel.slice(i * per, i * per + per);
                  stack.push(arr.shape.length == 1 ? z[0] : array(arr.shape.slice(1), z));

                  const r = old_f();
                  if(r) return r;
                  result.ravel = result.ravel.concat(is_atomic(stack[stack.length - 1]) ? stack[stack.length - 1] : stack[stack.length - 1].ravel);
                }
                stack.pop();
                stack.push(result);
              }
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

  if(array_stack.length) return [false, '): Mismatched parenthesis'];

  return stack.map(Stringify).join("\n");
}

function Stringify(v){
  if(typeof(v) === 'object') {
    let scanshape = [];
    let prev = 1;
    for(let i = v.shape.length - 1; i >= 0; i --){
      prev *= v.shape[i];
      scanshape.push(prev);
    }
    let r = "";
    if(!v.ravel.length) {
      if(v.shape.length > 1) r += '⍬[' + v.shape + ']';  // todo: actual format
      else r += '⍬';
    }
    for(let i = 0; i < v.ravel.length; i ++){
      if(i !== 0){
        for(let s of scanshape){
          if(i % s === 0) r += "\n";
        }
      }

      r += ''+v.ravel[i] + (typeof(v.ravel[i]) === 'string' ? "" : " ");
    }
    return r;
  }
  else return ''+v;
}

function execSource(v){
  let tokens = lex(v);
  if(tokens.length && tokens[0] === false){
    let string = "error: " + tokens[1] + "\n\n";

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