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
        <td>${aluno.id}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.idade}</td>
        <td>
            <button class="btn-editar" onclick="editarAlunos(${aluno.id}, '${aluno.nome}', '${aluno.curso}', '${aluno.idade}')">editar</button>
            <button class="btn-excluir" onclick="excluirAluno(${aluno.id})">excluir</button>
        </td>
    </tr>`
    })
}

// CREATE e UPDATE
form.addEventListener("submit", async function (event) {
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
                "content-Type": "application/json"
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