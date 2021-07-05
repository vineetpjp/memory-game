import React from "react";

function Table({ table, activeCard, activeCardValue, onCardClick }) {
  const renderTable = () => {
    return table.map((card, index) => {
      const active = activeCard === index ? "active-card" : "";
      const cardValue = active ? activeCardValue : null;
      return (
        <div key={index}>
          {card === 0 ? (
            <div className={`empty-card`} />
          ) : (
            <div
              onClick={() => onCardClick(index)}
              className={`card ${active}`}
            >
              {" "}
              {cardValue ? cardValue : "?"}
            </div>
          )}
        </div>
      );
    });
  };

  return <div className={"table-container"}>{renderTable()}</div>;
}

export default Table;
