const Modal = ({
  limit,
  dataCount,
  showModal,
  setLimit,
  setDataCount,
  handleCloseModal,
  handleSubmitDataResource,
}) => (
  <div className={showModal ? "modal is-active" : "modal"} id="dataModal">
    <div className="modal-dialog" role="document">
      <div class="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Set Sample Data</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label htmlFor="limit" className="label">
              Limit
            </label>
            <input
              type="text"
              className="input"
              id="limit"
              value={limit}
              placeholder="limit"
              onChange={({ target }) => setLimit(target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="dataCount" className="label">
              Data Count
            </label>
            <input
              type="text"
              className="input"
              id="dataCount"
              value={dataCount}
              placeholder="Data Count"
              onChange={({ target }) => setDataCount(target.value)}
            />
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={handleCloseModal}>
            Close
          </button>
          <button
            className="button is-success"
            onClick={handleSubmitDataResource}
          >
            Save changes
          </button>
        </footer>
      </div>
    </div>
  </div>
);

export default Modal;
