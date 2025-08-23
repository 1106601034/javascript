// to check the output
// throw all the tsx files into the app folder under next app
import * as Archieve from "./Archieve/Archieve";
import * as Toolkits from "./Archieve/Toolkits";

export default function Home() {
  // creat an array
  const ShoppingList: string[] = ["Milk", "Egg", "Toast"];
  // add two items
  const ShoppingList2: string[] = Toolkits.AppendItems(ShoppingList, ["Bunny", "Bunny"]);
  // remove the last item
  const ShoppingList3: string[] = Toolkits.RemoveItems(ShoppingList2, [-1]);
  // check if given items are exist in list
  const Keywords: string[] = ["Egg", "Apple", "Bunny"];
  const ShoppingList4: boolean[] = Toolkits.SearchItems(ShoppingList3, Keywords)
  // create item objcet
  const item = new Archieve.Item("Milk", 12, 1);

  // print items in list, if more than 5 items exist in the list then print message in console
  return (
    <div>
      <h3>The Shopping List begins with:</h3>
      <h4>{Archieve.PrintItems(ShoppingList)}.</h4>
      <h3>Then we add two Bunnies and the list will be like:</h3>
      <h4>{Archieve.PrintItems(ShoppingList2)}.</h4>
      <h3>Then we remove the last Bunny and the list will be like:</h3>
      <h4>{Archieve.PrintItems(ShoppingList3)}.</h4>
      <h3>Then we check if follow items are in the list:</h3>
      <h4>{Archieve.PrintItems(Keywords)}</h4>
      <h4>{Archieve.PrintItems(ShoppingList4)}.</h4>
      <h3>Then we create an object for Milk the Item:</h3>
      <h4>{item.PrintItem()}</h4>
    </div>
  );
}
