import { updateCell } from "./store";

const parseOperand = (operand: string, table: any, alphabet: string[]): number | null => {
  if (!operand.includes(":")) {
    return isNaN(Number(operand)) ? null : Number(operand);
  }

  const [rowStr, colStr] = operand.split(":");
  const row = Number(rowStr);
  const colIndex = alphabet.indexOf(colStr);

  if (isNaN(row) || colIndex === -1) return null;

  const cellValue = table[row]?.[colIndex]?.value;
  return isNaN(Number(cellValue)) ? null : Number(cellValue);
};

const calculateFormula = (
  formula: string,
  table: any,
  alphabet: string[]
): number | null => {
  const operator = formula.includes("+") ? "+" : formula.includes("-") ? "-" : null;

  if (!operator) {
    return null;
  }

  const operands = formula.split(operator).map(s => s.trim());
  if (operands.length < 2) {
    return null;
  }

  const values: number[] = [];

  for (const op of operands) {
    const value = parseOperand(op, table, alphabet);
    if (value === null) {
      return null;
    }
    values.push(value);
  }

  const result = operator === "+"
    ? values.reduce((acc, val) => acc + val, 0)
    : values.reduce((acc, val) => acc - val);

  return result;
};

export const calculateFormulaTotal = (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number, dispatch: any, table: any, alphabet: string[]) => {
  const value = event.target.value;

  if (!value.startsWith("=")) return;

  const matches = value.match(/=/g) || [];
  if (matches.length > 1) {
    return;
  }

  const formula = value.substring(1); // Remove '='
  const result = calculateFormula(formula, table, alphabet);

  if (result !== null) {
    dispatch(updateCell({ row, col, value: String(result), formula: value }));
  }
};
