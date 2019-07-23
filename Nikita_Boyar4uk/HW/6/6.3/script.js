// Создать UIComponent ES6 Class

// Конструктор класса принимает - имя єлемента (имя тега) и сохраняет его в поле класса

// (можно добавить параметрьі - атрибутьі и контент)
// Добавить методьі:
//  - setAttribute() -  добавляет в поле (массив) attributes обьект типа {name: 'id', value: 1}
//  - setContent() - добавляет в поле content текстовьій контент (строку)

// Метод render(parent) - принимает HTML єлемент в которьій вьіводит созданньій єлемент
// (єлемент нужно создать используя имя єлемента, атрибутьі  и текстовьій контент).

// Создать класс Button которьій расширяет класс UIComponent и добавляет Метод

// clickMe() {
//   console.log("I'm clicked")
// }
// -------------
// Для тестирования классов:
// создать єкземпляр класса  Button и вьізвать у него методьі render и clickMe

class Button {
  constructor() {}
  clickMe() {
    console.log("Im clicked");
  }
}

class UIComponent extends Button {
  constructor(name) {
    super();
    this.name = name;
    this.attribute = [];
    this.content = "";
  }
  setAtributt(name, value) {
    this.attribute.push({ name, value });
  }
  setContent(cont) {
    this.content = cont;
  }

  render(parent) {
    let newElement;
    newElement = document.createElement(this.name);
    for (let i = 0; i < this.attribute.length; i++) {
      newElement.setAttribute(this.attribute[i].name, this.attribute[i].value);
    }
    newElement.textContent = this.content;
    parent = document.querySelector(parent);
    parent.appendChild(newElement);
    return newElement;
  }
}

let a = new UIComponent("div");
a.setAtributt("id", "test2");
a.setContent("Новый элемент");
a.render("p");
a.clickMe();
