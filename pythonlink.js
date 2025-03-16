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
        showNotification("Digite um CEP válido com 8 dígitos.");
        return;
    }

    // Faz a requisição à API ViaCEP para obter dados do endereço
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) { // Verifica se o CEP é válido
                showNotification("CEP não encontrado!");
                return;
            }
            var endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`; // Formata o endereço
            showNotification("Endereço encontrado: " + endereco);
            
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
                        showNotification("Localização não encontrada no mapa.");
                    }
                })
                .catch(error => console.error("Erro ao buscar localização", error)); // Captura erros na requisição ao Nominatim
        })
        .catch(error => console.error("Erro ao buscar CEP", error)); // Captura erros na requisição ao ViaCEP
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
