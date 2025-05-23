import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Table from "./components/Table/Table";
import { Title } from "./styles";
import { addRows, addColumns } from "./store"; // ajustá si cambia el path

function App() {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isBottom) {
        dispatch(addRows());
      }

      const container = scrollContainerRef.current;
      if (container) {
        const atRightEdge =
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 50;

        if (atRightEdge) {
          dispatch(addColumns());
        }
      }
    };

    // Scroll vertical del window
    window.addEventListener("scroll", handleScroll);
    // Scroll horizontal del contenedor
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <>
      <Title>Spreadsheet</Title>
      <div ref={scrollContainerRef} style={{ overflowX: "auto" }}>
        <Table />
      </div>
    </>
  );
}

export default App;
