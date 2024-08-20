import React from 'react';

const AcademicModal = ({ id, title, fields, onSubmit }) => {
  return (
    <section className="section">
      <div className="row ms-1">
        <div className="col-lg-6 mt-2">
          <div>
            <div>
              <div className="align-items-end justify-content-end d-flex ms-5 mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#${id}`}
                >
                  Add
                </button>
              </div>
              <div className="modal fade" id={id} tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{title}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={onSubmit}>
                        <table className="table">
                          <tbody>
                            {fields && fields.map((field, index) => (
                              <tr key={index}>
                                <td>{field.label}</td>
                                <td>
                                  <input
                                    type={field.type}
                                    className="form-control form-control-sm"
                                    name={field.name}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicModal;

