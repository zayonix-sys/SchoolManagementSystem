import DataTable from "../common/Table";

const TeacherList = () => {
  const data = [
    {
      name: "Elliott Snyder",
      ext: 3925,
      city: "Enines",
      startDate: "2006/03/08",
      completion: 57,
    },
    {
      name: "Castor Pugh",
      ext: 9488,
      city: "Neath",
      startDate: "2014/23/12",
      completion: 93,
    },
    {
      name: "Pearl Carlson",
      ext: 6231,
      city: "Cobourg",
      startDate: "2014/31/08",
      completion: 100,
    },
    {
      name: "Deirdre Bridges",
      ext: 1579,
      city: "Eberswalde-Finow",
      startDate: "2014/26/08",
      completion: 44,
    },
    {
      name: "Daniel Baldwin",
      ext: 6095,
      city: "Moircy",
      startDate: "2000/11/01",
      completion: 33,
    },
    {
      name: "Unity Pugh",
      ext: 9958,
      city: "Curicó",
      startDate: "2005/02/11",
      completion: 37,
    },
    {
      name: "Theodore Duran",
      ext: 8971,
      city: "Dhanbad",
      startDate: "1999/04/07",
      completion: 97,
    },
    {
      name: "Kylie Bishop",
      ext: 3147,
      city: "Norman",
      startDate: "2005/09/08",
      completion: 63,
    },
    {
      name: "Willow Gilliam",
      ext: 3497,
      city: "Amqui",
      startDate: "2009/29/11",
      completion: 30,
    },
    {
      name: "Blossom Dickerson",
      ext: 5018,
      city: "Kempten",
      startDate: "2006/11/09",
      completion: 17,
    },
    {
      name: "Elliott Snyder",
      ext: 3925,
      city: "Enines",
      startDate: "2006/03/08",
      completion: 57,
    },
    {
      name: "Castor Pugh",
      ext: 9488,
      city: "Neath",
      startDate: "2014/23/12",
      completion: 93,
    },
    {
      name: "Pearl Carlson",
      ext: 6231,
      city: "Cobourg",
      startDate: "2014/31/08",
      completion: 100,
    },
    {
      name: "Deirdre Bridges",
      ext: 1579,
      city: "Eberswalde-Finow",
      startDate: "2014/26/08",
      completion: 44,
    },
    {
      name: "Daniel Baldwin",
      ext: 6095,
      city: "Moircy",
      startDate: "2000/11/01",
      completion: 33,
    },
    {
      name: "Unity Pugh",
      ext: 9958,
      city: "Curicó",
      startDate: "2005/02/11",
      completion: 37,
    },
    {
      name: "Theodore Duran",
      ext: 8971,
      city: "Dhanbad",
      startDate: "1999/04/07",
      completion: 97,
    },
    {
      name: "Kylie Bishop",
      ext: 3147,
      city: "Norman",
      startDate: "2005/09/08",
      completion: 63,
    },
    {
      name: "Willow Gilliam",
      ext: 3497,
      city: "Amqui",
      startDate: "2009/29/11",
      completion: 30,
    },
    {
      name: "Blossom Dickerson",
      ext: 5018,
      city: "Kempten",
      startDate: "2006/11/09",
      completion: 17,
    },
    {
      name: "Elliott Snyder",
      ext: 3925,
      city: "Enines",
      startDate: "2006/03/08",
      completion: 57,
    },
    {
      name: "Castor Pugh",
      ext: 9488,
      city: "Neath",
      startDate: "2014/23/12",
      completion: 93,
    },
    {
      name: "Pearl Carlson",
      ext: 6231,
      city: "Cobourg",
      startDate: "2014/31/08",
      completion: 100,
    },
    {
      name: "Deirdre Bridges",
      ext: 1579,
      city: "Eberswalde-Finow",
      startDate: "2014/26/08",
      completion: 44,
    },
    {
      name: "Daniel Baldwin",
      ext: 6095,
      city: "Moircy",
      startDate: "2000/11/01",
      completion: 33,
    },
   ];
   const columns = [
    { Header: "Full Name", accessor: "name" },
    { Header: "Ext.", accessor: "ext" },
    { Header: "City", accessor: "city" },
    { Header: "Start Date", accessor: "startDate" },
    { Header: "Completion", accessor: "completion" }, 
   ]
  return (
    <>
    <main id="main" className="main">
      <DataTable title="Teacher List" data={data} columns={columns} />
      </main>
    </>
  );
};

export default TeacherList;