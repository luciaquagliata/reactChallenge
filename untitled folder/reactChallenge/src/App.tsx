import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "./components/Table/Table";
import { Title } from "./styles";
import { addRows } from "./store"; // ajustá si cambia el path

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isBottom) {
        dispatch(addRows());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  return (
    <>
      <Title>Spreadsheet</Title>
      <Table />
    </>
  );
}

export default App;
