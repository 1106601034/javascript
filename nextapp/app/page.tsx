import * as Archieve from "./Archieve/Archieve";
import * as Toolkits from "./Archieve/Toolkits";

export default function Home() {
  const WriteLine = Archieve.fizzBuzz(100);
  console.clear
  return (
    <div>
      <h2>{WriteLine.join(' ')}</h2>
    </div>
  );
}
