import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from '../../components/Container';


const ViewProfile = () => {
  const userRole = useSelector((state) => state.userRole);
  const [Profile, setProfile] = useState({
    name: "",
    username: "",
    address: "",
    email: "",
    phone: "",
  });

  // fecth user info
  useEffect(() => {
    axios
      .get("http://localhost/api/user-info.php")
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setProfile(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Meta title="Hồ sơ của bạn"/>
      {userRole !== '' ? (
      <>
      <Container class1="home-wrapper-2 py-3">
      <div className='h3'>Hồ sơ của bạn</div>
      <Link to="/edit-profile" className='py-3'>
        <button className='d-block btn btn-primary'>Chỉnh sửa hồ sơ</button>
      </Link>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>{Profile.username}</TableCell>
          </TableRow>          
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>{Profile.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{Profile.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>SĐT</TableCell>
            <TableCell>{Profile.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>{Profile.address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
    ) : (
    <div className="text-center text-muted">
      Bạn phải đăng nhập trước<br/>
      <Link to="/login">Đăng nhập</Link><br/>
    </div>
    )}
    </div>
  );
};

export default ViewProfile;
