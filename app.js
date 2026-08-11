// Dashboard Financeiro — Admin Panel v2
// Com edição, seletor de mês e upload de PDF

const KEY = 'dashfin_bruno_v11';

// ===== MESES DISPONÍVEIS =====
const MESES = [
  {id: 'ago/26', label: 'Agosto 2026', num: '08/26'},
  {id: 'set/26', label: 'Setembro 2026', num: '09/26'},
  {id: 'out/26', label: 'Outubro 2026', num: '10/26'},
  {id: 'nov/26', label: 'Novembro 2026', num: '11/26'},
  {id: 'dez/26', label: 'Dezembro 2026', num: '12/26'},
];

let mesAtual = 0; // índice do mês atual

// ===== DADOS PADRÃO POR MÊS =====
const DEFAULT_DATA = {
  'ago/26': {
    exp: [
      {p:'Bruno',n:'Bradesco ELO',t:'Cartão',v:2066.24,d:'10'},
      {p:'Bruno',n:'Inter',t:'Cartão',v:463.87,d:'15'},
      {p:'Bruno',n:'PAN Mastercard 3018',t:'Cartão',v:98.04,d:'12'},
      {p:'Bruno',n:'Neon',t:'Cartão',v:351.10,d:'11'},
      {p:'Bruno',n:'Santander VISA 4079',t:'Cartão',v:1821.81,d:'15'},
      {p:'Bruno',n:'Dívida Pix — Wesley',t:'Pix',v:1989.24,d:''},
      {p:'Rose',n:'Santander SX VISA 3668',t:'Cartão',v:1187.18,d:'12'},
      {p:'Isabel',n:'Nubank',t:'Cartão',v:2177.65,d:'10'},
      {p:'Isabelle',n:'Santander Free 8550',t:'Cartão',v:1609.61,d:'10'},
      {p:'Isabelle',n:'Nubank',t:'Cartão',v:2875.12,d:'11'},
      {p:'Isabelle',n:'Itaú 1736',t:'Cartão',v:388.65,d:'10'},
      {p:'Isabelle',n:'Itaú 4141',t:'Cartão',v:247.60,d:'10'},
      {p:'Isabelle',n:'Carrefour Gold',t:'Cartão',v:541.78,d:'11'},
      {p:'Isabelle',n:'Renner',t:'Cartão',v:285.33,d:'08'},
      {p:'Isabelle',n:'Vivo celular',t:'Conta',v:107.29,d:'10'},
      {p:'Casa',n:'Luz',t:'Conta',v:255.41,d:''},
      {p:'Casa',n:'Água / Esgoto',t:'Conta',v:217.15,d:'18'},
      {p:'Casa',n:'Internet fixa',t:'Conta',v:111.00,d:''},
      {p:'Isabel',n:'Vivo celular',t:'Conta',v:54.90,d:''},
      {p:'Rose',n:'Tim celular',t:'Conta',v:82.00,d:''},
      {p:'Rose',n:'Luz',t:'Conta',v:100.00,d:''},
      {p:'Bruno',n:'Festa sobrinhos — Mateus (7x)',t:'Outro',v:304.25,d:''},
      {p:'Bruno',n:'Festa sobrinhos — Tiago (8x)',t:'Outro',v:304.25,d:''},
    ],
    inc: [
      {p:'Rose',n:'Salário',v:2246.00,d:'07'},
      {p:'Rose',n:'Vale Refeição',v:565.00,d:'07'},
      {p:'Rose',n:'Extra mensal',v:300.00,d:'15'},
      {p:'Rose',n:'PLR (só este mês)',v:178.20,d:'07'},
      {p:'Isabelle',n:'Salário',v:4513.52,d:'07'},
      {p:'Isabelle',n:'Vale Refeição',v:200.00,d:'07',vr:true},
      {p:'Isabel',n:'Aposentadoria',v:5049.79,d:'07'},
      {p:'Isabel',n:'Pensão do marido',v:1420.74,d:'07'},
      {p:'Bruno',n:'Salário',v:3455.20,d:''},
    ]
  },
  'set/26': {
    exp: [],
    inc: [
      {p:'Rose',n:'Salário',v:2246.00,d:'07'},
      {p:'Rose',n:'Vale Refeição',v:565.00,d:'07'},
      {p:'Isabelle',n:'Salário',v:4513.52,d:'07'},
      {p:'Isabelle',n:'Vale Refeição',v:200.00,d:'07',vr:true},
      {p:'Isabel',n:'Aposentadoria',v:5049.79,d:'07'},
      {p:'Isabel',n:'Pensão do marido',v:1420.74,d:'07'},
    ]
  }
};

