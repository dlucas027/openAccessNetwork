/*Menu lateral*/
var menuitem = document.querySelectorAll('.item1')

function select(){
    menuitem.forEach((item)=>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuitem.forEach((item)=>
    item.addEventListener('click', select)
)

//Expandir JS//

var icone1 = document.querySelector('#icone1')
var menu = document.querySelector('.menu')

icone1.addEventListener('click', function(){
    menu.classList.toggle('abrir')
})

/*Botão next*/

document.getElementById('nextButton').addEventListener('click', function() {
    const img1Radio = document.getElementById('img1');
    const img2Radio = document.getElementById('img2');
    
    if (img1Radio.checked) {
        img2Radio.checked = true;
    } else {
        img1Radio.checked = true;
    }
});

