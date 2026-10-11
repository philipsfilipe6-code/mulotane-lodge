/* =====================================================================
   CONFIGURAÇÃO DO SITE  -  contactos, mensagens e listas
   Tudo o que muda com frequência está aqui. Não precisa mexer no resto do código.
   ---------------------------------------------------------------------
   O QUE EDITAR AQUI                      ONDE APARECE
   - whatsapp / telefone                  todos os botões de WhatsApp e "Ligar"
   - redes                                ícones do rodapé (Instagram, Facebook, Google)
   - mapa                                 mapa e botões Waze / Google Maps
   - mensagens                            texto pré-escrito que abre no WhatsApp
   - quartos / comodidades                secção Acomodação
   - experiencias                         aba "Experiências" do restaurante
   - galeria                              mosaico de fotos
   - testemunhos                          carrossel de opiniões
   ===================================================================== */

const SITE = {

  /* ---------- Contactos ---------- */
  nome: "Mulotane Lodge",
  whatsapp: "258848885557",          /* só números, com indicativo do país (258) */
  telefone: "+258848885557",         /* usado no botão "Ligar" */
  telefoneTexto: "+258 84 888 5557", /* como aparece escrito no site */

  /* ---------- Redes sociais (troque "#" pelo link real) ---------- */
  redes: {
    instagram: "#",
    facebook: "#",
    google: "https://www.google.com/search?q=Mulotane+Lodge",
  },

  /* ---------- Localização ---------- */
  mapa: { lat: -25.87067, lng: 32.4105303 },

  /* ---------- Mensagens que abrem no WhatsApp ----------
     Chave "geral", "cardapio" e "evento" são usadas nos botões do index.html (data-wa="chave").
     As que são funções recebem dados (nome do produto, data...).                           */
  mensagens: {
    geral: "Olá Mulotane Lodge, vi o site e quero saber disponibilidade para...",
    cardapio: "Olá Mulotane Lodge, pode enviar-me o cardápio?",
    evento: "Olá Mulotane Lodge, quero um orçamento para evento corporativo.",
    mesa: (data, pessoas) => `Olá, quero reservar mesa no restaurante Mulotane para ${data} - ${pessoas} pessoas`,
    pedido: (nome, preco) => `Olá Mulotane Lodge, quero pedir: ${nome} (${preco})`,
    quarto: (nome) => `Olá Mulotane Lodge, quero ver disponibilidade: ${nome}`,
    experiencia: (nome) => `Olá Mulotane Lodge, quero saber mais sobre: ${nome}`,
  },

  /* ---------- Acomodação ----------
     comodidades: [nome do ícone, texto]   (ícones disponíveis: ver o bloco <svg> no fim do index.html) */
  comodidades: [
    ["pool", "Piscina"],
    ["coffee", "Pequeno-almoço incluído"],
    ["wifi", "Wi-Fi"],
    ["snow", "Ar-condicionado"],
    ["car", "Estacionamento"],
  ],
  quartos: [
    { foto: "img/quarto-twin.webp",   nome: "Quarto Duplo (2 camas)" },
    { foto: "img/quarto1.webp",       nome: "Quarto de Casal" },
    { foto: "img/suite-redonda.webp", nome: "Suíte com Cama Redonda" },
    { foto: "img/suite-chaise.webp",  nome: "Suíte Premium" },
  ],

  /* ---------- Experiências gastronómicas (ilustrações provisórias: troque por fotos) ---------- */
  experiencias: [
    { foto: "img/jantar.svg",    nome: "Jantar à Luz de Velas na Piscina" },
    { foto: "img/churrasco.svg", nome: "Churrasco Tradicional para Grupos" },
    { foto: "img/aula.svg",      nome: "Aula de Matapa com Mamãs da Comunidade" },
  ],

  /* ---------- Galeria ----------
     tamanho: ""  = quadrado | "larga" = 2 colunas | "alta" = 2 linhas | "larga alta" = grande */
  galeria: [
    { foto: "img/natureza1.webp",     tamanho: "larga alta" },
    { foto: "img/piscina.webp",       tamanho: "alta" },
    { foto: "img/quarto1.webp",       tamanho: "" },
    { foto: "img/entrada.webp",       tamanho: "" },
    { foto: "img/natureza2.webp",     tamanho: "alta" },
    { foto: "img/suite-redonda.webp", tamanho: "larga" },
    { foto: "img/balanco.webp",       tamanho: "" },
    { foto: "img/teambuilding.webp",  tamanho: "" },
  ],

  /* ---------- Testemunhos (trocam sozinhos a cada 6 segundos) ---------- */
  testemunhos: [
    { texto: "Great get away place for families or couples.", autor: "Yakubu A." },
    { texto: "The service was great. The food was superb", autor: "Ipyana M." },
    { texto: " Amo a paz desse lugar ", autor: "Filipe Simbine"}
  ],
};
