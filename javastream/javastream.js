// Initialize map centered at São Paulo with zoom level 10
// (Inicializa o mapa centralizado em São Paulo com nível de zoom 10)
var map = L.map('map').setView([-23.55052, -46.633308], 10);

// Add OpenStreetMap tile layer to the map
// (Adiciona camada de mapa do OpenStreetMap ao mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Declare marker variable to use later
// (Declara a variável marker para usar depois)
var marker;

// Show notification message to user
// (Mostra uma notificação para o usuário)
function showNotification(message) {
    // Get the notification element
    // (Obtém o elemento de notificação)
    var notification = document.getElementById("notification");

    // Set message text
    // (Define o texto da mensagem)
    notification.innerText = message;

    // Show notification
    // (Mostra a notificação)
    notification.classList.remove("hidden"); 
    notification.classList.add("show");

    // Hide notification after 3 seconds
    // (Esconde a notificação após 3 segundos)
    setTimeout(() => {
        notification.classList.remove("show");

        // Add hidden class after transition
        // (Adiciona a classe 'hidden' após a transição)
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 500);
    }, 3000);
}

// Search ZIP code and show location
// (Busca o CEP e mostra a localização)
function buscarCEP() {
    // Get input value
    // (Obtém o valor do input)
    var cep = document.getElementById("cep").value;

    // Check if it has 8 digits
    // (Verifica se tem 8 dígitos)
    if (cep.length !== 8) {
        showNotification("Enter a valid ZIP code with 8 digits."); // (Insira um CEP válido com 8 dígitos)
        return;
    }

    // Fetch address from ViaCEP API
    // (Busca endereço na API do ViaCEP)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            // If ZIP code not found
            // (Se o CEP não for encontrado)
            if (data.erro) {
                showNotification("ZIP code not found!"); // (CEP não encontrado!)
                return;
            }

            // Build address string
            // (Monta a string de endereço)
            var endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

            // Show found address
            // (Mostra o endereço encontrado)
            showNotification("Address found: " + endereco);

            // Fetch coordinates using Nominatim API
            // (Busca coordenadas usando a API Nominatim)
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${data.localidade},${data.uf},Brasil&countrycodes=BR`)
                .then(res => res.json())
                .then(locations => {
                    // If location is found
                    // (Se a localização for encontrada)
                    if (locations.length > 0) {
                        var lat = locations[0].lat; // (Latitude)
                        var lon = locations[0].lon; // (Longitude)

                        // Center map on location
                        // (Centraliza o mapa na localização)
                        map.setView([lat, lon], 14);

                        // Remove previous marker if exists
                        // (Remove marcador anterior, se existir)
                        if (marker) {
                            map.removeLayer(marker);
                        }

                        // Add marker with popup
                        // (Adiciona marcador com popup)
                        marker = L.marker([lat, lon]).addTo(map)
                            .bindPopup(endereco)
                            .openPopup();
                    } else {
                        showNotification("Location not found on the map."); // (Localização não encontrada no mapa)
                    }
                })
                .catch(error => console.error("Error fetching location", error)); // (Erro ao buscar localização)
        })
        .catch(error => console.error("Error fetching ZIP code", error)); // (Erro ao buscar CEP)
}

// Listen for "Enter" key on input
// (Escuta a tecla "Enter" no campo de input)
document.getElementById("cep").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // (Evita comportamento padrão)
        buscarCEP(); // (Chama a função buscarCEP)
    }
});

// When page loads
// (Quando a página carregar)
document.addEventListener("DOMContentLoaded", function () {
    // Create theme toggle button
    // (Cria botão de alternância de tema)
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggle-theme";
    toggleButton.innerHTML = "&#x1F31E;"; // (Sol)

    // Add button to top of the body
    // (Adiciona o botão no topo do body)
    document.body.prepend(toggleButton);

    // Toggle dark mode on button click
    // (Alterna modo escuro ao clicar no botão)
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Change icon depending on mode
        // (Muda o ícone dependendo do modo)
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.innerHTML = "&#x1F319;"; // (Lua)
        } else {
            toggleButton.innerHTML = "&#x1F31E;"; // (Sol)
        }
    });
});

// Typing effect on title
// (Efeito de digitação no título)
var h1 = document.querySelector("h1"); // (Seleciona o elemento h1)
var text = "JavaStream"; // (Texto a ser digitado)
var index = 0; // (Índice inicial)

// Function to type one character at a time
// (Função para digitar um caractere por vez)
function typeText() {
    if (index < text.length) {
        h1.innerHTML += text.charAt(index); // (Adiciona o caractere atual ao h1)
        index++;
        setTimeout(typeText, 100); // (Chama novamente após 100ms)
    }
}

// Start typing when page loads
// (Inicia a digitação quando a página carregar)
window.onload = typeText;
