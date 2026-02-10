const productsDB = [
    { id: 'esf-carne', name: 'Carne Clássica', price: 6.90, type: 'instant', category: 'esfihas-salgadas', desc: 'Carne moída de 1ª, tomate, cebola e tempero sírio.', img: 'https://placehold.co/300x300/252525/FFD700?text=Esfiha+Carne' },
    { id: 'esf-queijo', name: 'Queijo Mussarela', price: 7.50, type: 'instant', category: 'esfihas-salgadas', desc: 'Mussarela derretida, orégano e um toque de azeite.', img: 'https://placehold.co/300x300/252525/FFD700?text=Esfiha+Queijo' },
    { id: 'esf-calabresa', name: 'Calabresa Acebolada', price: 7.50, type: 'instant', category: 'esfihas-salgadas', desc: 'Calabresa fatiada, muita cebola e orégano.', img: 'https://placehold.co/300x300/252525/FFD700?text=Esfiha+Calabresa' },

    { id: 'esf-choco', name: 'Chocolate ao Leite', price: 8.90, type: 'instant', category: 'esfihas-doces', desc: 'Chocolate nobre derretido. O clássico.', img: 'https://placehold.co/300x300/252525/FFD700?text=Esfiha+Choco' },
    { id: 'esf-banana', name: 'Banana com Canela', price: 8.50, type: 'instant', category: 'esfihas-doces', desc: 'Banana fatiada, açúcar e canela gratinada.', img: 'https://placehold.co/300x300/252525/FFD700?text=Esfiha+Banana' },

    { id: 'salg-coxinha', name: 'Porção Coxinha (12un)', price: 22.00, type: 'instant', category: 'salgados-fritos', desc: 'Massa de batata crocante, recheio cremoso de frango.', img: 'https://placehold.co/300x300/252525/FFD700?text=Coxinha' },
    { id: 'salg-kibe', name: 'Porção Kibe (12un)', price: 22.00, type: 'instant', category: 'salgados-fritos', desc: 'Carne, trigo e hortelã. Acompanha limão.', img: 'https://placehold.co/300x300/252525/FFD700?text=Kibe' },

    { id: 'party-coxinha', name: 'Coxinha', type: 'savory-option' },
    { id: 'party-bolinha', name: 'Bolinha de Queijo', type: 'savory-option' },
    { id: 'party-risole', name: 'Risole de Presunto', type: 'savory-option' },
    { id: 'party-brigadeiro', name: 'Brigadeiro Tradicional', type: 'sweet-option' },
    { id: 'party-beijinho', name: 'Beijinho de Coco', type: 'sweet-option' },
    { id: 'party-bicho', name: 'Bicho de Pé', type: 'sweet-option' }
];

let cart = [];
let currentFilter = 'all';
let partyWizardData = {
    step: 1,
    size: null,
    savory: [],
    sweets: [],
    date: null,
    time: null,
    savoryLimit: 0,
    sweetLimit: 0,
    basePrice: 0
};

const productGrid = document.getElementById('product-grid');
const navTabs = document.querySelectorAll('.nav-tab');
const partyTrigger = document.getElementById('party-builder-trigger');
const cartCountBadge = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const finalizeBtn = document.getElementById('finalize-order-btn');
const checkoutWarnings = document.getElementById('checkout-warnings');
const checkoutForm = document.getElementById('checkout-form');

const partyModal = document.getElementById('party-modal');
const openWizardBtn = document.getElementById('open-wizard-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const prevStepBtn = document.getElementById('prev-step-btn');
const nextStepBtn = document.getElementById('next-step-btn');
const wizardSteps = document.querySelectorAll('.wizard-step');
const stepCounter = document.getElementById('step-counter');
const savoryMaxSpan = document.getElementById('savory-max');
const sweetMaxSpan = document.getElementById('sweet-max');

function init() {
    renderProducts(currentFilter);
    setupEventListeners();
    injectWizardOptions();
    setupPhoneMask();
}

function setupEventListeners() {
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            navTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderProducts(currentFilter);
            if (window.innerWidth < 768) {
                productGrid.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    document.querySelectorAll('.hero-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = card.dataset.category;
            const targetTab = document.querySelector(`.nav-tab[data-filter="${category}"]`);
            if (targetTab) targetTab.click();
        });
    });

    document.getElementById('cart-trigger').addEventListener('click', toggleCart);
    document.getElementById('close-cart-btn').addEventListener('click', toggleCart);

