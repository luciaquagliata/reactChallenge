import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    background-color: white;
    min-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background-color: #f3f3f3;
    font-weight: bold;
  }

  td:focus-within {
    outline: 2px solid #4a90e2;
    background-color: #eef6ff;
  }
`;

export const CellInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  background: transparent;

  &:focus {
    background-color: #eef6ff;
  }
`;
