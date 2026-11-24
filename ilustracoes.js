/* =========================================================
   ILUSTRAÇÕES (SVG desenhados no código)
   ========================================================= */
const INK = '#1f2a44', LUZ = '#ff9f1c';
const rad = g => g * Math.PI / 180;
const f1 = n => (+n).toFixed(1);
const SETA = id => `<marker id="${id}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${LUZ}"/></marker>`;
const raio = (pts, extra = '') => `<polyline points="${pts.map(p => p.map(f1).join(',')).join(' ')}" fill="none" stroke="${LUZ}" stroke-width="3" stroke-linejoin="round" ${extra}/>`;

/* ---------- reflexão (a = ângulo com o espelho) ---------- */
function reflexaoSVG(a, mostrar = true, id = 'sR') {
  const i = 90 - a, L = 150, s = Math.sin(rad(i)), c = Math.cos(rad(i));
  const A = [180 - L * s, 210 - L * c], B = [180 + L * s, 210 - L * c];
  const arc = (r, lado) => `${f1(180 + lado * r * s)},${f1(210 - r * c)}`;
  return `<svg viewBox="0 0 360 250" class="ilus" role="img" aria-label="Reflexão num espelho plano"><defs>${SETA(id)}</defs>
    <rect width="360" height="250" rx="14" fill="#f3f7ff"/>
    <rect x="30" y="210" width="300" height="10" fill="#b8c7d9" stroke="${INK}" stroke-width="2"/>
    ${Array.from({ length: 15 }, (_, k) => `<line x1="${36 + k * 20}" y1="220" x2="${28 + k * 20}" y2="232" stroke="${INK}" stroke-width="1.5"/>`).join('')}
    <line x1="180" y1="35" x2="180" y2="210" stroke="${INK}" stroke-width="2" stroke-dasharray="6 5"/><text x="186" y="46" class="sv-b">N</text>
    <path d="M${180 - 62},210 A62,62 0 0,1 ${arc(62, -1)}" fill="none" stroke="#e2477a" stroke-width="3"/>
    <text x="${f1(180 - 80 * Math.sin(rad(i + a / 2)))}" y="${f1(214 - 80 * Math.cos(rad(i + a / 2)))}" class="sv-b" fill="#e2477a" text-anchor="middle">${a}°</text>
    ${mostrar ? `<path d="M180,${210 - 40} A40,40 0 0,0 ${arc(40, -1)}" fill="none" stroke="#1d6fb8" stroke-width="3"/>
    <path d="M180,${210 - 40} A40,40 0 0,1 ${arc(40, 1)}" fill="none" stroke="#21b5a5" stroke-width="3"/>
    <text x="${f1(180 - 54 * Math.sin(rad(i / 2)))}" y="${f1(214 - 54 * Math.cos(rad(i / 2)))}" class="sv-b" fill="#1d6fb8" text-anchor="middle">i=${i}°</text>
    <text x="${f1(180 + 54 * Math.sin(rad(i / 2)))}" y="${f1(214 - 54 * Math.cos(rad(i / 2)))}" class="sv-b" fill="#14907f" text-anchor="middle">r=${i}°</text>` :
    `<text x="${f1(180 + 58 * Math.sin(rad(i / 2)))}" y="${f1(214 - 58 * Math.cos(rad(i / 2)))}" class="sv-b" fill="#14907f" text-anchor="middle">r = ?</text>`}
    ${raio([A, [180, 210]], `marker-end="url(#${id})"`)}${raio([[180, 210], B], `marker-end="url(#${id})"`)}
    <text x="${f1(A[0])}" y="${f1(A[1] - 8)}" class="sv-t" text-anchor="middle">raio incidente</text><text x="${f1(B[0])}" y="${f1(B[1] - 8)}" class="sv-t" text-anchor="middle">raio refletido</text>
    <text x="40" y="244" class="sv-t">espelho</text>
  </svg>`;
}

