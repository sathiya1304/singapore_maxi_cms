"use client";
import { Box, Typography, List, ListItemButton, FormControl, Select, InputLabel, MenuItem, Menu, Button, IconButton, Drawer, TextField, Divider, Badge, Grid, Stack, styled, Paper, Chip } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import CreateButton from "@/app/(Dashboard)/components/buttons/CreateButton";
import DateFilter from "@/app/(Dashboard)/components/buttons/DateFilter";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import ExportButton from "@/app/(Dashboard)/components/buttons/ExportButton";
import SearchFilter from "@/app/(Dashboard)/components/buttons/SearchFilter";
import Cookies from "js-cookie";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { Add, ArrowBack, Close, CloseOutlined, CloseSharp, DeleteForeverOutlined, Edit, EditOutlined, Login, MoreVertOutlined, RefreshOutlined, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";
import CDrawer from "../../components/container/CDrawer";
import GridContainer from "../../components/container/GridContainer";
import { CInput, CSelect } from "../../components/forms";
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const AccessoryMaster = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const router = useRouter();
  const privileges = useContext(PrivilegesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  // Data Toggle/Dialog State and Funtions -----
  const [openDrawer, setOpenDrawer] = useState(false);
  const [effectToggle, setEffectToggle] = useState(false);
  const [openDrawerType, setOpenDrawerType] = useState(1);
  const [open, setOpen] = useState(false);
  const [openMulitiStatus, setOpenMultistatus] = useState(false);
  const [openMulitiDelete, setOpenMultiDelete] = useState(false);
  const [dltOpen, setDltOpen] = useState(false);
  const [filtersList, setfiltersList] = useState(false);
  const [actionData, setActionData] = useState("");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [competition, setCompetition] = useState("");
  const [comptList, setComptList] = useState([]);
  const [clubName, setClubName] = useState("");


  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState(null);
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [preExp, setPreExp] = useState("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterDataId = searchParams.get("querry")


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
      setDob(formattedDate)
      setGender()
      setPreExp()
      setMobile()
      setExperience()
      setCompetition()
      setClubName()
      setPostError()

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
  const [isExpSelected, setIsExpSelected] = useState(false);
  const [isClubSelected, setIsClubSelected] = useState(false);
  const [isGenderSelected, setIsGenderSelected] = useState(false);
  const [isComptSelected, setIsComptSelected] = useState(false);
  const [orderType, setOrderType] = useState("desc");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState(3);
  const [genderFilter, setGenderFilter] = useState(3);
  const [expFilter, setExpFilter] = useState(3);
  const [clubFilter, setClubFilter] = useState(3);
  const [comptFilter, setComptFilter] = useState(filterDataId || 1);


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
  const handleCompList = (value) => {
    setComptFilter(value);
    setIsComptSelected(true);
    // handlefilterBadgeVisible(true)
  };
  // Funtion to change active status for filter
  const handleGenderFilter = (value) => {
    setGenderFilter(value);
    setIsGenderSelected(true);
    // handlefilterBadgeVisible(true)
  };
  // Funtion to change active status for filter
  const handleExpFilter = (value) => {
    setExpFilter(value);
    setIsExpSelected(true);
    // handlefilterBadgeVisible(true)
  };
  // Funtion to change active status for filter
  const handleClubFilter = (value) => {
    setClubFilter(value);
    setIsClubSelected(true);
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
    setOpenDrawerType(2);
    setOpenDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
    setStudentName(singleData.reg_stud_name);
    setClubName(singleData.club_name)
    setDob(singleData.reg_stud_dob)
    setGender(singleData.reg_gender)
    setPreExp(singleData.reg_prev_exp)
    setMobile(singleData.reg_mobile)
    setExperience(singleData.reg_skat_exp)
    setCompetition(singleData.ref_compt_id)
    setPostError()
  };

  // Funtion for create new data or edit existing data
  const handleSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,
      reg_stud_name: studentName,
      reg_gender: gender,
      reg_stud_dob: dob,
      reg_skat_exp: experience,
      reg_prev_exp: preExp,
      reg_mobile: mobile,
      ref_compt_id: competition,
      club_name: clubName
    };
    try {
      if (openDrawerType == 1) {
        axiosPost
          .post(`compt_register`, jsonData)
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
              // setIsLoading(false);
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
          .put(`compt_register`, jsonData)
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
      .delete(`compt_register`, { data: jsonData })
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
      .post(`compt_register_status`, jsonData)
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
      .post(`compt_register_status`, jsonData)
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
      .post(`compt_register_delete`, jsonData)
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

  const fetchCompList = async () => {
    setIsLoading(true);
    axiosGet
      .get(`competition_get?access_token=${ACCESS_TOKEN}`)
      .then((response) => {
        setComptList(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchCompList()
  }, [])

  const fetchData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `compt_register_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter}&reg_gender=${genderFilter === 3 ? "" : genderFilter}&reg_skat_exp=${expFilter === 3 ? "" : expFilter}&club_name=${clubFilter === 3 ? "" : clubFilter}&ref_compt_id=${comptFilter === 1 ? "" : comptFilter}`
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
    genderFilter,
    expFilter,
    clubFilter,
    comptFilter
  ]);

  const title = "Registered Students";
  const userHasActionPrivilege =
    privileges.includes("editCompetitionStudents") || privileges.includes("deleteCompetitionStudents");

  const tableHead = [
    {
      id: 1,
      label: `Student Name`,
      value: "reg_stud_name",
    },
    {
      id: 2,
      label: `Club Name`,
      value: "club_name",
    },
    {
      id: 3,
      label: `Gender`,
      value: "reg_gender",
    },
    {
      id: 4,
      label: `Competition`,
      value: "ref_compt_name",
    },
    // {
    //   id: 4,
    //   label: `Mobile`,
    //   value: "reg_mobile",
    // },
    {
      id: 5,
      label: `Level`,
      value: "reg_skat_exp",
    },
    {
      id: 6,
      label: `Prev Competition Experience`,
      value: "reg_pre_exp",
    },
    {
      id: 7,
      label: "Active Status",
      value: "active_status",
    },
    ...(userHasActionPrivilege
      ? [
        {
          id: 8,
          label: "Action",
          action: true,
          align: "center",
        },]
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
            <Typography px={2} fontSize={"14px"} textTransform={'capitalize'}>
              {item.reg_stud_name}
            </Typography>
          ),
          id: 1,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={'capitalize'}>
              {item.club_name}
            </Typography>
          ),
          id: 2,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={'capitalize'}>
              {item.reg_gender}
            </Typography>
          ),
          id: 3,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={'capitalize'}>
              {item.ref_compt_name}
            </Typography>
          ),
          id: 4,
        },
        // {
        //   comp: (
        //     <Typography px={2} fontSize={"14px"} textTransform={'capitalize'}>
        //       {item.reg_mobile}
        //     </Typography>
        //   ),
        //   id: 4,
        // },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={'capitalize'}>
              {item.reg_skat_exp}
            </Typography>
          ),
          id: 5,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} minWidth={200} paddingX={0}  dangerouslySetInnerHTML={{ __html: item.reg_prev_exp }} />
            // </Typography>

          ),
          id: 6,
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
          id: 7,
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
            id: 8,
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
    setGenderFilter(3);
    setExpFilter(3)
    setClubFilter(3)
    setDateTitle("Created date");
    setIsDateSelected(false);
    setIsStatusSelected(false);
    setIsGenderSelected(false);
    setIsExpSelected(false)
    setIsClubSelected(false)
    setIsComptSelected(false)
    setCreatedEndDate("");
    setCreatedStartDate("");
    setComptFilter(1)
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
          <InputLabel sx={{ fontSize: "14px" }} id="comp">
            {"Competition"}
          </InputLabel>
          <Select
            sx={
              isComptSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"comp"}
            labelId="comp"
            id="comp"
            value={comptFilter}
            label={"comp"}
            onChange={(e) => handleCompList(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={1}>All</MenuItem>
            {comptList?.map((item, index) => (
              <MenuItem key={index} sx={{ fontSize: "14px" }} value={item.data_uniq_id}>
                {/* <Typography px={1} fontSize={"14px"} textTransform={"capitalize"}> */}
                {item.compt_name}
                {/* </Typography> */}
              </MenuItem>
            ))}

          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
            {"Club Name"}
          </InputLabel>
          <Select
            sx={
              isClubSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"Club filter"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={clubFilter}
            label={"Club filter"}
            onChange={(e) => handleClubFilter(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"EFSA"}>
              EFSA
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"others"}>
              Others
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
            {"Experience"}
          </InputLabel>
          <Select
            sx={
              isExpSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"Experience"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={expFilter}
            label={"Experience"}
            onChange={(e) => handleExpFilter(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"beginner"}>
              Beginner
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"intermediate"}>
              Intermediate
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"advanced"}>
              Advanced
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
            {"Gender"}
          </InputLabel>
          <Select
            sx={
              isGenderSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"Gender"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genderFilter}
            label={"Gender"}
            onChange={(e) => handleGenderFilter(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"male"}>
              Male
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"female"}>
              Female
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

  // if (!privileges.includes("viewCompetitionList")) {
  //   router.push('/PermissionDenied')
  // }



  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="displey_space_between"
      >
        <CreateButton
          allowed={privileges.includes("registerCompetitionStudents")}
          heading={title}
          pagecount={dataCount}
          onAddClick={toggleDrawer(true, 1)}
        />
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
        title="Register Student"
        buttonName={openDrawerType === 1 ? "Create" : "Save"}
        onSave={handleSubmit}
      >
        <GridContainer spacing={2} justifyContent="space-around" sx={{ justifyContent: 'space-around' }}>


          <Grid item xs={4} >
            <CInput
              label="Student Name"
              value={studentName}
              name="student_name"
              onChange={(e) => setStudentName(e.target.value)}
              helperText={postError?.reg_stud_name}
              error={postError?.reg_stud_name}
            />
          </Grid>
          <Grid item xs={4} >
            <CInput
              label="D.O.B"
              value={dob}
              type={"date"}
              name="dob"
              onChange={(e) => setDob(e.target.value)}
              helperText={postError?.reg_stud_dob}
              error={postError?.reg_stud_dob}
            />

          </Grid>
          <Grid item xs={4} >
            <FormControl fullWidth size="small" sx={{ minWidth: "135px" }} error={postError?.reg_gender}>
              <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label"
               >
                {"Gender"}
              </InputLabel>
              <Select
                placeholder={"Experience"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                name="reg_gender"
                label={"reg_gender"}
                onChange={(e) => setGender(e.target.value)}
                helperText={postError?.reg_gender}
                error={postError?.reg_gender}
              >
                <MenuItem sx={{ fontSize: "14px" }} value={"male"}>
                  Male
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value={"female"}>
                  Female
                </MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption" color={"red"} p={2}>
              {postError ? (
                <span>{postError?.reg_gender}</span>
              ) : (
                <span></span>
              )}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <CInput
              label="Contact"
              value={mobile}
              type={"number"}
              name="reg_mobile"
              onChange={(e) => setMobile(e.target.value)}
              helperText={postError?.reg_mobile}
              error={postError?.reg_mobile}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth size="small" sx={{ minWidth: "135px" }} error={postError?.ref_compt_id}>
              <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label"
               >
                {"Competition"}
              </InputLabel>
              <Select
                placeholder={"Competition"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={competition}
                label={"compt_name"}
                onChange={(e) => setCompetition(e.target.value)}
                helperText={postError?.ref_compt_id}
                error={postError?.ref_compt_id}
              >
                {comptList?.map((item, index) => (
                  <MenuItem key={index} sx={{ fontSize: "14px", }} value={item.data_uniq_id}>
                    {item.compt_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" color={"red"} p={2}>
              {postError ? (
                <span>{postError?.ref_compt_id}</span>
              ) : (
                <span></span>
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth size="small" sx={{ minWidth: "135px" }} error={postError?.reg_skat_exp}>
              <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label"
               >
                {"Experience"}
              </InputLabel>
              <Select

                placeholder={"Experience"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={experience}
                label={"experience"}
                onChange={(e) => setExperience(e.target.value)}
                helperText={postError?.reg_skat_exp}
                error={postError?.reg_skat_exp}
              >
                <MenuItem sx={{ fontSize: "14px" }} value={"beginner"}>
                  Beginner
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value={"intermediate"}>
                  Intermediate
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} value={"advanced"}>
                  Advanced
                </MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption" color={"red"} p={2}>
              {postError ? (
                <span>{postError?.reg_skat_exp}</span>
              ) : (
                <span></span>
              )}
            </Typography>
          </Grid>
          <Grid item xs={4} >
            <CInput
              label="Club Name"
              value={clubName}
              name="clubName"
              onChange={(e) => setClubName(e.target.value)}
              helperText={postError?.club_name}
              error={postError?.club_name}
            />

          </Grid>
        </GridContainer >
        <GridContainer
          sx={{ pb: 1 }}
        >


          <Grid item md={12}>

            <Box sx={{ pb: 2 }} >
              <Typography sx={{ fontSize: 16 }} color="#333333" gutterBottom>
                Previous Experience
              </Typography>
              <ReactQuill theme="snow" value={preExp} onChange={setPreExp} />
              <Typography variant="caption" color={"red"} p={2}>
                {postError ? (
                  <span>{postError?.reg_skat_exp}</span>
                ) : (
                  <span></span>
                )}
              </Typography>
            </Box>
          </Grid>
        </GridContainer>

      </CDrawer>


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
          {privileges.includes("editCompetitionStudents") && (
            <>
              <ListItemButton onClick={handleOpen}>
                <Typography variant="p"> Change Status</Typography>
              </ListItemButton>
              <Divider />
              {/* <ListItemButton onClick={handlePaymentO}>
            <Typography variant="p"> Make Payment</Typography>
          </ListItemButton>
          <Divider /> */}

              <ListItemButton onClick={handleClickEdit}>
                <Typography variant="p">Edit</Typography>
              </ListItemButton>
              <Divider />
            </>
          )}
          {privileges.includes("deleteCompetitionStudents") && (
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
