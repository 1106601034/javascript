import { useState } from 'react';

export default function Calculater() {
    const [count, setCount] = useState(0);

    const addition = (input1: number, input2: number) => {
        setCount(() => input1 + input2);
    }

    const toggleCalculate = (input1: number, input2: number, mode: (input1: number, input2: number) => void) => {
        mode(input1, input2);
    }

    return (
        <div className='container'>
            <h5>{count}</h5>
            <input type="number" id='input1' defaultValue={0} className='form-control' required />
            <span>And</span>
            <input type="number" id='input2' defaultValue={0} className='form-control' required />
            <button className='btn btn-primary'
                onClick={() => {
                    const input1 = parseFloat((
                        document.getElementById('input1') as HTMLInputElement
                    ).value);
                    const input2 = parseFloat((
                        document.getElementById('input2') as HTMLInputElement
                    ).value);
                    const mode = addition;
                    toggleCalculate(
                        input1, input2, mode);
                }}>Now Count</button>
        </div>
    )
};
