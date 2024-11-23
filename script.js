// script.js
document.querySelectorAll('.time-slot:not(.disabled)').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Você selecionou o horário: ${button.textContent}`);
    });
});
