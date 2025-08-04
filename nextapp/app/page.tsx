import * as Archieve from "./Archieve/Archieve";
import * as Toolkits from "./Archieve/Toolkits";

export default function Home() {
  let randomGoodiesToYOu: any = Toolkits.HereIsSomeGoodies();
  return (
    <div>
      <h2>{randomGoodiesToYOu}</h2>
    </div>
  );
}
