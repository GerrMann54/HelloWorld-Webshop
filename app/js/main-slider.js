// Выбор ряда слайдов и кнопок
// ms - Main Slider
const ms_buttonNext = document.querySelector('.advantages .b-next');
const ms_buttonPrev = document.querySelector('.advantages .b-prev');
const ms_slideLine = document.querySelector('.advantages .slideline');

// Получение длины одного слайда. Линия слайдов будет смещаться на ширину одного слайда.
// Получение длины всей линии слайдов. На последнем слайде при нажатии кнопки "Далее" слайдер будет возвращаться к к началу.
const ms_step = document.querySelector('.advantages .slideline .slide').clientWidth;

// Смещение от левого края
// Максимальное смещение
let ms_offset = 0;
let ms_max_offset = ms_slideLine.scrollWidth - ms_step;

ms_buttonNext.addEventListener('click', ms_nextSlide);
ms_buttonPrev.addEventListener('click', ms_prevSlide);

function ms_nextSlide() {

    ms_offset += ms_step; 

    if (ms_offset > ms_max_offset) {
        ms_offset = 0;
    }

    ms_slideLine.style.left = -ms_offset + 'px';
}

function ms_prevSlide() {

    ms_offset -= ms_step;

    if (ms_offset < 0) {
        ms_offset = ms_max_offset;
    }
    ms_slideLine.style.left = -ms_offset + 'px';
}