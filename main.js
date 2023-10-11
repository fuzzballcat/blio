import './style.css'

const bar = document.getElementById("languagebar");
const text = document.getElementById("srcinput");

const examples = [
  "'factorial of 5 is'\n×/!5", 
  "⌽(⍒2×+\\' '=s)⊂s←' talF LPA .selur'", 
  "s←'questionably, beatably, deniably, doubtedly,'\n¯1&' un'⊥[' '=r]r←' ',s\n'the best language ever'"
];

let example_index = Math.floor(Math.random() * examples.length);

document.getElementById("forward").addEventListener("click", e => {
  example_index = (example_index + 1) % examples.length;
  text.value = examples[example_index];
  text.dispatchEvent(new CustomEvent("input"));
  run.dispatchEvent(new CustomEvent("click"));
}, false);

document.getElementById("back").addEventListener("click", e => {
  example_index = (((example_index - 1) % examples.length) + examples.length) % examples.length;
  text.value = examples[example_index];
  text.dispatchEvent(new CustomEvent("input"));
  run.dispatchEvent(new CustomEvent("click"));
}, false);

text.value = examples[example_index];
text.addEventListener("keydown", e => {
  if(e.keyCode === 13 && e.shiftKey){
    runresult.innerText = execSource(text.value);
    e.preventDefault();
  }
}, false);

const glyphs = "⍬ + ¯ - × ÷ ⌹ * ⍟ ↑ ↓ ~ | ⌈ ⌊ % < ≤ = ≥ > ≠ ≡ ≢ ⊃ ⊂ ⊆ ⊥ ⊤ ⍳ ⍸ ⍒ ⍋ ⌽ ⊖ & , # ! ⍴ ⍣ ⍤ / \\ ? ← ⍅ () '' ⍺ ⍵ ∇ {} [] ⋄";
const functions = "+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⊥⊤⍳⍸⍒⍋⌽⊖&,#!⍴()∇";
const modifiers = "⍤⍣/\\?";
const constants = "⍬1234567890.";
const stackers = "←⍅()∇{}[]";
const info = {
  "⍬": "Zilde",
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
  "⊥": "Splice\n3→1",
  "⊤": "Pick\n3→1",
  "⊖": "Rotate\n2→1",
  "⌽": "Reverse\n1→1",
  ",": "Catenate\n2→1",
  "#": "Shape of\n1→1",
  "!": "Indices/Classify\n1→1",
  "⍳": "Indices-of\n2→1",
  "⍸": "Find sequence\n2→1",
  "&": "Take/drop\n2→1",
  "⍴": "Reshape\n2→1",
  "⍋": "Grade up\n1→1",
  "⍒": "Grade down\n1→1",

  "/": "Fold\n1F",
  "\\": "Scan\n1F",
  "⍣": "Repeat\n1F1",
  "⍤": "Until\n2F",
  "?": "If\n2F1",

  "←": "Assign",
  "⍅": "Function assign",
  "()": "Array",
  "⍺": "Left argument",
  "⍵": "Right argument",
  "∇": "Recur",
  "{}": "Defined function", 
  "[]": "Axis-index",
  "''": "String",
  "⋄": "Statement separator"
}

