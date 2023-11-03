// Função para o menu lateral
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    //document.getElementById("main").style.marginLeft = "200px";
    document.getElementById("container").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
    document.getElementById("container").style.marginLeft = "100px";
}
/* ----------------------------------------------------------------------- */

// Evento ao clicar nas opções do menu dropdown
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        const optionId = event.target.id;
        let apiUrl = '';
        
        // Define a URL com base na opção selecionada
        switch (optionId) {
            case 'notas':
                apiUrl = 'http://18.117.70.4:8000/api/v1/notas/';
                break;
            case 'alunos':
                apiUrl = 'http://18.117.70.4:8000/api/v1/alunos/';
                break;
            case 'disciplinas':
                apiUrl = 'http://18.117.70.4:8000/api/v1/disciplinas/';
                break;
            default:
                apiUrl = 'http://18.117.70.4:8000/api/v1/notas/';
        }

        document.getElementById("mytitle").textContent = event.target.innerHTML
        
        // Faz a requisição com a URL correspondente à opção escolhida
        if (apiUrl !== '') {
            requestData(apiUrl);
        }
    });
});
/* ----------------------------------------------------------------------- */

// Função para fazer a requisição à API com base na opção selecionada
function requestData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json(); // Transforma a resposta em JSON
        })
        .then(data => {
            const dataBody = document.getElementById('data-body');
            const headerRow = document.getElementById('header-row');
            
            // Limpa os dados anteriores da tabela
            dataBody.innerHTML = '';
            headerRow.innerHTML = '';
            
            // Cria a primeira linha (cabeçalho) da tabela baseada nas chaves do primeiro item retornado
            Object.keys(data[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });

            // Preenche a tabela com os dados
            data.forEach(item => {
                const row = document.createElement('tr');
                Object.values(item).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                dataBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro:', error); // Em caso de erro, imprime no console
        });
}
/* ----------------------------------------------------------------------- */

// Função para cadastrar Aluno
function cadastrarAluno() {
    // Obter o valor do campo de entrada "Nome"
    const nome = document.getElementById('nomeInput').value;

    // Dados a serem enviados
    const data = {
        nome: nome
    };

    // Token
    const token = '8c3ddc34ec43cef32fc618ca085fedbb71c48b39';

    // URL da API
    const url = 'http://18.117.70.4:8000/api/v1/alunos/';

    // Enviar a solicitação POST para a API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Limpar o campo "nome" para permitir novo cadastro
            nomeInput.value = '';

            // Exibir mensagem de sucesso em um popup
            alert('Aluno cadastrado com sucesso!');
        } else {
            throw new Error('Erro ao cadastrar aluno');
        }
    })
    .catch(error => {
        // Exibir mensagem de erro em um popup
        alert('Erro: ' + error);
    });
}

// Função para cadastrar Disciplina
function cadastrarDisciplina() {
    // Obter o valor do campo de entrada "Nome"
    const nome = document.getElementById('disciplinaInput').value;

    // Dados a serem enviados
    const data = {
        nome: nome
    };

    // Token
    const token = '8c3ddc34ec43cef32fc618ca085fedbb71c48b39';

    // URL da API
    const url = 'http://18.117.70.4:8000/api/v1/disciplinas/';

    // Enviar a solicitação POST para a API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Limpar o campo "nome" para permitir novo cadastro
            disciplinaInput.value = '';

            // Exibir mensagem de sucesso em um popup
            alert('Disciplina cadastrado com sucesso!');
        } else {
            throw new Error('Erro ao cadastrar aluno');
        }
    })
    .catch(error => {
        // Exibir mensagem de erro em um popup
        alert('Erro: ' + error);
    });
}

function getInfo() {}