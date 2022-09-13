// выбираем элементы контроля навигационного меню

const mainNavigtion = document.querySelector(".main-navigation");
const menuButton = document.querySelector(".menu-button");
const homeButton = document.querySelector(".home-link");

// дефолтная проверка размера окна просмотра

if (document.documentElement.scrollWidth < 1235) {
  mainNavigtion.classList.add("hidden");
  menuButton.classList.remove("hidden");
  homeButton.classList.remove("hidden");
}

// создаём событие, отслеживающее изменения окна просмотра

window.addEventListener("resize", function() {

  if (document.documentElement.scrollWidth < 1235) {
    mainNavigtion.classList.add("hidden");
    menuButton.classList.remove("hidden");
    homeButton.classList.remove("hidden");
  } else {
    mainNavigtion.classList.remove("hidden");
    menuButton.classList.add("hidden");
    homeButton.classList.add("hidden");
  }
})

// добавляем отзывчивость кнопке, вызывающей меню

menuButton.addEventListener("click", function() {
  mainNavigtion.classList.toggle("hidden");
})
