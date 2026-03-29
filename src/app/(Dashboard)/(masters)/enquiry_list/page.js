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
  Accordion,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import CreateButton from "@/app/(Dashboard)/components/buttons/CreateButton";
import DateFilter from "@/app/(Dashboard)/components/buttons/DateFilter";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import SearchFilter from "@/app/(Dashboard)/components/buttons/SearchFilter";
import Cookies from "js-cookie";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import {
  Add,
  ArrowBack,
  Close,
  CloseOutlined,
  CloseSharp,
  DeleteForeverOutlined,
  Edit,
  EditOutlined,
  Label,
  Login,
  MoreVertOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";
import CDrawer from "../../components/container/CDrawer";
import DatePicker from "../../components/buttons/DatePicker";
import GridContainer from "../../components/container/GridContainer";
import { CInput, CSelect } from "../../components/forms";
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import { API_ENDPOINT } from "@/lib/config";

const AccessoryMaster = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const router = useRouter();
  const privileges = useContext(PrivilegesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  // Data Toggle/Dialog State and Funtions -----
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [openPayDrawer, setOpenPayDrawer] = useState(false);
  const [effectToggle, setEffectToggle] = useState(false);
  const [openDrawerType, setOpenDrawerType] = useState(1);
  const [open, setOpen] = useState(false);
  const [openApp, setOpenApp] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [openMultiApp, setopenMultiApp] = useState(false);
  const [openMulitiStatus, setOpenMultistatus] = useState(false);
  const [openMulitiDelete, setOpenMultiDelete] = useState(false);
  const [dltOpen, setDltOpen] = useState(false);
  const [filtersList, setfiltersList] = useState(false);
  const [actionData, setActionData] = useState("");
  const [actionAppData, setActionAppData] = useState("");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [openPay, setOpenPay] = useState(false);

  const [regName, setRegName] = useState("");
  const [parentName, setParentName] = useState("");
  const [dob, setDob] = useState(null);
  const [game, setGame] = useState("");
  const [team, setTeam] = useState("");
  const [age, setAge] = useState("1");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [alergic, setAlergic] = useState("");
  const [payMode, setPayMode] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [pictureName, setPictureName] = useState(null);
  const fileInputRef = useRef(null);
  const [alergychips, setAlergyChips] = useState([]);
  const [regFeeDate, setRegFeeDate] = useState("");
  const [amtCollected, setAmtCollected] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [gameType, setGameType] = useState([]);
  const [paymodeType, setPaymodeType] = useState([]);
  const [teamType, setTeamType] = useState([]);
  const [rfID, setRfID] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [textFieldClicked, setTextFieldClicked] = useState(false);
  const [payFieldClicked, setPayFieldClicked] = useState(false);

  const handleAlergy = (event) => {
    setAlergic(event.target.value);
  };

  const handleAlergyKey = (event) => {
    if (event.key === "Enter" && alergic.trim() !== "") {
      setAlergyChips([...alergychips, alergic.trim()]);
      setAlergic("");
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setAlergyChips((prevalergyChips) =>
      prevalergyChips.filter((chip) => chip !== chipToDelete)
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const base64String = reader.result.split(",")[1];
      const filename = file.name;
      const imageUrl = URL.createObjectURL(file);
      setPicture(base64String);
      setPictureName(filename);
      setPictureUrl(imageUrl);
    };
  };

  const resetFileInput = () => {
    setPicture(null);
    setPictureUrl(null);
    setPictureName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
  const toggleViewDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenViewDrawer(newOpen);
    setOpenDrawerType(type);
  };
  // Toggel Drawer
  const togglePayDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenPayDrawer(newOpen);
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
      const threeYearsAgo = new Date(
        currentDate.getFullYear() - 3,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const formattedDate = formatDate(threeYearsAgo);
      setRegName();
      setParentName();
      setDob(formattedDate);
      setPictureUrl();
      setGame();
      setTeam();
      setAge("3");
      setBloodGroup();
      setMobile();
      setEmail();
      setAadhar();
      setAlergyChips([]);
      setPicture();
      setPictureName();
      setPayMode();
      setAmtCollected();
      setCollectedBy();
      setPostError();
    }
  };

  // Open Status change warning box
  const handleOpen = () => {
    setOpen(true);
    handleClose2();
  };

  const handleClose = () => {
    setOpen(false);
    setOpenApp(false);
    handleClose2();
  };
  // Open Status change warning box
  const handleAppOpen = (status) => {
    setSelectedStatus(status);
    setOpenApp(true);
    handleClose2();
  };

  const handleAppClose = () => {
    setOpenApp(false);
    handleClose2();
    setopenMultiApp(false);
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
  // opne multi status waring
  const handleMultiAppChange = (event) => {
    setActionAppData(event.target.value);
    setopenMultiApp(true);
  };

  // Pagination State and Funtions -----
  const [pageCount, setPageCount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [limitEnd, setlimitEnd] = useState("10");
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
  const [isApprovalSelected, setIsAppSelected] = useState(false);
  const [isGameSelected, setIsGameSelected] = useState(false);
  const [isTeamSelected, setIsTeamSelected] = useState(false);
  const [orderType, setOrderType] = useState("desc");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState(4);
  const [appFilter, setAppFilter] = useState(3);
  const [gameFilter, setGameFilter] = useState(1);
  const [teamFilter, setTeamFilter] = useState(1);
  const [orgFilter, setOrgFilter] = useState(0);
  const [payFilter, setPayFilter] = useState(3);
  const [chapterFilter, setChapterFilter] = useState(0);
  const [isChapterSelected, setIsChapterSelected] = useState(false);
  const [isOrgSelected, setIsOrgSelected] = useState(false);
  const [isPaySelected, setIsPaySelected] = useState(false);

  const [payData, setPayData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [orgData, setOrgData] = useState([]);

  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear() - 3,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const maxDate = new Date();

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
  // Funtion to change Approval for filter
  const handleAppFilter = (value) => {
    setAppFilter(value);
    setIsAppSelected(true);
    // handlefilterBadgeVisible(true)
  };

  const handleChapter = (value) => {
    setChapterFilter(value);
    setIsChapterSelected(true);
  };

  const handleOrg = (value) => {
    setOrgFilter(value);
    setIsOrgSelected(true);
    // handlefilterBadgeVisible(true)
  };

  const handlePayMode = (value) => {
    setPayFilter(value);
    setIsPaySelected(true);
    // handlefilterBadgeVisible(true)
  };

  const calculateAge = (dob) => {
    if (!dob) return;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
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
    setRegName(singleData.name);
    setParentName(singleData.parent_name);
    setDob(singleData.student_dob);
    setGame(singleData.game);
    setTeam(singleData.team_name);
    setAge(singleData.age);
    setBloodGroup(singleData.blood_group);
    setMobile(singleData.stud_mobile);
    setEmail(singleData.stud_email);
    setAadhar(singleData.aadhar_number);
    setPicture(singleData.stud_image);
    setPictureUrl(singleData.stud_image);
    setPictureName(singleData.image_name);
    setAlergyChips(singleData.alergic_to);
    setPayMode(singleData.pay_mode);
    setAmtCollected(singleData.amt);
    setCollectedBy(singleData.fee_collected_by);
    //setRegFeeDate(singleData.reg_fee_date)
  };

  const handleClickView = () => {
    toggleViewDrawer(true);
    // setOpenDrawerType(2);
    setOpenViewDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
  };

  const handleClickPay = () => {
    togglePayDrawer(true);
    // setOpenDrawerType(2);
    setOpenPayDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
  };

  // Funtion for create new data or edit existing data
  const handleSubmit = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,
      status: dataStatus,
      name: regName,
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
      // pay_mode: payMode,
      // amt: amtCollected,
      // fee_collected_by: collectedBy,
      // reg_fee_date: regFeeDate,
      // ref_rf_id: rfID,
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

  // Funtion for delete single data
  const handleDelete = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: singleData.data_uniq_id,
    };
    axiosPost
      .delete(`registration`, { data: jsonData })
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
      status: singleData.status === 1 ? 0 : 1,
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
  const [selectedStatus, setSelectedStatus] = useState(null);
  // Funtion for change status of single data
  const handleApprovalChange = (status) => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_ids: [singleData.data_uniq_id],
      status: status,
      // approval_status: sstatusingleData.approval_status === 1 ? 0 : 1,
    };
    axiosPost
      .post(`change_enquiry_status`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        setSelectedItems([]);
        setActionAppData("");
        setAlertMessage("Updated successfully.");
        setAlertVisible(true);
        setAlertSeverity("success");
        handleClose2();
        setOpenApp(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  // Funtion for change status of multiple data
  const handleMulitiApprovalChange = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_ids: selectedItems,
      status: actionAppData,
    };
    axiosPost
      .post(`change_enquiry_status`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        setSelectedItems([]);
        setActionData("");
        setActionAppData("");
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
  // Funtion for change status of multiple data
  const handleMulitiStatusChange = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_ids: selectedItems,
      status: actionData,
    };
    axiosPost
      .post(`registration_status`, jsonData)
      .then((response) => {
        setEffectToggle(!effectToggle);
        setSelectedItems([]);
        setActionData("");
        setActionAppData("");
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
    // fetchChapterData();
    // fetchOrgData();
    // fetchPayData();
  }, []);

  // const fetchChapterData = async () => {
  //   setIsLoading(true);
  //   axiosGet
  //     .get(`chapter_master_get?access_token=${ACCESS_TOKEN}&status=1`)
  //     .then((response) => {
  //       setChapterData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  // const fetchOrgData = async () => {
  //   setIsLoading(true);
  //   axiosGet
  //     .get(
  //       `organization_type_master_get?access_token=${ACCESS_TOKEN}&status=1`
  //     )
  //     .then((response) => {
  //       setOrgData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  // const fetchPayData = async () => {
  //   setIsLoading(true);
  //   axiosGet
  //     .get(`paymode_master_get?access_token=${ACCESS_TOKEN}&status=1`)
  //     .then((response) => {
  //       setPayData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const fetchData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `enquiry_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&order_field=${orderField}&status=${activeStatusFilter === 4 ? "" : activeStatusFilter
        }&approval_status=${appFilter === 3 ? "" : appFilter}&ref_chapter_id=${
          chapterFilter === 0 ? "" : chapterFilter
        }&ref_organization_type=${orgFilter === 0 ? "" : orgFilter}`
        // &ref_paymode_id=${payFilter === 3 ? "" : payFilter}
      )

      .then((response) => {
        if (response.data.action === "success") {
          setData(response.data.data);
          setdataCount(response.data.total_items);
          setPageCount(response.data.total_pages);
          setPageNumber(pageNumber === 0 ? 1 : pageNumber);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
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
    appFilter,
    chapterFilter,
    orgFilter,
    payFilter,
  ]);

  
  const title = "Enquiry";

  
  const tableHead = [
    {
      id: 1,
      label: `S No.`,
      value: "sno",
    },
    {
      id: 2,
      label: `Booking Id`,
      value: "booking_id",
    },
    {
      id: 3,
      label: `Name`,
      value: "name",
    },
    {
      id: 4,
      label: `Contact Number`,
      value: "contact_number",
    },
    {
      id: 5,
      label: `Model Name`,
      value: "ref_model_name",
    },
    {
      id: 6,
      label: `Pickup Location`,
      value: "pickup_loc",
    },
    {
      id: 7,
      label: `Drop Loction`,
      value: "drop_loc",
    },
    {
      id: 8,
      label: `Passengers`,
      value: "passengers",
    },
    {
      id: 9,
      label: "Status",
      value: "status",
    },
    {
      id: 10,
      label: "Action",
      action: true,
      align: "center",
    },
    // ]
    // : []),
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
              {item.s_no}
            </Typography>
          ),
          id: 1,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.booking_id}
            </Typography>
          ),
          id: 2,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.name}
            </Typography>
          ),
          id: 3,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.contact_number}
            </Typography>
          ),
          id: 4,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.ref_model_name}
            </Typography>
          ),
          id: 5,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.pickup_loc}
            </Typography>
          ),
          id: 6,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.drop_loc}
            </Typography>
          ),
          id: 7,
        },
        {
          comp: (
            <Box sx={{ px: 2 }}>
              <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
                {item.passengers}
              </Typography>
            </Box>
          ),
          id: 8,
        },
        {
          comp: (
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  bgcolor:
                    item.status === 0
                      ? "#FFE7E7" // Pending (Light Red)
                      : item.status === 1
                      ? "#E7FFEF" // Assigned (Light Green)
                      : item.status === 2
                      ? "#E0F7FA" // Completed (Light Blue)
                      : item.status === 3
                      ? "#F3E5F5" // Cancelled (Light Purple)
                      : "#FFFFFF", // Default (White or transparent for unknown)
                  color:
                    item.status === 0
                      ? "#FF4141" // Red
                      : item.status === 1
                      ? "#3D8325" // Green
                      : item.status === 2
                      ? "#0288D1" // Blue
                      : item.status === 3
                      ? "#7B1FA2" // Purple
                      : "#000000", // Default color (black for unknown)
                  width: "max-content",
                  p: 0.5,
                  m: 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography fontSize={"14px"}>
                  {item.status === 0
                    ? "Pending"
                    : item.status === 1
                    ? "Assigned"
                    : item.status === 2
                    ? "Completed"
                    : item.status === 3
                    ? "Cancelled"
                    : "Unknown"}
                </Typography>
              </Box>
            </Box>
          ),
          id: 9,
        },
        
        {
          comp: (
            <IconButton
              size="small"
              onClick={(e) => handleOnActionClick(e, item)}
              title="Click to Action"
            >
              
              <MoreVertOutlined></MoreVertOutlined>
            </IconButton>
          ),
          id: 10,
          align: "center",
        },
      ],
      json: [item],
      active: item.status,
      active_name: item.status,
    };
    td_data_set.push(array_data);
  });

  const handleRefresh = () => {
    setSearchValue("");
    setActiveStatusFilter(4);
    setAppFilter(3);
    setChapterFilter(0);
    setOrgFilter(0);
    setPayFilter(3);
    setDateTitle("Created date");
    setIsDateSelected(false);
    setIsStatusSelected(false);
    setIsAppSelected(false);
    setIsChapterSelected(false);
    setIsOrgSelected(false);
    setIsPaySelected(false);
    setCreatedEndDate("");
    setCreatedStartDate("");
    fetchData();
  };
  // Action Component
  const ActionComponent = () => {
    return (
      <>
        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
            {"Approve Status"}
          </InputLabel>
          <Select
            sx={{ fontSize: "14px" }}
            placeholder={"Approve Status"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={actionData}
            label={"Approve Status"}
            onChange={handleMultiAppChange}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={1}>
              Approve
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={0}>
              Unapprove
            </MenuItem>
          </Select>
        </FormControl>
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
      </>
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
            <MenuItem sx={{ fontSize: "14px" }} value={4}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              Cancelled
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={1}>
              Assigned
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={2}>
              Completed
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={0}>
              Pending
            </MenuItem>
          </Select>
        </FormControl>
        
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
          {title}
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
         
        </Box>
      </div>
      {/* {filtersList && ( */}
      <Collapse in={filtersList} timeout="auto" unmountOnExit>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {FilterComponent()}
        </Box>
      </Collapse>
     
      <div>
        
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

      
      <Drawer
        anchor={"right"}
        open={openViewDrawer}
        onClose={toggleViewDrawer(false)}
      >
        <Box sx={{ minWidth: "500px", p: 1, maxWidth: "600px" }}>
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
                View Enquiry Details
                
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ my: 1 }}>
              {singleData && (
                <Grid
                  container
                  spacing={1}
                  sx={{
                    width: "100%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    padding: 1,
                  }}
                >
                  
  

                  <Grid
                    container
                    spacing={1}
                    sx={{
                      padding: "4px 12px 4px 4px",
                      margin: "0 0 10px 0 !important",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Name
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {singleData.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Contact Number
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {singleData.contact_number}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Model Name
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {singleData.ref_model_name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Pickup Location
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {singleData.pickup_loc}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Drop Location
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {singleData.drop_loc}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Passengers
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{singleData.passengers}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Date
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{singleData.date}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          fontWeight={700}
                        >
                          Time
                        </Typography>
                        <Typography component={"span"}>:</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {singleData.time}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                 
                </Grid>
              )}
            </Box>
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
       
        <List sx={{ p: 0, fontSize: "14px" }}>
         
          {singleData.status === 0 && (
            <>
              <ListItemButton onClick={() => handleAppOpen(1)}>
                <Typography variant="p">Change Assigned</Typography>
              </ListItemButton>
              <Divider />
            </>
          )}
          {singleData.status === 1 && (
            <>
              <ListItemButton onClick={() => handleAppOpen(2)}>
                <Typography variant="p">Change as Completed</Typography>
              </ListItemButton>
              <Divider />
            </>
          )}
          {singleData.status !== 2 && (
            <>
              <ListItemButton onClick={() => handleAppOpen(3)}>
                <Typography variant="p">Change as Cancelled</Typography>
              </ListItemButton>
              <Divider />
            </>
          )}
          <ListItemButton onClick={handleClickView}>
            <Typography variant="p">View Details</Typography>
          </ListItemButton>
          <Divider />

  
        </List>
      </Menu>

      {openApp && (
        <AlertDialog
          onsubmit={() => handleApprovalChange(selectedStatus)} // Pass the selected status
          open={openApp}
          handleClose={handleClose}
          text={"Are you sure you want to change status?"}
        />
      )}
      <AlertDialog
        onsubmit={handleMulitiApprovalChange}
        open={openMultiApp}
        handleClose={handleAppClose}
        text={`Are you sure want to ${
          actionAppData === 0 ? "Unapprove" : "Approve"
        } ${selectedItems.length} items ? `}
      ></AlertDialog>
      <AlertDialog
        onsubmit={handleMulitiStatusChange}
        open={openMulitiStatus}
        handleClose={handleCloseMultiStatus}
        text={`Are you sure want to ${
          actionData === 0 ? "Inactive" : "Active"
        } ${selectedItems.length} items ? `}
      ></AlertDialog>

      <AlertDialog
        onsubmit={handleMulitiDelete}
        open={openMulitiDelete}
        handleClose={handleCloseMultiDelete}
        text={`Are you sure want to delete ${selectedItems.length} items ? `}
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
