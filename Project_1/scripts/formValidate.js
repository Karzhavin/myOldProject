// определяем форму обратной связи

const feedback = document.querySelector(".feedback");

// определяем массив контейнеров с полями

const feedbackInputGroup = document.querySelectorAll(".feedback-label-input-group");

/* создаём цикл, чтобы перебрать массив контейнеров с полями и передать каждому
элементу массива дочерние элементы, которые визуально отражают корректно или
некорректно заполнено поле */

for (let i = 0; i < feedbackInputGroup.length - 1; i++) {

  let valid = document.createElement('span');
  valid.className = "material-symbols-outlined valid hidden";
  valid.textContent = "done";

  let novalid = document.createElement('span');
  novalid.className = "material-symbols-outlined novalid hidden";
  novalid.textContent = "close";

  feedbackInputGroup[i].appendChild(valid);
  feedbackInputGroup[i].appendChild(novalid);
};

/* создаём функцию, которая возвращает текст с предупреждением для полей ввода
формы при некорректном заполнении */

function createNotification() {

  const notification = document.createElement('p');
  notification.setAttribute('class', 'error');
  notification.textContent = "Пожалуйста, заполните поле формы!";

  return notification;
};

/* создаём массив, элементы которого будут ссылаться на поля формы */

const fieldArr = [];

/* перебираем массив контейнеров с полями и извлекам из каждого контейнера
ссылку на нужный нам элемент - поле ввода */

for (let i = 0; i < feedbackInputGroup.length - 1; i++) {
  fieldArr.push(feedbackInputGroup[i].childNodes[3]);
};

/* создаём массив, в который будем помещать ссылки на поля ввода не прошедшие
проверку на валидность */

const formCheckArr = [];

/* перебираем массив элементов-ссылок, извлекаем id элементов. А также
определяем элементы, которые будем использовать для оповещения пользователя о
корректности вводимых данных */

for (let i = 0; i < fieldArr.length; i++) {

  let elementId  = fieldArr[i].id;
  let elmntValid = document.querySelector("#" + elementId + " + .valid");
  let elmntNovalid = document.querySelector("#" + elementId + " + .valid + .novalid");

  // по умолчанию сделаем поля формы некорректными

  formCheckArr.push([fieldArr[i], false]);

/* к каждому элементу-ссылке добавляем обработчик событий, который остлеживает
действия пользователя, а именно: приступил ли пользователь к заполнению поля
ввода формы. Передаём обработчику ранее созданную переменную */

/* вторым аргументом передаём обработчику событий другой обработчик событий,
который применяется к тому же самому элементу-ссылке, но связан уже с вводом
пользователем своих данных и последующей проверкой валидности этих данных */

  fieldArr[i].addEventListener("click", fieldArr[i].addEventListener("input", function() {

    /* проверяем форму на наличие объявления с предупреждающим текстом о
    некорректном заполнении формы */

    const erorrArr = document.querySelector(".error");

    if (erorrArr) {
      erorrArr.remove();
    }

    // переключатель с настройками проверки валидности данных, переданных пользователем

    switch (fieldArr[i].id) {

      case "user-first-name":
        if (/[А-ЯЁ][а-яё]+/.test(fieldArr[i].value)) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;

      case "user-last-name":
        if (/[А-ЯЁ][а-яё]+/.test(fieldArr[i].value)) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;

      case "user-datetime":
        if (/[0-9]+-[0-9]+-[0-9]+/.test(fieldArr[i].value)) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;

      case "from-point":
        if (fieldArr[i].value !== "" && fieldArr[i].value !== fieldArr[i + 1].value) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;

      case "to-point":
        if (fieldArr[i].value !== "" && fieldArr[i].value !== fieldArr[i - 1].value) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;

      case "user-email":
        if (/\w+@[A-Za-z]+[.][A-Za-z]+/.test(fieldArr[i].value)) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;

      case "user-tel":
        if (/[+]7-\d{3}-\d{3}-\d{2}-\d{2}$/.test(fieldArr[i].value) || /[+]7\d{3}\d{3}\d{2}\d{2}$/.test(fieldArr[i].value)) {

          elmntValid.classList.remove("hidden");
          elmntNovalid.classList.add("hidden");

          formCheckArr[i][1] = true;
        } else {
          elmntNovalid.classList.remove("hidden");
          elmntValid.classList.add("hidden");

          formCheckArr[i][1] = false;
        };
        break;
    };

  }));
};

/* добавляем обработчик событий, контролирующий отправку формы в зависимости
от валидности полей формы */

feedback.addEventListener("submit", function(event) {

  /* проверяем форму на наличие объявления с предупреждающим текстом о
  некорректном заполнении формы */

  const erorrArr = document.querySelector(".error");

  if (erorrArr) {
    erorrArr.remove();
  }

  /* объявляем переменную, которая будет выполнять условие условной конструкции,
  если все поля правильно заполнены */

  let formCheck = true;

  // перебираем массив, содержащий статусы полей формы


  for (let i = 0; i < formCheckArr.length; i++) {
    if (formCheckArr[i][1] === false) {

      if (formCheck) {
        feedbackInputGroup[i].appendChild(createNotification());
      }

      formCheck = false;
    };
  };

  if (formCheck) {
    // console.log("Форма отправлена!");
  } else {
    event.preventDefault();
  };
});
