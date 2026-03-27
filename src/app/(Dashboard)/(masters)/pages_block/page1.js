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
    // Divider,
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
} from "@mui/material";
import { CloseOutlined, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import EditButton from "@/app/(Dashboard)/components/buttons/EditButton";
import ListButton from "@/app/(Dashboard)/components/buttons/ListButton";
import Cookies from "js-cookie";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { useSearchParams } from "next/navigation";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
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
import BlockButton from "../../components/buttons/BlockButton";
import ViewButton from "../../components/buttons/ViewButton";
import { id } from "date-fns/locale";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // flexGrow: 1,
}));

const AccessoryMaster = () => {
    const search = useSearchParams()
    const uuid = search.get('id')
    const ACCESS_TOKEN = Cookies.get("token");
    const privileges = useContext(PrivilegesContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);
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
    const [viewList, setViewList] = useState(false);
    const [actionData, setActionData] = React.useState("");
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
    const [openPresentDialog, setOpenPresentDialog] = useState(false);
    const [openAbsentDialog, setOpenAbsentDialog] = useState(false);
    const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
    const [expanded, setExpanded] = useState(null);

    const [pages, setPages] = useState([])
    const [pageName, setPageName] = useState([]);
    const HandleChangePageName = (event, value) => {
        console.log(value);
        console.log(event, 'event');
        setPageName(event)
    }
    const [slugName, setSlugName] = useState("");
    const [uniqPageName, setUniqPageName] = useState("");
    const [attendance, setAttendance] = useState("");
    const [present, setPresent] = useState("");
    const [presentData, setPresentData] = useState([]);
    const [attendanceId, setAttendanceId] = useState("");
    const [absent, setAbsent] = useState("");
    const [dataLength, setDataLength] = useState("");
    const [limit, setLimit] = useState(1);
    const [actveStatus, setActiveStatus] = useState("");

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [picture, setPicture] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(null);
    const [pictureName, setPictureName] = useState(null);
    const [media, setMedia] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [mediaName, setMediaName] = useState(null);
    const fileInputRef = useRef(null);
    const [blockName, setBlockName] = useState('')
    const [uniqBlockName, setUniqBlockName] = useState('')
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = (e) => {
            const base64String = reader.result.split(',')[1];
            const filename = file.name;
            const imageUrl = URL.createObjectURL(file);
            console.log(base64String);
            setPicture(base64String);
            setPictureName(filename);
            setPictureUrl(imageUrl)
        };

    };

    const resetFileInput = () => {
        setPicture(null);
        setPictureUrl(null)
        setPictureName(null);
        setBlockPath()
    };


    // Toggel Drawer
    const toggleDrawer = (newOpen, type) => () => {
        // type 1 : Create
        // type 2 : Edit
        setOpenDrawer(newOpen);
        setOpenDrawerType(type);
        setPictureUrl()
        setPicture()
        setPictureName()

    };

    const HandleChangeEdit = (value) => {
        console.log(value);
        seteditList(!editList);
        setContentValue(value.ContentType)
    };
    const [contentList, setContentList] = useState('')
    const HandleChangeList = () => {
        setContentList(!contentList);
    };
    const HandleChangeView = () => {
        setViewList(!viewList);
    };



    // Pagination State and Funtions -----
    const [pageCount, setPageCount] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [limitEnd, setlimitEnd] = useState("15");
    const [dataCount, setdataCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



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


    const [keyName, setKeyName] = useState('');
    const [uniqKeyName, setUniqKeyName] = useState('');
    const [position, SetPosition] = useState();
    const [positionValue, setPositionValue] = useState()

    // Funtion to change active status for filter



    // Page action's state and funtions (create, Edit, Status change, Delete) ----
    const [dataUniqId, setDataUniqId] = useState("");
    const [dataStatus, setDataStatus] = useState(1);
    const [data, setData] = useState([]);

    console.log(data, 'data');
    const [singleData, setSingleData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [postError, setPostError] = useState([]);
    const [sectionID, setSectionID] = useState('')
    const [sections, setsections] = useState([])
    const [blockPath, setBlockPath] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionTwo, setDescriptionTwo] = useState('')

    const [contentValue, setContentValue] = useState('')

    console.log(contentValue, 'contentValue');

    const [keyValue, setKeyValue] = useState('');
    const [textValue, setTextValue] = useState('');

    const handleChangeContent = (event, value) => {

        setContentValue(event);
        // Reset other state values if necessary
        setKeyValue('');
        setKeyValuePairs('')
        setTextValue('');
    };

    const fetchPage = async () => {
        axiosGet
            .get(
                `pages_get?access_token=${ACCESS_TOKEN}&has_limit=0&unique_keyname=${uuid}`
            )
            .then((response) => {

                // Handle the successful response here
                const data = response.data.data
                setPages(data)

            })
            .catch((error) => {
                // Handle errors here
                console.error("Error:", error);
            });
    };

    console.log(pages, 'asd3');

    useEffect(() => {
        if (uuid) {
            fetchPage();
            fetchSection();
        }

    }, [uuid]);

    const fetchSection = async () => {
        axiosGet
            .get(
                `sections_get?access_token=${ACCESS_TOKEN}&has_limit=0&page_id=${uuid}`
            )
            .then((response) => {

                // Handle the successful response here
                const data = response.data.data
                const fetchPage = response.data.page_name
                setsections(data)
                setPageName(fetchPage)
                console.log(data, 'gt5');

            })
            .catch((error) => {
                // Handle errors here
                console.error("Error:", error);
            });
    };


    const [contentBlockID, setContentBlockID] = useState('')


    const [sectionVisibility, setSectionVisibility] = useState({});

    useEffect(() => {
        // Initialize section visibility to true for all pages
        const initialVisibility = {};
        pages.forEach((page) => {
            initialVisibility[page.PageID] = true;
        });
        setSectionVisibility(initialVisibility);
    }, [pages]);

    const handleClick2 = (pageID) => {
        setSectionVisibility(prevState => ({
            ...prevState,
            [pageID]: !prevState[pageID]
        }));
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClickEdit = (item, id) => {

        toggleEditDrawer(true);
        // toggleDrawer(true, 2)
        // setOpenDrawerType(2);
        setOpenEditDrawer(true);
        setBlockName(item.BlockNames)
        setUniqBlockName(item.UniqueContentBlockName)
        setTitle(item.Title)
        setSubtitle(item.SubTitle)
        setSlugName(item.Slug)
        setPositionValue(item.Position)
        setDescription(item.Description)
        setDescriptionTwo(item.DescriptionTwo)
        setPicture(item.BlockImage)
        setPictureUrl(item.BlockImage)
        setPictureName(item.image_name)
        setBlockPath(item.BlockImagePath)
        // setSectionID(item.SectionID)
        setSelectedSectionID(id.SectionID)
        setContentBlockID(item.ContentBlockID)
    }


    const [contentItemsID,setContentItemsId] = useState('')

    const handleContentEdit = (item) => {
        console.log(item);
        toggleContentEditDrawer(true);
        setOpenContentEditDrawer(true);
        setContentType(item.ContentType)
        setPositionValue(item.Position)
        setKeyName(item.KeyName)
        setUniqKeyName(item.UniqueKeyName)
        setContentItemsId(item.ContentItemID)

    }
    const handleContent = () => {
        toggleContentDrawer(true)
        setOpenContentDrawer(true)

    }
    const handleClickView = (item) => {
        console.log(item, 'it6');
        toggleViewDrawer(true);
        setOpenViewDrawer(true)
        setDataUniqId(item.data_uniq_id);
        setSingleData(item)
    }
console.log(singleData,'yu78');

    const handleSubmit = () => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 5000);
        const jsonStructure = {
            block_name: blockName,
            unique_contentblock_name: uniqBlockName,
            slug: slugName,
            title: title,
            subtitle: subtitle,
            description: description,
            description_two: descriptionTwo,
            section_id: selectedSectionID,
            position: positionValue,
            block_image: picture,
            image_name: pictureName,
            contentblock_id: contentBlockID,
            access_token: ACCESS_TOKEN,
            items_list: [{
                content: contentValue,
                // content: contentValue,
                key_name: keyName,
                unique_keyname: uniqKeyName,
                position: positionValue,
            }]

        };
        console.log(selectedSectionID, 'iii');
        console.log("Section ID:", sectionID);
        try {

            axiosPost
                .post(`blocks `, jsonStructure)
                .then((response) => {
                    // Handle the successful POST response here
                    // console.log("POST Success:", response.data);
                    if (response.data.action === "success") {
                        // If response data action is 200, show the alert
                        setOpenDrawer(false);
                        setAlertVisible(true);
                        setAlertSeverity("success");
                        setAlertMessage(response.data.message);
                        fetchData(
                            ACCESS_TOKEN,
                            limit,
                            limitEnd,
                            searchValue,
                            createdStartDate,
                            createdEndDate,
                            actveStatus,
                            selectedSectionID
                        );
                        setShowBox(false);
                        setButtonClicked(false);
                        // You can also set a timeout to hide the alert after a certain duration
                        setTimeout(() => {
                            setAlertVisible(false);
                        }, 3000);
                        router.back();
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
        catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleContentSubmit = () => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 5000);
        const jsonStructure = {
            contenttype: contentValue,
            content: contentValue,
            key_name: keyName,
            unique_keyname: uniqKeyName,
            position: positionValue,
            content_block_id: selectedContentID,
            access_token: ACCESS_TOKEN,

        };
        console.log(contentID, 'iii');
        console.log("Section ID:", sectionID);
        try {

            axiosPost
                .post(`contentitems `, jsonStructure)
                .then((response) => {
                    // Handle the successful POST response here
                    // console.log("POST Success:", response.data);
                    if (response.data.action === "success") {
                        // If response data action is 200, show the alert
                        setOpenDrawer(false);
                        setAlertVisible(true);
                        setAlertSeverity("success");
                        setAlertMessage(response.data.message);
                        fetchData(
                            ACCESS_TOKEN,
                            limit,
                            limitEnd,
                            searchValue,
                            createdStartDate,
                            createdEndDate,
                            actveStatus,

                        );
                        setContentValue()
                        setPositionValue()
                        setKeyName()
                        setUniqKeyName()

                        setShowBox(false);
                        setOpenContentDrawer(false)
                        // You can also set a timeout to hide the alert after a certain duration
                        setTimeout(() => {
                            setAlertVisible(false);
                        }, 3000);
                        router.back();
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
        catch (error) {
            console.error("An error occurred:", error);
        }
    };


    const handleEditSubmit = () => {
        setIsLoading(true);
        const jsonData = {
            block_name: blockName,
            unique_contentblock_name: uniqBlockName,
            slug: slugName,
            title: title,
            subtitle: subtitle,
            description: description,
            description_two: descriptionTwo,
            section_id: selectedSectionID,
            position: positionValue,
            block_image: picture,
            image_name: pictureName,
            block_image_path: blockPath,
            access_token: ACCESS_TOKEN,
            contentblock_id: contentBlockID

        };
        console.log("jsondata", jsonData);
        try {
            axiosPost
                .put(`blocks`, jsonData)
                .then((response) => {
                    if (response.data.action === "success") {
                        fetchData()
                        setAlertVisible(true);
                        setAlertSeverity("success");
                        setAlertMessage(response.data.message);
                        setOpenEditDrawer(false);
                        setIsLoading(false);
                        setOpenEditDrawer(false)
                        fetchData()
                        setPicture()
                        setPictureUrl()
                        setPictureName()
                        setBlockPath()
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
    const handleContentEditSubmit = () => {
        setIsLoading(true);
        const jsonData = {
            contenttype: contentValue,
            content: contentValue,
            key_name: keyName,
            unique_keyname: uniqKeyName,
            position: positionValue,
            content_block_id: selectedContentID,
            access_token: ACCESS_TOKEN,
            contentitems_id:contentItemsID

        };
        console.log("ctt", contentItemsID);
        try {
            axiosPost
                .put(`contentitems`, jsonData)
                .then((response) => {
                    if (response.data.action === "success") {
                        fetchData()
                        setAlertVisible(true);
                        setAlertSeverity("success");
                        setAlertMessage(response.data.message);
                        setOpenEditDrawer(false);
                        setIsLoading(false);
                        setOpenEditDrawer(false)
                        fetchData()

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


    const [content, setContent] = useState([])

    console.log(content, 'content');
    const fetchData = async (
        access_token,
        limit,
        end,
        searchValue,
        createdStartDate,
        createdEndDate,
        actveStatus,
        section_id,
        contentblock_id
    ) => {
        axiosGet
            .get(
                `blocks_get?has_limit=1&access_token=${access_token}&page=${limit}&items_per_page=${end}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&active_status=${actveStatus}&order_field=${orderField}&order_type=${orderType}&section_id=${section_id ? section_id : ''}&contentblock_id=${contentblock_id}`
            )
            .then((response) => {
                // Handle the successful response here
                console.log(response.data, 'ddd')
                console.log(response.data.access_token)
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




    const [contentID, setContentID] = useState('')

    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSectionID, setSelectedSectionID] = useState("");

    console.log(selectedSectionID, 'selectedSectionID');

    const handleButtonClick = (index, id) => {
        console.log(id);
        setSelectedSectionID(id);
        setShowBox(false)
        setButtonClicked(false)
        setContent([])
        fetchData(
            ACCESS_TOKEN,
            limit,
            limitEnd,
            searchValue,
            createdStartDate,
            createdEndDate,
            actveStatus,
            id,
            selectedContentID
        );
    };

    const [selectedContentID, setSelectedContentID] = useState('')

    const handleContentBlock = (id) => {
        console.log(id, 'hihihi');
        setSelectedContentID(id.ContentBlockID);
        setContent(id.block_items)
    }

    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [openEditType, setOpenEditType] = useState(1);
    const [openContentEditDrawer, setOpenContentEditDrawer] = useState(false);
    const [openContentEditType, setOpenContentEditType] = useState(1);
    const [openContentDrawer, setOpenContentDrawer] = useState(false);
    const [openContentType, setOpenContentType] = useState(1);
    const [openViewType, setOpenViewType] = useState(1);

    const toggleEditDrawer = (newOpen, type) => () => {
        // type 1 : Create
        // type 2 : Edit
        setOpenEditDrawer(newOpen);
        setOpenEditType(type);
        setBlockName()
        setUniqBlockName()
        setPositionValue()
        setSlugName()
        setTitle()
        setSubtitle()
        setDescription()
        setDescriptionTwo()
        setPicture()
        setPictureName()
        setPictureUrl()
        setBlockPath()

    };
    const toggleContentEditDrawer = (newOpen, type) => () => {
        // type 1 : Create
        // type 2 : Edit
        setOpenContentEditDrawer(newOpen);
        setOpenContentEditType(type);
        setContentType()
        setKeyName()
        setPositionValue()
        setTextValue()
        setKeyValuePairs()

    };
    const toggleContentDrawer = (newOpen, type) => () => {
        // type 1 : Create
        // type 2 : Edit
        setOpenContentDrawer(newOpen);
        setOpenContentType(type);


    };

    const toggleViewDrawer = (newOpen, type) => () => {

        setOpenViewDrawer(newOpen);
        setOpenViewType(type);
    };


    const [selectedFile, setSelectedFile] = useState(null);

    const handleMediaChange = (event) => {

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = (e) => {
            const base64String = reader.result.split(',')[1];
            const filename = file.name;
            const imageUrl = URL.createObjectURL(file);
            console.log(base64String);
            setMedia(base64String);
            setMediaName(filename);
            setMediaUrl(imageUrl)
        };
    };

    const handleCancelUpload = () => {
        setMedia(null);
        setMediaName(null)
        setMediaUrl(null);
        setBlockPath()
    };

    const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', value: '' }]);

    const handleAdd = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
    };

    const handleKeyChange = (index, event) => {
        const newKeyValuePairs = [...keyValuePairs];
        newKeyValuePairs[index].key = event.target.value;
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleValueChange = (index, event, ref) => {
        const newKeyValuePairs = [...keyValuePairs];
        if (ref === "key") {
            newKeyValuePairs[index].key = event.target.value;
            setKeyValuePairs(newKeyValuePairs);
        } else {
            newKeyValuePairs[index].value = event.target.value;
            setKeyValuePairs(newKeyValuePairs);
        }

    };
    const [showBox, setShowBox] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [contentType, setContentType] = useState('')

    const handleBlocks = () => {
        setShowBox(!showBox)
        setButtonClicked(true);
    }

    // console.log(checkin,'checkinnnn');

    return (
        <div style={{ padding: "16px" }}>

            <div
                style={{ display: "flex", gap: 20 }}
                className="displey_space_between"
            >


            </div>
            <div>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px',
                            pt: 1,
                            px: 1,
                            zIndex: 9,
                            top: '0px',
                            position: 'sticky',
                        }}
                    >


                        {/* {pages?.map((page, pageIndex) => ( */}
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton size="small">
                                    <ArrowBack style={{ color: 'black' }} />
                                </IconButton>
                                <Typography
                                    variant="h4"
                                    className="nunito_font"
                                    color="primary"
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        marginBottom: '8px',
                                    }}
                                >
                                    {pageName}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                <Paper sx={{ width: '300px', height: '600px' }}>
                                    <Typography variant="h4"
                                        className="nunito_font"
                                        color="primary"
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 700,
                                            marginTop: '10px',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>Section Details</Typography>
                                    {sections.map((item, index) => (
                                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '8px' }}>
                                            <Button variant="contained" size="small" sx={{ mb: 4, margin: 2 }} onClick={() => handleButtonClick(index, item.SectionID)} >{item.SectionName}</Button></Box>
                                    ))}
                                </Paper>
                            </Box>
                        </Box>
                        <div sx={{ display: 'flex', gap: '2px' }}>


                            {showBox && (
                                <Box sx={{ position: 'relative', mt: 6, }}>
                                    <Button variant="contained" onClick={handleSubmit} sx={{ float: 'right', marginBottom: '10px' }}>
                                        Save
                                    </Button>
                                    <Card sx={{ py: 0.5, boxShadow: 'none', marginTop: '2px' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px', margin: 2 }}>

                                            <CInput
                                                label="Block Name"
                                                value={blockName}
                                                type={"block"}
                                                name="BlockName"

                                                onChange={(e) => setBlockName(e.target.value)}
                                                helperText={postError?.Slug}
                                                error={postError?.Slug}
                                            />

                                            <CInput
                                                label="Unique Block Name"
                                                value={uniqBlockName}
                                                type={"slug"}
                                                name="UniqueContentBlockName"
                                                onChange={(e) => setUniqBlockName(e.target.value)}
                                                helperText={postError?.Slug}
                                                error={postError?.Slug}
                                            />
                                            <FormControl size="small" error={Boolean(postError?.Position)} sx={{ width: '500px' }}>
                                                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                                    Position
                                                </InputLabel>
                                                <Select
                                                    labelId="position-label"
                                                    id="position"
                                                    value={positionValue}
                                                    onChange={(e) => setPositionValue(e.target.value)}
                                                    label="Position"
                                                >
                                                    {data?.map((item, index) => (
                                                        <MenuItem key={index} value={item.Position} sx={{ fontSize: "14px" }}>
                                                            {item.Position}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                                            </FormControl>
                                            <CInput
                                                label="Title"
                                                value={title}
                                                type={"slug"}
                                                name="Title"
                                                onChange={(e) => setTitle(e.target.value)}
                                                helperText={postError?.Title}
                                                error={postError?.Title}
                                            />
                                            <CInput
                                                label="Subtitles"
                                                value={subtitle}
                                                type={"slug"}
                                                fullWidth
                                                name="UniqueContentBlockName"
                                                onChange={(e) => setSubtitle(e.target.value)}
                                                helperText={postError?.SubTitle}
                                                error={postError?.SubTitle}
                                            />

                                            <CInput
                                                label="Slug"
                                                value={slugName}
                                                type={"slug"}
                                                name="Slug"
                                                onChange={(e) => setSlugName(e.target.value)}
                                                helperText={postError?.Slug}
                                                error={postError?.Slug}
                                            />
                                        </Box>
                                        <Stack sx={{ marginBottom: '16px', margin: 2 }}>

                                            {pictureUrl ? (
                                                <div style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    border: '2px solid #ccc',
                                                    borderRadius: '10px',
                                                    padding: '8px',
                                                    textAlign: 'center',
                                                    position: 'relative',
                                                    margin: 4
                                                }}>
                                                    <img
                                                        src={pictureUrl}
                                                        alt={pictureName}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            // borderRadius: '10px',
                                                        }}
                                                    />
                                                    <IconButton
                                                        sx={{ position: 'absolute', top: '0px', left: '150px', }}
                                                        onClick={resetFileInput}
                                                    >
                                                        <CloseOutlined sx={{ color: 'black' }} />
                                                    </IconButton>
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        id="upload-photo"
                                                    />
                                                    <label htmlFor="upload-photo">
                                                        <Button variant="contained" sx={{
                                                            backgroundColor: 'white',
                                                            color: 'black',
                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                                            '&:hover': {
                                                                backgroundColor: 'white',
                                                            },
                                                            mt: 2,

                                                        }} component="span">
                                                            <FileUploadOutlinedIcon sx={{ width: '20px' }} />  Upload Photo
                                                        </Button>
                                                    </label></>
                                            )}
                                        </Stack>

                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            helperText={postError?.Slug}
                                            error={postError?.Slug}
                                            multiline
                                            sx={{ width: '97%', marginTop: '5px', margin: 2 }}

                                        />
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Description Two"
                                            value={descriptionTwo}
                                            onChange={(e) => setDescriptionTwo(e.target.value)}
                                            helperText={postError?.Slug}
                                            error={postError?.Slug}
                                            multiline
                                            sx={{ width: '97%', marginTop: '5px', margin: 2 }}

                                        />
                                        <Grid item xs={4} md={4} sx={{ marginTop: 1, margin: 2 }}>
                                            <Typography
                                                variant="h4"
                                                className="nunito_font"
                                                color={"primary"}
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: 700,
                                                    marginLeft: "22px",
                                                    marginBottom: '10px'
                                                }}
                                            >
                                                Item
                                            </Typography>
                                            <GridContainer
                                                sx={{ pb: 1, marginTop: '10px' }}
                                            >
                                                <Grid item xs={3} md={3} >
                                                    <FormControl size="small" fullWidth error={Boolean(postError?.Position)}>
                                                        <InputLabel sx={{ fontSize: "14px" }} id="content-label">
                                                            Content Type
                                                        </InputLabel>
                                                        <Select
                                                            labelId="content-label"
                                                            id="content-type"
                                                            value={contentValue}
                                                            onChange={(e, v) => handleChangeContent(e.target.value, v)}
                                                            label="Content Type"
                                                        >

                                                            <MenuItem value="json" sx={{ fontSize: "14px" }}>
                                                                Json
                                                            </MenuItem>
                                                            <MenuItem value="text" sx={{ fontSize: "14px" }}>
                                                                Text
                                                            </MenuItem>
                                                            <MenuItem value="media" sx={{ fontSize: "14px" }}>
                                                                Media
                                                            </MenuItem>

                                                        </Select>
                                                        {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                    <FormControl size="small" fullWidth error={Boolean(postError?.Position)}>
                                                        <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                                            Position
                                                        </InputLabel>
                                                        <Select
                                                            labelId="position-label"
                                                            id="position"
                                                            value={positionValue}
                                                            onChange={(e) => setPositionValue(e.target.value)}
                                                            label="Position"
                                                        >
                                                            {data?.map((item, index) => (
                                                                <MenuItem key={index} value={item.Position} sx={{ fontSize: "14px" }}>
                                                                    {item.Position}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={3} md={3}>
                                                    <CInput
                                                        label="Key Name"
                                                        value={keyName}
                                                        type="text"
                                                        name="keyName"
                                                        onChange={(e) => setKeyName(e.target.value)}
                                                        helperText={postError?.keyName}
                                                        error={postError?.keyName}
                                                    />

                                                </Grid>
                                                <Grid item xs={3} md={3}>
                                                    <CInput
                                                        label="Unique Key Name"
                                                        value={uniqKeyName}
                                                        type='text'
                                                        name="UniqueKeyName"
                                                        onChange={(e) => setUniqKeyName(e.target.value)}
                                                        helperText={postError?.UniqueKeyName}
                                                        error={postError?.UniqueKeyName}
                                                    />
                                                </Grid>

                                                {contentValue === 'json' && (

                                                    <>


                                                        <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                                            <CInput
                                                                label="Key"
                                                                value={pair.key}
                                                                onChange={(e) => handleKeyChange(index, e, 'key')}
                                                            />

                                                            <CInput
                                                                label="Value"
                                                                value={pair.value}
                                                                onChange={(e) => handleValueChange(index, e, 'value')}
                                                            />
                                                        </Box>


                                                        <Button variant="contained"
                                                            sx={{
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                                '&:hover': {
                                                                    backgroundColor: '#f0f0f0',
                                                                },
                                                                margin: 1
                                                            }} onClick={handleAdd}> +Add </Button>

                                                    </>
                                                )}
                                                {contentValue === 'text' && (
                                                    <TextField
                                                        id="outlined-multiline-flexible"
                                                        label="Text"
                                                        multiline
                                                        sx={{ width: '100%', marginTop: '10px' }}

                                                    />

                                                )}
                                                {contentValue === 'media' && (
                                                    <div >
                                                        {mediaUrl ? (
                                                            <div style={{
                                                                width: '150px',
                                                                height: '150px',
                                                                border: '2px solid #ccc',
                                                                borderRadius: '10px',
                                                                padding: '8px',
                                                                textAlign: 'center',
                                                                position: 'relative',
                                                                margin: 4
                                                            }}>
                                                                <img
                                                                    src={mediaUrl}
                                                                    alt={mediaName}

                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                        // borderRadius: '10px',
                                                                    }}
                                                                />
                                                                <IconButton
                                                                    sx={{ position: 'absolute', top: '0px', left: '150px', }}
                                                                    onClick={handleCancelUpload}
                                                                >
                                                                    <CloseOutlined sx={{ color: 'black' }} />
                                                                </IconButton>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleMediaChange}
                                                                    style={{ display: 'none' }}
                                                                    id="upload-photo"
                                                                />
                                                                <label htmlFor="upload-photo">
                                                                    <Button variant="contained" sx={{
                                                                        backgroundColor: 'white',
                                                                        color: 'black',
                                                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                        },
                                                                        mt: 2,
                                                                        margin: 2
                                                                    }} component="span">
                                                                        <FileUploadOutlinedIcon sx={{ width: '20px' }} />  Upload Photo
                                                                    </Button>
                                                                </label></>
                                                        )}
                                                    </div>
                                                )}

                                            </GridContainer>
                                        </Grid>
                                        <Button variant="contained"
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                },
                                                mt: 2,
                                                margin: 2
                                            }} > +Add Item</Button>
                                    </Card></Box>)}
                            {!showBox && content.length === 0 && (
                                <Button variant="contained" onClick={handleBlocks}>
                                    Add New Block
                                </Button>
                            )}

                            {content.length === 0 && (<>
                                {data?.map((item, index) => (

                                    <Box key={index} sx={{ width: '200%', maxWidth: '500px', position: 'relative', mt: 4, }}>



                                        <Card sx={{ py: 0.5, boxShadow: 'none', margin: 2 }} >
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                <div sx={{ display: 'flex' }}>
                                                    <Badge
                                                        color="secondary"
                                                        variant="dot"
                                                        invisible={!handlefilterBadgeVisible()}
                                                        onClick={() => handleClickView(item)}
                                                        sx={{ marginLeft: 4, margin: 1 }}
                                                    >
                                                        <ViewButton
                                                            HandleChangeView={HandleChangeView}
                                                            viewList={viewList}
                                                        />
                                                    </Badge>
                                                    <Badge
                                                        color="secondary"
                                                        variant="dot"
                                                        invisible={!handlefilterBadgeVisible()}
                                                        onClick={() => handleClickEdit(item, id)}
                                                        sx={{ marginRight: 2, margin: 1 }}
                                                    >
                                                        <EditButton
                                                            HandleChangeEdit={HandleChangeEdit}
                                                            editList={editList}
                                                        />
                                                    </Badge>
                                                    <Badge
                                                        color="secondary"
                                                        variant="dot"
                                                        invisible={!handlefilterBadgeVisible()}
                                                        onClick={() => handleContentBlock(item)}
                                                        sx={{ marginRight: 2, margin: 1 }}
                                                    >
                                                        <ListButton
                                                            HandleChangeList={HandleChangeList}
                                                            contentList={contentList}
                                                        />
                                                    </Badge>
                                                </div>
                                            </div>
                                            <img
                                                src={item.BlockImage}
                                                style={{
                                                    width: '100%',
                                                    height: '300px',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px'
                                                }}
                                                alt={`Image for ${item.BlockName}`}
                                            />
                                            <div style={{ display: 'flex' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 400, px: 4 }}>
                                                    Slug:
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                                    {item.Slug}
                                                </Typography>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 400, px: 4 }}>
                                                    Position:
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                                    {item.Position}
                                                </Typography>
                                            </div>



                                        </Card>
                                    </Box>

                                ))}
                            </>)}





                            {selectedContentID && content?.filter(item => item.ContentBlockID === selectedContentID).map((item, index) => (
                                <>
                                    <Box key={index} sx={{ width: '200%', maxWidth: '00px', position: 'relative', mt: 4, }}>



                                        <Card sx={{ py: 0.5, boxShadow: 'none', margin: 2 }} >
                                            <div style={{ display: 'flex', justifyContent: 'space-between' ,flexDirection: 'row'}}>
                                                <div sx={{ display: 'flex', flexDirection: 'row' }}>
                                                   
                                                </div>
                                                <div sx={{ display: 'flex' }}>

                                                    <Badge
                                                        color="secondary"
                                                        variant="dot"
                                                        invisible={!handlefilterBadgeVisible()}
                                                        onClick={() => handleContentEdit(item)}
                                                        sx={{ marginRight: 2, }}
                                                    >
                                                        <EditButton
                                                            HandleChangeEdit={() => HandleChangeEdit(item)}
                                                            editList={editList}
                                                        />
                                                    </Badge></div>
                                            </div>


                                            <div style={{ display: 'flex' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 400, px: 4 }}>
                                                    content type:
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                                    {item.ContentType}
                                                </Typography>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 400, px: 4 }}>
                                                    Key Name:
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                                    {item.KeyName}
                                                </Typography>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <Typography sx={{ fontSize: 14, fontWeight: 400, px: 4 }}>
                                                    Position:
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                                    {item.Position}
                                                </Typography>
                                            </div>
                                           
                                                
                                                <Box sx={{ fontSize: 14,backgroundColor:'#F6F6F6',borderRadius:'10px',py:2, display: 'flex',justifyContent:'center',margin:2 }}>
                                                    {item.Content}
                                                </Box>
                                           
                                        </Card>

                                    </Box>

                                </>
                            ))}
                            {selectedContentID && content && (
                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                        margin: 1
                                    }} onClick={handleContent}> +Add Content Type </Button>)}
                        </div>
                    </Box>
                </Box>

            </div>




            <Drawer anchor={"right"} open={openEditDrawer} onClose={toggleEditDrawer(false)}>
                <Box sx={{ width: "600px", pb: 1, }}>
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
                            <IconButton onClick={toggleEditDrawer(false)} size="small">
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
                                Edit Block
                            </Typography>
                        </Box>


                        <Box display={"flex"} gap={1} >
                            <Button variant="contained" onClick={handleEditSubmit}>Update
                            </Button>
                        </Box>



                    </Box>
                    <Box sx={{ p: 1, px: 2, my: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>

                            <CInput
                                label="Block Name"
                                value={blockName}
                                type={"block"}
                                name="BlockName"

                                onChange={(e) => setBlockName(e.target.value)}
                                helperText={postError?.BlockName}
                                error={postError?.BlockName}
                            />

                            <CInput
                                label="Unique Block Name"
                                value={uniqBlockName}
                                type={"slug"}
                                name="UniqueContentBlockName"
                                onChange={(e) => setUniqBlockName(e.target.value)}
                                helperText={postError?.UniqueContentBlockName}
                                error={postError?.UniqueContentBlockName}
                            />
                        </Box>
                        <CInput
                            label="Title"
                            value={title}
                            type={"slug"}
                            name="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            helperText={postError?.Title}
                            error={postError?.Title}
                        />
                        <CInput
                            label="Subtitles"
                            value={subtitle}
                            type={"slug"}
                            fullWidth
                            name="UniqueContentBlockName"
                            onChange={(e) => setSubtitle(e.target.value)}
                            helperText={postError?.SubTitle}
                            error={postError?.SubTitle}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <CInput
                                label="Slug"
                                value={slugName}
                                type={"slug"}
                                name="Slug"
                                onChange={(e) => setSlugName(e.target.value)}
                                helperText={postError?.Slug}
                                error={postError?.Slug}
                            />
                            <FormControl size="small" error={Boolean(postError?.Position)} sx={{ width: '150px' }}>
                                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                    Position
                                </InputLabel>
                                <Select
                                    labelId="position-label"
                                    id="position"
                                    value={positionValue}
                                    onChange={(e) => setPositionValue(e.target.value)}
                                    label="Position"
                                >
                                    {data?.map((item, index) => (
                                        <MenuItem key={index} value={item.Position} sx={{ fontSize: "14px" }}>
                                            {item.Position}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Stack sx={{ marginBottom: '16px' }}>
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

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            value={description}
                            name="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            helperText={postError?.Description}
                            error={postError?.Description}
                            multiline
                            sx={{ width: '100%', marginTop: '10px' }}

                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description Two"
                            value={descriptionTwo}
                            name="DescriptionTwo"
                            onChange={(e) => setDescriptionTwo(e.target.value)}
                            helperText={postError?.DescriptionTwo}
                            error={postError?.DescriptionTwo}
                            multiline
                            sx={{ width: '100%', marginTop: '10px' }}

                        />
                    </Box></Box>
            </Drawer>
            <Drawer anchor={"right"} open={openContentEditDrawer} onClose={toggleContentEditDrawer(false)}>
                <Box sx={{ width: "600px", pb: 1, }}>
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
                            <IconButton onClick={toggleContentEditDrawer(false)} size="small">
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
                                Edit Content Items
                            </Typography>
                        </Box>


                        <Box display={"flex"} gap={1} >
                            <Button variant="contained" onClick={handleContentEditSubmit}>Update
                            </Button>
                        </Box>



                    </Box>
                    <Box sx={{ p: 1, px: 2, my: 1 }}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '10px' }}>
                            <FormControl size="small" fullWidth error={Boolean(postError?.Position)} sx={{ width: '700px' }}>
                                <InputLabel sx={{ fontSize: "14px" }} id="content-label">
                                    Content Type
                                </InputLabel>
                                <Select
                                    labelId="content-label"
                                    id="content-type"
                                    value={contentValue}
                                    onChange={(e, v) => handleChangeContent(e.target.value, v)}
                                    label="Content Type"
                                >


                                    <MenuItem value="text" sx={{ fontSize: "14px" }}>
                                        Text
                                    </MenuItem>
                                    <MenuItem value="media" sx={{ fontSize: "14px" }}>
                                        Media
                                    </MenuItem>

                                </Select>
                                {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                            </FormControl>

                            <FormControl size="small" fullWidth error={Boolean(postError?.Position)}>
                                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                    Position
                                </InputLabel>
                                <Select
                                    labelId="position-label"
                                    id="position"
                                    value={positionValue}
                                    onChange={(e) => setPositionValue(e.target.value)}
                                    label="Position"
                                >
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <MenuItem key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>

                            <CInput
                                label="Key Name"
                                value={keyName}
                                type="text"
                                name="keyName"
                                onChange={(e) => setKeyName(e.target.value)}
                                helperText={postError?.keyName}
                                error={postError?.keyName}
                            />


                            <CInput
                                label="Unique Key Name"
                                value={uniqKeyName}
                                type='text'
                                name="UniqueKeyName"
                                onChange={(e) => setUniqKeyName(e.target.value)}
                                helperText={postError?.UniqueKeyName}
                                error={postError?.UniqueKeyName}
                            />

                        </Box>


                        {contentValue === 'text' && (
                            <Typography>Text</Typography>


                        )}
                        {contentValue === 'media' && (
                            <div >
                                {mediaUrl ? (
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        border: '2px solid #ccc',
                                        borderRadius: '10px',
                                        padding: '8px',
                                        textAlign: 'center',
                                        position: 'relative',
                                        margin: 4
                                    }}>
                                        <img
                                            src={mediaUrl}
                                            alt={mediaName}

                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                // borderRadius: '10px',
                                            }}
                                        />
                                        <IconButton
                                            sx={{ position: 'absolute', top: '0px', left: '150px', }}
                                            onClick={handleCancelUpload}
                                        >
                                            <CloseOutlined sx={{ color: 'black' }} />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleMediaChange}
                                            style={{ display: 'none' }}
                                            id="upload-photo"
                                        />
                                        <label htmlFor="upload-photo">
                                            <Button variant="contained" sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                },
                                                mt: 2,
                                                margin: 2
                                            }} component="span">
                                                <FileUploadOutlinedIcon sx={{ width: '20px' }} />  Upload Photo
                                            </Button>
                                        </label></>
                                )}
                            </div>
                        )}
                    </Box></Box>
            </Drawer>
            <Drawer anchor={"right"} open={openContentDrawer} onClose={toggleContentDrawer(false)}>
                <Box sx={{ width: "600px", pb: 1, }}>
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
                            <IconButton onClick={toggleContentDrawer(false)} size="small">
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
                                Create New Content
                            </Typography>
                        </Box>


                        <Box display={"flex"} gap={1} >
                            <Button variant="contained" onClick={handleContentSubmit}>Create
                            </Button>
                        </Box>



                    </Box>
                    <Box sx={{ p: 1, px: 2, my: 1 }}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '10px' }}>

                            <FormControl size="small" fullWidth error={Boolean(postError?.Position)} sx={{ width: '700px' }}>
                                <InputLabel sx={{ fontSize: "14px" }} id="content-label">
                                    Content Type
                                </InputLabel>
                                <Select
                                    labelId="content-label"
                                    id="content-type"
                                    value={contentValue}
                                    onChange={(e, v) => handleChangeContent(e.target.value, v)}
                                    label="Content Type"
                                >


                                    <MenuItem value="text" sx={{ fontSize: "14px" }}>
                                        Text
                                    </MenuItem>
                                    <MenuItem value="media" sx={{ fontSize: "14px" }}>
                                        Media
                                    </MenuItem>

                                </Select>
                                {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                            </FormControl>


                            <FormControl size="small" fullWidth error={Boolean(postError?.Position)}>
                                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                    Position
                                </InputLabel>
                                <Select
                                    labelId="position-label"
                                    id="position"
                                    value={positionValue}
                                    onChange={(e) => setPositionValue(e.target.value)}
                                    label="Position"
                                >
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <MenuItem key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>

                            <CInput
                                label="Key Name"
                                value={keyName}
                                type="text"
                                name="keyName"
                                onChange={(e) => setKeyName(e.target.value)}
                                helperText={postError?.keyName}
                                error={postError?.keyName}
                            />


                            <CInput
                                label="Unique Key Name"
                                value={uniqKeyName}
                                type='text'
                                name="UniqueKeyName"
                                onChange={(e) => setUniqKeyName(e.target.value)}
                                helperText={postError?.UniqueKeyName}
                                error={postError?.UniqueKeyName}
                            />

                        </Box>

                        {contentValue === 'text' && (
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Text"
                                multiline
                                sx={{ width: '100%', marginTop: '10px' }}

                            />

                        )}
                        {contentValue === 'media' && (
                            <div >
                                {mediaUrl ? (
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        border: '2px solid #ccc',
                                        borderRadius: '10px',
                                        padding: '8px',
                                        textAlign: 'center',
                                        position: 'relative',
                                        margin: 4
                                    }}>
                                        <img
                                            src={mediaUrl}
                                            alt={mediaName}

                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                // borderRadius: '10px',
                                            }}
                                        />
                                        <IconButton
                                            sx={{ position: 'absolute', top: '0px', left: '150px', }}
                                            onClick={handleCancelUpload}
                                        >
                                            <CloseOutlined sx={{ color: 'black' }} />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleMediaChange}
                                            style={{ display: 'none' }}
                                            id="upload-photo"
                                        />
                                        <label htmlFor="upload-photo">
                                            <Button variant="contained" sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                },
                                                mt: 2,
                                                margin: 2
                                            }} component="span">
                                                <FileUploadOutlinedIcon sx={{ width: '20px' }} />  Upload Photo
                                            </Button>
                                        </label></>
                                )}
                            </div>
                        )}
                    </Box></Box>
            </Drawer>

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
                                View Block Details


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
                                    {singleData.BlockImage ? <div
                                        style={{
                                            width: '130px',
                                            height: '130px',
                                            border: '2px  #ccc',
                                            // borderRadius: '10px',
                                            // padding: '4px',
                                            // textAlign: 'center',
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
                                            src={singleData.BlockImage}
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
                                            Block Name
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" width={1} sx={{ textTransform: 'capitalize' }}>
                                            {singleData.BlockName}
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
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
                                            Unique Block Name
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" width={1} sx={{ textTransform: 'capitalize' }}>
                                            {singleData.UniqueContentBlockName}
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
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
                                            Position
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" width={1}>
                                            {singleData.Position}
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
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
                                            Title
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" width={1}>
                                            {singleData.Title}
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
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
                                            SubTitle
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" width={1}>
                                            {singleData.SubTitle} 
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
                                    <Box
                                        px={2}
                                        fontSize={"14px"}
                                        display={"flex"}
                                        gap={1.5}
                                        padding={0.5}
                                        justifyContent={"space-between"}
                                        alignItems={"start"}
                                    >
                                        <Typography variant="body1" width={"177px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                            Slug
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                                            {singleData.Slug}
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
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
                                            Description
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                                            {singleData.Description}
                                        </Typography>
                                    </Box>
                                    {/* <Divider sx={{ my: 0.5 }} /> */}
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
                                            Description
                                            <span>:</span>
                                        </Typography>
                                        <Typography variant="body" align="left" textTransform={'capitalize'} width={1}>
                                            {singleData.DescriptionTwo}
                                        </Typography>
                                    </Box>






                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
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
