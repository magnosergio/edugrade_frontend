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
/* ----------------------------------------------------------------------- */
// Variáveis para salvar a id dos dados selecionados no form de cadastro de notas
var idAluno;
var idDisciplina;

// Função para preencher os dados no cadastro de notas
function getInfo() {
    // GET Alunos
    fetch('http://18.117.70.4:8000/api/v1/alunos/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os alunos');
            }
            return response.json();
        })
        .then(data => {
            const alunosList = document.getElementById('alunosList');
            data.forEach(aluno => {
                const option = document.createElement('option');
                option.value = aluno.nome;
                idAluno = aluno.id;
                alunosList.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    // GET Disciplinas
    fetch('http://18.117.70.4:8000/api/v1/disciplinas/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter as disciplinas');
            }
            return response.json();
        })
        .then(data => {
            const disciplinasList = document.getElementById('disciplinasList');
            data.forEach(disciplina => {
                const option = document.createElement('option');
                option.value = disciplina.nome;
                idDisciplina = disciplina.id;
                disciplinasList.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function cadastrarNota(){
    // Obter o valor dos campos de entrada.
    // Para os campos de Aluno e Disciplina, serão usado as id's salvas.
    const aluno = idAluno;    
    const ano = document.getElementById('anoInput').value;
    const bimestre = document.getElementById('bimestreInput').value;
    const disciplina = idDisciplina;
    const nota = document.getElementById('notaInput').value;

    // Dados a serem enviados
    const data = {
        bimestre: bimestre,
        ano: ano,
        nota: nota,
        aluno: aluno,
        disciplina: disciplina
    };

    // Token
    const token = '8c3ddc34ec43cef32fc618ca085fedbb71c48b39';

    // URL da API
    const url = 'http://18.117.70.4:8000/api/v1/notas/';

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
            // Limpar os campos para permitir novo cadastro
            alunoSelected.value = '';
            anoInput.value = '';
            bimestreInput.value = '';
            disciplinaSelected.value = '';
            notaInput.value = '';

            // Exibir mensagem de sucesso em um popup
            alert('Nota cadastrado com sucesso!');
        } else {
            throw new Error('Erro ao cadastrar aluno');
        }
    })
    .catch(error => {
        // Exibir mensagem de erro em um popup
        alert('Erro: ' + error);
    });
}