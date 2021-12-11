import Image from "next/image";
import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useLocalStorage } from "react-use";

export default function Home() {
  const [date, setDate] = useState(() => Date.now());
  const [score, setScore] = useLocalStorage("score", { left: 0, right: 0 });
  const updateDate =
    ({ left = 0, right = 0 }) =>
    () => {
      setScore(() => ({
        left: score.left + left,
        right: score.right + right,
      }));
      setDate(Date.now());
    };

  console.log("score :>> ", score);
  return (
    <div id="container">
      <button data-left onClick={updateDate({ left: 1 })}>
        <BsChevronCompactLeft />
      </button>
      <img src={`/api/memes?ts=${date}`} alt="img" layout="fill" />
      <button data-right onClick={updateDate({ right: 1 })}>
        <BsChevronCompactRight />
      </button>
    </div>
  );
}