const OBRA_DEFAULT = {
  pagos: [
    {m:'dez/25',v:580.92},{m:'jan/26',v:481.24},{m:'fev/26',v:688.63},
    {m:'mar/26',v:604.00},{m:'abr/26',v:782.37},{m:'mai/26',v:796.85},
    {m:'jun/26',v:788.39},{m:'jul/26',v:830.01},{m:'ago/26',v:919.98},
    {m:'set/26',v:975.04}
  ]
};

const INV_DEFAULT = {cdi: 14, itens: [{n:'Isabelle',v:12000},{n:'Isabel',v:28000},{n:'Bruno',v:6000}]};

const WESLEY = [[342.01,9,12],[139.95,10,10],[240.68,6,12],[250.00,9,11],[48.55,1,4],[60.15,1,2],[36.33,1,3],[33.73,1,3],[114.15,1,5],[27.90,1,2],[49.46,1,6],[31.68,1,2],[25.46,1,2],[44.39,1,2],[544.80,1,1]];
const NEXTCARD = [{c:'Nubank',p:'Isabelle',v:904.79},{c:'Nubank',p:'Isabel',v:531.32},{c:'Santander Free',p:'Isabelle',v:476.36},{c:'Santander SX',p:'Rose',v:149.75},{c:'Renner',p:'Isabelle',v:64.52},{c:'Neon',p:'Bruno',v:152.55},{c:'Bradesco ELO',p:'Bruno',v:555.90},{c:'Santander VISA',p:'Bruno',v:859.28}];
const PARC = [{v:165.00,cur:3,tot:10},{v:240.90,cur:3,tot:10},{v:150.00,cur:3,tot:4},{v:152.55,cur:1,tot:2},{v:64.52,cur:1,tot:2}];
const TL_LABELS = ['set/26','out/26','nov/26','dez/26','jan/27','fev/27','mar/27'];
const SEP_EXTRA = 904.79+531.32+476.36+149.75+859.28;
const FESTA_NEXT = 608.50;

const CATEG = [['Alimentação',1041.92],['Lazer',493.48],['Compras',381.78],['Veicular',252.76],['Farmácia',199.30],['Outros',181.45],['Transporte',155.42],['Água',128.01],['Assinaturas',41.00]];
const CATCOLORS = ['#ef4444','#8b5cf6','#3b82f6','#10b981','#f59e0b','#6b7280','#14b8a6','#0ea5e9','#ec4899'];
const COLORS = {Bruno:'#3b82f6',Rose:'#f59e0b',Isabel:'#8b5cf6',Isabelle:'#ec4899',Casa:'#6b7280'};
const MES_NOMES = {'01':'jan','02':'fev','03':'mar','04':'abr','05':'mai','06':'jun','07':'jul','08':'ago','09':'set','10':'out','11':'nov','12':'dez'};

// ===== UTILIDADES =====
const clone = x => JSON.parse(JSON.stringify(x));
const brl = x => 'R$ ' + (x || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const dayNum = d => parseInt(d) || 99;

function parseValor(str) {
  if (!str) return 0;
  str = String(str).replace(/[R$\s]/g, '');
  if (str.includes(',') && str.includes('.')) str = str.replace(/\./g, '').replace(',', '.');
  else if (str.includes(',')) str = str.replace(',', '.');
  return parseFloat(str) || 0;
}

function getMesAtual() {
  return MESES[mesAtual];
}

function getMesId() {
  return getMesAtual().id;
}

// ===== ESTADO =====
let state = load();
let chartPessoa, chartCategoria;

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.meses) return s;
  } catch (e) {}
  return {
    meses: clone(DEFAULT_DATA),
    obra: clone(OBRA_DEFAULT),
    inv: clone(INV_DEFAULT)
  };
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// Garantir estrutura
MESES.forEach(m => {
  if (!state.meses[m.id]) {
    state.meses[m.id] = {exp: [], inc: []};
  }
});
if (!state.obra) state.obra = clone(OBRA_DEFAULT);
if (!state.inv) state.inv = clone(INV_DEFAULT);
save();

// Dados do mês atual
function getExp() { return state.meses[getMesId()]?.exp || []; }
function getInc() { return state.meses[getMesId()]?.inc || []; }
function setExp(arr) { state.meses[getMesId()].exp = arr; save(); }
function setInc(arr) { state.meses[getMesId()].inc = arr; save(); }

