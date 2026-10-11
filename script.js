/* =====================================================================
   MULOTANE LODGE - COMPORTAMENTO DA PÁGINA (script.js)
   =====================================================================
   Este ficheiro NÃO tem textos nem preços: tudo vem de
     config.js         (contactos, mensagens, quartos, galeria, testemunhos)
     menu-data.js      (produtos e preços)
     midia-produtos.js (fotos e vídeos do botão VER)

   ÍNDICE
    1. Atalhos e funções auxiliares
    2. Ligações automáticas (WhatsApp, telefone, redes, mapa)
    3. Acomodação (quartos)
    4. Abas do restaurante
    5. Cardápio (cartões, filtros, grupos)
    6. Popup "VER" (foto ou vídeo)
    7. Experiências e reservar mesa
    8. Galeria e lightbox
    9. Testemunhos
   10. Menu do telemóvel e ano do rodapé
   11. Efeitos (aparecer ao rolar, barra de progresso, topo, folhas)
   ===================================================================== */


/* =====================================================================
   1. ATALHOS E FUNÇÕES AUXILIARES
   ===================================================================== */
const $  = (seletor) => document.querySelector(seletor);       // encontra 1 elemento
const $$ = (seletor) => [...document.querySelectorAll(seletor)]; // encontra todos

/* Cria um ícone SVG pelo nome. Ex.: icone("wa") */
const icone = (nome, classe = "") =>
  `<svg class="i ${classe}" aria-hidden="true"><use href="#i-${nome}"/></svg>`;

/* Link do WhatsApp com mensagem pronta */
const linkWhatsApp = (mensagem) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;

/* Foto com cantos e zoom. Se o .webp falhar, a função fotoFalhou() (no index.html) tenta o .svg */
const foto = (src, alt, classe = "") =>
  `<div class="foto ${classe}"><img src="${src}" alt="${alt}" loading="lazy" onerror="fotoFalhou(this)"></div>`;

/* "Mojito Tropical" -> "mojito-tropical" (identificador do produto) */
const textoParaId = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
       .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =====================================================================
   2. LIGAÇÕES AUTOMÁTICAS
      Os elementos do index.html marcados com data-... recebem aqui o link certo.
      Para mudar números, mensagens ou redes: edite o config.js.
   ===================================================================== */

/* data-wa="chave"  ->  abre o WhatsApp com SITE.mensagens[chave] */
$$("[data-wa]").forEach((a) => { a.href = linkWhatsApp(SITE.mensagens[a.dataset.wa]); a.target = "_blank"; a.rel = "noopener"; });

/* data-tel  ->  "Ligar"  (com data-tel-texto também escreve o número no texto do link) */
$$("[data-tel]").forEach((a) => {
  a.href = `tel:${SITE.telefone}`;
  if (a.hasAttribute("data-tel-texto")) a.textContent = SITE.telefoneTexto;
});

/* data-rede="instagram" | "facebook" | "google" */
$$("[data-rede]").forEach((a) => { a.href = SITE.redes[a.dataset.rede]; });

/* Mapa e botões de navegação (coordenadas em SITE.mapa) */
const { lat, lng } = SITE.mapa;
$("#mapa").src = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
$("[data-waze]").href = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
$("[data-google-maps]").href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;


/* =====================================================================
   3. ACOMODAÇÃO  -  cartões criados a partir de SITE.quartos
   ===================================================================== */
const etiquetasComodidades = SITE.comodidades.map(([ic, texto]) => `<span>${icone(ic)}${texto}</span>`).join("");

$("#lista-quartos").innerHTML = SITE.quartos.map((quarto) => `
  <article class="cartao sem-margem aparece">
    ${foto(quarto.foto, quarto.nome)}
    <div class="conteudo">
      <h3>${quarto.nome}</h3>
      <div class="etiquetas">${etiquetasComodidades}</div>
      <p class="preco-consulta">Preço sob consulta</p>
      <a class="btn" href="${linkWhatsApp(SITE.mensagens.quarto(quarto.nome))}" target="_blank" rel="noopener">${icone("wa")}Ver Disponibilidade</a>
    </div>
  </article>`).join("");


