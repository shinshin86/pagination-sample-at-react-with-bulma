import React, { useState, useEffect, useCallback } from "react";
import { getTestData } from "./test-data";
import Pagination from "./Pagination";
import Modal from "./Modal";

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [dataCount, setDataCount] = useState(100);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = useCallback(async () => {
    setIsFetching(true);

    // Fetch data
    const offset = (currentPage - 1) * limit;
    const { userList, userCount } = await getTestData({
      limit,
      offset,
      dataCount,
    });

    setUserList(userList);

    // Update pagination state
    const totalPage = Math.ceil(userCount / limit);
    setTotalPage(totalPage);

    setIsFetching(false);
  }, [limit, dataCount, currentPage]);

  const handleClickPagination = useCallback(
    async (nextPageNumber) => {
      setIsFetching(true);

      // Fetch data
      const offset = (nextPageNumber - 1) * limit;
      const { userList, userCount } = await getTestData({
        limit,
        offset,
        dataCount,
      });

      setUserList(userList);

      // Updata pagination state
      const totalPage = Math.ceil(userCount / limit);
      setTotalPage(totalPage);
      setCurrentPage(nextPageNumber);

      setIsFetching(false);
    },
    [limit, dataCount]
  );

  const handleSubmitDataResource = async () => {
    handleCloseModal();
    setCurrentPage(1);
    await fetchData();
  };

  const handleClickShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isFetching)
    return (
      <div className="container">
        <p className="m-3 has-text-centered">Loading...</p>
      </div>
    );

  return (
    <div className="container">
      <h1 className="title has-text-centered">Pagination Sample</h1>
      <div className="m-3 has-text-centered">
        <button
          type="button"
          className="button is-primary"
          onClick={handleClickShowModal}
        >
          Launch data modal
        </button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handleClickPagination={handleClickPagination}
        />
      </div>
      <Modal
        limit={limit}
        dataCount={dataCount}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        setLimit={setLimit}
        setDataCount={setDataCount}
        handleSubmitDataResource={handleSubmitDataResource}
      />
    </div>
  );
};

export default App;