// ===== CÁLCULOS =====
const nextCardSum = () => NEXTCARD.reduce((a, x) => a + x.v, 0);
const wesleyNext = () => WESLEY.filter(w => w[1] < w[2]).reduce((a, w) => a + w[0], 0);
const obraPago = m => (state.obra.pagos || []).filter(p => !m || p.m === m).reduce((s, p) => s + (p.v || 0), 0);
const obraTotal = () => obraPago();
const aptNext = () => obraPago('set/26') || obraPago(getMesId());

function allOut() {
  const a = getExp().slice();
  const apt = obraPago(getMesId());
  if (apt > 0) a.push({p:'Casa',n:'Apartamento '+getMesId(),t:'Moradia',v:apt,d:'04',virtual:true});
  return a;
}

function timeline() {
  const r = [];
  for (let k = 1; k <= TL_LABELS.length; k++) {
    let s = 0;
    PARC.forEach(p => { if (p.cur + k <= p.tot) s += p.v; });
    if (k === 1) s += SEP_EXTRA;
    if (s > 0) r.push({m: TL_LABELS[k-1], v: s, last: false});
  }
  if (r.length) r[r.length-1].last = true;
  return r;
}

function wesleyTL() {
  const r = [];
  for (let k = 1; k <= TL_LABELS.length; k++) {
    let s = 0;
    WESLEY.forEach(w => { if (w[1] + k <= w[2]) s += w[0]; });
    if (s > 0) r.push({m: TL_LABELS[k-1], v: s, last: false});
  }
  if (r.length) r[r.length-1].last = true;
  return r;
}

// ===== NAVEGAÇÃO =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const currentMonthEl = document.getElementById('currentMonth');

const pageTitles = {
  dashboard: 'Dashboard',
  calendario: 'Calendário',
  entradas: 'Entradas',
  contas: 'Contas a Pagar',
  parcelas: 'Parcelas',
  investimentos: 'Investimentos',
  obra: 'Apartamento'
};

let currentPage = 'dashboard';

function goToPage(pageName) {
  currentPage = pageName;
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageName));
  pages.forEach(p => p.classList.toggle('active', p.id === 'page-' + pageName));
  pageTitle.textContent = pageTitles[pageName] || pageName;
  sidebar.classList.remove('open');
  renderPage(pageName);
}

function updateMonthDisplay() {
  currentMonthEl.textContent = getMesAtual().label;
}

function changeMonth(delta) {
  mesAtual = Math.max(0, Math.min(MESES.length - 1, mesAtual + delta));
  updateMonthDisplay();
  renderPage(currentPage);
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    goToPage(link.dataset.page);
  });
});

document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    goToPage(el.dataset.goto);
  });
});

menuToggle.addEventListener('click', () => sidebar.classList.add('open'));
sidebarClose.addEventListener('click', () => sidebar.classList.remove('open'));
document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

// ===== MODAL =====
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modalOverlay.classList.add('active');
  setTimeout(() => {
    const inp = modalBody.querySelector('input');
    if (inp) inp.focus();
  }, 100);
}
function closeModal() { modalOverlay.classList.remove('active'); }
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// ===== TOAST =====
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== RENDERIZAÇÃO =====
function renderPage(page) {
  switch(page) {
    case 'dashboard': renderDashboard(); break;
    case 'calendario': renderCalendario(); break;
    case 'entradas': renderEntradas(); break;
    case 'contas': renderContas(); break;
    case 'parcelas': renderParcelas(); break;
    case 'investimentos': renderInvestimentos(); break;
    case 'obra': renderObra(); break;
  }
}