/* =====================================================================
   4. ABAS DO RESTAURANTE  (O Conceito | Cardápio | Experiências)
   ---------------------------------------------------------------------
   CORREÇÃO HASH: o hash da URL decide qual aba abre —
     #restaurante  -> aba "conceito"     (valor por omissão da secção)
     #cardapio     -> aba "cardapio"
     #experiencias -> aba "experiencias"
   Também escuta o evento "hashchange": se o hash mudar sem recarregar
   a página (ex.: clique num link do menu), a aba certa abre na hora.
   ===================================================================== */

/* Nomes válidos das abas (têm de bater com data-aba / data-painel do HTML) */
const ABAS = ["conceito", "cardapio", "experiencias"];

/* Mostra a aba pedida: marca o botão como "ativa" e esconde os outros painéis */
function abrirAba(nome) {
  if (!ABAS.includes(nome)) return false;            /* nome desconhecido: não faz nada */
  $$(".aba").forEach((b) => b.classList.toggle("ativa", b.dataset.aba === nome));
  $$(".painel").forEach((p) => p.classList.toggle("escondido", p.dataset.painel !== nome));
  return true;
}

/* Clique nos botões das abas */
$$(".aba").forEach((botao) => { botao.onclick = () => abrirAba(botao.dataset.aba); });

/* Hash da URL -> aba correspondente (#restaurante vale como "conceito") */
const HASH_PARA_ABA = {
  "#restaurante": "conceito",
  "#cardapio": "cardapio",
  "#experiencias": "experiencias",
};

/* Abre a aba certa conforme o hash atual */
function abrirAbaPeloHash() {
  const aba = HASH_PARA_ABA[location.hash];
  if (aba) abrirAba(aba);
}

/* hashchange: clique num link com #... troca a aba sem recarregar a página */
addEventListener("hashchange", abrirAbaPeloHash);

/* Ao carregar a página, abre logo a aba indicada no hash.
   Com <script defer> o HTML já está pronto neste momento. */
abrirAbaPeloHash();


/* =====================================================================
   5. CARDÁPIO  -  lê MENU (menu-data.js) e cria filtros + cartões
   ===================================================================== */
const SIGNIFICADO_FLAGS = { v: { emoji: "🌱", nome: "Vegetariano" }, p: { emoji: "🌶️", nome: "Picante" } };

/* Transforma a linha ["Nome","Descrição","Preço","flags","id"] num objeto fácil de usar */
function lerItem(linha, secao) {
  const [nome, desc, preco, flags = "", id] = linha;
  return { id: id || textoParaId(nome), nome, desc, preco, flags, secao: secao.id,
           vegetariano: secao.todoVeg || flags.includes("v") };
}

/* Todos os produtos por id (usado pelo popup VER) */
const PRODUTOS = {};
MENU.forEach((secao) => secao.grupos.forEach((grupo) => grupo.itens.forEach((linha) => {
  const produto = lerItem(linha, secao);
  PRODUTOS[produto.id] = produto;
})));

/* ---- HTML de um item, de um grupo e de um cartão ---- */
function htmlItem(linha, secao) {
  const p = lerItem(linha, secao);
  const flags = [...p.flags].map((f) => `<i class="menu-icone-flag" title="${SIGNIFICADO_FLAGS[f].nome}">${SIGNIFICADO_FLAGS[f].emoji}</i>`).join("");
  return `
    <li class="menu-item" data-veg="${p.vegetariano ? 1 : 0}">
      <div class="menu-linha-item">
        <span class="menu-nome">${p.nome}${flags}</span>
        <span class="menu-pontos"></span>
        <span class="menu-preco">${p.preco}</span>
        <button class="menu-ver" data-id="${p.id}" aria-label="Ver ${p.nome}">${icone("eye")}VER</button>
      </div>
      ${p.desc ? `<p class="menu-desc">${p.desc}</p>` : ""}
    </li>`;
}

function htmlGrupo(grupo, secao) {
  return `
    <details class="menu-grupo">
      <summary class="menu-grupo-titulo">${grupo.nome}<span class="quantos">${grupo.itens.length}</span>${icone("chevron")}</summary>
      <ul class="menu-lista">${grupo.itens.map((linha) => htmlItem(linha, secao)).join("")}</ul>
    </details>`;
}

