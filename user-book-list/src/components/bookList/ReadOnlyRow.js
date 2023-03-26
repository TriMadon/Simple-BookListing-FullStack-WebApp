import React from "react";

const ReadOnlyRow = ({ book, handleDeleteClick }) => {
  return (
    <tr>
      <td>{book.bookTitle}</td>
      <td>{book.rating}</td>
      <td>{book.totalReads}</td>
      <td>
        <button type="button" onClick={() => handleDeleteClick(book.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
