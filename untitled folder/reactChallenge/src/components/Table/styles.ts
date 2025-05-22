import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; 
  font-family: 'Segoe UI', sans-serif;
  font-size: 15px;

  th, td {
    border: 1px solid #ccc;
    padding: 4px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap; 
  }

  td:focus-within {
    outline: 2px solid #4a90e2;
    background-color: #eef6ff;
  }
`;

export const HeaderCell = styled.th`
  background-color: #f3f3f3;
  font-weight: bold;
  font-size: 16px;
  min-width: 120px;
`;

export const RowHeader = styled.th`
  background-color: #f9f9f9;
  font-weight: bold;
  font-size: 16px;
  padding: 6px;
`;

export const CellInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 6px;
  font-size: inherit;
  font-family: inherit;
  background: transparent;
  text-align: left;

  &:focus {
    background-color: #eef6ff;
  }
`;
