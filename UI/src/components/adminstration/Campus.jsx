import { useState } from "react";
import DataTable from "../common/Table";

const Campus = () => {
  // Example data
  const initialData = [
    {
      id: 1,
      campusName: "Campus 1",
      city: "New York",
      address: "123 Main St",
      state: "NY",
      country: "USA",
      postalCode: "10001",
      email: "campus1@example.com",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      campusName: "Campus 2",
      city: "Los Angeles",
      address: "456 Elm St",
      state: "CA",
      country: "USA",
      postalCode: "90001",
      email: "campus2@example.com",
      phoneNumber: "987-654-3210",
    },
    {
      id: 3,
      campusName: "Campus 3",
      city: "Chicago",
      address: "789 Oak St",
      state: "IL",
      country: "USA",
      postalCode: "60601",
      email: "campus3@example.com",
      phoneNumber: "555-555-5555",
    },
    // Add more data as needed
  ];
  const columns = [
    { Header: "S.No", accessor: "id" },
    { Header: "Campus Name", accessor: "campusName"  },
    { Header: "City", accessor: "city"  },
    { Header: "Address", accessor: "address"  },
    { Header: "State", accessor: "state"  },
    { Header: "Country", accessor: "country"  },
    { Header: "Postal code", accessor: "postalCode"  },
    { Header: "Email", accessor: "email"  },
    { Header: "Phone number", accessor: "phoneNumber"  },
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
      <DataTable title="Campus" data={data} columns={columns} onDelete={handleDelete} />
    </div>
  );
};

export default Campus;