function htmlCartao(secao) {
  const fotoSvg = secao.foto.replace(".webp", ".svg");   /* fundo de reserva se a foto faltar */
  return `
    <article class="menu-card" data-secao="${secao.id}" style="--foto: url(${secao.foto}), url(${fotoSvg})">
      <header class="menu-cabecalho">
        <span class="menu-logo"><img src="img/logo.webp" alt="Mulotane Lodge" width="110" height="110"></span>
        <h3>${icone(secao.icone)}${secao.titulo}</h3>
        <p class="menu-subtitulo">${secao.sub}</p>
        <span class="menu-linha"></span>
      </header>
      ${secao.grupos.map((grupo) => htmlGrupo(grupo, secao)).join("")}
    </article>`;
}

/* ---- Estado dos filtros ---- */
const filtro = { secao: "todos", soVeg: false, abrirTodos: false };

/* Aplica os filtros: esconde cartões, grupos e itens e decide que grupos ficam abertos */
function aplicarFiltros() {
  $$(".menu-card").forEach((cartao) => {
    const secaoCerta = filtro.secao === "todos" || cartao.dataset.secao === filtro.secao;
    let itensVisiveis = 0;

    cartao.querySelectorAll(".menu-item").forEach((item) => {
      const visivel = !filtro.soVeg || item.dataset.veg === "1";
      item.hidden = !visivel;
      if (visivel) itensVisiveis++;
    });

    cartao.querySelectorAll(".menu-grupo").forEach((grupo, posicao) => {
      const temItens = [...grupo.querySelectorAll(".menu-item")].some((item) => !item.hidden);
      grupo.hidden = !temItens;
      /* abre: o 1º grupo sempre; todos se "abrir todos", se só vegetariano, ou se escolheu uma secção */
      grupo.open = posicao === 0 || filtro.abrirTodos || filtro.soVeg || filtro.secao !== "todos";
    });

    cartao.hidden = !secaoCerta || itensVisiveis === 0;
  });

  $$(".menu-chip").forEach((chip) => chip.classList.toggle("ativo", chip.dataset.secao === filtro.secao));
  $("#menu-expandir").textContent = filtro.abrirTodos ? "Fechar todos os grupos" : "Abrir todos os grupos";
}

/* ---- Desenha o cardápio ---- */
$("#menu-filtros").innerHTML =
  `<button class="menu-chip ativo" data-secao="todos">Todos</button>` +
  MENU.map((s) => `<button class="menu-chip" data-secao="${s.id}">${icone(s.icone)}${s.curto}</button>`).join("");
$("#menu-cartoes").innerHTML = MENU.map(htmlCartao).join("");

$$(".menu-chip").forEach((chip) => { chip.onclick = () => { filtro.secao = chip.dataset.secao; aplicarFiltros(); }; });
$("#menu-so-veg").onchange = (e) => { filtro.soVeg = e.target.checked; aplicarFiltros(); };
$("#menu-expandir").onclick = () => { filtro.abrirTodos = !filtro.abrirTodos; aplicarFiltros(); };
$("#menu-cartoes").onclick = (e) => {                         /* clique num botão VER */
  const botao = e.target.closest(".menu-ver");
  if (botao) abrirPopup(botao.dataset.id, botao);
};
aplicarFiltros();


/* =====================================================================
   6. POPUP "VER"  -  foto grande ou vídeo
      A mídia de cada produto vem de MIDIA_PRODUTOS (midia-produtos.js):
        - tipo "foto"  -> imagem grande
        - tipo "video" -> vídeo com autoplay, SEM som, em repetição
        - sem mídia    -> bebidas/gelados: foto da secção + etiqueta "Foto ilustrativa"
                          comida: cartão "Foto em breve" com o logo
   ===================================================================== */
const popup = $("#popup");
let botaoQueAbriu = null;

