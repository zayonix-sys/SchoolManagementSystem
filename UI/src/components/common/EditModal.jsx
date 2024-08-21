
import React, { useEffect, useRef } from "react";

const EditModal = ({ id, title, fields, data, onClose, onSubmit }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalInstance = new window.bootstrap.Modal(modalRef.current);
    modalInstance.show();

    return () => {
      modalInstance.dispose();
    };
  }, []);

  const handleSubmit = () => {
    const updatedData = fields.reduce((acc, field) => {
      acc[field.name] = document.getElementById(field.id).value;
      return acc;
    }, {});
    onSubmit(updatedData);
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {fields.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={field.id} className="form-label">{field.label}</label>
                <input
                  type={field.type}
                  className="form-control"
                  id={field.id}
                  defaultValue={data ? data[field.name] : ""}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;


