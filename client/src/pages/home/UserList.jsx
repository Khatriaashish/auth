import React, { useEffect, useState } from "react";
import { Col, Container, Table, Image, Spinner } from "react-bootstrap";
import "./UserList.css";

import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { apiCall } from "../apicall";
import toast from "react-hot-toast";
import TablePagination from "../../components/common/Pagination/Pagination";

const UserList = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();

  const listUser = async ({ page = 1, search = "", limit = 5 }) => {
    try {
      setLoading(true);
      const response = await apiCall.getAllUsers({ page, search, limit });
      setData(response.result);
      setPagination({
        currentPage: +response.meta.page,
        limit: +response.meta.limit,
        total: response.meta.total,
        pages: Math.ceil(response.meta.total / +response.meta.limit),
      });
    } catch (except) {
      toast.error(except.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listUser({ page: 1 });
  }, []);
  console.log(data);
  return (
    <>
      <div className="login-container">
        <Col>
          <Container className="login-form">
            <NavLink to={"/"} className={"btn btn-sm btn-ghost float-start"}>
              <FaArrowLeft /> &nbsp; Dashboard
            </NavLink>
            <br />
            <h2>User List</h2>
            <hr />
            <Table striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Photo</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>
                      <Spinner variant="dark"></Spinner>
                    </td>
                  </tr>
                ) : data && data.length ? (
                  <>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>
                          <Image
                            onError={(e) => {
                              e.target.src = thumbnail;
                            }}
                            style={{ maxWidth: "50px" }}
                            fluid
                            src={
                              import.meta.env.VITE_IMAGE_URL +
                              "/users/" +
                              item.image
                            }
                            alt=""
                          />
                        </td>
                        <td>{item.role}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={5}>No data found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {pagination ? (
              <TablePagination pagination={pagination} fetchData={listUser} />
            ) : (
              <></>
            )}
          </Container>
        </Col>
      </div>
    </>
  );
};

export default UserList;
