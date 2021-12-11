/* eslint @next/next/no-img-element:"off" */

import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useLocalStorage } from "react-use";
import { useSwipeable } from "react-swipeable";
import { useSnackbar } from "notistack";
import { scoreInfo } from "../utils/scoreInfo";
import { createNotifications } from "../utils/createNotifications";

export default function Home() {
  const [date, setDate] = useState(() => Date.now());
  const [score, setScore] = useLocalStorage("score", { left: 0, right: 0 });
  const { enqueueSnackbar } = useSnackbar();
  const updateScore = useCallback(
    ({ left = 0, right = 0 }) => {
      setScore(() => ({
        left: score.left + left,
        right: score.right + right,
      }));
      setDate((v) => v + 10);
    },
    [score.left, score.right, setScore]
  );
  const handlers = useSwipeable({
    onSwipedRight: () => updateScore({ right: 1 }),
    onSwipedLeft: () => updateScore({ left: 1 }),
    delta: 100,
  });

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

  const sum = score.right - score.left;

  useEffect(() => {
    const mess = scoreInfo[sum];
    if (mess) {
      enqueueSnackbar(mess, { variant: "info" });
    }
  }, [sum, enqueueSnackbar]);

  console.log("score :>> ", score);

  return (
    <div id="container" {...handlers}>
      <button data-left onClick={() => updateScore({ left: 1 })}>
        <BsChevronCompactLeft />
      </button>
      <img src={`/api/memes?ts=${date}`} alt="img" />
      <link rel="prefetch" href={`/api/memes?ts=${date + 10}`} />
      <link rel="prefetch" href={`/api/memes?ts=${date + 20}`} />
      <link rel="prefetch" href={`/api/memes?ts=${date + 30}`} />
      <link rel="prefetch" href={`/api/memes?ts=${date + 40}`} />
      <button data-right onClick={() => updateScore({ right: 1 })}>
        <BsChevronCompactRight />
      </button>
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  await createNotifications();
  return {
    props: {},
    revalidate: 60 * 60 * 3, //3h
  };
};