function renderDashboard() {
  const exp = getExp();
  const inc = getInc();
  const sai = allOut().reduce((a, e) => a + (e.v || 0), 0);
  const entra = inc.reduce((a, e) => a + (e.v || 0), 0);
  const vr = inc.filter(e => e.vr).reduce((a, e) => a + (e.v || 0), 0);
  const sobra = entra - vr - sai;

  document.getElementById('kpiEntradas').textContent = brl(entra);
  document.getElementById('kpiEntradasHint').textContent = inc.length + ' itens';
  document.getElementById('kpiSaidas').textContent = brl(sai);
  document.getElementById('kpiSaidasHint').textContent = exp.length + ' contas';
  document.getElementById('kpiSaldo').textContent = brl(sobra);
  document.getElementById('kpiSaldo').className = 'kpi-value ' + (sobra >= 0 ? '' : 'red');
  document.getElementById('kpiProximo').textContent = brl(aptNext() + wesleyNext() + FESTA_NEXT + nextCardSum());

  // Alerta
  const ab = document.getElementById('alertBox');
  const bruno = inc.filter(e => e.p === 'Bruno').reduce((a, e) => a + (e.v || 0), 0);
  if (bruno === 0) {
    ab.className = 'alert-box warn';
    ab.innerHTML = '<strong>Atenção:</strong> Falta adicionar o salário do Bruno nas Entradas.';
  } else if (sobra < 0) {
    ab.className = 'alert-box bad';
    ab.innerHTML = `<strong>Déficit de ${brl(Math.abs(sobra))}:</strong> As contas superam a renda disponível.`;
  } else {
    ab.className = 'alert-box ok';
    ab.innerHTML = `<strong>Saldo positivo:</strong> Sobram ${brl(sobra)} após todas as contas.`;
  }

  // Chart Pessoa
  const byP = {};
  allOut().forEach(e => byP[e.p] = (byP[e.p] || 0) + e.v);
  const labels = Object.keys(byP);
  const data = labels.map(l => byP[l]);
  const cols = labels.map(l => COLORS[l] || '#888');

  if (chartPessoa) {
    chartPessoa.data.labels = labels;
    chartPessoa.data.datasets[0].data = data;
    chartPessoa.data.datasets[0].backgroundColor = cols;
    chartPessoa.update();
  } else {
    chartPessoa = new Chart(document.getElementById('chartPessoa'), {
      type: 'doughnut',
      data: {labels, datasets: [{data, backgroundColor: cols, borderWidth: 3, borderColor: '#fff'}]},
      options: {responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: {legend: {position: 'bottom'}}}
    });
  }

  // Chart Categoria
  if (!chartCategoria) {
    chartCategoria = new Chart(document.getElementById('chartCategoria'), {
      type: 'doughnut',
      data: {labels: CATEG.map(c => c[0]), datasets: [{data: CATEG.map(c => c[1]), backgroundColor: CATCOLORS, borderWidth: 3, borderColor: '#fff'}]},
      options: {responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: {legend: {position: 'bottom'}}}
    });
  }

  // Próximos vencimentos
  const rows = allOut().filter(e => e.d).sort((a, b) => dayNum(a.d) - dayNum(b.d)).slice(0, 5);
  document.getElementById('tblProximos').innerHTML = rows.map(e => {
    const warn = parseInt(e.d) <= new Date().getDate() ? ' warn' : '';
    const tagClass = e.t === 'Pix' ? 'pix' : (e.t === 'Cartão' ? 'cartao' : 'conta');
    return `<tr>
      <td><div class="day-cell"><div class="day-num${warn}">${e.d || '—'}</div></div></td>
      <td class="font-medium">${e.n}</td>
      <td>${e.p}</td>
      <td><span class="tag ${tagClass}">${e.t}</span></td>
      <td class="text-right text-red">${brl(e.v)}</td>
    </tr>`;
  }).join('');
}

function renderCalendario() {
  const exp = getExp();
  const inc = getInc();
  const rows = [];
  exp.forEach((e, i) => rows.push({k:'out', e, i: e.virtual ? -1 : i}));
  inc.forEach((e, i) => { if ((e.v||0)>0) rows.push({k:'in', e, i}); });
  rows.sort((a,b) => dayNum(a.e.d) - dayNum(b.e.d));

  document.getElementById('tblCalendario').innerHTML = rows.map(r => {
    const e = r.e;
    if (r.k === 'in') {
      return `<tr class="row-income row-editable" onclick="editEntrada(${r.i})">
        <td><div class="day-cell"><div class="day-num income">${e.d || '—'}</div></div></td>
        <td class="font-medium">${e.n}</td>
        <td>${e.p}</td>
        <td><span class="tag entrada">Entrada</span></td>
        <td class="text-right text-green">+${brl(e.v)}</td>
        <td><button class="btn-delete" onclick="event.stopPropagation();deleteInc(${r.i})">×</button></td>
      </tr>`;
    } else {
      const warn = e.d && parseInt(e.d) <= new Date().getDate() ? ' warn' : '';
      const tagClass = e.t === 'Pix' ? 'pix' : (e.t === 'Cartão' ? 'cartao' : (e.t === 'Moradia' ? 'moradia' : (e.t === 'Outro' ? 'outro' : 'conta')));
      return `<tr class="row-editable" onclick="editConta(${r.i})">
        <td><div class="day-cell"><div class="day-num${warn}">${e.d || '—'}</div></div></td>
        <td class="font-medium">${e.n}</td>
        <td>${e.p}</td>
        <td><span class="tag ${tagClass}">${e.t}</span></td>
        <td class="text-right text-red">${brl(e.v)}</td>
        <td>${r.i >= 0 ? `<button class="btn-delete" onclick="event.stopPropagation();deleteExp(${r.i})">×</button>` : ''}</td>
      </tr>`;
    }
  }).join('');
}

