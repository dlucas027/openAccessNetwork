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
    toggleButton.innerText = "Dark Mode"; // Define o texto inicial
    document.body.prepend(toggleButton); // Adiciona o botão no início do corpo da página

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode"); // Alterna entre os temas

        // Atualiza o texto do botão de acordo com o tema
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.innerText = "Light Mode"; // Muda para "Light Mode" quando estiver no modo escuro
        } else {
            toggleButton.innerText = "Dark Mode"; // Muda para "Dark Mode" quando estiver no modo claro
        }
    });
});
