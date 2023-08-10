var slide_index = 1;

show_slides(slide_index);

// avança ou retorna a imagem no carrossel
function plus_slides(n){
    show_slides(slide_index += n);
}

// seta a dot que corresponde a imagem
function current_slides(n){
    show_slides(slide_index = n);
}

// faz a ação de troca as imagens
function show_slides(n){

    var slides = document.getElementsByClassName("fade");
    var dots = document.getElementsByClassName("dot");
    var i;

    // da ultima imagem para a primeira
    if(n > slides.length){ slide_index = 1 }

    // da primeira imagem para a ultima
    if(n < 1){ slide_index = slides.length}

    // desativa todas as imagens do carrossel
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }

    // destiva todas as bolinhas selecionadas
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slide_index-1].style.display = "block";
    dots[slide_index-1].className += " active"
}