document.getElementById('cart-trigger').addEventListener('click', toggleCart);
document.getElementById('floating-cart-btn').addEventListener('click', toggleCart); 

document.getElementById('close-cart-btn').addEventListener('click', toggleCart);
    document.querySelector('.cart-overlay').addEventListener('click', toggleCart);

    openWizardBtn.addEventListener('click', openWizard);
    closeModalBtn.addEventListener('click', closeWizard);
    nextStepBtn.addEventListener('click', nextWizardStep);
    prevStepBtn.addEventListener('click', prevWizardStep);

    const sizeRadios = document.querySelectorAll('input[name="kit-size"]');
    sizeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            validateCurrentStep();
        });
    });

    document.getElementById('party-date').addEventListener('input', validateCurrentStep);
    document.getElementById('party-time').addEventListener('input', validateCurrentStep);

    finalizeBtn.addEventListener('click', sendToWhatsApp);
}


function renderProducts(filter) {
    productGrid.innerHTML = '';

    if (filter === 'kits-festa') {
        partyTrigger.classList.remove('hidden');
        productGrid.classList.add('hidden');
        return;
    } else {
        partyTrigger.classList.add('hidden');
        productGrid.classList.remove('hidden');
    }

    const filteredProducts = productsDB.filter(p => {
        if (p.type !== 'instant') return false;
        return filter === 'all' || p.category === filter;
    });

    filteredProducts.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const qty = cartItem ? cartItem.qty : 0;
        const isSelectedClass = qty > 0 ? 'selected' : '';

        const cardHTML = `
            <article class="product-card ${isSelectedClass}" data-id="${product.id}">
                <div class="card-img-wrapper">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                </div>
                <h3>${product.name}</h3>
                <p class="desc">${product.desc}</p>
                <div class="card-footer">
                    <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <div class="qty-control">
                        <button class="qty-btn minus" onclick="updateQty('${product.id}', -1)">-</button>
                        <span class="qty-count">${qty}</span>
                        <button class="qty-btn plus" onclick="updateQty('${product.id}', 1)">+</button>
                    </div>
                </div>
            </article>
        `;
        productGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function updateQty(productId, change) {
    let cartItem = cart.find(item => item.id === productId);
    const product = productsDB.find(p => p.id === productId);

    if (cartItem) {
        cartItem.qty += change;
        if (cartItem.qty <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    } else if (change > 0) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            type: product.type,
            img: product.img,
            qty: 1
        });
    }
    updateCartState();
}