function renderEntradas() {
  const inc = getInc();
  document.getElementById('tblEntradas').innerHTML = inc.map((e, i) => {
    const tag = e.vr ? '<span class="tag vr">VR</span>' : '';
    return `<tr class="row-editable" onclick="editEntrada(${i})">
      <td class="font-medium">${e.p}</td>
      <td>${e.n} ${tag}</td>
      <td>${e.d || '—'}</td>
      <td class="text-right text-green">${brl(e.v)}</td>
      <td><button class="btn-delete" onclick="event.stopPropagation();deleteInc(${i})">×</button></td>
    </tr>`;
  }).join('');

  // Resumo por pessoa
  const byP = {};
  inc.forEach(e => byP[e.p] = (byP[e.p] || 0) + e.v);
  document.getElementById('resumoEntradas').innerHTML = Object.entries(byP).map(([p, v]) =>
    `<div class="summary-item"><span class="label">${p}</span><span class="value">${brl(v)}</span></div>`
  ).join('');
}

function renderContas() {
  const exp = getExp();
  document.getElementById('tblContas').innerHTML = exp.map((e, i) => {
    const tagClass = e.t === 'Pix' ? 'pix' : (e.t === 'Cartão' ? 'cartao' : (e.t === 'Moradia' ? 'moradia' : (e.t === 'Outro' ? 'outro' : 'conta')));
    return `<tr class="row-editable" onclick="editConta(${i})">
      <td class="font-medium">${e.n}</td>
      <td>${e.p}</td>
      <td><span class="tag ${tagClass}">${e.t}</span></td>
      <td>${e.d || '—'}</td>
      <td class="text-right text-red">${brl(e.v)}</td>
      <td><button class="btn-delete" onclick="event.stopPropagation();deleteExp(${i})">×</button></td>
    </tr>`;
  }).join('');

  // Stats
  const total = exp.reduce((a, e) => a + e.v, 0);
  const byTipo = {};
  exp.forEach(e => byTipo[e.t] = (byTipo[e.t] || 0) + 1);
  document.getElementById('statsContas').innerHTML = `
    <div class="stat-item"><span class="stat-label">Total</span><span class="stat-value">${brl(total)}</span></div>
    <div class="stat-item"><span class="stat-label">Cartões</span><span class="stat-value">${byTipo['Cartão'] || 0}</span></div>
    <div class="stat-item"><span class="stat-label">Pix</span><span class="stat-value">${byTipo['Pix'] || 0}</span></div>
    <div class="stat-item"><span class="stat-label">Contas</span><span class="stat-value">${byTipo['Conta'] || 0}</span></div>
  `;
}

function renderParcelas() {
  // Wesley
  const wData = wesleyTL();
  const wMax = Math.max(...wData.map(x => x.v), 1);
  document.getElementById('tlWesley').innerHTML = wData.map(x => `
    <div class="timeline-row">
      <span class="timeline-month">${x.m}${x.last ? '<span class="tag fim">fim</span>' : ''}</span>
      <div class="timeline-bar-bg"><div class="timeline-bar" style="width:${Math.round(x.v/wMax*100)}%;background:${x.last?'#10b981':'#ec4899'}"></div></div>
      <span class="timeline-value">${brl(x.v)}</span>
    </div>
  `).join('');

  // Cartões
  const cData = timeline();
  const cMax = Math.max(...cData.map(x => x.v), 1);
  document.getElementById('tlCartoes').innerHTML = cData.map(x => `
    <div class="timeline-row">
      <span class="timeline-month">${x.m}${x.last ? '<span class="tag fim">fim</span>' : ''}</span>
      <div class="timeline-bar-bg"><div class="timeline-bar" style="width:${Math.round(x.v/cMax*100)}%;background:${x.last?'#10b981':'#f59e0b'}"></div></div>
      <span class="timeline-value">${brl(x.v)}</span>
    </div>
  `).join('');

  // Previsão
  const apt = aptNext();
  let html = `
    <tr><td class="font-medium">Apartamento (obra)</td><td class="text-right">${brl(apt)}</td></tr>
    <tr><td class="font-medium">Dívida Wesley</td><td class="text-right">${brl(wesleyNext())}</td></tr>
    <tr><td class="font-medium">Festa sobrinhos</td><td class="text-right">${brl(FESTA_NEXT)}</td></tr>
  `;
  NEXTCARD.forEach(x => html += `<tr><td class="text-muted">${x.c} (${x.p})</td><td class="text-right">${brl(x.v)}</td></tr>`);
  html += `<tr class="row-total"><td class="font-bold">Total Setembro</td><td class="text-right font-bold">${brl(apt + wesleyNext() + FESTA_NEXT + nextCardSum())}</td></tr>`;
  document.getElementById('tblPrevisao').innerHTML = html;
}

