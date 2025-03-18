var map = L.map('map').setView([-23.55052, -46.633308], 10); // Cria o mapa centrado em São Paulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Adiciona o mapa base do OpenStreetMap
var marker; // Variável para armazenar o marcador

function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.innerText = message; // Define o texto da notificação
    notification.classList.remove("hidden"); 
    notification.classList.add("show");

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 500);
    }, 3000);
}

function buscarCEP() {
    var cep = document.getElementById("cep").value; // Obtém o CEP digitado
    if (cep.length !== 8) { // Valida se o CEP tem 8 dígitos
        showNotification("Enter a valid ZIP code with 8 digits.");
        return;
    }

    // Faz a requisição à API ViaCEP para obter dados do endereço
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) { // Verifica se o CEP é válido
                showNotification("ZIP code not found!");
                return;
            }
            var endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`; // Formata o endereço
            showNotification("Address found: " + endereco);
            
            // Faz a requisição à API Nominatim para obter as coordenadas geográficas
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${data.localidade},${data.uf},Brasil&countrycodes=BR`)
                .then(res => res.json())
                .then(locations => {
                    if (locations.length > 0) { // Verifica se há resultados
                        var lat = locations[0].lat; // Obtém latitude
                        var lon = locations[0].lon; // Obtém longitude
                        map.setView([lat, lon], 14); // Centraliza o mapa na localização encontrada
                        if (marker) {
                            map.removeLayer(marker); // Remove marcador anterior, se houver
                        }
                        marker = L.marker([lat, lon]).addTo(map) // Adiciona novo marcador no mapa
                            .bindPopup(endereco) // Adiciona um pop-up com o endereço
                            .openPopup();
                    } else {
                        showNotification("Location not found on the map.");
                    }
                })
                .catch(error => console.error("Error fetching location", error)); // Captura erros na requisição ao Nominatim
        })
        .catch(error => console.error("Error fetching ZIP code", error)); // Captura erros na requisição ao ViaCEP
}
// adicionando a funcionalidade do enter ao pesquisar o cep
document.getElementById("cep").addEventListener("keypress", function (event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        event.preventDefault(); // Evita qualquer comportamento padrão
        buscarCEP(); // Chama a função de busca
    }
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

var h1 = document.querySelector("h1");
var text = "PythonLink"; // Texto a ser animado
var index = 0;

function typeText() {
    if (index < text.length) {
        h1.innerHTML += text.charAt(index);  // Adiciona um caractere por vez
        index++;
        setTimeout(typeText, 100);  // Chama a função novamente após 100ms
    }
}

window.onload = typeText;  // Chama a animação quando a página for carregada
