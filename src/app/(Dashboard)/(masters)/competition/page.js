"use client";
import { Box, Typography, List, ListItemButton, FormControl, Select, InputLabel, MenuItem, Menu, IconButton, Divider, Badge, Grid, Stack } from "@mui/material";
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
import { CloseOutlined, MoreVertOutlined, RefreshOutlined, } from "@mui/icons-material";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";
import CDrawer from "../../components/container/CDrawer";
import GridContainer from "../../components/container/GridContainer";
import { CInput } from "../../components/forms";
import { CalendarIcon } from "@mui/x-date-pickers";
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PrivilegesContext } from "@/app/PrivilegesProvider";


import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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
    const [openRegDrawer, setOpenRegDrawer] = useState(false);
    const [effectToggle, setEffectToggle] = useState(false);
    const [openDrawerType, setOpenDrawerType] = useState(1);
    const [open, setOpen] = useState(false);
    const [openMulitiStatus, setOpenMultistatus] = useState(false);
    const [openMulitiDelete, setOpenMultiDelete] = useState(false);
    const [dltOpen, setDltOpen] = useState(false);
    const [filtersList, setfiltersList] = useState(false);
    const [actionData, setActionData] = React.useState("");
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [compState, setCompState] = useState(true);


    const [compName, setCompName] = useState("");
    const [comptDate, setComptDate] = useState("");
    const [comptFees, setComptFees] = useState("");
    const [venue, setVenue] = useState("");
    const [eligibility, setEligibility] = useState("");
    const [instruction, setInstruction] = useState("");
    const [webStatus, setWebStatus] = useState("0");
    const [picture, setPicture] = useState('');
    const [pictureName, setPictureName] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [studentName, setStudentName] = useState("");
    const [dob, setDob] = useState(null);
    const [clubName, setClubName] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [experience, setExperience] = useState("");
    const [preExp, setPreExp] = useState("");
    const [competition, setCompetition] = useState("");
    // const [comptList, setComptList] = useState([]);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = (e) => {
            const base64String = reader.result.split(',')[1];
            const filename = file.name;
            const imageUrl = URL.createObjectURL(file);
            // console.log(base64String);
            setPicture(base64String);
            setPictureName(filename);
            setPictureUrl(imageUrl)
        };
    };

    const resetFileInput = () => {
        setPicture(null);
        setPictureName(null);
        setPictureUrl(null)
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


    // Toggel Reg Drawer
    const toggleRegDrawer = (newOpen, type) => () => {
        // type 1 : Create
        // type 2 : Edit
        setOpenRegDrawer(newOpen);

        if (type === 1) {
            const currentDate = new Date();
            const threeYearsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const formattedDate = formatDate(threeYearsAgo);
            setCompName()
            setComptDate(formattedDate)
            setComptFees()
            setVenue()
            setEligibility()
            setInstruction()
            setWebStatus("0")
            setPictureName()
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
    const [isWebSelected, setIsWebSelected] = useState(false);
    const [orderType, setOrderType] = useState("desc");
    const [createdStartDate, setCreatedStartDate] = useState("");
    const [createdEndDate, setCreatedEndDate] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [activeStatusFilter, setActiveStatusFilter] = useState(3);
    const [webFilter, setWebFilter] = useState(3);


    // Funtion for format date
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, "0");

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
    const handleWebChange = (value) => {
        setWebFilter(value);
        setIsWebSelected(true);
        // handlefilterBadgeVisible(true)
    };


    // Page action's state and funtions (create, Edit, Status change, Delete) ----
    const [dataUniqId, setDataUniqId] = useState("");
    const [dataStatus, setDataStatus] = useState(1);
    const [data, setData] = useState([]);
    const [singleData, setSingleData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [postError, setPostError] = useState();


    // Toggel Drawer
    const toggleDrawer = (newOpen, type) => () => {
        // type 1 : Create
        // type 2 : Edit
        setOpenDrawer(newOpen);
        setOpenDrawerType(type);

        if (type === 1) {
            const currentDate = new Date();
            const threeYearsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const formattedDate = formatDate(threeYearsAgo);
            setCompName()
            setComptDate(formattedDate)
            setComptFees()
            setVenue()
            setEligibility()
            setInstruction()
            setWebStatus("0")
            setPictureUrl()
            setPicture()
            setPictureName()
            setPostError()
        } else {
            setPictureUrl(singleData.compt_name)
            setWebStatus(singleData.web_status)
            setCompName(singleData.compt_name)
            setComptDate(singleData.compt_date)
            setComptFees(singleData.compt_fees)
            setVenue(singleData.venue)
            setEligibility(singleData.eligibility)
            setInstruction(singleData.instruction)
            setPostError()
        }
    };

    // Function for handle Edit open
    const handleClickReg = () => {

        const currentDate = new Date();
        const threeYearsAgo = new Date(currentDate.getFullYear() - 3, currentDate.getMonth(), currentDate.getDate());
        const formattedDate = formatDate(threeYearsAgo);
        setOpenRegDrawer(true);
        handleClose2();
        setDataUniqId(singleData.data_uniq_id);
        setStudentName(),
            setGender(),
            setDob(formattedDate),
            setExperience(),
            setPreExp(),
            setMobile(),
            setCompetition(singleData.data_uniq_id),
            setPostError()
        setClubName()

    };

    const handleClickView = () => {
        const filter = { querry: singleData.data_uniq_id };

        const filterString = new URLSearchParams(filter).toString();
        router.push(`/compt_registration?${filterString}`);
    };



    // Function for handle Edit open
    const handleClickEdit = () => {
        setOpenDrawerType(2);
        setOpenDrawer(true);
        handleClose2();
        setDataUniqId(singleData.data_uniq_id);
        setCompName(singleData.compt_name)
        setComptDate(singleData.compt_date)
        setComptFees(singleData.compt_fees)
        setVenue(singleData.venue)
        setEligibility(singleData.eligibility)
        setInstruction(singleData.instruction)
        setWebStatus(singleData.web_status)
        setPicture(singleData.compt_image)
        setPictureName(singleData.image_name)
        setPictureUrl(singleData.compt_image)
        // setComptDate(singleData.student_comptDate)
    };


    // Funtion for create new data or edit existing data
    const handleSubmit = () => {
        setIsLoading(true);
        const jsonData = {
            access_token: ACCESS_TOKEN,
            data_uniq_id: dataUniqId,
            compt_name: compName,
            compt_date: comptDate,
            venue: venue,
            compt_fees: comptFees,
            eligibility: eligibility,
            instruction: instruction,
            web_status: webStatus,
            compt_image: picture,
            image_name: pictureName,
        };
        try {
            if (openDrawerType == 1) {
                axiosPost
                    .post(`competition`, jsonData)
                    .then((response) => {
                        // Handle the successful POST response here
                        if (response.data.action === "success") {
                            setAlertVisible(true);
                            setAlertSeverity("success");
                            setAlertMessage(response.data.message);
                            setOpenDrawer(false);
                            setIsLoading(false);
                        } else {
                            setPostError(response.data.message);
                        }
                    })
                    .catch((error) => {
                        // Handle POST errors here
                        console.error("POST Error:", error);
                    });
            } else {
                axiosPost
                    .put(`competition`, jsonData)
                    .then((response) => {
                        // Handle the successful POST response here
                        if (response.data.action === "success") {
                            setAlertVisible(true);
                            setAlertSeverity("success");
                            setAlertMessage(response.data.message);
                            setOpenDrawer(false);
                            setIsLoading(false);
                        } else {
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
    // Funtion for create new data or edit existing data
    const handleRegSubmit = () => {
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
            club_name: clubName,
        };
        try {
            axiosPost
                .post(`compt_register`, jsonData)
                .then((response) => {
                    // Handle the successful POST response here
                    if (response.data.action === "success") {
                        setAlertVisible(true);
                        setAlertSeverity("success");
                        setAlertMessage(response.data.message);
                        setOpenRegDrawer(false);
                        setIsLoading(false);
                    } else {
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
            .delete(`competition`, { data: jsonData })
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
            .post(`competition_status`, jsonData)
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
            .post(`competition_status`, jsonData)
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
            .post(`competition_delete`, jsonData)
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
                `competition_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter}&web_status=${webFilter === 3 ? "" : webFilter}`
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
        openRegDrawer,
        effectToggle,
        activeStatusFilter,
        webFilter,
    ]);
    const title = "Competition";
    const userHasActionPrivilege =
        privileges.includes("editCompetition") || privileges.includes("deleteCompetition");

    const tableHead = [
        {
            id: 1,
            label: `Competition Details`,
            value: "compt_id",
        },
        {
            id: 5,
            label: `Eligibility`,
            value: "eligibility",
        },
        {
            id: 6,
            label: `Instruction`,
            value: "instruction",
        },
        {
            id: 7,
            label: `Fee`,
            value: "compt_fees",
        },
        {
            id: 10,
            label: "Status",
            value: "active_status",
        },
        ...(userHasActionPrivilege
            ? [{
                id: 11,
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
                        <Stack minWidth={300}>
                            <Box fontWeight={600} px={2} fontSize={"12px"}
                                sx={{ color: '#0088AB' }}
                            >

                                #   {item.compt_id}
                            </Box>
                            <Box fontWeight={700} px={2} fontSize={"14px"} textTransform={'capitalize'}>

                                {item.compt_name}
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'} px={2} pt={0.5} pb={2} fontSize={"14px"}>
                                <Box display={'flex'} gap={0.5} alignItems={'center'}>
                                    <CalendarIcon fontSize={"6px"} />
                                    {item.competition_date}
                                </Box>
                                <Box display={'flex'} gap={0.5} alignItems={'center'} textTransform={'capitalize'}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 12,
                                            width: 12,
                                        }}
                                        alt="location"
                                        src="/images/icons/location.svg"
                                    />
                                    {item.venue}
                                </Box>
                            </Box>
                        </Stack>
                    ),
                    id: 1,
                },
                {
                    comp: (
                        <Typography px={2} fontSize={"14px"} minWidth={200} paddingX={0} dangerouslySetInnerHTML={{ __html: item.eligibility }} />
                    ),
                    id: 5,
                },
                {
                    comp: (
                        <Typography px={2} fontSize={"14px"} minWidth={300} paddingX={0} dangerouslySetInnerHTML={{ __html: item.instruction }} />
                    ),
                    id: 6,
                },
                {
                    comp: (
                        <Typography px={2} fontSize={"14px"}>
                            {item.compt_fees}
                        </Typography>
                    ),
                    id: 7,
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
                    id: 10,
                },
                ...(userHasActionPrivilege
                    ? [
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
                            id: 11,
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
        setWebFilter(3);
        setDateTitle("Created date");
        setIsDateSelected(false);
        setIsStatusSelected(false);
        setIsWebSelected(false);
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

                <FormControl size="small" sx={{ minWidth: "150px" }}>
                    <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
                        {"Web Status"}
                    </InputLabel>
                    <Select
                        sx={
                            isWebSelected
                                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                                : { fontSize: "14px", height: "34px" }
                        }
                        placeholder={"Web"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={webFilter}
                        label={"Web"}
                        onChange={(e) => handleWebChange(e.target.value)}
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

    // if (!privileges.includes("viewCompetition")) {
    //   router.push('/PermissionDenied')
    // }

    return (
        <div style={{ padding: "10px" }}>
            <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="displey_space_between"
            >
                <CreateButton
                    allowed={privileges.includes("createCompetition")}
                    heading={title}
                    pagecount={dataCount}
                    onAddClick={toggleDrawer(true, 1)}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                    <SearchFilter
                        onSearchButtonClick={handleSearchInputChange}
                        searchValue={searchValue}
                    />
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
                    compState={compState}

                />
            </div>

            <CDrawer
                open={openDrawer}
                close={toggleDrawer(false)}
                openType={openDrawerType}
                title={title}
                buttonName={openDrawerType === 1 ? "Create" : "Save"}
                onSave={handleSubmit}
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
                                            width: '130px',
                                            height: '130px',
                                            border: '2px dashed #ccc',
                                            borderRadius: '6px',
                                            padding: '8px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 100,
                                                width: 100,
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
                            <Typography variant="caption" color={"red"} p={0.5}>
                                {postError ? (
                                    <span>{postError?.compt_image}</span>
                                ) : (
                                    <span></span>
                                )}
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={8} md={8} >
                        <CInput
                            label="Competition Name"
                            value={compName}
                            name="comp_name"
                            onChange={(e) => setCompName(e.target.value)}
                            helperText={postError?.compt_name}
                            error={(postError?.compt_name)}
                        />

                        <CInput
                            label="Date"
                            value={comptDate}
                            type={'date'}
                            name="comp_date"
                            onChange={(e) => setComptDate(e.target.value)}
                            helperText={postError?.comp_date}
                            error={(postError?.comp_date)}
                        />
                        <Grid item xs={12}>
                            <Stack direction={'row'} spacing={2}>
                                <CInput
                                    label="Comp Fee"
                                    value={comptFees}
                                    name="comp_fees"
                                    onChange={(e) => setComptFees(e.target.value)}
                                    helperText={postError?.compt_fees}
                                    error={(postError?.compt_fees)}
                                />

                                <CInput
                                    label="venue"
                                    value={venue}
                                    name="venue"
                                    onChange={(e) => setVenue(e.target.value)}
                                    helperText={postError?.venue}
                                    error={(postError?.venue)}
                                />
                            </Stack>
                        </Grid>

                    </Grid>
                </GridContainer >
                <GridContainer sx={{ pb: 1 }}>
                    <Grid item xs={12}>
                        <Stack justifyContent={"space-between"} spacing={2} p={1}>

                            <Box >
                                <Typography sx={{ fontSize: 16 }} color="#333333" gutterBottom>
                                    Eligibility
                                </Typography>
                                <ReactQuill theme="snow" value={eligibility} onChange={setEligibility} />
                                <Typography variant="caption" p={2} color={"red"}>
                                    {postError ? (
                                        <span>{postError?.eligibility}</span>
                                    ) : (
                                        <span></span>
                                    )}
                                </Typography>
                            </Box>
                            <Box >
                                <Typography sx={{ fontSize: 16 }} color="#333333" gutterBottom>
                                    Instruction
                                </Typography>
                                <ReactQuill theme="snow" value={instruction} onChange={setInstruction} />
                                <Typography variant="caption" p={2} color={"red"}>
                                    {postError ? (
                                        <span>{postError?.instruction}</span>
                                    ) : (
                                        <span></span>
                                    )}
                                </Typography>
                            </Box>

                        </Stack>
                    </Grid>
                    <Grid item xs={8}>
                        <Stack p={1}>
                            <Typography sx={{ fontSize: 14 }} color="#333333" gutterBottom>
                                Do you want to show this competition on Web?
                            </Typography>
                            <ToggleButtonGroup
                                value={webStatus}
                                exclusive
                                onChange={(e) => setWebStatus(e.target.value)}
                                aria-label="text alignment"
                            >
                                <ToggleButton sx={{ px: 1, py: 0.5, width: 80 }} value="1">
                                    Yes
                                </ToggleButton>
                                <ToggleButton sx={{ px: 1, py: 0.5, width: 80 }} value="0">
                                    No
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Grid>
                </GridContainer >
            </CDrawer>


            <CDrawer
                open={openRegDrawer}
                close={toggleRegDrawer(false)}
                title="Register Student"
                buttonName="Save"
                onSave={handleRegSubmit}
            >
                <GridContainer spacing={2} justifyContent="space-around" sx={{ justifyContent: 'space-around' }}>
                    <Grid item xs={4} >
                        <CInput
                            label="Student Name"
                            value={studentName}
                            name="reg_stud_name"
                            onChange={(e) => setStudentName(e.target.value)}
                            helperText={postError?.reg_stud_name || ''}
                            error={(postError?.reg_stud_name)}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <CInput
                            label="D.O.B"
                            value={dob}
                            type={"date"}
                            name="dob"
                            onChange={(e) => setDob(e.target.value)}
                            helperText={postError?.reg_stud_dob || ''}
                            error={(postError?.reg_stud_dob)}
                        />

                    </Grid>
                    <Grid item xs={4} >
                        <CInput
                            label="Club Name"
                            value={clubName}
                            name="club name"
                            onChange={(e) => setClubName(e.target.value)}
                            helperText={postError?.club_name || ''}
                            error={(postError?.club_name)}
                        />

                    </Grid>
                    <Grid item xs={4} >
                        <FormControl fullWidth size="small" sx={{ minWidth: "135px" }} error={postError?.reg_gender}>
                            <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label" >
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
                            >
                                <MenuItem sx={{ fontSize: "14px" }} value={"male"}>
                                    Male
                                </MenuItem>
                                <MenuItem sx={{ fontSize: "14px" }} value={"female"}>
                                    Female
                                </MenuItem>
                            </Select>
                            <Typography variant="caption" color={"red"} p={1}>
                                {postError ? (
                                    <span>{postError?.reg_gender}</span>
                                ) : null}
                            </Typography>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <CInput
                            label="Contact"
                            value={mobile}
                            type={"number"}
                            name="reg_mobile"
                            onChange={(e) => setMobile(e.target.value)}
                            helperText={postError?.reg_mobile || ''}
                            error={(postError?.reg_mobile)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small" sx={{ minWidth: "135px" }} disabled>
                            <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label"
                                helperText={postError?.compt_name || ''}
                                error={(postError?.compt_name)}>
                                {"Competition"}
                            </InputLabel>
                            <Select
                                placeholder={"Competition"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={competition}
                                label={"compt_name"}
                                onChange={(e) => setCompetition(e.target.value)}
                            >
                                {data?.map((item, index) => (
                                    <MenuItem key={index} sx={{ fontSize: "14px", }} value={item.data_uniq_id}>
                                        {item.compt_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small" sx={{ minWidth: "135px" }}  error={postError?.reg_skat_exp}>
                            <InputLabel sx={{ fontSize: "14px" }} id="demo-simple-select-label">
                                {"Experience"}
                            </InputLabel>
                            <Select
                                placeholder={"Experience"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={experience}
                                label={"experience"}
                                onChange={(e) => setExperience(e.target.value)}
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
                            <Typography variant="caption" color={"red"} p={1}>
                                {postError ? (
                                    <span>{postError?.reg_skat_exp}</span>
                                ) : null}
                            </Typography>
                        </FormControl>
                    </Grid>
                </GridContainer >
                <GridContainer sx={{ pb: 1 }} >
                    <Grid item md={12}>
                        <Box sx={{ pb: 2 }} >
                            <Typography sx={{ fontSize: 16 }} color="#333333" gutterBottom>
                                Previous Experience
                            </Typography>
                            <ReactQuill theme="snow" value={preExp} onChange={setPreExp} />
                            <Typography variant="caption" color={"red"} p={1}>
                                {postError ? (
                                    <span>{postError?.reg_prev_exp}</span>
                                ) : null}
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

                    {privileges.includes("editCompetition") && (
                        <>
                            <ListItemButton onClick={handleOpen}>
                                <Typography variant="p"> Change Status</Typography>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={handleClickEdit}>
                                <Typography variant="p">Edit</Typography>
                            </ListItemButton>
                            <Divider />
                        </>
                    )}
                    {privileges.includes("registerCompetitionStudents") && (
                        <>
                            <ListItemButton onClick={handleClickReg}>
                                <Typography variant="p">Register Student</Typography>
                            </ListItemButton>
                            <Divider />
                        </>
                    )}
                    {privileges.includes("viewCompetitionRegisteredStudents") && (
                        <>
                            <ListItemButton onClick={handleClickView}>
                                <Typography variant="p">View Student</Typography>
                            </ListItemButton>
                            <Divider />
                        </>
                    )}
                    {privileges.includes("deleteCompetition") && (
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
