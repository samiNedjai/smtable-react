
import React from "react";
import Table from "./Table";

const columns = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "startDate", label: "Start Date" },
  { id: "birthtDate", label: "birth tDate" },
];

const data = [
  { firstName: "John", lastName: "Doe", startDate: "2023-04-10",birthtDate: "2023-04-10" },
  { firstName: "Jane", lastName: "Smith", startDate: "2022-06-15",birthtDate: "2023-04-10" },
  { firstName: "Jane", lastName: "Smith", startDate: "2022-06-15",birthtDate: "2023-04-10" },
  { firstName: "Jane", lastName: "Smith", startDate: "2022-06-15",birthtDate: "2023-04-10" },
  { firstName: "Jane", lastName: "Smith", startDate: "2022-06-15" ,birthtDate: "2023-04-10"},
  { firstName: "Jane", lastName: "Smith", startDate: "2022-06-15",birthtDate: "2023-04-10" }
];

function App() {
  return (
    <div>
      <Table columns={columns} data={data} pageSizeOptions={[5, 10, 20]} />
    </div>
  );
}

export default App;

