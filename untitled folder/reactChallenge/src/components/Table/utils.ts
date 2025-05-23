
const parseOperand = (operand: string, table: any, alphabet: string[], setError, dispatch): number | null => {
  if (!operand.includes(":")) {
    return isNaN(Number(operand)) ? null : Number(operand);
  }

  const [rowStr, colStr] = operand.split(":");
  const row = Number(rowStr);
  const colIndex = alphabet.indexOf(colStr);

  if (isNaN(row) || colIndex === -1) return null;

  let cellValue = table[row]?.[colIndex]?.value;
  if(table[row]?.[colIndex]?.formula){
    const res = handleEndOfSentence(table[row]?.[colIndex]?.formula, row, colIndex, setError, dispatch, table, alphabet);
    cellValue = res?.result;
  }
  
  return isNaN(Number(cellValue)) ? null : Number(cellValue);
};

const calculateFormula = (
  formula: string,
  table: any,
  alphabet: string[],
  setError: (msg: string) => void,
  dispatch
): number | null => {
  const operator = formula.includes("+") ? "+" : formula.includes("-") ? "-" : null;

  if (!operator) {
    setError("Please verify the requested formula. Only addiDon and subtraction are accepted.");
    return null;
  }

  const operands = formula.split(operator).map(s => s.trim());
  if (operands.length < 2) {
    setError("Formula must have at least two operands.");
    return null;
  }

  const values: number[] = [];

  for (const op of operands) {
    const value = parseOperand(op, table, alphabet, setError, dispatch);
    if (value === null) {
      setError("Please verify that all values are valid.");
      return null;
    }
    values.push(value);
  }

  const result = operator === "+"
    ? values.reduce((acc, val) => acc + val, 0)
    : values.reduce((acc, val) => acc - val);

  return result;
};

export const handleEndOfSentence = (value: string, row: number, col: number, setError: (msg: string) => void, dispatch: any, table: any, alphabet: string[]) => {

  if (!value.startsWith("=")){
    return ;
  };

  const matches = value.match(/=/g) || [];
  if (matches.length > 1) {
    setError("A formula cannot contain more than one '='");
    return;
  }

  const formula = value.substring(1); // Remove '='
  const result = calculateFormula(formula, table, alphabet, setError, dispatch);

  return {result, value}

  // if (result !== null) {
  //   setError("");
  //   dispatch(updateCell({ row, col, value: String(result), formula: value }));
  // }
  
};
