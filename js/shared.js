// ══════════════════════════════════════════
//  ∂ CALCULUS — SHARED MODULE
// ══════════════════════════════════════════

// ── LEVELS ──────────────────────────────
const LEVELS = [
  { min: 0,    name: 'Iniciante',   symbol: 'I'  },
  { min: 100,  name: 'Aprendiz',    symbol: 'II' },
  { min: 250,  name: 'Estudante',   symbol: 'III'},
  { min: 500,  name: 'Analista',    symbol: 'IV' },
  { min: 900,  name: 'Especialista',symbol: 'V'  },
  { min: 1400, name: 'Mestre',      symbol: 'VI' },
  { min: 2000, name: 'Sábio',       symbol: 'VII'},
  { min: 3000, name: 'Lenda',       symbol: 'VIII'}
];

function getLevelInfo(xp) {
  let lvl = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) lvl = i;
  }
  const cur  = LEVELS[lvl];
  const next = LEVELS[lvl + 1];
  const xpIn = xp - cur.min;
  const xpNeed = next ? next.min - cur.min : 999;
  const pct = next ? Math.min(100, (xpIn / xpNeed) * 100) : 100;
  return { level: lvl + 1, name: cur.name, symbol: cur.symbol, xpIn, xpNeed, pct, hasNext: !!next };
}

// ── THEMES ──────────────────────────────
const THEMES_DATA = [
  { id:'light',       name:'Claro',      icon:'C', price:0,   base:'light', accent:'#c2410c', desc:'O tema padrão do app' },
  { id:'dark',        name:'Escuro',     icon:'E', price:0,   base:'dark',  accent:'#c2410c', desc:'Modo escuro para estudar à noite' },
  { id:'purple-dark', name:'Violeta',    icon:'V', price:200, base:'dark',  accent:'#7c3aed', desc:'Escuro com destaque violeta' },
  { id:'ocean',       name:'Oceano',     icon:'O', price:200, base:'light', accent:'#0369a1', desc:'Claro com destaque azul' },
  { id:'forest',      name:'Floresta',   icon:'F', price:300, base:'light', accent:'#15803d', desc:'Claro inspirado na natureza' },
  { id:'midnight',    name:'Meia-noite', icon:'M', price:300, base:'dark',  accent:'#2563eb', desc:'Escuro com azul profundo' },
  { id:'rose',        name:'Rosa',       icon:'R', price:400, base:'light', accent:'#be185d', desc:'Claro com destaque rosado' },
  { id:'gold',        name:'Ouro',       icon:'G', price:500, base:'dark',  accent:'#b45309', desc:'Escuro premium dourado' }
];

function applyTheme(themeId) {
  const theme = THEMES_DATA.find(t => t.id === themeId);
  if (!theme) return;
  document.documentElement.setAttribute('data-base', theme.base);
  document.documentElement.setAttribute('data-theme', themeId);
  document.documentElement.style.setProperty('--accent', theme.accent);
}

// ── STATE ────────────────────────────────
const STORAGE_KEY = 'calculus_v4';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return {
    xp: 0, coins: 0, streak: 0, lastStudyDate: null,
    completedLessons: {}, activityLog: [],
    activeTheme: 'light', ownedThemes: ['light','dark'],
    tutorialDone: false
  };
}

function saveState(STATE) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); } catch(e) {}
}

// ── CURRICULUM LOADER ────────────────────
async function loadCurriculum() {
  try {
    const base = getBasePath();
    const idx = await fetch(base + 'data/curriculum.json');
    if (idx.ok) {
      const index = await idx.json();
      const units = await Promise.all(
        index.units.map(f => fetch(base + 'data/units/' + f).then(r => r.json()))
      );
      return units;
    }
  } catch(e) {}
  return CURRICULUM_INLINE;
}

function getBasePath() {
  // Works on GitHub Pages, local server, and file:// with index in subfolders
  const path = window.location.pathname;
  const dir = path.substring(0, path.lastIndexOf('/') + 1);
  return dir;
}

