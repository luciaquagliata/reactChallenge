import { updateCell } from "../../store";

export const handleEndOfSentence = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number, setError: any, dispatch: any, table: any, alphabet: string[]) => {
    const value = event.target.value;

    if(value.charAt(0) === '='){
      const countEquals = (value.match(/=/g) || []).length;

      if(countEquals>1){
        setError("Una formula no puede contener mas de un simbolo de '='");
        return;
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

        if(!cellA.includes(':')){ // empieza el primero es numero
          if(!cellB.includes(':')){ // son los dos numeros
            if(!isNaN(Number(cellA)) && !isNaN(Number(cellB))){
              const intValueA = Number(cellA);
              const intValueB = Number(cellB);

              if(formula.includes('-')){
                result = intValueA - intValueB;
              } else{
                  result = intValueA + intValueB;
              }
              setError('');
              dispatch(updateCell({ row, col, value: String(result)})); 
              return;
            } else {
              setError("Asegurate de que todos los valores correspondan a numeros.");
              return;
            }
          } else{ // el primero es numero el segundo es celda
            if(cellB.length<3){
              setError("Verifica las celdas seleccionadas.");
              return;
            } else{
              const rowB = Number(cellB.split(':')[0]);
              const colB = cellB.split(':')[1];
              let valueB = 0;
              if(table[rowB][alphabet.indexOf(colB)].value){
                valueB = table[rowB][alphabet.indexOf(colB)].value;
              }

              if(!isNaN(Number(cellA)) && !isNaN(Number(valueB))){
                const intValueA = Number(cellA);
                const intValueB = Number(valueB);

                if(formula.includes('-')){
                  result = intValueA - intValueB;
                } else{
                    result = intValueA + intValueB;
                }
                setError('');
                dispatch(updateCell({ row, col, value: String(result)})); 
                return;
              } else {
                setError("Asegurate de que todos los valores correspondan a numeros.");
                return;
              }
            }
          }
        } else if( !cellB.includes(':')){ // el primero es celda y el segundo es numero
          if(cellA.length<3){
            setError("Verifica las celdas seleccionadas.");
            return;
          } else{
            const rowA = Number(cellA.split(':')[0]);
            const colA = cellA.split(':')[1];
            let valueA = 0;
            if(table[rowA][alphabet.indexOf(colA)].value){
              valueA = table[rowA][alphabet.indexOf(colA)].value;
            }

            if(!isNaN(Number(cellB)) && !isNaN(Number(valueA))){
              const intValueB = Number(cellB);
              const intValueA = Number(valueA);

              if(formula.includes('-')){
                result = intValueA - intValueB;
              } else{
                  result = intValueB + intValueA;
              }
              setError('');
              dispatch(updateCell({ row, col, value: String(result)})); 
              return;
            } else {
              setError("Asegurate de que todos los valores correspondan a numeros.");
              return;
            }
          }
        } else{
          if(cellA.length<3 || cellB.length<3){
            setError("Verifica las celdas seleccionadas.");
            return;
          } else{
  
            const rowA = Number(cellA.split(':')[0]);
            const colA = cellA.split(':')[1];
            
  
            const rowB = Number(cellB.split(':')[0]);
            const colB = cellB.split(':')[1];
            let valueB = 0
            let valueA = 0
            if(table[rowB][alphabet.indexOf(colB)].value && table[rowA][alphabet.indexOf(colA)].value){
              valueB = table[rowB][alphabet.indexOf(colB)].value;
              valueA = table[rowA][alphabet.indexOf(colA)].value;
            }
            
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
                return;
            } else {
              setError("Asegurate de que todos los valores correspondan a numeros.");
              return;
            }
          }
        }
      }
    }
  }