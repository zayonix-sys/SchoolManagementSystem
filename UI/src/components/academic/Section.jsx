import { useState } from "react";
import DataTable from "../common/Table";

const Section
 = () => {
  // Example data
  const initialData =  [
      { id: 1, sectionName: "Red", capacity: 30 },
      { id: 2, sectionName: "Green",  capacity: 25 },
      { id: 3, sectionName: "Blue",  capacity: 20 },
      // Add more data as needed
    ];

  const columns = [
      { Header: "S.No", accessor: "id", width: "10%" },
      { Header: "Section Name", accessor: "sectionName", width: "20%" },
      { Header: "Capacity", accessor: "capacity", width: "20%" }, 
    ]

    const [data, setData] = useState(initialData);
    const handleDelete = (rowData) => {
      const updatedData = data.filter((item) => item.id !== rowData.id);
      setData(updatedData);
    };
  return (
    <div style={{ minWidth: '100%', overflowX: 'auto', overflowY: 'auto', maxHeight: '300px' }}>
      <DataTable data={data} columns={columns}  onDelete={handleDelete}/>
    </div>
  );
};

export default Section;