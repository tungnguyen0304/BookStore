import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
const SexList = [{
      id: 1,
      name : 'Nam'
     },{
      id: 2,
      name : 'Nữ'
     }
    ]
const ViewProfile = () => {
    const name = "abcd"
  const { id } = useParams(); // Lấy id trên URL
  const [user, setUser] = useState({}); // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái khi đang load thông tin
  const [check,setcheck] = useState() 
  useEffect(() => {
    const fetchUser = async () => {
      // try {
      //   const response = await axios.get(`/api/users/${id}`); //Lấy thông tin người dùng qua API
      //   setUser(response.data);
      //   setLoading(false);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    fetchUser();
  }, [id]);

  if (!loading) {
    return <h2>Loading User...</h2>;
  }

  return (
    <div>
      <h2>User Profile</h2>
     <div style={{boxShadow:"5px 5px 10px grey",padding:"10px 0 10px 25px"}}> 
     <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Tên:</strong><input className="view-profile-text" type="text" value={name}></input>
        
      </p>
      {/* <p style={{display: "flex"}}>
      <strong style={{display:"flex",alignItems:"center",justifyContent:"center",width:"90px"}}>Giới tính:</strong>
        <input className='view-profile-sex' type="radio" ></input><p>Nam</p>
        <input className='view-profile-sex' type="radio" ></input><p>Nữ</p> */}

        

        <p style={{display: "flex"}} >
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Giới tính:</strong>  
       {SexList.map(function(abc)
      {
        return (
        
        <div style={{display: "flex"}} key={abc.id}>
          <input className='view-profile-sex' checked={check === abc.id}
          onClick = {function(){setcheck(abc.id)
                        console.log(abc.name)
        }} 
          type="radio"></input>
          <p>{abc.name}</p>
          </div>
          
          )
      }
      )}
      </p>
     
    
  

        


      {/* </p> */}
      <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Địa chỉ:</strong><input className="view-profile-text" type="text" value={name}></input>
        
      </p>
      <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>SĐT:</strong><input className="view-profile-text" type="tel" value={name}></input>
        
      </p>
      <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Email:</strong><input className="view-profile-text" type="email" value={name}></input>
        
      </p>
     </div>
     
        <Link to="/edit_profile" >
        <button className='view-profile-link-change'>Cập nhật</button>
  </Link>
     
    </div>
  );
};

export default ViewProfile;
