import { useSelector, useDispatch } from "react-redux";
import { updateCell } from "../../store";
import type { cellType } from "../../types/cellType";
import type { RootState } from "../../store";
import { useState } from "react";
import { StyledTable, CellInput, HeaderCell, RowHeader } from "./styles";
import { handleEndOfSentence } from "./utils";

function Table() {
  const dispatch = useDispatch();
  const table = useSelector((state: RootState) => {
    return state.cells.table;
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = event.target.value;
    setError('');
    dispatch(updateCell({ row, col, value})); 
  }


  const maxRow = table.length;

  const renderedRows = [];

  for(let row = 0; row< maxRow; row++){
    const cellsInRow = table[row];

    renderedRows.push(
      <tr key={row}>
        <RowHeader>{row}</RowHeader>
        {cellsInRow.map((cell: cellType, i: number) => (
          <td key={cell.id}>
            <CellInput
            onBlur={(e) => handleEndOfSentence(e, row, i, setError, dispatch, table, alphabet)} 
            onChange={(e) => handleChange(e, row, i)} 
            value={cell.value || ''} 
            ></CellInput>
          </td>
        ))}
      </tr>
    )
  }

  const maxCol = table[0].length;
  
  const renderedColumns = [];

  const alphabet = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"
  ];  

  for(let col = 0; col < maxCol; col++){
    renderedColumns.push(
      <HeaderCell key={col}>{alphabet[col]}</HeaderCell>
    )
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <StyledTable>
        <thead>
        <tr>
            <th></th>
            {renderedColumns}
        </tr>
        </thead>
        <tbody>
        {renderedRows}
        </tbody>
      </StyledTable>
    
  </div>
  )

}

export default Table;
