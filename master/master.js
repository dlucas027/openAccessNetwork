/*expansão de botão ao passar o mouse sobre*/

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        console.log(`mouse over ${button.id}`);
    });
});


/*bnt dark mode*/
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.createElement("button"); // Cria o botão
    toggleButton.id = "toggle-theme"; // Define um ID para o botão

    // Define o ícone de sol como padrão
    toggleButton.innerHTML = "&#x1F31E;"; // Unicode do ícone do sol
    document.body.prepend(toggleButton); // Adiciona o botão no início do corpo da página

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode"); // Alterna entre os temas

        // Atualiza o ícone do botão de acordo com o tema
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.innerHTML = "&#x1F319;"; // Lua (para dark mode)
        } else {
            toggleButton.innerHTML = "&#x1F31E;"; // Sol (para light mode)
        }
    });
});