/* ---------- espelhos esféricos ---------- */
function espSVG(tipo) {
  const conc = tipo === 'conc';
  const hx = conc ? [213.8, 220, 213.8] : [226.2, 220, 226.2], ys = [80, 130, 180];
  let s = `<svg viewBox="0 0 340 260" class="ilus" role="img" aria-label="Espelho ${conc ? 'côncavo' : 'convexo'}"><defs>${SETA('sE' + tipo)}</defs><rect width="340" height="260" rx="14" fill="#f3f7ff"/>
    <line x1="10" y1="130" x2="330" y2="130" stroke="#aab" stroke-dasharray="4 4"/>
    <path d="${conc ? 'M200,40 Q240,130 200,220' : 'M240,40 Q200,130 240,220'}" fill="none" stroke="${INK}" stroke-width="5"/>
    <path d="${conc ? 'M206,40 Q246,130 206,220' : 'M246,40 Q206,130 246,220'}" fill="none" stroke="#9aa" stroke-width="5" stroke-dasharray="2 4"/>`;
  ys.forEach((y, k) => { s += raio([[20, y], [hx[k], y]], `marker-end="url(#sE${tipo})"`); });
  if (conc) {
    s += raio([[213.8, 80], [60, 171.8]]) + raio([[213.8, 180], [60, 88.2]]) + raio([[220, 130], [60, 130]]);
    s += `<circle cx="130" cy="130" r="6" fill="#e2477a"/><text x="130" y="152" class="sv-b" text-anchor="middle" fill="#e2477a">F (real)</text><text x="170" y="250" class="sv-t" text-anchor="middle">os raios refletidos se JUNTAM no foco</text>`;
  } else {
    s += raio([[226.2, 80], [110, 10.6]]) + raio([[226.2, 180], [110, 249.4]]) + raio([[220, 130], [60, 130]]);
    s += `<g stroke="#e2477a" stroke-width="2" stroke-dasharray="5 4"><line x1="226.2" y1="80" x2="310" y2="130"/><line x1="226.2" y1="180" x2="310" y2="130"/></g>
      <circle cx="310" cy="130" r="6" fill="#e2477a"/><text x="304" y="156" class="sv-b" text-anchor="middle" fill="#e2477a">F (virtual)</text><text x="110" y="250" class="sv-t" text-anchor="middle">os raios se ESPALHAM → campo visual maior</text>`;
  }
  return s + '</svg>';
}

/* ---------- lentes ---------- */
function lenteSVG(tipo, rot = '') {
  const conv = tipo === 'conv', id = 'sL' + tipo + (rot ? 'q' : '');
  let s = `<svg viewBox="0 0 320 240" class="ilus" role="img" aria-label="Lente ${conv ? 'convergente' : 'divergente'}"><defs>${SETA(id)}</defs><rect width="320" height="240" rx="14" fill="#f3f7ff"/>
    <line x1="5" y1="120" x2="315" y2="120" stroke="#aab" stroke-dasharray="4 4"/>
    <path d="${conv ? 'M160,30 Q188,120 160,210 Q132,120 160,30 Z' : 'M146,30 L174,30 Q158,120 174,210 L146,210 Q162,120 146,30 Z'}" fill="#bfe3ff" stroke="${INK}" stroke-width="2.5" opacity=".95"/>`;
  [85, 120, 155].forEach(y => { s += raio([[10, y], [160, y]]); });
  if (conv) {
    s += raio([[160, 85], [318, 147.2]], `marker-end="url(#${id})"`) + raio([[160, 155], [318, 92.8]], `marker-end="url(#${id})"`) + raio([[160, 120], [318, 120]], `marker-end="url(#${id})"`);
    s += `<circle cx="250" cy="120" r="5" fill="#e2477a"/><text x="250" y="108" class="sv-b" text-anchor="middle" fill="#e2477a">F</text>`;
  } else {
    s += raio([[160, 85], [310, 26.7]], `marker-end="url(#${id})"`) + raio([[160, 155], [310, 213.3]], `marker-end="url(#${id})"`) + raio([[160, 120], [318, 120]], `marker-end="url(#${id})"`);
    s += `<g stroke="#e2477a" stroke-width="2" stroke-dasharray="5 4"><line x1="70" y1="120" x2="160" y2="85"/><line x1="70" y1="120" x2="160" y2="155"/></g><circle cx="70" cy="120" r="5" fill="#e2477a"/><text x="70" y="146" class="sv-b" text-anchor="middle" fill="#e2477a">F (virtual)</text>`;
  }
  s += `<text x="160" y="232" class="sv-t" text-anchor="middle">${rot || (conv ? 'bordas FINAS → junta os raios' : 'bordas GROSSAS → espalha os raios')}</text>`;
  return s + '</svg>';
}