function renderInvestimentos() {
  const total = state.inv.itens.reduce((a, it) => a + (it.v || 0), 0);
  const cdi = (state.inv.cdi || 0) / 100;
  const rendMes = total * (Math.pow(1 + cdi, 1/12) - 1);
  const rendAno = total * cdi;

  document.getElementById('invTotal').textContent = brl(total);
  document.getElementById('invMes').textContent = brl(rendMes);
  document.getElementById('invAno').textContent = brl(rendAno);

  const inp = document.getElementById('inputCDI');
  if (document.activeElement !== inp) inp.value = state.inv.cdi || '';

  document.getElementById('tblInvest').innerHTML = state.inv.itens.map((it, i) => `
    <tr class="row-editable" onclick="editInvest(${i})">
      <td class="font-medium">${it.n}</td>
      <td class="text-right">${brl(it.v)}</td>
      <td class="text-right text-green">${brl(it.v * (Math.pow(1 + cdi, 1/12) - 1))}</td>
      <td><button class="btn-delete" onclick="event.stopPropagation();deleteInv(${i})">×</button></td>
    </tr>
  `).join('');
}

function renderObra() {
  const total = obraTotal();
  const d = state.obra.pagos || [];
  document.getElementById('obraTotal').textContent = brl(total);
  document.getElementById('obraHint').textContent = d.length + ' pagamentos registrados';

  const max = Math.max(...d.map(p => p.v), 1);
  document.getElementById('obraChart').innerHTML = d.map(p => `
    <div class="progress-row">
      <span class="progress-label">${p.m}</span>
      <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(p.v/max*100)}%"></div></div>
      <span class="progress-value">${brl(p.v)}</span>
    </div>
  `).join('');

  document.getElementById('tblObra').innerHTML = d.map((p, i) => `
    <tr class="row-editable" onclick="editObra(${i})">
      <td class="font-medium">${p.m}</td>
      <td>Dia 04</td>
      <td class="text-right">${brl(p.v)}</td>
      <td><button class="btn-delete" onclick="event.stopPropagation();deleteObra(${i})">×</button></td>
    </tr>
  `).join('');
}

// ===== AÇÕES DE DELETAR =====
window.deleteExp = i => { if (confirm('Remover esta conta?')) { const exp = getExp(); exp.splice(i, 1); setExp(exp); renderPage(currentPage); showToast('Conta removida'); }};
window.deleteInc = i => { if (confirm('Remover esta entrada?')) { const inc = getInc(); inc.splice(i, 1); setInc(inc); renderPage(currentPage); showToast('Entrada removida'); }};
window.deleteInv = i => { if (confirm('Remover este investimento?')) { state.inv.itens.splice(i, 1); save(); renderPage('investimentos'); showToast('Investimento removido'); }};
window.deleteObra = i => { if (confirm('Remover este pagamento?')) { state.obra.pagos.splice(i, 1); save(); renderPage('obra'); showToast('Pagamento removido'); }};

