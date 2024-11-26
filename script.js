document.addEventListener("DOMContentLoaded", () => {
    // Dados fictícios
    const data = {
        specialties: {
            psicologia: ["Nayara", "Lucas", "Amanda"],
            educacao_fisica: ["Frederico", "Carla", "João"]
        },
        schedules: {
            online: {
                manha: ["09:00", "10:00", "11:00"],
                tarde: ["12:00", "14:00", "15:00"],
                noite: ["19:00", "20:00", "21:00"]
            },
            presencial: {
                manha: ["08:00", "09:30", "10:30"],
                tarde: ["13:00", "15:30", "16:30"],
                noite: ["18:30", "20:00", "21:30"]
            }
        }
    };

    // Elementos da interface
    const specialtySelect = document.getElementById("specialty");
    const professionalSelect = document.getElementById("professional");
    const modeSelect = document.getElementById("mode");
    const scheduleContainers = {
        manha: document.querySelector(".horarios:nth-of-type(1)"),
        tarde: document.querySelector(".horarios:nth-of-type(2)"),
        noite: document.querySelector(".horarios:nth-of-type(3)")
    };
    const agendaSection = document.querySelector(".section:nth-of-type(2)");

    // Atualiza os profissionais ao alterar a especialidade
    specialtySelect.addEventListener("change", updateProfessionals);
    modeSelect.addEventListener("change", updateSchedules);

    // Atualiza os horários disponíveis ao alterar a modalidade
    function updateSchedules() {
        const selectedMode = modeSelect.value;
        const availableTimes = data.schedules[selectedMode];

        // Limpa os horários
        Object.keys(scheduleContainers).forEach(period => {
            scheduleContainers[period].innerHTML = ""; // Limpa cada período
        });

        // Adiciona horários aos períodos
        Object.entries(availableTimes).forEach(([period, times]) => {
            times.forEach(time => {
                const button = document.createElement("button");
                button.classList.add("time-slot");
                button.textContent = time;
                button.addEventListener("click", () => selectTime(button));
                scheduleContainers[period].appendChild(button);
            });
        });
    }

    // Atualiza os profissionais ao alterar a especialidade
    function updateProfessionals() {
        const selectedSpecialty = specialtySelect.value;
        const professionals = data.specialties[selectedSpecialty] || [];

        // Atualiza o select de profissionais
        professionalSelect.innerHTML = "";
        professionals.forEach(prof => {
            const option = document.createElement("option");
            option.value = prof.toLowerCase();
            option.textContent = prof;
            professionalSelect.appendChild(option);
        });

        updateSchedules(); // Atualiza os horários ao trocar a especialidade
    }

    // Marca o horário selecionado
    function selectTime(button) {
        // Remove a marcação de horários previamente selecionados
        document.querySelectorAll(".time-slot").forEach(btn => {
            btn.classList.remove("selected");
        });

        // Adiciona a classe ao botão selecionado
        button.classList.add("selected");
    }

    // Adiciona o agendamento à agenda
    document.getElementById("agendar").addEventListener("click", () => {
        const selectedTime = document.querySelector(".time-slot.selected");
        const selectedSpecialty = specialtySelect.value;
        const selectedProfessional = professionalSelect.value;
        const selectedMode = modeSelect.value;

        if (!selectedTime) {
            alert("Por favor, selecione um horário.");
            return;
        }

        // Cria e adiciona o agendamento
        const appointment = document.createElement("div");
        appointment.classList.add("appointment");
        appointment.innerHTML = `
            <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Horário:</strong> ${selectedTime.textContent}</p>
            <p><strong>Especialidade:</strong> ${specialtySelect.options[specialtySelect.selectedIndex].text}</p>
            <p><strong>Profissional:</strong> ${professionalSelect.options[professionalSelect.selectedIndex].text}</p>
            <p><strong>Modalidade:</strong> ${selectedMode}</p>
        `;
        agendaSection.appendChild(appointment);

        // Reseta o horário selecionado
        selectedTime.classList.remove("selected");
    });

    // Inicializa a página com os dados padrões
    updateProfessionals();
    updateSchedules();
});
