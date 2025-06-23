import Footer from "@/utils/components/Footer";
import "../css/main.css";
import CircleSquares from "../utils/Circle";

export default function Home() {
  return (
    <>
      <p>Hi</p>
      <CircleSquares
        count={28}
        radius={180}
        size={22}
        permanentHighlightIndex={14} // ovulation day, for example
        permanentHighlightColor="#6A0DAD" // purple
        userHighlightColor="#FF6B81" // pink
      />

      <Footer />
    </>
  );
}