/* ---------- O OLHO HUMANO (corte lateral) ----------
   op: modo normal|miopia|hiper|astig · oculos · luz 'longe'|'perto'|'objeto'|'nada' · lente fina|grossa · partes (clicável) */
function olhoSVG(op = {}) {
  const modo = op.modo || 'normal', luz = op.luz || 'longe', grossa = op.lente === 'grossa';
  const rx = { normal: 105, astig: 105, miopia: 120, hiper: 92 }[modo], cx = 175 + rx, ret = cx + rx;
  const id = 'sO' + Math.random().toString(36).slice(2, 7);
  let s = `<svg viewBox="0 0 520 300" class="ilus olho${op.partes ? ' clic' : ''}" role="img" aria-label="Corte do olho humano"><defs>${SETA(id)}
      <radialGradient id="${id}v" cx="45%" cy="45%" r="60%"><stop offset="0" stop-color="#fdfdf8"/><stop offset="1" stop-color="#e9eef2"/></radialGradient></defs>
    <rect width="520" height="300" rx="16" fill="#eef4fb"/>
    <g data-p="nervo" class="pt"><path d="M${ret - 6},132 C${ret + 30},132 ${ret + 60},150 515,160 L515,196 C${ret + 60},186 ${ret + 30},168 ${ret - 6},168 Z" fill="#f2d16b" stroke="${INK}" stroke-width="2"/></g>
    <g data-p="esclera" class="pt"><ellipse cx="${cx}" cy="150" rx="${rx}" ry="105" fill="#fff" stroke="${INK}" stroke-width="3"/></g>
    <g data-p="vitreo" class="pt"><ellipse cx="${cx + 4}" cy="150" rx="${rx - 12}" ry="93" fill="url(#${id}v)"/></g>
    <g data-p="retina" class="pt"><path d="M${cx + 10},${150 - 92} A${rx - 12},93 0 0,1 ${cx + 10},${150 + 92}" fill="none" stroke="#e2477a" stroke-width="8" stroke-linecap="round"/></g>
    <g data-p="cornea" class="pt"><path d="M186,82 Q132,150 186,218" fill="#cfeaff" fill-opacity=".7" stroke="#1d6fb8" stroke-width="4"/></g>
    <g data-p="iris" class="pt"><rect x="190" y="74" width="9" height="${op.pupila ? 150 - op.pupila - 74 : 36}" fill="#8a5a2b" stroke="${INK}" stroke-width="1.5"/><rect x="190" y="${op.pupila ? 150 + op.pupila : 190}" width="9" height="${op.pupila ? 226 - 150 - op.pupila : 36}" fill="#8a5a2b" stroke="${INK}" stroke-width="1.5"/></g>
    <g data-p="ciliares" class="pt"><ellipse cx="216" cy="${grossa ? 96 : 92}" rx="${grossa ? 13 : 9}" ry="${grossa ? 9 : 7}" fill="${grossa ? '#c0392b' : '#e48a7a'}" stroke="${INK}" stroke-width="1.5"/><ellipse cx="216" cy="${grossa ? 204 : 208}" rx="${grossa ? 13 : 9}" ry="${grossa ? 9 : 7}" fill="${grossa ? '#c0392b' : '#e48a7a'}" stroke="${INK}" stroke-width="1.5"/>
      <line x1="216" y1="${grossa ? 104 : 99}" x2="216" y2="110" stroke="${INK}" stroke-width="1"/><line x1="216" y1="${grossa ? 196 : 201}" x2="216" y2="190" stroke="${INK}" stroke-width="1"/></g>
    <g data-p="lente" class="pt"><ellipse cx="216" cy="150" rx="${grossa ? 20 : 11}" ry="40" fill="#d8f0ff" stroke="#1d6fb8" stroke-width="3"/></g>`;
  if (op.partes) s += `<g data-p="pupila" class="pt"><rect x="186" y="112" width="18" height="76" fill="#000" opacity=".01"/></g>`;

  /* raios */
  const y0s = [118, 150, 182];
  const foco = modo === 'miopia' ? (op.oculos ? ret : ret - 40) : modo === 'hiper' ? (op.oculos ? ret : ret + 50) : ret;
  const focos = modo === 'astig' && !op.oculos ? [ret - 45, ret, ret + 45] : [foco, foco, foco];
  if (luz !== 'nada') {
    let fonteX = 15;
    if (op.oculos && modo !== 'normal') {
      const tipo = modo === 'miopia' ? 'div' : modo === 'hiper' ? 'conv' : 'cil';
      s += tipo === 'cil' ? `<rect x="92" y="88" width="14" height="124" rx="7" fill="#e7d6ff" stroke="#7b4fd0" stroke-width="3"/>`
        : `<path d="${tipo === 'conv' ? 'M99,86 Q116,150 99,214 Q82,150 99,86 Z' : 'M89,86 L109,86 Q97,150 109,214 L89,214 Q101,150 89,86 Z'}" fill="#e7d6ff" stroke="#7b4fd0" stroke-width="3"/>`;
      s += `<text x="99" y="234" class="sv-b" text-anchor="middle" fill="#7b4fd0">${tipo === 'div' ? 'lente divergente' : tipo === 'conv' ? 'lente convergente' : 'lente cilíndrica'}</text>`;
      fonteX = 99;
      const k = modo === 'miopia' ? 1.22 : modo === 'hiper' ? .78 : 1;
      y0s.forEach(y => { s += raio([[15, y], [99, y]]); });
      y0s.forEach((y, i) => { const y1 = 150 + (y - 150) * k; s += raioOlho([99, y], [200, y1], focos[i], ret, id); });
    } else if (luz === 'perto') {
      s += `<g transform="translate(70,150)"><rect x="-14" y="-18" width="28" height="36" rx="3" fill="#fff" stroke="${INK}" stroke-width="2"/><path d="M-9,-10 H9 M-9,-3 H9 M-9,4 H9 M-9,11 H5" stroke="#555" stroke-width="2"/></g><text x="70" y="186" class="sv-t" text-anchor="middle">objeto perto</text>`;
      y0s.forEach((y, i) => { const y1 = 150 + (y - 150) * 1.05; s += raioOlho([84, 150], [200, y1], focos[i], ret, id); });
    } else if (luz === 'objeto') {
      const iy = 150 + 60 * ((ret - 216) / (216 - 40));
      s += `<line x1="40" y1="150" x2="40" y2="92" stroke="#2a9d3a" stroke-width="6" marker-end="url(#${id}g)"/><defs><marker id="${id}g" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2a9d3a"/></marker></defs>
        <text x="40" y="170" class="sv-t" text-anchor="middle">objeto</text>
        ${raio([[40, 90], [216, 150], [ret - 6, iy]])}${raio([[40, 90], [216, 90], [ret - 6, iy]])}
        <line x1="${ret - 8}" y1="150" x2="${ret - 8}" y2="${iy - 4}" stroke="#2a9d3a" stroke-width="6" marker-end="url(#${id}g)"/>
        <text x="${ret - 14}" y="${iy + 22}" class="sv-t" text-anchor="end" fill="#127a45">imagem real e INVERTIDA</text>`;
    } else {
      y0s.forEach(y => { s += raio([[15, y], [200, y]]); });
      y0s.forEach((y, i) => { s += raioOlho([200, y], [200, y], focos[i], ret, id); });
    }
    if (luz !== 'objeto') {
      const nitido = focos.every(f => Math.abs(f - ret) < 2);
      s += nitido ? `<circle cx="${ret - 6}" cy="150" r="6" fill="#2bb673" stroke="#fff" stroke-width="2"/>` : `<ellipse cx="${ret - 6}" cy="150" rx="7" ry="22" fill="#e5484d" opacity=".55"/>`;
      [...new Set(focos)].forEach(f => { if (Math.abs(f - ret) > 2) s += `<g stroke="#e5484d" stroke-width="3"><line x1="${f - 6}" y1="144" x2="${f + 6}" y2="156"/><line x1="${f - 6}" y1="156" x2="${f + 6}" y2="144"/></g>`; });
      s += `<text x="${ret}" y="282" class="sv-b" text-anchor="middle" fill="${nitido ? '#127a45' : '#b3261e'}">${nitido ? '✔ foco NA retina: imagem nítida' : modo === 'astig' ? '✖ vários focos: embaçado' : foco < ret ? '✖ foco ANTES da retina' : '✖ foco DEPOIS da retina'}</text>`;
    }
  }
  return s + '</svg>';
}
function raioOlho(p0, p1, fx, ret, id) {
  const [x1, y1] = p1, pts = p0[0] === x1 ? [] : [p0];
  pts.push([x1, y1]);
  if (fx <= ret) {
    const yr = 150 + (150 - y1) * (ret - 6 - fx) / (fx - x1);
    return raio([...pts, [fx, 150], [ret - 6, yr]]);
  }
  const yr = y1 + (150 - y1) * (ret - 6 - x1) / (fx - x1);
  return raio([...pts, [ret - 6, yr]]) + `<line x1="${f1(ret - 6)}" y1="${f1(yr)}" x2="${fx}" y2="150" stroke="${LUZ}" stroke-width="2.5" stroke-dasharray="4 4"/>`;
}

