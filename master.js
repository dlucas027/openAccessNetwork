/*expansão de botão*/

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        console.log(`mouse over ${button.id}`);
    });
});


