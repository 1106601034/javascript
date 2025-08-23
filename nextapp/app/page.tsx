import * as Archieve from "./Archieve/Archieve";
import * as Toolkits from "./Archieve/Toolkits";

export default function Home() {
  const ShoppingList: string[] = ["Milk", "Egg", "Toast"];
  const Keywords: string[] = ["Egg", "Apple", "Bunny"];
  const ShoppingList2: string[] = Archieve.AppendItems(ShoppingList, ["Bunny", "Bunny"]);
  const ShoppingList3: string[] = Archieve.RemoveItems(ShoppingList2, [-1]);
  const ShoppingList4: boolean[] = Archieve.SearchItems(ShoppingList3, Keywords)
  const item = new Archieve.Item("Milk", 12, 1);

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
      <h3>Then we create an object for MIlk the Item:</h3>
      <h4>{item.PrintItem()}</h4>
    </div>
  );
}