function abrirPopup(id, botao) {
  const produto = PRODUTOS[id];
  if (!produto) return;
  botaoQueAbriu = botao;

  const config = MIDIA_PRODUTOS.find((m) => m.id === id) || {};
  const secao = MENU.find((s) => s.id === produto.secao);
  const fotoDaSecao = secao.fotoNoPopup ? secao.foto : "";
  const origem = config.midia || fotoDaSecao;
  const eVideo = Boolean(config.midia) && config.tipo === "video";

  /* Mídia (parte de cima do popup) */
  if (!origem) {
    $("#popup-midia").innerHTML = `
      <div class="popup-sem-foto">
        <span class="menu-logo"><img src="img/logo.webp" alt="Mulotane Lodge" width="96" height="96"></span>
        <p>Foto em breve</p>
      </div>`;
  } else if (eVideo) {
    const poster = config.poster ? `poster="${config.poster}"` : "";
    $("#popup-midia").innerHTML = `<video src="${origem}" ${poster} autoplay muted loop playsinline preload="auto"></video>`;
    const video = $("#popup-midia video");
    video.muted = true;                       /* sem som */
    video.play().catch(() => {});
  } else {
    $("#popup-midia").innerHTML = `<img src="${origem}" alt="${produto.nome}">`;
    /* se a foto própria falhar, usa a da secção (quando existe) */
    $("#popup-midia img").onerror = (e) => { if (fotoDaSecao && !e.target.src.endsWith(fotoDaSecao)) e.target.src = fotoDaSecao; };
  }

  /* Texto (parte de baixo do popup) */
  const etiqueta = !config.midia && fotoDaSecao ? `<p class="popup-etiqueta">Foto ilustrativa, não é o produto exato</p>` : "";
  $("#popup-corpo").innerHTML = `
    <h3 id="popup-titulo">${produto.nome}</h3>
    <p class="popup-preco">${produto.preco}</p>
    ${produto.desc ? `<p class="popup-desc">${produto.desc}</p>` : ""}
    ${etiqueta}
    <a class="btn" href="${linkWhatsApp(SITE.mensagens.pedido(produto.nome, produto.preco))}" target="_blank" rel="noopener">${icone("wa")}Pedir no WhatsApp</a>`;

  popup.classList.add("aberto");
  popup.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";    /* bloqueia a rolagem da página por trás */
  $("#popup-fechar").focus();
}

function fecharPopup() {
  const video = $("#popup-midia video");
  if (video) video.pause();
  popup.classList.remove("aberto");
  popup.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => { if (!popup.classList.contains("aberto")) $("#popup-midia").innerHTML = ""; }, 350);
  if (botaoQueAbriu) botaoQueAbriu.focus();
}

$("#popup-fechar").onclick = fecharPopup;
popup.onclick = (e) => { if (e.target === popup) fecharPopup(); };          /* clique fora */
addEventListener("keydown", (e) => { if (e.key === "Escape" && popup.classList.contains("aberto")) fecharPopup(); });


/* =====================================================================
   7. EXPERIÊNCIAS E RESERVAR MESA
   ===================================================================== */
$("#lista-experiencias").innerHTML = SITE.experiencias.map((exp) => `
  <article class="cartao sem-margem">
    ${foto(exp.foto, exp.nome)}
    <div class="conteudo">
      <h3>${exp.nome}</h3>
      <a class="btn" href="${linkWhatsApp(SITE.mensagens.experiencia(exp.nome))}" target="_blank" rel="noopener">${icone("wa")}Perguntar</a>
    </div>
  </article>`).join("");

/* Reservar mesa: junta data + nº de pessoas na mensagem e abre o WhatsApp */
$("#reserva-botao").onclick = () => {
  const data = $("#reserva-data").value || "[data]";
  const pessoas = $("#reserva-pessoas").value || "[nº]";
  window.open(linkWhatsApp(SITE.mensagens.mesa(data, pessoas)), "_blank");
};


/* =====================================================================
   8. GALERIA E LIGHTBOX
   ===================================================================== */
$("#mosaico").innerHTML = SITE.galeria.map((item) =>
  `<button class="${item.tamanho}">${foto(item.foto, "Foto do Mulotane Lodge")}</button>`).join("");

const lightbox = $("#lightbox");
$$("#mosaico button").forEach((botao) => {
  botao.onclick = () => {
    const imagem = botao.querySelector("img");
    if (!imagem) return;
    $("#lightbox-foto").src = imagem.src;
    lightbox.classList.remove("escondido");
  };
});
const fecharLightbox = () => lightbox.classList.add("escondido");
lightbox.onclick = fecharLightbox;
addEventListener("keydown", (e) => { if (e.key === "Escape") fecharLightbox(); });


/* =====================================================================
   9. TESTEMUNHOS  -  troca sozinho a cada 6 segundos
   ===================================================================== */
let testemunhoAtual = 0;