const hl_class = g => stackers.includes(g) ? 'hi_k' : functions.includes(g) ? 'hi_f' : modifiers.includes(g) ? 'hi_m' : g[0] === "'" ? 'hi_s' : constants.includes(g) ? 'hi_c' : g[0] === "\\" ? 'hi_e' : g[0] === "¯" ? 'hi_c' : false;

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

  s = s.split(/('(?:[^'\\]|\\.)*')/);

  s = s.map(v => {
    if(v[0] !== "'"){
      return v.replace(new RegExp("¯[0-9.]|" + [...functions, ...modifiers, ...constants].map(f=>f.match(/[0-9]/)?f:"\\"+f).join("|"), "g"), f=>"<span class=\"" + hl_class(f) + "\">" + sanitize(f) +"</span>");
    } else {
      return "<span class='hi_s'>" + v.split(/(\\.)/g).map(c => c.length === 2 && c[0] === "\\" ? "<span class='hi_e'>" + sanitize(c) + "</span>" : c).join("") + "</span>";
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
  } else if (area.selectionStart || area.selectionStart === '0') {
    const start = area.selectionStart;
    area.value = area.value.substring(0, start) + text + area.value.substring(area.selectionEnd, area.value.length);
    area.focus();
    area.selectionStart = start + text.length;
    area.selectionEnd = start + text.length;
  } else {
    area.value += text;
  }
}

for(let glyph of glyphs.split(" ")){
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
    if(glyph.length > 1){
      text.focus();
      text.selectionStart --;
      text.selectionEnd --;
    }
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

    if(c === " ") continue;

    if(c === "'"){
      let str = "";
      do {
        if(c === '\\'){
          c = v[++i];
        }
        str += c;
        c = v[++i];
        if(i >= v.length) return [false, 'Expected string terminator', i];
      } while (c != "'");
      tokens.push(str);
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

    else if((c === "¯" && i < v.length - 1 && (v[i+1] === "." || v[i+1].match(/[0-9]/))) || c === "." || c.match(/[0-9]/)){
      let times = 1;
      if(c === "¯"){ times = -1; c = v[++i]; }

      let num = "";
      while(c.match(/[0-9]/)){
        num += c;
        c = v[++i];
        if(i >= v.length) break;
      }
      if(c === "."){
        num += c;
        c = v[++i];
        if(i < v.length) while(c.match(/[0-9]/)){
          num += c;
          c = v[++i];
          if(i >= v.length) break;
        }
      }
      i --;

      tokens.push(times * parseFloat(num));
    }

    else if(c === "\n" || glyphs.includes(c)){
      tokens.push(c);
    }

    else return [false, 'Unknown token ' + c, i];
  }

  return tokens;
}

const BC = [
  "CONST",
  "FOPEN",
  "MFUNCTION",
  "DFUNCTION",
  "ASSIGN",
  "ASSIGNFN",
  "NAME",

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
  "LAMINATE",
  "SHAPEOF",
  "INDICES",
  "INDICESOF",
  "FINDSEQ",
  "TAKEDROP",
  "RESHAPE",
  "GRADEUP",
  "GRADEDOWN",
  "SPLICE",
  "PICK",

  "RECUR",
  "REPEAT",
  "UNTIL",
  "FOLD",
  "SCAN",
  "IF",

  "OMEGA",
  "ALPHA",
  "POP",
  "POPM",
  "POPD"
].map((k,i)=>({[k]:i+1})).reduce((a,b)=>({...a,...b}));

function formatBC(bc){
  let r = [];
  for(let i = 0; i < bc.length; i ++){ 
    r.push(Object.keys(BC).find(k=>BC[k] === bc[i]));
    if(bc[i] === BC.CONST || bc[i] === BC.NAME) r.push(bc[++i]);
    else if(bc[i] === BC.MFUNCTION || bc[i] === BC.DFUNCTION) r.push(formatBC(bc[++i]));
    else if(bc[i] === BC.ASSIGN) r.push(bc[++i]);
    else if(bc[i] === BC.ASSIGNFN) r.push(bc[++i], bc[++i]);
  }
  return r;
}
function printBC(bc){
  console.log(formatBC(bc));
}

function array(sh, v){
  return {shape: sh, ravel: v};
}

function parse_atom(ts){
  if(typeof(ts[0]) === 'number') {
    if(ts.length > 1 && typeof(ts[1]) === 'number'){
      let res = [ts.shift()];
      while(ts.length > 0 && typeof(ts[0]) === 'number'){
        res.push(ts.shift());
      }
      return [BC.CONST, array([res.length], res)];
    }
    else return [BC.CONST, ts.shift()];
  } else if(ts[0] === '⍬') {
    ts.shift();
    return [BC.CONST, array([0], [])];
  } else if(ts[0] === '⍵'){
    ts.shift();
    return [BC.OMEGA];
  } else if(ts[0] === '⍺'){
    ts.shift();
    return [BC.ALPHA];
  } else if(ts[0].length && ts[0][0] === "'"){
    const t = ts.shift();
    return [BC.CONST, t.length === 2 ? t.slice(1) : array([t.length - 1], [...t.slice(1)])];
  } else if(typeof(ts[0]) === 'string' && !glyphs.includes(ts[0])){
    return [BC.NAME, ts.shift()];
  } else if(ts[0] === "("){
    ts.shift();
    let res = parse_expression(ts);
    let any_arr = false;
    while("⋄\n".includes(ts[0])) {
      ts.shift();
      let next = parse_expression(ts);
      res = next.concat(res).concat([any_arr ? BC.CATENATE : BC.LAMINATE]);
      any_arr = true;
    }
    if(ts.length < 1 || ts[0] !== ")") return [false, "Expected closing )"];
    ts.shift();
    return res;
  } else {
    return [false, 'Syntax error: expected expression'];
  }
}

function parse_function_atom(ts){
  if(ts[0] === "{"){
    ts.shift();
    const old_toks = JSON.parse(JSON.stringify(ts));
    const r = parse(ts);
    if(r.length && r[0] === false) return r;
    if(ts.length < 1 || ts[0] !== "}") return [false, "Mismatched {"];
    ts.shift();

    old_toks.splice(ts.length, old_toks.length - ts.length);
    let has_a = false;
    for(let t of old_toks){
      if(t === "⍺") { has_a = true; break; }
    }

    return [has_a ? BC.DFUNCTION : BC.MFUNCTION, r];
  } else if(typeof(ts[0]) === 'string' && functions.includes(ts[0])) {
    const f = ts.shift();
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
      "⊥": BC.SPLICE,
      "⊤": BC.PICK,
      "⌽": BC.REVERSE,
      "⊖": BC.ROTATE,
      ",": BC.CATENATE,
      "#": BC.SHAPEOF,
      "!": BC.INDICES,
      "⍳": BC.INDICESOF,
      "⍸": BC.FINDSEQ,
      "&": BC.TAKEDROP,
      "⍴": BC.RESHAPE,
      "⍋": BC.GRADEUP,
      "⍒": BC.GRADEDOWN,

      "(": BC.ARROPEN,
      ")": BC.ARRCLOSE,

      "∇": BC.RECUR
    }[f];
    if(r === undefined){
       return [false, "internalerror on '" + f + "'"]; 
    } 
    return [r];
  } else if(typeof(ts[0]) === 'string' && !glyphs.includes(ts[0])){
    return [BC.NAME, ts.shift()];
  } else {
    return [false, "Syntax error: expected a function"];
  }
}

