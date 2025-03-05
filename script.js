function calculateTotal() {
    var quantidade = parseFloat(document.getElementById('quantidade').value) || 0;
    var valorUnitario = parseFloat(document.getElementById('valor-unitario').value) || 0;
    var valorTotal = quantidade * valorUnitario;
    document.getElementById('valor-total').value = formatCurrency(valorTotal);
}

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function addItem() {
    var codigo = document.getElementById('codigo').value;
    var descricao = document.getElementById('descricao').value;
    var quantidade = parseFloat(document.getElementById('quantidade').value) || 0;
    var valorUnitario = parseFloat(document.getElementById('valor-unitario').value) || 0;
    var valorTotal = quantidade * valorUnitario;

    if (codigo && descricao && quantidade > 0 && valorUnitario > 0) {
        var table = document.getElementById('item-list');
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = codigo;
        cell2.innerHTML = descricao;
        cell3.innerHTML = quantidade;
        cell4.innerHTML = formatCurrency(valorUnitario);
        cell5.innerHTML = formatCurrency(valorTotal);
        cell6.innerHTML = '<button onclick="removeItem(this)">Remover</button>';
        cell6.classList.add('no-print');

        document.getElementById('codigo').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('valor-unitario').value = '';
        document.getElementById('valor-total').value = '';

        updateTotalGeral();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function removeItem(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalGeral();
}

function updateTotalGeral() {
    var table = document.getElementById('item-list');
    var rows = table.getElementsByTagName('tr');
    var totalGeral = 0;

    for (var i = 1; i < rows.length; i++) {
        var valorTotalCell = rows[i].cells[4];
        var valorTotalText = valorTotalCell.innerText || valorTotalCell.textContent;
        var valorTotal = parseFloat(valorTotalText.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;

        totalGeral += valorTotal;
    }

    document.getElementById('total-geral').innerText = formatCurrency(totalGeral);
}

function printPage() {
    window.print();
}