function updateCartState() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    
    cartCountBadge.textContent = totalItems;

    const floatingBtn = document.getElementById('floating-cart-btn');
    const floatingBadge = document.getElementById('floating-badge');
    
    if (floatingBadge) floatingBadge.textContent = totalItems;

    if (totalItems > 0) {
        floatingBtn.classList.remove('hidden');
    } else {
        floatingBtn.classList.add('hidden');
    }

    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        const qtySpan = card.querySelector('.qty-count');
        const cartItem = cart.find(item => item.id === id);
        
        if (cartItem) {
            card.classList.add('selected');
            qtySpan.textContent = cartItem.qty;
        } else {
            card.classList.remove('selected');
            qtySpan.textContent = '0';
        }
    });

    renderCartItems();
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    if (cartSidebar.classList.contains('open')) {
        renderCartItems();
    }
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let hasInstant = false;
    let hasScheduled = false;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartSubtotalEl.textContent = 'R$ 0,00';
        finalizeBtn.disabled = true;
        checkoutForm.classList.add('hidden');
        checkoutWarnings.innerHTML = '';
        return;
    }

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        if (item.type === 'instant') hasInstant = true;
        if (item.type === 'kit-festa') hasScheduled = true;

        let detailsHTML = '';
        if (item.type === 'kit-festa') {
            detailsHTML = `
                <div class="cart-kit-details">
                    <ul>
                        <li>Salgados: ${item.details.savory.join(', ')}</li>
                        <li>Doces: ${item.details.sweets.join(', ')}</li>
                        <li>Agendado: ${formatDate(item.details.date)} às ${item.details.time}</li>
                    </ul>
                </div>
            `;
        }

        const itemHTML = `
            <div class="cart-item">
                <img src="${item.img || 'https://placehold.co/100x100/252525/FFD700?text=Kit'}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.name} (${item.qty}x)</span>
                    ${detailsHTML}
                    <span class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    checkoutWarnings.innerHTML = '';
    finalizeBtn.disabled = false;
    checkoutForm.classList.remove('hidden');

    if (hasInstant && hasScheduled) {
        checkoutWarnings.innerHTML = `
            <div class="checkout-alert">
                <h4>⚠️ Atenção: Pedido Misto</h4>
                <p>Você tem itens para AGORA e ENCOMENDA agendada.</p>
                <div class="options-grid single-choice" style="margin-top:10px;">
                     <label class="option-card" style="padding: 10px;">
                        <input type="radio" name="delivery-mode" value="separado" checked>
                        <div class="option-content">
                            <span class="option-title" style="font-size:0.9rem;">Enviar separado (Pode haver dupla taxa)</span>
                        </div>
                    </label>
                    <label class="option-card" style="padding: 10px;">
                        <input type="radio" name="delivery-mode" value="juntos">
                        <div class="option-content">
                            <span class="option-title" style="font-size:0.9rem;">Enviar tudo na data da festa</span>
                        </div>
                    </label>
                </div>
            </div>
        `;
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartState();
}


function injectWizardOptions() {
    const savoryContainer = document.getElementById('savory-options');
    const sweetContainer = document.getElementById('sweet-options');

    productsDB.forEach(p => {
        if (p.type === 'savory-option') {
            savoryContainer.insertAdjacentHTML('beforeend', createCheckboxOption('kit-savory', p.name, p.name));
        }
        if (p.type === 'sweet-option') {
            sweetContainer.insertAdjacentHTML('beforeend', createCheckboxOption('kit-sweet', p.name, p.name));
        }
    });

    attachCheckboxListeners(savoryContainer, 'savoryLimit');
    attachCheckboxListeners(sweetContainer, 'sweetLimit');
}

function createCheckboxOption(name, value, label) {
    return `
        <label class="option-card checkbox-option">
            <input type="checkbox" name="${name}" value="${value}">
            <div class="option-content"><span class="option-title">${label}</span></div>
        </label>
    `;
}

function attachCheckboxListeners(container, limitKey) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const selected = container.querySelectorAll('input[type="checkbox"]:checked');
            const limit = partyWizardData[limitKey];

            checkboxes.forEach(box => {
                if (!box.checked) {
                    const parent = box.closest('.option-card');
                    if (selected.length >= limit) {
                        box.disabled = true;
                        parent.classList.add('disabled');
                    } else {
                        box.disabled = false;
                        parent.classList.remove('disabled');
                    }
                }
            });
            validateCurrentStep();
        });
    });
}

function openWizard() {
    partyModal.classList.remove('hidden');
    resetWizard();
    updateWizardView();
}

function closeWizard() {
    partyModal.classList.add('hidden');
}

function resetWizard() {
    partyWizardData = { step: 1, size: null, savory: [], sweets: [], date: null, time: null, savoryLimit: 0, sweetLimit: 0, basePrice: 0 };
    document.querySelectorAll('#party-modal input').forEach(i => {
        i.checked = false;
        i.disabled = false;
        i.closest('.option-card')?.classList.remove('disabled');
    });
    document.getElementById('party-date').value = '';
    document.getElementById('party-time').value = '';
}

function updateWizardView() {
    wizardSteps.forEach(s => s.classList.remove('active'));
    document.querySelector(`.wizard-step[data-step="${partyWizardData.step}"]`).classList.add('active');
    stepCounter.textContent = `(Passo ${partyWizardData.step}/4)`;

    prevStepBtn.classList.toggle('hidden', partyWizardData.step === 1);
    nextStepBtn.textContent = partyWizardData.step === 4 ? 'ADICIONAR AO CARRINHO' : 'Continuar';

    validateCurrentStep();
}

function validateCurrentStep() {
    let isValid = false;
    const currentStepContainer = document.querySelector(`.wizard-step[data-step="${partyWizardData.step}"]`);

    switch (partyWizardData.step) {
        case 1:
            isValid = currentStepContainer.querySelector('input[name="kit-size"]:checked') !== null;
            break;
        case 2:
            isValid = currentStepContainer.querySelectorAll('input[name="kit-savory"]:checked').length > 0;
            break;
        case 3:
            isValid = currentStepContainer.querySelectorAll('input[name="kit-sweet"]:checked').length > 0;
            break;
        case 4:
            const dateInput = document.getElementById('party-date').value;
            const timeInput = document.getElementById('party-time').value;
            isValid = dateInput !== '' && timeInput !== '';
            break;
    }
    nextStepBtn.disabled = !isValid;
}

function nextWizardStep() {
    captureStepData();
    if (partyWizardData.step < 4) {
        partyWizardData.step++;
        updateWizardView();
    } else {
        addKitToCart();
        closeWizard();
        toggleCart();
    }
}

function prevWizardStep() {
    if (partyWizardData.step > 1) {
        partyWizardData.step--;
        updateWizardView();
    }
}

function captureStepData() {
    const step = partyWizardData.step;
    if (step === 1) {
        const selectedSize = document.querySelector('input[name="kit-size"]:checked');
        partyWizardData.size = selectedSize.value;
        partyWizardData.basePrice = parseFloat(selectedSize.dataset.price);
        partyWizardData.savoryLimit = parseInt(selectedSize.dataset.savoryLimit);
        partyWizardData.sweetLimit = parseInt(selectedSize.dataset.sweetLimit);
        savoryMaxSpan.textContent = partyWizardData.savoryLimit;
        sweetMaxSpan.textContent = partyWizardData.sweetLimit;
    } else if (step === 2) {
        partyWizardData.savory = Array.from(document.querySelectorAll('input[name="kit-savory"]:checked')).map(el => el.value);
    } else if (step === 3) {
        partyWizardData.sweets = Array.from(document.querySelectorAll('input[name="kit-sweet"]:checked')).map(el => el.value);
    } else if (step === 4) {
        partyWizardData.date = document.getElementById('party-date').value;
        partyWizardData.time = document.getElementById('party-time').value;
    }
}

function addKitToCart() {
    const kitId = `kit-${Date.now()}`;
    cart.push({
        id: kitId,
        name: partyWizardData.size,
        price: partyWizardData.basePrice,
        type: 'kit-festa',
        qty: 1,
        details: {
            savory: partyWizardData.savory,
            sweets: partyWizardData.sweets,
            date: partyWizardData.date,
            time: partyWizardData.time
        }
    });
    updateCartState();
}

function sendToWhatsApp() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.getElementById('cust-payment').value;
    
    if(!name || !phone || !address || !payment) {
        alert("Por favor, preencha todos os campos de entrega.");
        return;
    }

    const orderId = Math.floor(1000 + Math.random() * 9000);
    
    let text = `NOVO PEDIDO DO SITE\n`;
    text += `Cliente: ${name}\n`;
    text += `Tel: ${phone}\n`;
    text += `Endereço: ${address}\n`;
    text += `Pagamento: ${payment}\n\n`;

    const instantItems = cart.filter(i => i.type === 'instant');
    const kitItems = cart.filter(i => i.type === 'kit-festa');
    const deliveryModeRadio = document.querySelector('input[name="delivery-mode"]:checked');
    const deliveryMode = deliveryModeRadio ? deliveryModeRadio.value : null;

    if (instantItems.length > 0) {
        text += `━━━━━━━━━━━━━━━━━━\n`;
        text += `PARA AGORA (Pronta Entrega):\n`;
        if (deliveryMode === 'juntos') {
             text += `Atenção: Cliente optou por receber junto com a encomenda.\n`;
        }
        text += `━━━━━━━━━━━━━━━━━━\n`;
        instantItems.forEach(item => {
            text += `• ${item.qty}x ${item.name}\n`;
        });
        text += `\n`;
    }

    if (kitItems.length > 0) {
        kitItems.forEach(kit => {
            text += `━━━━━━━━━━━━━━━━━━\n`;
            text += `ENCOMENDA (Kit Festa):\n`;
            text += `Entrega: ${formatDate(kit.details.date)} às ${kit.details.time}\n`;
            text += `━━━━━━━━━━━━━━━━━━\n`;
            text += `1x ${kit.name}*\n`;
            text += `   > Salgados: ${kit.details.savory.join(', ')}\n`;
            text += `   > Doces: ${kit.details.sweets.join(', ')}\n\n`;
        });
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    text += `━━━━━━━━━━━━━━━━━━\n`;
    text += `SUBTOTAL: R$ ${total.toFixed(2).replace('.', ',')}\n`;
    text += `TAXA: A calcular\n`;
    text += `TOTAL ESTIMADO: R$ ${total.toFixed(2).replace('.', ',')} + Entrega`;

    const encodedText = encodeURIComponent(text);
    
    const whatsappNumber = "554388585099";

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
}


function formatDate(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}`;
}

function setupPhoneMask() {
    const phoneInput = document.getElementById('cust-phone');
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

document.addEventListener('DOMContentLoaded', init);