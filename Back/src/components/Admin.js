import classes from "./Admin.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import { env } from "../env";
function Admin() {
  const[searchTerm , setSearchTerm] = useState("");

  const [arr, setArr] = useState(null);
  const apiUrl = `${env.API_PATH}user/index.php`;
  const formData = new FormData();
  formData.append("_method","delete");

  const deleteUser = (id) => {
    axios
      .post(
        `${apiUrl}/${id}`,formData
      )
      .then(() => toast.warn("user deleted successfully"))
      .then(() => {
        setArr(arr.filter(user=>user.Social_ID!=id))
      });
  };

  const api=()=>{
    axios.get(apiUrl).then((res) => {
      console.log(res.data);
   
      setArr(res.data);
    })
  }
  useEffect(() => {
    api()
  }, []);
  
  const inputHandler = (event)=>{
    setSearchTerm(event.target.value)
  }

   
    
  ////content management////
  var content = "";
  if (arr == null || arr.length === 0) {
    content = <h1>There is no users </h1>;
  } else {
    content = (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">SocialId</th>
              <th scope="col">Image url</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
           {searchTerm.trim().length == 0 ? arr.map((user) => (
              <tr key={arr.indexOf(user) + 1}>
                <td>{arr.indexOf(user) + 1}</td>
                <td>{user.Name}</td>
                <td>{user.Social_ID}</td>
                <td>
                  <a href={"#"}><img width="150" src={`data:image/jpeg;base64,${user.Photo}`}></img></a>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(user.Social_ID)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
           )):arr.filter(user => user.Name.toUpperCase().startsWith(searchTerm.toUpperCase())).map((user) => (
              <tr key={arr.indexOf(user) + 1}>
                <td>{arr.indexOf(user) + 1}</td>
                <td>{user.Name}</td>
                <td>{user.Social_ID}</td>
                <td>
                  <a href={"#"}><img width="150" src={`data:image/jpeg;base64,${user.Photo}`}></img></a>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(user.Social_ID)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    
    <div className="container w-60 w-sm-100 mt-3 text-center">
    <input type="text" placeholder= "Search..."  className="form-control"
     onChange={inputHandler} />
      <ToastContainer position="bottom-left" />
      {content}
    </div>
  );
}

export default Admin;
