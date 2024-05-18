import { Pagination } from "react-bootstrap";

const TablePagination = ({ pagination, fetchData }) => {
  console.log(pagination);
  return (
    <>
      <Pagination className="float-end">
        {+pagination.currentPage > 1 ? (
          <>
            <Pagination.First
              onClick={(e) => {
                e.preventDefault();
                fetchData({ page: 1 });
              }}
            />
            <Pagination.Prev
              onClick={(e) => {
                e.preventDefault();
                fetchData({ page: +pagination.currentPage - 1 });
              }}
            />
          </>
        ) : (
          <></>
        )}

        {[...Array(pagination.pages)].map((item, ind) => (
          <Pagination.Item
            key={ind}
            active={+pagination.currentPage === ind + 1 ? true : false}
            onClick={(e) => {
              e.preventDefault();

              fetchData({ page: ind + 1 });
            }}
          >
            {ind + 1}
          </Pagination.Item>
        ))}

        {pagination.currentPage < pagination.pages ? (
          <>
            <Pagination.Next
              onClick={(e) => {
                e.preventDefault();
                fetchData({ page: +pagination.currentPage + 1 });
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                e.preventDefault();
                fetchData({ page: pagination.pages });
              }}
            />
          </>
        ) : (
          <></>
        )}
      </Pagination>
    </>
  );
};

export default TablePagination;
