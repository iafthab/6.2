import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  // private is called before constructor, so there would only be one instance of this class created.
  private constructor(private _list: ListItem[] = []) {
    // ---
  }
  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    // retrieve from local storage
    const storedList: string | null = localStorage.getItem("myList");
    // checking if the content is string, its stored after stringify()
    if (typeof storedList !== "string") return;

    // parsing stringified list to ListItem syntax.
    // ListItem syntax is changed with an '_'underscore.
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }

  // saving list to Local Storage
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  // clear all list items
  clearList(): void {
    this._list = [];

    // saving to prevent reload of old list items
    this.save();
  }

  // add new item to list
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  // remove an item from the list
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
