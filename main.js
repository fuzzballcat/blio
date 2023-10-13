import './style.css'

const bar = document.getElementById("languagebar");
const text = document.getElementById("srcinput");

const examples = [
 /* "'factorial of 5 is'\n×/!5", 
  "⌽(⍒+\\' '=s)⊂s←' talF LPA .selur'", 
  "s←'questionably, beatably, deniably, doubtedly,'\n¯1&' un'⊥[' '=r]r←' ',s\n'the best language ever'",
  */"1 + 3 ⍝ four 'a quoted comment' more comment"
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

const glyphs = "⍬ + ¯ - × ÷ ⌹ * ⍟ ↑ ↓ ~ | ⌈ ⌊ % < ≤ = ≥ > ≠ ≡ ≢ ⊃ ⊂ ⊆ ⊥ ⊤ ⍳ ⍸ ⍒ ⍋ ⌽ ⊖ & , ⍪ # ! ⍴ ⍣ / \\ ? ← ⍅ () '' ⍺ ⍵ ∇ {} [] ⋄ ⍝";
const functions = "+¯-×÷⌹*⍟↑↓~|⌈⌊%<≤=≥>≠≡≢⊃⊂⊆⊥⊤⍳⍸⍒⍋⌽⊖&,⍪#!⍴()∇";
const modifiers = "⍣/\\?";
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
  "⍪": "Laminate\n2→1",
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
  "⍣": "Repeat/Until\n1F[1]/2F",
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
  "⋄": "Statement separator",
  "⍝": "Comment"
}

const hl_class = g => stackers.includes(g) ? 'hi_k' : functions.includes(g) ? 'hi_f' : modifiers.includes(g) ? 'hi_m' : g[0] === "'" ? 'hi_s' : constants.includes(g) ? 'hi_c' : g[0] === "\\" ? 'hi_e' : g[0] === "¯" ? 'hi_c' : g[0] === "⍝" ? 'hi_l' : false;

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

  // todo: split on comments
  s = s.split(/(⍝.*(?:\n|$))/).map(v => {
    if(v[0] !== "⍝"){
      return v.split(/('(?:[^'\\]|\\.)*')/).map(v => {
        if(v[0] !== "'"){
          return v.replace(new RegExp("¯[0-9.]|" + [...functions, ...modifiers, ...constants].map(f=>f.match(/[0-9]/)?f:"\\"+f).join("|"), "g"), f=>"<span class=\"" + hl_class(f) + "\">" + sanitize(f) +"</span>");
        } else {
          return "<span class='hi_s'>" + v.split(/(\\.)/g).map(c => c.length === 2 && c[0] === "\\" ? "<span class='hi_e'>" + sanitize(c) + "</span>" : c).join("") + "</span>";
        }
      }).join("");
    } else {
      return "<span class='hi_l'>" + sanitize(v) + "</span>";
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
      return { type: "CONST", value: array([res.length], res) };
    }
    else return { type: "CONST", value: ts.shift() };
  } else if(ts[0] === '⍬') {
    ts.shift();
    return { type: "CONST", value: array([0], []) };
  } else if(ts[0] === '⍵'){
    ts.shift();
    return { type: "OMEGA" };
  } else if(ts[0] === '⍺'){
    ts.shift();
    return { type: "ALPHA" };
  } else if(ts[0].length && ts[0][0] === "'"){
    const t = ts.shift();
    return { type: "CONST", value: t.length === 2 ? t.slice(1) : array([t.length - 1], [...t.slice(1)]) };
  } else if(typeof(ts[0]) === 'string' && !glyphs.includes(ts[0])){
    return { type: "NAME", value: ts.shift() };
  } else if(ts[0] === "("){
    ts.shift();
    let res = parse_expression(ts);
    let any_arr = false;
    while("⋄\n".includes(ts[0])) {
      ts.shift();
      let next = parse_expression(ts);
      res = { type: "CALL", fn: { type: "PRIMITIVE", value: any_arr ? "," : "⍪" }, lhs: res, rhs: next };
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

    old_toks.splice(old_toks.length - ts.length, ts.length);
    let has_a = false;
    for(let t of old_toks){
      if(t === "⍺") { has_a = true; break; }
    }

    return { type: "FUNCTION", dyadic: has_a, expression: r };
  } else if(typeof(ts[0]) === 'string' && functions.includes(ts[0])) {
    const f = ts.shift();
    return { type: "PRIMITIVE", value: f };
  } else if(typeof(ts[0]) === 'string' && !glyphs.includes(ts[0])){
    return { type: "NAME", value: ts.shift() };
  } else {
    return [false, "Syntax error: expected a function"];
  }
}

