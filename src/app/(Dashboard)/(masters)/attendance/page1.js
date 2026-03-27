"use client";
import { Box, Typography, List, ListItemButton, FormControl, Select, InputLabel, MenuItem, Menu, Button, IconButton, Drawer, TextField, Divider, Badge, Grid, Stack, styled, Paper, Chip, Card, CardMedia, CardActionArea, CardActions, Avatar, ToggleButtonGroup, ToggleButton, } from "@mui/material";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef } from "react";
import Collapse from "@mui/material/Collapse";
import DateFilter from "@/app/(Dashboard)/components/buttons/DateFilter";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import Cookies from "js-cookie";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { Add, ArrowBack, GridView, MoreVertOutlined, RefreshOutlined, ViewList, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";
import CDrawer from "../../components/container/CDrawer";
import GridContainer from "../../components/container/GridContainer";
import { CInput  } from "../../components/forms";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SearchFilter } from "../../components/buttons";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  // flexGrow: 1,
}));

const AccessoryMaster = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
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
  const [actionData, setActionData] = React.useState("");
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [openPresentDialog, setOpenPresentDialog] = useState(false);
  const [openAbsentDialog, setOpenAbsentDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);


  const [studentName, setStudentName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [present, setPresent] = useState("");
  const [presentData, setPresentData] = useState("");
  const [attendanceId, setAttendanceId] = useState("");
  const [absent, setAbsent] = useState("");
  const [leave, setLeave] = useState("");
  const [isGrid, setIsGrid] = useState('grid');

  const handleAlignment = (event, changeLayout) => {
    setIsGrid(changeLayout);
  };


  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

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
    if (type === 1) {
      const currentDate = new Date();
      const threeYearsAgo = new Date(currentDate.getFullYear() - 3, currentDate.getMonth(), currentDate.getDate());
      const formattedDate = formatDate(threeYearsAgo);
      setStudentName();

      // setDob(formattedDate)

    }
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
  const [orderField, setOrderField] = useState("created_date");
  const [dateTitle, setDateTitle] = useState("Created Date");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isStatusSelected, setIsStatusSelected] = useState(false);
  const [orderType, setOrderType] = useState("desc");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
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

  // Function to update searchValue when input changes
  const handleSearchInputChange = (input) => {
    setSearchValue(input);
  };

  // Funtion to change created date for filter
  const onCreatedDateChange = (data) => {
    const formattedStartDate = formatDate(data[0].startDate);
    const formattedEndDate = formatDate(data[0].endDate);
    setCreatedStartDate(formattedStartDate);
    setCreatedEndDate(formattedEndDate);
    setDateTitle(`${formattedStartDate} - ${formattedEndDate}`);
    setIsDateSelected(true);
    // handlefilterBadgeVisible(true)
  };

  // Funtion to change active status for filter
  const handleActiveStatusChange = (value) => {
    setActiveStatusFilter(value);
    setIsStatusSelected(true);
    // handlefilterBadgeVisible(true)
  };



  // Page action's state and funtions (create, Edit, Status change, Delete) ----
  const [dataUniqId, setDataUniqId] = useState("");
  const [dataStatus, setDataStatus] = useState(1);
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [postError, setPostError] = useState([]);

  // Function for handle Edit open
  const handleClickEdit = () => {
    console.log('singledata before', singleData);
    setOpenDrawerType(2);
    setOpenDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
    setStudentName(singleData.ref_student_name);
    setAttendance(singleData.attendance_date_value)
  };

  const handleClickView = () => {
    toggleViewDrawer(true);
    // setOpenDrawerType(2);
    setOpenViewDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
  };

  const handleOnDotClick = (e, data) => {
    // setPresent(data);
    console.log("anchor data", data);
    setAnchorEl1(e.currentTarget);
    setPresent(data);
    setAttendanceId(data.data_uniq_id)
    setLeave("");
    // setLeaveId(data.data_uniq_id)
    setAbsent("");
    // setAbsentId(data.data_uniq_id)
  };


  // Present 
  const handleOnPresent = (data) => {
    // setPresent(data);
    // setPresentId(data.data_uniq_id)
    console.log("attData", data);
    setOpenPresentDialog(true);
    setDataUniqId(singleData.data_uniq_id);
    setAnchorEl1(false)
  };

  const handleClosePresentDialog = () => {
    setOpenPresentDialog(false);
  };

  //Leave
  const handleOnLeave = (e, data) => {
    // setLeave(data);
    // setLeaveId(data.data_uniq_id)
    console.log("attData", data);
    setOpenLeaveDialog(true);
    setDataUniqId(singleData.data_uniq_id);
    setAnchorEl1(false)

  };

  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false);
  };

  // Absent 
  const handleOnAbsent = (e, data) => {
    // setAbsent(data);
    // setAbsentId(data.data_uniq_id)
    console.log("attData", data);
    setOpenAbsentDialog(true);
    setDataUniqId(singleData.data_uniq_id);
    setAnchorEl1(false)

  };

  const handleCloseAbsentDialog = () => {
    setOpenAbsentDialog(false);
  };

  // Funtion for create new data or edit existing data
  const onCheckInSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      // data_uniq_id: presentId,
      // checkout_time: checkout,
      checkin_time: checkin,
      attendance_date: currentDate,
      attendance_status: 0,
      attendance_type: 0,
      ref_student_id: attendanceId,
    };
    console.log("jsondata", jsonData);
    try {
      axiosPost
        .post("update_check_in", jsonData)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            // setOpenDrawer(false);
            setIsLoading(false);
            setOpenPresentDialog(false)
            fetchData()
          } else {
            setIsLoading(false);
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          // Handle POST errors here
          console.error("POST Error:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Funtion for create new data or edit existing data
  const onCheckOutSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: attendanceId,
      checkout_time: checkout,
      attendance_date: currentDate,
      attendance_type: 0,
    };
    console.log("jsondata", jsonData);
    try {
      axiosPost
        .post("update_check_out", jsonData)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            // setOpenDrawer(false);
            setIsLoading(false);
            setOpenPresentDialog(false)
            fetchData()
          } else {
            setIsLoading(false);
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          // Handle POST errors here
          console.error("POST Error:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Funtion for create new data or edit existing data
  const onAbsentSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      // data_uniq_id: presentId,
      // checkout_time: checkout,
      // checkin_time: checkin,
      attendance_date: currentDate,
      attendance_status: 1,
      attendance_type: 0,
      ref_student_id: attendanceId,
      reason_for_leave: absent,

    };
    console.log("jsondata", jsonData);
    try {
      axiosPost
        .post("update_check_in", jsonData)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            // setOpenDrawer(false);
            setIsLoading(false);
            setOpenPresentDialog(false)
            fetchData()
          } else {
            setIsLoading(false);
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          // Handle POST errors here
          console.error("POST Error:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // Funtion for create new data or edit existing data
  const onLeaveSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      // data_uniq_id: presentId,
      // checkout_time: checkout,
      // checkin_time: checkin,
      attendance_date: currentDate,
      attendance_status: 2,
      attendance_type: 0,
      ref_student_id: attendanceId,
      reason_for_leave: leave,

    };
    console.log("jsondata", jsonData);
    try {
      axiosPost
        .post("update_check_in", jsonData)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            // setOpenDrawer(false);
            setIsLoading(false);
            setOpenPresentDialog(false)
            fetchData()
          } else {
            setIsLoading(false);
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          // Handle POST errors here
          console.error("POST Error:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Funtion for create new data or edit existing data
  const handleSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,

    };
    console.log("jsondata", jsonData);
    try {
      if (openDrawerType == 1) {
        axiosPost
          .post(`registration`, jsonData)
          .then((response) => {
            // Handle the successful POST response here
            if (response.data.action === "success") {
              // If response data action is 200, show the alert
              setAlertVisible(true);
              setAlertSeverity("success");
              setAlertMessage(response.data.message);
              // // Cookies.remove("uuid");
              setOpenDrawer(false);
              setIsLoading(false);
              // // You can also set a timeout to hide the alert after a certain duration
              // setTimeout(() => {
              //   setAlertVisible(false);
              // }, 3000);
              // router.back();
            } else {
              // setAlertVisible(true);
              // setAlertSeverity("error");
              setIsLoading(false);
              // setAlertMessage(response.data.message);
              setPostError(response.data.message);
            }
          })
          .catch((error) => {
            // Handle POST errors here
            console.error("POST Error:", error);
          });
      } else {
        axiosPost
          .put(`registration`, jsonData)
          .then((response) => {
            // Handle the successful POST response here
            if (response.data.action === "success") {
              // If response data action is 200, show the alert
              setAlertVisible(true);
              setAlertSeverity("success");
              setAlertMessage(response.data.message);
              // // Cookies.remove("uuid");
              setOpenDrawer(false);
              setIsLoading(false);
            } else {
              // setAlertVisible(true);
              // setAlertSeverity("error");
              // setIsLoading(false);
              // setAlertMessage(response.data.message);
              setPostError(response.data.message);
            }
          })
          .catch((error) => {
            // Handle POST errors here
            setIsLoading(false);
            console.error("POST Error:", error);
          });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Funtion for delete single data
  const handleDelete = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: singleData.data_uniq_id,
    };
    axiosPost
      .post(`attendance_delete`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        handleClose2();
        setAlertMessage("Deleted successfully.");
        setAlertVisible(true);
        setAlertSeverity("success");
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  // Funtion for change status of single data
  const handleStatusChange = () => {
    setIsLoading(true);
    const jsonData = {

      access_token: ACCESS_TOKEN,
      data_ids: [singleData.data_uniq_id],
      active_status: singleData.active_status === 1 ? 0 : 1,
    };
    axiosPost
      .post(`attendance_status`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        setSelectedItems([]);
        setActionData("");
        setAlertMessage("Updated successfully.");
        setAlertVisible(true);
        setAlertSeverity("success");
        handleClose2();
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  // Funtion for change status of multiple data
  const handleMulitiStatusChange = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_ids: selectedItems,
      active_status: actionData,
    };
    axiosPost
      .post(`attendance_status`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        setSelectedItems([]);
        setActionData("");
        setIsLoading(false);
        setAlertMessage("Updated successfully.");
        setAlertVisible(true);
        setAlertSeverity("success");
        handleClose2();
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  // Funtion for delete multiple data
  const handleMulitiDelete = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_ids: selectedItems,
    };
    axiosPost
      .post(`attendance_delete`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        setSelectedItems([]);
        setActionData("");
        setAlertMessage("Deleted successfully.");
        setAlertVisible(true);
        setAlertSeverity("success");
        handleClose2();
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };



  const fetchData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `attendance_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter}&approval_status=${1}`
      )

      .then((response) => {
        console.log(response.data.data, 'attendance app');
        setData(response.data.data);
        setdataCount(response.data.total_items);
        setPageCount(response.data.total_pages);
        setPageNumber(pageNumber === 0 ? 1 : pageNumber);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    ACCESS_TOKEN,
    pageNumber,
    limitEnd,
    searchValue,
    createdStartDate,
    createdEndDate,
    orderField,
    orderType,
    openDrawer,
    effectToggle,
    activeStatusFilter,
  ]);

  // useEffect(() => {
  //   fetchData();
  // }, [handlePaySubmit]);


  const title = "Attendance";

  const tableHead = [
    {
      id: 1,
      label: `Student Name`,
      value: "ref_student_name",
    },
    // {
    //   id: 2,
    //   label: `Date`,
    //   value: "attendance_date_value",
    // },
    // {
    //   id: 3,
    //   label: `checkin`,
    //   value: "checkin_time",
    // },
    // {
    //   id: 3,
    //   label: `checkout`,
    //   value: "checkout_time_value",
    // },
    {
      id: 4,
      label: `Reason`,
      value: "reason_for_leave",
    },
    // {
    //   id: 5,
    //   label: `Email`,
    //   value: "stud_email",
    // },
    // {
    //   id: 6,
    //   label: `Game`,
    //   value: "game_name_value",
    // },
    // {
    //   id: 7,
    //   label: `Team`,
    //   value: "team_name_value",
    // },
    // {
    //   id: 8,
    //   label: `Age`,
    //   value: "age",
    // },
    // {
    //   id: 9,
    //   label: `Blood Group`,
    //   value: "blood_group",
    // },
    {
      id: 10,
      label: "Attendance Status",
      value: "attendance_status",
    },
    // {
    //   id: 11,
    //   label: "Status",
    //   value: "active_status",
    // },
    {
      id: 12,
      label: "Action",
      action: true,
      align: "center",
    },
  ];

  const handleOnActionClick = (e, data) => {
    setSingleData(data);
    setAnchorEl2(e.currentTarget);
  };
  const td_data_set = [];

  data?.map((item, index) => {
    const array_data = {
      id: item.data_uniq_id,
      data: [
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.stud_id}
            </Typography>
          ),
          id: 1,
        },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
        //       {item.attendance_date_value}
        //     </Typography>
        //   ),
        //   id: 2,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"}>
        //       {item.checkin_time_value}
        //     </Typography>
        //   ),
        //   id: 3,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"}>
        //       {item.checkout_time_value}
        //     </Typography>
        //   ),
        //   id: 4,
        // },
        {
          comp: (
            <Typography px={2} fontSize={"14px"}>
              {item.reason_for_leave}
            </Typography>
          ),
          id: 4,
        },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"}>
        //       {item.stud_email}
        //     </Typography>
        //   ),
        //   id: 5,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
        //       {item.game_name_value}
        //     </Typography>
        //   ),
        //   id: 6,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
        //       {item.team_name_value}
        //     </Typography>
        //   ),
        //   id: 7,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"}>
        //       {item.age}
        //     </Typography>
        //   ),
        //   id: 8,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"}>
        //       {item.blood_group}
        //     </Typography>
        //   ),
        //   id: 9,
        // },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"}>
        //       {item.formatted_created_date}
        //     </Typography>
        //   ),
        //   id: 8,
        // },
        {
          comp: (
            <Box sx={{ px: 2 }}>

              <Box
                sx={
                  item.attendance_status == 0
                    ? {
                      bgcolor: "#E7FFEF",
                      color: "#3D8325",
                      width: "max-content",
                      p: 0.5,
                      m: 0.5,
                      borderRadius: 1,
                    }
                    : item.attendance_status == 1
                      ? {
                        bgcolor: "#E7FFEF",
                        color: "#3D8325",
                        width: "max-content",
                        p: 0.5,
                        m: 0.5,
                        borderRadius: 1,
                      } : {
                        bgcolor: "#FFE7E7",
                        color: "#FF4141",
                        width: "max-content",
                        p: 0.5,
                        m: 0.5,
                        borderRadius: 1,
                      }
                }
              >
                <Typography fontSize={"14px"}>
                  {item.attendance_status == 0 ? "Present" : item.attendance_status == 1 ? "Absent" : item.attendance_status == 2 ? "Leave" : null}
                </Typography>
              </Box>
            </Box>
          ),
          id: 10,
        },
        // {
        //   comp: (
        //     <Box sx={{ px: 2 }}>
        //       <Box
        //         sx={
        //           item.active_status == 1
        //             ? {
        //               bgcolor: "#E7FFEF",
        //               color: "#3D8325",
        //               width: "max-content",
        //               p: 0.5,
        //               m: 0.5,
        //               borderRadius: 1,
        //             }
        //             : {
        //               bgcolor: "#FFE7E7",
        //               color: "#FF4141",
        //               width: "max-content",
        //               p: 0.5,
        //               m: 0.5,
        //               borderRadius: 1,
        //             }
        //         }
        //       >
        //         <Typography fontSize={"14px"}>
        //           {item.active_status == 1 ? "Active" : "Inactive"}
        //         </Typography>
        //       </Box>
        //     </Box>
        //   ),
        //   id: 11,
        // },
        {
          comp: (
            <IconButton
              size="small"
              onClick={(e) => handleOnDotClick(e, item)}
              title="Click to Action"
            >
              {/* <MoreVertIcon></MoreVertIcon> */}
              <MoreVertOutlined></MoreVertOutlined>
            </IconButton>
          ),
          id: 12,
          align: "center",
        },
      ],
      json: [item],
      active: item.active_status,
      active_name: item.status,
    };
    td_data_set.push(array_data);
  });

  const handleRefresh = () => {
    setSearchValue("");
    setActiveStatusFilter(3);
    setDateTitle("Created date");
    setIsDateSelected(false);
    setIsStatusSelected(false);
    setCreatedEndDate("");
    setCreatedStartDate("");
    fetchData();
  };

  // Action Component
  const ActionComponent = () => {
    return (
      <FormControl size="small" sx={{ minWidth: "150px" }}>
        <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
          {"Change Status"}
        </InputLabel>
        <Select
          sx={{ fontSize: "14px" }}
          placeholder={"Change Status"}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={actionData}
          label={"Change Status"}
          onChange={handleChange}
        >
          <MenuItem sx={{ fontSize: "14px" }} value={1}>
            Active
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={0}>
            Inactive
          </MenuItem>
        </Select>
      </FormControl>
    );
  };

  // Filter component
  const FilterComponent = () => {
    return (
      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 1,
        }}
      >
        <IconButton onClick={handleRefresh} size="small">
          <RefreshOutlined />
        </IconButton>

        {/* <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
            {"Status"}
          </InputLabel>
          <Select
            sx={
              isStatusSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"Status"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activeStatusFilter}
            label={"Status"}
            onChange={(e) => handleActiveStatusChange(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={1}>
              Active
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={0}>
              Inactive
            </MenuItem>
          </Select>
        </FormControl> */}
        <Box fullWidth>
          <DateFilter
            title={dateTitle}
            buttonType={1}
            onDateRangeChange={onCreatedDateChange}
            isSelected={isDateSelected}
          ></DateFilter>
        </Box>
      </Box>
    );
  };

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="displey_space_between"
      >
        <Typography
          variant="h4"
          className="nunito_font"
          color={"primary"}
          style={{
            fontSize: "18px",
            fontWeight: 700,
            px: 2,
          }}
        >
          {title} [{dataCount}]
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <SearchFilter
            onSearchButtonClick={handleSearchInputChange}
            searchValue={searchValue}
          />
          {/* <ExportButton /> */}
          <Badge
            color="secondary"
            variant="dot"
            invisible={!handlefilterBadgeVisible()}
          >
            <FilterButton
              HandleChangeFilter={HandleChangeFilter}
              filtersList={filtersList}
            />
          </Badge>
          {/* <FilterButton
            HandleChangeFilter={HandleChangeFilter}
            filtersList={filtersList}
          /> */}
        </Box>
      </div>
      {/* {filtersList && ( */}
      <Collapse in={filtersList} timeout="auto" unmountOnExit>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {FilterComponent()}
        </Box>
      </Collapse>
      {/* )} */}
      <Box display={'flex'} justifyContent={"space-between"} pt={3}>
        <span></span>
        <ToggleButtonGroup
          value={isGrid}
          exclusive
          onChange={handleAlignment}
          aria-label="div alignment"
        >
          <ToggleButton value="grid" aria-label="left div">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H13C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0H1ZM0 6C0 5.44772 0.447715 5 1 5H13C13.5523 5 14 5.44772 14 6C14 6.55228 13.5523 7 13 7H1C0.447715 7 0 6.55228 0 6ZM1 10C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H1Z" fill="currentColor"></path></svg>
          </ToggleButton>
          <ToggleButton value="table" aria-label="right div">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 1C0 0.447715 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V5C6 5.55228 5.55228 6 5 6H1C0.447715 6 0 5.55228 0 5V1ZM2 2H4V4H2V2ZM0 9C0 8.44772 0.447715 8 1 8H5C5.55228 8 6 8.44772 6 9V13C6 13.5523 5.55228 14 5 14H1C0.447715 14 0 13.5523 0 13V9ZM2 10H4V12H2V10ZM9 0C8.44772 0 8 0.447715 8 1V5C8 5.55228 8.44772 6 9 6H13C13.5523 6 14 5.55228 14 5V1C14 0.447715 13.5523 0 13 0H9ZM12 2H10V4H12V2ZM8 9C8 8.44772 8.44772 8 9 8H13C13.5523 8 14 8.44772 14 9V13C14 13.5523 13.5523 14 13 14H9C8.44772 14 8 13.5523 8 13V9ZM10 10H12V12H10V10Z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box mt={2}>
        {isGrid === 'grid' && (
          <Box p={2}>
            {/* <GridContainer spacing={1}> */}
            <Stack spacing={{ xs: 1, sm: 2, md: 3 }} direction="row" useFlexGap flexWrap="wrap">

              {data?.map((item, index) => (
                <Item key={index} sx={{ width: 250, position: 'relative' }} >
                  <IconButton
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                    size="small"
                    onClick={(e) => handleOnDotClick(e, item)}
                    title="Click to Action"
                  >
                    {/* <MoreVertIcon></MoreVertIcon> */}
                    <MoreVertOutlined></MoreVertOutlined>
                  </IconButton>
                  <Card sx={{ paddingY: 2, boxShadow: "none" }}>
                    {/* <CardActionArea> */}
                    <CardMedia
                      component="img"
                      height="140"
                      style={{ borderRadius: "160px", width: "140px", margin: "auto", }}
                      image={item.stud_image}
                      alt={item.student_name}
                    />
                    <Typography variant="h4" component="div" p={1} textTransform={'capitalize'} textAlign={"center"}>
                      {item.stud_id}
                    </Typography>
                    {/* </CardActionArea> */}
                    <CardActions>
                      <Stack direction={"row"} justifyContent={"space-around"} sx={{ width: "70%", margin: "auto" }}>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar sx={{ bgcolor: "#4CAF50", }} aria-label="recipe" >
                            P
                          </Avatar>
                          <Box sx={{ position: 'absolute', right: -5, top: -5, }} >
                            <Box sx={{ display: 'grid', placeItems: 'center', width: 20, height: 20 }}>
                              <div class="pingP" /></Box>
                          </Box>
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar sx={{ bgcolor: "#FF5722", }} aria-label="recipe" >
                            A
                          </Avatar>
                          <Box sx={{ position: 'absolute', right: -5, top: -5, }} >
                            <Box sx={{ display: 'grid', placeItems: 'center', width: 20, height: 20 }}>
                              <div class="pingA" /></Box>
                          </Box>
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar sx={{ bgcolor: "#3498DB", }} aria-label="recipe" >
                            L
                          </Avatar>
                          <Box sx={{ position: 'absolute', right: -5, top: -5, }} >
                            <Box sx={{ display: 'grid', placeItems: 'center', width: 20, height: 20 }}>
                              <div class="pingL" /></Box>
                          </Box>
                        </Box>


                        {/* <Avatar sx={{ bgcolor: "#FF5722" }} aria-label="recipe" >
                          A
                        </Avatar>
                        <Avatar sx={{ bgcolor: "#3498DB" }} aria-label="recipe" >
                          L
                        </Avatar> */}
                      </Stack>
                    </CardActions>
                  </Card>
                </Item>
              ))}
            </Stack>
            {/* </GridContainer> */}
          </Box>
        )}
        {isGrid === 'table' && (
          <div>
            {/* {isLoading ? (
             <SkeletonTable numColumns={tableHead.length} />
           ) : ( */}
            <MasterTable
              pageCount={pageCount}
              tableHead={tableHead}
              onPageChange={handlePageChange}
              tableRow={td_data_set}
              order={orderType}
              orderBy={orderField}
              setOrder={setOrderType}
              setOrderBy={setOrderField}
              ActionComponent={ActionComponent}
              setSelected={setSelectedItems}
              selected={selectedItems}
              onDelete={() => setOpenMultiDelete(true)}
            />
            {/* )} */}
          </div>
        )}
      </Box>





      <CDrawer
        open={openDrawer}
        close={toggleDrawer(false)}
        openType={openDrawerType}
        title={title}
        buttonName={openDrawerType === 1 ? "Create" : "Save"}
        onSave={handleSubmit}
        sx={{ maxWidth: "300px" }}
      >

        <GridContainer
          sx={{ pb: 1 }}
        >
          <Grid item xs={4} md={4}>
            <CInput
              label="Name"
              value={studentName}
              name="ref_student_name"
              onChange={(e) => setStudentName(e.target.value)}
              helperText={postError?.ref_student_name}
              error={postError?.ref_student_name}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <CInput
              label="Attendance"
              value={attendance}
              type={"date"}
              name="attendance_date_value"
              onChange={(e) => setEmail(e.target.value)}
              helperText={postError?.attendance_date_value}
              error={postError?.attendance_date_value}
            />
          </Grid>
          {/* <Grid item xs={4} md={4}>
            <CInput
              label="Checkin"
              value={checkIn}
              // type={"email"}
              name="checkin_time_value"
              onChange={(e) => setEmail(e.target.value)}
              helperText={postError?.checkin_time_value}
              error={postError?.checkin_time_value}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <CInput
              label="CheckOut"
              value={checkOut}
              // type={"email"}
              name="checkout_time_value"
              onChange={(e) => setEmail(e.target.value)}
              helperText={postError?.checkout_time_value}
              error={postError?.checkout_time_value}
            />
          </Grid> */}
        </GridContainer>
      </CDrawer>

      <Drawer anchor={"right"} open={openViewDrawer} onClose={toggleViewDrawer(false)}>
        <Box sx={{ minWidth: "400px", p: 1, maxWidth: "700px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={toggleViewDrawer(false)} size="small">
                <ArrowBack style={{ color: "black" }} />
              </IconButton>
              <Typography
                variant="h4"
                className="nunito_font"
                color={"primary"}
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                History of {title}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ my: 1 }}>
              {singleData && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 400,
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"}>
                      Full Name :
                    </Typography>
                    <Typography variant="body" align="left" width={1} sx={{ textTransform: 'capitalize' }}>
                      {singleData.student_name}
                    </Typography>
                  </Box>
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"}>
                      Parent Name :
                    </Typography>
                    <Typography variant="body" align="left" width={1} sx={{ textTransform: 'capitalize' }}>
                      {singleData.parent_name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>


      <Menu
        id="msgs-menu"
        anchorEl={anchorEl1}
        keepMounted
        open={Boolean(anchorEl1)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: 0 }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "100px",
            // p: 0,
            // pt: 0,
            boxShadow: "0px 4px 7px 0px #00000024 !important",
          },
        }}
      >
        {/* {row.menu} */}
        <List sx={{ p: 0, fontSize: "14px" }}>

          {present?.attendance_status === 3 ? (
            <>
              {present?.checkin_status == 0 ?
                <ListItemButton onClick={() => handleOnPresent()}>
                  <Typography variant="p">Check In</Typography>
                </ListItemButton>
                :
                <ListItemButton onClick={() => handleOnPresent()}>
                  <Typography variant="p">Check Out</Typography>
                </ListItemButton>
              }
              <Divider />
              <ListItemButton onClick={() => handleOnAbsent()}>
                <Typography variant="p">Mark Absent</Typography>
              </ListItemButton>
              <Divider />
              <ListItemButton onClick={() => handleOnLeave()}>
                <Typography variant="p">Mark Leave</Typography>
              </ListItemButton>
            </>
          ) : present?.attendance_status === 0 ? (
            <>
              {present?.checkin_status == 0 ?
                <ListItemButton onClick={() => handleOnPresent()}>
                  <Typography variant="p">Check In</Typography>
                </ListItemButton>
                :
                <ListItemButton onClick={() => handleOnPresent()}>
                  <Typography variant="p">Check Out</Typography>
                </ListItemButton>
              }
            </>
          ) : present?.attendance_status === 1 ? (
            <>
              <ListItemButton onClick={() => handleOnAbsent()}>
                <Typography variant="p">Mark Absent</Typography>
              </ListItemButton>
              <Divider />
            </>

          ) : present?.attendance_status === 2 ? (
            <>
              <ListItemButton onClick={() => handleOnLeave()}>
                <Typography variant="p">Mark Leave</Typography>
              </ListItemButton>
            </>
          ) : null}

          <Divider />
          <ListItemButton onClick={handleClickView}>
            <Typography variant="p">History Details</Typography>
          </ListItemButton>
        </List>
      </Menu>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: 0 }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "100px",
            // p: 0,
            // pt: 0,
            boxShadow: "0px 4px 7px 0px #00000024 !important",
          },
        }}
      >
        {/* {row.menu} */}
        <List sx={{ p: 0, fontSize: "14px" }}>
          <ListItemButton onClick={handleOpen}>
            <Typography variant="p"> Change Status</Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClickEdit}>
            <Typography variant="p">Edit</Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClickView}>
            <Typography variant="p">History</Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{
              '&:hover': {
                color: 'red',
              },
            }}
            onClick={handleDelteOpen}
          >
            <Typography variant="p">Delete</Typography>
          </ListItemButton>
        </List>
      </Menu>

      <Dialog
        open={openPresentDialog}
        onClose={handleClosePresentDialog}
      >
        <DialogTitle>Attendance</DialogTitle>
        <DialogContent sx={{ width: '400px', pb: 0 }}>
          <Stack spacing={2}>

            {present?.checkin_status == 1 ?
              <Box width={200} display={'flex'} justifyContent={"space-between"}>
                <label htmlFor="checkout">Check-out:</label>
                <input
                  type="time"
                  id="checkout"
                  name="checkout"
                  value={checkout}
                  min={checkin}
                  // max="18:00"
                  required
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </Box> :
              <Box width={200} display={'flex'} justifyContent={"space-between"}>
                <label htmlFor="checkin">Check-in:</label>
                <input
                  type="time"
                  id="checkin"
                  name="checkin"
                  value={checkin}
                  // min="09:00"
                  // max={checkout}
                  required
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </Box>
            }
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePresentDialog}>Cancel</Button>
          {present.checkin_status == 0 ?
            <Button onClick={() => onCheckInSubmit()}>Save</Button> :
            <Button onClick={() => onCheckOutSubmit()}>Save</Button>}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAbsentDialog}
        onClose={handleCloseAbsentDialog}
      >
        <DialogTitle>Absent</DialogTitle>
        <DialogContent sx={{ width: '400px', pb: 0 }}>
          <Stack spacing={2}>
            <label>
              <textarea
                rows={4}
                cols={40}
                value={absent}
                onChange={(e) => setAbsent(e.target.value)}
                placeholder="Reason for absent"
                style={{ borderRadius: 2, width: "100%" }} />
            </label>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAbsentDialog}>Cancel</Button>
          <Button onClick={() => onAbsentSubmit()}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLeaveDialog}
        onClose={handleCloseLeaveDialog}
      >
        <DialogTitle>Leave</DialogTitle>
        <DialogContent sx={{ width: '400px', pb: 0 }}>
          <Stack spacing={2}>
            <label>
              <textarea
                rows={4}
                cols={40}
                value={leave}
                onChange={(e) => setLeave(e.target.value)}
                placeholder="Reason for leave"
                style={{ borderRadius: 2, width: "100%" }} />
            </label>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLeaveDialog}>Cancel</Button>
          <Button onClick={() => onLeaveSubmit()}>Save</Button>
        </DialogActions>
      </Dialog>

      <AlertDialog
        onsubmit={handleDelete}
        open={dltOpen}
        handleClose={handleCloseDlt}
        text={"Are you sure want to Delete?"}
      ></AlertDialog>
      <AlertDialog
        onsubmit={handleStatusChange}
        open={open}
        handleClose={handleClose}
        text={"Are you sure want to change status?"}
      ></AlertDialog>
      {/* <AlertDialog
        onsubmit={handleMulitiStatusChange}
        open={openMulitiStatus}
        handleClose={handleCloseMultiStatus}
        text={`Are you sure want to ${actionData === 0 ? "Inactive" : "Active"
          } ${selectedItems.length} items?`}
      ></AlertDialog> */}

      <AlertDialog
        onsubmit={handleMulitiDelete}
        open={openMulitiDelete}
        handleClose={handleCloseMultiDelete}
        text={`Are you sure want to delete ${selectedItems.length} items?`}
      ></AlertDialog>
      {/* {isAlertVisible && ( */}
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
