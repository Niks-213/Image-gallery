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
import ReactFileReader from 'react-file-reader';
import "react-toastify/dist/ReactToastify.css";

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

const FileUpload = (props) => {
  const navigate  = useNavigate ();
  const location = useLocation();
  const id = location.state?.id;
  const imagesFolder = '/images';
  const [selectedFile, setSelectedFile] = useState([]);
  const [imagePaths, setImagePaths] = useState();


  
  useEffect(() => { 
    if (id) {
        axios
        .get(`http://localhost:8080/file/${id}`)
        .then((res) => {
            let val = res.data;
           let obj = {};
           obj['fileName'] = val?.file_name;
           obj['filePath'] = val?.file_path;
           let paths = `${imagesFolder}/${val.file_name}`
           let arr = [];
           arr.push(obj);
           setSelectedFile(arr);
           setImagePaths(paths);
        })
        .catch((err) => {
            console.log("ERRor", err);
        });
      }
  }, []);

  const handleUploadFile = async (files, name) => {
    let att_files = [],
      file_names,
      dis_name,
      base64Arr = files.base64.split(",")[1];
    const Exten = files.fileList[0].name.split(".")[1];
    if (Exten == "mp4" || Exten == "ogg" || Exten == "webM") {
      toast.warn("Please upload valid file");
    } else {
      Object.values(files.fileList).forEach((file, idx) => {
        const moonLanding = new Date();
        let trimmedName = file.name.replace(/(?:\.(?![^.]+$)|[^\w.])+/g, "_");
        file_names = `${moonLanding.getMilliseconds()}_${trimmedName}`;
        dis_name = file.name;
      });
      
      let data = {};
      data[name] = file_names;
      data["dis_name"] = dis_name;
      data[`${name}_content`] = base64Arr;
      data["foldername"] = "images";
      let paths = `${imagesFolder}/${file_names}`;
      setImagePaths(paths);
      try {
        const response = await axios.post('http://localhost:8080/file/dynamic-upload', data,{
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        const data1 = response?.data.data;
        let selected_files = data1
        setSelectedFile(selected_files);
      } catch (error) {
        toast.error("There is an issue while Uploading File");
        return false;
      }
    }
  };


  
  const handleSave = async(e) => {
    e.preventDefault();
    let fileArray = selectedFile;
    let info = fileArray.map((item) => {
      return {
        file_name: item.fileName,
        file_path: item.filePath
      }
    });
    if (info && info.length > 0) {
      if (id !== undefined) {        
        let body = info[0];
        await axios.put(`http://localhost:8080/file/${id}`, body, )
        .then(res => {
            if(res.data.status = "success") {
              toast.success("File updated succesfully");
              navigate(`/files`);
            }
        })
        .catch(error => {
            toast.error("Not able to update file details");
        });
      } else {
        let body = info[0];
        await axios.post(`http://localhost:8080/file`, body)
        .then(res => {
            if(res.data.status = "success") {
              toast.success("File added succesfully");
              navigate(`/files`);
            }
        })
        .catch((error) => {
          if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message);
          } else {
            toast.error("Not able to add file details");
          } 
        });
      }
    } else {
      toast.warn("Please upload document!");
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
              navigate(`/files`);
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
                <div className="col-6 mt-1">
                      <label>File Upload <span style={{color: "red"}}>*</span></label>
                      <div className="d-flex align-items-center form-control">
                        <ReactFileReader
                          type="file"
                          className="form-control"
                          fileTypes={[
                            ".csv",
                            ".zip",
                            ".png",
                            ".jpeg",
                            ".jpg",
                            ".pdf",
                            ".xlsx",
                            ".csv",
                            ".doc",
                            ".docx",
                            ".gif",
                            ".svg",
                          ]}
                          base64={true}
                          multipleFiles={false}
                          handleFiles={(files) =>
                            handleUploadFile(files, "cust_doc")
                          }
                          id="cust_doc"
                          name="cust_doc"
                        >
                          <div>
                          <button
                            type="button"
                            className="btn btn-sm btn-light"
                          >
                            Choose File
                          </button>
                         
                        {selectedFile && selectedFile.length >0 && selectedFile.map((item) => {
                          return <>{item.fileName} <br /></>
                        })}
                     
                      </div>
                        </ReactFileReader>
                      </div>
                      
                   </div>
                </div>
                        
              </Form>
              <img
              className={`slider-image active`}
              src={imagePaths}
              alt={`Image`}
              height={600}
              style={{marginTop: "2rem"}}
            />
            </CardBody>
          </Card>
        </div>
      
    </Container>
  );
};

export default FileUpload;