// ── TOAST ────────────────────────────────
let _toastTimer;
function showToast(icon, text) {
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toast-icon').innerHTML = icon;
  document.getElementById('toast-text').innerHTML = text;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

// ── ESCAPE HTML ──────────────────────────
function escH(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

// ── INLINE CURRICULUM FALLBACK ───────────
const CURRICULUM_INLINE = [
  {
    id:'u1', emoji:'limites', title:'Limites', desc:'Fundamentos do Cálculo Diferencial',
    lessons:[
      { id:'u1l1', title:'O que e um Limite?', steps:[
        { type:'theory', title:'O que e um Limite?', blocks:[
          { type:'para', heading:'Intuicao', text:'Um <strong>limite</strong> descreve o valor que uma função <strong>se aproxima</strong> conforme a entrada se aproxima de um certo ponto.' },
          { type:'fórmula', text:'lim  f(x) = L\n x->a\n\n// "O limite de f(x) quando x tende a a e L"' },
          { type:'image', src:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Limit_of_a_function_at_a_point.svg/600px-Limit_of_a_function_at_a_point.svg.png', caption:'Visualizacao: f(x) se aproxima de L quando x -> a.', alt:'Limite de uma função' },
          { type:'para', heading:'Exemplo concreto', text:'Considere <strong>f(x) = (x^2 - 1) / (x - 1)</strong>. Em x = 1, f e indefinida. Mas para x próximo de 1, o valor se aproxima de 2.' },
          { type:'example', label:'Verificando numericamente', body:'x = 0.99  ->  f(x) ~= 1.99\nx = 0.999 ->  f(x) ~= 1.999\nx = 1.001 ->  f(x) ~= 2.001\n\n=>  lim(x->1) f(x) = 2' },
          { type:'callout', kind:'info', icon:'!', text:'O limite e sobre o comportamento próximo a um ponto, não no ponto. A função pode não estar definida em x = a e ainda ter limite!' }
        ]},
        { type:'mcq', fórmula:'lim  (3x + 2)\n x->4', stem:'Calcule o limite substituindo x = 4 diretamente.', opts:['10','12','14','16'], correct:2, exp:'<code>3(4) + 2 = 14</code>.' },
        { type:'mcq', fórmula:'lim  sin(x) / x\n x->0', stem:'Limite fundamental. Qual e o valor?', opts:['0','1','infinito','Nao existe'], correct:1, exp:'lim(x->0) sin(x)/x = 1' },
        { type:'input', fórmula:'lim  x^3 - x\n x->2', stem:'Substitua diretamente. Digite o resultado.', correct:'6', exp:'2^3 - 2 = 6' },
        { type:'mcq', fórmula:'lim  1/x\n x->inf', stem:'O que acontece com 1/x conforme x->infinito?', opts:['1','infinito','0','-1'], correct:2, exp:'1/x -> 0 quando x -> infinito.' }
      ]},
      { id:'u1l2', title:'Limites Laterais', steps:[
        { type:'theory', title:'Limites pelo Lado Esquerdo e Direito', blocks:[
          { type:'para', heading:'Definicao', text:'O <strong>limite pela esquerda</strong> (x->a-) usa valores menores que a; o <strong>limite pela direita</strong> (x->a+) usa valores maiores.' },
          { type:'fórmula', text:'O limite existe se e somente se\nlim(x->a-) = lim(x->a+)' },
          { type:'example', label:'f(x) = 1/x em x = 0', body:'Pela DIREITA (x->0+): +infinito\nPela ESQUERDA (x->0-): -infinito\n\nComo sao diferentes, o limite NAO EXISTE.' },
          { type:'callout', kind:'warn', icon:'!', text:'Se os limites laterais forem diferentes, o limite bilateral não existe.' }
        ]},
        { type:'mcq', fórmula:'f(x) = |x| / x', stem:'Calcule lim(x->0+). Para x>0, f(x)=x/x.', opts:['-1','0','1','Indefinido'], correct:2, exp:'Para x>0: 1.' },
        { type:'mcq', fórmula:'f(x) = |x| / x', stem:'Calcule lim(x->0-). Para x<0, f(x)=-x/x.', opts:['-1','0','1','Indefinido'], correct:0, exp:'Para x<0: -1.' },
        { type:'mcq', fórmula:'lim |x|/x  x->0', stem:'O limite bilateral existe?', opts:['Sim, 0','Sim, 1','Nao existe','Sim, -1'], correct:2, exp:'Limites laterais diferentes: não existe.' },
        { type:'mcq', fórmula:'lim  sqrt(x)\n x->0+', stem:'sqrt(x) só esta definida para x>=0. Qual o limite?', opts:['1','0','infinito','Nao existe'], correct:1, exp:'sqrt(0) = 0.' }
      ]},
      { id:'u1l3', title:'Continuidade', steps:[
        { type:'theory', title:'Funcoes Continuas', blocks:[
          { type:'para', heading:'3 condições', text:'Uma função f e <strong>contínua em x=a</strong> se: (1) f(a) existe, (2) lim existe, (3) lim = f(a).' },
          { type:'fórmula', text:'1. f(a) definida\n2. lim(x->a) f(x) existe\n3. lim(x->a) f(x) = f(a)' },
          { type:'callout', kind:'tip', icon:'v', text:'Polinomios, sin(x), cos(x) e e^x sao contínuos em todo seu dominio.' }
        ]},
        { type:'mcq', fórmula:'f(x) = (x^2-4)/(x-2)', stem:'Qual tipo de descontinuidade em x=2, dado lim=4?', opts:['Essencial','De salto','Removivel','Nenhuma'], correct:2, exp:'Removivel: limite existe mas f(2) e indefinida.' },
        { type:'mcq', fórmula:'f(x)={1 se x>=0, -1 se x<0}', stem:'Qual descontinuidade em x=0?', opts:['Removivel','De salto','Essencial','Continua'], correct:1, exp:'De salto: limites laterais diferentes.' },
        { type:'input', fórmula:'f(x)=x^2+5x-6 em x=1', stem:'Calcule f(1).', correct:'0', exp:'1+5-6=0.' },
        { type:'mcq', fórmula:'f(x)=1/(x-3)', stem:'Onde ha descontinuidade essencial?', opts:['x=0','x=1','x=3','x=-3'], correct:2, exp:'Em x=3, f -> +/-infinito.' }
      ]},
      { id:'u1l4', title:"Regra de L'Hopital", steps:[
        { type:'theory', title:"Regra de L'Hopital", blocks:[
          { type:'para', heading:'Formas Indeterminadas', text:"Formas 0/0 ou inf/inf precisam de L'Hopital." },
          { type:'fórmula', text:"Se lim f/g = 0/0 ou inf/inf\n\nlim f(x)/g(x) = lim f'(x)/g'(x)" },
          { type:'video', url:'https://www.youtube.com/embed/eTnDOXBGMko', caption:"Regra de L'Hopital com exemplos praticos" },
          { type:'callout', kind:'warn', icon:'!', text:"Use L'Hopital SOMENTE em formas 0/0 ou inf/inf!" }
        ]},
        { type:'mcq', fórmula:'lim (x^2-1)/(x-1)  x->1', stem:"Da 0/0. Aplique L'Hopital.", opts:['1','2','3','4'], correct:1, exp:"f'=2x->2, g'=1. Resultado: 2." },
        { type:'mcq', fórmula:'lim (e^x-1)/x  x->0', stem:'Da 0/0. Derivada de e^x e e^x.', opts:['0','e','1','infinito'], correct:2, exp:'e^x/1 em x=0 = 1.' },
        { type:'input', fórmula:'lim sin(3x)/x  x->0', stem:'Derivada de sin(3x) = 3cos(3x). Resultado?', correct:'3', exp:'3cos(0)/1 = 3.' }
      ]}
    ]
  },
  {
    id:'u2', emoji:'derivadas', title:'Derivadas', desc:'Taxas de variacao instantanea',
    lessons:[
      { id:'u2l1', title:'Definicao de Derivada', steps:[
        { type:'theory', title:'O que e uma Derivada?', blocks:[
          { type:'para', heading:'Taxa instantanea', text:"A derivada em x=a e a <strong>taxa de variacao instantanea</strong> - a inclinacao da reta tangente." },
          { type:'fórmula', text:"f'(a) = lim [f(a+h)-f(a)]/h\n        h->0" },
          { type:'callout', kind:'info', icon:'i', text:"Se f(x) e posição, f'(x) e velocidade. Se f(x) e velocidade, f'(x) e aceleração." }
        ]},
        { type:'mcq', fórmula:"f(x)=x^2, f'(x)=?", stem:'Pela definicao, calcule.', opts:['x','2x','2x+h','x^2'], correct:1, exp:"f'(x)=2x." },
        { type:'mcq', fórmula:'f(x)=c (constante)', stem:'Derivada de constante?', opts:['c','1','0','x'], correct:2, exp:"f'(x)=0." },
        { type:'input', fórmula:'f(x)=x^3, coeficiente de f\'(x)?', stem:'Regra da potencia: n*x^(n-1). Coeficiente para n=3?', correct:'3', exp:'3x^2: coeficiente 3.' },
        { type:'mcq', fórmula:'f(x)=5x^4-3x^2+7x-2', stem:'Derive.', opts:['20x^3-6x+7','20x^3-6x','5x^3-3x+7','20x^4-6x^2+7'], correct:0, exp:'20x^3-6x+7.' }
      ]},
      { id:'u2l2', title:'Regras de Derivacao', steps:[
        { type:'theory', title:'Regras de Derivacao', blocks:[
          { type:'fórmula', text:"Potencia: x^n -> n*x^(n-1)\nProduto: (f*g)' = f'g+fg'\nQuociente: (f/g)' = (f'g-fg')/g^2\nCadeia: f(g(x))' = f'(g(x))*g'(x)" },
          { type:'fórmula', text:"sin(x)' = cos(x)\ncos(x)' = -sin(x)\ne^x' = e^x\nln(x)' = 1/x" },
          { type:'callout', kind:'tip', icon:'>', text:"Cadeia: 'derivada de fora x derivada de dentro'." }
        ]},
        { type:'mcq', fórmula:"d/dx [x^2*sin(x)]", stem:'Regra do produto.', opts:['2x*cos(x)','x^2*cos(x)','2x*sin(x)+x^2*cos(x)','2x*cos(x)-x^2*sin(x)'], correct:2, exp:'2x*sin(x)+x^2*cos(x).' },
        { type:'mcq', fórmula:"d/dx [e^x/x]", stem:'Regra do quociente.', opts:['e^x/x-e^x/x^2','e^x*(1-1/x)/x','(e^x*x-e^x)/x^2','e^x/x^2'], correct:2, exp:'e^x*(x-1)/x^2.' },
        { type:'mcq', fórmula:'d/dx sin(x^2)', stem:'Regra da cadeia.', opts:['cos(x^2)','2x*cos(x)','2x*cos(x^2)','sin(2x)'], correct:2, exp:'cos(x^2)*2x.' },
        { type:'input', fórmula:"d/dx[3x^5-2x^3+x] em x=1", stem:'15x^4-6x^2+1 em x=1?', correct:'10', exp:'15-6+1=10.' }
      ]},
      { id:'u2l3', title:'Maximos e Minimos', steps:[
        { type:'theory', title:'Maximos e Minimos', blocks:[
          { type:'fórmula', text:"f'(a)=0: ponto critico\nf''(a)>0 -> mínimo\nf''(a)<0 -> máximo\nf''(a)=0 -> inconclusivo" },
          { type:'example', label:"f(x)=x^3-3x", body:"f'=3x^2-3=0 -> x=+-1\nf''=6x\nf''(1)=6>0 -> mínimo\nf''(-1)=-6<0 -> máximo" }
        ]},
        { type:'mcq', fórmula:'f(x)=x^2-6x+8', stem:"f'(x)=0 -> ponto critico?", opts:['x=2','x=3','x=4','x=6'], correct:1, exp:'2x-6=0->x=3.' },
        { type:'mcq', fórmula:"f''(3)=2", stem:"f''(3)=2>0 indica...?", opts:['Máximo','Mínimo','Inflexao','Inconclusivo'], correct:1, exp:'Mínimo local.' },
        { type:'input', fórmula:'f(x)=-x^2+4x-1', stem:'Valor máximo de f?', correct:'3', exp:'f(2)=-4+8-1=3.' },
        { type:'mcq', fórmula:'f(x)=x^3 em x=0', stem:'x=0 e...?', opts:['Máximo','Mínimo','Inflexao','Descontinuidade'], correct:2, exp:'Ponto de inflexão.' }
      ]}
    ]
  },
  {
    id:'u3', emoji:'integrais', title:'Integrais', desc:'Acumulacao de áreas e grandezas',
    lessons:[
      { id:'u3l1', title:'Integral Indefinida', steps:[
        { type:'theory', title:'Antiderivada e Integral Indefinida', blocks:[
          { type:'para', heading:'O que e?', text:"Integrar e o processo <strong>inverso</strong> de derivar. Int f(x)dx = F(x)+C, onde F'(x)=f(x)." },
          { type:'fórmula', text:'Int x^n dx = x^(n+1)/(n+1)+C\nInt e^x dx = e^x+C\nInt cos(x)dx = sin(x)+C\nInt sin(x)dx = -cos(x)+C' },
          { type:'callout', kind:'warn', icon:'!', text:'Nunca esqueca o "+C" na integral indefinida!' }
        ]},
        { type:'mcq', fórmula:'Int x^3 dx', stem:'Regra da potencia.', opts:['x^4+C','x^4/4+C','3x^2+C','4x^4+C'], correct:1, exp:'x^4/4+C.' },
        { type:'mcq', fórmula:'Int e^x dx', stem:'Integral de e^x?', opts:['e^(x+1)/(x+1)+C','x*e^x+C','e^x+C','1/e^x+C'], correct:2, exp:'e^x+C.' },
        { type:'input', fórmula:'Int cos(x)dx = ?*sin(x)+C', stem:'Coeficiente?', correct:'1', exp:'sin(x)+C, coef=1.' }
      ]},
      { id:'u3l2', title:'Integral Definida', steps:[
        { type:'theory', title:'Integral Definida e Área', blocks:[
          { type:'para', heading:'Área sob a curva', text:"Int[a,b]f(x)dx = F(b)-F(a), onde F'=f." },
          { type:'fórmula', text:'Int[a,b] f(x) dx = F(b) - F(a)\n\n[F(x)] de a até b = F(b) - F(a)' },
          { type:'callout', kind:'info', icon:'i', text:'Se f<0, a integral e negativa (área abaixo do eixo x).' }
        ]},
        { type:'mcq', fórmula:'Int[1,3] 2x dx', stem:'F(x)=x^2. F(3)-F(1)?', opts:['4','6','8','12'], correct:2, exp:'9-1=8.' },
        { type:'input', fórmula:'Int[0,pi] sin(x) dx', stem:'-cos(pi)+cos(0)=?', correct:'2', exp:'1+1=2.' },
        { type:'mcq', fórmula:'Int[0,1] e^x dx', stem:'e^1-e^0=?', opts:['e-1','e','e+1','1'], correct:0, exp:'e-1.' }
      ]},
      { id:'u3l3', title:'Tecnicas de Integracao', steps:[
        { type:'theory', title:'Substituicao e Partes', blocks:[
          { type:'fórmula', text:"Substituicao:\nu=g(x), du=g'(x)dx\nInt f(g(x))g'(x)dx = Int f(u)du" },
          { type:'fórmula', text:'Partes:\nInt u dv = u*v - Int v du\nLIATE: Log, Inv, Alg, Trig, Exp' }
        ]},
        { type:'mcq', fórmula:'Int 3x^2*(x^3+1)^4 dx', stem:'u=x^3+1, du/dx=?', opts:['x^2','3x^2','3x^3','x^3'], correct:1, exp:'3x^2.' },
        { type:'mcq', fórmula:'Int x*e^x dx', stem:'Partes: u=x, dv=e^x dx.', opts:['x*e^x+C','e^x*(x-1)+C','x*e^x+e^x+C','e^x/x+C'], correct:1, exp:'e^x*(x-1)+C.' },
        { type:'input', fórmula:'Int ln(x)dx = x*ln(x)-x+C\nVerifique derivando: resultado?', stem:'Digite o resultado da derivada.', correct:'ln(x)', exp:'ln(x).' }
      ]}
    ]
  }
];
