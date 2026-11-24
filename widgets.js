/* =========================================================
   WIDGETS INTERATIVOS
   ========================================================= */
const PARTES = {
  cornea: ['Córnea', 'Camada <b>transparente</b> da frente do olho. Faz a <b>primeira refração</b> da luz: funciona como uma <b>lente convergente fixa</b>.'],
  iris: ['Íris', 'A parte <b>colorida</b> do olho (é ela que define se o olho é castanho, verde ou azul). É um músculo que <b>controla o tamanho da pupila</b>.'],
  pupila: ['Pupila', 'O "buraquinho" preto no meio da íris, por onde a luz entra. <b>Contrai</b> no claro e <b>dilata</b> no escuro.'],
  lente: ['Lente (cristalino)', 'Lente <b>convergente e flexível</b>, logo atrás da pupila. Muda de formato para focar perto ou longe.'],
  ciliares: ['Músculos ciliares', 'Seguram a lente. <b>Contraem</b> para deixá-la mais curva (ver <b>de perto</b>) e <b>relaxam</b> para deixá-la fina (ver <b>de longe</b>).'],
  vitreo: ['Humor vítreo', 'Gel <b>transparente</b> que enche o olho e mantém seu formato. A luz o atravessa até a retina.'],
  retina: ['Retina', 'O "fundo" do olho, onde a imagem se forma <b>real e invertida</b> (de cabeça para baixo!). Tem os <b>cones</b> e os <b>bastonetes</b>.'],
  nervo: ['Nervo óptico', 'Leva a informação da retina até o <b>cérebro</b>, que interpreta a imagem e a "<b>desvira</b>".'],
  esclera: ['Esclera', 'A parte <b>branca</b> do olho, que protege o bulbo ocular.']
};

