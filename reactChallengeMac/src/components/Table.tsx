import { useState } from "react";
import { useFetchDataQuery, useFetchColumnsQuery, useFetchRowsQuery, useUpdateDataMutation } from "../store";
import type { rowDataType } from "../types/dataType";
// import type { rowsType } from "../types/rowsType";
// import type { columnsType } from "../types/columnsType";

function Table() {
//     const columns = ["Col 1", "Col 2", "Col 3"];
//   const rows = ["Row 1", "Row 2", "Row 3"];
//   const data = [
//     ["A1", "A2", "A3"],
//     ["B1", "B2", "B3"],
//     ["C1", "C2", "C3"]
//   ];
  

  const {data: dataRows} = useFetchDataQuery();
  const {data: columns} = useFetchColumnsQuery();
  const {data: rows} = useFetchRowsQuery();
  const [updateData] = useUpdateDataMutation();

  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleEndOfSentence = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const key = `${row}_${col}`;
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

        const rowA = cellA.split(':')[0];
        const colA = cellA.split(':')[1];
        const keyA = `${rowA}_${colA}`;
        const valueA = inputs[keyA];

        const rowB = cellB.split(':')[0];
        const colB = cellB.split(':')[1];
        const keyB = `${rowB}_${colB}`;
        const valueB = inputs[keyB];

        if(!isNaN(Number(valueA)) && !isNaN(Number(valueB))){
            const intValueA = Number(valueA);
            const intValueB = Number(valueB);
            if(formula.includes('-')){
                result = intValueA - intValueB;
            } else{
                result = intValueA + intValueB;
            }
        }

        setInputs((prev) => ({
            ...prev,
            [key]: result.toString(),
          }));
    }

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const value = event.target.value;

    updateData({ id, value });
  }

  if (!rows || !dataRows) return <p>Cargando...</p>
  const renderedRows = rows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <th>{row.title}</th>
      {dataRows
      .filter((cell) => cell.row == row.title)
      .map((cell) => (
        <td key={cell.id}>
          <input
            onBlur={(e) => handleEndOfSentence(e, cell.row, cell.col)} 
            onChange={(e) => handleChange(e, cell.id)} 
            value={inputs[`${cell.row}_${cell.col}`] || ''} 
            ></input>
        </td>
      ))}
    </tr>
  ));

  const renderedColumns = columns?.map((col, i) => <th key={i}>{col.title}</th>);

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
        <div>{inputs[`${0}_${0}`] || ''}</div>
    </div>
  )
}

export default Table;