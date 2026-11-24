/* =========================================================
   APP — navegação, questões e relatório de erros
   ========================================================= */
const WHATSAPP = '5585992621003';           // (85) 99262-1003
const LS_KEY = CONFIG.lsKey;
const LETRAS = ['A', 'B', 'C', 'D'];
const MODS = Object.keys(MODULOS);

/* ---------- estado salvo no aparelho do aluno ---------- */
let S = (() => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; } })();
S.aluno = S.aluno || { nome: '', turma: '' };
S.r = S.r || {}; S.pos = S.pos || {};
MODS.forEach(m => { S.r[m] = S.r[m] || {}; S.pos[m] = S.pos[m] || 0; });
const save = () => localStorage.setItem(LS_KEY, JSON.stringify(S));

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };

/* quiz genérico dos mini-jogos */
function miniQuiz(el, titulo, itens, botoes) {
  let i = 0, ok = 0;
  const draw = (msg = '') => {
    if (i >= itens.length) {
      el.innerHTML = `<div class="jogo"><span class="tag">${titulo}</span><p class="placarj">🎉 Você acertou <b>${ok} de ${itens.length}</b>!</p><p class="msg">${msg}</p><div class="row"><button class="btn sm" id="jr">Jogar de novo</button></div></div>`;
      $('#jr', el).onclick = () => { i = 0; ok = 0; draw(); }; return;
    }
    el.innerHTML = `<div class="jogo"><span class="tag">${titulo} (${i + 1}/${itens.length})</span>
      <div class="var">${itens[i][0]}</div>
      <div class="row">${botoes.map((b, k) => `<button class="btn sm" data-v="${k}">${b}</button>`).join('')}</div><p class="msg">${msg}</p></div>`;
    $$('[data-v]', el).forEach(b => b.onclick = () => {
      const k = +b.dataset.v, it = itens[i], acertou = k === it[1];
      if (acertou) ok++;
      i++; draw((acertou ? '✅ Isso! ' : `❌ Era <b>${botoes[it[1]]}</b>. `) + (it[2] || ''));
    });
  };
  draw();
}

/* =========================================================
   ESTATÍSTICAS
   ========================================================= */
function stats(m) {
  const qs = MODULOS[m].questoes, porTopico = MODULOS[m].topicos.map(() => ({ ok: 0, n: 0 }));
  let resp = 0, acertos = 0; const erros = [];
  qs.forEach((q, i) => {
    const r = S.r[m][i];
    if (r && r.p !== undefined) {
      resp++; porTopico[q.t].n++;
      if (r.p === q.c) { acertos++; porTopico[q.t].ok++; } else erros.push(i);
    }
  });
  return { total: qs.length, resp, acertos, erros, porTopico, pct: resp ? Math.round(acertos / resp * 100) : 0 };
}

/* =========================================================
   TELAS
   ========================================================= */
const app = () => $('#app');

function header(extra = '') {
  return `<header class="top"><a href="#" class="logo"><span class="selo">${CONFIG.serie}</span><span><b>Mentoria Educacional Promover</b><small>${CONFIG.area} · ${CONFIG.serieLonga}</small></span></a>${extra}</header>`;
}