/* ---------- olho de frente (pupila) ---------- */
function olhoFrente(pr, claro) {
  return `<svg viewBox="0 0 300 170" class="ilus" role="img" aria-label="Olho visto de frente">
    <rect width="300" height="170" rx="14" fill="${mixCor('#1c2333', '#fff6d6', claro)}"/>
    <path d="M30,85 Q150,-5 270,85 Q150,175 30,85 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <circle cx="150" cy="85" r="50" fill="#5b8a3c"/><circle cx="150" cy="85" r="50" fill="none" stroke="#2f5a1c" stroke-width="3"/>
    ${Array.from({ length: 18 }, (_, k) => `<line x1="${f1(150 + Math.cos(k / 18 * 6.283) * (pr + 3))}" y1="${f1(85 + Math.sin(k / 18 * 6.283) * (pr + 3))}" x2="${f1(150 + Math.cos(k / 18 * 6.283) * 47)}" y2="${f1(85 + Math.sin(k / 18 * 6.283) * 47)}" stroke="#3d6a2a" stroke-width="1.5"/>`).join('')}
    <circle cx="150" cy="85" r="${f1(pr)}" fill="#0b0b0b"/><circle cx="${f1(150 + pr * .35)}" cy="${f1(85 - pr * .4)}" r="${f1(Math.max(3, pr * .25))}" fill="#fff" opacity=".85"/>
    <path d="M30,85 Q150,-5 270,85" fill="none" stroke="${INK}" stroke-width="5"/>
    <text x="236" y="40" class="sv-t" fill="${claro > .5 ? INK : '#fff'}">íris</text><text x="150" y="160" class="sv-t" text-anchor="middle" fill="${claro > .5 ? INK : '#fff'}">pupila: ${pr < 14 ? 'CONTRAÍDA (fechada)' : pr > 24 ? 'DILATADA (aberta)' : 'média'}</text>
  </svg>`;
}
const mixCor = (a, b, t) => { const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = h(a), B = h(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };

/* figuras das questões */
const FIG = {
  q1: () => reflexaoSVG(35, false, 'sQ1'),
  q8: () => `<div class="duo center"><div>${lenteSVG('conv', 'Lente I')}</div><div>${lenteSVG('div', 'Lente II')}</div></div>`,
  q13: () => `<div class="duo center"><div>${olhoSVG({ modo: 'hiper', luz: 'perto' })}<b>Paciente X (objeto próximo)</b></div><div>${olhoSVG({ modo: 'miopia' })}<b>Paciente Y (objeto distante)</b></div></div>`
};