function parse_function(ts){
  let res = parse_function_atom(ts);
  if(res.length && res[0] === false) return res;
  while(typeof(ts[0]) === 'string' && modifiers.includes(ts[0])) {
    const m = ts.shift();
    res = { type: "MODIFIER", modifier: m, fn: res };
    if(m === "⍣" && ts.length && ts[0] === "["){
      ts.shift();
      res.modifier = "⌺";
      res.count = parse_expression(ts);
      if(ts.length < 1 || ts[0] !== "]") return [false, "Expected closing ]"];
      ts.shift();
      continue;
    }
    
    if(m === "?" || m === "⍣"){
      let extra = parse_function_atom(ts);
      if(extra.length && extra[0] === false) return extra;
      res.fn2 = extra;
    }
  }
  return res;
}

const terminators = ")]}\n⋄⍝";

function is_value(t){
  return t === "(" || t === "⍵" || t === "⍺" || (typeof(t) === 'string' && !glyphs.includes(t) && isLowerCase(t[0])) || typeof(t) === 'number' || t === '⍬' || (t.length && t[0] === "'");
}

function isLowerCase(str) {
    return str === str.toLowerCase() &&
           str !== str.toUpperCase();
}

function parse_expression(ts){
  if(ts.length === 0 || terminators.includes(ts[0])) return [false, "Expected an expression."];

  let lhs;
  if(is_value(ts[0])){
    lhs = parse_atom(ts);
    if(lhs.length && lhs[0] === false) return lhs;
  }

  if(ts.length > 0 && !terminators.includes(ts[0])){
    if(ts[0] === "←") {
      if(lhs.type != "NAME") return [false, "Expected a name to assign to"];
      ts.shift();
      let rhs = parse_expression(ts);
      if(rhs.length && rhs[0] === false) return rhs;
      return { type: "ASSIGN", name: lhs.value, value: rhs };
    } else if(ts[0] === "⍅"){
      if(lhs.type != "NAME") return [false, "Expected a name to assign to"];
      ts.shift();
      let rhs = parse_function(ts);
      if(rhs.length && rhs[0] === false) return rhs;
      return { type: "ASSIGNFN", name: lhs.value[0].toUpperCase() + lhs.value.slice(1), fn: rhs};
    }

    let fn = parse_function(ts);
    let bracket;
    if(ts.length > 0 && ts[0] === "["){
      ts.shift();
      bracket = parse_expression(ts);
      if(ts.length < 1 || ts[0] !== "]") return [false, "Expected closing ]"];
      ts.shift();
    }
    if(fn.length && fn[0] === false) return fn;
    let rhs = parse_expression(ts);
    if(rhs.length && rhs[0] === false) return rhs;
    lhs = { type: "CALL", fn, lhs, rhs, bracket };
  }
  return lhs;
}

function parse(ts, toplevel){
  while(ts.length > 0 && "\n⋄⍝".includes(ts[0])) if(ts.shift() === "⍝") while(ts.length > 0 && ts[0] !== "\n") ts.shift();

  let res = [];
  for(let i = 0; i < 100 && ts.length > 0 && ts[0] !== "}"; i ++){
    const r = parse_expression(ts);
    if(r.length && r[0] === false) return r;
    res.push(r);

    while(ts.length > 0 && "\n⋄⍝".includes(ts[0])) if(ts.shift() === "⍝") while(ts.length > 0 && ts[0] !== "\n") ts.shift();
  }

  return { type: "EXPRLIST", exprs: res, toplevel };
}

