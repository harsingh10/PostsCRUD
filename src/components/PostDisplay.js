import React, { useEffect, useState } from 'react';
import axios from 'axios';
import history from "../Utils/history"


const PostDisplay = (props) => {

  const [data, setData] = useState([])
  const [fetchedData, setfetchedData] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("");
  const [deleteResponseMessage,setdeleteResponseMessage] = useState("");

  const header =
  {
    "userId": "User Id",
    "title": "Title",
    "id": "Id",
    "body": "Body",
  }

  const handleEdit =(id) => (e) => {
    e.preventDefault()
   history.push("/updatePost/" + id);

  }
  const handleDelete =  (id) => async (e)=> {
    e.preventDefault();
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if(!response.data){
      setdeleteResponseMessage(`Post ${id} deleted successfully`);
    }
    console.log(response);
  }

  const handleAdd = (e) => {
   e.preventDefault();
   history.push("/addPost");
  }
  const handleSearch = (e) => {
    console.log(searchKeyword)
    if (searchKeyword !== "") {
      let tempData = [];
      data.map((dataObj, i) => {
        let flag = false;
        let isfound = Object.keys(header).filter((head) => (dataObj[head].toString().includes(searchKeyword.toString())))
        if (isfound.length > 0) return tempData.push(dataObj)
      })
      console.log(tempData)
      setData(tempData);
    } else setData(fetchedData);
  }

  const handleChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  useEffect(async () => {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    const data = await axios.get('https://jsonplaceholder.typicode.com/posts', config);
    setfetchedData(data.data);
    setData(data.data)
  }, [])

  return (
    
    <div>
      <input type="text" onChange={handleChange} value={searchKeyword}></input><i class="fas fa-search" onClick={handleSearch}>Search</i>
      <table style={{ border: "1px solid black", width: "80%", marginLeft: "20px", marginTop: "20px", marginBottom: "50px" }}>
        <tr>
          {Object.entries(header).map((value) => <th style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>{value[1]}</th>)}
        </tr>
        {
          data.map((dataObj,index) => {
            return <tr>
              {Object.keys(header).map((headKey) => <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}>{dataObj[headKey]}</td>)}
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}><i class="fas fa-edit" onClick={handleEdit(dataObj["id"])}>Edit</i></td>
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}><i class="fas fa-edit" onClick={handleAdd}>Add</i></td>
              <td style={{ borderRight: "1px solid black", borderBottom: "1px solid black" }}><i class="fas fa-trash-alt" onClick={handleDelete(dataObj["id"])}>Delete</i></td>
            </tr>
          })
        }

      </table>
    </div>
  )


}
export default PostDisplay;