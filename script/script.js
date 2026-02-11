/* =========================================
   GOURMET TRIPLE-FLOW | SCRIPT.JS
   Versão: Full Release (Sem Abreviações)
   ========================================= */

// === 1. LISTAS AUXILIARES DE SABORES ===
const SABORES_ESFIHA_TODOS = [
    'Americana', '2 Queijos', 'Brigadeiro', 'Brócolis c/ Alho',
    'Carne Clássica', 'Carne c/ Queijo e Milho', 'Atum',
    'Chocolate Preto', 'Chocolate Branco', 'Doce de Leite',
    'Frango Tradicional', 'Frango c/ Catupiry', 'Frango c/ Queijo',
    'Frango, Queijo e Catupiry', 'Milho', 'Mussarela',
    'Prestígio', 'Sonho de Valsa'
];

const SABORES_PASTEL_TODOS = [
    'Carne', 'Carne c/ Queijo', 'Frango', 'Frango c/ Catupiry',
    'Frango c/ Queijo', 'Presunto e Queijo', 'Queijo'
];

// === 2. SISTEMA MESTRE DE PREÇOS DE PIZZA ===
const PIZZA_DATA = {
    edges: [
        { name: 'Tradicional (Sem recheio)', price: 0 },
        { name: 'Recheada: Cheddar', price: 12.90 },
        { name: 'Recheada: Cream Cheese', price: 12.90 },
        { name: 'Recheada: Mussarela', price: 18.90 }
    ],
    // Sabores Salgados
    flavors: [
        // Seção 9 (Novos Preços)
        { name: '2 Queijos', prices: { broto: 45.90, grande: 65.80, gigante: 89.90 } },
        { name: 'Bolonhesa', prices: { broto: 49.90, grande: 79.80, gigante: 99.90 } },
        { name: 'Portuguesa', prices: { broto: 39.90, grande: 64.80, gigante: 89.90 } },
        { name: 'Strogonoff de Frango', prices: { broto: 45.90, grande: 69.90, gigante: 89.90 } },
        // Padrões
        { name: 'Mussarela', prices: { broto: 39.90, grande: 65.90, gigante: 79.90 } },
        { name: 'Marguerita', prices: { broto: 39.90, grande: 65.90, gigante: 79.90 } },
        { name: 'Napolitana', prices: { broto: 39.90, grande: 65.90, gigante: 79.90 } },
        { name: 'Caipira', prices: { broto: 39.90, grande: 69.90, gigante: 79.90 } },
        { name: 'Frango c/ Milho', prices: { broto: 39.90, grande: 75.90, gigante: 95.90 } },
        { name: 'Atum', prices: { broto: 39.90, grande: 74.90, gigante: 89.90 } },
        { name: 'Cream Cheese', prices: { broto: 46.90, grande: 84.90, gigante: 99.90 } },
        { name: '5 Queijos', prices: { broto: 49.90, grande: 84.90, gigante: 117.90 } },
        { name: 'Frango c/ Catupiry', prices: { broto: 49.90, grande: 89.90, gigante: 99.90 } },
        { name: '4 Queijos', prices: { broto: 49.90, grande: 89.90, gigante: 99.90 } },
        { name: 'Palmito Especial', prices: { broto: 52.90, grande: 89.90, gigante: 109.90 } }
    ],
    // Sabores Doces
    sweetFlavors: [
        { name: 'Banana c/ Canela', prices: { broto: 45.90, grande: 74.90, gigante: 87.90 } },
        { name: 'Banana c/ Nutella', prices: { broto: 49.90, grande: 81.90, gigante: 99.90 } },
        { name: 'Doce de Paçoca', prices: { broto: 44.90, grande: 79.90, gigante: 94.90 } },
        { name: 'Sonho de Valsa', prices: { broto: 45.90, grande: 81.90, gigante: 99.90 } },
        { name: 'Prestígio', prices: { broto: 45.90, grande: 79.90, gigante: 99.90 } },
        { name: 'Romeu e Julieta', prices: { broto: 49.90, grande: 99.90, gigante: 109.90 } },
        { name: 'Nutella c/ Ninho', prices: { broto: 54.90, grande: 84.90, gigante: 99.90 } }
    ]
};

