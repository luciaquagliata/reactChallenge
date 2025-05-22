import { useSelector, useDispatch } from "react-redux";
import { updateCell } from "../store";
import type { cellType } from "../types/cellType";
import type { RootState } from "../store";
import { useState } from "react";
import { StyledTable, CellInput, HeaderCell, RowHeader } from "./styles";

function Table() {
  const dispatch = useDispatch();
  const table = useSelector((state: RootState) => {
    return state.cells.table;
  });

  const [error, setError] = useState<string | null>(null);

  const handleEndOfSentence = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
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
        } else if(formula.includes('+')){
            cellA = formula.split('+')[0];
            cellB = formula.split('+')[1];
        } else{
          setError("Verifica la operacion solicitada, solo se aceptan sumas y restas.");
          return;
        }

        if(cellA.length<3 || cellB.length<3){
          setError("Verifica las celdas seleccionadas.");
        } else{

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
              setError('');
              dispatch(updateCell({ row, col, value: String(result)})); 
          } else {
            setError("Asegurate de que todos los valores correspondan a numeros.");
          }
        }
      }
    }
  }

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
            onBlur={(e) => handleEndOfSentence(e, row, i)} 
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

  for(let col = 0; col < maxCol; col++){
    renderedColumns.push(
      <HeaderCell key={col}>{col}</HeaderCell>
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