function renderHome() {
  const totalQ = MODS.reduce((a, m) => a + MODULOS[m].questoes.length, 0);
  const cards = MODS.map(m => {
    const mod = MODULOS[m], s = stats(m), prog = Math.round(s.resp / s.total * 100);
    return `<article class="mod ${m}">
      <div class="mod-top"><span class="emoji">${mod.emoji}</span><div class="anel" style="--p:${prog}"><span>${s.resp}/${s.total}</span></div></div>
      <h2>${mod.titulo}</h2><p class="sub">${mod.sub}</p>
      <ul class="tops">${mod.topicos.map((t, i) => `<li><a href="#${m}/t/${i}">${i + 1}. ${t}</a></li>`).join('')}</ul>
      <details class="rr"><summary>⚡ Revisão relâmpago</summary><ul>${mod.resumo.map(x => `<li>${x}</li>`).join('')}</ul></details>
      <div class="row"><a class="btn" href="#${m}/t">📖 Teoria ilustrada</a><a class="btn alt" href="#${m}/q">✍️ ${s.total} questões</a></div>
      ${s.resp ? `<p class="mini-score">Acertos na 1ª tentativa: <b>${s.acertos}/${s.resp}</b></p>` : ''}
    </article>`;
  }).join('');
  app().innerHTML = header() + `
    <section class="hero">
      <div class="hero-txt"><p class="kicker">${CONFIG.kicker}</p>
      <h1>${CONFIG.titulo}</h1>
      <p>${CONFIG.texto}</p>
      <form class="aluno" onsubmit="return false">
        <span class="fita"></span><b>Quem está estudando?</b>
        <label>Seu nome<input id="nome" value="${esc(S.aluno.nome)}" placeholder="Digite seu nome completo" autocomplete="name"></label>
        <label>Turma<input id="turma" value="${esc(S.aluno.turma)}" placeholder="Ex.: ${CONFIG.serie} A"></label>
        <small>Fica salvo só neste aparelho.</small>
      </form></div>
      <div class="hero-ilus">${olhoSVG({ luz: 'objeto' })}<p class="dica-p">A imagem se forma <b>de cabeça para baixo</b> na retina, e o cérebro desvira!</p></div>
    </section>
    <section class="passos"><span>1 ⚡ Revisão relâmpago</span><span>2 📖 Teoria ilustrada</span><span>3 ✍️ ${totalQ} questões</span><span>4 💬 Envie no WhatsApp</span></section>
    <section class="mods${MODS.length === 1 ? ' um' : ''}">${cards}</section>
    <a class="btn relat" href="#relatorio">📋 Ver meu relatório de erros</a>`;
  $('#nome').oninput = e => { S.aluno.nome = e.target.value; save(); };
  $('#turma').oninput = e => { S.aluno.turma = e.target.value; save(); };
}

function renderModulo(m, tab, arg) {
  const mod = MODULOS[m];
  app().innerHTML = header(`<a href="#relatorio" class="btn sm ghost">📋 Relatório</a>`) + `
    <div class="mhead ${m}"><a href="#" class="voltar">← Início</a><h1>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h1>
      <nav class="tabs"><a href="#${m}/t" class="${tab === 't' ? 'on' : ''}">📖 Teoria</a><a href="#${m}/q" class="${tab === 'q' ? 'on' : ''}">✍️ Questões</a>
      ${MODS.filter(x => x !== m).map(x => `<a href="#${x}/t" class="outra">${MODULOS[x].emoji} ${MODULOS[x].titulo}</a>`).join('')}</nav></div>
    <main id="main" class="${m}"></main>`;
  if (tab === 'q') { if (arg !== undefined && !isNaN(+arg)) { S.pos[m] = +arg; save(); } renderQuestao(m); }
  else renderTeoria(m, arg);
}

