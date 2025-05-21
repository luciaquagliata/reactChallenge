import { useSelector, useDispatch } from "react-redux";
import { updateCell } from "../store";
import type { cellType } from "../types/cellType";
import type { RootState } from "../store";

function Table() {
  const dispatch = useDispatch();
  const table = useSelector((state: RootState) => {
    return state.cells.table;
  });

  // const handleAddCells = () => {
  //   const maxCol = Math.max(...table.map((item: cellType) => item.col));
  //   const maxRow = Math.max(...table.map((item: cellType) => item.row));

  //   dispatch(addCells({maxCol, maxRow}))
  // }

  const handleEndOfSentence = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = event.target.value;

    if(value.charAt(0) === '='){
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
        const valueA = table[rowA][colA].value;

        const rowB = Number(cellB.split(':')[0]);
        const colB = Number(cellB.split(':')[1]);
        const valueB = table[rowB][colB].value;

        if(!isNaN(Number(valueA)) && !isNaN(Number(valueB))){
            const intValueA = Number(valueA);
            const intValueB = Number(valueB);
            
            if(formula.includes('-')){
                result = intValueA - intValueB;
            } else{
                result = intValueA + intValueB;
            }
        }

        dispatch(updateCell({ row, col, value: String(result)})); 
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = event.target.value;

    dispatch(updateCell({ row, col, value})); 
  }


  const maxRow = table.length;

  const renderedRows = [];

  for(let row = 0; row<= maxRow; row++){
    const cellsInRow = table[row];

    renderedRows.push(
      <tr key={row}>
        <th>{row}</th>
        {cellsInRow.map((cell: cellType, i: number) => (
          <td key={cell.id}>
            <input
            onBlur={(e) => handleEndOfSentence(e, row, i)} 
            onChange={(e) => handleChange(e, row, i)} 
            value={cell.value || ''} 
            ></input>
          </td>
        ))}
      </tr>
    )
  }

  const maxCol = table[0].length;
  
  const renderedColumns = [];

  for(let col = 0; col <= maxCol; col++){
    renderedColumns.push(
      <th key={col}>{col}</th>
    )
  }

  return (
    <div>
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

  // <button onClick={handleAddCells}>Add cells</button>
}

export default Table;
