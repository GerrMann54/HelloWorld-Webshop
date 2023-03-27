// as - Auto Slider
// Выбор линии автослайдера
const as_slideLine = document.querySelector('.promo .slideline');

// Здесь слайды имеют отступы друг от друга, поэтому они учитываются тоже, и мы получаем шаг, на который слайдер будет пролистываться
const as_slide = document.querySelector('.promo .slideline .slide');
const as_step = as_slide.clientWidth + 40; // Ширина блока + отступ


// Смещение от левого края
// Максимальное смещение
let as_offset = 0;
let as_max_offset = as_slideLine.scrollWidth - as_step + 40;

function autoSlide() {

    as_offset += as_step;               // Задание смещения на основе предыдущего значения
    if (as_offset >= as_max_offset) {
        as_offset = 0;                  // Если смещение больше максимального, то установить первое на 0
    }
    as_slideLine.style.left = `${-as_offset}px`  // Финальный расчёт нового смещения с учётом CSS для центровки слайда
}

setInterval(autoSlide, 3500);