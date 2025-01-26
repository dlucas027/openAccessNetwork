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


//Expandir//

var icone1 = document.querySelector('#icone1')
var menu = document.querySelector('.menu')

icone1.addEventListener('click', function(){
    menu.classList.toggle('abrir')
})