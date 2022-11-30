// Seleção dos Elementos e Variáveis
const modal = document.getElementById('modal');
const addTask = document.getElementById('addTask');
const form = document.getElementById('form');
const titleInput = document.getElementById('textInput');
const dateInput = document.getElementById('dateInput');
const textArea = document.getElementById('textArea');
const tasks = document.getElementById('tasks');
const msg = document.getElementById('erro-msg');
const closeBtn = document.getElementsByClassName('close')[0];

let data = [];


// Funções
const openModal = () => {
    modal.style.display = "block";
}
const closeModal = () => {
    modal.style.display = "none";
}

window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

const formValidation = () => {
    if (titleInput.value === "") {
        msg.innerHTML = "Não pode cadastrar tarefa sem título"
    } else {
        msg.innerHTML = "";
        acceptData();
    }
}

const acceptData = () => {
    data.push({
        text: titleInput.value,
        date: dateInput.value,
        description: textArea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

const clearInputForm = () => {
    titleInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}

const createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, index) => {
        return (tasks.innerHTML += `
        <div id=${index}>
            <span id="titleTask">${x.text}</span>
            <span id="dateTask">${x.date}</span>
            <p>${x.description}</p>
            <span class="options">
                <i onClick="editTask(this)" class="fas fa-edit"></i>
                <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>    
        `);
    });
    clearInputForm();
}

const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}

const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    openModal();

    titleInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}


//Método que mantém as tarefas carregadas após refresh
(() => {   
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();



// Eventos
addTask.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})







