import Campus from "../components/adminstration/Campus";
import Department from "../components/adminstration/Department";
import AcademicModal from "../components/common/AcademicModal";

const Adminstration = () => {
  const campusField = [
    { label: "Campus Name", name: "campusName", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "Country", name: "country", type: "text" },
    { label: "Postal code", name: "postalCode", type: "number" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone number", name: "phoneNumber", type: "number" },
  ];

const departmentFields = [
    { label: "Department Name", name: "departmentName", type: "text" },
    { label: "Capacity", name: "capacity", type: "number" },  
];

  return (
    <main id="main" className="main">
      <section className="section">
        {/* <div className="card ps-5"> */}
        <div className="row ms-2 mt-5">
          <div className="col-lg-12 col-md-12 col-sm-11 card">
            {/* <div className="card-body"> */}
            <div className="d-flex mt-3">
              <h3 className="fw-bolder">Campus</h3>
              <div className="ms-auto">
                <AcademicModal
                  id="campusModal"
                  title="Add Campus"
                  fields={campusField}
                    onSubmit={(e) => {

                    e.preventDefault();
                    // Handle Classroom form submission here
                  }}
                />
              </div>
            </div>
            <div className="tab-content pt-3" id="myTabContent">
              <Campus/>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="row ms-2">
          <div className="col-lg-12 col-md-12 col-sm-11 card">
            <div className="card-body">
              <div className="d-flex mt-3">
                <h3 className="fw-bolder">Department</h3>
                <div className="ms-auto">
                  <AcademicModal
                    id="departmentModal"
                    title="Add Department"
                    fields={departmentFields}
                     onSubmit={(e) => {
                      e.preventDefault();
                      // Handle Class form submission here
                    }}
                  />
                </div>
              </div>
              <div className="tab-content pt-3" id="myTabContent">
                <Department />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Adminstration;
