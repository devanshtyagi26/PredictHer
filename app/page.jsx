"use client";
import Footer from "@/utils/components/Footer";
import "../css/main.css";
import CircleSquares from "../utils/Circle";
import { Provider } from "react-redux";
import { store } from "../store";

export default function Home() {
  return (
    <>
      <p>Hi</p>
      <Provider store={store}>
        <CircleSquares
          count={28}
          radius={180}
          size={25}
          permanentHighlightIndex={14} // ovulation day, for example
          permanentHighlightColor="#6A0DAD" // purple
          userHighlightColor="#FF6B81" // pink
        />
      </Provider>

      <Footer />
    </>
  );
}
