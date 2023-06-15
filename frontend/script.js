function enviarMensagem() {
    mensagem = $('#input').val();

    xhr = new XMLHttpRequest();
    xhr.open('post', '/inserirMensagem' ,true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log('CADASTRADO!')
        }
    }
    
    let data = {
        mensagem: mensagem
    }

    console.log (JSON.stringify(data))
    xhr.send(JSON.stringify(data));
}

function mostrarMensagens() {
    xhr = new XMLHttpRequest();
    xhr.open('get', '/pegarMensagem', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status == 200) {
            let html=""
            JSON.parse(xhr.responseText).forEach(msg => {
                html += `<div>${msg.id}: ${msg.mensagem}</div>`
            });
            $("#mensagens_div").html(html);
        }
    }
    xhr.send();
}