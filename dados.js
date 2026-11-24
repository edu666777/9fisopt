/* =========================================================
   CONTEÚDO DO SITE — Mentoria Educacional Promover (9º Ano)
   Ciências / Física · Óptica Geométrica, Olho Humano e Instrumentos Ópticos
   c = índice da correta (0=A,1=B,2=C,3=D)
   ========================================================= */
const CONFIG = {
  serie: '9º', serieLonga: '9º Ano', lsKey: 'promover_9ano_optica_v1', area: 'Ciências / Física',
  kicker: '9º Ano · Ciências / Física',
  titulo: 'Óptica: a luz, os <mark>espelhos</mark>, as lentes e o <mark>olho humano</mark>',
  texto: 'Entenda como a luz reflete e se desvia, como o olho forma as imagens, por que algumas pessoas usam óculos e como funcionam a lupa, o microscópio e o projetor. Estude com desenhos que se mexem, faça as questões e <b>envie seu relatório de erros</b> pelo WhatsApp.'
};

const MODULOS = {
  m1: {
    id: 'm1', titulo: 'Óptica Geométrica', sub: 'Reflexão, espelhos, refração, lentes, olho humano e instrumentos', emoji: '👁️',
    topicos: ['Reflexão e espelho plano', 'Espelhos esféricos', 'Refração e índice de refração', 'Lentes', 'O olho humano', 'Problemas de visão', 'Instrumentos ópticos'],
    resumo: [
      'Reflexão: <b>i = r</b>, com os ângulos medidos a partir da <b>normal</b> (90° com o espelho). Se o raio faz 35° com o espelho, o ângulo é <b>55°</b>.',
      'Espelho plano: imagem <b>virtual</b>, mesmo tamanho, mesma distância e <b>enantiomorfa</b> (troca direita ↔ esquerda). Distância pessoa–imagem = <b>2 × d</b>.',
      '<b>Côncavo</b> amplia (dentista, maquiagem). <b>Convexo</b> dá imagem menor e campo visual maior (retrovisor de ônibus, lojas).',
      'Refração: <b>n = c / v</b>. Quanto maior o n, mais lenta a luz e <b>maior o desvio</b> (o diamante desvia mais).',
      'Lente <b>convergente</b>: bordas finas, junta os raios (lupa, hipermetropia, presbiopia). Lente <b>divergente</b>: bordas grossas, espalha os raios (miopia).',
      'Olho: a <b>íris</b> controla a <b>pupila</b>; os <b>músculos ciliares</b> contraem para ver de perto; a imagem na <b>retina</b> é real e invertida. <b>Cones</b> = cores; <b>bastonetes</b> = escuro.',
      '<b>Miopia</b>: foco antes da retina (lente divergente). <b>Hipermetropia/presbiopia</b>: foco depois da retina (lente convergente). <b>Astigmatismo</b>: vários focos (lente cilíndrica).',
      'Microscópio: aumento total = <b>A₁ × A₂</b>. A lupa dá imagem <b>virtual e direita</b>; o projetor dá imagem <b>real e invertida</b>.'
    ],
    questoes: [
      { t: 0, fig: 'q1', txt: 'Um raio de luz monocromático incide sobre um espelho plano formando um ângulo de <b>35°</b> com a <b>superfície do espelho</b>, conforme o esquema. Aplicando as <b>Leis da Reflexão</b>, qual é a medida do <b>ângulo de reflexão (r)</b> formado entre o raio refletido e a reta normal (N)?',
        ops: ['35°.', '45°.', '55°.', '70°.'], c: 2,
        dica: 'Cuidado: os ângulos da reflexão são medidos a partir da NORMAL, que faz 90° com o espelho. Teste no simulador do tópico 1.',
        exp: 'A <b>normal</b> faz <b>90°</b> com o espelho. Se o raio faz 35° com o espelho, com a normal ele faz <b>i = 90° − 35° = 55°</b>. Pela 2ª Lei da Reflexão (<b>i = r</b>), <b>r = 55°</b>.' },
      { t: 0, txt: 'Uma pessoa está em pé a <b>2,5 m</b> de um grande espelho plano vertical. Se ela der um passo de <b>0,7 m</b> em direção ao espelho, qual passará a ser a distância entre a <b>pessoa e a sua imagem</b>?',
        ops: ['1,8 metro.', '2,5 metros.', '3,6 metros.', '5,0 metros.'], c: 2,
        dica: 'Primeiro calcule a nova distância até o espelho. A imagem fica a essa mesma distância do outro lado.',
        exp: 'Nova distância até o espelho: 2,5 − 0,7 = <b>1,8 m</b>. A imagem fica a <b>1,8 m</b> atrás do espelho. Distância pessoa–imagem: 1,8 + 1,8 = <b>3,6 m</b>.' },
      { t: 0, txt: 'Na frente das ambulâncias, a palavra <b>“AMBULÂNCIA”</b> é pintada invertida lateralmente para que o motorista à frente consiga lê-la corretamente pelo espelho retrovisor interno (plano). Essa propriedade das imagens nos espelhos planos chama-se:',
        ops: ['dispersão cromática.', 'enantiomorfismo (inversão direita-esquerda).', 'refração total interna.', 'astigmatismo óptico.'], c: 1,
        dica: 'Veja a palavra AMBULÂNCIA no simulador do espelho plano.',
        exp: 'O espelho plano não inverte cima e baixo, mas <b>troca direita e esquerda</b>. Isso se chama <b>enantiomorfismo</b>. Por isso a palavra é pintada ao contrário: no espelho, ela aparece certa.' },
      { t: 1, txt: 'Compare: (I) o pequeno espelho usado pelo <b>dentista</b> para ver o dente ampliado; (II) o <b>retrovisor externo</b> de um ônibus. Os tipos de espelho em I e II e suas imagens são, respectivamente:',
        ops: ['côncavo (imagem virtual, direita e maior) e convexo (imagem virtual, direita e menor, ampliando o campo visual).', 'convexo (imagem real e maior) e côncavo (imagem invertida e menor).', 'plano (imagem real) e cilíndrico (imagem duplicada).', 'ambos são espelhos planos idênticos que não alteram o tamanho nem o campo visual.'], c: 0,
        dica: 'Qual espelho amplia? Qual mostra uma área maior, com tudo menor?',
        exp: 'Dentista: espelho <b>côncavo</b>; bem perto do dente, dá imagem <b>virtual, direita e maior</b>. Ônibus: espelho <b>convexo</b>; dá imagem <b>virtual, direita e menor</b>, mas mostra uma <b>área maior</b> (campo visual amplo).' },
      { t: 2, txt: 'Os indígenas <b>Calapalo</b> (Parque Indígena do Xingu) miram a flecha um pouco <b>abaixo</b> do lugar onde veem o peixe dentro da água. Esse truque corrige o efeito da <b>refração da luz</b>, que acontece porque:',
        ops: ['a luz vinda do peixe aumenta sua velocidade e desvia-se ao passar da água (n = 1,33) para o ar (n ≈ 1), fazendo o peixe parecer mais raso do que realmente está.', 'a água funciona como um espelho plano opaco que reflete as nuvens do céu.', 'o ar possui índice de refração três vezes maior que o da água e do diamante.', 'os raios luminosos nunca mudam de direção quando atravessam superfícies transparentes.'], c: 0,
        dica: 'Veja o "peixe aparente" no simulador de refração.',
        exp: 'Da <b>água (n = 1,33)</b> para o <b>ar (n ≈ 1)</b>, a luz <b>acelera e desvia</b> (afasta-se da normal). O olho "segue" o raio em linha reta e vê o peixe <b>mais alto (mais raso)</b> do que ele está. Por isso mira-se abaixo.' },
      { t: 2, txt: 'Sabendo que c = 3 · 10⁸ m/s e que o <b>vidro</b> tem índice de refração <b>n = 1,50</b>, a velocidade da luz no interior do vidro é:',
        ops: ['1,5 · 10⁸ m/s.', '2,0 · 10⁸ m/s.', '3,0 · 10⁸ m/s.', '4,5 · 10⁸ m/s.'], c: 1,
        dica: 'n = c / v → v = c / n.',
        exp: 'v = c / n = 3 · 10⁸ / 1,5 = <b>2,0 · 10⁸ m/s</b>. A luz fica mais lenta no vidro do que no vácuo.' },
      { t: 2, txt: 'Um laser incide do ar, sob o <b>mesmo ângulo de 60°</b>, em três blocos: <b>água</b> (n = 1,33), <b>vidro</b> (n = 1,55) e <b>diamante</b> (n = 2,42). Comparando os raios refratados, verifica-se que:',
        ops: ['o maior desvio ocorre no diamante (maior índice de refração), seguido pelo vidro e pela água.', 'o maior desvio ocorre na água, pois quanto menor o índice, maior o desvio.', 'os três materiais desviam o raio para o mesmo ângulo de 60°.', 'a luz atravessa o diamante com velocidade maior que a da luz no vácuo.'], c: 0,
        dica: 'Troque o material no simulador de refração mantendo 60°.',
        exp: 'Quanto <b>maior o n</b>, mais a luz é freada e <b>mais ela desvia</b> em direção à normal. Diamante (2,42) &gt; vidro (1,55) &gt; água (1,33): o <b>diamante</b> desvia mais.' },
      { t: 3, fig: 'q8', txt: 'Observe os dois esquemas de raios paralelos atravessando duas lentes no ar. Analisando as bordas e o desvio dos raios, é correto afirmar que:',
        ops: ['a Lente I é divergente (bordas finas) e a Lente II é convergente (bordas grossas).', 'a Lente I é convergente (bordas finas, concentra os raios no foco) e a Lente II é divergente (bordas grossas, espalha os raios).', 'ambas as lentes produzem exclusivamente imagens reais e invertidas na retina.', 'a Lente II é utilizada em lupas simples para ampliar letras pequenas.'], c: 1,
        dica: 'Bordas FINAS juntam os raios; bordas GROSSAS espalham.',
        exp: '<b>Lente I</b>: bordas finas e raios que se encontram no foco → <b>convergente</b>. <b>Lente II</b>: bordas grossas e raios que se espalham → <b>divergente</b>. A lupa usa lente <b>convergente</b>.' },
      { t: 4, txt: 'Ao sair de um cinema escuro para a rua ensolarada, sentimos um desconforto até os olhos se adaptarem. Esse ajuste automático da entrada de luz acontece porque:',
        ops: ['a musculatura da íris se contrai, diminuindo o diâmetro da pupila para reduzir a luz que entra no olho.', 'o humor vítreo torna-se opaco e bloqueia os raios solares.', 'a retina se desloca para a frente da córnea.', 'os bastonetes se multiplicam para substituir o nervo óptico.'], c: 0,
        dica: 'Mexa no controle de luz do simulador da pupila.',
        exp: 'A <b>íris</b> regula o tamanho da <b>pupila</b>: no claro, a pupila <b>fecha (contrai)</b> para entrar menos luz e proteger a retina; no escuro, ela <b>abre (dilata)</b>.' },
      { t: 4, txt: 'Quando tiramos o olhar de uma paisagem distante para ler um livro a <b>25 cm</b> dos olhos, ocorre a <b>acomodação visual</b>:',
        ops: ['os músculos ciliares relaxam e a córnea fica achatada.', 'os músculos ciliares se contraem e encurvam a lente (cristalino), aumentando seu poder de convergência para formar a imagem nítida na retina.', 'a pupila dilata ao máximo para eliminar a refração.', 'a retina se inverte e passa a formar imagens direitas sem o cérebro.'], c: 1,
        dica: 'No simulador "longe/perto", observe o formato da lente.',
        exp: 'Para ver <b>de perto</b>, os <b>músculos ciliares contraem</b> e a lente fica <b>mais curva (mais "gordinha")</b>, convergindo mais a luz para focar na retina. Para longe, eles relaxam e a lente fica fina.' },
      { t: 4, txt: 'Na retina há <b>cones</b> (≈ 6 milhões) e <b>bastonetes</b> (≈ 120 milhões). Num quarto quase escuro, vemos os móveis apenas em <b>tons de cinza</b> porque:',
        ops: ['os bastonetes são muito sensíveis à pouca luz, mas não distinguem cores, enquanto os cones precisam de mais luz para funcionar.', 'os cones funcionam só no escuro absoluto e os bastonetes só sob o sol.', 'o nervo óptico bloqueia as cores primárias à noite.', 'a córnea filtra todas as ondas luminosas antes do cristalino.'], c: 0,
        dica: 'Apague a luz no simulador de cones e bastonetes.',
        exp: 'No escuro, quem trabalha são os <b>bastonetes</b>: enxergam com pouca luz, mas <b>não veem cores</b>. Os <b>cones</b> (cores) precisam de <b>mais luz</b>.' },
      { t: 4, txt: 'O <b>daltonismo</b> (geralmente hereditário) causa dificuldade para diferenciar cores, mais comumente <b>verde e vermelho</b>. Essa condição se deve a:',
        ops: ['uma alteração ou ausência de um ou mais tipos de cones na retina.', 'um encurtamento do bulbo ocular corrigido com lentes cilíndricas.', 'uma lesão na pupila que impede sua dilatação.', 'acúmulo de líquido opaco no interior da lupa.'], c: 0,
        dica: 'Quem percebe as cores: cones ou bastonetes?',
        exp: 'Existem cones para o <b>vermelho, o verde e o azul</b>. No <b>daltonismo</b>, um ou mais tipos de <b>cones</b> faltam ou funcionam mal, e algumas cores se confundem.' },
      { t: 5, fig: 'q13', txt: 'Observe os esquemas da formação da imagem nos olhos de dois pacientes. Identificando os problemas de visão e as lentes corretivas de <b>X</b> e <b>Y</b>, conclui-se que:',
        ops: ['X tem miopia (lente divergente) e Y tem hipermetropia (lente convergente).', 'X tem hipermetropia ou presbiopia (foco após a retina → lente convergente) e Y tem miopia (foco antes da retina → lente divergente).', 'ambos têm astigmatismo e precisam de espelhos convexos.', 'ambos têm visão normal, pois a imagem sempre se forma fora da retina.'], c: 1,
        dica: 'Onde os raios se encontram em cada olho: antes ou depois da retina?',
        exp: '<b>X</b> (objeto perto): foco <b>depois da retina</b> → <b>hipermetropia</b> (ou presbiopia) → lente <b>convergente</b>. <b>Y</b> (objeto longe): foco <b>antes da retina</b> → <b>miopia</b> → lente <b>divergente</b>.' },
      { t: 5, txt: 'Depois dos 40–45 anos, muitas pessoas passam a <b>afastar o celular</b> para ler letras pequenas (<b>presbiopia</b> ou “vista cansada”). Isso ocorre porque:',
        ops: ['a lente (cristalino) fica mais rígida e os músculos ciliares perdem flexibilidade, dificultando focar de perto (corrige-se com lentes convergentes).', 'o nervo óptico se desconecta da retina durante a leitura noturna.', 'a córnea vira uma lente divergente de bordas grossas.', 'o bulbo ocular cresce rápido, exigindo lentes cilíndricas.'], c: 0,
        dica: 'Com a idade, a lente perde a capacidade de ficar "gordinha".',
        exp: 'Na <b>presbiopia</b>, a <b>lente endurece</b> e os <b>músculos ciliares enfraquecem</b>: o olho não consegue mais focar de perto. A correção é com lente <b>convergente</b>.' },
      { t: 5, txt: 'Um estudante vê contornos <b>embaçados e com “sombras”</b> tanto de longe quanto de perto. O exame mostra córnea com curvatura assimétrica (como uma <b>bola de rugby</b>), gerando <b>vários pontos focais</b>. O problema e a lente corretiva são:',
        ops: ['miopia e lente esférica divergente.', 'hipermetropia e lente esférica convergente.', 'astigmatismo e lente cilíndrica.', 'daltonismo e lente plano-convexa.'], c: 2,
        dica: 'Vários focos = ?',
        exp: '<b>Astigmatismo</b>: a córnea ou a lente é "ovalada" e forma <b>vários focos</b>, embaçando de perto e de longe. A correção é com <b>lente cilíndrica</b>.' },
      { t: 6, txt: 'Numa aula prática, os alunos observam bactérias <i>E. coli</i> num <b>microscópio óptico composto</b> com objetiva que amplia <b>40 vezes</b> e ocular que amplia <b>15 vezes</b>. Qual é a ampliação total?',
        ops: ['25 vezes.', '55 vezes.', '300 vezes.', '600 vezes.'], c: 3,
        dica: 'No microscópio os aumentos se MULTIPLICAM.',
        exp: 'Aumento total = A₁ × A₂ = 40 × 15 = <b>600 vezes</b>. Cuidado: não é soma (40 + 15 = 55)!' },
      { t: 6, txt: 'Comparando uma <b>lupa</b> (relojoeiro) e um <b>projetor de slides</b> (imagem ampliada numa tela), assinale a correta:',
        ops: ['Ambos usam sistema convergente, mas a lupa forma imagem virtual e direita, enquanto o projetor forma imagem real e invertida sobre a tela.', 'A lupa usa lente divergente e o projetor usa só um espelho plano.', 'Ambos projetam imagens reais sem precisar de iluminação.', 'A lupa produz imagens menores e o projetor produz imagens virtuais.'], c: 0,
        dica: 'Use o botão "Lupa / Projetor" no tópico 7.',
        exp: 'Os dois usam lentes <b>convergentes</b>. A <b>lupa</b> forma imagem <b>virtual, direita e maior</b> (vista direto pelo olho). O <b>projetor</b> forma imagem <b>real, invertida e maior</b> na tela.' },
      { t: 6, txt: 'Analise: <b>I.</b> A luneta refratora usa duas lentes convergentes, e os telescópios refletores usam espelhos. <b>II.</b> Projetores têm ventilador para dissipar o calor da lâmpada. <b>III.</b> Nos projetores DLP, microespelhos e lentes controlam os pixels. Está(ão) correta(s):',
        ops: ['apenas I.', 'apenas I e II.', 'apenas II e III.', 'I, II e III.'], c: 3,
        dica: 'Releia os cartões dos instrumentos ópticos.',
        exp: 'As <b>três</b> estão corretas: luneta = lentes convergentes (refletor = espelhos); projetor tem <b>ventilador</b> por causa do calor; o <b>DLP</b> usa <b>microespelhos</b> e lentes para formar cada pixel.' }
    ]
  }
};

