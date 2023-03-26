import React from "react";

const ReadOnlyRow = ({ book }) => {
  return (
    <tr>
      <td>{book.bookTitle}</td>
      <td>{book.meanRating}</td>
      <td>{book.sumOfReads}</td>
    </tr>
  );
};

export default ReadOnlyRow;