// ===== MODAIS DE EDIÇÃO =====
window.editConta = (i) => {
  const exp = getExp();
  const e = exp[i];
  if (!e) return;

  openModal('Editar Conta', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" value="${e.v}"></div>
    <div class="form-group"><label class="form-label">Descrição</label><input type="text" class="form-input" id="fNome" value="${e.n}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pessoa</label><select class="form-select" id="fPessoa">
        ${['Bruno','Rose','Isabel','Isabelle','Casa'].map(p => `<option ${p===e.p?'selected':''}>${p}</option>`).join('')}
      </select></div>
      <div class="form-group"><label class="form-label">Tipo</label><select class="form-select" id="fTipo">
        ${['Cartão','Pix','Conta','Moradia','Outro'].map(t => `<option ${t===e.t?'selected':''}>${t}</option>`).join('')}
      </select></div>
    </div>
    <div class="form-group"><label class="form-label">Dia do vencimento</label><input type="text" class="form-input" id="fVenc" value="${e.d||''}" inputmode="numeric"></div>
    <button class="btn-submit" onclick="saveConta(${i})">Salvar Alterações</button>
  `);
};

window.saveConta = (i) => {
  const exp = getExp();
  exp[i] = {
    p: document.getElementById('fPessoa').value,
    n: document.getElementById('fNome').value.trim(),
    t: document.getElementById('fTipo').value,
    v: parseValor(document.getElementById('fValor').value),
    d: document.getElementById('fVenc').value.trim()
  };
  setExp(exp);
  closeModal();
  renderPage(currentPage);
  showToast('Conta atualizada');
};

window.editEntrada = (i) => {
  const inc = getInc();
  const e = inc[i];
  if (!e) return;

  openModal('Editar Entrada', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" value="${e.v}"></div>
    <div class="form-group"><label class="form-label">Descrição</label><input type="text" class="form-input" id="fNome" value="${e.n}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pessoa</label><select class="form-select" id="fPessoa">
        ${['Bruno','Rose','Isabel','Isabelle'].map(p => `<option ${p===e.p?'selected':''}>${p}</option>`).join('')}
      </select></div>
      <div class="form-group"><label class="form-label">Dia</label><input type="text" class="form-input" id="fDia" value="${e.d||''}" inputmode="numeric"></div>
    </div>
    <div class="form-group">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" id="fVR" ${e.vr?'checked':''}>
        <span>É Vale Refeição (não conta como renda)</span>
      </label>
    </div>
    <button class="btn-submit" onclick="saveEntrada(${i})">Salvar Alterações</button>
  `);
};

window.saveEntrada = (i) => {
  const inc = getInc();
  inc[i] = {
    p: document.getElementById('fPessoa').value,
    n: document.getElementById('fNome').value.trim(),
    v: parseValor(document.getElementById('fValor').value),
    d: document.getElementById('fDia').value.trim(),
    vr: document.getElementById('fVR').checked
  };
  setInc(inc);
  closeModal();
  renderPage(currentPage);
  showToast('Entrada atualizada');
};

window.editInvest = (i) => {
  const it = state.inv.itens[i];
  if (!it) return;

  openModal('Editar Investimento', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" value="${it.v}"></div>
    <div class="form-group"><label class="form-label">Nome</label><input type="text" class="form-input" id="fNome" value="${it.n}"></div>
    <button class="btn-submit" onclick="saveInvest(${i})">Salvar Alterações</button>
  `);
};

window.saveInvest = (i) => {
  state.inv.itens[i] = {
    n: document.getElementById('fNome').value.trim(),
    v: parseValor(document.getElementById('fValor').value)
  };
  save();
  closeModal();
  renderPage('investimentos');
  showToast('Investimento atualizado');
};

window.editObra = (i) => {
  const p = state.obra.pagos[i];
  if (!p) return;

  openModal('Editar Pagamento', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" value="${p.v}"></div>
    <div class="form-group"><label class="form-label">Mês</label><input type="text" class="form-input" id="fMes" value="${p.m}"></div>
    <button class="btn-submit" onclick="saveObra(${i})">Salvar Alterações</button>
  `);
};

window.saveObra = (i) => {
  state.obra.pagos[i] = {
    m: document.getElementById('fMes').value.trim(),
    v: parseValor(document.getElementById('fValor').value)
  };
  save();
  closeModal();
  renderPage('obra');
  showToast('Pagamento atualizado');
};

