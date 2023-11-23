// wwwroot/js/cart-script.js

$(document).ready(function () {
    function updateCartItem(parent) {
        // Obt�m a quantidade atual e converte para um n�mero
        var qtyInput = parent.find(".qty-input");
        var currentQty = parseInt(qtyInput.val()) || 0;

        // Obt�m o texto do pre�o unit�rio do produto
        var unitPriceText = parent.find(".price").text().trim();

        // Extrai apenas os d�gitos do pre�o
        var unitPriceDigits = unitPriceText.replace(/[^\d,.-]/g, '');

        // Converte para um n�mero
        var unitPrice = parseFloat(unitPriceDigits.replace(",", ".")) || 0;

        // Calcula e atualiza o pre�o total
        var totalPrice = unitPrice * currentQty;

        // Atualiza o pre�o total na interface
        parent.find(".subtotal h5").text(totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        // Atualiza o valor total na p�gina do carrinho
        updateCartTotal();
    }

    function updateCartTotal() {
        // Atualiza o valor total do carrinho na interface
        var cartTotal = 0;

        $(".cart-item").each(function () {
            var qtyInput = $(this).find(".qty-input");
            var currentQty = parseInt(qtyInput.val()) || 0;

            var unitPriceText = $(this).find(".price").text().trim();
            var unitPriceDigits = unitPriceText.replace(/[^\d,.-]/g, '');
            var unitPrice = parseFloat(unitPriceDigits.replace(",", ".")) || 0;

            cartTotal += unitPrice * currentQty;
        });

        // Atualiza o valor total na p�gina do carrinho
        $(".total h4").text(cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        // Atualiza o valor total abaixo
        $(".list-total .price").text(cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        // Atualiza o valor subtotal abaixo
        $(".subtotal .price").text(cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }

    // Manipula o evento de clique nos bot�es de incremento e decremento
    $(".qty-left-minus, .qty-right-plus").on("click", function () {
        var parent = $(this).closest(".cart-item");

        // Obt�m a quantidade atual e converte para um n�mero
        var qtyInput = parent.find(".qty-input");
        var currentQty = parseInt(qtyInput.val()) || 0;

        // Atualiza a quantidade com base no bot�o clicado
        if ($(this).data("type") === "minus" && currentQty > 1) {
            qtyInput.val(currentQty - 1);
        } else if ($(this).data("type") === "plus") {
            qtyInput.val(currentQty + 1);
        }

        // Atualiza o pre�o total do item
        updateCartItem(parent);
    });

    // Chama a fun��o para atualizar o valor total inicialmente
    updateCartTotal();
});
