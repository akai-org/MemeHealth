import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useLocalStorage } from "react-use";

export default function Home() {
  const [date, setDate] = useState(() => Date.now());
  const [score, setScore] = useLocalStorage("score", { left: 0, right: 0 });

  const updateScore = useCallback(
    ({ left = 0, right = 0 }) => {
      setScore(() => ({
        left: score.left + left,
        right: score.right + right,
      }));
      setDate(Date.now());
    },
    [score.left, score.right, setScore]
  );

  useEffect(() => {
    const change = (e) => {
      if (e.key === "ArrowRight") {
        updateScore({ right: 1 });
      } else if (e.key === "ArrowLeft") {
        updateScore({ left: 1 });
      }
    };

    window.addEventListener("keydown", change);
    return () => {
      window.removeEventListener("keydown", change);
    };
  }, [updateScore]);

  console.log("score :>> ", score);
  return (
    <div
      id="container"
      onKeyDown={(e) => {
        console.log(e);
      }}
    >
      <button data-left onClick={() => updateScore({ left: 1 })}>
        <BsChevronCompactLeft />
      </button>
      <img src={`/api/memes?ts=${date}`} alt="img" layout="fill" />
      <button data-right onClick={() => updateScore({ right: 1 })}>
        <BsChevronCompactRight />
      </button>
    </div>
  );
}