// todo: dyadic modifier
function parse_function(ts){
  let res = parse_function_atom(ts);
  if(res.length && res[0] === false) return res;
  while(typeof(ts[0]) === 'string' && (modifiers.includes(ts[0]) || ts[0] === "[")) {
    const m = ts.shift();
    if(m === "["){
      res = parse_expression(ts).concat(res);
      if(ts.length < 1 || ts[0] !== "]") return [false, "Expected closing ]"];
      ts.shift();
      continue;
    }
    const r = {
      "/": BC.FOLD,
      "\\": BC.SCAN,
      "⍣": BC.REPEAT,
      "⍤": BC.UNTIL,
      "?": BC.IF
    }[m];
    if(r === undefined){
       return [false, "internalerror on '" + m + "'"]; 
    } 
    res = [r].concat(res);
    if(r === BC.IF || r === BC.UNTIL){
      let extra = parse_function_atom(ts);
      if(extra.length && extra[0] === false) return extra;
      res = res.concat(extra);
    }
  }
  return res;
}

const terminators = ")]}\n⋄";

function is_value(t){
  return t === "(" || t === "⍵" || t === "⍺" || (typeof(t) === 'string' && !glyphs.includes(t) && isLowerCase(t[0])) || typeof(t) === 'number' || t === '⍬' || (t.length && t[0] === "'");
}

function isLowerCase(str) {
    return str === str.toLowerCase() &&
           str !== str.toUpperCase();
}

