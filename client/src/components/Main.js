import axios from "axios";
import React, { useEffect, useState } from "react";
import "../scss/main.scss";
const Main = () => {
  const [data, setData] = useState([]);
  const [items, setitems] = useState(null);
  const [page, setPage] = useState(0);
  const getallusers = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/users/getAllUsers?page=${page}&limit=6`
      );
      setData(res.data.data);
    } catch (err) {
      alert(err.message);
    }
  };
  const deleteMe = async (e) => {
    const id = e.target.dataset.id;
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/users/deleteuser/${id}`
      );
      console.log(res);
      if (res.data.status === "success") {
        alert("ACCOUNT DELTED SUCCESSFULLY!");
        setTimeout(() => {
          pageinc();
        }, 1000);
      } else {
        alert("ERROR DELETING THE ACCOUNT!");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    const nextpage = async () => {
      if (page !== 0) {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/users/getAllUsers?page=${page}&limit=6`
          );
          setData(res.data.data);
        } catch (err) {
          alert(err.message);
        }
      }
    };
    nextpage();
  }, [page]);
  useEffect(() => {
    const prevpage = async () => {
      if (page !== 0) {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/users/getAllUsers?page=${page}&limit=6`
          );
          setData(res.data.data);
        } catch (err) {
          alert(err.message);
        }
      }
    };
    prevpage();
  }, [page]);
  useEffect(() => {
    const renderedItems = data.map((el) => {
      return (
        <div key={el._id} className="results-item">
          <div className="results-item-name">Name: {el.name}</div>
          <div className="results-item-age">Age: {el.age}</div>
          <div className="results-item-email">Email: {el.email}</div>
          <div className="results-item-role">Role: {el.role}</div>
          <a
            href="#"
            data-id={el._id}
            className="results-item-delete"
            onClick={(e) => deleteMe(e)}
          >
            DELETE
          </a>
        </div>
      );
    });
    setitems(renderedItems);
  }, [data]);
  const pageinc = () => {
    setPage(page + 1);
  };
  const pagedec = () => {
    setPage(page - 1);
  };
  const sortbyAge = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/users/getAllUsers?sort=age`
      );
      setData(res.data.data);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="main">
      <div className="options">
        <button onClick={pageinc} className="getdata">
          GetAllUsers
        </button>
        <button onClick={sortbyAge} className="getdata">
          sortbyAge
        </button>
      </div>
      <div className="results">
        {items}
        {page >= 1 ? (
          <div>
            <button className="right" onClick={pageinc}>
              NEXT <span>&rarr;</span>
            </button>
            <button className="left" onClick={pagedec}>
              LEFT <span>&larr;</span>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default Main;
