import * as Archieve from "./Archieve/Archieve";
import * as Toolkits from "./Archieve/Toolkits";

export default function Home() {
  const WriteLine = Archieve.countBs("BasB");
  return (
    <div>
      <h2>{WriteLine}</h2>
    </div>
  );
}