const WIDGETS = {
  reflexao(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🔦 Arraste para mudar o ângulo do raio com o espelho</span><input type="range" min="10" max="80" value="35" id="ra"><div id="rao"></div></div>`;
    const upd = () => {
      const a = +$('#ra', el).value;
      $('#rao', el).innerHTML = reflexaoSVG(a, true, 'sR1') + `<p class="msg">Com o <b style="color:#e2477a">espelho</b>: ${a}° · Com a <b>normal</b>: i = 90° − ${a}° = <b>${90 - a}°</b> → <b>r = ${90 - a}°</b>${a === 35 ? ' 👈 é a Questão 1!' : ''}</p>`;
    };
    $('#ra', el).oninput = upd; upd();
  },

  espelhoPlano(el) {
    let amb = false;
    el.innerHTML = `<div class="jogo"><span class="tag">🪞 Arraste: distância da pessoa até o espelho</span><input type="range" min="5" max="30" value="25" id="ed"><div id="edo"></div>
      <div class="row"><button class="btn sm ghost" id="amb">🚑 Ver a palavra AMBULÂNCIA no retrovisor</button></div><div id="ambo"></div></div>`;
    const upd = () => {
      const d = +$('#ed', el).value / 10, px = 170 - 16 - d * 45, w = 170 - px - 16;
      $('#edo', el).innerHTML = `<div class="plano"><div class="pp" style="left:${px}px">🧍</div><div class="espelho-v"></div><div class="pp img" style="left:${340 - px - 32}px">🧍</div>
        <div class="cota" style="left:${px + 16}px;width:${w}px">${d.toFixed(1).replace('.', ',')} m</div><div class="cota" style="left:170px;width:${w}px">${d.toFixed(1).replace('.', ',')} m</div></div>
        <p class="msg">Pessoa → espelho: <b>${d.toFixed(1).replace('.', ',')} m</b> · Espelho → imagem: <b>${d.toFixed(1).replace('.', ',')} m</b> · Pessoa → imagem: <b>${(2 * d).toFixed(1).replace('.', ',')} m</b></p>`;
    };
    const ambD = () => {
      $('#ambo', el).innerHTML = amb ? `<div class="amb"><div><small>pintado no capô</small><b class="inv">AMBULÂNCIA</b></div><i>🪞➜</i><div><small>no retrovisor do carro da frente</small><b>AMBULÂNCIA</b></div></div><p class="msg">O espelho plano <b>troca direita e esquerda</b>: é o <b>enantiomorfismo</b>.</p>` : '';
    };
    $('#ed', el).oninput = upd; $('#amb', el).onclick = () => { amb = !amb; ambD(); }; upd();
  },

  esfericos(el) {
    let t = 'conc';
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🥄 Côncavo ou convexo?</span>
        <div class="row"><button class="btn sm ${t === 'conc' ? 'on' : 'ghost'}" data-t="conc">🥣 Côncavo</button><button class="btn sm ${t === 'conv' ? 'on' : 'ghost'}" data-t="conv">🔮 Convexo</button></div>
        <div class="duo"><div>${espSVG(t)}</div><div class="ex-esp">${t === 'conc' ? '<span class="big-e">🦷</span><b>Espelho de dentista</b><p>Bem perto do dente, a imagem fica <b>virtual, direita e MAIOR</b>.</p><p class="colher">🥄 Dica: a parte de <b>dentro</b> de uma colher é côncava.</p>' : '<span class="big-e">🚌</span><b>Retrovisor de ônibus</b><p>Imagem <b>virtual, direita e MENOR</b>, mas mostra uma <b>área muito maior</b> (campo visual amplo).</p><p class="colher">🥄 Dica: a parte de <b>trás</b> de uma colher é convexa.</p>'}</div></div></div>`;
      $$('[data-t]', el).forEach(b => b.onclick = () => { t = b.dataset.t; draw(); });
    };
    draw();
  },

  espQuiz(el) {
    miniQuiz(el, '🪞 Qual espelho?', [
      ['🦷 Dentista examinando um dente ampliado', 1], ['🚌 Retrovisor externo de ônibus', 2], ['🏪 Espelho de vigilância no canto de uma loja', 2],
      ['💄 Espelho de maquiagem que aumenta o rosto', 1], ['🚑 Retrovisor interno do carro (lê "AMBULÂNCIA")', 0], ['🚗 Espelho na saída de garagem', 2], ['🧍 Espelho do guarda-roupa: mesmo tamanho', 0]
    ], ['Plano', 'Côncavo', 'Convexo']);
  },

  refracao(el) {
    const M = { agua: ['💧 Água', 1.33, '#7cc4f0'], vidro: ['🪟 Vidro', 1.55, '#b9e3e0'], diam: ['💎 Diamante', 2.42, '#d9d4ff'] };
    let m = 'agua';
    el.innerHTML = `<div class="jogo"><span class="tag">🌈 Escolha o material e o ângulo</span>
      <div class="row">${Object.keys(M).map(k => `<button class="btn sm ghost" data-m="${k}">${M[k][0]}</button>`).join('')}</div>
      <input type="range" min="0" max="80" value="60" id="ri"><div id="rio"></div></div>`;
    const upd = () => {
      const [nome, n, cor] = M[m], i = +$('#ri', el).value, r = Math.asin(Math.sin(rad(i)) / n) / rad(1), L = 115;
      const A = [160 - L * Math.sin(rad(i)), 120 - L * Math.cos(rad(i))], B = [160 + L * Math.sin(rad(r)), 120 + L * Math.cos(rad(r))], C = [160 + L * Math.sin(rad(i)), 120 + L * Math.cos(rad(i))];
      $$('[data-m]', el).forEach(b => b.className = 'btn sm ' + (b.dataset.m === m ? 'on' : 'ghost'));
      $('#rio', el).innerHTML = `<svg viewBox="0 0 320 245" class="ilus"><defs>${SETA('sRf')}</defs>
        <rect width="320" height="120" fill="#f3f7ff"/><rect y="120" width="320" height="125" fill="${cor}"/>
        <text x="10" y="20" class="sv-t">ar (n ≈ 1)</text><text x="10" y="238" class="sv-b">${nome.slice(2)} (n = ${String(n).replace('.', ',')})</text>
        <line x1="160" y1="5" x2="160" y2="240" stroke="${INK}" stroke-dasharray="6 5" stroke-width="2"/><text x="166" y="16" class="sv-b">N</text>
        <line x1="160" y1="120" x2="${f1(C[0])}" y2="${f1(C[1])}" stroke="#999" stroke-width="2" stroke-dasharray="3 4"/>
        ${raio([A, [160, 120]], 'marker-end="url(#sRf)"')}${raio([[160, 120], B], 'marker-end="url(#sRf)"')}
        <text x="${f1(160 - 40 * Math.sin(rad(i / 2)))}" y="${f1(112 - 40 * Math.cos(rad(i / 2)))}" class="sv-b" text-anchor="middle" fill="#1d6fb8">${i}°</text>
        <text x="${f1(160 + 52 * Math.sin(rad(r / 2)) + 8)}" y="${f1(132 + 52 * Math.cos(rad(r / 2)))}" class="sv-b" fill="#b3261e">${r.toFixed(0)}°</text>
      </svg>
      <div class="painel"><span>Ângulo no ar: <b>${i}°</b></span><span>Ângulo dentro: <b>${r.toFixed(0)}°</b></span><span>Desvio: <b>${(i - r).toFixed(0)}°</b></span><span>Velocidade: v = 3·10⁸ / ${String(n).replace('.', ',')} = <b>${(3 / n).toFixed(2).replace('.', ',')} · 10⁸ m/s</b></span></div>
      <p class="msg">${i === 0 ? 'Entrando <b>pela normal</b> (0°), a luz <b>muda de velocidade, mas não desvia</b>.' : 'O raio <b>se aproxima da normal</b> ao entrar num meio de n maior. A linha cinza mostra para onde ele iria sem desviar.'}</p>`;
    };
    $$('[data-m]', el).forEach(b => b.onclick = () => { m = b.dataset.m; upd(); });
    $('#ri', el).oninput = upd; upd();
  },

  peixe(el) {
    let real = false;
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🏹 Onde o peixe está de verdade?</span>
        <svg viewBox="0 0 340 230" class="ilus"><defs>${SETA('sPx')}</defs><rect width="340" height="95" fill="#fff4d6"/><rect y="95" width="340" height="135" fill="#6bb6e8"/>
          <path d="M0,95 Q42,89 85,95 T170,95 T255,95 T340,95" stroke="#2b7bb9" stroke-width="2" fill="none"/>
          <text x="40" y="60" font-size="34">🧑🏽</text><text x="70" y="30" class="sv-t">olho do pescador</text>
          ${raio([[230, 190], [180, 95], [70, 40]], 'marker-end="url(#sPx)"')}
          <line x1="180" y1="95" x2="250" y2="130" stroke="#b3261e" stroke-width="2" stroke-dasharray="5 4"/>
          <text x="236" y="140" font-size="26" opacity=".5">🐟</text><text x="232" y="122" class="sv-t" fill="#b3261e">peixe aparente (mais raso)</text>
          ${real ? '<text x="214" y="200" font-size="30">🐟</text><text x="200" y="224" class="sv-b" fill="#0b3d66">peixe REAL (mais fundo)</text>' : ''}
        </svg>
        <div class="row"><button class="btn sm" id="pr">${real ? '🙈 Esconder' : '👀 Mostrar o peixe de verdade'}</button></div>
        <p class="msg">${real ? 'A luz sai da <b>água (n = 1,33)</b> para o <b>ar</b>, <b>acelera e desvia</b>. O olho acha que ela veio em linha reta e vê o peixe <b>mais raso</b>. Por isso os <b>Calapalo</b> miram <b>abaixo</b>!' : 'O pescador vê o peixe aqui… mas será que ele está mesmo aí?'}</p></div>`;
      $('#pr', el).onclick = () => { real = !real; draw(); };
    };
    draw();
  },

  lentes(el) {
    let t = 'conv';
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🔍 Escolha a lente</span>
        <div class="row"><button class="btn sm ${t === 'conv' ? 'on' : 'ghost'}" data-t="conv">⬭ Convergente</button><button class="btn sm ${t === 'div' ? 'on' : 'ghost'}" data-t="div">⟩⟨ Divergente</button></div>
        <div class="lente-box">${lenteSVG(t)}</div>
        <div class="formas">${(t === 'conv' ? [['biconvexa', 'M20,4 Q34,30 20,56 Q6,30 20,4Z'], ['plano-convexa', 'M14,4 L20,4 Q34,30 20,56 L14,56Z'], ['côncavo-convexa', 'M16,4 Q30,30 16,56 Q22,30 16,4Z']] : [['bicôncava', 'M8,4 L32,4 Q20,30 32,56 L8,56 Q20,30 8,4Z'], ['plano-côncava', 'M10,4 L30,4 Q20,30 30,56 L10,56Z'], ['convexo-côncava', 'M10,4 L30,4 Q16,30 30,56 L10,56 Q4,30 10,4Z']]).map(([n, d]) => `<span><svg viewBox="0 0 40 60" width="34"><path d="${d}" fill="#bfe3ff" stroke="${INK}" stroke-width="2"/></svg>${n}</span>`).join('')}</div></div>`;
      $$('[data-t]', el).forEach(b => b.onclick = () => { t = b.dataset.t; draw(); });
    };
    draw();
  },

  olho(el) {
    let modo = 'partes';
    const draw = (info = '') => {
      el.innerHTML = `<div class="jogo"><span class="tag">👁️ O olho humano por dentro</span>
        <div class="row"><button class="btn sm ${modo === 'partes' ? 'on' : 'ghost'}" data-m="partes">🧩 Partes</button><button class="btn sm ${modo === 'imagem' ? 'on' : 'ghost'}" data-m="imagem">🔄 Formação da imagem</button></div>
        <div class="olho-box">${olhoSVG({ partes: modo === 'partes', luz: modo === 'imagem' ? 'objeto' : 'nada' })}</div>
        ${modo === 'partes' ? `<div class="chips">${Object.keys(PARTES).map(k => `<button class="chip" data-k="${k}">${PARTES[k][0]}</button>`).join('')}</div>` : ''}
        <p class="msg">${modo === 'imagem' ? 'Os raios atravessam a córnea e a lente e formam na retina uma imagem <b>real e INVERTIDA</b>, como numa câmara escura. O <b>cérebro</b> "desvira" a imagem.' : info || '👆 Toque numa parte do olho (ou nos nomes abaixo).'}</p>
        <p class="caminho">Caminho da luz: <b>córnea</b> → <b>pupila</b> → <b>lente</b> → <b>humor vítreo</b> → <b>retina</b> → <b>nervo óptico</b> → 🧠</p></div>`;
      $$('[data-m]', el).forEach(b => b.onclick = () => { modo = b.dataset.m; draw(); });
      const mostra = k => { draw(`<b>${PARTES[k][0]}</b>: ${PARTES[k][1]}`); $$(`.olho [data-p="${k}"]`, el).forEach(g => g.classList.add('on')); $$(`.chip[data-k="${k}"]`, el).forEach(g => g.classList.add('on')); };
      $$('.olho [data-p]', el).forEach(g => g.onclick = () => mostra(g.dataset.p));
      $$('.chip', el).forEach(b => b.onclick = () => mostra(b.dataset.k));
    };
    draw();
  },

  pupila(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🌑 ➜ ☀️ Arraste para mudar a luz do ambiente</span><input type="range" min="0" max="100" value="20" id="pl"><div id="plo"></div></div>`;
    const upd = () => {
      const k = +$('#pl', el).value / 100, pr = 32 - 24 * k;
      $('#plo', el).innerHTML = olhoFrente(pr, k) + `<p class="msg">${k > .7 ? '☀️ Muito claro: a <b>íris contrai</b> a pupila, que fica <b>pequena</b> → entra <b>menos luz</b> e a retina fica protegida.' : k < .3 ? '🌙 Escuro: a pupila <b>dilata</b> (fica grande) para entrar <b>mais luz</b>.' : 'Luz média: pupila média.'}</p>`;
    };
    $('#pl', el).oninput = upd; upd();
  },

  acomodacao(el) {
    let perto = false;
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🏔️📖 Para onde você está olhando?</span>
        <div class="row"><button class="btn sm ${!perto ? 'on' : 'ghost'}" id="al">🏔️ Longe (paisagem)</button><button class="btn sm ${perto ? 'on' : 'ghost'}" id="ap">📖 Perto (livro a 25 cm)</button></div>
        <div class="olho-box">${olhoSVG({ luz: perto ? 'perto' : 'longe', lente: perto ? 'grossa' : 'fina' })}</div>
        <p class="msg">${perto ? '📖 <b>Perto</b>: os <b>músculos ciliares CONTRAEM</b> (em vermelho forte) e a <b>lente fica mais curva</b>, convergindo mais a luz para focar na retina.' : '🏔️ <b>Longe</b>: os <b>músculos ciliares RELAXAM</b> e a <b>lente fica fina</b> (distendida). Os raios chegam quase paralelos.'}</p></div>`;
      $('#al', el).onclick = () => { perto = false; draw(); }; $('#ap', el).onclick = () => { perto = true; draw(); };
    };
    draw();
  },

  cones(el) {
    let m = 'claro';
    const C = { claro: { ma: '#d62828', fo: '#2a9d3a', ba: '#ffd23f', co: '#1d6fb8', bg: '#fff6d6', f: '' }, escuro: { ma: '#d62828', fo: '#2a9d3a', ba: '#ffd23f', co: '#1d6fb8', bg: '#fff6d6', f: 'grayscale(1) brightness(.42)' }, dalt: { ma: '#9a8a2a', fo: '#8a8a3a', ba: '#ffe14a', co: '#1d6fb8', bg: '#fff6d6', f: '' } };
    const T = { claro: '☀️ Com bastante luz, os <b>cones</b> funcionam: vemos todas as <b>cores</b>.', escuro: '🌙 Quase no escuro, só os <b>bastonetes</b> trabalham: vemos formas e movimentos, mas tudo em <b>tons de cinza</b>.', dalt: '🔴🟢 <b>Daltonismo</b> (simulação): sem um tipo de cone, o <b>vermelho e o verde</b> ficam parecidos. A maçã e a folha quase se confundem!' };
    const draw = () => {
      const c = C[m];
      el.innerHTML = `<div class="jogo"><span class="tag">🎨 Como o olho vê esta cena?</span>
        <div class="row"><button class="btn sm ${m === 'claro' ? 'on' : 'ghost'}" data-m="claro">☀️ Claro</button><button class="btn sm ${m === 'escuro' ? 'on' : 'ghost'}" data-m="escuro">🌙 Quase escuro</button><button class="btn sm ${m === 'dalt' ? 'on' : 'ghost'}" data-m="dalt">🔴🟢 Daltonismo</button></div>
        <svg viewBox="0 0 320 170" class="ilus" style="filter:${c.f};transition:filter .4s"><rect width="320" height="170" rx="14" fill="${c.bg}"/><rect y="120" width="320" height="50" fill="#b07a4a"/>
          <circle cx="80" cy="96" r="30" fill="${c.ma}"/><path d="M80,66 q2,-12 8,-16" stroke="#5a3a1a" stroke-width="4" fill="none"/><ellipse cx="96" cy="56" rx="14" ry="7" fill="${c.fo}" transform="rotate(-25 96 56)"/>
          <path d="M140,110 Q170,60 210,74 Q180,84 160,120 Z" fill="${c.ba}" stroke="#a08000" stroke-width="2"/>
          <path d="M236,74 L286,74 L280,124 L242,124 Z" fill="${c.co}"/><path d="M286,86 q18,4 0,24" stroke="${c.co}" stroke-width="6" fill="none"/>
          <circle cx="40" cy="30" r="10" fill="${c.ma}"/><circle cx="64" cy="30" r="10" fill="${c.fo}"/><text x="78" y="34" class="sv-t">semáforo</text></svg>
        <p class="msg">${T[m]}</p></div>`;
      $$('[data-m]', el).forEach(b => b.onclick = () => { m = b.dataset.m; draw(); });
    };
    draw();
  },

  defeitos(el) {
    let modo = 'normal', oc = false;
    const N = { normal: '😀 Normal', miopia: '🔭 Miopia', hiper: '📖 Hipermetropia', astig: '🏉 Astigmatismo' };
    const D = {
      normal: 'O foco cai <b>exatamente na retina</b>: imagem nítida de longe e de perto.',
      miopia: oc ? 'A <b>lente divergente</b> espalha um pouco os raios e o foco <b>volta para a retina</b>. 😎' : 'Olho <b>mais comprido</b>: o foco fica <b>ANTES da retina</b>. A pessoa vê mal <b>de longe</b>.',
      hiper: oc ? 'A <b>lente convergente</b> ajuda a juntar os raios e o foco <b>volta para a retina</b>. 😎 (A presbiopia, a "vista cansada", também usa lente convergente.)' : 'Olho <b>mais curto</b>: o foco ficaria <b>DEPOIS da retina</b>. A pessoa vê mal <b>de perto</b>.',
      astig: oc ? 'A <b>lente cilíndrica</b> compensa a curvatura irregular e junta os focos na retina. 😎' : 'Córnea <b>ovalada</b> (como bola de rugby): <b>vários focos</b>. Fica embaçado <b>de perto e de longe</b>.'
    };
    const ver = () => {
      const bl = (longe) => { if (oc || modo === 'normal') return 0; if (modo === 'astig') return 2.2; return (modo === 'miopia') === longe ? 3.5 : 0; };
      return `<div class="visao"><div><small>👀 placa lá longe</small><div class="placa" style="filter:blur(${bl(true)}px)">🚏 PONTO DE ÔNIBUS</div></div><div><small>👀 caderno de perto</small><div class="caderno" style="filter:blur(${bl(false)}px)">Óptica: i = r<br>n = c / v</div></div></div>`;
    };
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">👓 Clínica de oftalmologia</span>
        <div class="row">${Object.keys(N).map(k => `<button class="btn sm ${modo === k ? 'on' : 'ghost'}" data-m="${k}">${N[k]}</button>`).join('')}</div>
        <div class="olho-box">${olhoSVG({ modo, oculos: oc })}</div>
        ${modo !== 'normal' ? `<div class="row"><button class="btn ${oc ? 'alt' : ''}" id="oc">${oc ? '❌ Tirar os óculos' : '👓 Colocar os óculos'}</button></div>` : ''}
        <p class="msg">${D[modo]}</p>${ver()}</div>`;
      $$('[data-m]', el).forEach(b => b.onclick = () => { modo = b.dataset.m; oc = false; draw(); });
      $('#oc', el) && ($('#oc', el).onclick = () => { oc = !oc; draw(); });
    };
    draw();
  },

  visaoQuiz(el) {
    miniQuiz(el, '👓 Qual lente corrige?', [
      ['Miopia: foco antes da retina', 1], ['Hipermetropia: foco depois da retina', 0], ['Astigmatismo: vários focos', 2], ['Presbiopia ("vista cansada")', 0],
      ['Não consegue ler a lousa do fundo da sala', 1, 'Vê mal de longe = miopia.'], ['Vovó afasta o celular para ler', 0, 'Presbiopia.'], ['Córnea em formato de bola de rugby', 2]
    ], ['🔍 Convergente', '👓 Divergente', '🥫 Cilíndrica']);
  },

  lupaProj(el) {
    let t = 'lupa';
    const S = {
      lupa: `<svg viewBox="0 0 340 200" class="ilus"><rect width="340" height="200" rx="14" fill="#f3f7ff"/><line x1="10" y1="130" x2="330" y2="130" stroke="#aab" stroke-dasharray="4 4"/>
        <path d="M200,62 Q222,130 200,198 Q178,130 200,62Z" fill="#bfe3ff" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="140" cy="130" r="4" fill="#e2477a"/><text x="140" y="150" class="sv-t" text-anchor="middle" fill="#e2477a">F</text>
        <line x1="170" y1="130" x2="170" y2="104" stroke="#2a9d3a" stroke-width="5"/><text x="170" y="98" class="sv-t" text-anchor="middle">objeto</text>
        <line x1="96" y1="130" x2="96" y2="50" stroke="#2a9d3a" stroke-width="5" stroke-dasharray="6 4" opacity=".6"/><text x="96" y="44" class="sv-t" text-anchor="middle">imagem virtual</text>
        <text x="300" y="130" font-size="30">👁️</text><text x="90" y="190" class="sv-b" fill="#127a45">VIRTUAL, DIREITA e MAIOR</text></svg>`,
      proj: `<svg viewBox="0 0 340 200" class="ilus"><rect width="340" height="200" rx="14" fill="#1c2333"/><line x1="10" y1="100" x2="300" y2="100" stroke="#556" stroke-dasharray="4 4"/>
        <text x="8" y="112" font-size="28">💡</text><rect x="58" y="80" width="6" height="40" fill="#aaa"/><text x="62" y="140" class="sv-t" text-anchor="middle" fill="#fff">slide</text><line x1="61" y1="100" x2="61" y2="86" stroke="#7fe07f" stroke-width="4"/>
        <path d="M110,60 Q126,100 110,140 Q94,100 110,60Z" fill="#bfe3ff" stroke="#fff" stroke-width="2"/><text x="110" y="156" class="sv-t" text-anchor="middle" fill="#fff">lente</text>
        <polygon points="61,90 61,110 300,175 300,25" fill="#ffd23f" opacity=".12"/>
        <rect x="300" y="20" width="10" height="160" fill="#eee"/><text x="305" y="196" class="sv-t" text-anchor="middle" fill="#fff">tela</text>
        <line x1="296" y1="100" x2="296" y2="160" stroke="#7fe07f" stroke-width="6"/><polygon points="290,160 302,160 296,172" fill="#7fe07f"/>
        <text x="160" y="40" font-size="20">🌀</text><text x="160" y="58" class="sv-t" fill="#fff">ventilador</text><text x="130" y="190" class="sv-b" fill="#ffd23f">REAL, INVERTIDA e MAIOR</text></svg>`
    };
    const draw = () => {
      el.innerHTML = `<div class="jogo"><span class="tag">🔍 Mesma lente convergente, imagens diferentes</span>
        <div class="row"><button class="btn sm ${t === 'lupa' ? 'on' : 'ghost'}" data-t="lupa">🔍 Lupa</button><button class="btn sm ${t === 'proj' ? 'on' : 'ghost'}" data-t="proj">📽️ Projetor</button></div>
        ${S[t]}<p class="msg">${t === 'lupa' ? '🔍 Objeto <b>entre o foco e a lente</b>: o olho vê uma imagem <b>virtual, direita e maior</b> (não dá para projetar numa tela).' : '📽️ A lâmpada ilumina o slide e a lente forma na tela uma imagem <b>real, invertida e maior</b>. Por isso o slide é colocado <b>de cabeça para baixo</b>!'}</p></div>`;
      $$('[data-t]', el).forEach(b => b.onclick = () => { t = b.dataset.t; draw(); });
    };
    draw();
  },

  microscopio(el) {
    let a1 = 40, a2 = 15;
    const draw = () => {
      const tot = a1 * a2, r = Math.min(70, 3 + tot / 14);
      el.innerHTML = `<div class="jogo"><span class="tag">🔬 Escolha as lentes</span>
        <p class="center"><b>Objetiva (A₁):</b></p><div class="row">${[4, 10, 40, 100].map(v => `<button class="btn sm ${a1 === v ? 'on' : 'ghost'}" data-a="${v}">${v}×</button>`).join('')}</div>
        <p class="center"><b>Ocular (A₂):</b></p><div class="row">${[5, 10, 15].map(v => `<button class="btn sm ${a2 === v ? 'on' : 'ghost'}" data-o="${v}">${v}×</button>`).join('')}</div>
        <div class="micro"><svg viewBox="0 0 160 160" class="ilus" style="max-width:190px"><circle cx="80" cy="80" r="76" fill="#f4fbe9" stroke="${INK}" stroke-width="5"/>
          <clipPath id="cMi"><circle cx="80" cy="80" r="73"/></clipPath><g clip-path="url(#cMi)"><rect x="${f1(80 - r * 1.2)}" y="${f1(80 - r * .45)}" width="${f1(r * 2.4)}" height="${f1(r * .9)}" rx="${f1(r * .45)}" fill="#7fbf5a" stroke="#3d7a22" stroke-width="2"/>
          ${r > 20 ? `<path d="M${f1(80 + r * 1.2)},80 q${f1(r * .3)},-${f1(r * .3)} ${f1(r * .6)},0 t${f1(r * .6)},0" stroke="#3d7a22" stroke-width="2" fill="none"/>` : ''}</g></svg>
          <div class="formula"><b>${a1} × ${a2} = ${tot}×</b><small>aumento total = A₁ × A₂</small>${a1 === 40 && a2 === 15 ? '<p>👈 é a Questão 16!</p>' : ''}</div></div>
        <p class="msg">⚠️ Os aumentos se <b>MULTIPLICAM</b>. Somar (${a1} + ${a2} = ${a1 + a2}) está errado!</p></div>`;
      $$('[data-a]', el).forEach(b => b.onclick = () => { a1 = +b.dataset.a; draw(); });
      $$('[data-o]', el).forEach(b => b.onclick = () => { a2 = +b.dataset.o; draw(); });
    };
    draw();
  }
};

function initWidgets(root) {
  $$('[data-w]', root).forEach(el => WIDGETS[el.dataset.w] && WIDGETS[el.dataset.w](el));
}
