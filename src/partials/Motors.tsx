import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Motors() {
  const [motor1, setMotor1] = useState(0);
  const [motor2, setMotor2] = useState(0);

  const { data, error } = useSWR(
    "http://192.168.88.78:8080/get",
    fetcher,
    { refreshInterval: 500 }
  );

  const handleSpeedChange = async () => {
    const res = await fetch(
      `http://192.168.88.78:8080/set/${motor1}/${motor2}`
    );
    const data = await res.json();
    console.log(data);
  };

  const handleStop = async () => {
    const res = await fetch(`http://192.168.88.78:8080/stop`);
    const data = await res.json();
    console.log(data);
    setMotor1(0);
    setMotor2(0);
  };

    useEffect(() => {
    if (data) {
        setMotor1(data.val_1);
        setMotor2(data.val_2);
    }
    }, [data])

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div>
        <label className='text-2xl font-bold'>Motor 1 : {motor1}</label><br />
        <input
          type='range'
          min='0'
          max='480'
          value={motor1}
          onChange={(e) => {setMotor1(Number(e.target.value)); handleSpeedChange()}}
          className='w-96'
        />
      </div>
      <div>
        <label className='text-2xl font-bold'>Motor 2 : {motor2}</label><br />
        <input
          type='range'
          min='0'
          max='480'
          value={motor2}
          onChange={(e) => {setMotor2(Number(e.target.value)); handleSpeedChange()}}
          className='w-96'
        />
      </div>
      <div className='flex flex-row'>
        <button
          onClick={handleStop}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          Stop
        </button>
      </div>
    </div>
  );
}
