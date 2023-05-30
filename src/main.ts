import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  // get instances of fullList and ListTemplate
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // <form id="itemEntryForm">
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    // <input id="newItem"> inside <form>
    const input = document.getElementById("newItem") as HTMLInputElement;

    // trim white spaces if any present
    const newEntryText: string = input.value.trim();

    // check whether it is an empty
    if (!newEntryText.length) return;

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    // declaring new Item with the id and item
    const newItem = new ListItem(itemId.toString(), newEntryText);

    // add and re-render list
    fullList.addItem(newItem);
    template.render(fullList);
  });

  // <button id="clearItemsButton">
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  // clearing DOM and localStorage when called
  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  // loading and rendering fullList on DOMContentLoaded
  fullList.load();
  template.render(fullList);
};

// making sure DOM is loaded before calling initApp()
document.addEventListener("DOMContentLoaded", initApp);
