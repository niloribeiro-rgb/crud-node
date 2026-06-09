const form = document.getElementById("formAluno")
const listaAlunos = document.getElementById("listaAlunos")

const inputId = document.getElementById("id")
const inputnome = document.getElementById("nome")
const inputcurso = document.getElementById("curso")
const inputidade = document.getElementById("idade")

//READ

async function listarAlunos() {
    const resposta = await fetch("/alunos")
    const alunos = await resposta.json()

    listaAlunos.innerHTML = ""
    // alert("ola")
    alunos.forEach(aluno => {
        listaAlunos.innerHTML += `
         <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.idade}</td>
        <td>
            <button class="btn-editar"
        onclick="editarAluno('${aluno.id}', '${aluno.nome}', '${aluno.curso}', '${aluno.idade}')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>Editar
    </button>
    <button class="btn-excluir" onclick="excluirAluno('${aluno.id}')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>Excluir
    </button>
        </td>
    </tr>`
    })
}

// CREATE e UPDATE
form.addEventListener('submit', async function (event) {
    event.preventDefault()

    const aluno = {
        nome: inputnome.value,
        curso: inputcurso.value,
        idade: inputidade.value
    }

    if (inputId.value) {
        await fetch(`/alunos/${inputId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)

        })

    }
    else {
        await fetch("/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        })
    }

    form.reset()
    inputId.value = ""
    listarAlunos()
})

// DELETE
async function excluirAluno(id) {
    await fetch(`/alunos/${id}`, {
        method: "DELETE"
    })
    listarAlunos()
}
listarAlunos()

/* EDITAR */
function editarAluno(id, nome, curso, idade) {
    inputId.value = id
    inputnome.value = nome
    inputcurso.value = curso
    inputidade.value = idade
}
listarAlunos()