function renderTeoria(m, foco) {
  const mod = MODULOS[m], main = $('#main');
  main.innerHTML = `<nav class="indice">${mod.topicos.map((t, i) => `<a href="#${m}/t/${i}">${i + 1}. ${t}</a>`).join('')}</nav>
    <section class="relampago"><b>⚡ Revisão de 1 minuto</b><ul>${mod.resumo.map(x => `<li>${x}</li>`).join('')}</ul></section>` +
    TEORIA[m].map((fn, i) => {
      const primeira = mod.questoes.findIndex(q => q.t === i), qtd = mod.questoes.filter(q => q.t === i).length;
      return `<section class="topico" id="top-${i}"><span class="num">${i + 1}</span><h2>${mod.topicos[i]}</h2>${fn()}
        ${qtd ? `<a class="btn alt pratica" href="#${m}/q/${primeira}">✍️ Praticar este tópico (${qtd} ${qtd > 1 ? 'questões' : 'questão'}) →</a>` : ''}</section>`;
    }).join('');
  initWidgets(main);
  if (foco !== undefined) setTimeout(() => { const t = $('#top-' + foco); t && t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
}

function renderQuestao(m) {
  const mod = MODULOS[m], i = Math.min(S.pos[m] || 0, mod.questoes.length - 1), q = mod.questoes[i];
  const r = S.r[m][i] || {}, feito = r.u !== undefined, s = stats(m);
  const dotsNav = mod.questoes.map((qq, k) => {
    const rr = S.r[m][k]; let c = '';
    if (rr && rr.u !== undefined) c = rr.u === qq.c ? (rr.p === qq.c ? 'ok' : 'fix') : 'err';
    else if (rr && rr.p !== undefined) c = 'err';
    return `<button class="qd ${c} ${k === i ? 'cur' : ''}" data-k="${k}" aria-label="Questão ${k + 1}">${k + 1}</button>`;
  }).join('');
  const ops = q.ops.map((o, k) => {
    let c = '';
    if (feito) { if (k === q.c) c = 'certa'; else if (k === r.u) c = 'errada'; else c = 'apagada'; }
    return `<button class="op ${c}" data-o="${k}" ${feito ? 'disabled' : ''}><span class="let">${LETRAS[k]}</span><span>${o}</span></button>`;
  }).join('');
  const acertou = feito && r.u === q.c;
  const fb = !feito ? '' : `<div class="fb ${acertou ? 'sim' : 'nao'}">
      <b>${acertou ? (r.p === q.c ? '🎉 Acertou de primeira!' : '💪 Agora sim! (conta como erro no relatório, mas você aprendeu)') : `😕 Não foi dessa vez. A resposta certa é a <span class="let">${LETRAS[q.c]}</span>.`}</b>
      <div class="exp"><span class="tag">🧑‍🏫 Explicação</span><p>${q.exp}</p></div>
      ${acertou ? '' : `<a class="link" href="#${m}/t/${q.t}">📖 Rever a teoria: ${mod.topicos[q.t]}</a>`}
    </div>`;
  const todas = s.resp === s.total;
  const temErradas = mod.questoes.some((qq, k) => S.r[m][k] && S.r[m][k].u !== undefined && S.r[m][k].u !== qq.c);
  const prox = MODS[MODS.indexOf(m) + 1];
  $('#main').innerHTML = `
    <div class="qnav">${dotsNav}</div>
    <p class="legenda"><i class="ok"></i>acertou <i class="fix"></i>corrigiu <i class="err"></i>errou</p>
    <article class="qcard">
      <div class="qmeta"><span class="qn">Questão ${i + 1}<small>/${mod.questoes.length}</small></span><span class="pill">${mod.topicos[q.t]}</span></div>
      <div class="enun">${q.txt}</div>
      ${q.fig ? `<div class="fig">${FIG[q.fig]()}</div>` : ''}
      ${!feito ? `<details class="dica"><summary>💡 Preciso de uma dica</summary><p>${q.dica}</p></details>` : ''}
      <div class="ops">${ops}</div>
      ${fb}
      <div class="row nav">
        <button class="btn ghost" id="ant" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
        ${i < mod.questoes.length - 1 ? `<button class="btn" id="prox">Próxima →</button>` : `<a class="btn" href="#relatorio">📋 Ver relatório</a>`}
      </div>
    </article>
    ${todas ? `<div class="fim"><b>🏁 Você respondeu todas as questões de ${mod.titulo}!</b><p>Acertos na 1ª tentativa: <b>${s.acertos}/${s.total}</b> (${s.pct}%).</p>
      <div class="row">${temErradas ? `<button class="btn alt" id="refazer">🔁 Refazer só as que errei</button>` : ''}${prox ? `<a class="btn alt" href="#${prox}/q">${MODULOS[prox].emoji} Ir para ${MODULOS[prox].titulo}</a>` : ''}<a class="btn" href="#relatorio">📋 Ver e enviar relatório</a></div></div>` : ''}
    <p class="reset"><button class="linkbtn" id="zerar">Apagar respostas deste módulo e recomeçar</button></p>`;

  $$('.qd').forEach(b => b.onclick = () => { S.pos[m] = +b.dataset.k; save(); renderQuestao(m); scrollTo({ top: 0, behavior: 'smooth' }); });
  $$('.op:not([disabled])').forEach(b => b.onclick = () => {
    const k = +b.dataset.o, rr = S.r[m][i] || {};
    if (rr.p === undefined) rr.p = k;
    rr.u = k; rr.n = (rr.n || 0) + 1; S.r[m][i] = rr; save();
    renderQuestao(m);
    const f = $('.fb'); f && f.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (k === q.c) estrelas();
  });
  const go = d => { S.pos[m] = i + d; save(); renderQuestao(m); scrollTo({ top: 0, behavior: 'smooth' }); };
  $('#ant') && ($('#ant').onclick = () => go(-1));
  $('#prox') && ($('#prox').onclick = () => go(1));
  $('#refazer') && ($('#refazer').onclick = () => {
    let primeira = null;
    mod.questoes.forEach((qq, k) => { const rr = S.r[m][k]; if (rr && rr.u !== qq.c) { delete rr.u; if (primeira === null) primeira = k; } });
    S.pos[m] = primeira || 0; save(); renderQuestao(m); scrollTo({ top: 0 });
  });
  $('#zerar').onclick = () => { if (confirm('Apagar todas as respostas de ' + mod.titulo + '?')) { S.r[m] = {}; S.pos[m] = 0; save(); renderQuestao(m); } };
}

function estrelas() {
  const box = document.createElement('div'); box.className = 'estrelas';
  box.innerHTML = Array.from({ length: 14 }, (_, k) => `<i style="--x:${Math.cos(k / 14 * 6.28) * 140}px;--y:${Math.sin(k / 14 * 6.28) * 140}px">${['⭐', '✨', '🌟'][k % 3]}</i>`).join('');
  document.body.appendChild(box); setTimeout(() => box.remove(), 1000);
}

/* ---------------- RELATÓRIO ---------------- */
function textoRelatorio() {
  const d = new Date().toLocaleDateString('pt-BR');
  let t = `*RELATÓRIO DE ESTUDO – ${CONFIG.serieLonga.toUpperCase()}*\nMentoria Educacional Promover · ${CONFIG.area}\n\n👤 Aluno(a): ${S.aluno.nome || '(sem nome)'}\n🏫 Turma: ${S.aluno.turma || '-'}\n📅 Data: ${d}\n`;
  const revisar = [];
  MODS.forEach(m => {
    const mod = MODULOS[m], s = stats(m);
    t += `\n*${mod.titulo}*\n`;
    if (!s.resp) { t += 'Ainda não respondeu.\n'; return; }
    t += `Respondidas: ${s.resp}/${s.total}\n✅ Acertos de 1ª: ${s.acertos}/${s.resp} (${s.pct}%)\n`;
    if (s.erros.length) {
      t += `❌ Erros (${s.erros.length}):\n`;
      s.erros.forEach(i => {
        const q = mod.questoes[i], r = S.r[m][i];
        t += `• Q${i + 1} (${mod.topicos[q.t]}): marcou ${LETRAS[r.p]}, certa ${LETRAS[q.c]}${r.u === q.c ? ' – corrigiu depois' : ''}\n`;
      });
    } else t += '🎉 Nenhum erro!\n';
    s.porTopico.forEach((p, k) => { if (p.n && p.ok / p.n < 0.7) revisar.push(mod.topicos[k]); });
  });
  if (revisar.length) t += `\n📌 *Preciso revisar:*\n${revisar.map(x => '• ' + x).join('\n')}\n`;
  return t;
}

function renderRelatorio() {
  const total = MODS.reduce((a, m) => { const s = stats(m); a.r += s.resp; a.a += s.acertos; a.t += s.total; return a; }, { r: 0, a: 0, t: 0 });
  const bloco = m => {
    const mod = MODULOS[m], s = stats(m);
    if (!s.resp) return `<section class="rbloco ${m}"><h2>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h2><p class="vazio">Você ainda não respondeu nenhuma questão. <a href="#${m}/q">Começar agora →</a></p></section>`;
    return `<section class="rbloco ${m}">
      <h2>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h2>
      <div class="placar"><div class="nota"><b>${s.acertos}</b><span>de ${s.resp} respondidas</span></div><div class="nota"><b>${s.pct}%</b><span>acertos de 1ª</span></div><div class="nota"><b>${s.total - s.resp}</b><span>sem responder</span></div></div>
      <div class="barras">${mod.topicos.map((t, k) => { const p = s.porTopico[k], pc = p.n ? Math.round(p.ok / p.n * 100) : 0; return `<div class="bt"><span>${t}</span><div class="trilho"><div style="width:${pc}%;background:${!p.n ? '#ccc' : pc >= 70 ? '#2bb673' : pc >= 40 ? '#ffb000' : '#e5484d'}"></div></div><em>${p.n ? `${p.ok}/${p.n}` : '–'}</em>${p.n && pc < 70 ? `<a href="#${m}/t/${k}" class="rev no-print">revisar</a>` : ''}</div>`; }).join('')}</div>
      ${s.erros.length ? `<h3>❌ Questões que errei</h3><ol class="erros">${s.erros.map(i => {
        const q = mod.questoes[i], r = S.r[m][i];
        return `<li><div class="eh"><b>Questão ${i + 1}</b><span class="pill">${mod.topicos[q.t]}</span>${r.u === q.c ? '<span class="pill verde">corrigi depois ✔</span>' : ''}</div>
          <p class="eq">${strip(q.txt).slice(0, 170)}${strip(q.txt).length > 170 ? '…' : ''}</p>
          <p class="cmp"><span class="m">Marquei: <b>${LETRAS[r.p]}</b> ${q.ops[r.p]}</span><span class="c">Certa: <b>${LETRAS[q.c]}</b> ${q.ops[q.c]}</span></p>
          <details><summary>Ver explicação</summary><p>${q.exp}</p></details></li>`;
      }).join('')}</ol>` : '<p class="parabens">🎉 Nenhum erro nas questões respondidas!</p>'}
    </section>`;
  };
  const txt = textoRelatorio();
  app().innerHTML = header(`<a href="#" class="btn sm ghost">← Início</a>`) + `
    <section class="rel-capa">
      <p class="kicker">Relatório de erros · ${CONFIG.area} · ${CONFIG.serieLonga}</p>
      <h1>${S.aluno.nome ? esc(S.aluno.nome) : 'Aluno(a) sem nome'}</h1>
      <p>${S.aluno.turma ? 'Turma ' + esc(S.aluno.turma) + ' · ' : ''}${new Date().toLocaleDateString('pt-BR')} · ${total.r}/${total.t} questões respondidas · ${total.a} acertos de 1ª</p>
      <div class="aluno inline no-print"><label>Nome<input id="nome" value="${esc(S.aluno.nome)}" placeholder="Seu nome"></label><label>Turma<input id="turma" value="${esc(S.aluno.turma)}" placeholder="${CONFIG.serie} A"></label></div>
    </section>
    ${MODS.map(bloco).join('')}
    <section class="enviar no-print">
      <h2>💬 Enviar para o professor</h2>
      <p>O WhatsApp vai abrir com a mensagem pronta para <b>(85) 99262-1003</b>. É só tocar em enviar.</p>
      <pre class="previa">${esc(txt)}</pre>
      <div class="row"><a class="btn whats" id="wpp" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">📲 Enviar pelo WhatsApp</a>
      <button class="btn ghost" id="copiar">📋 Copiar texto</button><button class="btn ghost" onclick="print()">🖨️ Imprimir / PDF</button></div>
      <p class="msg" id="cmsg"></p>
    </section>`;
  const upd = () => {
    save();
    const t = textoRelatorio();
    $('.previa').textContent = t;
    $('#wpp').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
    $('.rel-capa h1').textContent = S.aluno.nome || 'Aluno(a) sem nome';
  };
  $('#nome').oninput = e => { S.aluno.nome = e.target.value; upd(); };
  $('#turma').oninput = e => { S.aluno.turma = e.target.value; upd(); };
  $('#wpp').onclick = e => { upd(); if (!S.aluno.nome.trim()) { e.preventDefault(); $('#cmsg').innerHTML = '⚠️ Escreva seu nome lá em cima antes de enviar.'; $('#nome').focus(); } };
  $('#copiar').onclick = () => { navigator.clipboard.writeText(textoRelatorio()).then(() => $('#cmsg').textContent = '✅ Copiado! Cole no WhatsApp.', () => $('#cmsg').textContent = 'Não consegui copiar — selecione o texto acima.'); };
}

/* ---------------- ROTAS ---------------- */
function route() {
  const [mod, tab, arg] = (location.hash.slice(1) || '').split('/');
  if (MODULOS[mod]) renderModulo(mod, tab || 't', arg);
  else if (mod === 'relatorio') renderRelatorio();
  else renderHome();
  if (!(tab === 't' && arg !== undefined)) scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();
