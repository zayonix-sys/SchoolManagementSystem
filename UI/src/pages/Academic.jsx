import React from 'react';
import Section from '../components/academic/Section';
import Classroom from '../components/academic/Classroom';
import Class from '../components/academic/Class';
import AcademicModal from '../components/common/AcademicModal';


const Academic = () => {
    const classFields = [
        { label: "Class Name", name: "className", type: "text" },
        { label: "Description", name: "classDescription", type: "text" },
        { label: "Capacity", name: "capacity", type: "number" },
    ];

    const sectionFields = [
        { label: "Section Name", name: "sectionName", type: "text" },
        { label: "Capacity", name: "capacity", type: "number" },  
    ];

    const classroomFields = [
        { label: "Room Number", name: "roomNumber", type: "text" },
        { label: "Building", name: "floor", type: "text" },
        { label: "Capacity", name: "building", type: "number" },
    ];

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="card ps-5">
                    <div className="row ms-2 mt-5">
                        <div className="col-lg-11 col-md-12 col-sm-11 card">
                            <div className="card-body">
                                <div className='d-flex mt-3'>
                                    <h3>ClassRoom</h3>
                                    <div className='ms-auto'>
                                        <AcademicModal
                                            id="classroomModal"
                                            title="Add Classroom"
                                            fields={classroomFields}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                // Handle Classroom form submission here
                                            }}
                                    />
                                    </div>
                                </div>
                                <div className="tab-content pt-3" id="myTabContent">
                                    <Classroom />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row ms-2">
                        <div className="col-lg-11 col-md-12 col-sm-11 card">
                            <div className="card-body">
                                <div className='d-flex mt-3'>
                                    <h3>Class</h3>
                                    <div className='ms-auto'>
                                        <AcademicModal
                                            id="classModal"
                                            title="Add Class"
                                            fields={classFields}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                // Handle Class form submission here
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="tab-content pt-3" id="myTabContent">
                                    <Class />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row ms-2">
                        <div className="col-lg-11 col-md-12 col-sm-11 card">
                            <div className="card-body">
                                <div className='d-flex mt-3'>
                                    <h3>Section</h3>
                                    <div className='ms-auto'>
                                        <AcademicModal
                                            id="sectionModal"
                                            title="Add Section"
                                            fields={sectionFields}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                // Handle Section form submission here
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="tab-content pt-3" id="myTabContent">
                                    <Section />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Academic;