// === 3. BANCO DE DADOS DE PRODUTOS COMPLETO ===
const productsDB = [
    // --- SEÇÃO 1: HITS DA SEMANA ---
    { id: 'hit-brigadeiro', name: 'Esfiha Brigadeiro Gourmet', price: 12.90, type: 'instant', category: 'hits', desc: 'Massa artesanal com muito brigadeiro.', img: 'img/esfiha-brigadeiro.webp' },
    { id: 'hit-pastel', name: 'Pastel Frango c/ Catupiry', price: 15.90, type: 'instant', category: 'hits', desc: 'Gigante e sequinho.', img: 'img/pastel-frango.webp' },

    // --- SEÇÃO 2: SELECTION PACKS (COMBOS) ---
    { id: 'combo-10-esfihas', name: 'Pack 10 Esfihas da Casa', price: 69.90, oldPrice: 89.90, discount: '-22%', type: 'combo-trigger', category: 'combos', desc: 'Escolha 10 sabores.', maxSelections: 10, img: 'img/combo-esfihas.webp', allowedFlavors: SABORES_ESFIHA_TODOS },
    { id: 'combo-4-pasteis', name: 'Pack 4 Pastéis da Casa', price: 59.90, oldPrice: 69.00, discount: '-14%', type: 'combo-trigger', category: 'combos', desc: 'Escolha 4 sabores.', maxSelections: 4, img: 'img/combo-pasteis.webp', allowedFlavors: SABORES_PASTEL_TODOS },

    // --- SEÇÃO 3: COMBOS COCA-COLA ---
    { id: 'coke-trio', name: 'Trio Favorito + Coca 350ml', price: 39.90, oldPrice: 49.90, discount: '-20%', type: 'combo-trigger', category: 'coca-combos', desc: '3 Esfihas + 1x Lata.', maxSelections: 3, fixedItem: '1x Coca-Cola 350ml', img: 'img/combo-coca-trio.webp', allowedFlavors: SABORES_ESFIHA_TODOS },
    { id: 'coke-pastel-party', name: 'Party Pastel (6un) + Coca 2L', price: 89.90, oldPrice: 109.00, discount: '-18%', type: 'combo-trigger', category: 'coca-combos', desc: '6 Pastéis + 1x Coca 2L.', maxSelections: 6, fixedItem: '1x Coca-Cola 2L', img: 'img/combo-coca-pastel.webp', allowedFlavors: SABORES_PASTEL_TODOS },
    { id: 'coke-family-12', name: 'Family Feast (12un) + Coca 2L', price: 99.90, oldPrice: 129.90, discount: '-23%', type: 'combo-trigger', category: 'coca-combos', desc: '12 Esfihas + Coca 2L.', maxSelections: 12, fixedItem: '1x Coca-Cola 2L', img: 'img/combo-coca-12.webp', allowedFlavors: SABORES_ESFIHA_TODOS },
    { id: 'coke-double-date', name: 'Double Date (6un) + 2x Latas', price: 68.90, type: 'combo-trigger', category: 'coca-combos', desc: '6 Esfihas + 2x Latas.', maxSelections: 6, fixedItem: '2x Coca-Cola 350ml', img: 'img/combo-coca-6.webp', allowedFlavors: SABORES_ESFIHA_TODOS },

    // --- SEÇÃO 4: PIZZAS SALGADAS ---
    { id: 'pizza-broto-2s', name: 'Broto Salgada (2 Sabores)', price: 39.90, type: 'pizza-builder', category: 'pizzas', desc: '4 Pedaços.', mode: 'half', size: 'broto', img: 'img/pizza-2-sabores.webp' },
    { id: 'pizza-broto-1s', name: 'Broto Salgada (1 Sabor)', price: 39.90, type: 'pizza-builder', category: 'pizzas', desc: '4 Pedaços.', mode: 'whole', size: 'broto', img: 'img/pizza-1-sabor.webp' },
    { id: 'pizza-grande-2s', name: 'Grande Salgada (2 Sabores)', price: 65.90, type: 'pizza-builder', category: 'pizzas', desc: '8 Pedaços.', mode: 'half', size: 'grande', img: 'img/pizza-grande-2.webp' },
    { id: 'pizza-grande-1s', name: 'Grande Salgada (1 Sabor)', price: 65.90, type: 'pizza-builder', category: 'pizzas', desc: '8 Pedaços.', mode: 'whole', size: 'grande', img: 'img/pizza-grande-1.webp' },
    { id: 'pizza-gigante-2s', name: 'Gigante Salgada (2 Sabores)', price: 79.90, type: 'pizza-builder', category: 'pizzas', desc: '12 Pedaços.', mode: 'half', size: 'gigante', img: 'img/pizza-gigante-2.webp' },
    { id: 'pizza-gigante-1s', name: 'Gigante Salgada (1 Sabor)', price: 79.90, type: 'pizza-builder', category: 'pizzas', desc: '12 Pedaços.', mode: 'whole', size: 'gigante', img: 'img/pizza-gigante-1.webp' },

    // --- SEÇÃO 5: ESFIHAS SALGADAS ---
    // Promos 50%
    { id: 'esf-frango-cat', name: 'Frango c/ Catupiry', price: 9.90, oldPrice: 19.90, discount: '-50%', type: 'instant', category: 'esfihas-salgadas', desc: 'Campeão de vendas.', img: 'img/esfiha-frango-cat.webp' },
    { id: 'esf-carne-queijo', name: 'Carne c/ Queijo', price: 9.90, oldPrice: 19.90, discount: '-50%', type: 'instant', category: 'esfihas-salgadas', desc: 'Carne e mussarela.', img: 'img/esfiha-carne-queijo.webp' },
    { id: 'esf-carne-milho', name: 'Carne, Queijo e Milho', price: 9.90, oldPrice: 19.90, discount: '-50%', type: 'instant', category: 'esfihas-salgadas', desc: 'Completa.', img: 'img/esfiha-carne-milho.webp' },
    // Normais 9,90
    { id: 'esf-4queijos', name: '4 Queijos', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Mussarela, provolone, parmesão e catupiry.', img: 'img/esfiha-4queijos.webp' },
    { id: 'esf-frango-queijo', name: 'Frango c/ Queijo', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Frango com mussarela.', img: 'img/esfiha-frango-queijo.webp' },
    { id: 'esf-milho', name: 'Milho', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Milho e mussarela.', img: 'img/esfiha-milho.webp' },
    { id: 'esf-italiana', name: 'Italiana', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Salame e queijo.', img: 'img/esfiha-italiana.webp' },
    { id: 'esf-2queijos', name: '2 Queijos', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Mussarela e catupiry.', img: 'img/esfiha-2queijos.webp' },
    { id: 'esf-portuguesa', name: 'Portuguesa', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Completa.', img: 'img/esfiha-portuguesa.webp' },
    { id: 'esf-frango-brocolis', name: 'Frango c/ Brócolis', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Leve.', img: 'img/esfiha-brocolis.webp' },
    { id: 'esf-americana', name: 'Americana', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Bacon e ovo.', img: 'img/esfiha-americana.webp' },
    { id: 'esf-frango-simples', name: 'Frango', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Temperado.', img: 'img/esfiha-frango.webp' },
    { id: 'esf-romana', name: 'Romana', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Aliche.', img: 'img/esfiha-romana.webp' },
    { id: 'esf-mexicana', name: 'Mexicana', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Picante.', img: 'img/esfiha-mexicana.webp' },
    { id: 'esf-brocolis-alho', name: 'Brócolis e Alho', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Ao alho e óleo.', img: 'img/esfiha-brocolis.webp' },
    { id: 'esf-coalho', name: 'Queijo Coalho', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Nordestina.', img: 'img/esfiha-coalho.webp' },
    { id: 'esf-marguerita', name: 'Marguerita', price: 9.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Manjericão.', img: 'img/esfiha-marguerita.webp' },
    { id: 'esf-mussarela', name: 'Mussarela', price: 8.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Clássica.', img: 'img/esfiha-mussarela.webp' },

    // --- SEÇÃO 6: PIZZAS DOCES ---
    { id: 'pizza-doce-broto-2s', name: 'Broto Doce (2 Sabores)', price: 44.90, type: 'pizza-builder', category: 'pizzas-doces', desc: '4 Pedaços.', mode: 'half', size: 'broto', isSweet: true, img: 'img/pizza-doce.webp' },
    { id: 'pizza-doce-broto-1s', name: 'Broto Doce (1 Sabor)', price: 44.90, type: 'pizza-builder', category: 'pizzas-doces', desc: '4 Pedaços.', mode: 'whole', size: 'broto', isSweet: true, img: 'img/pizza-doce-1.webp' },
    { id: 'pizza-doce-grande-2s', name: 'Grande Doce (2 Sabores)', price: 74.90, type: 'pizza-builder', category: 'pizzas-doces', desc: '8 Pedaços.', mode: 'half', size: 'grande', isSweet: true, img: 'img/pizza-doce-grande.webp' },
    { id: 'pizza-doce-grande-1s', name: 'Grande Doce (1 Sabor)', price: 74.90, type: 'pizza-builder', category: 'pizzas-doces', desc: '8 Pedaços.', mode: 'whole', size: 'grande', isSweet: true, img: 'img/pizza-doce-grande.webp' },
    { id: 'pizza-doce-gigante-2s', name: 'Gigante Doce (2 Sabores)', price: 87.90, type: 'pizza-builder', category: 'pizzas-doces', desc: '12 Pedaços.', mode: 'half', size: 'gigante', isSweet: true, img: 'img/pizza-doce-gigante.webp' },
    { id: 'pizza-doce-gigante-1s', name: 'Gigante Doce (1 Sabor)', price: 87.90, type: 'pizza-builder', category: 'pizzas-doces', desc: '12 Pedaços.', mode: 'whole', size: 'gigante', isSweet: true, img: 'img/pizza-doce-gigante.webp' },

    // --- SEÇÃO 7: ESFIHAS DOCES ---
    { id: 'esf-doce-leite', name: 'Doce de Leite', price: 12.90, type: 'instant', category: 'esfihas-doces', desc: 'Argentino.', img: 'img/esfiha-doce.webp' },
    { id: 'esf-kitkat', name: 'Kit Kat', price: 12.90, type: 'instant', category: 'esfihas-doces', desc: 'Chocolate com KitKat.', img: 'img/esfiha-kitkat.webp' },
    { id: 'esf-prestigio', name: 'Prestígio', price: 12.90, type: 'instant', category: 'esfihas-doces', desc: 'Coco.', img: 'img/esfiha-prestigio.webp' },
    { id: 'esf-brigadeiro', name: 'Brigadeiro', price: 12.90, type: 'instant', category: 'esfihas-doces', desc: 'Granulado.', img: 'img/esfiha-brigadeiro.webp' },
    { id: 'esf-chocolate', name: 'Chocolate Preto', price: 9.90, type: 'instant', category: 'esfihas-doces', desc: 'Ao leite.', img: 'img/esfiha-chocolate.webp' },
    { id: 'esf-sonho', name: 'Sonho de Valsa', price: 12.90, type: 'instant', category: 'esfihas-doces', desc: 'Bombom.', img: 'img/esfiha-sonho.webp' },
    { id: 'esf-mms', name: 'M&Ms', price: 12.90, type: 'instant', category: 'esfihas-doces', desc: 'Confetes.', img: 'img/esfiha-mms.webp' },
    { id: 'esf-choco-branco', name: 'Chocolate Branco', price: 9.90, type: 'instant', category: 'esfihas-doces', desc: 'Galak.', img: 'img/esfiha-choco-branco.webp' },

    // --- SEÇÃO 8: PASTÉIS ---
    { id: 'pastel-carne', name: 'Pastel de Carne', price: 14.90, type: 'instant', category: 'pasteis', desc: 'Carne temperada.', img: 'img/pastel-carne.webp' },
    { id: 'pastel-carne-ovo', name: 'Carne c/ Ovo', price: 16.90, type: 'instant', category: 'pasteis', desc: 'Carne e ovo.', img: 'img/pastel-carne-ovo.webp' },
    { id: 'pastel-carne-queijo', name: 'Carne c/ Queijo', price: 16.90, type: 'instant', category: 'pasteis', desc: 'Carne e queijo.', img: 'img/pastel-carne-queijo.webp' },
    { id: 'pastel-costela', name: 'Costela c/ Queijo', price: 15.90, type: 'instant', category: 'pasteis', desc: 'Costela desfiada.', img: 'img/pastel-costela.webp' },
    { id: 'pastel-frango', name: 'Pastel de Frango', price: 14.90, type: 'instant', category: 'pasteis', desc: 'Frango desfiado.', img: 'img/pastel-frango.webp' },
    { id: 'pastel-frango-cat', name: 'Frango c/ Catupiry', price: 15.90, type: 'instant', category: 'pasteis', desc: 'Cremoso.', img: 'img/pastel-frango-cat.webp' },
    { id: 'pastel-frango-ovo', name: 'Frango c/ Ovo', price: 15.90, type: 'instant', category: 'pasteis', desc: 'Frango e ovo.', img: 'img/pastel-frango-ovo.webp' },
    { id: 'pastel-frango-queijo', name: 'Frango c/ Queijo', price: 15.90, type: 'instant', category: 'pasteis', desc: 'Frango e queijo.', img: 'img/pastel-frango-queijo.webp' },
    { id: 'pastel-frango-trio', name: 'Frango, Queijo e Catupiry', price: 16.90, type: 'instant', category: 'pasteis', desc: 'Completo.', img: 'img/pastel-frango-trio.webp' },
    { id: 'pastel-presunto', name: 'Bauru (Presunto e Queijo)', price: 15.90, type: 'instant', category: 'pasteis', desc: 'Misto.', img: 'img/pastel-presunto.webp' },
    { id: 'pastel-queijo', name: 'Pastel de Queijo', price: 14.90, type: 'instant', category: 'pasteis', desc: 'Mussarela.', img: 'img/pastel-queijo.webp' },

    // --- SEÇÃO 9: ESPECIAIS & COMBOS ---
    { id: 'combo-pizza-2queijos', name: 'Combo: 2 Queijos + Coca 2L', price: 59.90, oldPrice: 75.00, discount: 'OFERTA', type: 'instant', category: 'pizza-specials', desc: 'Pizza Grande + Coca 2L.', img: 'img/combo-pizza.webp' },
    { id: 'combo-pizza-portuguesa', name: 'Combo: Portuguesa + Coca 2L', price: 59.90, oldPrice: 75.00, discount: 'OFERTA', type: 'instant', category: 'pizza-specials', desc: 'Pizza Grande + Coca 2L.', img: 'img/combo-pizza.webp' },
    { id: 'combo-pizza-strog', name: 'Combo: Strogonoff + Coca 2L', price: 59.90, oldPrice: 79.90, discount: 'OFERTA', type: 'instant', category: 'pizza-specials', desc: 'Pizza Grande + Coca 2L.', img: 'img/combo-pizza.webp' },
    { id: 'pizza-bolonhesa-grande', name: 'Pizza Bolonhesa (8 Pedaços)', price: 79.80, type: 'pizza-builder', category: 'pizza-specials', desc: 'Molho especial.', mode: 'whole', size: 'grande', img: 'img/pizza-bolonhesa.webp' },
    { id: 'pizza-strog-media', name: 'Strogonoff (6 Pedaços)', price: 65.80, type: 'instant', category: 'pizza-specials', desc: 'Batata palha.', img: 'img/pizza-strogonoff.webp' },
    { id: 'pizza-2queijos-grande', name: '2 Queijos (8 Pedaços)', price: 65.80, type: 'pizza-builder', category: 'pizza-specials', desc: 'Mussarela e Catupiry.', mode: 'whole', size: 'grande', img: 'img/pizza-2queijos.webp' },
    { id: 'pizza-portuguesa-grande', name: 'Portuguesa (8 Pedaços)', price: 64.80, type: 'pizza-builder', category: 'pizza-specials', desc: 'Tradicional.', mode: 'whole', size: 'grande', img: 'img/pizza-portuguesa.webp' },

    // --- SEÇÃO 10: BEBIDAS ---
    { id: 'beb-fanta-laranja', name: 'Fanta Laranja 350ml', price: 7.50, type: 'instant', category: 'drinks', img: 'img/fanta-laranja.webp' },
    { id: 'beb-fanta-uva', name: 'Fanta Uva 350ml', price: 7.90, type: 'instant', category: 'drinks', img: 'img/fanta-uva.webp' },
    { id: 'beb-guarana', name: 'Guaraná 350ml', price: 7.50, type: 'instant', category: 'drinks', img: 'img/guarana.webp' },
    { id: 'beb-coca-lata', name: 'Coca-Cola 350ml', price: 7.90, type: 'instant', category: 'drinks', img: 'img/coca.webp' },
    { id: 'beb-suco', name: 'Suco Natural', price: 12.90, type: 'instant', category: 'drinks', img: 'img/suco.webp' },
    { id: 'beb-coca-2l', name: 'Coca-Cola 2 Litros', price: 18.00, oldPrice: 20.00, discount: '-10%', type: 'instant', category: 'drinks', desc: 'Família.', img: 'img/coca-2l.webp' }
];

// === 4. ESTADO DA APLICAÇÃO ===
let cart = [];
let currentFilter = 'hits';
let partyWizardData = { step: 1, size: null, savory: [], sweets: [], date: null, time: null, savoryLimit: 0, sweetLimit: 0, basePrice: 0 };
let currentCombo = { id: null, name: null, price: 0, max: 0, fixedItem: null, selections: {} };
let currentPizzaState = { mode: null, size: null, isSweet: false, edgePrice: 0, flavor1Price: 0, flavor2Price: 0, edgeName: '', flavor1Name: '', flavor2Name: '' };

// === 5. INICIALIZAÇÃO E EVENTOS ===
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(currentFilter);
    setupEventListeners();
    setupPhoneMask();
    injectWizardOptions();
    initMenuScrollLogic();
});

function setupEventListeners() {
    // Abas de Navegação
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderProducts(currentFilter);
            if (window.innerWidth < 768) document.getElementById('product-grid').scrollIntoView({ behavior: "smooth" });
        });
    });

    // Links dos Cards Hero
    document.querySelectorAll('.hero-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = card.dataset.category;
            const targetTab = document.querySelector(`.nav-tab[data-filter="${category}"]`);
            if (targetTab) targetTab.click();
        });
    });

    // Abrir/Fechar Carrinho
    const toggleCartFn = () => {
        document.getElementById('cart-sidebar').classList.toggle('open');
        renderCartItems();
    };
    document.getElementById('cart-trigger').addEventListener('click', toggleCartFn);
    document.getElementById('floating-cart-btn').addEventListener('click', toggleCartFn);
    document.getElementById('close-cart-btn').addEventListener('click', toggleCartFn);
    document.querySelector('.cart-overlay').addEventListener('click', toggleCartFn);

    // Wizard Kit Festa
    document.getElementById('open-wizard-btn').addEventListener('click', () => { document.getElementById('party-modal').classList.remove('hidden'); });
    document.getElementById('close-modal-btn').addEventListener('click', () => { document.getElementById('party-modal').classList.add('hidden'); });
    document.getElementById('next-step-btn').addEventListener('click', nextWizardStep);
    document.getElementById('prev-step-btn').addEventListener('click', prevWizardStep);

    // Listeners do Wizard
    document.querySelectorAll('input[name="kit-size"]').forEach(r => r.addEventListener('change', validateCurrentStep));
    document.getElementById('party-date').addEventListener('input', validateCurrentStep);
    document.getElementById('party-time').addEventListener('input', validateCurrentStep);

    // Modais (Combos & Pizzas)
    document.getElementById('close-combo-btn').addEventListener('click', () => document.getElementById('combo-modal').classList.add('hidden'));
    document.getElementById('close-pizza-btn').addEventListener('click', () => document.getElementById('pizza-modal').classList.add('hidden'));

    // Finalizar Pedido
    document.getElementById('finalize-order-btn').addEventListener('click', sendToWhatsApp);
}

// === 6. RENDERIZAÇÃO DE PRODUTOS ===
function renderProducts(filter) {
    const grid = document.getElementById('product-grid');
    const partyBanner = document.getElementById('party-builder-trigger');

    grid.innerHTML = '';

    // Banner Especial para Kit Festa
    if (filter === 'kits-festa') {
        partyBanner.classList.remove('hidden');
        grid.classList.add('hidden');
        return;
    } else {
        partyBanner.classList.add('hidden');
        grid.classList.remove('hidden');
    }

    // Filtra produtos pela categoria
    const filtered = productsDB.filter(p => p.category === filter);

    filtered.forEach(p => {
        // Badges e Preços
        const discountBadge = p.discount ? `<span class="discount-badge">${p.discount}</span>` : '';
        const priceDisplay = p.oldPrice
            ? `<div class="price-tag-container" style="align-items: flex-end;"><span class="price-old">R$ ${p.oldPrice.toFixed(2).replace('.', ',')}</span><span class="price">R$ ${p.price.toFixed(2).replace('.', ',')}</span></div>`
            : `<span class="price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>`;

        // 1. CARD DE COMBO (Abre Modal de Contagem)
        if (p.type === 'combo-trigger') {
            grid.insertAdjacentHTML('beforeend', `
                <article class="product-card" onclick="openComboModal('${p.id}')">
                    ${discountBadge}
                    <div class="card-img-wrapper"><img src="${p.img}" loading="lazy"></div>
                    <h3>${p.name}</h3><p class="desc">${p.desc}</p>
                    <div class="card-footer">${priceDisplay}<button class="btn btn-gold btn-sm">MONTAR</button></div>
                </article>
            `);
        }
        // 2. CARD DE PIZZA (Abre Modal Builder)
        else if (p.type === 'pizza-builder') {
            grid.insertAdjacentHTML('beforeend', `
                <article class="product-card" onclick="openPizzaModal('${p.mode}', '${p.size}', ${p.isSweet || false})">
                    <div class="card-img-wrapper"><img src="${p.img}" loading="lazy"></div>
                    <h3>${p.name}</h3><p class="desc">${p.desc}</p>
                    <div class="card-footer"><span class="price">A partir de R$ ${p.price.toFixed(2).replace('.', ',')}</span><button class="btn btn-gold btn-sm">MONTAR</button></div>
                </article>
            `);
        }
        // 3. CARD INSTANTÂNEO (Adiciona direto ao carrinho)
        else {
            const qty = (cart.find(i => i.id === p.id) || {}).qty || 0;
            const selectedClass = qty > 0 ? 'selected' : '';
            grid.insertAdjacentHTML('beforeend', `
                <article class="product-card ${selectedClass}" data-id="${p.id}">
                    ${discountBadge}
                    <div class="card-img-wrapper"><img src="${p.img}" loading="lazy"></div>
                    <h3>${p.name}</h3><p class="desc">${p.desc}</p>
                    <div class="card-footer">${priceDisplay}
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQty('${p.id}', -1)">-</button>
                        <span class="qty-count">${qty}</span>
                        <button class="qty-btn" onclick="updateQty('${p.id}', 1)">+</button>
                    </div></div>
                </article>
            `);
        }
    });
}

// === 7. LÓGICA DO CARRINHO ===
function updateQty(id, change) {
    const p = productsDB.find(x => x.id === id);
    let item = cart.find(x => x.id === id);

    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
    } else if (change > 0) {
        cart.push({ id: p.id, name: p.name, price: p.price, type: 'instant', img: p.img, qty: 1 });
    }
    updateCartState();
}

function updateCartState() {
    const total = cart.reduce((acc, i) => acc + i.qty, 0);
    document.getElementById('cart-count').textContent = total;
    document.getElementById('floating-badge').textContent = total;

    document.getElementById('floating-cart-btn').classList.toggle('hidden', total === 0);
    renderProducts(currentFilter); // Re-render para atualizar bordas
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        let detailsHTML = '';

        if (item.type === 'combo-pack') detailsHTML = `<ul><li>${item.details.flavors.join(', ')}</li></ul>`;
        if (item.type === 'pizza-custom') detailsHTML = `<ul><li>${item.details.flavors}</li><li>Borda: ${item.details.edge}</li></ul>`;
        if (item.type === 'kit-festa') detailsHTML = `<ul><li>Salg: ${item.details.savory.join(', ')}</li><li>Doces: ${item.details.sweets.join(', ')}</li><li>Data: ${item.details.date} ${item.details.time}</li></ul>`;

        container.insertAdjacentHTML('beforeend', `
            <div class="cart-item">
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.qty}x ${item.name}</span>
                    <div class="cart-kit-details">${detailsHTML}</div>
                    <span class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
            </div>
        `);
    });

    document.getElementById('cart-subtotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    const hasInstant = cart.some(i => i.type === 'instant');
    const hasScheduled = cart.some(i => i.type === 'kit-festa');
    const warnings = document.getElementById('checkout-warnings');
    warnings.innerHTML = (hasInstant && hasScheduled) ?
        `<div class="checkout-alert"><h4>⚠️ Pedido Misto</h4><p>Itens para AGORA e ENCOMENDA.</p></div>` : '';

    document.getElementById('finalize-order-btn').disabled = cart.length === 0;
    document.getElementById('checkout-form').classList.toggle('hidden', cart.length === 0);
}

function removeFromCart(id) {
    cart = cart.filter(x => x.id !== id);
    updateCartState();
    renderCartItems();
}

// === 8. LÓGICA DE COMBOS (Modal de Contagem) ===
function openComboModal(id) {
    const p = productsDB.find(x => x.id === id);
    currentCombo = { id: p.id, name: p.name, price: p.price, max: p.maxSelections, fixedItem: p.fixedItem, selections: {} };

    document.getElementById('combo-title').textContent = p.name;
    document.getElementById('combo-max-count').textContent = p.maxSelections;
    document.getElementById('combo-current-count').textContent = '0';
    document.getElementById('combo-price').textContent = `R$ ${p.price.toFixed(2).replace('.', ',')}`;

    const list = document.getElementById('combo-flavors-list');
    list.innerHTML = '';

    p.allowedFlavors.forEach(flavor => {
        list.insertAdjacentHTML('beforeend', `
            <div class="combo-item-row">
                <span class="combo-item-name">${flavor}</span>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateComboQty('${flavor}', -1)">-</button>
                    <span class="qty-count" id="count-${flavor.replace(/\s+/g, '-')}">0</span>
                    <button class="qty-btn" onclick="updateComboQty('${flavor}', 1)">+</button>
                </div>
            </div>
        `);
    });

    document.getElementById('combo-modal').classList.remove('hidden');
    const btn = document.getElementById('add-combo-btn');
    btn.disabled = true;
    btn.textContent = `ESCOLHA MAIS ${p.maxSelections}`;
    btn.onclick = addComboToCart;
}

function updateComboQty(flavor, change) {
    const total = Object.values(currentCombo.selections).reduce((a, b) => a + b, 0);
    const curr = currentCombo.selections[flavor] || 0;

    if (change > 0 && total >= currentCombo.max) return;
    if (change < 0 && curr <= 0) return;

    currentCombo.selections[flavor] = curr + change;

    document.getElementById(`count-${flavor.replace(/\s+/g, '-')}`).textContent = currentCombo.selections[flavor];
    const newTotal = Object.values(currentCombo.selections).reduce((a, b) => a + b, 0);
    document.getElementById('combo-current-count').textContent = newTotal;

    const btn = document.getElementById('add-combo-btn');
    const remaining = currentCombo.max - newTotal;

    if (remaining === 0) {
        btn.disabled = false;
        btn.textContent = "ADICIONAR";
    } else {
        btn.disabled = true;
        btn.textContent = `ESCOLHA MAIS ${remaining}`;
    }
}

function addComboToCart() {
    const flavors = [];
    if (currentCombo.fixedItem) flavors.push(`🥤 ${currentCombo.fixedItem}`);
    for (const [f, q] of Object.entries(currentCombo.selections)) { if (q > 0) flavors.push(`${q}x ${f}`); }

    cart.push({ id: `combo-${Date.now()}`, name: currentCombo.name, price: currentCombo.price, type: 'combo-pack', qty: 1, details: { flavors } });
    document.getElementById('combo-modal').classList.add('hidden');
    updateCartState();
    renderCartItems();
    document.getElementById('cart-sidebar').classList.add('open');
}

// === 9. LÓGICA DE PIZZA (Modal Builder Inteligente) ===
function openPizzaModal(mode, size, isSweet) {
    currentPizzaState = { mode, size, isSweet, edgePrice: 0, flavor1Price: 0, flavor2Price: 0, edgeName: '', flavor1Name: '' };

    document.getElementById('pizza-modal').classList.remove('hidden');
    const container = document.getElementById('pizza-flavors-container');
    container.innerHTML = '';
    container.className = mode === 'half' ? 'pizza-flavors-grid two-flavors' : 'pizza-flavors-grid';

    // Título
    const sizeName = size.charAt(0).toUpperCase() + size.slice(1);
    const typeName = isSweet ? "Doce" : "";
    document.getElementById('pizza-modal-title').textContent = `Montar ${sizeName} ${typeName}`;

    // Borda
    const edgeSel = document.getElementById('pizza-edge');
    edgeSel.innerHTML = '';
    if (isSweet) {
        edgeSel.innerHTML = '<option value="0" data-price="0">Tradicional (Doce)</option>';
        edgeSel.disabled = true;
        currentPizzaState.edgeName = 'Tradicional';
    } else {
        edgeSel.disabled = false;
        edgeSel.innerHTML = '<option value="" disabled selected>Escolha a Borda...</option>';
        PIZZA_DATA.edges.forEach((e, i) => {
            const priceTxt = e.price === 0 ? 'Grátis' : `+ R$ ${e.price.toFixed(2)}`;
            edgeSel.innerHTML += `<option value="${i}" data-price="${e.price}">${e.name} (${priceTxt})</option>`;
        });
        edgeSel.onchange = function () {
            currentPizzaState.edgePrice = parseFloat(this.options[this.selectedIndex].dataset.price);
            currentPizzaState.edgeName = PIZZA_DATA.edges[this.value].name;
            updatePizzaCalc();
        };
    }

    // Sabores
    const list = isSweet ? PIZZA_DATA.sweetFlavors : PIZZA_DATA.flavors;
    // Filtra preço pelo tamanho
    const options = list.map((f, i) => {
        const p = f.prices[size];
        return `<option value="${i}" data-price="${p}">${f.name} (R$${p.toFixed(2)})</option>`;
    }).join('');

    container.innerHTML += `<div class="flavor-group"><h4 class="gold">1º Sabor</h4><select id="pz-f1" class="dark-input" onchange="updatePizzaCalc()"><option value="" disabled selected>Selecione...</option>${options}</select></div>`;
    if (mode === 'half') container.innerHTML += `<div class="flavor-group"><h4 class="gold">2º Sabor</h4><select id="pz-f2" class="dark-input" onchange="updatePizzaCalc()"><option value="" disabled selected>Selecione...</option>${options}</select></div>`;

    updatePizzaCalc();
    document.getElementById('add-pizza-btn').onclick = addPizzaToCart;
}

function updatePizzaCalc() {
    const list = currentPizzaState.isSweet ? PIZZA_DATA.sweetFlavors : PIZZA_DATA.flavors;
    const f1 = document.getElementById('pz-f1');
    const f2 = document.getElementById('pz-f2');
    let ready = false; let finalPrice = 0;

    if (f1.value !== "") {
        currentPizzaState.flavor1Price = parseFloat(f1.options[f1.selectedIndex].dataset.price);
        currentPizzaState.flavor1Name = list[f1.value].name;
    }

    if (currentPizzaState.mode === 'half') {
        if (f2 && f2.value !== "") {
            currentPizzaState.flavor2Price = parseFloat(f2.options[f2.selectedIndex].dataset.price);
            currentPizzaState.flavor2Name = list[f2.value].name;
            // REGRA: Maior Valor
            finalPrice = Math.max(currentPizzaState.flavor1Price, currentPizzaState.flavor2Price) + currentPizzaState.edgePrice;
            if (f1.value !== "" && f2.value !== "") ready = true;
        }
    } else {
        finalPrice = currentPizzaState.flavor1Price + currentPizzaState.edgePrice;
        if (f1.value !== "") ready = true;
    }

    if (!currentPizzaState.isSweet && document.getElementById('pizza-edge').value === "") ready = false;

    document.getElementById('pizza-total-price').textContent = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
    document.getElementById('add-pizza-btn').disabled = !ready;
}

function addPizzaToCart() {
    const price = parseFloat(document.getElementById('pizza-total-price').textContent.replace('R$ ', '').replace(',', '.'));
    const flavors = currentPizzaState.mode === 'half' ? `½ ${currentPizzaState.flavor1Name} | ½ ${currentPizzaState.flavor2Name}` : currentPizzaState.flavor1Name;
    const sizeName = currentPizzaState.size.charAt(0).toUpperCase() + currentPizzaState.size.slice(1);

    cart.push({ id: `pizza-${Date.now()}`, name: `Pizza ${sizeName}`, price: price, type: 'pizza-custom', qty: 1, details: { edge: currentPizzaState.edgeName, flavors } });
    document.getElementById('pizza-modal').classList.add('hidden');
    updateCartState(); renderCartItems(); document.getElementById('cart-sidebar').classList.add('open');
}

// === 10. KIT FESTA WIZARD ===
function injectWizardOptions() {
    const savoryDiv = document.getElementById('savory-options');
    const sweetDiv = document.getElementById('sweet-options');
    // Opções Estáticas para o Kit Festa
    const salgados = ['Coxinha', 'Kibe', 'Bolinha Queijo', 'Risole'];
    const doces = ['Brigadeiro', 'Beijinho', 'Bicho de Pé'];

    savoryDiv.innerHTML = ''; sweetDiv.innerHTML = '';

    salgados.forEach(s => savoryDiv.innerHTML += `<label class="option-card"><input type="checkbox" name="kit-savory" value="${s}"> ${s}</label>`);
    doces.forEach(d => sweetDiv.innerHTML += `<label class="option-card"><input type="checkbox" name="kit-sweet" value="${d}"> ${d}</label>`);

    // Listeners Checkbox Limit
    [savoryDiv, sweetDiv].forEach(div => {
        div.querySelectorAll('input').forEach(cb => {
            cb.addEventListener('change', () => {
                const checked = div.querySelectorAll('input:checked');
                const limit = div.id.includes('savory') ? partyWizardData.savoryLimit : partyWizardData.sweetLimit;
                div.querySelectorAll('input:not(:checked)').forEach(others => others.disabled = checked.length >= limit);
                validateCurrentStep();
            });
        });
    });
}

function validateCurrentStep() {
    let valid = false;
    const step = partyWizardData.step;
    if (step === 1) valid = document.querySelector('input[name="kit-size"]:checked');
    if (step === 2) valid = document.querySelectorAll('input[name="kit-savory"]:checked').length > 0;
    if (step === 3) valid = document.querySelectorAll('input[name="kit-sweet"]:checked').length > 0;
    if (step === 4) valid = document.getElementById('party-date').value && document.getElementById('party-time').value;
    document.getElementById('next-step-btn').disabled = !valid;
}

function nextWizardStep() {
    if (partyWizardData.step === 1) {
        const sel = document.querySelector('input[name="kit-size"]:checked');
        partyWizardData.size = sel.value; partyWizardData.basePrice = parseFloat(sel.dataset.price);
        partyWizardData.savoryLimit = parseInt(sel.dataset.savoryLimit); partyWizardData.sweetLimit = parseInt(sel.dataset.sweetLimit);
        document.getElementById('savory-max').textContent = partyWizardData.savoryLimit;
        document.getElementById('sweet-max').textContent = partyWizardData.sweetLimit;
    } else if (partyWizardData.step === 2) {
        partyWizardData.savory = Array.from(document.querySelectorAll('input[name="kit-savory"]:checked')).map(x => x.value);
    } else if (partyWizardData.step === 3) {
        partyWizardData.sweets = Array.from(document.querySelectorAll('input[name="kit-sweet"]:checked')).map(x => x.value);
    } else if (partyWizardData.step === 4) {
        partyWizardData.date = document.getElementById('party-date').value;
        partyWizardData.time = document.getElementById('party-time').value;
        // Adicionar
        cart.push({ id: `kit-${Date.now()}`, name: partyWizardData.size, price: partyWizardData.basePrice, type: 'kit-festa', qty: 1, details: { savory: partyWizardData.savory, sweets: partyWizardData.sweets, date: partyWizardData.date, time: partyWizardData.time } });
        document.getElementById('party-modal').classList.add('hidden');
        updateCartState(); renderCartItems(); document.getElementById('cart-sidebar').classList.add('open');
        return;
    }
    partyWizardData.step++;
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.wizard-step[data-step="${partyWizardData.step}"]`).classList.add('active');
    document.getElementById('step-counter').textContent = `(${partyWizardData.step}/4)`;
    document.getElementById('prev-step-btn').classList.remove('hidden');
    document.getElementById('next-step-btn').textContent = partyWizardData.step === 4 ? "FINALIZAR" : "CONTINUAR";
    validateCurrentStep();
}

function prevWizardStep() {
    if (partyWizardData.step > 1) {
        partyWizardData.step--;
        document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
        document.querySelector(`.wizard-step[data-step="${partyWizardData.step}"]`).classList.add('active');
        document.getElementById('step-counter').textContent = `(${partyWizardData.step}/4)`;
        document.getElementById('prev-step-btn').classList.toggle('hidden', partyWizardData.step === 1);
        document.getElementById('next-step-btn').textContent = "CONTINUAR";
        validateCurrentStep();
    }
}

// === 11. CHECKOUT WHATSAPP ===
function sendToWhatsApp() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.getElementById('cust-payment').value;

    if (!name || !address || !payment) { alert("Preencha os dados de entrega."); return; }

    let text = `🔔 *NOVO PEDIDO* (#${Math.floor(Math.random() * 9000)})\n`;
    text += `👤 ${name}\n📞 ${phone}\n📍 ${address}\n💳 ${payment}\n\n`;

    cart.forEach(i => {
        text += `▪️ ${i.qty}x ${i.name}\n`;
        if (i.type === 'combo-pack') text += `   > ${i.details.flavors.join(', ')}\n`;
        if (i.type === 'pizza-custom') text += `   > ${i.details.flavors}\n   > Borda: ${i.details.edge}\n`;
        if (i.type === 'kit-festa') text += `   > Entregar: ${i.details.date} às ${i.details.time}\n`;
    });

    const total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    text += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

    window.open(`https://wa.me/55999999999?text=${encodeURIComponent(text)}`, '_blank');
}

function setupPhoneMask() {
    document.getElementById('cust-phone').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    });
}
// === LÓGICA DE SCROLL DO MENU (ATUALIZADA) ===
function initMenuScrollLogic() {
    const scroller = document.getElementById('nav-scroller');
    const leftBtn = document.getElementById('nav-indicator-left');
    const rightBtn = document.getElementById('nav-indicator-right');

    // 1. Função que controla a visibilidade
    const updateIndicators = () => {
        // Tolerância de 10px
        const isAtStart = scroller.scrollLeft <= 10;
        // Verifica se chegou no fim (scrollLeft + largura visível >= largura total)
        const isAtEnd = Math.ceil(scroller.scrollLeft + scroller.clientWidth) >= scroller.scrollWidth - 10;

        if (isAtStart) leftBtn.classList.add('hidden');
        else leftBtn.classList.remove('hidden');

        if (isAtEnd) rightBtn.classList.add('hidden');
        else rightBtn.classList.remove('hidden');
    };

    // 2. Ouvinte de Scroll (para quando arrasta com o dedo)
    scroller.addEventListener('scroll', updateIndicators);

    // 3. AÇÃO DE CLIQUE (NOVO)
    leftBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: -200, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Inicializa
    updateIndicators();

    // Ajuste ao redimensionar tela
    window.addEventListener('resize', updateIndicators);
}