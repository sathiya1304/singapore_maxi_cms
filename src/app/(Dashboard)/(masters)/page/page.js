"use client";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Menu,
  Button,
  IconButton,
  Drawer,
  TextField,
  Divider,
  Badge,
  Grid,
  Stack,
  styled,
  Paper,
  Chip,
  Card,
  CardMedia,
  CardActionArea,
  Fade,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  capitalize,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import EditButton from "@/app/(Dashboard)/components/buttons/EditButton";
import Cookies from "js-cookie";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import InputBase from '@mui/material/InputBase';
import {

  ArrowBack,
  History,
  RefreshOutlined,
} from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable"
import GridContainer from "../../components/container/GridContainer";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import CreateButton from "@/app/(Dashboard)/components/buttons/CreateButton";
import CDrawer from "../../components/container/CDrawer";
import { CInput } from "../../components/forms";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  // flexGrow: 1,
}));

const AccessoryMaster = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const privileges = useContext(PrivilegesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  setHistoryData;
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  // Data Toggle/Dialog State and Funtions -----
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [effectToggle, setEffectToggle] = useState(false);
  const [openDrawerType, setOpenDrawerType] = useState(1);
  const [open, setOpen] = useState(false);
  const [openMulitiStatus, setOpenMultistatus] = useState(false);
  const [openMulitiDelete, setOpenMultiDelete] = useState(false);
  const [dltOpen, setDltOpen] = useState(false);
  const [filtersList, setfiltersList] = useState(false);
  const [editList, seteditList] = useState(false);
  const [actionData, setActionData] = React.useState("");
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [openPresentDialog, setOpenPresentDialog] = useState(false);
  const [openAbsentDialog, setOpenAbsentDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [expanded, setExpanded] = useState(null);
  

  const [pageName, setPageName] = useState("");
  const [slugName, setSlugName] = useState("");
  const [uniqPageName, setUniqPageName] = useState("");
  const[pageId,setPageId] = useState([])
  const [attendance, setAttendance] = useState("");
  const [present, setPresent] = useState("");
  const [presentData, setPresentData] = useState([]);
  const [attendanceId, setAttendanceId] = useState("");
  const [absent, setAbsent] = useState("");
  const [dataLength, setDataLength] = useState("");
  const [limit, setLimit] = useState(1);
  const [actveStatus, setActiveStatus] = useState("");
  const [slugError,setSlugError] = useState('');
  const [tableName, setTableName] = useState("");
  const [tableDetails, settableDetails] = useState(null);


  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;

    return { currentDate, currentTime };
  };

  const { currentDate, currentTime } = getCurrentDateTime();

  const [checkin, setCheckin] = useState(currentTime);
  const [checkout, setCheckout] = useState(currentTime);

  const handlefilterBadgeVisible = () => {
    if (isStatusSelected || isDateSelected) {
      // setFilterBadgeVisible(true);
      return true;
    } else {
      // setFilterBadgeVisible(false);
      return false;
    }
  };

  // Menu component element
  const handleClose2 = () => {
    setAnchorEl1(null);
    setAnchorEl2(null);
  };

  // Toggel Drawer
  const toggleViewDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenViewDrawer(newOpen);
    setOpenDrawerType(type);
  };
  // Toggel Drawer
  const toggleDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenDrawer(newOpen);
    setOpenDrawerType(type);
  };

  // Open Status change warning box
  const handleOpen = () => {
    setOpen(true);
    handleClose2();
  };

  const handleClose = () => {
    setOpen(false);
    handleClose2();
  };

  // Close delete warning box
  const handleCloseDlt = () => {
    setDltOpen(false);
  };

  // Close multi status change warning box
  const handleCloseMultiStatus = () => {
    setOpenMultistatus(false);
  };

  // Close multi delete warning box
  const handleCloseMultiDelete = () => {
    setOpenMultiDelete(false);
  };

  // Open single delete warning box
  const handleDelteOpen = () => {
    setDltOpen(true);
  };
  const singleDataGet = (data) => {
    setSingleData(data);
  };

  // Toggel filter component
  const HandleChangeFilter = () => {
    setfiltersList(!filtersList);
  };
  const HandleChangeEdit = () => {
    seteditList(!editList);
  };

  // opne multi status waring
  const handleChange = (event) => {
    setActionData(event.target.value);
    setOpenMultistatus(true);
  };

  // Pagination State and Funtions -----
  const [pageCount, setPageCount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [limitEnd, setlimitEnd] = useState("15");
  const [dataCount, setdataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleLimitChange = (event) => {
    setlimitEnd(event.target.value);
    handleRefresh();
  };
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  // Filter/Sort State and Funtions ------
  const [orderField, setOrderField] = useState("CreatedAt");
  const [dateTitle, setDateTitle] = useState("Created Date");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isStatusSelected, setIsStatusSelected] = useState(false);
  const [isCheckInSelected, setIsCheckInSelected] = useState(false);
  const [orderType, setOrderType] = useState("DESC");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeCheckInFilter, setActiveCheckInFilter] = useState(3);
  const [activeStatusFilter, setActiveStatusFilter] = useState(3);

  // Funtion for format date
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  
  
  // Page action's state and funtions (create, Edit, Status change, Delete) ----
  const [dataUniqId, setDataUniqId] = useState("");
  const [dataStatus, setDataStatus] = useState(1);
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [postError, setPostError] = useState([]);


 



 




  const fetchData = async (
    access_token,
    limit,
    end,
    searchValue,
    createdStartDate,
    createdEndDate,
    actveStatus
  ) => {
    axiosGet
      .get(
        `pages_get?has_limit=1&access_token=${access_token}&page=${limit}&items_per_page=${end}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&active_status=${actveStatus}&order_field=${orderField}&order_type=${orderType}`
      )
      .then((response) => {
        // Handle the successful response here
        setData(response.data.data);
        setdataCount(response.data.data_count);
        setTableName(response.data.table_name);
        settableDetails(response.data.table_details);
        setPageCount(response.data.total_pages);
        setPageNumber(limit === 0 ? 1 : limit);
        // setDataUniqId(response.data.PageID)
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };


  useEffect(() => {
    // Make an API request using the globally configured axios instance (api)

    fetchData(
      ACCESS_TOKEN,
      limit,
      limitEnd,
      searchValue,
      createdStartDate,
      createdEndDate,
      actveStatus,
      orderField,
      orderType
    );
  }, [
    ACCESS_TOKEN,
    limit,
    limitEnd,
    searchValue,
    createdStartDate,
    createdEndDate,
    actveStatus,
    orderField,
    orderType,
  ]);


  const handleSubmit = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    const jsonStructure = {
      page_name: pageName,
      slug: slugName,
      unique_page_name: uniqPageName,
      page_id: pageId,
      access_token: ACCESS_TOKEN,
    };

    try {
      if (openDrawerType == 1) {
      axiosPost
        .post(`pages`, jsonStructure)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            // If response data action is 200, show the alert
          setOpenDrawer(false);
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            setPageName('')
            setSlugName('')
            setUniqPageName('')
            fetchData(
              ACCESS_TOKEN,
              limit,
              limitEnd,
              searchValue,
              createdStartDate,
              createdEndDate,
              actveStatus,
              orderField,
              orderType
            );
            // You can also set a timeout to hide the alert after a certain duration
            setTimeout(() => {
              setAlertVisible(false);
            }, 3000);
          } else {

            if (response.data.message_type === "specific") {
              setPostError(response.data.message)
            } else {
              setAlertVisible(true);
              setAlertSeverity("error");
              setAlertMessage(response.data.message);

              // You can also set a timeout to hide the alert after a certain duration
              setTimeout(() => {
                setAlertVisible(false);
              }, 3000);
            }

          }
        })
        .catch((error) => {
          // Handle POST errors here
          console.error("POST Error:", error);
        });
      }else{
        axiosPost
        .put(`pages`, jsonStructure)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            // If response data action is 200, show the alert
          setOpenDrawer(false);
            setAlertVisible(true);
            fetchData(
              ACCESS_TOKEN,
              limit,
              limitEnd,
              searchValue,
              createdStartDate,
              createdEndDate,
              actveStatus,
              orderField,
              orderType
            );
            setAlertSeverity("success");
            setAlertMessage(response.data.message);

            // You can also set a timeout to hide the alert after a certain duration
            setTimeout(() => {
              setAlertVisible(false);
            }, 3000);
          } else {

            if (response.data.message_type === "specific") {
              setPostError(response.data.message)
            } else {
              setAlertVisible(true);
              setAlertSeverity("error");
              setAlertMessage(response.data.message);

              // You can also set a timeout to hide the alert after a certain duration
              setTimeout(() => {
                setAlertVisible(false);
              }, 3000);
            }

          }
        })
        .catch((error) => {
          // Handle POST errors here
          console.error("POST Error:", error);
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleClickEdit = (item) => {
    // toggleDrawer(true, 2)
    setOpenDrawerType(2);
    setOpenDrawer(true);
    setPageId(item.PageID);
    setPageName(item.PageName)
    setSlugName(item.Slug)
    setUniqPageName(item.UniquePageName)
  }

  const handleSlugChange =(e) =>{
   const value = e.target.value;
   setSlugName(value)

   const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(value)) {
      setSlugError('Invalid link. Please enter a valid URL.');
    } else {
      setSlugError('');
    }
  }
  const title = "Page";

  const handleRefresh = () => {
    setSearchValue("");
    setActiveStatusFilter(3);
    setActiveCheckInFilter(3);
    setDateTitle("Created date");
    setIsDateSelected(false);
    setIsStatusSelected(false);
    setCreatedEndDate("");
    setCreatedStartDate("");
    fetchData();
  };


  

 ;

 



  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{ display: "flex", gap: 20 }}
        className="displey_space_between"
      >
        <CreateButton

          heading={title}

          onAddClick={toggleDrawer(true, 1)}
        />
      </div>
      {/* {filtersList && ( */}

      {/* )} */}



      <Box mt={2} p={2}>

        <Stack
          spacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
          useFlexGap
          justifyContent={"start"}
          flexWrap="wrap"
        >

          {data?.map((item, index) => {
            return (

              <Item key={index} sx={{ width: { xs: '100%', sm: '45%', md: '30%', lg: '40%' }, position: "relative", padding: 1 }}>


                <Card sx={{ py: 0.5, boxShadow: "none" }}>

                  <div style={{ display: "flex", justifyContent: 'space-between' }}
                    className="displey_space_between">
                    <Typography sx={{ fontSize: 15, fontWeight: 700, px: 2, }} color="#185AA6">
                      {item.PageName}
                    </Typography>
                     
                   
                    <Badge
                      color="secondary"
                      variant="dot"
                      invisible={!handlefilterBadgeVisible()}
                      sx={{ marginRight: 1, }}
                      onClick={()=>handleClickEdit(item)}
                    >
                      <EditButton
                        HandleChangeEdit={HandleChangeEdit}
                        editList={editList}
                      />
                    </Badge>
                  </div>
                  
                  <div style={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, px: 2 }}>
                      Slug :
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, }}>
                      {item.Slug}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, px: 2 }}>
                      Unique Page Name :
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, }}>
                      {capitalize(item.UniquePageName)}
                    </Typography>
                  </div>
                </Card>
              </Item>
            )
          })}
        </Stack>

      </Box>




      <CDrawer
        open={openDrawer}
        close={toggleDrawer(false)}
        openType={openDrawerType}
        title={title}
        buttonName={openDrawerType == 1 ? "Create" : "Update"}
        onSave={handleSubmit}
        loading={isButtonDisabled}
       
        
      >

        
        <CInput
              label="Page Name"
              value={pageName}
              name="PageName"
              onChange={(e) => setPageName(e.target.value)}
              helperText={postError?.PageName}
              error={postError?.PageName}
            />
        <CInput
              label="Slug"
              value={slugName}
                name="Slug"
                onChange={handleSlugChange}
              helperText={postError?.Slug}
              error={postError?.Slug}
            />
        <CInput
              label="Unique Page Name"
              value={uniqPageName}
              name="unique_page_name"
              onChange={(e) => setUniqPageName(e.target.value)}
              helperText={postError?.unique_page_name}
              error={postError?.unique_page_name}
            />
          
       
      </CDrawer>
    
      
      <AutoHideAlert
        severity={alertSeverity}
        message={alertMessage}
        open={isAlertVisible}
        onClose={() => {
          setAlertVisible(false);
        }}
      />
      {/* )} */}
    </div>
  );
};

export default AccessoryMaster;
