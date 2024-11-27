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

//página de login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form form");
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const rememberCheckbox = loginForm.querySelector('input[type="checkbox"]');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Evento de submissão do formulário
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validação básica
        if (!validateEmail(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        if (password.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Simulação de login bem-sucedido
        alert("Login realizado com sucesso!");
        
        // Você pode adicionar lógica para redirecionar ou manipular o login aqui
    });

    // Função para validar o e-mail
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Lembrar de mim (armazenar no localStorage)
    rememberCheckbox.addEventListener("change", () => {
        if (rememberCheckbox.checked) {
            localStorage.setItem("rememberEmail", emailInput.value);
        } else {
            localStorage.removeItem("rememberEmail");
        }
    });

    // Preencher o e-mail se estiver salvo no localStorage
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});


//página de cadastro

document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.querySelector(".form-container-cadastro form");
    const nomeInput = cadastroForm.querySelector("#full-name");
    const dataNascimentoInput = cadastroForm.querySelector("#dob");
    const emailInput = cadastroForm.querySelector("#email");
    const senhaInput = cadastroForm.querySelector("#password");
    const botaoCriarConta = cadastroForm.querySelector('button[type="submit"]');

    // Evento de submissão do formulário
    cadastroForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const nome = nomeInput.value.trim();
        const dataNascimento = dataNascimentoInput.value;
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        // Validações básicas
        if (nome === "") {
            alert("Por favor, insira seu nome completo.");
            return;
        }

        if (!dataNascimento) {
            alert("Por favor, selecione sua data de nascimento.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Simulação de registro bem-sucedido
        alert("Cadastro realizado com sucesso!");
        // Aqui você pode adicionar lógica para enviar os dados ao servidor ou redirecionar
    });

    // Função para validar o e-mail
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Adicionar foco automático no primeiro campo ao carregar a página
    nomeInput.focus();
});


//página de blog e notícias
document.querySelectorAll('.nav-blog a').forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Botão "Mais Notícias" redireciona para a página de notícias
document.getElementById('botao-mais-noticias').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'pages/noticias.html';
});


// Realce do menu ativo ao rolar a página
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-blog a');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;

        if (window.scrollY >= offsetTop - 100 && window.scrollY < offsetTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

//página para palestras
document.addEventListener("DOMContentLoaded", function () {
    // Realce de estrelas ao passar o mouse
    const ratingStars = document.querySelectorAll(".card .rating span");
    ratingStars.forEach(star => {
        star.addEventListener("mouseover", function () {
            this.style.color = "gold";
        });
        star.addEventListener("mouseout", function () {
            this.style.color = "#ff9800"; // Cor padrão
        });
    });

    // Adiciona evento no botão principal
    const mainButton = document.querySelector(".cta-button");
    mainButton.addEventListener("click", function () {
        alert("Veja todos os nossos programas clicando aqui!");
    });

    // Efeito de destaque nas palestras ao clicar
    const cards = document.querySelectorAll(".hero-image .card");
    cards.forEach(card => {
        card.addEventListener("click", function () {
            cards.forEach(c => c.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"); // Reset
            this.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Destaque
        });
    });

    // Simulação de carregamento (opcional)
    console.log("Página carregada. JavaScript ativo!");
});

//pagina dados do cartão 
document.addEventListener("DOMContentLoaded", () => {
    // Elementos do formulário
    const nomeInput = document.getElementById("nome");
    const cartaoInput = document.getElementById("cartao");
    const validadeInput = document.getElementById("validade");
    const cvvInput = document.getElementById("cvv");
    const comprarButton = document.querySelector("button[type='submit']");
    const resumoBox = document.querySelector(".summary-box");

    // Validações simples
    const validarCartao = (numero) => /^[0-9]{16}$/.test(numero);
    const validarData = (data) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(data);
    const validarCVV = (cvv) => /^[0-9]{3,4}$/.test(cvv);

    comprarButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evita o envio do formulário para testes

        const nome = nomeInput.value.trim();
        const cartao = cartaoInput.value.trim();
        const validade = validadeInput.value.trim();
        const cvv = cvvInput.value.trim();

        let mensagemErro = "";

        if (!nome) mensagemErro += "O nome do titular é obrigatório.\n";
        if (!validarCartao(cartao)) mensagemErro += "O número do cartão deve conter 16 dígitos.\n";
        if (!validarData(validade)) mensagemErro += "A data de validade deve estar no formato MM/AA.\n";
        if (!validarCVV(cvv)) mensagemErro += "O CVV deve conter 3 ou 4 dígitos.\n";

        if (mensagemErro) {
            alert(`Erro no formulário:\n\n${mensagemErro}`);
        } else {
            alert("Compra realizada com sucesso!");
            atualizarResumo(nome, cartao);
        }
    });

    // Atualiza o resumo com dados fictícios
    const atualizarResumo = (nome, cartao) => {
        const ultimoQuatroDigitos = cartao.slice(-4);
        resumoBox.innerHTML = `
            <p>Código da compra: <strong>${Math.floor(Math.random() * 1000000)}</strong></p>
            <p>Cartão utilizado: <strong>**** **** **** ${ultimoQuatroDigitos}</strong></p>
            <p class="total">Valor total: R$ 100,00</p>
        `;
    };

    // Realce dinâmico na barra lateral
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            event.currentTarget.classList.add("active");
        });
    });
});

//pagina de carregando o pagamento 
document.addEventListener("DOMContentLoaded", () => {
    const finalizationMessage = document.querySelector(".finalization-box p");
    const loadingImage = document.querySelector(".finalization-box img");

    // Configuração de tempo (em milissegundos)
    const finalizationTime = 5000; // 5 segundos

    // Mensagem de progresso
    const messages = [
        "Validando os dados do cartão...",
        "Processando o pagamento...",
        "Confirmando sua compra...",
    ];

    let step = 0;

    // Exibir mensagens de progresso de forma sequencial
    const interval = setInterval(() => {
        if (step < messages.length) {
            finalizationMessage.textContent = messages[step];
            step++;
        }
    }, finalizationTime / messages.length);

    // Redirecionar para a página de confirmação após o tempo
    setTimeout(() => {
        clearInterval(interval);
        window.location.href = "confirmation.html"; // Substituir pelo URL real da página de confirmação
    }, finalizationTime);
});
