/* =====================================================================
   CARDÁPIO - PRODUTOS E PREÇOS  (é aqui que se editam)
   Fonte: fotos do cardápio impresso do Mulotane Lodge. Nomes e preços copiados como estão
   impressos (inclusive nomes com erro de escrita, ex.: "Glenffiddich", "Honters", "Kalhua").
   ---------------------------------------------------------------------
   COMO EDITAR
   - Mudar um preço:   troque o texto do 3º campo do item.   ["Mojito", "", "500 MT", ""]
   - Novo produto:     copie uma linha de item e cole no grupo certo.
   - Cada item é:      [ "Nome",  "Descrição (ou vazio)",  "Preço",  "flags",  "id opcional" ]
   - flags:            "v" = vegetariano 🌱   |   "p" = picante 🌶️   |   "" = nenhuma
   - id opcional:      só é preciso se dois produtos tiverem o mesmo nome (ex.: Portada tinto e branco)
   - Mudar a foto de fundo de um cartão:  campo  foto  da secção.
   - Foto/vídeo de cada produto (botão VER): ficheiro  midia-produtos.js
   - O PDF (cardapio-mulotane.pdf) NÃO se atualiza sozinho: refaça-o quando mudar preços.
   ===================================================================== */
const MENU = [
  /* ================= SECÇÃO: Drinks & Cocktails ================= */
  {
    id: "drinks",  icone: "cocktail",  titulo: "Drinks & Cocktails",  curto: "Drinks",
    sub: "Do pôr do sol à piscina",
    foto: "img/menu-drinks.webp",          /* fundo do cartão */
    fotoNoPopup: true,     /* true = o botão VER mostra esta foto quando o produto não tem foto própria */
    todoVeg: true,        /* true = todos os itens contam como vegetarianos no filtro */
    grupos: [
      { nome: "Cocktails", itens: [
        ["Sexy on the Beach", "", "500 MT", ""],
        ["Tequila Sunrise", "", "500 MT", ""],
        ["Long Island", "", "500 MT", ""],
        ["Caipirinha", "", "350 MT", ""],
        ["Mojito", "", "500 MT", ""],
        ["Margarita Shaken", "", "500 MT", ""],
        ["Margarita Frozen", "", "500 MT", ""],
        ["Pina Colada", "", "500 MT", ""],
        ["Strawberry Daiquiri", "", "500 MT", ""],
        ["Mizau xau", "", "600 MT", ""],
      ]},
      { nome: "Shooters", itens: [
        ["Blow job", "", "250 MT", ""],
        ["Sambuca", "", "200 MT", ""],
        ["Tequila", "", "200 MT", ""],
        ["Amarula", "", "150 MT", ""],
        ["Kalhua", "", "150 MT", ""],
        ["Campari", "", "150 MT", ""],
        ["Cognac", "", "300 MT", ""],
        ["1920", "", "150 MT", ""],
        ["S. Domingos", "", "150 MT", ""],
      ]},
      { nome: "Espirituosas & Licores - Spirits & Liquores", itens: [
        ["Jameson Irish", "", "150 MT", ""],
        ["Jameson Black", "", "250 MT", ""],
        ["JW black", "", "200 MT", ""],
        ["Chivas", "", "200 MT", ""],
        ["Jack Daniels", "", "200 MT", ""],
        ["Glenffiddich 12Y", "", "200 MT", ""],
        ["Glenffiddich 15Y", "", "350 MT", ""],
        ["Glenffiddich 18Y", "", "500 MT", ""],
        ["Gin Gordons", "", "120 MT", ""],
        ["Gin Tanqueray", "", "150 MT", ""],
        ["Gin Bombay", "", "150 MT", ""],
        ["Gin Hendricks", "", "250 MT", ""],
        ["Vodka", "", "120 MT", ""],
      ]},
    ],
  },
  /* ================= SECÇÃO: Cervejas ================= */
  {
    id: "cervejas",  icone: "beer",  titulo: "Cervejas",  curto: "Cervejas",
    sub: "Cervejas & Sidras - Beers and Ciders",
    foto: "img/menu-cervejas.webp",          /* fundo do cartão */
    fotoNoPopup: true,     /* true = o botão VER mostra esta foto quando o produto não tem foto própria */
    todoVeg: true,        /* true = todos os itens contam como vegetarianos no filtro */
    grupos: [
      { nome: "Cervejas & Sidras", itens: [
        ["Copo 2M", "Pressão", "100 MT", ""],
        ["Copo Txilar", "Pressão", "100 MT", ""],
        ["Copo Heineken", "Pressão", "200 MT", ""],
        ["2M Txoti", "", "100 MT", ""],
        ["Preta Txoti", "", "100 MT", ""],
        ["Lite", "", "100 MT", ""],
        ["Heineken 210ml", "", "150 MT", ""],
        ["Heineken 340ml", "", "150 MT", ""],
        ["Heineken Silver 340ml", "", "150 MT", ""],
        ["Corona 330ml", "", "150 MT", ""],
        ["Stella Artois 250ml", "", "150 MT", ""],
        ["Txilar 250ml", "", "100 MT", ""],
        ["Savanna dry/Lemon", "", "150 MT", ""],
        ["Honters Gold/Dry", "", "150 MT", ""],
        ["Bernini", "", "150 MT", ""],
        ["J&C Lata", "", "150 MT", ""],
        ["Mayfair", "", "150 MT", ""],
        ["Pina colada mix", "", "150 MT", ""],
        ["Peach Martini Bahama", "", "150 MT", ""],
        ["Brutal maçã", "", "150 MT", ""],
        ["Impala lata", "", "100 MT", ""],
      ]},
    ],
  },
  /* ================= SECÇÃO: Vinhos ================= */
  {
    id: "vinhos",  icone: "wine",  titulo: "Vinhos",  curto: "Vinhos",
    sub: "Vinhos - Wines",
    foto: "img/menu-vinhos.webp",          /* fundo do cartão */
    fotoNoPopup: true,     /* true = o botão VER mostra esta foto quando o produto não tem foto própria */
    todoVeg: true,        /* true = todos os itens contam como vegetarianos no filtro */
    grupos: [
      { nome: "Tintos - Red Wines", itens: [
        ["Rooderberg Rouge", "", "1.200 MT", ""],
        ["Pe Tinto", "", "1.200 MT", ""],
        ["Silk & Spice", "", "2.000 MT", ""],
        ["Portada", "", "1.200 MT", "", "portada-tinto"],
        ["Fat Bastard", "", "1.500 MT", "", "fat-bastard-tinto"],
        ["Instinto", "", "1.200 MT", ""],
        ["Instinto Reserva", "", "2.500 MT", ""],
        ["Cabriz", "", "1.500 MT", ""],
        ["Cabriz reserva", "", "2.500 MT", ""],
      ]},
      { nome: "Brancos - White Wines", itens: [
        ["Gazella", "", "1.200 MT", ""],
        ["Casal Garcia", "", "1.200 MT", ""],
        ["Portada", "", "1.200 MT", "", "portada-branco"],
        ["Fat Bastard", "", "1.200 MT", "", "fat-bastard-branco"],
        ["Tosti", "", "1.500 MT", ""],
        ["Anabelle", "", "1.200 MT", ""],
        ["J&C Le roux", "", "1.200 MT", ""],
      ]},
    ],
  },
  /* ================= SECÇÃO: Refrigerantes & Sumos ================= */
  {
    id: "refrescos",  icone: "soda",  titulo: "Refrigerantes & Sumos",  curto: "Sumos & Café",
    sub: "Bebidas leves e café",
    foto: "img/menu-refrescos.webp",          /* fundo do cartão */
    fotoNoPopup: true,     /* true = o botão VER mostra esta foto quando o produto não tem foto própria */
    todoVeg: true,        /* true = todos os itens contam como vegetarianos no filtro */
    grupos: [
      { nome: "Bebidas Leves - Soft Drinks", itens: [
        ["Água pequena", "0,5L Water", "60 MT", ""],
        ["Água grande", "1,5L water", "120 MT", ""],
        ["Refresco", "Cooldrink", "80 MT", ""],
        ["Água das Pedras", "Sparkling Water", "150 MT", ""],
        ["Sumo 1L", "Juice 1L", "250 MT", ""],
        ["Sumo 200ml", "", "100 MT", ""],
        ["Dry lemon", "", "80 MT", ""],
        ["Tónica", "", "80 MT", ""],
        ["Soda", "", "80 MT", ""],
        ["Redbull", "", "150 MT", ""],
        ["Cappy", "", "100 MT", ""],
      ]},
      { nome: "Café - Coffee", itens: [
        ["Espresso", "", "100 MT", ""],
        ["Espresso duplo", "", "150 MT", ""],
        ["Cappuccino", "", "200 MT", ""],
        ["Galão", "", "200 MT", ""],
        ["Irish Coffee", "", "350 MT", ""],
        ["Café com Leite", "", "200 MT", ""],
        ["Chocolate quente", "", "200 MT", ""],
      ]},
    ],
  },
  /* ================= SECÇÃO: Gelados & Sobremesas ================= */
  {
    id: "gelados",  icone: "icecream",  titulo: "Gelados & Sobremesas",  curto: "Gelados",
    sub: "Um final doce",
    foto: "img/menu-gelados.webp",          /* fundo do cartão */
    fotoNoPopup: true,     /* true = o botão VER mostra esta foto quando o produto não tem foto própria */
    todoVeg: true,        /* true = todos os itens contam como vegetarianos no filtro */
    grupos: [
      { nome: "Batidos", itens: [
        ["Milk shake de Baunilha", "", "250 MT", ""],
        ["Milk shake de Morango", "", "250 MT", ""],
        ["Milk shake de Chocolate", "", "250 MT", ""],
        ["Batido de Frutas Natural", "", "250 MT", ""],
        ["Batido de Baunilha e Banana", "", "250 MT", ""],
        ["Batido de Oreo", "", "300 MT", ""],
        ["Dom Pedro", "", "250 MT", ""],
      ]},
      { nome: "Sobremesas", itens: [
        ["Sorvete de Baunilha", "", "250 MT", ""],
        ["Sorvete molho de chocolate", "", "300 MT", ""],
        ["Sorvete molho de morango", "", "300 MT", ""],
        ["Sorvete caramelo", "", "300 MT", ""],
        ["Salada de Frutas", "", "250 MT", ""],
        ["Mousse de Chocolate", "", "350 MT", ""],
        ["Bolo de Chocolate", "", "350 MT", ""],
        ["Pudim", "", "200 MT", ""],
      ]},
    ],
  },
  /* ================= SECÇÃO: Petiscos & Pratos Principais ================= */
  {
    id: "pratos",  icone: "utensils",  titulo: "Petiscos & Pratos Principais",  curto: "Petiscos & Pratos",
    sub: "Da horta à mesa",
    foto: "img/menu-pratos.webp",          /* fundo do cartão */
    fotoNoPopup: false,     /* true = o botão VER mostra esta foto quando o produto não tem foto própria */
    todoVeg: false,        /* true = todos os itens contam como vegetarianos no filtro */
    grupos: [
      { nome: "Entradas - Starters", itens: [
        ["Chamussas", "Samossas", "200 MT", ""],
        ["Rissois", "Shrimps rissoles", "200 MT", ""],
        ["Spring rolls", "", "200 MT", ""],
        ["Pão de alho", "Garlic bread", "200 MT", "v"],
        ["Camarão ao alhinho", "Garlic shrimps", "400 MT", ""],
        ["Meolas", "Giblets", "300 MT", ""],
        ["Asinhas picantes", "Hot wings", "400 MT", "p"],
        ["Feta & Azeitonas", "Olives & Feta", "200 MT", "v"],
      ]},
      { nome: "Saladas - Salads", itens: [
        ["Simples", "Simple", "300 MT", "v"],
        ["Salada grega", "Greek Salad", "400 MT", "v"],
        ["Salada de atum & ovo", "Tuna & egg Salad", "400 MT", ""],
        ["Salada de galinha e caju", "Chicken & Cashew nuts salad", "450 MT", ""],
      ]},
      { nome: "Petiscos", itens: [
        ["Ameijoas", "", "200 MT", ""],
        ["Dobrada", "", "250 MT", ""],
        ["Peixe água & sal", "", "600 MT", ""],
        ["Rabada", "", "400 MT", ""],
        ["Sopa de vegetais", "", "200 MT", "v"],
        ["Caldo verde", "", "250 MT", ""],
        ["Petisco de galinha", "", "300 MT", ""],
      ]},
      { nome: "Pratos Leves - Snacks", itens: [
        ["Prego no Pão", "Prego roll", "500 MT", ""],
        ["Prego no Prato", "Prego", "550 MT", ""],
        ["Tosta de queijo", "Toast with cheese", "150 MT", ""],
        ["Tosta Mista", "Tosta with Cheese, ham, tomato and onion", "250 MT", ""],
        ["Peito de Frango", "Chicken bread", "500 MT", ""],
        ["Chouriço", "Sausage", "800 MT", ""],
        ["Hamburger com queijo e bacon", "Cheese and bacon burger", "600 MT", ""],
        ["Hamburger duplo", "Double cheese burger", "600 MT", ""],
      ]},
      { nome: "Grelhados - Grill", itens: [
        ["Bitoque", "Mini steak (200g)", "1.000 MT", ""],
        ["Bife com natas e cogumelos", "Mini steak with cream and mushrooms (200g)", "1.100 MT", ""],
        ["Alcatra", "Rump steak (300g)", "1.000 MT", ""],
        ["Bife à Portuguesa", "Steak and Egg (300g)", "1.200 MT", ""],
        ["Picanha", "Soft Rump (200g)", "1.300 MT", ""],
        ["T-Bone", "", "1.200 MT", ""],
        ["Costeletas de Porco", "Pork Chops", "1.000 MT", ""],
        ["Frango inteiro", "Full chicken", "850 MT", ""],
        ["1/2 Frango", "Half chicken", "550 MT", ""],
        ["1/4 Frango", "Quarter Chicken", "300 MT", ""],
        ["Tábua de Carnes", "Meat board", "2.200 MT", ""],
        ["Caril de Camarão", "Prawn curry", "550 MT", ""],
        ["Cabrito à Mulotana", "", "850 MT", ""],
      ]},
      { nome: "Mariscos - Seafood", itens: [
        ["Peixe Vermelho", "Red Fish", "900 MT", ""],
        ["Postas de Serra", "Sawfish steak", "800 MT", ""],
        ["Garoupa", "Grouper", "900 MT", ""],
        ["Peixe Pedra", "Stone Fish", "900 MT", ""],
        ["Lulas grelhadas", "Grilled Calamari", "1.000 MT", ""],
        ["Camarão grelhado", "Grill Prawns", "1.200 MT", ""],
        ["Combo de Mariscos", "Seafood platter", "3.500 MT", ""],
      ]},
      { nome: "Pizzas - Grandes", itens: [
        ["Margarita", "Margherita (Tomate & Mozzarella)", "600 MT", "v"],
        ["Regina", "Fiambre & Cogumelos", "800 MT", ""],
        ["Tropical", "Fiambre & Ananás", "800 MT", ""],
        ["Mexicana", "Mexican (Carne moída, Pimento, alho & cebola)", "900 MT", ""],
        ["Vegetariana", "Vegetarian (Pimento, alho, cebola, cogumelos, azeitonas)", "900 MT", "v"],
        ["4 Stagioni", "4 Seasons (Fiambre, cogumelos, alcachofras & azeitonas)", "900 MT", ""],
        ["Montenara", "Bacon & cogumelos", "800 MT", ""],
        ["Pizza de Camarão", "Prawn Pizza (Camarão, cebola & alho)", "900 MT", ""],
        ["Pizza Portuguesa", "Portuguese Pizza (Chouriço, azeitonas, pimentos, alho & cebola)", "900 MT", ""],
        ["Pizza Mulotana", "House Pizza (Bacon, fiambre, salami, cogumelos, cebola & alho)", "1.050 MT", ""],
      ]},
      { nome: "Pastas - Spaghetti or Penne", itens: [
        ["Alfredo", "Fiambre, Bacon ou Galinha", "600 MT", ""],
        ["Lasanha", "Lasagna", "750 MT", ""],
        ["Bolognaise", "", "600 MT", ""],
        ["Vegetais salteados com massa chinesa", "Stirfries with egg noodles", "700 MT", "v"],
      ]},
      { nome: "Pequeno-almoço - Breakfast", itens: [
        ["Matabicho Saudável", "Healthy breakfast", "450 MT", ""],
        ["Omelete", "2 Ingredientes", "450 MT", ""],
        ["Omelete recheado", "Queijo, fiambre, cogumelos, cebola & tomate", "600 MT", ""],
        ["Sol Nascente", "Salsicha, 2 ovos, bacon, feijão doce, torrada", "450 MT", ""],
        ["Canto do pássaro", "Salsicha, bacon, cogumelos, tomate grelhado & torrada", "600 MT", ""],
        ["Mixau xau 1", "Salsicha, bacon, cogumelos, tomate grelhado e torradas", "600 MT", ""],
        ["Mixau xau 2", "Peito de frango c/natas, bacon, cogumelos e torradas", "600 MT", ""],
      ]},
      { nome: "Extras", itens: [
        ["Arroz", "", "150 MT", "v"],
        ["Xima", "", "150 MT", "v"],
        ["Penne", "", "150 MT", "v"],
        ["Esparguete", "", "150 MT", "v"],
        ["Vegetais Salteados", "", "200 MT", "v"],
        ["Atum", "", "150 MT", ""],
        ["Camarão / Lula", "", "100 MT", ""],
        ["Fiambre", "", "150 MT", ""],
        ["Bacon", "", "100 MT", ""],
        ["Chouriço", "", "150 MT", "", "chourico-extra"],
        ["Mozzarella", "", "150 MT", "v"],
        ["Fatia de Queijo", "", "150 MT", "v"],
        ["Tomate", "", "30 MT", "v"],
        ["Pão", "", "30 MT", "v"],
        ["Manteiga", "", "30 MT", "v"],
        ["Jam", "", "30 MT", "v"],
        ["Ovo", "", "30 MT", "v"],
      ]},
    ],
  },
];
