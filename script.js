const whatsappNumber = "5511978449058";

fetch("produtos.json")
  .then(res => res.json())
  .then(data => {
    renderProducts(data);
    populateSizes(data);
  });

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  const sizeFilter = document.getElementById("filterSize").value;
  const statusFilter = document.getElementById("filterStatus").value;

  const sorted = products.sort((a,b) => 
    a.status === "vendido" ? 1 : -1
  );

  sorted.forEach(prod => {
    if ((sizeFilter !== "all" && prod.tamanho !== sizeFilter) ||
        (statusFilter !== "all" && prod.status !== statusFilter)) return;

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = prod.fotos[0];
    card.appendChild(img);

    const code = document.createElement("div");
    code.className = "code";
    code.textContent = prod.codigo;
    card.appendChild(code);

    const desc = document.createElement("div");
    desc.textContent = prod.descricao;
    card.appendChild(desc);

    const status = document.createElement("div");
    status.className = `status ${prod.status}`;
    status.textContent = prod.status === "disponivel" ? "DISPONÍVEL" : "VENDIDO";
    card.appendChild(status);

    if(prod.status === "disponivel") {
      const btn = document.createElement("a");
      btn.className = "whatsapp-btn";
      btn.href = `https://wa.me/${whatsappNumber}?text=Olá, quero o produto ${prod.codigo}`;
      btn.target = "_blank";
      btn.textContent = "Comprar pelo WhatsApp";
      card.appendChild(btn);
    }

    container.appendChild(card);
  });
}

function populateSizes(products) {
  const sizes = [...new Set(products.map(p => p.tamanho))];
  const select = document.getElementById("filterSize");

  sizes.forEach(size => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    select.appendChild(option);
  });

  document.getElementById("filterSize").addEventListener("change", () => renderProducts(products));
  document.getElementById("filterStatus").addEventListener("change", () => renderProducts(products));
}