function mostrarTestemunho(posicao) {
  testemunhoAtual = posicao;
  const t = SITE.testemunhos[posicao];
  $("#testemunho").innerHTML = `<p>"${t.texto}"</p><b>${t.autor}</b>`;
  $("#testemunho-pontos").innerHTML = SITE.testemunhos.map((_, n) =>
    `<button aria-label="Testemunho ${n + 1}" class="${n === posicao ? "ativo" : ""}" data-n="${n}"></button>`).join("");
  $$("#testemunho-pontos button").forEach((b) => { b.onclick = () => mostrarTestemunho(Number(b.dataset.n)); });
}
mostrarTestemunho(0);
setInterval(() => mostrarTestemunho((testemunhoAtual + 1) % SITE.testemunhos.length), 6000);


/* =====================================================================
   10. MENU DO TELEMÓVEL E ANO DO RODAPÉ
   ===================================================================== */
$("#btn-menu").onclick = () => $("#menu-principal").classList.toggle("aberto");
$$("#menu-principal a").forEach((a) => { a.onclick = () => $("#menu-principal").classList.remove("aberto"); });
$("#ano").textContent = new Date().getFullYear();


/* =====================================================================
   11. EFEITOS
   ===================================================================== */

/* ---- 11.1 Aparecer ao rolar: elementos .aparece ganham a classe "visivel" ---- */
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visivel"); observador.unobserve(e.target); } });
}, { threshold: 0.1 });

$$(".aparece").forEach((el) => {
  const irmaos = [...el.parentElement.children].filter((c) => c.classList.contains("aparece"));
  el.style.transitionDelay = irmaos.indexOf(el) * 120 + "ms";    /* aparecem um a seguir ao outro */
  observador.observe(el);
});

/* ---- 11.2 Ao rolar: barra de progresso e botão "voltar ao topo" ---- */
const barraProgresso = $("#barra-progresso");
const botaoTopo = $("#btn-topo");
addEventListener("scroll", () => {
  const rolagem = scrollY;
  barraProgresso.style.width = (rolagem / (document.documentElement.scrollHeight - innerHeight)) * 100 + "%";
  botaoTopo.classList.toggle("visivel", rolagem > 700);
}, { passive: true });
botaoTopo.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

/* ---- 11.3 Folhas a cair no hero (poucas e suaves; param fora do ecrã e se "sem movimento") ---- */
(function folhasNoHero() {
  if (semMovimento) return;
  const tela = $("#folhas"), pincel = tela.getContext("2d");
  const cores = ["#9DBBA0", "#B7C9A8", "#D9CBA3", "#7A9E7E"];
  let largura, altura, folhas = [], visivel = true;

  const medir = () => { largura = tela.width = tela.offsetWidth; altura = tela.height = tela.offsetHeight; };
  const novaFolha = (espalhada) => ({
    x: Math.random() * largura, y: espalhada ? Math.random() * altura : -20,
    tamanho: 5 + Math.random() * 7, descida: .3 + Math.random() * .6,
    balanco: Math.random() * 6, velBalanco: .01 + Math.random() * .02,
    giro: Math.random() * 6, cor: cores[Math.random() * 4 | 0], opacidade: .25 + Math.random() * .35,
  });

  medir();
  addEventListener("resize", medir);
  folhas = Array.from({ length: innerWidth < 640 ? 9 : 16 }, () => novaFolha(true));
  new IntersectionObserver((e) => { visivel = e[0].isIntersecting; }).observe(tela);

  (function desenhar() {
    if (visivel) {
      pincel.clearRect(0, 0, largura, altura);
      folhas.forEach((f, n) => {
        f.y += f.descida; f.balanco += f.velBalanco; f.x += Math.sin(f.balanco) * .6; f.giro += .01;
        if (f.y > altura + 20) folhas[n] = novaFolha(false);
        pincel.save();
        pincel.translate(f.x, f.y); pincel.rotate(f.giro);
        pincel.globalAlpha = f.opacidade; pincel.fillStyle = f.cor;
        pincel.beginPath(); pincel.ellipse(0, 0, f.tamanho, f.tamanho / 2.2, 0, 0, 6.3); pincel.fill();
        pincel.restore();
      });
    }
    requestAnimationFrame(desenhar);
  })();
})();
