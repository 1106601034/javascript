import * as Archieve from "./Archieve/Archieve";
import * as Toolkits from "./Archieve/Toolkits";

export default function Home() {
  const WriteLine = Archieve.fizzBuzz(100);
  console.log(Toolkits.isInRange(1,2,3));
  
  return (
    <div>
      <p>{WriteLine.join('\n')}</p>
    </div>
  );
}