function parse_expression(ts){
  if(ts.length === 0 || terminators.includes(ts[0])) return [false, "Expected an expression."];

  let lhs = [];
  if(is_value(ts[0])){
    lhs = parse_atom(ts);
    if(lhs.length && lhs[0] === false) return lhs;
  }

  if(ts.length > 0 && !terminators.includes(ts[0])){
    if(ts[0] === "←") {
      if(lhs.length < 2 || lhs[0] != BC.NAME) return [false, "Expected a name to assign to"];
      ts.shift();
      let rhs = parse_expression(ts);
      if(rhs.length && rhs[0] === false) return rhs;
      return rhs.concat([BC.ASSIGN, lhs[1]])
    } else if(ts[0] === "⍅"){
      if(lhs.length < 2 || lhs[0] != BC.NAME) return [false, "Expected a name to assign to"];
      ts.shift();
      let rhs = parse_function(ts);
      if(rhs.length && rhs[0] === false) return rhs;
      // todo: mfunction, dfunction
      return [BC.ASSIGNFN, lhs[1][0].toUpperCase() + lhs[1].slice(1), [BC.FUNCTION, rhs[0] === BC.FUNCTION ? rhs : rhs[0]]];
    }

    let f = parse_function(ts);
    if(f.length && f[0] === false) return f;
    let rhs = parse_expression(ts);
    if(rhs.length && rhs[0] === false) return rhs;
    lhs = rhs.concat(lhs).concat(f);
  }
  return lhs;
}

function parse(ts, toplevel){
  while(ts.length > 0 && "\n⋄".includes(ts[0])) ts.shift();

  let res = [];
  for(let i = 0; i < 100 && ts.length > 0 && ts[0] !== "}"; i ++){
    const r = parse_expression(ts);
    if(r.length && r[0] === false) return r;
    res = res.concat(r);

    while(ts.length > 0 && "\n⋄".includes(ts[0])) ts.shift();

    if((!toplevel && ts[0] !== "}") || (r.length > 1 && r[r.length - 2] === BC.ASSIGN)) res.push(BC.POP);
  }

  return res;
}

