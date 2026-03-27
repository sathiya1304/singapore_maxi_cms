"use client";
import { Box, Typography, List, ListItemButton, FormControl, Select, InputLabel, MenuItem, Menu, Button, IconButton, Drawer, TextField, Divider, Badge, Grid, Stack, styled, Paper, Chip, FormHelperText } from "@mui/material";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import DateFilter from "@/app/(Dashboard)/components/buttons/DateFilter";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import Cookies from "js-cookie";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { Add, ArrowBack, Close, CloseFullscreenOutlined, CloseOutlined, CloseRounded, Edit, MoreVertOutlined, RefreshOutlined, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";
import CDrawer from "../../components/container/CDrawer";
import GridContainer from "../../components/container/GridContainer";
import { CInput } from "../../components/forms";
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import { SearchFilter } from "../../components/buttons";

const AccessoryMaster = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const privileges = useContext(PrivilegesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  // Data Toggle/Dialog State and Funtions -----
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openMetricDrawer, setOpenMetricDrawer] = useState(false);
  const [openFeeDrawer, setOpenFeeDrawer] = useState(false);
  const [effectToggle, setEffectToggle] = useState(false);
  const [openDrawerType, setOpenDrawerType] = useState(1);
  const [openMetricType, setOpenMetricType] = useState(1);
  const [open, setOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [openMulitiStatus, setOpenMultistatus] = useState(false);
  const [openMulitiDelete, setOpenMultiDelete] = useState(false);
  const [dltOpen, setDltOpen] = useState(false);
  const [filtersList, setfiltersList] = useState(false);
  const [actionData, setActionData] = React.useState("");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [metricUnidata, setMetricUnidata] = useState("");


  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [collectedOn, setCollectedOn] = useState("");
  const [payMode, setPayMode] = useState("");
  const [parentName, setParentName] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [paymodeType, setPaymodeType] = useState([]);
  const [month, setMonth] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [dob, setDob] = useState(null);
  const [game, setGame] = useState("");
  const [team, setTeam] = useState("");
  const [age, setAge] = useState("1");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [alergic, setAlergic] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [pictureName, setPictureName] = useState(null);
  const fileInputRef = useRef(null);
  const [alergychips, setAlergyChips] = useState([]);
  const [gameType, setGameType] = useState([]);
  const [metricData, setMetricData] = useState([]);
  const [showMetric, setShowMetric] = useState(false);
  const [teamType, setTeamType] = useState([]);
  const [rfID, setRfID] = useState('');
  const [rewardName, setRewardName] = useState('');
  const [rewardDate, setRewardDate] = useState('');
  const [rewardDetails, setRewardDetails] = useState('');
  const [rewardNotes, setRewardNotes] = useState('');
  const [rewardRefId, setRewardRefId] = useState('');
  const [textFieldClicked, setTextFieldClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);



  const handleAlergy = (event) => {
    setAlergic(event.target.value);
  };

  const handleAlergyKey = (event) => {
    if (event.key === 'Enter' && alergic.trim() !== '') {
      setAlergyChips([...alergychips, alergic.trim()]);
      setAlergic('');
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setAlergyChips((prevalergyChips) => prevalergyChips.filter((chip) => chip !== chipToDelete));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.onload = (e) => {
      const base64String = reader.result.split(',')[1];
      const filename = file.name;
      const imageUrl = URL.createObjectURL(file);

      setPicture(base64String);
      setPictureName(filename);
      setPictureUrl(imageUrl)
    };

  };

  const resetFileInput = () => {
    setPicture(null);
    setPictureUrl(null)
    setPictureName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


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
    setAnchorEl2(null);
  };

  // Toggel Drawer
  const toggleViewDrawer = (newOpen) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenViewDrawer(newOpen);
    // setOpenDrawerType(type);

  };

  // Toggel Drawer
  const toggleMetricDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenMetricDrawer(newOpen);
    setOpenMetricType(type);
    setIsEditClicked(false)
    setRewardDate("")
    setRewardDetails("")
    setRewardName("")
    setRewardNotes("")
    setPicture("")
    setPictureName("")
    setPictureUrl("")
    setShowMetric(false)

  };

  const closeShowMetric = () => {
    setShowMetric(false)
    setRewardDate("")
    setRewardDetails("")
    setRewardName("")
    setRewardNotes("")
    setPicture("")
    setPictureName("")
    setPictureUrl("")

  }

  // Toggel Drawer
  const toggleFeeDrawer = (newOpen) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenFeeDrawer(newOpen);
  };

  const toggleMetric = () => {
    setShowMetric(!showMetric);
    setIsEditClicked(false)
  };

  const handleOnMetricEdit = (data) => {
    setShowMetric(true);
    setMetricUnidata(data);
    if (!showMetric) {
      setRewardDate(data.reward_date)
      setRewardDetails(data.reward_details)
      setRewardName(data.reward_name)
      setRewardNotes(data.notes)
      setPicture(data.image)
      setPictureUrl(data.image_path)
      setPictureName(data.image_name)
      setIsEditClicked(true)
      setRewardRefId(data.ref_student_id)
    } else {
      setIsEditClicked(false)
      setRewardDate("")
      setRewardDetails("")
      setRewardName("")
      setRewardNotes("")
      setPicture("")
      setPictureUrl("")
      setPictureName("")

    }

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
      setParentName()
      setDob(formattedDate)
      setGame()
      setTeam()
      setAge("3")
      setBloodGroup()
      setMobile()
      setEmail()
      setAadhar()
      setAlergyChips([])
      setPicture()
      setPictureName()
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
  // Open Status change warning box
  const handleAppOpen = () => {
    setAppOpen(true);
    handleClose2();
  };

  const handleAppClose = () => {
    setAppOpen(false);
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
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [isGameSelected, setIsGameSelected] = useState(false);
  const [isTeamSelected, setIsTeamSelected] = useState(false);
  const [orderType, setOrderType] = useState("desc");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState(3);
  const [paymentFilter, setPaymentFilter] = useState(3);
  const [gameFilter, setGameFilter] = useState(1);
  const [teamFilter, setTeamFilter] = useState(1);

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

  // Funtion to change active status for filter
  const handlePaymentStatusChange = (value) => {
    setPaymentFilter(value);
    setIsPaymentSelected(true);
    // handlefilterBadgeVisible(true)
  };


  // Funtion to change active status for filter
  const handleGameType = (value) => {
    setGameFilter(value);
    setIsGameSelected(true);
    // handlefilterBadgeVisible(true)
  };
  // Funtion to change active status for filter
  const handleTeamType = (value) => {
    setTeamFilter(value);
    setIsTeamSelected(true);
    // handlefilterBadgeVisible(true)
  };

  const handleDob = (e) => {
    const selectedDate = e.target.value;
    setDob(selectedDate);
    calculateAge(selectedDate);
  };

  const calculateAge = (dob) => {
    if (!dob) return;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age.toString());
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
    setOpenDrawerType(2);
    setOpenDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
    setStudentName(singleData.student_name);
    setParentName(singleData.parent_name)
    setDob(singleData.student_dob)
    setGame(singleData.game)
    setTeam(singleData.team_name)
    setAge(singleData.age)
    setBloodGroup(singleData.blood_group)
    setMobile(singleData.stud_mobile)
    setEmail(singleData.stud_email)
    setAadhar(singleData.aadhar_number)
    setPicture(singleData.stud_image)
    setPictureUrl(singleData.stud_image)
    setPictureName(singleData.image_name)
    setAlergyChips(singleData.alergic_to)
    setPostError()
  };

  const handleClickView = () => {
    toggleViewDrawer(true);
    // setOpenDrawerType(2);
    setOpenViewDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
  };

  const handleClickMetric = () => {
    toggleMetricDrawer(true);
    // setOpenDrawerType(2);
    setOpenMetricDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
    setShowMetric()
    setRewardDate(" ")
    setPostError()
  };

  const currentDate = new Date();
  const threeYearsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const formattedDate = formatDate(threeYearsAgo);


  const handleFeeCollection = () => {
    toggleFeeDrawer(true);
    setOpenFeeDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
    setStudentId()
    setAmount()
    setCollectedBy()
    setCollectedOn(formattedDate)
    setPayMode()
    setMonth()
    setPostError()
  };

  // Funtion for create new data or edit existing data
  const handleSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,
      student_name: studentName,
      parent_name: parentName,
      student_dob: dob,
      game: game,
      team_name: team,
      age: age,
      blood_group: bloodGroup,
      stud_mobile: mobile,
      stud_email: email,
      aadhar_number: aadhar,
      stud_image: picture,
      image_name: pictureName,
      alergic_to: alergychips,
      is_web_reg: 0,
      active_status: dataStatus,
      ref_rf_id: rfID,
    };
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

  const handleSubmitMetric = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,
      ref_student_id: dataUniqId,
      reward_date: rewardDate,
      reward_details: rewardDetails,
      reward_name: rewardName,
      notes: rewardNotes,
      image: picture,
      image_name: pictureName,
    };
    try {
      axiosPost
        .post(`student_metrics`, jsonData)
        .then((response) => {
          if (response.data.action === "success") {
            fetchMetric()
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            // setOpenMetricDrawer(false);
            setIsLoading(false);
            setShowMetric(!showMetric);
            setRewardDate()
            setRewardDetails()
            setRewardName()
            setRewardNotes()
            setPicture()
            setPictureUrl()
            setPictureName()
          } else {
            setIsLoading(false);
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          console.error("POST Error:", error);
        });

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleUpdateMetric = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: metricUnidata.data_uniq_id,
      ref_student_id: dataUniqId,
      reward_date: rewardDate,
      reward_details: rewardDetails,
      reward_name: rewardName,
      notes: rewardNotes,
      image: picture,
      image_name: pictureName,
    };
    try {
      axiosPost
        .put(`student_metrics`, jsonData)
        .then((response) => {
          if (response.data.action === "success") {
            fetchMetric()
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            // setOpenMetricDrawer(false);
            setIsLoading(false);
            setShowMetric(!showMetric);
            setRewardDate()
            setRewardDetails()
            setRewardName()
            setRewardNotes()
            setPicture()
            setPictureUrl()
            setPictureName()
          } else {
            setIsLoading(false);
            setPostError(response.data.message);
          }
        })
        .catch((error) => {
          console.error("POST Error:", error);
        });

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const handleSubmitFee = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      ref_stud_id: dataUniqId,
      fee_amt: amount,
      fee_collected_by: collectedBy,
      fee_date: collectedOn,
      fee_pay_mode: payMode,
    };
    try {
      axiosPost
        .post(`fee_collection`, jsonData)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            fetchData();
            setOpenFeeDrawer(false);
            setIsLoading(false);
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


  // Funtion for delete single data
  const handleDelete = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: singleData.data_uniq_id,
    };
    axiosPost
      .post(`registration_delete`, jsonData)
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
      .post(`registration_status`, jsonData)
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
  // Funtion for change status of single data
  const handleAppChange = () => {
    setIsLoading(true);
    const jsonData = {

      access_token: ACCESS_TOKEN,
      data_uniq_id: [singleData.data_uniq_id],
      // approval_status: singleData.approval_status === 1 ? 0 : 1,
    };
    axiosPost
      .post(`update_approval`, jsonData)
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
      .post(`registration_status`, jsonData)
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
      .post(`registration_delete`, jsonData)
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
  useEffect(() => {
    // if (textFieldClicked) {
      if (textFieldClicked && typeof window !== 'undefined' && typeof document !== 'undefined') {

      const currentDate = new Date();
      const threeYearsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Subtract 3 years
      const formattedDate = formatDate(threeYearsAgo);

      // Function to format date to yyyy-MM-dd
      function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      // Function to disable dates before the Loss Date
      const disablePastDates = () => {
        const collectedInput = document.getElementById('collectedOn');
        if (collectedInput) {
          collectedInput.max = formattedDate;
        }
      };

      disablePastDates();
    }
  }, [textFieldClicked]);


  const handleTextFieldClick = () => {
    setTextFieldClicked(true);
  };

  useEffect(() => {
    fetchGameType(),
      fetchTeamType(),
      fetchMonth(),
      fetchPayMode()
  }, [])

  const fetchPayMode = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `paymode_master_get?access_token=${ACCESS_TOKEN}`
      )
      .then((response) => {
        setPaymodeType(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchMonth = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `month_master_get?access_token=${ACCESS_TOKEN}`
      )
      .then((response) => {
        setMonthData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchGameType = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `game_master_get?access_token=${ACCESS_TOKEN}`
      )
      .then((response) => {
        setGameType(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const fetchTeamType = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `team_master_get?access_token=${ACCESS_TOKEN}`
      )
      .then((response) => {
        setTeamType(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const datauniqID = singleData.data_uniq_id



  const fetchData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `registration_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter}&fee_payment_status=${paymentFilter === 3 ? "" : paymentFilter}&approval_status=${1}&game=${gameFilter === 1 ? "" : gameFilter}&team_name=${teamFilter === 1 ? "" : teamFilter}`
      )

      .then((response) => {
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
    gameFilter,
    teamFilter,
    paymentFilter
  ]);


  useEffect(() => {
    fetchMetric()
  }, [datauniqID])


  const fetchMetric = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `student_metrics_get?access_token=${ACCESS_TOKEN}&ref_student_id=${datauniqID}`
      )
      .then((response) => {
        setMetricData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const title = "Students";

  const userHasActionPrivilege =
    privileges.includes("editStudent") || privileges.includes("deleteStudent");

  const tableHead = [
    {
      id: 1,
      label: `Name`,
      value: "student_name",
    },

    {
      id: 2,
      label: `ID`,
      value: "stud_id",
    },

    {
      id: 3,
      label: `Game`,
      value: "game_name_value",
    },
    {
      id: 4,
      label: `Team`,
      value: "team_name_value",
    },
    {
      id: 5,
      label: `Payment Status`,
      value: "fee status",
    },

    {
      id: 6,
      label: "Status",
      value: "active_status",
    },
    ...(userHasActionPrivilege
      ? [{
        id: 7,
        label: "Action",
        action: true,
        align: "center",
      },
      ]
      : []),
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
              {item.student_name}
            </Typography>
          ),
          id: 1,
        },

        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.stud_id}
            </Typography>
          ),
          id: 2,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.game_name_value}
            </Typography>
          ),
          id: 3,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.team_name_value}
            </Typography>
          ),
          id: 4,
        },
        {
          comp: (
            <Box sx={{ px: 2 }}>
              <Box
                sx={
                  item.fee_payment_status == 1
                    ? {
                      bgcolor: "#E7FFEF",
                      color: "#3D8325",
                      width: "max-content",
                      p: 0.5,
                      m: 0.5,
                      borderRadius: 1,
                    }
                    : {
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
                  {item.fee_payment_status == 1 ? "Payment Done" : "Payment Pending"}
                </Typography>
              </Box>
            </Box>
          ),
          id: 5,
        },
        {
          comp: (
            <Box sx={{ px: 2 }}>
              <Box
                sx={
                  item.active_status == 1
                    ? {
                      bgcolor: "#E7FFEF",
                      color: "#3D8325",
                      width: "max-content",
                      p: 0.5,
                      m: 0.5,
                      borderRadius: 1,
                    }
                    : {
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
                  {item.active_status == 1 ? "Active" : "Inactive"}
                </Typography>
              </Box>
            </Box>
          ),
          id: 6,
        },
        ...(userHasActionPrivilege
          ? [{
            comp: (
              <IconButton
                size="small"
                onClick={(e) => handleOnActionClick(e, item)}
                title="Click to Action"
              >
                {/* <MoreVertIcon></MoreVertIcon> */}
                <MoreVertOutlined></MoreVertOutlined>
              </IconButton>
            ),
            id: 7,
            align: "center",
          },]
          : []),
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
    setPaymentFilter(3);
    setDateTitle("Created date");
    setIsDateSelected(false);
    setIsStatusSelected(false);
    setIsGameSelected(false);
    setIsTeamSelected(false);
    setIsPaymentSelected(false)
    setCreatedEndDate("");
    setCreatedStartDate("");
    setGameFilter(1)
    setTeamFilter(1)
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

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="game">
            {"Game"}
          </InputLabel>
          <Select
            sx={
              isGameSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"game"}
            labelId="game"
            id="game"
            value={gameFilter}
            label={"game"}
            onChange={(e) => handleGameType(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={1}>All</MenuItem>
            {gameType?.map((item, index) => (
              <MenuItem key={index} sx={{ fontSize: "14px", textTransform: "capitalize" }} value={item.data_uniq_id}>
                {/* <Typography px={1} fontSize={"14px"} textTransform={"capitalize"}> */}
                {item.game_name}
                {/* </Typography> */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="team">
            {"Team"}
          </InputLabel>
          <Select
            sx={
              isTeamSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"team"}
            labelId="team"
            id="team"
            value={teamFilter}
            label={"team"}
            onChange={(e) => handleTeamType(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={1}>All</MenuItem>
            {teamType?.map((item, index) => (
              <MenuItem key={index} sx={{ fontSize: "14px", textTransform: "capitalize" }} value={item.data_uniq_id}>
                {/* <Typography px={1} fontSize={"14px"} textTransform={"capitalize"}> */}
                {item.team_name}
                {/* </Typography> */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
            {"Payment Status"}
          </InputLabel>
          <Select
            sx={
              isPaymentSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"Status"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={paymentFilter}
            label={"Status"}
            onChange={(e) => handlePaymentStatusChange(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={1}>
              Paid
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={0}>
              Unpaid
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: "150px" }}>
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
        </FormControl>
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


  // if (!privileges.includes("viewApprovedStudents")) {
  //   router.push('/PermissionDenied')
  // }


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

      <CDrawer
        open={openDrawer}
        close={toggleDrawer(false)}
        openType={openDrawerType}
        title={title}
        buttonName={openDrawerType === 1 ? "Create" : "Save"}
        onSave={handleSubmit}
        sx={{ maxWidth: "300px" }}
      >
        <GridContainer spacing={2}>
          <Grid item xs={4} md={4}>
            <Stack>
              {pictureUrl ? (
                <div
                  style={{
                    width: '130px',
                    height: '130px',
                    border: '2px dashed #ccc',
                    borderRadius: '150px',
                    padding: '8px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '150px',
                    }}
                    src={pictureUrl}
                    alt={pictureName}
                  />
                  <IconButton
                    sx={{ padding: 0.5, position: 'absolute', top: '10px', right: '10px', background: '#f44336' }}
                    onClick={resetFileInput}
                  >
                    <CloseOutlined sx={{ color: '#fff' }} />
                  </IconButton>
                </div>
              ) : (
                <label htmlFor="image-upload">
                  <div
                    style={{
                      width: '130px',
                      height: '130px',
                      border: '2px dashed #ccc',
                      borderRadius: '150px',
                      padding: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 110,
                        width: 110,
                      }}
                      alt="Placeholder"
                      src="https://cdn-icons-png.freepik.com/512/146/146007.png"
                    />
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </Stack>

          </Grid>

          <Grid item xs={8} md={8} >
            <CInput
              label="Student Name"
              value={studentName}
              name="student_name"
              onChange={(e) => setStudentName(e.target.value)}
              helperText={postError?.student_name}
              error={postError?.student_name}
            />
            <CInput
              label="Parent Name"
              value={parentName}
              name="parent_name"
              onChange={(e) => setParentName(e.target.value)}
              helperText={postError?.parent_name}
              error={postError?.parent_name}
            />
            <Box display={"flex"} justifyContent={'space-between'} spacing={1} gap={1} py={0.5}>

              <CInput
                label="DOB"
                value={dob}
                onChange={handleDob}
                type={"date"}
                name="dob"
                // onChange={(e) => setDob(e.target.value)}
                helperText={postError?.student_dob}
                error={postError?.student_dob}
              />
              <CInput
                // sx={{ pb: 0 }}
                label="Age"
                value={age}
                name="age"
                type={"Number"}
                onChange={(e) => setAge(e.target.value)}
              />
            </Box>


          </Grid>
          <Grid md={12}>
            <Box display={"flex"} justifyContent={'space-between'} spacing={1} gap={1} pb={1.5} px={1}>
              <FormControl size="small" fullWidth>
                <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label"
                  helperText={postError?.blood_group}
                  error={postError?.blood_group}>
                  {"Blood Group"}
                </InputLabel>
                <Select

                  placeholder={"Blood Group"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bloodGroup}
                  label={"Blood Group"}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <MenuItem sx={{ fontSize: "14px" }} value={"A+"}>
                    A+
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"B-"}>
                    A-
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"B+"}>
                    B+
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"B-"}>
                    B-
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"AB"}>
                    AB
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"O"}>
                    O
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel sx={{ fontSize: "14px" }} id="game"
                  helperText={postError?.game}
                  error={postError?.game}>
                  {"Game"}
                </InputLabel>
                <Select
                  placeholder={"Game"}
                  labelId="game"
                  id="game"
                  value={game}
                  label={"Game"}
                  onChange={(e) => setGame(e.target.value)}
                >
                  {gameType?.map((item, index) => (
                    <MenuItem key={index} sx={{ fontSize: "14px" }} value={item.data_uniq_id}>
                      {/* {item.game_name} */}
                      <Typography fontSize={"14px"} textTransform={"capitalize"}>
                        {item.game_name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel sx={{ fontSize: "14px" }} id="game" helperText={postError?.team_name}
                  error={postError?.team_name}>
                  {"Team"}
                </InputLabel>
                <Select
                  placeholder={"Team"}
                  labelId="Team"
                  id="Team"
                  value={team}
                  label={"Team"}
                  onChange={(e) => setTeam(e.target.value)}
                >
                  {teamType?.map((item, index) => (
                    <MenuItem key={index} sx={{ fontSize: "14px" }} value={item.data_uniq_id}>
                      {/* {item.team_name} */}
                      <Typography fontSize={"14px"} textTransform={"capitalize"}>
                        {item.team_name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Box>
          </Grid>
        </GridContainer >
        <GridContainer
          sx={{ pb: 1 }}
        >
          <Grid item xs={4} md={4}>
            <CInput
              label="Mobile"
              value={mobile}
              type={"number"}
              name="stud_mobile"
              onChange={(e) => setMobile(e.target.value)}
              helperText={postError?.stud_mobile}
              error={postError?.stud_mobile}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <CInput
              label="Email"
              value={email}
              type={"email"}
              name="stud_email"
              onChange={(e) => setEmail(e.target.value)}
              helperText={postError?.stud_email}
              error={postError?.stud_email}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <CInput
              label="Aadhar Number"
              value={aadhar}
              type={"number"}
              name="aadhar_number"
              onChange={(e) => setAadhar(e.target.value)}
              helperText={postError?.aadhar_number}
              error={postError?.aadhar_number}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              sx={{ height: "auto" }}
              label="Alergic to"
              value={alergic}
              onChange={handleAlergy}
              onKeyPress={handleAlergyKey}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleAlergyKey({ key: 'Enter' })}>
                    <Add />
                  </IconButton>
                ),
              }}
              helperText={postError?.alergic_to}
              error={postError?.alergic_to}
            />
            <div style={{ marginTop: '10px' }}>
              {alergychips?.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip}
                  onDelete={() => handleDeleteChip(chip)}
                  deleteIcon={<Close />}
                  style={{ margin: '5px' }}
                />
              ))}
            </div>
          </Grid>

        </GridContainer>
      </CDrawer>

      <Drawer anchor={"right"} open={openViewDrawer} onClose={toggleViewDrawer(false)}>
        <Box sx={{ pb: 1, width: "400px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 1,
              px: 1,
              zIndex: 9,
              top: "0px",
              backgroundColor: "white",
              position: "sticky",
              borderBottom: "1px solid #3636363b",
            }}
          >
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
                View details for {singleData.student_name}
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
                  {singleData.stud_image ? <div
                    style={{
                      width: '130px',
                      height: '130px',
                      border: '2px dashed #ccc',
                      borderRadius: '10px',
                      padding: '4px',
                      textAlign: 'center',
                      position: 'relative',
                      margin: "0 auto 10px"
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '6px',
                      }}
                      src={singleData.stud_image}
                      alt={pictureName}
                    />

                  </div> : null}
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Student Name
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1} sx={{ textTransform: 'capitalize' }}>
                      {singleData.student_name}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Parent Name
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1} sx={{ textTransform: 'capitalize' }}>
                      {singleData.parent_name}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Mobile
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1}>
                      {singleData.stud_mobile}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >

                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Email
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1}>
                      {singleData.stud_email}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Date of Birth
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1}>
                      {singleData.student_dob_value}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Age
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1}>
                      {singleData.age} years
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <Typography variant="body1" width={"177px"} py={0.5} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Alergic to
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                      {singleData?.alergic_to?.map((allergy, index) => (
                        <li style={{ listStyle: 'none', }} key={index}>{allergy}</li>
                      ))}
                      {/* {singleData.alergic_to} */}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Game
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                      {singleData.game_name_value}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Team
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                      {singleData.team_name_value}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />

                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Payment
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1}>
                      {singleData.payment_status == 1 ? `Payment Received` : "Payment Pending"}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Mode of pay
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                      {singleData.pay_mode_value}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Payed Amount
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" width={1}>
                      {singleData.amt}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      Received by
                      <span>:</span>
                    </Typography>
                    <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                      {singleData.fee_collected_by}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />


                  {/* <Box
    px={2}
    fontSize={"14px"}
    display={"flex"}
    gap={1.5}
    padding={0.5}
    justifyContent={"space-between"}
    alignItems={"center"}
  >
    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
      Payment Mode
      <span>:</span>
    </Typography>
    <Typography variant="body" align="left" width={1}>
      {singleData.pay_mode_value}
    </Typography>
  </Box>
  <Divider sx={{ my: 0.5 }} />
  <Box
    px={2}
    fontSize={"14px"}
    display={"flex"}
    gap={1.5}
    padding={0.5}
    justifyContent={"space-between"}
    alignItems={"center"}
  >
    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
      Fee Collected by
      <span>:</span>
    </Typography>
    <Typography variant="body" align="left" width={1}>
      {singleData.fee_collected_by}
    </Typography>
  </Box>
  <Divider sx={{ my: 0.5 }} />
  <Box
    px={2}
    fontSize={"14px"}
    display={"flex"}
    gap={1.5}
    padding={0.5}
    justifyContent={"space-between"}
    alignItems={"center"}
  >
    <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
      Payment Date
      <span>:</span>
    </Typography>
    <Typography variant="body" align="left" width={1}>
      {singleData.reg_fee_date_value}
    </Typography>
  </Box>
  <Divider sx={{ my: 0.5 }} /> */}
                  {singleData.approval_date ?
                    <>
                      <Box
                        px={2}
                        fontSize={"14px"}
                        display={"flex"}
                        gap={1.5}
                        padding={0.5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                          Approved Date
                          <span>:</span>
                        </Typography>
                        <Typography variant="body" align="left" width={1}>
                          {singleData.approval_date}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 0.5 }} />
                    </>
                    : null}

                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor={"right"} open={openMetricDrawer} onClose={toggleMetricDrawer(false)}>
        <Box sx={{ width: "500px", pb: 1, }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              zIndex: 9,
              top: "0px",
              backgroundColor: "white",
              position: "sticky",
              borderBottom: "1px solid #3636363b",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={toggleMetricDrawer(false)} size="small">
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
                Metric Details for {singleData.student_name}
              </Typography>
            </Box>

            {showMetric ?
              <Box display={"flex"} gap={1} >

                {isEditClicked ?
                  <>

                    <Button onClick={handleUpdateMetric} variant="contained">Update
                    </Button>
                  </>
                  :
                  <Button onClick={handleSubmitMetric} variant="contained">Save
                  </Button>
                }
              </Box>
              :
              <>
                {privileges.includes("createMetrics") && (

                  <Button onClick={toggleMetric} variant="contained">
                    Add Metric
                  </Button>
                )}
              </>}
          </Box>
          <Box sx={{ p: 1, px: 2, my: 1 }}>
            {showMetric && (
              <>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                  <span></span>
                  <Button onClick={closeShowMetric} sx={{ color: "#FF0000", }}  >
                    <CloseRounded />
                  </Button>
                </Box>
                <GridContainer spacing={2}>
                  <Grid item md={12}>
                    <CInput
                      label="Competition / Reward Name"
                      value={rewardName}
                      onChange={(e) => setRewardName(e.target.value)}
                      helperText={postError?.reward_name}
                      error={postError?.reward_name}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CInput
                      sx={{ height: "auto" }}
                      label="Date"
                      type={"date"}
                      value={rewardDate}
                      onChange={(e) => setRewardDate(e.target.value)}
                      helperText={postError?.reward_date}
                      error={postError?.reward_date}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CInput
                      label="Competition / Reward Notes"
                      value={rewardNotes}
                      onChange={(e) => setRewardNotes(e.target.value || '')}
                      helperText={postError?.notes}
                      error={postError?.notes}
                    />
                  </Grid>
                  <Grid item md={12} paddingBottom={1}>
                    <TextField fullWidth
                      label="Competition / Reward Details"
                      value={rewardDetails}
                      onChange={(e) => setRewardDetails(e.target.value)}
                      helperText={postError?.reward_details}
                      error={postError?.reward_details}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} pb={1}>
                    <Stack >
                      {pictureUrl ? (
                        <div
                          style={{
                            height: '250px',
                            border: '2px dashed #ccc',
                            borderRadius: '6px',
                            padding: '8px',
                            textAlign: 'center',
                            position: 'relative',
                          }}
                        >
                          <img
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '6px',
                            }}
                            src={pictureUrl}
                            alt={pictureName}
                          />
                          <IconButton
                            sx={{ padding: 0.5, position: 'absolute', top: '10px', right: '10px', background: '#f44336' }}
                            onClick={resetFileInput}
                          >
                            <CloseOutlined sx={{ color: '#fff' }} />
                          </IconButton>
                        </div>
                      ) : (
                        <label htmlFor="image-upload">
                          <div
                            style={{
                              background: '#F8F8F8',
                              height: '250px',
                              border: '2px dashed #ccc',
                              borderRadius: '6px',
                              padding: '8px',
                              textAlign: 'center',
                              display: 'grid',
                              placeItems: 'center'
                            }}
                          >
                            <Typography sx={{ color: '#333' }}>Upload image here</Typography>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </label>
                      )}

                    </Stack>
                  </Grid>
                </GridContainer>
              </>
            )}
            {metricData && metricData.length !== 0 ? (
              <>
                {metricData?.map((item, index) => (
                  <Box key={index} display={"flex"} gap={2}>
                    <GridContainer position="relative">

                      <Box sx={{ p: 1, position: "relative", width: "100%" }}>
                        <Typography
                          variant="h4"
                          className="nunito_font"
                          // color={"primary"}
                          style={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "start",
                            gap: "6px"
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, pt: 0.5 }}>
                            Name </Typography> : {item.reward_name}({item.reward_date_value})

                        </Typography>

                        {item.notes ?
                          <Typography
                            variant="h4"
                            className="nunito_font"
                            // color={"primary"}
                            style={{
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "start",
                              gap: "6px"
                            }}
                          >
                            <Typography sx={{ fontWeight: 700, pt: 0.5 }}>
                              Notes </Typography> : {item.notes}
                          </Typography>
                          : null}
                        <Typography
                          variant="h4"
                          className="nunito_font"
                          // color={"primary"}
                          style={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "start",
                            gap: "6px"
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, paddingY: 0.5 }}>
                            Details</Typography> : {item.reward_details}
                        </Typography>

                        {privileges.includes("editMetrics") && (
                          <>
                            {!showMetric ?
                              <IconButton
                                sx={{ padding: 0.5, position: 'absolute', top: '10px', right: '10px', }}
                                onClick={() => handleOnMetricEdit(item)}
                              >
                                <Edit sx={{ color: '#0088ab' }} />
                              </IconButton> :
                              null}
                          </>
                        )}
                      </Box>


                      {item.image_path ?

                        <Grid item xs={12} md={12} pb={1}>
                          <div
                            style={{
                              // width: '150px',
                              height: '250px',
                              border: '2px dashed #ccc',
                              borderRadius: '6px',
                              padding: '4px',
                            }}
                          >
                            <img
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '6px',
                              }}
                              src={item.image_path}
                              alt={item.image_name}
                            />
                          </div>
                        </Grid> : null}
                    </GridContainer>
                  </Box>
                ))}
              </>
            )
              :
              <>No Data</>
            }
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor={"right"} open={openFeeDrawer} onClose={toggleFeeDrawer(false)}>
        <Box sx={{ width: "500px", pb: 1, }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              zIndex: 9,
              top: "0px",
              backgroundColor: "white",
              position: "sticky",
              borderBottom: "1px solid #3636363b",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={toggleFeeDrawer(false)} size="small">
                <ArrowBack style={{ color: "black" }} />
              </IconButton>
              <Typography
                variant="h4"
                className="nunito_font"
                color={"primary"}
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  display: 'flex',
                  gap: 3
                }}
              >
                Make Payment for
                <Box sx={{ textTransform: 'capitalize' }}>
                  {singleData.student_name}
                </Box>

              </Typography>
            </Box>

            <Box display={"flex"} gap={1} >
              <Button onClick={handleSubmitFee} variant="contained">
                Save
              </Button>
            </Box>

          </Box>
          <Box sx={{ p: 1, px: 2, my: 1 }}>
            <GridContainer spacing={2}>
              <Grid item md={6}>
                <CInput sx={{ pt: 1 }}
                  label="Amount"
                  value={amount}
                  type={"number"}
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  helperText={postError?.fee_amt}
                  error={postError?.fee_amt}
                />
              </Grid>
              <Grid item md={6}>
                <CInput sx={{ pt: 1 }}
                  label="Fee Collected by"
                  value={collectedBy}
                  type={"text"}
                  name="fee_collected_by"
                  onChange={(e) => setCollectedBy(e.target.value)}
                  helperText={postError?.fee_collected_by}
                  error={postError?.fee_collected_by}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Payed On"
                  value={collectedOn}
                  onChange={(e) => setCollectedOn(e.target.value)}
                  type={"date"}
                  name="collectedOn"
                  id="collectedOn"
                  onClick={handleTextFieldClick}
                  helperText={postError?.fee_date}
                  error={postError?.fee_date}
                  sx={{ pb: 1 }}
                  inputProps={{
                    style: {
                      fontSize: "14px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "14px",
                    },
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth size="small" sx={{ minWidth: "135px", pb: 1 }} error={!!postError?.fee_pay_mode}>
                  <InputLabel sx={{ fontSize: "14px" }} error={!!postError?.fee_pay_mode}>
                    {"PayMode"}
                  </InputLabel>
                  <Select
                    placeholder={"payMode"}
                    labelId="payMode"
                    id="payMode"
                    value={payMode}
                    label={"payMode"}
                    sx={{ textTransform: "capitalize" }}
                    onChange={(e) => setPayMode(e.target.value)}
                    error={!!postError?.fee_pay_mode}
                  >
                    {paymodeType?.map((item, index) => (
                      <MenuItem key={index} sx={{ fontSize: "14px", textTransform: "capitalize" }} value={item.data_uniq_id}>
                        {item.paymode_type}
                      </MenuItem>
                    ))}
                  </Select>
                  {postError?.fee_pay_mode && (
                    <FormHelperText>{postError.fee_pay_mode}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </GridContainer >
          </Box>
        </Box>
      </Drawer>

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
          {privileges.includes("editStudent") && (
            <>
              <ListItemButton onClick={handleClickEdit}>
                <Typography variant="p">Edit Details</Typography>
              </ListItemButton>
              <Divider />
            </>
          )}
          <ListItemButton onClick={handleClickView}>
            <Typography variant="p">View Details</Typography>
          </ListItemButton>
          <Divider />
          {privileges.includes("viewMetrics") && (
            <>
              <ListItemButton onClick={handleClickMetric}>
                <Typography variant="p">View Metric</Typography>
              </ListItemButton>
              <Divider />
            </>
          )}
          {privileges.includes("createpayment") && (
            <>
              {singleData.fee_payment_status == 0 ?
                <>
                  <ListItemButton onClick={handleFeeCollection}>
                    <Typography variant="p">Make Payment</Typography>
                  </ListItemButton>
                  <Divider />
                </>
                : null}
            </>
          )}

          {privileges.includes("deleteStudent") && (
            <>
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
            </>
          )}
        </List>
      </Menu>
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
      <AlertDialog
        onsubmit={handleAppChange}
        open={appOpen}
        handleClose={handleAppClose}
        text={
          <p>
            Are you sure you want to change approval status ?
          </p>
        } ></AlertDialog>
      <AlertDialog
        onsubmit={handleMulitiStatusChange}
        open={openMulitiStatus}
        handleClose={handleCloseMultiStatus}
        text={`Are you sure want to ${actionData === 0 ? "Inactive" : "Active"
          } ${selectedItems.length} items?`}
      ></AlertDialog>

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
