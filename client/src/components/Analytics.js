import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection, numberOfPeople, peopleNames }) => {
  const categories = [
    "Room-Rent",
    "Electricity",
    "Groceries",
    "Eating Out",
    "WIFI Bill",
    "Utilities",
    "HouseHold Items",
    "Cleaning Supplies",
    "Transportation",
  ];

  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  const splitExpense =
    (totalIncomeTurnover + totalExpenseTurnover) / numberOfPeople;

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card bg-primary text-light">
              <div className="card-header">
                Total Transactions: {totalTransaction}
              </div>
              <div className="card-body">
                <h5 className="text-light">
                  In-Room Expenses: {totalIncomeTransactions.length}
                </h5>
                <h5 className="text-light">
                  Other Expenses: {totalExpenseTransactions.length}
                </h5>
                <div className="d-flex flex-column align-items-center">
                  <Progress
                    type="circle"
                    strokeColor={"#1abc9c"}
                    className="mx-2"
                    percent={totalIncomePercent.toFixed(0)}
                  />
                  <Progress
                    type="circle"
                    strokeColor={"#e74c3c"}
                    className="mx-2 mt-3"
                    percent={totalExpensePercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary text-light">
              <div className="card-header">
              Total Expenditure: {totalTurnover}
              </div>
              <div className="card-body">
                <h5 className="text-light">
                  In-Room Expenses: {totalIncomeTurnover}
                </h5>
                <h5 className="text-light">
                  Other Expenses: {totalExpenseTurnover}
                </h5>
                <div>
                  <Progress
                    type="circle"
                    strokeColor={"#1abc9c"}
                    className="mx-2"
                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                  />
                  <Progress
                    type="circle"
                    strokeColor={"#e74c3c"}
                    className="mx-2 mt-3"
                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <h6 className="bg-info text-light p-2">
              Category-wise In-Room Expenses
            </h6>
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card mt-2" key={category}>
                    <div className="card-body">
                      <h6>{category}</h6>
                      <Progress
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="col-md-3">
            <h6 className="bg-dark text-light p-2">
              Category-wise Other Expenses
            </h6>
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card mt-2" key={category}>
                    <div className="card-body">
                      <h6>{category}</h6>
                      <Progress
                        percent={((amount / totalExpenseTurnover) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="shadow p-3 mt-5">
        <h6 className="bg-danger text-light p-2 text-center" style={{ fontSize: "24px" }}>
  Splitwise per Person
</h6>

  {peopleNames.map((name, index) => (
    <div className="row" key={name}>
      <div className="col-md-2">
        <h4>{index + 1}</h4>
      </div>
      <div className="col-md-8">
        <h4>{name}</h4>
      </div>
      <div className="col-md-2">
        <h5>Left to Pay: {splitExpense.toFixed(2)}</h5>
      </div>
      {index < peopleNames.length - 1 && (
        <div
          style={{
            height: "1px",
            backgroundColor: "#ccc",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
      )}
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default Analytics;
