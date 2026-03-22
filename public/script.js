let products = [];
let selectedPrice = 0;

// 1. Carregar produtos do servidor (GET)
async function carregarProdutosDoServidor() {
    try {
        const response = await fetch('/produtos', {
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            }
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                alert("Sessão expirada. Por favor, faça login novamente.");
                window.location.href = 'login.html';
                return;
            }
            throw new Error('Erro ao carregar produtos');
        }

        products = await response.json();
        renderCatalog();
    } catch (error) {
        console.error("Erro:", error);
        const container = document.getElementById('catalog-container');
        if (container) {
            container.innerHTML = "<p class='text-red-400 text-center py-10'>Erro ao conectar com o servidor.</p>";
        }
    }
}

// 2. Renderizar Catálogo na Tela
function renderCatalog() {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    
    document.getElementById('items-count').textContent = `${products.length} itens no sistema`;

    if (products.length === 0) {
        container.innerHTML = "<p class='col-span-full text-center py-10 text-slate-500'>Nenhum produto cadastrado.</p>";
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card glass-card p-6 rounded-[2rem] flex items-center justify-between transition-all cursor-pointer group border-2 border-transparent"
             onclick="selectProduct(${product.preco}, this)">
            <div class="flex items-center gap-4">
                <div class="bg-slate-800 p-4 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                    <i class="fas fa-${product.icone || 'box'} text-slate-500 group-hover:text-emerald-400"></i>
                </div>
                <div>
                    <h4 class="font-bold text-slate-100">${product.nome}</h4>
                    <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">${product.categoria}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="text-right mr-2">
                    <span class="block text-lg font-bold text-emerald-400">R$ ${Number(product.preco).toFixed(2)}</span>
                </div>
                
                <button onclick="event.stopPropagation(); editarPreco('${product._id}', '${product.nome}')" 
                        class="text-slate-600 hover:text-blue-500 p-2 transition-colors" title="Editar Preço">
                    <i class="fas fa-edit"></i>
                </button>

                <button onclick="event.stopPropagation(); excluirProduto('${product._id}')" 
                        class="text-slate-600 hover:text-red-500 p-2 transition-colors" title="Excluir Produto">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// 3. Seleção e Cálculos
function selectProduct(price, element) {
    document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected-card'));
    element.classList.add('selected-card');
    selectedPrice = price;
    updateTotals();
}

function updateTotals() {
    const subtotal = selectedPrice;
    const discountInput = document.getElementById('discount-input');
    const discountPercent = discountInput ? (parseFloat(discountInput.value) || 0) : 0;
    const total = subtotal - (subtotal * discountPercent / 100);

    const subLabel = document.getElementById('subtotal-val');
    const totLabel = document.getElementById('total-val');
    
    if (subLabel) subLabel.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (totLabel) totLabel.textContent = `R$ ${total.toFixed(2)}`;
}

// 4. Cadastro de Novo Produto (POST)
const form = document.getElementById('form-produto');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const novo = {
            nome: document.getElementById('nome').value,
            preco: parseFloat(document.getElementById('preco').value),
            categoria: document.getElementById('categoria').value,
            icone: "box"
        };

        try {
            const response = await fetch('/produtos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(novo)
            });
            
            if (response.ok) {
                form.reset();
                carregarProdutosDoServidor();
            } else {
                alert("Erro ao salvar: verifique se você está logado.");
            }
        } catch (err) {
            alert("Erro de conexão com o servidor.");
        }
    });
}

// 5. Excluir Produto (DELETE)
async function excluirProduto(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
        const response = await fetch(`/produtos/${id}`, { 
            method: 'DELETE',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            }
        });
        if (response.ok) {
            carregarProdutosDoServidor();
        } else {
            alert("Erro ao excluir o produto.");
        }
    } catch (error) {
        console.error("Erro ao excluir:", error);
    }
}

// 6. Editar Preço (PUT)
async function editarPreco(id, nomeAtual) {
    const novoPreco = prompt(`Digite o novo preço para: ${nomeAtual}`);
    if (novoPreco === null || novoPreco === "" || isNaN(novoPreco)) return;

    try {
        const response = await fetch(`/produtos/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            },
            body: JSON.stringify({ preco: parseFloat(novoPreco) })
        });

        if (response.ok) {
            carregarProdutosDoServidor();
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
}

// 7. Finalizar Pedido
window.finalizar = function() {
    if(selectedPrice === 0) return alert("Por favor, selecione um produto primeiro!");
    const toast = document.getElementById('toast');
    if(toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
};

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', carregarProdutosDoServidor);

// --- LÓGICA DE BUSCA DE CEP ---
const cepField = document.getElementById('cep-field');
const apiResult = document.getElementById('api-result');
if (cepField) {
    cepField.addEventListener('blur', async () => {
        const cep = cepField.value.replace(/\D/g, ''); 
        if (cep.length !== 8) return;
        apiResult.textContent = "Buscando endereço...";
        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
            if (!response.ok) throw new Error();
            const data = await response.json();
            apiResult.innerHTML = `<span class="text-emerald-400">${data.street || 'Rua n/i'}</span>, ${data.city}-${data.state}`;
        } catch (error) {
            apiResult.textContent = "CEP não encontrado.";
        }
    });
}

// --- LÓGICA DE DESCONTO ---
const discountInput = document.getElementById('discount-input');
if (discountInput) {
    discountInput.addEventListener('input', () => updateTotals());
}