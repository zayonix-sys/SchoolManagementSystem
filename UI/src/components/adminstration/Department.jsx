import { useState } from "react";
import DataTable from "../common/Table";

const Department = () => {
  // Example data
  const initialData = [
    {
      id: 1,
      departmentName: "Computer Science",
      capacity: 50,
    },
    {
      id: 2,
      departmentName: "BBA",
      capacity: 40,
    },
    {
      id: 3,
      departmentName: "Media Science",
      capacity: 30,
    },
    // Add more data as needed
  ];
  const columns = [
    { Header: "S.No", accessor: "id" },
    { Header: "Department Name", accessor: "departmentName"},
    { Header: "Capacity", accessor: "capacity" },
  ];

  const [data, setData] = useState(initialData);

  const handleDelete = (rowData) => {
    const updatedData = data.filter((item) => item.id !== rowData.id);
    setData(updatedData);
  };
  return (
    <div
      style={{
        minWidth: "100%",
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "300px",
      }}
    >
      <DataTable
      title="Department"
      data={data}
      columns={columns}
      onDelete={handleDelete} // Ensure this is correctly passed
    />
    </div>
  );
};

export default Department;
