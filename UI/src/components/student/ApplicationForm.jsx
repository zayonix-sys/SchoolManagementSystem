import React, { useEffect, useState } from "react";
import { GetCity, GetCountries, GetLanguages, GetState } from "react-country-state-city";

const ApplicationForm = () => {
  const [familyMembers, setFamilyMembers] = useState([{ name: '', relation: '', qualification: '', occupation: '', incomeSource: '' }]);

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', relation: '', qualification: '', occupation: '', incomeSource: '' }]);
  };

  const handleRemoveFamilyMember = (index) => {
    const newFamilyMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(newFamilyMembers);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index][name] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [language, setLanguage] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountryId = parseInt(e.target.value, 10);
    setCountryid(selectedCountryId);

    // Fetch states based on selected country ID
    GetState(selectedCountryId).then((result) => {
      setStateList(result);
      setStateid(0); // Reset state selection when country changes
      setCityList([]); // Clear city list when country changes
    });
  };

  const handleStateChange = (e) => {
    const selectedStateId = parseInt(e.target.value, 10);
    setStateid(selectedStateId);

    // Fetch cities based on selected country and state IDs
    GetCity(countryid, selectedStateId).then((result) => {
      setCityList(result);
      setCityid(0); // Reset city selection when state changes
    });
  };

  const handleCityChange = (e) => {
    const selectedCityId = parseInt(e.target.value, 10);
    setCityid(selectedCityId);
  };

  return (
    <div>
      <main id="main" className="main ">
        <div className="pagetitle">
          <h1>Student Application Form</h1>
        </div>
        {/*..........User Profile...........  */}

        <section className="section profile ">
          <div className="row">
            <div className="col-xl-10">
              <div className="card">
                <div className="card-body pt-1">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Student's Details</button>
                    </li>

                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#family-details">Family Details</button>
                    </li>

                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#contact-details">Contact Details</button>
                    </li>
                  </ul>

                  <div className="tab-content pt-1">
                    {/* Student's Details Form */}
                    <div
                      className="tab-pane fade show active"
                      id="std-details"
                    >
                      <form className="row g-3 mt-1">
                        <div className="col-md-6 mb-2">
                          <label
                            htmlFor="validationDefault01"
                            className="form-label fw-bold"
                          >
                            First Name
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            id=""
                            value=""
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefault02"
                            className="form-label fw-bold"
                          >
                            Last Name
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            id=""
                            value=""
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefaultUsername"
                            className="form-label fw-bold"
                          >
                            Form-B Number
                          </label>
                          <span style={{ fontSize: '12px' }}> (Optional)</span>
                          <input type="text" className="form-control" id="" />
                        </div>

                        <div className="col-md-6 mb-2">
                          <label
                            htmlFor="validationDefault01"
                            className="form-label fw-bold"
                          >
                            Date of Birth
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <input
                            type="date"
                            className="form-control"
                            id=""
                            value=""
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                            id=""
                            value=""
                            required
                          >
                            Gender
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <select className="form-select" id="" required>
                            <option selected disabled value="">
                              Choose...
                            </option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Rather Not to Say</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefaultUsername"
                            className="form-label fw-bold"
                            id=""
                            value=""
                            required
                          >
                            Date of Application
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <input type="date" className="form-control" id="" />
                        </div>

                        <div className="col-md-6 ">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                            id=""
                            value=""
                            required
                          >

                            Last Class Attended
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <select className="form-select" id="" required>
                            <option selected disabled value="">
                              Choose...
                            </option>
                            <option>PG</option>
                            <option>Nur</option>
                            <option>Prep</option>
                            <option>Class I</option>
                            <option>Class II</option>
                            <option>Class III</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                          >
                            Admission Required in Class
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <select className="form-select" id="" required>
                            <option selected disabled value="">
                              Choose...
                            </option>
                            <option>PG</option>
                            <option>Nur</option>
                            <option>Prep</option>
                            <option>Class I</option>
                            <option>Class II</option>
                            <option>Class III</option>
                          </select>
                        </div>
                        <div className="col-12 text-end">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => document.querySelector('[data-bs-target="#family-details"]').click()}
                          >
                            Next
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Family Details Form */}
                    <div className="tab-pane fade pt-1" id="family-details">
                      <form className="g-3">
                        {familyMembers.map((member, index) => (
                          <div key={index} className="row family-member-group">
                            <p>Please specify details of family members<span style={{ color: 'red' }}>*</span></p>

                            <div className="col-md-6">
                              <label htmlFor={`name-${index}`} className="form-label fw-bold">
                                Family Member Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`name-${index}`}
                                name="name"
                                value={member.name}
                                onChange={(event) => handleInputChange(index, event)}
                                required
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor={`relation-${index}`} className="form-label fw-bold">
                                Relation with Student
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`relation-${index}`}
                                name="relation"
                                value={member.relation}
                                onChange={(event) => handleInputChange(index, event)}
                                required
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor={`qualification-${index}`} className="form-label fw-bold">
                                Qualification
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`qualification-${index}`}
                                name="qualification"
                                value={member.qualification}
                                onChange={(event) => handleInputChange(index, event)}
                                required
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor={`occupation-${index}`} className="form-label fw-bold">
                                Occupation
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`occupation-${index}`}
                                name="occupation"
                                value={member.occupation}
                                onChange={(event) => handleInputChange(index, event)}
                                required
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor={`incomeSource-${index}`} className="form-label fw-bold">
                                Source of Income
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`incomeSource-${index}`}
                                name="incomeSource"
                                value={member.incomeSource}
                                onChange={(event) => handleInputChange(index, event)}
                                required
                              />
                            </div>
                            <div className="col-md-12 mt-4 mb-3">
                              {familyMembers.length > 1 && (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleRemoveFamilyMember(index)}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className=" d-flex">
                          <div className="">
                            <button
                              type="button"
                              className="btn btn-primary mb-2"
                              onClick={handleAddFamilyMember}
                            >
                              Add Family Member
                            </button>
                          </div>

                          <div className="ms-auto">
                            <button
                              type="button"
                              className="btn btn-warning me-1"
                              onClick={() => document.querySelector('[data-bs-target="#std-details"]').click()}
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary "
                              onClick={() => document.querySelector('[data-bs-target="#contact-details"]').click()}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* Contact Details Form */}
                    <div className="tab-pane fade pt-1" id="contact-details">
                      <form className="row g-3 ">
                        <div className="col-md-6 ">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                          >
                            Language
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          {/* <select className="form-select" id="" required>
                            <option selected disabled value="">
                              Choose...
                            </option>
                            <option>Urdu</option>
                            <option>Sindhi</option>
                            <option>Punjabi</option>
                            <option>Balochi</option>
                            <option>Pashto</option>
                            <option>Hindko</option>
                            <option>Saraiki</option>
                          </select> */}
                          <select
                            onChange={(e) => {
                              setLanguage(e);
                            }}
                            value={language}
                            className="form-select"
                          >
                            {languageList.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                          >
                            House Status
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <select className="form-select" id="" required>
                            <option selected disabled value="">
                              Choose...
                            </option>
                            <option>Own House</option>
                            <option>On Rent</option>
                            <option>Free Portion</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefault05"
                            className="form-label fw-bold"
                          >
                            Country
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <select
                            onChange={handleCountryChange}
                            value={countryid}
                            className="form-select"
                          >
                            <option value={0} disabled>
                              Choose...
                            </option>
                            {countriesList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                          >State</label>
                          <span style={{ color: 'red' }}>*</span>
                          <select
                            onChange={handleStateChange}
                            value={stateid}
                            className="form-select"
                          >
                            <option value={0} disabled>
                              Choose...
                            </option>
                            {stateList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 ">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                          >City</label>
                          <span style={{ color: 'red' }}>*</span>
                          <select
                            onChange={handleCityChange}
                            value={cityid}
                            className="form-select"
                          >
                            <option value={0} disabled>
                              Choose...
                            </option>
                            {cityList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor="validationDefault04"
                            className="form-label fw-bold"
                            id=""
                            required
                          >
                            Contact No.
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <input type="text" className="form-control" id="" />
                        </div>

                        <div className="col-md-12 ">
                          <label
                            htmlFor="validationDefault05"
                            className="form-label fw-bold"
                            id=""
                            required
                          >
                            Address 1
                          </label>
                          <span style={{ color: 'red' }}>*</span>
                          <input type="text" className="form-control" id="" />
                        </div>

                        <div className="col-md-12">
                          <label
                            htmlFor="validationDefault05"
                            className="form-label fw-bold"
                          >
                            Address 2
                          </label>
                          <span style={{ fontSize: '12px' }}> (Optional)</span>
                          <input type="text" className="form-control" id="" />
                        </div>

                        <div className="col-12 mt-2 text-end">
                          <button
                            type="button"
                            className="btn btn-warning me-1"
                            onClick={() => document.querySelector('[data-bs-target="#family-details"]').click()}
                          >
                            Back
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
        {/*..........End User Profile !...........  */}
      </main >
    </div >
  );
};

export default ApplicationForm;