// ===== MODAIS DE ADICIONAR =====
function modalConta() {
  openModal('Nova Conta', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" placeholder="0,00"></div>
    <div class="form-group"><label class="form-label">Descrição</label><input type="text" class="form-input" id="fNome" placeholder="Nome da conta"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pessoa</label><select class="form-select" id="fPessoa"><option>Bruno</option><option>Rose</option><option>Isabel</option><option>Isabelle</option><option>Casa</option></select></div>
      <div class="form-group"><label class="form-label">Tipo</label><select class="form-select" id="fTipo"><option>Cartão</option><option>Pix</option><option>Conta</option><option>Moradia</option><option>Outro</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Dia do vencimento</label><input type="text" class="form-input" id="fVenc" placeholder="10" inputmode="numeric"></div>
    <button class="btn-submit" onclick="submitConta()">Adicionar Conta</button>
  `);
}

window.submitConta = () => {
  const v = parseValor(document.getElementById('fValor').value);
  const n = document.getElementById('fNome').value.trim();
  if (!n || !(v > 0)) return showToast('Preencha valor e descrição');
  const exp = getExp();
  exp.push({p: document.getElementById('fPessoa').value, n, t: document.getElementById('fTipo').value, v, d: document.getElementById('fVenc').value.trim()});
  setExp(exp);
  closeModal();
  renderPage(currentPage);
  showToast('Conta adicionada');
};

function modalEntrada() {
  openModal('Nova Entrada', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" placeholder="0,00"></div>
    <div class="form-group"><label class="form-label">Descrição</label><input type="text" class="form-input" id="fNome" placeholder="Salário, VR, extra..."></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pessoa</label><select class="form-select" id="fPessoa"><option>Bruno</option><option>Rose</option><option>Isabel</option><option>Isabelle</option></select></div>
      <div class="form-group"><label class="form-label">Dia</label><input type="text" class="form-input" id="fDia" placeholder="07" inputmode="numeric"></div>
    </div>
    <button class="btn-submit" onclick="submitEntrada()">Adicionar Entrada</button>
  `);
}

window.submitEntrada = () => {
  const v = parseValor(document.getElementById('fValor').value);
  const n = document.getElementById('fNome').value.trim();
  if (!n || !(v > 0)) return showToast('Preencha valor e descrição');
  const inc = getInc();
  inc.push({p: document.getElementById('fPessoa').value, n, v, d: document.getElementById('fDia').value.trim()});
  setInc(inc);
  closeModal();
  renderPage(currentPage);
  showToast('Entrada adicionada');
};

function modalInvest() {
  openModal('Novo Investimento', `
    <div class="form-group"><label class="form-label">Valor</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" placeholder="0,00"></div>
    <div class="form-group"><label class="form-label">Nome</label><input type="text" class="form-input" id="fNome" placeholder="Caixinha, Tesouro..."></div>
    <button class="btn-submit" onclick="submitInvest()">Adicionar</button>
  `);
}

window.submitInvest = () => {
  const v = parseValor(document.getElementById('fValor').value);
  const n = document.getElementById('fNome').value.trim();
  if (!n || !(v > 0)) return showToast('Preencha nome e valor');
  state.inv.itens.push({n, v});
  save();
  closeModal();
  renderPage('investimentos');
  showToast('Investimento adicionado');
};

function modalObra() {
  openModal('Registrar Pagamento', `
    <div class="form-group"><label class="form-label">Valor Pago</label><input type="text" class="form-input large" id="fValor" inputmode="decimal" placeholder="0,00"></div>
    <div class="form-group"><label class="form-label">Mês</label><input type="text" class="form-input" id="fMes" placeholder="out/26"></div>
    <button class="btn-submit" onclick="submitObra()">Registrar</button>
  `);
}

window.submitObra = () => {
  const v = parseValor(document.getElementById('fValor').value);
  const m = document.getElementById('fMes').value.trim();
  if (!m || !(v > 0)) return showToast('Preencha mês e valor');
  state.obra.pagos.push({m, v});
  save();
  closeModal();
  renderPage('obra');
  showToast('Pagamento registrado');
};

// ===== UPLOAD DE PDF =====
document.getElementById('inputPDF').addEventListener('change', async (e) => {
  const files = e.target.files;
  if (!files.length) return;

  showToast(`${files.length} PDF(s) selecionado(s) - Envie para mim no chat que eu processo!`);

  // Limpa o input para permitir selecionar o mesmo arquivo novamente
  e.target.value = '';
});

// Event listeners para botões
document.getElementById('btnAddConta').addEventListener('click', modalConta);
document.getElementById('btnAddConta2').addEventListener('click', modalConta);
document.getElementById('btnAddEntrada').addEventListener('click', modalEntrada);
document.getElementById('btnAddInvest').addEventListener('click', modalInvest);
document.getElementById('btnAddObra').addEventListener('click', modalObra);

document.getElementById('inputCDI').addEventListener('input', e => {
  state.inv.cdi = parseFloat(e.target.value) || 0;
  save();
  renderInvestimentos();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Restaurar todos os dados originais? Isso apaga suas alterações.')) {
    state = {meses: clone(DEFAULT_DATA), obra: clone(OBRA_DEFAULT), inv: clone(INV_DEFAULT)};
    save();
    goToPage('dashboard');
    showToast('Dados restaurados');
  }
});

// ===== INICIALIZAÇÃO =====
updateMonthDisplay();
goToPage('dashboard');
