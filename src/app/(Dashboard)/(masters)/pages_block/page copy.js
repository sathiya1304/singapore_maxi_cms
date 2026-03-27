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
  FormHelperText,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import InputBase from "@mui/material/InputBase";
import { ArrowBack, History, RefreshOutlined } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable"
import GridContainer from "../../components/container/GridContainer";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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
import DeleteButton from "../../components/buttons/DeleteButton";
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
  const search = useSearchParams();
  const uuid = search.get("id");
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
  const [dltBlockOpen, setDltBlockOpen] = useState(false);
  const [singleItem, setSingleItem] = useState([]);
  const [singleBlock, setSingleBlock] = useState([]);
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

  const [pages, setPages] = useState([]);
  const [pageName, setPageName] = useState([]);
  const HandleChangePageName = (event, value) => {
    console.log(value);
    console.log(event, "event");
    setPageName(event);
  };
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
  const [blockName, setBlockName] = useState("");
  console.log(blockName, "blockName");
  const [uniqBlockName, setUniqBlockName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
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

  const handleClickFileInput = () => {
    const fileInput = document.getElementById("upload-photo-1");
    fileInput.click();
  };

  // const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.readAsDataURL(file)

  //     reader.onload = (e) => {
  //         const base64String = reader.result.split(',')[1];
  //         const filename = file.name;
  //         const imageUrl = URL.createObjectURL(file);
  //         console.log(base64String);
  //         setPicture(base64String);
  //         setPictureName(filename);
  //         setPictureUrl(imageUrl)
  //     };

  // };

  const handleFileChange = (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        console.error("No file selected.");
        return;
      }

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const base64String = reader.result.split(",")[1];
          const filename = file.name;
          const imageUrl = URL.createObjectURL(file);

          console.log("Base64 String:", base64String);
          console.log("Filename:", filename);
          console.log("Image URL:", imageUrl);

          setPicture(base64String); // Ensure these state functions are defined
          setPictureName(filename);
          setPictureUrl(imageUrl);
        } catch (innerError) {
          console.error("Error processing file:", innerError);
        }
      };

      reader.onerror = (err) => {
        console.error("Error reading file:", err);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("File handling error:", error);
    }
  };

  const resetFileInput = () => {
    setPicture(null);
    setPictureUrl(null);
    setPictureName(null);
    setBlockPath();
  };

  // Toggel Drawer
  const toggleDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenDrawer(newOpen);
    setOpenDrawerType(type);
    setPictureUrl();
    setPicture();
    setPictureName();
  };

  const HandleChangeEdit = (value) => {
    console.log(value);
    seteditList(!editList);
    // setContentValue(value.ContentType)
  };
  const [contentList, setContentList] = useState("");
  const HandleChangeList = () => {
    setContentList(!contentList);
  };
  const [deleteList, setDeleteList] = useState("");
  const HandleChangeDelete = () => {
    setDeleteList(!deleteList);
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

  const [keyName, setKeyName] = useState("");
  const [uniqKeyName, setUniqKeyName] = useState("");
  const [position, SetPosition] = useState();
  const [positionValue, setPositionValue] = useState();

  // Funtion to change active status for filter

  // Page action's state and funtions (create, Edit, Status change, Delete) ----
  const [dataUniqId, setDataUniqId] = useState("");
  const [dataStatus, setDataStatus] = useState(1);
  const [data, setData] = useState([]);

  console.log(data, "data");
  const [singleData, setSingleData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [postError, setPostError] = useState([]);
  const [sectionID, setSectionID] = useState("");
  const [sections, setsections] = useState([]);
  const [blockPath, setBlockPath] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionTwo, setDescriptionTwo] = useState("");
  const [newContentItems, setNewContentItems] = useState([
    {
      contenttype: "",
      key_name: "",
      position: "",
      unique_keyname: "",
      content: "",
      media_url: "",
      item_image: "",
      item_image_name: "",
    },
  ]);

  const handleAddNewConentItems = () => {
    setNewContentItems([
      ...newContentItems,
      {
        contenttype: "",
        key_name: "",
        position: "",
        unique_keyname: "",
        content: "",
        item_image: "",
        item_image_name: "",
        media_url: "",
      },
    ]);
  };

  const handleChangeConentItems = (index, key, value) => {
    setNewContentItems((entries) =>
      entries.map((entry, i) =>
        i === index ? { ...entry, [key]: value } : entry
      )
    );
  };

  const handleRemoveDocument = (index) => {
    setNewContentItems((entries) => entries.filter((_, i) => i !== index));
  };

  const [contentValue, setContentValue] = useState("");

  console.log(contentValue, "contentValue");

  const [keyValue, setKeyValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleChangeContent = (event) => {
    setContentType(event);
    setContentValue(event);
    // Reset other state values if necessary
    setKeyValue("");
    setKeyValuePairs("");
    setTextValue("");
  };

  const fetchPage = async () => {
    axiosGet
      .get(
        `pages_get?access_token=${ACCESS_TOKEN}&has_limit=0&unique_keyname=${uuid}`
      )
      .then((response) => {
        // Handle the successful response here
        const data = response.data.data;
        setPages(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  console.log(pages, "asd3");

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
        const data = response.data.data;
        const Page = response.data.data[0]?.page_name;
        setsections(data);
        setPageName(Page);
        fetchData(
          ACCESS_TOKEN,
          limit,
          limitEnd,
          searchValue,
          createdStartDate,
          createdEndDate,
          actveStatus,
          data[0]?.SectionID
        );
        setSelectedSectionID(data[0].SectionID);
        setSelectedIndex(0);
        console.log(data, "gt5");
        console.log(data[0]?.SectionID, "id");
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  const [contentBlockID, setContentBlockID] = useState("");

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
    setSectionVisibility((prevState) => ({
      ...prevState,
      [pageID]: !prevState[pageID],
    }));
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClickEdit = (item) => {
    toggleEditDrawer(true);
    // toggleDrawer(true, 2)
    // setOpenDrawerType(2);
    setOpenEditDrawer(true);
    setBlockName(item.BlockNames);
    setUniqBlockName(item.UniqueContentBlockName);
    setTitle(item.Title);
    setSubtitle(item.SubTitle);
    setSlugName(item.Slug);
    setPositionValue(item.Position);
    setDescription(item.Description);
    setDescriptionTwo(item.DescriptionTwo);
    setPicture(item.BlockImage);
    setPictureUrl(item.BlockImage);
    setPictureName(item.image_name);
    setBlockPath(item.BlockImagePath);
    // setSectionID(item.SectionID)
    setSelectedSectionID(item.SectionID);
    setSelectedContentID(item.ContentBlockID);
  };

  const [contentItemsID, setContentItemsId] = useState("");

  const handleContentEdit = (item) => {
    console.log(item);
    toggleContentEditDrawer(true);
    setOpenContentEditDrawer(true);
    setContentType(item.ContentType);
    setPositionValue(item.Position);
    setKeyName(item.KeyName);
    setUniqKeyName(item.UniqueKeyName);
    setContentItemsId(item.ContentItemID);
    setContentValue(item.Content);
    setMediaUrl(item.MediaID);
  };
  const handleContent = () => {
    toggleContentDrawer(true);
    setOpenContentDrawer(true);
  };
  const handleClickView = (item) => {
    console.log(item, "it6");
    toggleViewDrawer(true);
    setOpenViewDrawer(true);
    setDataUniqId(item.data_uniq_id);
    setSingleData(item);
  };
  console.log(singleData, "yu78");

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
      items_list: newContentItems,
    };
    console.log(selectedSectionID, "iii");
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
            setDisplayType("list");
            setShowBox(false);
            setButtonClicked(false);
            setBlockName("");
            setUniqBlockName("");
            setSlugName("");
            setPositionValue("");
            setDescription("");
            setDescriptionTwo("");
            setNewContentItems("");
            setPicture("");
            setContentBlockID("");
            setTitle("");
            setSubtitle("");

            setTimeout(() => {
              setAlertVisible(false);
            }, 3000);
            router.back();
          } else {
            if (response.data.message_type === "specific") {
              setPostError(response.data.message);
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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleContentSubmit = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    const jsonStructure = {
      contenttype: contentType,
      content: contentValue,
      key_name: keyName,
      unique_keyname: uniqKeyName,
      position: positionValue,
      content_block_id: selectedContentID,
      access_token: ACCESS_TOKEN,
      contentblock_id: contentBlockID,
      item_image_name: mediaName,
      item_image: media,
    };
    console.log(contentID, "iii");
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
              actveStatus
            );
            setContentValue("");
            setPositionValue("");
            setKeyName("");
            setUniqKeyName("");
            setContentType("");

            setShowBox(false);
            setOpenContentDrawer(false);
            // You can also set a timeout to hide the alert after a certain duration
            setTimeout(() => {
              setAlertVisible(false);
            }, 3000);
            router.back();
          } else {
            if (response.data.message_type === "specific") {
              setPostError(response.data.message);
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
    } catch (error) {
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
      SectionID: selectedSectionID,
      position: positionValue,
      block_image: picture,
      image_name: pictureName,
      block_image_path: blockPath,
      access_token: ACCESS_TOKEN,
      contentblock_id: selectedContentID,
    };
    console.log("contentBlockID", selectedContentID);
    try {
      axiosPost
        .put(`blocks`, jsonData)
        .then((response) => {
          if (response.data.action === "success") {
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            setOpenEditDrawer(false);
            setIsLoading(false);
            setOpenEditDrawer(false);
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
            setPicture();
            setPictureUrl();
            setPictureName();
            setBlockPath();
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
      contenttype: contentType,
      content: contentValue,
      key_name: keyName,
      unique_keyname: uniqKeyName,
      position: positionValue,
      content_block_id: selectedContentID,
      access_token: ACCESS_TOKEN,
      contentitems_id: contentItemsID,
      item_image_name: mediaName,
      item_image: media,
    };
    console.log("ctt", contentItemsID);
    try {
      axiosPost
        .put(`contentitems`, jsonData)
        .then((response) => {
          if (response.data.action === "success") {
            fetchData();
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            setOpenEditDrawer(false);
            setIsLoading(false);
            setOpenEditDrawer(false);
            setOpenContentEditDrawer(false);
            fetchData();
            setContentValue("");
            setPositionValue("");
            setKeyName("");
            setUniqKeyName("");
            setContentType("");
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

  const [content, setContent] = useState([]);

  console.log(content, "content");
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
        `blocks_get?has_limit=1&access_token=${access_token}&page=${limit}&items_per_page=${end}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&active_status=${actveStatus}&order_field=${orderField}&order_type=${orderType}&section_id=${
          section_id ? section_id : ""
        }&contentblock_id=${contentblock_id}`
      )
      .then((response) => {
        // Handle the successful response here
        console.log(response.data, "ddd");
        console.log(response.data.access_token);
        setData(response.data.data);
        setdataCount(response.data.data_count);
        // setTableName(response.data.table_name);
        // settableDetails(response.data.table_details);
        setPageCount(response.data.total_pages);
        setPageNumber(limit === 0 ? 1 : limit);
        setDisplayType("block");

        // fetchData(
        //   ACCESS_TOKEN,
        //   limit,
        //   limitEnd,
        //   searchValue,
        //   createdStartDate,
        //   createdEndDate,
        //   actveStatus,
        //   data[0]?.ContentBlockID
        // );
        // setSelectedContentID(data[0].ContentBlockID);

        // setDataUniqId(response.data.PageID)
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  const [contentID, setContentID] = useState("");

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSectionID, setSelectedSectionID] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [displayType, setDisplayType] = useState("block");

  console.log(selectedSectionID, "selectedSectionID");

  const handleButtonClick = (index, id) => {
    console.log(id);
    setSelectedIndex(index);
    setSelectedSectionID(id);
    setShowBox(false);
    setButtonClicked(false);
    setDisplayType("block");
    setContent([]);
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

  const [selectedContentID, setSelectedContentID] = useState("");
  const [selectedBlockItem, setselectedBlockItem] = useState([]);

  const handleContentBlock = (id) => {
    console.log(id, "hihihi");
    setselectedBlockItem(id);
    setSelectedContentID(id.ContentBlockID);
    setDisplayType("list");
    setContent(id.block_items);
  };

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
    setBlockName();
    setUniqBlockName();
    setPositionValue();
    setSlugName();
    setTitle();
    setSubtitle();
    setDescription();
    setDescriptionTwo();
    setPicture();
    setPictureName();
    setPictureUrl();
    setBlockPath();
  };
  const toggleContentEditDrawer = (newOpen, type) => () => {
    // type 1 : Create
    // type 2 : Edit
    setOpenContentEditDrawer(newOpen);
    setOpenContentEditType(type);
    setContentType();
    setKeyName();
    setPositionValue();
    setTextValue();
    setKeyValuePairs();
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

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const base64String = reader.result.split(",")[1];
      const filename = file.name;
      const imageUrl = URL.createObjectURL(file);
      console.log(base64String);

      setMedia(base64String);
      setMediaName(filename);
      setMediaUrl(imageUrl);
    };
  };

  const handleItemMediaChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const base64String = reader.result.split(",")[1];
      const filename = file.name;
      const imageUrl = URL.createObjectURL(file);
      console.log(base64String);
      setNewContentItems((entries) =>
        entries.map((entry, i) =>
          i === index
            ? {
                ...entry,
                item_image: base64String,
                item_image_name: filename,
                media_url: imageUrl,
              }
            : entry
        )
      );
    };
  };

  const handleCancelItemUpload = (i) => {
    setMedia(null);
    setMediaName(null);
    setMediaUrl(null);
    setBlockPath();
  };
  const handleCancelUpload = (i) => {
    setMedia(null);
    setMediaName(null);
    setMediaUrl(null);
    setBlockPath();
  };

  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  const handleAdd = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
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
  const [contentType, setContentType] = useState("");

  const handleBlocks = () => {
    setShowBox(!showBox);
    setButtonClicked(true);
    setDisplayType("create");
  };
  const handleCloseDlt = () => {
    setDltOpen(false);
  };

  const handleDelteOpen = (item) => {
    setDltOpen(true);
    setSingleItem(item);
  };
  const handleDelteBlockOpen = (item) => {
    setDltBlockOpen(true);
    setSingleBlock(item);
  };
  const handleCloseBlock = () => {
    setDltBlockOpen(false);
  };

  const handleDelete = (item) => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      contentitems_id: singleItem.ContentItemID,
    };
    axiosPost
      .delete(`contentitems`, { data: jsonData })
      .then((response) => {
        handleClose2();
        setAlertMessage("Deleted successfully.");
        setAlertVisible(true);
        setSingleItem([]);
        setDisplayType("block");
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
        setAlertSeverity("success");
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };
  const handleDeleteBlock = (item) => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      contentblock_id: singleBlock.ContentBlockID,
    };
    axiosPost
      .delete(`blocks`, { data: jsonData })
      .then((response) => {
        handleClose2();
        setAlertMessage("Deleted successfully.");
        setAlertVisible(true);
        setSingleBlock([]);
        setDisplayType("block");
        fetchData(
          ACCESS_TOKEN,
          limit,
          limitEnd,
          searchValue,
          createdStartDate,
          createdEndDate,
          actveStatus,
          data[0]?.ContentBlockID
        );
        setAlertSeverity("success");
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };
  const router = useRouter();
  const [orderFields, setOrderFields] = useState("created_date");

  const [modelType, setmodelType] = useState("");
  const fetchModelTypeData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `model_master_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&order_field=${orderFields}&active_status=1`
      )
      .then((response) => {
        console.log("response", response);
        setmodelType(response.data.data);
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
    fetchModelTypeData();
  }, [
    ACCESS_TOKEN,
    pageNumber,
    limitEnd,
    searchValue,
    createdStartDate,
    createdEndDate,
    orderFields,
    orderType,
  ]);

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{ display: "flex", gap: 20 }}
        className="displey_space_between"
      ></div>
      <div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              pt: 1,
              px: 1,
              zIndex: 9,
              top: "0px",
              position: "sticky",
            }}
          >
            {/* {pages?.map((page, pageIndex) => ( */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() => router.push(`/content-blocks`)}
                >
                  <ArrowBack style={{ color: "black" }} />
                </IconButton>
                <Typography
                  variant="h4"
                  className="nunito_font"
                  color="primary"
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  {pageName}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1,height:1 }}>
              <Paper sx={{ width: '300px', height:1 }}>
                  <Typography
                    variant="h4"
                    className="nunito_font"
                    color="primary"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Section Details
                  </Typography>
                  {sections.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                        gap: "8px",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mb: 4,
                          margin: 2,
                          backgroundColor:
                            selectedIndex === index ? "primary" : "gray",
                          color: "primary",
                          "&:hover": {
                            backgroundColor:
                              selectedIndex === index ? "primary" : "gray",
                          },
                        }}
                        onClick={() => handleButtonClick(index, item.SectionID)}
                      >
                        {item.SectionName}
                      </Button>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Box>
            <div sx={{ display: "flex", gap: "2px" }}>
              {displayType === "create" && (
                <>
                  <Box sx={{ position: "relative", mt: 6 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Card
                        sx={{ py: 0.5, boxShadow: "none", marginTop: "2px" }}
                      >
                        <Box sx={{ p: 1, my: 1 }}>
                          <Grid container spacing={2}>
                            {/* Model Name */}
                            <Grid item xs={12} sm={6}>
                              {/* <CInput
                                label="Model Name"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)}
                                type={"block"}
                                name="Model Name"
                                onChange={(e) => setBlockName(e.target.value)}
                                helperText={postError?.block_name}
                                error={postError?.block_name}
                              /> */}
                              <FormControl
                                size="small"
                                fullWidth
                                error={!!postError?.block_name}
                              >
                                <Select
                                  id="model-select"
                                  value={blockName}
                                  onChange={(e) => setBlockName(e.target.value)}
                                  displayEmpty
                                  helperText={postError?.block_name}
                                  error={postError?.block_name}
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                    error={!!postError?.block_name}
                                  >
                                    Select Model
                                  </MenuItem>
                                  {modelType?.map((item) => (
                                    <MenuItem
                                      key={item.id}
                                      value={item.data_uniq_id}
                                    >
                                      {item.model}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <div class="red-small-text">
                                {postError?.block_name}
                              </div>
                            </Grid>

                            {/* Unique Model Name */}
                            <Grid item xs={12} sm={6}>
                              <CInput
                                label="Unique Model Name"
                                value={uniqBlockName}
                                type={"uniq"}
                                name="unique_contentblock_name"
                                onChange={(e) =>
                                  setUniqBlockName(e.target.value)
                                }
                                helperText={postError?.unique_contentblock_name}
                                error={postError?.unique_contentblock_name}
                              />
                            </Grid>

                            {/* Position */}
                            <Grid item xs={12} sm={6}>
                              <FormControl
                                size="small"
                                fullWidth
                                error={Boolean(postError?.position)}
                              >
                                <InputLabel
                                  sx={{ fontSize: "14px" }}
                                  id="position-label"
                                >
                                  Position
                                </InputLabel>
                                <Select
                                  labelId="position-label"
                                  id="position"
                                  value={positionValue}
                                  onChange={(e) =>
                                    setPositionValue(e.target.value)
                                  }
                                  label="Position"
                                  MenuProps={{
                                    PaperProps: {
                                      style: { maxHeight: "300px" },
                                    },
                                  }}
                                  helperText={postError?.position}
                                  error={postError?.position}
                                >
                                  {Array.from({ length: 20 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {postError?.position && (
                                  <FormHelperText>
                                    {postError.position}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>

                            {/* Model Type */}
                            <Grid item xs={12} sm={6}>
                              <CInput
                                label="Model Type"
                                value={title}
                                type={"slug"}
                                name="Model Type"
                                onChange={(e) => setTitle(e.target.value)}
                                helperText={postError?.title}
                                error={postError?.title}
                              />
                            </Grid>

                            {/* Passenger */}
                            <Grid item xs={12} sm={6}>
                              <CInput
                                label="Passenger"
                                value={subtitle}
                                type={"slug"}
                                fullWidth
                                name="Passenger"
                                onChange={(e) => {
                                  const regex = /^[0-9$.|]*$/; // Allow numbers, $, ., and |
                                  if (regex.test(e.target.value)) {
                                    setSubtitle(e.target.value); // Update state only if input is valid
                                  }
                                }}
                                helperText={postError?.description_two}
                                error={postError?.description_two}
                              />
                            </Grid>

                            {/* Slug */}
                            <Grid item xs={12} sm={6}>
                              <CInput
                                label="Slug"
                                value={slugName}
                                type={"slug"}
                                name="Slug"
                                onChange={(e) => setSlugName(e.target.value)}
                                helperText={postError?.slug}
                                error={postError?.slug}
                              />
                            </Grid>

                            {/* Status */}
                            <Grid item xs={12} sm={6}>
                              <FormControl
                                fullWidth
                                error={!!postError?.description}
                                size="small"
                              >
                                <InputLabel id="status-label">
                                  Status
                                </InputLabel>
                                <Select
                                  labelId="status-label"
                                  id="status-select"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  size="small"
                                >
                                  <MenuItem value="Available">
                                    Available
                                  </MenuItem>
                                  <MenuItem value="Unavailable">
                                    Unavailable
                                  </MenuItem>
                                </Select>
                                {postError?.description && (
                                  <FormHelperText>
                                    {postError.description}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>

                            {/* Price */}
                            <Grid item xs={12} sm={6}>
                              <CInput
                                id="outlined-multiline-flexible"
                                label="Price"
                                value={descriptionTwo}
                                onChange={(e) => {
                                  const regex = /^[0-9$-.\/s]*$/;
                                  if (regex.test(e.target.value)) {
                                    setDescriptionTwo(e.target.value);
                                  }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Stack sx={{ marginBottom: "16px", margin: 2 }}>
                          {pictureUrl ? (
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                border: "2px solid #ccc",
                                borderRadius: "10px",
                                padding: "8px",
                                textAlign: "center",
                                position: "relative",
                                margin: 4,
                              }}
                            >
                              <img
                                src={pictureUrl}
                                alt={pictureName}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  // borderRadius: '10px',
                                }}
                              />
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  top: "0px",
                                  left: "150px",
                                }}
                                onClick={resetFileInput}
                              >
                                <CloseOutlined sx={{ color: "black" }} />
                              </IconButton>
                            </div>
                          ) : (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onClick={handleFileChange}
                                style={{ display: "none" }}
                                id="upload-photo-1"
                              />
                              <label htmlFor="upload-photo-1">
                                <Button
                                  variant="contained"
                                  // onClick={handleClickFileInput}
                                  sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                                    "&:hover": {
                                      backgroundColor: "white",
                                    },
                                    mt: 2,
                                  }}
                                  component="span"
                                >
                                  <FileUploadOutlinedIcon
                                    sx={{ width: "20px" }}
                                  />{" "}
                                  Upload Photo
                                </Button>
                                <p class="small-grey-text">
                                  The maximum file size that can be uploaded is
                                  1.5 MB.
                                </p>
                              </label>
                            </>
                          )}
                        </Stack>
                        {/* Save Button */}
                        <Grid item xs={12} sx={{ textAlign: "end" }}>
                          <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ width: "100px", marginBottom: "8px" }}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Card>
                    </Box>
                  </Box>
                </>
              )}

              {displayType === "block" && (
                <>
                  <Button variant="contained" onClick={handleBlocks}>
                    Add New Block
                  </Button>

                  <Grid container spacing={2} direction="row" wrap="wrap">
                    {data?.map((item, index) => (
                      <Grid
                        item
                        key={index}
                        xs={12} // Full width on small screens
                        sm={4} // Half width on medium screens
                        md={4} // One-third width on larger screens
                        // lg={3} // One-fourth width on extra large screens
                        sx={{ position: "relative", mt: 4 }}
                      >
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            py: 0.5,
                            boxShadow: "none",
                            maxWidth: 700,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div sx={{ display: "flex", flexDirection: "row" }}>
                              <Typography
                                sx={{
                                  fontSize: { xs: 13, md: 15 },
                                  fontWeight: 700,
                                  px: 2,
                                  py: 1.5,
                                  width: "200px",
                                }}
                              >
                                {item.BlockNames}
                              </Typography>
                            </div>
                            <div
                              sx={{
                                display: "flex",
                                justifyContent: "end",
                                width: "100px",
                              }}
                            >
                              <Badge
                                color="secondary"
                                variant="dot"
                                invisible={!handlefilterBadgeVisible()}
                                onClick={() => handleClickView(item)}
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
                                onClick={() => handleClickEdit(item)}
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
                                onClick={() => handleDelteBlockOpen(item)}
                              >
                                <DeleteButton
                                  HandleChangeDelete={HandleChangeDelete}
                                  deleteList={deleteList}
                                />
                              </Badge>
                            </div>
                          </div>
                          {item.BlockImage ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center", // Center horizontally
                                alignItems: "center", // Center vertically (optional, if needed)
                                width: "100%", // Ensure the container spans the full width
                              }}
                            >
                              <img
                                src={item.BlockImage}
                                style={{
                                  width: "100%",
                                  height: "150px", // Avoid using responsive units like { xs, md } here
                                  objectFit: "contain",
                                  borderRadius: "10px",
                                  maxWidth: 250,
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                              style={{
                                width: "100%",
                                height: { xs: "150px", md: "200px" },
                                objectFit: "contain",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                            />
                          )}
                          <div style={{ display: "flex" }}>
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 400, px: 3 }}
                            >
                              Slug:
                            </Typography>
                            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                              {item.Slug}
                            </Typography>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 400, px: 3 }}
                            >
                              Position:
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                              {item.Position}
                            </Typography>
                          </div>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {displayType === "list" && (
                <>
                  {selectedBlockItem?.block_items?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "200%",
                        maxWidth: "700px",
                        position: "relative",
                        mt: 4,
                      }}
                    >
                      <Card sx={{ py: 0.5, boxShadow: "none", margin: 2 }}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <div sx={{ display: "flex" }}>
                            <Badge
                              color="secondary"
                              variant="dot"
                              invisible={!handlefilterBadgeVisible()}
                              onClick={() => handleContentEdit(item)}
                              sx={{ marginRight: 2, margin: 1 }}
                            >
                              <EditButton
                                HandleChangeEdit={() => HandleChangeEdit(item)}
                                editList={editList}
                              />
                            </Badge>
                            <Badge
                              color="secondary"
                              variant="dot"
                              invisible={!handlefilterBadgeVisible()}
                              onClick={() => handleDelteOpen(item)}
                              sx={{ marginRight: 2, margin: 1 }}
                            >
                              <DeleteButton
                                HandleChangeDelete={HandleChangeDelete}
                                deleteList={deleteList}
                              />
                            </Badge>
                          </div>
                        </div>

                        <div style={{ display: "flex" }}>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 400, px: 4 }}
                          >
                            Content Type:
                          </Typography>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                            {item.ContentType}
                          </Typography>
                        </div>
                        <div style={{ display: "flex" }}>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 400, px: 4 }}
                          >
                            Key Name:
                          </Typography>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                            {item.KeyName}
                          </Typography>
                        </div>
                        <div style={{ display: "flex" }}>
                          <Typography
                            sx={{ fontSize: 14, fontWeight: 400, px: 4 }}
                          >
                            Position:
                          </Typography>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                            {item.Position}
                          </Typography>
                        </div>

                        <div style={{ display: "flex" }}>
                          {item.ContentType === "text" ? (
                            <Box
                              sx={{
                                fontSize: 14,
                                backgroundColor: "#F6F6F6",
                                borderRadius: "10px",
                                py: 2,
                                display: "flex",
                                margin: 2,
                                width: "100%",
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              {item?.Content}
                            </Box>
                          ) : (
                            <>
                              <img
                                src={item.MediaID}
                                style={{
                                  maxWidth: "100%",
                                  borderRadius: "10px",
                                  alignContent: "center",
                                }}
                              />
                            </>
                          )}
                        </div>
                      </Card>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                      margin: 1,
                    }}
                    onClick={handleContent}
                  >
                    {" "}
                    +Add Content Type{" "}
                  </Button>
                </>
              )}
            </div>
          </Box>
        </Box>
      </div>

      <Drawer
        anchor={"right"}
        open={openEditDrawer}
        onClose={toggleEditDrawer(false)}
      >
        <Box sx={{ width: "600px", pb: 1 }}>
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

            <Box display={"flex"} gap={1}>
              <Button variant="contained" onClick={handleEditSubmit}>
                Update
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 1, px: 2, my: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              {/* <CInput
                label="Model Name"
                value={blockName}
                type={"block"}
                name="BlockName"
                onChange={(e) => setBlockName(e.target.value)}
                helperText={postError?.block_name}
                error={postError?.block_name}
              /> */}

              <FormControl
                size="small"
                fullWidth
                error={!!postError?.block_name}
                helperText={postError?.block_name}
              >
                <Select
                  id="model-select"
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  displayEmpty
                >
                  <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                    Select Model
                  </InputLabel>
                  {Array.isArray(modelType) &&
                    modelType.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.data_uniq_id}
                        helperText={postError?.block_name}
                        error={postError?.block_name}
                      >
                        {item.model}
                      </MenuItem>
                    ))}
                </Select>
                {postError?.block_name && (
                  <FormHelperText>{postError.block_name}</FormHelperText>
                )}
              </FormControl>

              <CInput
                label="Unique Model Name"
                value={uniqBlockName}
                type={"text"}
                disabled
                name="UniqueContentBlockName"
                onChange={(e) => setUniqBlockName(e.target.value)}
                helperText={postError?.unique_contentblock_name}
                error={postError?.unique_contentblock_name}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <CInput
                label="Model Type"
                value={title}
                type={"text"}
                name="Model Type"
                onChange={(e) => setTitle(e.target.value)}
                helperText={postError?.title}
                error={postError?.title}
              />
              <CInput
                label="Passengers"
                value={subtitle}
                type={"text"}
                fullWidth
                name="Passengers"
                onChange={(e) => {
                  const regex = /^[0-9$.|]*$/; // Allow numbers, $, ., and |
                  if (regex.test(e.target.value)) {
                    setSubtitle(e.target.value); // Update state only if input is valid
                  }
                }}
                helperText={postError?.description_two}
                error={postError?.description_two}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <CInput
                label="Slug"
                value={slugName}
                type={"slug"}
                name="Slug"
                onChange={(e) => setSlugName(e.target.value)}
                helperText={postError?.slug}
                error={postError?.slug}
              />
              <FormControl
                size="small"
                fullWidth
                error={Boolean(postError?.position)}
                sx={{ width: "100%" }}
              >
                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                  Position
                </InputLabel>
                <Select
                  labelId="position-label"
                  id="position"
                  value={positionValue}
                  onChange={(e) => setPositionValue(e.target.value)}
                  label="Position"
                  MenuProps={{ PaperProps: { style: { maxHeight: "300px" } } }}
                  helperText={postError?.position}
                  error={postError?.position}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
                {postError?.position && (
                  <div className="red-small-text">{postError?.position}</div>
                )}
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <FormControl
                fullWidth
                error={!!postError?.description}
                size="small"
              >
                {/* <InputLabel id="status-label">Status</InputLabel> */}
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  size="small"
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Unavailable">Unavailable</MenuItem>
                </Select>
                {postError?.description && (
                  <FormHelperText>{postError.description}</FormHelperText>
                )}
              </FormControl>

              <TextField
                id="outlined-multiline-flexible"
                label="Price"
                value={descriptionTwo}
                name="Price"
                onChange={(e) => {
                  const regex = /^[0-9$-.\/s]*$/;
                  if (regex.test(e.target.value)) {
                    setDescriptionTwo(e.target.value);
                  }
                }}
                sx={{ width: "100%", marginTop: "10px" }}
              />
            </Box>
            <Stack sx={{ marginTop: "16px" }}>
              {pictureUrl ? (
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    border: "2px dashed #ccc",
                    borderRadius: "150px",
                    padding: "8px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "150px",
                    }}
                    src={pictureUrl}
                    alt={pictureName}
                  />
                  <IconButton
                    sx={{
                      padding: 0.5,
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#f44336",
                    }}
                    onClick={resetFileInput}
                  >
                    <CloseOutlined sx={{ color: "#fff" }} />
                  </IconButton>
                </div>
              ) : (
                <label htmlFor="image-upload">
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      border: "2px dashed #ccc",
                      borderRadius: "150px",
                      padding: "8px",
                      textAlign: "center",
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
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </Stack>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor={"right"}
        open={openContentEditDrawer}
        onClose={toggleContentEditDrawer(false)}
      >
        <Box sx={{ width: "600px", pb: 1 }}>
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

            <Box display={"flex"} gap={1}>
              <Button variant="contained" onClick={handleContentEditSubmit}>
                Update
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 1, px: 2, my: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <FormControl
                size="small"
                fullWidth
                error={Boolean(postError?.contenttype)}
                sx={{ width: "700px" }}
              >
                <InputLabel sx={{ fontSize: "14px" }} id="content-label">
                  Content Type
                </InputLabel>
                <Select
                  labelId="content-label"
                  id="content-type"
                  value={contentType}
                  onChange={(e, v) => handleChangeContent(e.target.value, v)}
                  disabled={true}
                  label="Content Type"
                  helperText={postError?.contenttype}
                  error={postError?.contenttype}
                >
                  <MenuItem value="text" sx={{ fontSize: "14px" }}>
                    Text
                  </MenuItem>
                  <MenuItem value="media" sx={{ fontSize: "14px" }}>
                    Media
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                fullWidth
                error={Boolean(postError?.Position)}
              >
                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                  Position
                </InputLabel>
                <Select
                  labelId="position-label"
                  id="position"
                  value={positionValue}
                  onChange={(e) => setPositionValue(e.target.value)}
                  disabled={true}
                  label="Position"
                  helperText={postError?.position}
                  error={postError?.position}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <CInput
                label="Key Name"
                value={keyName}
                type="text"
                name="keyName" 
                onChange={(e) => setKeyName(e.target.value)}
                disabled
                helperText={postError?.key_name}
                error={postError?.key_name}
              />

              <CInput
                label="Unique Key Name"
                value={uniqKeyName}
                type="text" disabled
                name="UniqueKeyName"
                onChange={(e) => setUniqKeyName(e.target.value)}
                helperText={postError?.unique_keyname}
                error={postError?.unique_keyname}
              />
            </Box>

            {contentType === "text" && (
              <TextField
                id="outlined-multiline-flexible"
                label="Text"
                value={contentValue}
                multiline
                onChange={(e) => setContentValue(e.target.value)}
                sx={{ width: "100%", marginTop: "10px" }}
                helperText={postError?.content}
                error={postError?.content}
              />
            )}
            {contentType === "media" && (
              <div>
                {mediaUrl ? (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "2px solid #ccc",
                      borderRadius: "10px",
                      padding: "8px",
                      textAlign: "center",
                      position: "relative",
                      margin: 4,
                    }}
                  >
                    <img
                      src={mediaUrl}
                      alt={mediaName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        // borderRadius: '10px',
                      }}
                    />
                    <IconButton
                      sx={{ position: "absolute", top: "0px", left: "150px" }}
                      onClick={handleCancelUpload}
                    >
                      <CloseOutlined sx={{ color: "black" }} />
                    </IconButton>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMediaChange}
                      style={{ display: "none" }}
                      id="upload-photo"
                    />

                    <label htmlFor="upload-photo">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                          mt: 2,
                          margin: 2,
                        }}
                        component="span"
                      >
                        <FileUploadOutlinedIcon sx={{ width: "20px" }} /> Upload
                        Photo
                      </Button>
                    </label>
                  </>
                )}
              </div>
            )}
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor={"right"}
        open={openContentDrawer}
        onClose={toggleContentDrawer(false)}
      >
        <Box sx={{ width: "600px", pb: 1 }}>
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

            <Box display={"flex"} gap={1}>
              <Button variant="contained" onClick={handleContentSubmit}>
                Create
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 1, px: 2, my: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <FormControl
                size="small"
                fullWidth
                error={Boolean(postError?.contenttype)}
                sx={{ width: "700px" }}
              >
                <InputLabel sx={{ fontSize: "14px" }} id="content-label">
                  Content Type
                </InputLabel>
                <Select
                  labelId="content-label"
                  id="content-type"
                  value={contentType}
                  onChange={(e, v) => handleChangeContent(e.target.value, v)}
                  label="Content Type"
                  helperText={postError?.contenttype}
                  error={postError?.contenttype}
                >
                  <MenuItem value="text" sx={{ fontSize: "14px" }}>
                    Text
                  </MenuItem>
                  <MenuItem value="media" sx={{ fontSize: "14px" }}>
                    Media
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                fullWidth
                error={Boolean(postError?.position)}
              >
                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                  Position
                </InputLabel>
                <Select
                  labelId="position-label"
                  id="position"
                  value={positionValue}
                  onChange={(e) => setPositionValue(e.target.value)}
                  label="Position"
                  helperText={postError?.position}
                  error={postError?.position}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <CInput
                label="Key Name"
                value={keyName}
                type="text"
                name="keyName"
                onChange={(e) => setKeyName(e.target.value)}
                helperText={postError?.key_name}
                error={postError?.key_name}
              />

              <CInput
                label="Unique Key Name"
                value={uniqKeyName}
                type="text"
                name="UniqueKeyName"
                onChange={(e) => setUniqKeyName(e.target.value)}
                helperText={postError?.unique_keyname}
                error={postError?.unique_keyname}
              />
            </Box>

            {contentType === "text" && (
              <TextField
                id="outlined-multiline-flexible"
                label="Text"
                multiline
                sx={{ width: "100%", marginTop: "10px" }}
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
                helperText={postError?.content}
                error={postError?.content}
              />
            )}
            {contentType === "media" && (
              <div>
                {mediaUrl ? (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "2px solid #ccc",
                      borderRadius: "10px",
                      padding: "8px",
                      textAlign: "center",
                      position: "relative",
                      margin: 4,
                    }}
                  >
                    <img
                      src={mediaUrl}
                      alt={mediaName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        // borderRadius: '10px',
                      }}
                    />
                    <IconButton
                      sx={{ position: "absolute", top: "0px", left: "150px" }}
                      onClick={handleCancelUpload}
                    >
                      <CloseOutlined sx={{ color: "black" }} />
                    </IconButton>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMediaChange}
                      style={{ display: "none" }}
                      id="upload-photo"
                    />
                    <label htmlFor="upload-photo">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                          mt: 2,
                          margin: 2,
                        }}
                        component="span"
                      >
                        <FileUploadOutlinedIcon sx={{ width: "20px" }} /> Upload
                        Photo
                      </Button>
                    </label>
                  </>
                )}
              </div>
            )}
          </Box>
        </Box>
      </Drawer>

      <Drawer
        anchor={"right"}
        open={openViewDrawer}
        onClose={toggleViewDrawer(false)}
      >
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
                  {singleData.BlockImage ? (
                    <div
                      style={{
                        width: "130px",
                        height: "130px",
                        border: "2px  #ccc",
                        // borderRadius: '10px',
                        // padding: '4px',
                        // textAlign: 'center',
                        position: "relative",
                        // margin: "0 auto 10px"
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                        src={singleData.BlockImage}
                        alt={pictureName}
                      />
                    </div>
                  ) : null}
                  <Box
                    px={2}
                    fontSize={"14px"}
                    display={"flex"}
                    gap={1.5}
                    padding={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      Block Name
                      <span>:</span>
                    </Typography>
                    <Typography
                      variant="body"
                      align="left"
                      width={1}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {singleData.BlockNames}
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      Unique Block Name
                      <span>:</span>
                    </Typography>
                    <Typography
                      variant="body"
                      align="left"
                      width={1}
                      sx={{ textTransform: "capitalize" }}
                    >
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      Slug
                      <span>:</span>
                    </Typography>
                    <Typography
                      variant="body"
                      align="left"
                      textTransform={"capitalize"}
                      width={1}
                    >
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      Description
                      <span>:</span>
                    </Typography>
                    <Typography
                      variant="body"
                      align="left"
                      textTransform={"capitalize"}
                      width={1}
                    >
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
                    <Typography
                      variant="body1"
                      width={"177px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      Description
                      <span>:</span>
                    </Typography>
                    <Typography
                      variant="body"
                      align="left"
                      textTransform={"capitalize"}
                      width={1}
                    >
                      {singleData.DescriptionTwo}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>
      <AlertDialog
        onsubmit={handleDelete}
        open={dltOpen}
        handleClose={handleCloseDlt}
        text={"Are you sure want to Delete?"}
      ></AlertDialog>
      <AlertDialog
        onsubmit={handleDeleteBlock}
        open={dltBlockOpen}
        handleClose={handleCloseBlock}
        text={"Are you sure want to Delete?"}
      ></AlertDialog>
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
