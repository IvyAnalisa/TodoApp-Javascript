// Hämta referenser till HTML-element
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search");

// Ladda todos från localStorage vid start. 
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Funktion för att rensa hela todo-listan
function clearTodos() {
    todoList.innerHTML = ""; // Tömmer hela listan
}

// Funktion för att rendera alla todos i listan, med  sökfunktion
function renderTodos(filter = "") {
    clearTodos();  // Töm listan innan vi lägger till nya todos

    // Filtrera todos om det finns en sökterm (case-insensitive)
    const filteredTodos = todos.filter(todo => 
        todo.text.toLowerCase().includes(filter.toLowerCase())
    );

    // Loopa genom alla filtrerade todos och lägg till dem i listan
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li"); // Skapa en ny list-item (li)

        // Lägg till todo-texten och strecka över den om den är klar
        const todoText = document.createElement("span");
        todoText.textContent = todo.text;  // Skriv ut todo-texten
        if (todo.completed) {
            todoText.classList.add("completed");  // Lägg till "completed"-klass om den är klar
        }

        // Skapa knappen för att markera som klar/ångra
        const completeBtn = document.createElement("button");
        completeBtn.textContent = todo.completed ? "Ångra" : "Klart";
        completeBtn.onclick = function () {
            toggleComplete(index);  // Ändra status på todo (klar/ej klar)
        };

        // Skapa knappen för att ta bort en todo
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Ta bort";
        removeBtn.onclick = function () {
            removeTodo(index);  // Ta bort todo från listan
        };

        // Lägg till text och knappar till list-item
        li.appendChild(todoText);
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);

        // Lägg till list-item i todo-listan
        todoList.appendChild(li);
    });
}

// Funktion för att lägga till en ny todo
function addTodo() {
    const text = todoInput.value.trim();  // Ta bort överflödiga mellanslag
    if (text !== "") {  // Kontrollera att input inte är tom
        todos.push({ text, completed: false });  // Lägg till ny todo till listan
        saveTodos();  // Spara den uppdaterade listan till localStorage
        renderTodos();  // Uppdatera listan på skärmen
        todoInput.value = "";  // Rensa inmatningsfältet efter att todo lagts till
    }
}

// Funktion för att ta bort en todo från listan
function removeTodo(index) {
    todos.splice(index, 1);  // Ta bort todo från arrayen baserat på index
    saveTodos();  // Spara den uppdaterade listan
    renderTodos();  // Uppdatera listan på skärmen
}

// Funktion för att markera todo som klar eller ångra
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;  // Växla mellan klar/ej klar
    saveTodos();  // Spara den uppdaterade statusen
    renderTodos();  // Uppdatera listan på skärmen
}

// Funktion för att spara todos till localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));  // Spara som sträng i localStorage
}

// Sök i todo-listan och rendera resultaten i realtid
searchInput.addEventListener('input', (e) => {
    renderTodos(e.target.value);  // Filtrera listan baserat på söktermen
});

// Lägg till ny todo när knappen klickas
addTodoBtn.addEventListener("click", addTodo);

// Rendera listan när sidan laddas
renderTodos();
