import React, { useState, useEffect, useRef } from "react";
import EditNote from "@mui/icons-material/EditNote";
import axios from "axios";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Card,
  CardHeader,
  InputGroup,
  Button,
  Col,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Edit2, Trash } from "react-feather";
import "react-toastify/dist/ReactToastify.css"; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BrowserRouter as Router, Route, Link, useNavigate  } from 'react-router-dom';
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";

const FileList = (props) => {
    const agGridRef = useRef();
    const navigate  = useNavigate ();
    const [fileList, setFileList] = useState([]);
    var [gridApi, setGriApi] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    var [gridColumnApi, setGridColumnApi] = useState([]);
    var [selectedFilter, setSelectedFilter] = useState("");
    const [loadingOverlay, setLoadingOverlay] = useState(
      '<span class="1ag-overlay-loading-center"><img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> Please wait while your data are loading</span>'
    );
    const [overLayNoData, setOverLayNoData] = useState(
      '<span class="1ag-overlay-loading-center"> No Rows to Show</span>'
    );
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
        getFileList();
    }, []);

    const getFileList = async() => {
      try{
        await axios.get(`http://localhost:8080/file`)
        .then((res) => {
            let val = res.data;
            setFileList(val);
        })
        .catch((err) => {
            console.log("ERRor", err);
        });
      }
      catch(e) {
          console.log('eception in update is: ',e);
      }
    }
  
    const onFirstDataRendered = (params) => {
      params.api.sizeColumnsToFit();
    };
  
    const onGridReady = (params) => {
      params.api.paginationGoToPage(0);
      setGriApi(params.api);
      setGridColumnApi(params.columnApi);
    };
  
    const handleChange = (e) => {
      agGridRef.current.api.setQuickFilter(e.target.value);
    };

    const changeFilter = (e) => {
      const { value, name } = e.target;
      setSelectedFilter(value);
      agGridRef.current.api.setQuickFilter(value);
    };
    
    const deteleProduct = (e, id) => {
      e.preventDefault();
    setDeleteProductId(id);
    setConfirmationModal(true);
    };

    const confirmDelete = () => {
      deleteMapping();
      
    };

    const deleteMapping = async() => {
      let selectedDeleteProductId = deleteProductId;
      try{
        await axios.delete(`http://localhost:8080/file/${selectedDeleteProductId}`)
        .then((res) => {
          toast.success("Deleted Successfully");
          setConfirmationModal(false);
          setDeleteProductId(null);
          getFileList();
        })
        .catch((err) => {
            console.log("ERRor", err);
        });
      }
      catch(e) {
          console.log('eception in delete is: ',e);
      }
  };

    const cancelDelete = () => {
      // If the user cancels, close the confirmation modal
      setConfirmationModal(false);
      setDeleteProductId(null);
    };
   
  
    const toggleExcelupload = () => {
      let fileName = `SD-Master-${".csv"}`;
      let excelParams = {
        fileName: fileName,
      };
  
      gridApi.exportDataAsCsv(excelParams);
    };
  
    const tableData = () => {
      const rowData = [];
      const filteredItems = fileList || [];
  
      filteredItems.length > 0 && filteredItems.map((menu, i) => {
        rowData.push({
          Sno: i + 1,
          Name: menu?.file_name,
          Path: menu?.file_path,
          id: menu?.file_id,
        });
      });
  
      const columnDefs = [];
      var x = ["Sno", "Name", "Path", "Action"];
      x.map((col) => {
        var y = {
          field: col,
          headerName: col,
          sortable: true,
          filter: true,
          resizable: true,
          tooltipField: col,
        };
        if (col == "Action") {
          y["cellRenderer"] = "DynamicComponent";
          y["cellRendererParams"] = {
            ...props,
            deteleProduct: deteleProduct,
            navigate: navigate
          };
        }
        columnDefs.push(y);
      });
  
      return (
        <AgGridReact
          ref={agGridRef}
          columnDefs={columnDefs}
          enableColResize
          domLayout="autoHeight"
          rowData={rowData}
          pagination={true}
          enableRangeSelection={true}
          enableFilter
          suppressRowClickSelection={true} 
          suppressAggFilteredOnly={false}
          suppressCellSelection={false}
          paginationPageSize={10}
          frameworkComponents={{
            DynamicComponent,
          }}
          onFirstDataRendered={onFirstDataRendered}
          onGridReady={onGridReady}
          overlayNoRowsTemplate={overLayNoData}
          overlayLoadingTemplate={loadingOverlay}
        ></AgGridReact>
      );
    };

    function DynamicComponent(props) {
      return (
        <>
          <span title="Edit">
            <Edit2
              className="align-middle mr-1"
              size={18}
              title="Edit"
              onClick={(e) => {
               navigate('/add-file',{ state: {id: props.data.id}})
              }}
            />
          </span>
          <Trash
            className="align-middle mr-1"
            size={18}
            title="Delete"
            onClick={(e) => props.deteleProduct(e, props.data.id)}
          />
        </>
      );
    }
 

  
    return (
      <Container>
        <div className="py-2 text-right">
          <Button
            variant="info"
            className="btn btn-info btn-sm"
            onClick={() => {
              navigate(`/add-file`);
            }}
          >
            + Add File
          </Button>
        </div>
  
        <div className="mb-3">
          <Card className="ag-theme-alpine p-3">
            {fileList && fileList.length > 0  ? tableData() : renderLoader()}
          </Card>
        </div>

        <ConfirmationModal
        isOpen={confirmationModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      </Container>
    );
  };

  
 

export default FileList;

