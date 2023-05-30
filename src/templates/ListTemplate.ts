import FullList from "../model/FullList";

// template for HTML DOM
interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  // clear all the List items
  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    // clearing the list incase of any
    this.clear();

    // creating a HTML List item for each list in fullList
    fullList.list.forEach((item) => {
      // <li>
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      // <input>
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;
      li.append(check);

      // event listener for "check item" event
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // <label>
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      // <button>
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      // event listener for "remove item" event
      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      // adding <li> inside <ul>
      this.ul.append(li);
    });
  }
}
