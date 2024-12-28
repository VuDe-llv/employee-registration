import React from "react";

const KhoaModal = ({ title, isVisible, onClose, children }) => {
  return (
    isVisible && (
      <>
        <div className="modal-overlay"></div>
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default KhoaModal;