function parse_full(ts){
  const expr = parse(ts, true);
  if(expr.length > 0 && expr[0] === false) return expr;
  if(ts.length > 0) return [false, "Mismatched }"];
  return expr;
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
      if(v.shape.length > 1) r += v.shape + '⍴0';
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

const dyadic_ariths = ["+", "-", "×", "÷", "*", "⍟", "↑", "↓", "%", "=", "≠", "<", ">", "≤", "≥"];
const darith_fns = [(a,b)=>a+b, (a,b)=>a-b, (a,b)=>a*b, (a,b)=>a/b, Math.pow, (a,b)=>Math.log(a) / Math.log(b), Math.max, Math.min, (a,b)=>((a % b) + b) % b, (a,b)=>+(a === b), (a,b)=>+(a !== b), (a,b)=>+(a<b), (a,b)=>+(a>b), (a,b)=>+(a<=b), (a,b)=>+(a>=b)];
function dyadic_arith(f, a, b){
  const i = dyadic_ariths.indexOf(f);

  let r = pervade(darith_fns[i],a,b);
  if(r === undefined)  return [false, f + ': Shape mismatch'];
  return r;
}

const monadic_ariths = ["¯", "~", "⌈", "⌊"];
const marith_fns = [a=>-a, a=>+!a, Math.ceil, Math.floor];
function monadic_arith(f, a){
  const i = monadic_ariths.indexOf(f);

  return mpervade(marith_fns[i], a);
}


function apply_f(f, a, b, brack){
  switch(f){
    case "¯":
    case "~":
    case "⌈":
    case "⌊": {
      if(b !== undefined) return [false, f + ": Too many values"];
      return monadic_arith(f, a);
    }

    case "+": 
    case "-": 
    case "×":
    case "÷":
    case "*":
    case "⍟":
    case "↑":
    case "↓": 
    case "%":
    case "=":
    case "≠":
    case "<":
    case ">":
    case "≤":
    case "≥": {
      if(b === undefined) return [false, f + ": Expected another value"];
      return dyadic_arith(f, b, a);
    }

    case "⌹": {
      if(b !== undefined) return [false, "⌹: Too many values"];
      return matrix_invert(a);
    }

    case "|": {
      if(b === undefined) return [false, "|: Expected another value"];
      if(is_atomic(a) && is_atomic(b)) {
        return Math.abs(a - b);
      }
      if(typeof(a) != typeof(b)) return [false, '|: Rank error'];

      if(a.ravel.length != b.ravel.length) return [false, '|: Length error'];
      let sum = 0;
      for(let i = 0; i < a.ravel.length; i ++){
        const l = a.ravel[i];
        const r = b.ravel[i];

        sum += Math.pow(r - l, 2);
      }
      return Math.sqrt(sum);
    }
    case "≡": {
      if(b === undefined) return [false, "≡: Expected another value"];
      return is_match(a, b);
    }
    case "≢": {
      if(b === undefined) return [false, "≡: Expected another value"];
      return +!is_match(a, b);
    }
    
    case "⊂": {
      if(b === undefined) return [false, "⊂: Expected another value"];
      const per = a.ravel.length / a.shape[0];

      if(is_atomic(b)){
        const st = (b-1) * per;
        return a.shape.length === 1 ? a.ravel[st] : array(a.shape.slice(1), a.ravel.slice(st, st + per));
      }

      let ravel = [];
      for(let i = 0; i < b.ravel.length; i ++){
        const st = (b.ravel[i]-1) * per;
        ravel = ravel.concat(a.ravel.slice(st, st + per));
      }
      return array(b.shape.concat(a.shape.slice(1)), ravel);
    }
    case "⊃": {
      if(b !== undefined) return [false, "⊃: Too many values"];

      if(is_atomic(a)) a = array([1], [a]);

      if(a.shape.length > 1) return [false, "⊃: Rank error"];

      let result = [];
      for(let i = 0; i < a.ravel.length; i ++){
        for(let j = 0; j < a.ravel[i]; j ++){
          result.push(i+1);
        }
      }
      return array([result.length], result);
    }
    case "⊥": {
      if(b === undefined || brack === undefined) return [false, "⊥: Expected another value"];

      const indices = brack;
      const sploke = b;
      const arr = a;

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

      return result;
    }
    case "⊤": {
      const indices = brack;
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

      return result;
    }

    case "⊆": {
      let indices = b;
      const arr = a;

      if(is_atomic(arr) && is_atomic(indices)) {
        let r = [];
        for(let i = 0; i < indices; i ++){
          r.push(arr);
        }
        return array([r.length], r);
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
      return array([klen, ...arr.shape.slice(1)], result);
    }
    case "⊖": {
      const acpy = JSON.parse(JSON.stringify(a));
      const per = acpy.ravel.length / acpy.shape[0];
      if(b > 0){
        for(let i = 0; i < b; i ++){
          const rr = acpy.ravel.splice(0, per);
          acpy.ravel = acpy.ravel.concat(rr);
        }
      } else {
        for(let i = 0; i < -b; i ++){
          const rr = acpy.ravel.splice(acpy.ravel.length - per, per);
          acpy.ravel = rr.concat(acpy.ravel);
        }
      }
      return acpy;
    }
    case "⌽": {
      const tl = a.shape[0];
      const per = a.ravel.length / tl;
      const acpy = JSON.parse(JSON.stringify(a));
      for(let i = 0; i < tl / 2; i ++){
        let tmp = acpy.ravel.slice(i * per, i * per + per);
        const bi = tl - i - 1;
        acpy.ravel.splice(i * per, per, ...acpy.ravel.slice(bi * per, bi * per + per));
        acpy.ravel.splice(bi * per, per, ...tmp);
      }
      return acpy;
    }
    case "⍪": {
      if(is_atomic(a)) a = array([1], [a]);
      if(is_atomic(b)) b = array([1], [b]);

      if(a.shape.length !== b.shape.length) return [false, "Laminate: Rank error"];
      for(let i = 0; i < a.shape.length; i ++){
        if(a.shape[i] !== b.shape[i]) return [false, "Laminate: Shape error"];
      }

      let bcpy = JSON.parse(JSON.stringify(b));
      bcpy.shape.unshift(2);
      bcpy.ravel = bcpy.ravel.concat(a.ravel);
      return bcpy;
    }
    case ",": {
      if(is_atomic(a)) a = array([1], [a]);
      if(is_atomic(b)) b = array([1], [b]);

      let bcpy = JSON.parse(JSON.stringify(b));

      if(b.shape.length === a.shape.length) {
        for(let i = 1; i < b.shape.length; i ++){
          if(b.shape[i] !== a.shape[i]) return [false, ",: Shape mismatch"];
        }
        bcpy.shape[0] += a.shape[0];
      } else if(b.shape.length === a.shape.length + 1) {
        for(let i = 1; i < bcpy.shape.length; i ++){
          if(bcpy.shape[i] !== a.shape[i - 1]) return [false, ",: Shape mismatch"];
        }
        bcpy.shape[0] ++;
      } else if(a.shape.length === bcpy.shape.length + 1) {
        for(let i = 1; i < a.shape.length; i ++){
          if(a.shape[i] !== bcpy.shape[i - 1]) return [false, ",: Shape mismatch"];
        }
        bcpy.shape = a.shape;
        bcpy.shape[0] ++;
      } else return [false, ",: Shape mismatch"];

      bcpy.ravel = bcpy.ravel.concat(a.ravel);
      return bcpy;
    }
    case "#": {
      if(is_atomic(a)) return array([0], []);
      else return array([a.shape.length], a.shape);
    }
    case "!": {
      let r = [];
      if(is_atomic(a)){
        for(let i = 0; i < a; i ++){
          r.push(i+1);
        }
        return array([r.length], r);
      } else {
        let exists = [];
        for(let i = 0; i < a.ravel.length; i ++){
          const f = exists.findIndex(x=>is_match(a.ravel[i], x));
          if(f < 0){
            exists.push(a.ravel[i]);
            r.push(exists.length);
          } else r.push(f+1);
        }
        return array(a.shape, r);
      }
    }

    case "⍳": {
      if(is_atomic(b)) b = array([1], [b]);
      if(is_atomic(a)) a = array([1], [a]);

      if(a.shape.length !== b.shape.length) return [false, '⍳: Rank error'];
      for(let i = 1; i < b.shape.length; i ++){
        if(a.shape[i] !== b.shape[i]) return [false, '⍳: Rank error'];
      }

      let r = array([0], []);
      let upto = array([0, ...a.shape.slice(1)], []);
      const per = a.ravel.length / a.shape[0];
      for(let i = 0; i < a.shape[0]; i ++){
        upto.ravel = upto.ravel.concat(a.ravel.slice(i * per, i * per + per));
        upto.shape[0] ++;

        if(upto.shape[0] > b.shape[0]) {
          upto.ravel.splice(0, per);
          upto.shape[0] --;
        }

        if(is_match(upto, b)){
          r.ravel.push(i - b.shape[0] + 2);
          r.shape[0] ++;
        }
      }
      return r;
    }
    case "⍸": {
      if(is_atomic(b)) b = array([1], [b]);
      if(is_atomic(a)) a = array([1], [a]);

      let r = array([0], []);
      let upto = array([0, ...a.shape.slice(1)], []);
      const per = a.ravel.length / a.shape[0];
      for(let i = 0; i < a.shape[0]; i ++){
        upto.ravel = upto.ravel.concat(a.ravel.slice(i * per, i * per + per));
        upto.shape[0] ++;

        r.ravel.push(0);
        r.shape[0] ++;

        if(upto.shape[0] > b.shape[0]) {
          upto.ravel.splice(0, per);
          upto.shape[0] --;
        }

        if(is_match(upto, b)){
          r.ravel[i - b.shape[0] + 1] = 1;
        }
      }
      return r;
    }
    case "&": {
      if(is_atomic(a)) a = array([1], [a]);
      
      let acpy = JSON.parse(JSON.stringify(a));

      if(b < 0) {
        acpy.ravel = acpy.ravel.slice(-b * acpy.ravel.length / acpy.shape[0], acpy.ravel.length);
        acpy.shape[0] -= b;
      } else {
        acpy.ravel = acpy.ravel.slice(0, b * acpy.ravel.length / acpy.shape[0]);
        acpy.shape[0] = b;
      }
      return acpy;
    }
    case "⍴": {
      if(is_atomic(b)) b = array([1], [b]);
      if(b.shape.length > 1) return [false, "Cannot reshape with non-vector shape."];

      let re = a;
      if(is_atomic(re)) re = array([1], [re]);

      let r = [];
      const totallen = b.ravel.reduce((a,b)=>a*b, 1);
      for(let i = 0; i < totallen; i ++){
        r.push(re.ravel[i % re.ravel.length]);
      }
      return array(b.ravel, r);
    }
    case "⍋": {
      let r = [];
      let ar = a.ravel;
      for (let i = 0; i < ar.length; i++) {
        ar[i] = [ar[i], i];
      }
      ar.sort(function(a, b) {
        return a[0] < b[0] ? -1 : 1;
      });
      return array(a.shape, ar.map(a=>a[1]+1));
    }
    case "⍒": {
      let r = [];
      let ar = a.ravel;
      for (let i = 0; i < ar.length; i++) {
        ar[i] = [ar[i], i];
      }
      ar.sort(function(a, b) {
        return a[0] > b[0] ? -1 : 1;
      });
      return array(a.shape, ar.map(a=>a[1]+1));
    }

    default:
      return [false, "internalerror on function '" + JSON.stringify(f) + "'"];
  }
}

function apply_f_fullmods(f, a, b, brack){
  if(f.type === "MODIFIER"){
    switch(f.modifier){
      case "/": {
        const arr = a;

        const per = arr.ravel.length / arr.shape[0];

        if(arr.shape[0] === 0) return array(arr.shape.slice(1), new Array(arr.shape.slice(1).reduce((a,b)=>a*b, 1)).fill().map(_=>0));
        else if(arr.shape[0] === 1) return arr.shape.length === 1 ? arr.ravel[0] : array(arr.shape.slice(1), arr.ravel);

        else {
          const z = arr.ravel.slice(0, per);
          let res = arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z);
          for(let i = 1; i < arr.shape[0]; i ++){
            const z = arr.ravel.slice(i * per, i * per + per);
            const r = apply_f_fullmods(f.fn, arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z), res);
            if(r.length && r[0] === false) return r;
            res = r;
          }
          return res;
        }
      }
      case "\\": {
        const arr = a;

        const per = arr.ravel.length / arr.shape[0];

        if(arr.shape[0] === 0) return array([0, ...arr.shape.slice(1)], []);
        else if(arr.shape[0] === 1) return array([1, ...arr.shape.slice(1)], arr.ravel);

        else {
          let result = array(arr.shape, []);
          const z = arr.ravel.slice(0, per);
          let prev = arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z);
          result.ravel = result.ravel.concat(z);
          for(let i = 1; i < arr.shape[0]; i ++){
            const z = arr.ravel.slice(i * per, i * per + per);
            const r = apply_f_fullmods(f.fn, arr.shape.length === 1 ? z[0] : array(arr.shape.slice(1), z), prev);
            if(r.length && r[0] === false) return r;
            result.ravel = result.ravel.concat(is_atomic(r) ? r : r.ravel);
            prev = r;
          }
          return result;
        }
      }
      case "?": {
        const cond = a;
        if(is_atomic(cond) ? cond : cond.ravel[0]) {
          return apply_f_fullmods(f.fn);
        } else {
          return apply_f_fullmods(f.fn2);
        }
      }
      case "⍣": {
        let prev = a;
        while(1){
          const r = apply_f_fullmods(f.fn, prev, b);
          if(r.length && r[0] === false) return r;
          
          const is_exit = apply_f_fullmods(f.fn2, r, prev);
          if(is_exit.length && is_exit[0] === false) return is_exit;

          if(is_exit === 1) break;

          prev = r;
        }
        return prev;
      }
      case "⌺": {
        let prev = a;
        for(let i = 0; i < exec(f.count); i ++){
          prev = apply_f_fullmods(f.fn, prev, b);
          if(prev.length && prev[0] === false) return prev;
        }
        return prev;
      }

      default:
        return [false, "internalerror on modifier '" + JSON.stringify(f.modifier) + "'"];
    }
  } else if(f.type === "FUNCTION") {
    if((b !== undefined) !== f.dyadic) return [false, "error: Function called with incorrect arity"];
    return exec(f.expression, a, b);
  } else if(f.type === "NAME") {
    return apply_f_fullmods(env[f.value], a, b, brack);
  } else {
    if(f.type !== "PRIMITIVE") return [false, "internalerror on function type '" + JSON.stringify(f) + "'"]
    return apply_f(f.value, a, b, brack);
  }
}