function parse_full(ts){
  const expr = parse(ts, true);
  if(expr.length > 0 && expr[0] === false) return expr;
  if(ts.length > 0) return [false, "Mismatched }"];
  return expr;
}

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
    if(iter === n - 1) inverse = msum;
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
  return typeof(v) === 'number' || typeof(v) === 'string';
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
const darith_to_fname = ["+", "-", "×", "÷", "*", "⍟", "↑", "↓", "%", "=", "≠", "<", ">", "≤", "≥"];
const darith_fns = [(a,b)=>a+b, (a,b)=>a-b, (a,b)=>a*b, (a,b)=>a/b, Math.pow, (a,b)=>Math.log(a) / Math.log(b), Math.max, Math.min, (a,b)=>((a % b) + b) % b, (a,b)=>+(a === b), (a,b)=>+(a !== b), (a,b)=>+(a<b), (a,b)=>+(a>b), (a,b)=>+(a<=b), (a,b)=>+(a>=b)];
function dyadic_arith(f){
  const i = dyadic_ariths.indexOf(f);
  let a = stack.pop();
  if(a === undefined) return [false, darith_to_fname[i] + ': Expected a value'];
  let l = stack.length - 1;
  if(l < 0) return [false, darith_to_fname[i] + ': Expected another value'];

  let r = pervade(darith_fns[i],a,stack[l]);
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
          res.ravel.unshift(e);
          shape = [];
        } else {
          res.ravel = e.ravel.concat(res.ravel);
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
      if(is_atomic(a) && is_atomic(b)) {
        stack.push(Math.abs(a - b));
        break;
      }
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
        stack[l] = stack[l].shape.length === 1 ? stack[l].ravel[st] : array(stack[l].shape.slice(1), stack[l].ravel.slice(st, st + per));
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
    case BC.SPLICE: {
      const indices = stack.pop();
      const sploke = stack.pop();
      const arr = stack.pop();

      if(arr.shape.length != sploke.shape.length) return [false, '⊥: Rank mismatch'];
      for(let i = 1; i < arr.shape.length; i ++){
        if(arr.shape[i] != sploke.shape[i]) return [false, '⊥: Shape mismatch'];
      }

      if(indices.shape[0] != arr.shape[0]) return [false, '⊥: Length mismatch'];

      let per = arr.shape.slice(1).reduce((a,b)=>a*b, 1);

      let result = array([0, ...arr.shape.slice(1)], []);
      for(let i = 0; i < indices.ravel.length; i ++){
        if(indices.ravel[i]) {
          result.ravel = result.ravel.concat(sploke.ravel);
          result.shape[0] += sploke.shape[0];
        }
        else {
          result.ravel = result.ravel.concat(arr.ravel.slice(i * per, i * per + per));
          result.shape[0] ++;
        }
      }

      stack.push(result);
      break;
    }
    case BC.PICK: {
      const indices = stack.pop();
      const a = stack.pop();
      const b = stack.pop();
      if(a.shape.length != b.shape.length) return [false, '⊤: Rank mismatch'];
      for(let i = 0; i < a.shape.length; i ++){
        if(a.shape[i] != b.shape[i]) return [false, '⊤: Shape mismatch'];
      }
      if(indices.shape[0] != a.shape[0]) return [false, '⊤: Length mismatch'];

      let per = a.shape.slice(1).reduce((a,b)=>a*b, 1);

      let result = array(a.shape, []);
      for(let i = 0; i < indices.ravel.length; i ++){
        if(indices.ravel[i]) result.ravel = result.ravel.concat(a.ravel.slice(i * per, i * per + per));
        else result.ravel = result.ravel.concat(b.ravel.slice(i * per, i * per + per));
      }

      stack.push(result);
      break;
    }

    case BC.KEEP: {
      let indices = stack.pop();
      const arr = stack.pop();

      if(is_atomic(arr) && is_atomic(indices)) {
        let r = [];
        for(let i = 0; i < indices; i ++){
          r.push(arr);
        }
        stack.push(array([r.length], r));
        break;
      }

      if(typeof(arr) != typeof(indices)) return [false, '⊆: Rank mismatch'];
      if(indices.ravel.length != arr.shape[0]) return [false, '⊆: Length mismatch'];

      let result = [];
      let klen = 0;
      let leadingper = arr.ravel.length / arr.shape[0];
      for(let i = 0; i < indices.ravel.length; i ++){
        for(let q = 0; q < indices.ravel[i]; q ++){
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
    case BC.LAMINATE: {
      let a = stack.pop();
      let l = stack.length-1;

      if(is_atomic(a)) a = array([1], [...a]);
      if(is_atomic(stack[l])) stack[l] = array([1], [...stack[l]]);

      if(a.shape.length !== stack[l].shape.length) return [false, "Laminate: Rank error"];
      for(let i = 0; i < a.shape.length; i ++){
        if(a.shape[i] !== stack[l].shape[i]) return [false, "Laminate: Shape error"];
      }

      stack[l].shape.unshift(2);
      stack[l].ravel = a.ravel.concat(stack[l].ravel);
      break;
    }
    case BC.CATENATE: {
      let a = stack.pop();
      let l = stack.length-1;
      if(is_atomic(a)) a = array([1], [...a]);
      if(is_atomic(stack[l])) stack[l] = array([1], [...stack[l]]);

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
    case BC.RESHAPE: {
      let a = stack.pop();
      if(is_atomic(a)) a = array([1], [a]);
      if(a.shape.length > 1) return [false, "Cannot reshape with non-vector shape."];

      let re = stack.pop();
      if(is_atomic(re)) re = array([1], [re]);

      let r = [];
      const totallen = a.ravel.reduce((a,b)=>a*b, 1);
      for(let i = 0; i < totallen; i ++){
        r.push(re.ravel[i % re.ravel.length]);
      }
      stack.push(array(a.ravel, r));
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
    case BC.POP: {
      while(stack.length) stack.pop();
      break;
    }
    case BC.POPM: {
      const tmp = stack.pop();
      stack.pop();
      stack.push(tmp);
      break;
    }
    case BC.POPD: {
      const tmp = stack.pop();
      stack.pop();
      stack.pop();
      stack.push(tmp);
      break;
    }
    case BC.OMEGA: {
      stack.push(JSON.parse(JSON.stringify(env['⍵'])));
      break;
    }
    case BC.ALPHA: {
      stack.push(JSON.parse(JSON.stringify(env['⍺'])));
      break;
    }

    default:
      return [false, "bytecode error on '" + Object.keys(BC).find(k => BC[k] === f) + "'"];
  }
}

let env = {};
function vm(bc){
  const env_cpy = JSON.parse(JSON.stringify(env));

  //printBC(bc);
  if(stack.length > 0) env["⍵"] = JSON.parse(JSON.stringify(stack[stack.length - 1]));
  if(stack.length > 1) {
    env["⍺"] = env["⍵"];
    env["⍵"] = JSON.parse(JSON.stringify(stack[stack.length - 2]));
  }

  let pc = 0;
  while(pc < bc.length){
    if(bc[pc] === BC.ASSIGNFN){
      const name = bc[++pc];
      let val = bc[++pc];
      if(!Array.isArray(val[1]) && val[1] === BC.RECUR){
        val[1] = JSON.parse(JSON.stringify(bc));
      }
      env[name] = val;

      pc ++;
      continue;
    }

    let modifier_stack = [];

    while(pc < bc.length && bc[pc] === BC.CONST || bc[pc] === BC.NAME){
      if(bc[pc] === BC.NAME) {
        const res = JSON.parse(JSON.stringify(env[bc[++pc]]));
        if(Array.isArray(res)) {
          const r = vm(res);
          if(r.length && r[0] === false) return r;
        }
        else stack.push(res);
      }
      else stack.push(bc[++pc]);
      pc ++;
    }

    while(pc < bc.length && [BC.FOLD, BC.SCAN, BC.REPEAT, BC.UNTIL, BC.IF].includes(bc[pc])){
      modifier_stack.push(bc[pc++]);
    }

    if(pc >= bc.length) continue;

    if(bc[pc] === BC.ASSIGN){
      if(modifier_stack.length) return [false, "bytecode error: modifiers for ←"];
      env[bc[++pc]] = stack.pop();
      stack.push(JSON.parse(JSON.stringify(env[bc[pc]])));
      pc ++;
      continue;
    }

    if(modifier_stack.length === 0) {
      if(bc[pc] === BC.MFUNCTION || bc[pc] === BC.DFUNCTION) {
        const dy = bc[pc] === BC.DFUNCTION;
        const r = vm(bc[++pc]);
        if(r.length && r[0] === false) return r;
        apply_f(dy ? BC.POPD : BC.POPM);
      } else if(bc[pc] === BC.RECUR){
        const r = vm(bc);
        if(r.length && r[0] === false) return r;
      } else {
        const r = apply_f(bc[pc]);
        if(r) return r;
      }
    } else {
      let to_f;
      if(bc[pc] === BC.MFUNCTION || bc[pc] === BC.DFUNCTION){
        const dy = bc[pc] === BC.DFUNCTION;
        pc++;
        const func = bc[pc];
        to_f = () => {
          const r = vm(func);
          if(r.length && r[0] === false) return r;
          apply_f(dy ? BC.POPD : BC.POPM);
        };
      }
      else if(bc[pc] === BC.RECUR){
        to_f = () => {
          const r = vm(bc);
          if(r.length && r[0] === false) return r;
        }
      }
      else {
        const func = bc[pc];
        to_f = () => {
          const r = apply_f(func);
          if(r) return r;
        };
      }
      while(modifier_stack.length > 0){
        const pm = modifier_stack.pop();
        const old_f = to_f;
        let second_f;
        if([BC.UNTIL, BC.IF].includes(pm)) {
          pc ++;
          if(bc[pc] === BC.MFUNCTION || bc[pc] === BC.DFUNCTION){
            const dy = bc[pc] === BC.DFUNCTION;
            pc++;
            const func = bc[pc];
            second_f = () => {
              const r = vm(func);
              if(r.length && r[0] === false) return r;
              apply_f(dy ? BC.POPD : BC.POPM);
            };
          }
          else if(bc[pc] === BC.RECUR){
            second_f = () => {
              const r = vm(bc);
              if(r.length && r[0] === false) return r;
            }
          }
          else {
            const func = bc[pc];
            second_f = () => {
              const r = apply_f(func);
              if(r) return r;
            };
          }
        }
        switch(pm){
          case BC.FOLD: {
            to_f = () => {
              const arr = stack.pop();

              const per = arr.ravel.length / arr.shape[0];

              if(arr.shape[0] === 0) stack.push(array(arr.shape.slice(1), new Array(arr.shape.slice(1).reduce((a,b)=>a*b, 1)).fill().map(_=>0)));
              else if(arr.shape[0] === 1) stack.push(arr.shape.length === 1 ? arr.ravel[0] : array(arr.shape.slice(1), arr.ravel));

              else {
                const z = arr.ravel.slice(0, per);
                stack.push(arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z));
                for(let i = 1; i < arr.shape[0]; i ++){
                  const z = arr.ravel.slice(i * per, i * per + per);
                  stack.push(arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z));

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

              if(arr.shape[0] === 0) stack.push(array([0, ...arr.shape.slice(1)], []));
              else if(arr.shape[0] === 1) stack.push(array([1, ...arr.shape.slice(1)], arr.ravel));

              else {
                let result = array(arr.shape, []);
                const z = arr.ravel.slice(0, per);
                stack.push(arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z));
                result.ravel = result.ravel.concat(z);
                for(let i = 1; i < arr.shape[0]; i ++){
                  const z = arr.ravel.slice(i * per, i * per + per);
                  stack.push(arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z));

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

          case BC.REPEAT: {
            to_f = () => {
              const times = stack.pop();
              const start = stack.pop();
              stack.push(mpervade(a=>{
                stack.push(start);
                for(let i = 0; i < a; i ++){
                  old_f();
                }
                return stack.pop();
              }, times));
            }
            break;         
          }

          // todo: dyadic
          case BC.UNTIL: {
            to_f = () => {
              let prev = false;
              while(1){
                old_f();
                const new_prev = JSON.parse(JSON.stringify(stack[stack.length - 1]));
                if(prev !== false) {
                  const stack_copy = JSON.parse(JSON.stringify(stack));
                  stack.push(prev);
                  second_f();
                  let result = stack.pop();
                  stack = stack_copy;
                  if(result === 1) break;
                }
                prev = new_prev;
              }
            }
            break;
          }

          case BC.IF: {
            to_f = () => {
              const cond = stack.pop();

              let diff = 0;
              const stack_copy = JSON.parse(JSON.stringify(stack));
              if(is_atomic(cond) ? cond : cond.ravel[0]){
                old_f();
              } else {
                second_f();
              }
              const res = stack.pop();
              diff = stack_copy.length - stack.length;
              stack = stack_copy;

              for(let i = 0; i < diff; i ++) stack.pop();
              stack.push(res);
            }
            break;
          }

          default:
            return [false, "bytecode error on '" + Object.keys(BC).find(k=>BC[k]===pm) + "'"];
        }
      }

      const r = to_f();
      if(r) return r;
    }
    
    pc ++;

    if(bc[pc] === BC.ASSIGN){
      env[bc[++pc]] = stack.pop();
      stack.push(JSON.parse(JSON.stringify(env[bc[pc]])));
      pc ++;
    }
  }

  if(array_stack.length) return [false, '): Mismatched parenthesis'];

  env = env_cpy;

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

  const parsed = parse_full(tokens);

  if(parsed.length && parsed[0] === false) {
    let rstring = '';
    for(let i = 0; i < tokens.length; i ++){
      if(tokens[i] === '\n') break;
      rstring += tokens[i].length && tokens[i][0] === "'" ? tokens[i] + "'" : tokens[i];
      rstring += " ";
    }
    return parsed[1] + '\n\n... ' + rstring + '\n    ↑ here';
  }

  stack = [];
  array_stack = [];
  const res = vm(parsed);
  if(res.length && res[0] === false) return res[1];
  return res;
}

runresult.innerText = execSource(text.value);