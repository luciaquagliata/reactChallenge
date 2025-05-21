import { useSelector, useDispatch } from "react-redux";
import { updateCell } from "../store";
import type { cellType } from "../types/cellType";
import type { RootState } from "../store";
import { useState } from "react";

function Table() {
  const dispatch = useDispatch();
  const table = useSelector((state: RootState) => {
    return state.cells;
  });

  const [error, setError] = useState<string | null>(null);


  // const handleAddCells = () => {
  //   const maxCol = Math.max(...table.map((item: cellType) => item.col));
  //   const maxRow = Math.max(...table.map((item: cellType) => item.row));

  //   dispatch(addCells({maxCol, maxRow}))
  // }

  const handleEndOfSentence = (event: React.ChangeEvent<HTMLInputElement>, id:string) => {
    const value = event.target.value;

    if(value.charAt(0) === '='){
      const countEquals = (value.match(/=/g) || []).length;

      if(countEquals>1){
        setError("Una formula no puede contener mas de un simbolo de '='");
      } else{

        const formula = value.split('=')[1];
        let result = 0;
        let cellA;
        let cellB;
        if(formula.includes('-')){
            cellA = formula.split('-')[0];
            cellB = formula.split('-')[1];
        } else{
            cellA = formula.split('+')[0];
            cellB = formula.split('+')[1];
        }

        const rowA = Number(cellA.split(':')[0]);
        const colA = Number(cellA.split(':')[1]);
        const valueA = table.find(cell => cell.row === rowA && cell.col === colA);

        const rowB = Number(cellB.split(':')[0]);
        const colB = Number(cellB.split(':')[1]);
        const valueB = table.find(cell => cell.row === rowB && cell.col === colB);

        if(!isNaN(Number(valueA?.value)) && !isNaN(Number(valueB?.value))){
            const intValueA = Number(valueA?.value);
            const intValueB = Number(valueB?.value);
            
            if(formula.includes('-')){
                result = intValueA - intValueB;
            } else{
                result = intValueA + intValueB;
            }
            dispatch(updateCell({ id, value: String(result)})); 
        } else{
          setError("Asegurate de que todos los valores correspondan a numeros.")
        }
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = event.target.value;

    dispatch(updateCell({ id, value})); 
  }


  const maxRow = Math.max(...table.map((item: cellType) => item.row));

  const renderedRows = [];

  for(let row = 1; row<= maxRow; row++){
    const cellsInRow = table.filter((cell: cellType) => cell.row === row);

    renderedRows.push(
      <tr key={row}>
        <th>{row}</th>
        {cellsInRow.map((cell: cellType) => (
          <td key={cell.id}>
            <input
            onBlur={(e) => handleEndOfSentence(e, cell.id)} 
            onChange={(e) => handleChange(e, cell.id)} 
            value={cell.value || ''} 
            ></input>
          </td>
        ))}
      </tr>
    )
  }

  const maxCol = Math.max(...table.map((item: cellType) => item.col));
  
  const renderedColumns = [];

  for(let col = 1; col <= maxCol; col++){
    renderedColumns.push(
      <th key={col}>{col}</th>
    )
  }

  return (
    <div>
        {error && <div>{error}</div>}
        <table>
        <thead>
        <tr>
            <th></th>
            {renderedColumns}
        </tr>
        </thead>
        <tbody>
        {renderedRows}
        </tbody>
    </table>
    
  </div>
  )
  //<button onClick={handleAddCells}>Add cells</button>
}

export default Table;
