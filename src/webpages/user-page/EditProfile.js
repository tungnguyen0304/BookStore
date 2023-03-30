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
const EditProfile = () => {
    const name = "abcd"
  const { id } = useParams(); // Lấy id trên URL
  const [user, setUser] = useState({}); // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái khi đang load thông tin
  const [check,setcheck] = useState() 
  const [username, setUsername] = useState('');
  const [diachi, setdiachi] = useState('');
  const [sdt, setsdt] = useState('');
  const [email, setemail] = useState('');
  const handleSubmit = (event) => {// Thực hiện xử lý đăng nhập ở đây
    event.preventDefault();
    console.log('Username: ' + username);
    console.log('diachi: ' + diachi);
    console.log('sdt: ' + sdt);
    console.log('email: ' + email);
    // window.location.href = '/view_profile'; dùng để chuyển sang component khác
    console.log('ngày sinh:' + document.getElementById('day').value + '/' + document.getElementById('month').value + '/' + document.getElementById('year').value)
  };
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'diachi') {
        setdiachi(event.target.value);
    }else if (event.target.name === 'sdt') {
        setsdt(event.target.value);
    }else if (event.target.name === 'email') {
        setemail(event.target.value);
    }
  };
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
      <div className='pageTitle'>Chỉnh sửa hồ sơ</div>
     <div style={{boxShadow:"5px 5px 10px grey",padding:"10px 0 10px 25px"}}> 
     <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Tên:</strong>
        
        <input className="view-profile-text" type="text" name="username" placeholder='Username ' value={username} onChange={handleChange} />
      </p>
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
     <div>

     <div class="form-group ">
                    <strong><label class="col-3 col-form-label">Ngày sinh:</label></strong>
                    <div class="col-9 d-flex">
                        <select class="form-control col-2 " id="day">
                            <option selected disabled hidden  >Day</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                          </select>
                          <select class="form-control col-2" id="month">
                            <option selected disabled hidden>Month</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                          <select class="form-control col-2" id="year">
                            <option selected disabled hidden>Year</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                          </select>
                    </div>
                </div>


     </div>
      <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Địa chỉ:</strong>
        
        <input className="view-profile-text" type="text" name="diachi" placeholder='Địa chỉ ' value={diachi} onChange={handleChange} />
      </p>
      <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>SĐT:</strong>
        
        <input className="view-profile-text" type="tel" name="sdt" placeholder='số điện thoại ' value={sdt} onChange={handleChange} />

      </p>
      <p style={{display: "flex"}}>
        <strong style={{display:"flex",alignItems:"center",width:"90px"}}>Email:</strong>
       
        <input className="view-profile-text" type="email" name="email" placeholder='Địa chỉ ' value={email} onChange={handleChange} />

      </p>
     </div>
     
        <div style={{ display: "flex",
    justifyContent:"center" }}>
        
        <button onClick={handleSubmit} className='view-profile-link-change'>Lưu thay đổi</button>
  
  <Link to="/view_profile" >
        <button className='view-profile-link-cancel'>Hủy</button>
  </Link>
        </div>
     
    </div>
  );
};

export default EditProfile;
