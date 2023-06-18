import React, { useState } from "react";
import { Collapse, Button } from "antd";

const { Panel } = Collapse;

const Dropdownm = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <Button type="primary" block onClick={handleToggle}>
        How to use
      </Button>
      {isActive && (
        <Collapse>
          <Panel header="Website Instructions" key="1">
          <div>
          <h1>Instructions for Using RoomCents: Student Lifestyle Edition</h1>
          <p>
  This website is primarily created for managing shared expenses during a session or a specific time period. At the end of each month, when all participants have made their payments and the month is completed, you can delete all the transactions to start fresh for the new month.
</p>
<p>
  <strong>Instructions:</strong> To delete all transactions for a new month, follow these steps:
</p>
<ol>
  <li>Make sure all participants have made their payments and the month has ended.</li>
  <li>Access the transaction management section of the website.</li>
  <li>Locate the option to delete transactions.</li>
  <li>Select the option to delete all transactions or choose the specific transactions you want to remove.</li>
  <li>Confirm the deletion process.</li>
  <li>Once the transactions are deleted, you can start entering new transactions for the upcoming month.</li>
</ol>
<h1>Website Instructions</h1>

<ol>
  <li>Upon accessing the website, you will see a welcome message and an image illustrating the concept of RoomCents: Student Lifestyle Edition.</li>
  <li>To get started, create an account and log in.</li>
  <li>Once logged in, you will be directed to the main dashboard, where you can input and manage your expenses.</li>
  <li>The dashboard displays various analytics related to transactions and expenses, providing valuable insights into your spending patterns.</li>
  <li>On the left side of the dashboard, you'll find the "Total Transactions" card, which shows the total number of transactions made, categorized as "In-Room Expenses" and "Other Expenses." The circular progress bars represent the percentage of each category.</li>
  <li>In the middle of the dashboard, the "Total Turnover" card provides an overview of the total amount spent on transactions, including both in-room and other expenses. The circular progress bars represent the percentage of each category.</li>
  <li>The two columns on the right side of the dashboard display category-wise expenses for in-room expenses and other expenses. Each category card shows the name of the category and a progress bar indicating the percentage of expenses in that category.</li>
  <li>At the bottom of the dashboard, you will find the "Splitwise per Person" section, displaying a list of individuals involved in the expenses and their corresponding "Left to Pay" amount. This amount represents each person's share towards the total expenses.</li>
  <li><strong>Splitwise per Person:</strong></li>
  <ul>
    <li>If you are sharing expenses with other individuals, the "Splitwise per Person" section provides an overview of how much each person owes or is owed by others.</li>
    <li>The section lists the names of the individuals involved in the expenses and their corresponding "Left to Pay" amount.</li>
    <li>The "Left to Pay" amount represents each person's share towards the total expenses.</li>
    <li>If the amount is positive, it means the person owes that amount to others.</li>
    <li>If the amount is negative, it means the person is owed that amount by others.</li>
    <li>This feature helps you keep track of shared expenses and settle the dues accordingly.</li>
  </ul>
  <li>To filter transactions, use the available options in the "Select Frequency" and "Select Type" dropdown menus. You can choose a predefined frequency (1 week, 1 month, 1 year) or select "Custom" to set a custom date range using the RangePicker.</li>
  <li>To switch between different views, use the icons in the "switch-icons" section. The "UnorderedListOutlined" icon represents the table view, displaying the transactions in a tabular format. The "AreaChartOutlined" icon represents the analytics view, providing interactive charts for visualizing expenses.</li>
  <li>To add a new transaction, click the "Add New" button. A modal will appear with a form to fill in the transaction details, including amount, type (InRoom Expenses or Other Expenses), category, date, reference, and description. Fill in the required fields and click "SAVE" to add the transaction.</li>
  <li>To edit or delete a transaction, click the respective icons in the "Actions" column of the table view. The "EditOutlined" icon allows you to edit the transaction details, while the "DeleteOutlined" icon deletes the transaction permanently.</li>
</ol>
</div>

          </Panel>
        </Collapse>
      )}
    </div>
  );
};

export default Dropdownm;