let env = {};

let current_function;
function exec(src, omega, alpha){
  switch(src.type){
    case "EXPRLIST": {
      let old_current_function = current_function;
      current_function = { type: "FUNCTION", dyadic: alpha !== undefined, expression: src};
      
      const past_env = JSON.parse(JSON.stringify(env));

      if(src.toplevel){
        let ret = "";
        for(let e of src.exprs){
          const r = exec(e, omega, alpha);
          if(r.length && r[0] === false) return r;
          if(e.type !== "ASSIGN") ret = ret + "\n" + Stringify(r);
        }
        current_function = old_current_function;
        env = past_env;
        return ret;
      } else {
        let ret;
        for(let e of src.exprs){
          ret = exec(e, omega, alpha);
          if(ret.length && ret[0] === false) return ret;
        }
        current_function = old_current_function;
        env = past_env;
        return ret;
      }
    }
    case "ASSIGN": {
      const e = exec(src.value, omega, alpha);
      if(e && e.length && e[0] === false) return e;
      env[src.name] = e;
      return JSON.parse(JSON.stringify(env[src.name]));
    }
    case "NAME": {
      return JSON.parse(JSON.stringify(env[src.value]));
    }
    case "CONST": {
      return src.value;      
    }
    case "CALL": {
      const a = src.rhs ? exec(src.rhs, omega, alpha) : src.rhs;
      if(a && a.length && a[0] === false) return a;
      const brack = src.bracket ? exec(src.bracket, omega, alpha) : src.bracket;
      if(brack && brack.length && brack[0] === false) return brack;
      const b = src.lhs ? exec(src.lhs, omega, alpha) : src.lhs;
      if(b && b.length && b[0] === false) return b;

      return apply_f_fullmods(src.fn, a, b, brack);
    }
    case "OMEGA": {
      return JSON.parse(JSON.stringify(omega));
    }
    case "ALPHA": {
      return JSON.parse(JSON.stringify(alpha));
    }
    case "ASSIGNFN":{
      if(src.fn.type === "PRIMITIVE" && src.fn.value === "∇") env[src.name] = current_function;
      else env[src.name] = src.fn;
      return false;
    }

    default:
      return [false, "internalerror: node type " + src.type];
  }
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

  env = {};
  let e = exec(parsed);
  if(e.length && e[0] === false) return e[1];
  return e;
}

runresult.innerText = execSource(text.value);