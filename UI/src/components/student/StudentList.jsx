import React, { useState } from "react";
import DataTable from "../common/Table";

const StudentList = () => {

    const fields = [
    { accessor: 'name', label: 'First Name', type: 'text', name: 'name' },
    { accessor: 'fname', label: 'Father Name', type: 'text', name: 'fname' },
    { accessor: 'admission', label: 'Admission Required in Class', type: 'text', name: 'admission' },
    { accessor: 'dob', label: 'Date of Birth', type: 'date', name: 'date' },
    { accessor: 'address', label: 'Address', type: 'text', name: 'address' },
  ];

  const initialData = [
    {
      id: 1,
      name: "Hassan Shaheer",
      fname: "Khan Hasan",
      admission: "IV",
      date: "2005/02/11",
      address: "905, Street 4, Main Boulevard, DHA, Karachi.",
    },
    {
      id: 2,
      name: "Zakir",
      fname: "Fakhir Khan",
      admission: "V",
      date: "2005/02/11",
      address: "905, Street 4, Main Boulevard, DHA, Karachi.",
    },
    {
      id: 3,
      name: "Ahsan",
      fname: "Samar Obaid",
      admission: "VI",
      date: "2005/02/11",
      address: "905, Street 4, Main Boulevard, DHA, Karachi.",
    }
  ];
  const columns = [
    { Header: "First Name", accessor: "name" },
    { Header: "Father Name.", accessor: "fname" },
    { Header: "Admission Required", accessor: "admission" },
    { Header: "Date of Birth", accessor: "date" },
    { Header: "Address", accessor: "address" }, 
  ]

  const [data, setData] = useState(initialData);
    const handleDelete = (rowData) => {
      const updatedData = data.filter((item) => item.id !== rowData.id);
      setData(updatedData);
    };

  return (
    <>
    <main id="main" className="main">
      <DataTable title="Students Applications List" data={data} columns={columns} onDelete={handleDelete} fields={fields} />
      </main>
    </>
  );
};

export default StudentList;