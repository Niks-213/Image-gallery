import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Button,
  Form,
  Label,
} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import { get } from "lodash";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Route, Link, useNavigate, useLocation  } from 'react-router-dom';
import { Toggle } from "rsuite";

const crispStyle = {
  placeholder: (prop) => ({
    ...prop,
    color: "#6c757d",
    height: 30,
    minHeight: 30,
    marginTop: "4px",
  }),
  control: (prop) => ({
    ...prop,
    backgroundColor: "#293042 ",
    height: 30,
    minHeight: 30,
    border: "1px solid #ced4da",
    "&:hover": {
      borderColor: "#ced4da",
      borderRadius: "1px",
      borderStyle: "solid",
    },
  }),
  singleValue: (prop) => ({
    ...prop,
    color: "#ffff",
    height: 30,
    minHeight: 30,
    marginTop: "4px",
  }),
  option: (prop) => ({
    ...prop,

    color: "black", //'#172B4D',
  }),
  input: (prop) => ({
    ...prop,
    color: "#ffff",
    height: 30,
    minHeight: 30,
  }),

  indicatorsContainer: (prop) => ({
    ...prop,
    height: 30,
    minHeight: 30,
  }),
  valueContainer: (prop) => ({
    ...prop,
    height: 30,
    minHeight: 30,
  }),

  menuPortal: (base) => ({ ...base, zIndex: 9999, top: base.top - 5 }),
};

const Users = (props) => {
  const navigate  = useNavigate ();
  const location = useLocation();
  const id = location.state?.id;
  const [output, setOutput] = useState({
    flag: 0,
    is_allow_drilldown: 0,
    api_response_type: 0,
    status: "A",
  });

  const roleList = [
    {label: 'Super Admin', value: 'Super Admin'},
    {label: 'Admin', value: 'Admin'},
    {label: 'User', value: 'User'}
  ];

  const renderLoader = () => {
    return (
      <div className="chart h-100 w-100 example py-2">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => { 
    if (id) {
      axios
      .get(`http://localhost:8080/user/${id}`)
      .then((res) => {
          let val = res.data;
         setOutput({
          user_name: val.user_name,
          user_email: val.user_email,
          user_role: val.user_role
         })
      })
      .catch((err) => {
          console.log("ERRor", err);
      });
      } else {
        setOutput({
          status: "A",
        });
      }
  }, []);


  
  const handleSave = async(e) => {
    e.preventDefault();

    let info = { ...output };
    if (info && info.user_name && info.user_email) {
      if (id !== undefined) {        
        let body = {
            user_name: info.user_name,
            user_email: info.user_email,
            user_role: info.user_role,
        };
        await axios.put(`http://localhost:8080/user/${id}`, body, )
        .then(res => {
            if(res.data.status = "success") {
              toast.success("User details updated succesfully", {duration: 250});
              navigate(`/users`);
            }
        })
        .catch(error => {
            toast.error("Not able to update User details", {duration: 250});
        });
      } else {
        let body = {
            user_name: info.user_name,
            user_email: info.user_email,
            user_role: info.user_role,
        };
        await axios.post(`http://localhost:8080/user`, body)
        .then(res => {
            if(res.data.status = "success") {
              toast.success("User details added succesfully", {duration: 250});
              navigate(`/users`);
            }
        })
        .catch((error) => {
          if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message, {duration: 250});
          } else {
            toast.error("Not able to add User details", {duration: 250});
          } 
        });
      }
    } else {
      toast.warning("Please Enter Required Fields");
    }
  };

  return (
    <Container fluid>
      <div className="pb-2 d-flex align-items-center justify-content-between">
        <h4 className="page-title px-2">Add User Details</h4>

        <div>
          <Button
            color="info"
            className="btn-md mr-2"
            onClick={(e) => {
              navigate(`/users`);
            }}
          >
            Back
          </Button>
          <Button
            color="info"
            className="btn-md mr-2"
            onClick={(e) => handleSave(e)}
          >
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </div>

     
        <div className="px-1">
          <Card className="shadow">
            <CardBody className="p-3 custom_form col-lg-12">
              <Form>
                <div className="row pd-b-15 mg-b-15">
                  <div className="col-4">
                    <label>Name <span style={{color: "red"}}>*</span></label>
                    <input
                      value={output?.user_name ? output?.user_name : ""}
                      type="text"
                      className="form-control form-control-md"
                      placeholder="Enter User Name"
                      onChange={(event) => {
                        setOutput({
                          ...output,
                          user_name: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <label>Enter Email <span style={{color: "red"}}>*</span></label>
                    <input
                      value={output?.user_email ? output?.user_email : ""}
                      type="text"
                      className="form-control form-control-md"
                      placeholder="Enter User email"
                      onChange={(event) => {
                        setOutput({
                          ...output,
                          user_email: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <label>Role <span style={{color: "red"}}>*</span></label>
                    <Select
                      placeholder="Select User Role"
                      value={
                        roleList && output?.user_role 
                          ? roleList.filter((option) =>
                              option["value"] == output?.user_role ? output?.user_role : ""
                            )
                          :  ""
                      }
                      options={roleList ? roleList : []}
                      getOptionLabel={(option) => get(option, "label")}
                      getOptionValue={(option) => get(option, "value")}
                      onChange={(data) => {
                        setOutput({
                          ...output,
                          user_role: data.value,
                        });
                      }}
                      isOptionSelected={(option) =>
                        get(output, "user_role") === option["value"] ? true : false
                      }
                      menuPosition="fixed"
                      menuPlacement="auto"
                    />
                  </div>
                </div>
          
              </Form>
            </CardBody>
          </Card>
        </div>
      
    </Container>
  );
};

export default Users;