/* ---------------- TEORIA ---------------- */
const TEORIA = {
  m1: [
    () => `
      <p class="lead">Num espelho, a luz bate numa superfície bem lisa e volta de forma <b>organizada</b> (reflexão regular), formando imagens nítidas.</p>
      <div class="duo">
        <div class="box"><b>📏 1ª Lei</b><p>Raio incidente (RI), raio refletido (RR) e normal (N) estão no <b>mesmo plano</b>.</p></div>
        <div class="box"><b>📐 2ª Lei: i = r</b><p>O ângulo de incidência é igual ao de reflexão, <b>medidos a partir da normal</b> (linha a 90° do espelho).</p></div>
      </div>
      <h4>🔦 Simulador: lance o raio no espelho</h4>
      <div data-w="reflexao"></div>
      <h4>🪞 O espelho plano</h4>
      <div data-w="espelhoPlano"></div>
      <div class="caract"><span>👻 <b>Virtual</b> (atrás do espelho, não dá para projetar)</span><span>📏 <b>Mesmo tamanho</b></span><span>↔️ <b>Mesma distância</b> (d<sub>obj</sub> = d<sub>img</sub>)</span><span>🔁 <b>Enantiomorfa</b> (direita ↔ esquerda)</span></div>`,
    () => `
      <p class="lead">São pedaços de uma esfera espelhada (<b>calotas esféricas</b>).</p>
      <div data-w="esfericos"></div>
      <div class="duo">
        <div class="box"><b>🥣 Côncavo (reflete por dentro)</b><p>Imagem muda com a distância. <b>Bem perto</b>: imagem <b>virtual, direita e maior</b>.<br>🦷 dentista · 💄 maquiagem · 🪒 barbear</p></div>
        <div class="box"><b>🔮 Convexo (reflete por fora)</b><p>Sempre imagem <b>virtual, direita e menor</b>, mas com <b>campo visual maior</b>.<br>🚌 retrovisor de ônibus · 🏪 lojas · 🚗 saída de garagem</p></div>
      </div>
      <div data-w="espQuiz"></div>`,
    () => `
      <p class="lead"><b>Refração</b> é quando a luz passa de um meio transparente para outro e <b>muda de velocidade</b>. Se entrar inclinada, ela também <b>muda de direção</b> (se entrar reta, pela normal, não desvia).</p>
      <div class="ex-dia"><span>🥤 O canudo parece "quebrado" no copo d'água</span><span>🏹 Os Calapalo miram abaixo do peixe</span><span>🚗 O carrinho muda de direção ao passar da mesa lisa para o pano</span></div>
      <div class="formula"><b>n = c / v</b><small>n = índice de refração · c = 3 · 10⁸ m/s (vácuo) · v = velocidade no meio</small><p>Quanto <b>maior o n</b> → <b>mais lenta</b> a luz → <b>maior o desvio</b>.</p></div>
      <table class="mini"><tr><th>Meio</th><th>n</th><th>Velocidade da luz</th></tr>
        <tr><td>Vácuo / Ar</td><td>≈ 1</td><td>3,0 · 10⁸ m/s</td></tr><tr><td>Água</td><td>1,33</td><td>≈ 2,26 · 10⁸ m/s</td></tr>
        <tr><td>Vidro</td><td>1,50</td><td>2,0 · 10⁸ m/s</td></tr><tr><td>Diamante</td><td>2,42 (≈ 2,5)</td><td>≈ 1,2 · 10⁸ m/s</td></tr></table>
      <h4>🌈 Simulador de refração</h4>
      <div data-w="refracao"></div>
      <h4>🐟 O peixe aparente</h4>
      <div data-w="peixe"></div>
      <div class="exemplo"><b>📝 Exemplo resolvido:</b> diamante com n = 2,5. Qual a velocidade da luz nele?<br>v = c / n = 3 · 10⁸ / 2,5 = <b>1,2 · 10⁸ m/s</b>.</div>`,
    () => `
      <div data-w="lentes"></div>
      <div class="duo">
        <div class="box"><b>🔍 Convergente (bordas finas)</b><p>Mais grossa no meio. <b>Junta</b> os raios num foco <b>real</b>. Pode formar vários tipos de imagem.<br>Ex.: <b>lupa</b>, <b>projetor</b>, óculos para <b>hipermetropia</b> e <b>presbiopia</b>.</p></div>
        <div class="box"><b>👓 Divergente (bordas grossas)</b><p>Mais fina no meio. <b>Espalha</b> os raios, como se saíssem de um foco <b>virtual</b>. Imagem sempre <b>virtual, direita e menor</b>.<br>Ex.: óculos para <b>miopia</b>.</p></div>
      </div>
      <div class="alerta">💡 Para lembrar: lente convergente "funciona como" o espelho côncavo; lente divergente "funciona como" o espelho convexo.</div>`,
    () => `
      <p class="lead">O olho funciona como uma <b>câmera</b>: a luz entra, é desviada por "lentes" naturais e forma uma imagem no fundo do olho. <b>Toque nas partes</b> do desenho:</p>
      <div data-w="olho"></div>
      <h4>⚫ A pupila: controle a luz</h4>
      <div data-w="pupila"></div>
      <h4>📖🏔️ Acomodação: ver de longe e de perto</h4>
      <div data-w="acomodacao"></div>
      <div class="exemplo"><b>📝 Por que a costureira deve olhar para o horizonte de vez em quando?</b><br>Para focar de perto, os músculos ciliares ficam <b>contraídos</b> o tempo todo. Olhando para longe, eles <b>relaxam</b> e a lente se distende, evitando o <b>cansaço visual</b>.</div>
      <h4>🌈🌑 Cones e bastonetes</h4>
      <div class="duo">
        <div class="box"><b>🎨 Cones (≈ 6 milhões)</b><p>Visão em <b>cores</b>. Três tipos: <b style="color:#d62828">vermelho</b>, <b style="color:#2a9d3a">verde</b> e <b style="color:#1d6fb8">azul</b>. Precisam de <b>bastante luz</b>. Se algum falta → <b>daltonismo</b>.</p></div>
        <div class="box"><b>🌙 Bastonetes (≈ 120 milhões)</b><p>Cerca de <b>20 vezes mais</b> numerosos. Sensíveis a <b>pouca luz</b> e ao <b>movimento</b>, mas <b>não veem cores</b>. Visão <b>noturna</b> e periférica.</p></div>
      </div>
      <div data-w="cones"></div>`,
    () => `
      <p class="lead">No olho normal, a imagem se forma <b>exatamente sobre a retina</b>. Nos problemas de visão (<b>ametropias</b>), ela se forma no lugar errado. Escolha o problema e coloque os óculos:</p>
      <div data-w="defeitos"></div>
      <table class="mini wide"><tr><th>Problema</th><th>O que acontece</th><th>Enxerga mal</th><th>Lente</th></tr>
        <tr><td><b>Miopia</b></td><td>Olho alongado ou córnea muito curva: foco <b>antes</b> da retina</td><td>de <b>longe</b></td><td><b>Divergente</b></td></tr>
        <tr><td><b>Hipermetropia</b></td><td>Olho curto ou córnea pouco curva: foco <b>depois</b> da retina</td><td>de <b>perto</b></td><td><b>Convergente</b></td></tr>
        <tr><td><b>Presbiopia</b></td><td>Idade: lente rígida e músculos ciliares fracos</td><td>de <b>perto</b></td><td><b>Convergente</b></td></tr>
        <tr><td><b>Astigmatismo</b></td><td>Córnea/lente "ovalada" (bola de rugby): <b>vários focos</b></td><td><b>perto e longe</b></td><td><b>Cilíndrica</b></td></tr></table>
      <div data-w="visaoQuiz"></div>`,
    () => `
      <div class="instr">
        <div><i>🔍</i><b>Lupa</b><p><b>Uma</b> lente convergente. Objeto entre o foco e a lente → imagem <b>virtual, direita e maior</b>.</p></div>
        <div><i>🔬</i><b>Microscópio</b><p><b>Duas</b> lentes convergentes: <b>objetiva</b> (perto do objeto) e <b>ocular</b> (perto do olho). Aumento total = <b>A₁ × A₂</b>.</p></div>
        <div><i>🔭</i><b>Luneta / telescópio</b><p>Refrator: duas lentes <b>convergentes</b> (a de Galileu tinha uma convergente e uma divergente). <b>Refletor</b>: usa <b>espelhos</b>.</p></div>
        <div><i>📽️</i><b>Projetor</b><p>Imagem <b>real, invertida e maior</b> na tela. Precisa de lâmpada forte, sala escura e <b>ventilador</b>. No <b>DLP</b>, <b>microespelhos</b> controlam cada pixel.</p></div>
      </div>
      <h4>🔍📽️ Lupa × Projetor</h4>
      <div data-w="lupaProj"></div>
      <h4>🔬 Monte seu microscópio</h4>
      <div data-w="microscopio"></div>`
  ]
};
