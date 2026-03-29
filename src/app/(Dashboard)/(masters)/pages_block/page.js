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
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
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

  const [pages, setPages] = useState([])
  const [pageName, setPageName] = useState([]);
  const HandleChangePageName = (event, value) => {
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


  const [selectedContentID, setSelectedContentID] = useState('')
  const [selectedBlockItem, setselectedBlockItem] = useState([])


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
    const fileInput = document.getElementById("upload-photo-1")
    fileInput.click()
  }

  const handleFileChange = (event) => {
    // Check if a file is selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate that the file is a Blob or File object
      if (file instanceof Blob) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (e) => {
          const base64String = reader.result.split(',')[1];
          const filename = file.name;
          const imageUrl = URL.createObjectURL(file);
          setPicture(base64String);
          setPictureName(filename);
          setPictureUrl(imageUrl);
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
      } else {
        console.error('Selected file is not a valid Blob or File object.');
      }
    } else {
      console.error('No file selected.');
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.readAsDataURL(file)

  //   reader.onload = (e) => {
  //     const base64String = reader.result.split(',')[1];
  //     const filename = file.name;
  //     const imageUrl = URL.createObjectURL(file);
  //     setPicture(base64String);
  //     setPictureName(filename);
  //     setPictureUrl(imageUrl)
  //   };

  // };

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
    seteditList(!editList);
    // setContentValue(value.ContentType)
  };
  const [contentList, setContentList] = useState('')
  const HandleChangeList = () => {
    setContentList(!contentList);
  };
  const [deleteList, setDeleteList] = useState('')
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


  const [keyName, setKeyName] = useState('');
  const [price, setPrice] = useState('');
  const [uniqKeyName, setUniqKeyName] = useState('');
  const [position, SetPosition] = useState();
  const [positionValue, setPositionValue] = useState(1)

  // Funtion to change active status for filter



  const [contentID, setContentID] = useState('')

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSectionID, setSelectedSectionID] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [displayType, setDisplayType] = useState("block");
  // Page action's state and funtions (create, Edit, Status change, Delete) ----
  const [dataUniqId, setDataUniqId] = useState("");
  const [dataStatus, setDataStatus] = useState(1);
  const [data, setData] = useState([]);

  const [singleData, setSingleData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [postError, setPostError] = useState([]);
  const [sectionID, setSectionID] = useState('')
  const [sections, setsections] = useState([])
  const [blockPath, setBlockPath] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionTwo, setDescriptionTwo] = useState('')
  const [newContentItems, setNewContentItems] = useState([{
    contenttype: "text", price: '',
    key_name: "",
    position: "",
    unique_keyname: "",
    content: "",
  }])

  const handleAddNewConentItems = () => {
    setNewContentItems([...newContentItems, {
      contenttype: "text", price: '',
      key_name: "",
      position: "",
      unique_keyname: "",
      content: "",
    }])

  }

  const handleChangeConentItems = (index, key, value) => {
    setNewContentItems((entries) =>
      entries.map((entry, i) =>
        i === index ? { ...entry, [key]: value } : entry
      )
    );
  }

  const handleRemoveDocument = (index) => {
    setNewContentItems((entries) => entries.filter((_, i) => i !== index));
  };

  const [contentValue, setContentValue] = useState('')


  const [keyValue, setKeyValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleChangeContent = (event) => {
    setContentType(event)
    setContentValue(event);
    // Reset other state values if necessary
    setKeyValue('');
    setKeyValuePairs('')
    setTextValue('');
  };

  const [modelType, setmodelType] = useState([]);
  const fetchModelTypeData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `model_master_get?access_token=${ACCESS_TOKEN}&order_field=created_date&active_status=1`
      )
      .then((response) => {
        setmodelType(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchModelTypeData();
  }, []);

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


  useEffect(() => {
    if (uuid) {
      fetchPage();
      fetchSection();
      fetchModelTypeData();
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
        const Page = response.data.data[0]?.page_name
        setsections(data)
        setPageName(Page)
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
        setSelectedSectionID(data[0].SectionID)
        setSelectedIndex(0)
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

  const handleClickEdit = (item) => {

    toggleEditDrawer(true);
    // toggleDrawer(true, 2)
    // setOpenDrawerType(2);
    setOpenEditDrawer(true);
    setBlockName(item.BlockName)
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
    setSelectedSectionID(item.SectionID)
    setSelectedContentID(item.ContentBlockID)
  }


  const [contentItemsID, setContentItemsId] = useState('')

  const handleContentEdit = (item) => {
    toggleContentEditDrawer(true);
    setOpenContentEditDrawer(true);
    setContentType(item.ContentType)
    setPositionValue(item.Position)
    setPrice(item.price)
    setKeyName(item.KeyName)
    setUniqKeyName(item.UniqueKeyName)
    setContentItemsId(item.ContentItemID)
    setContentValue(item.Content)
    setMediaUrl(item.MediaID)


  }
  const handleContent = () => {
    toggleContentDrawer(true)
    setOpenContentDrawer(true)

  }
  const handleClickView = (item) => {
    toggleViewDrawer(true);
    setOpenViewDrawer(true)
    setDataUniqId(item.data_uniq_id);
    setSingleData(item)
  }

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
      // price: price
    };
    try {

      axiosPost
        .post(`blocks`, jsonStructure)
        .then((response) => {
          // Handle the successful POST response here
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
            setDisplayType('list')
            setShowBox(false);
            setButtonClicked(false)
            setBlockName('')
            setUniqBlockName('')
            setSlugName('')
            setPositionValue('')
            setDescription('')
            setDescriptionTwo('')
            setNewContentItems('')
            setPicture('')
            setContentBlockID('')
            setTitle('')
            setSubtitle('')

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
      contenttype: 'text',
      // contenttype: contentType,
      content: contentValue,
      key_name: keyName,
      unique_keyname: uniqKeyName,
      position: positionValue,
      content_block_id: selectedContentID,
      access_token: ACCESS_TOKEN,
      contentblock_id: contentBlockID,
      item_image_name: mediaName,
      item_image: media,
      price: price
    };
    try {

      axiosPost
        .post(`contentitems`, jsonStructure)
        .then((response) => {
          // Handle the successful POST response here
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
            setContentValue('')
            setPositionValue('')
            setKeyName('')
            setUniqKeyName('')
            setContentType('')

            setShowBox(false);
            setOpenContentDrawer(false)
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
      SectionID: selectedSectionID,
      position: positionValue,
      block_image: picture,
      image_name: pictureName,
      block_image_path: blockPath,
      access_token: ACCESS_TOKEN,
      contentblock_id: selectedContentID

    };
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
            setOpenEditDrawer(false)
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
      contenttype: 'text',
      // contenttype: contentType,
      content: contentValue,
      key_name: keyName,
      unique_keyname: uniqKeyName,
      position: positionValue,
      content_block_id: selectedContentID,
      access_token: ACCESS_TOKEN,
      contentitems_id: contentItemsID,
      item_image_name: mediaName,
      item_image: media,
      price: price
    };
    try {
      axiosPost
        .put(`contentitems`, jsonData)
        .then((response) => {
          if (response.data.action === "success") {
            fetchData(ACCESS_TOKEN, limit, limitEnd, searchValue, createdStartDate, createdEndDate, actveStatus, selectedSectionID)
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            setIsLoading(false);
            setOpenContentEditDrawer(false)
            setContentValue('')
            setPositionValue('')
            setKeyName('')
            setUniqKeyName('')
            setContentType('')


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
        setData(response.data.data);
        setdataCount(response.data.data_count);
        // setTableName(response.data.table_name);
        // settableDetails(response.data.table_details);
        setPageCount(response.data.total_pages);
        setPageNumber(limit === 0 ? 1 : limit);
        setDisplayType("block")

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
        // setSelectedContentID(data[0].ContentBlockID)

        // setDataUniqId(response.data.PageID)
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };






  const handleButtonClick = (index, id) => {
    setSelectedIndex(index)
    setSelectedSectionID(id);
    setShowBox(false)
    setButtonClicked(false)
    setDisplayType("block")
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

  const handleContentBlock = (id) => {
    setselectedBlockItem(id)
    setSelectedContentID(id.ContentBlockID);
    setDisplayType("list")
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

      setMedia(base64String);
      setMediaName(filename);
      setMediaUrl(imageUrl)
    };
  };

  const handleItemMediaChange = (event, index) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.onload = (e) => {
      const base64String = reader.result.split(',')[1];
      const filename = file.name;
      const imageUrl = URL.createObjectURL(file);
      setNewContentItems((entries) =>
        entries.map((entry, i) =>
          i === index ? { ...entry, item_image: base64String, item_image_name: filename, media_url: imageUrl } : entry
        )
      );
    };
  };

  const handleCancelItemUpload = (i) => {
    setMedia(null);
    setMediaName(null)
    setMediaUrl(null);
    setBlockPath()
  };
  const handleCancelUpload = (i) => {
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
    setDisplayType("create")
  }
  const handleCloseDlt = () => {
    setDltOpen(false);
  };

  const handleDelteOpen = (item) => {
    setDltOpen(true);
    setSingleItem(item)
  };
  const handleDelteBlockOpen = (item) => {
    setDltBlockOpen(true);
    setSingleBlock(item)
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

        setDltOpen(false);
        setAlertMessage("Deleted successfully.");
        setAlertVisible(true);
        setSingleItem([])
        setDisplayType("block")
        fetchData(
          ACCESS_TOKEN,
          limit,
          limitEnd,
          searchValue,
          createdStartDate,
          createdEndDate,
          actveStatus,
          selectedSectionID,
          selectedContentID
        )
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

        setDltBlockOpen(false);
        setAlertMessage("Deleted successfully.");
        setAlertVisible(true);
        setSingleBlock([])
        setDisplayType("block")
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
        setAlertSeverity("success");
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };
  const router = useRouter()





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
                <IconButton size="small" onClick={() => router.push(`/content-blocks`)}>
                  <ArrowBack style={{ color: 'black' }} />
                </IconButton>
                <Typography
                  variant="h4"
                  className="nunito_font"
                  color="primary"
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '6px',
                  }}
                >
                  {pageName}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, height: 1 }}>
                <Paper sx={{ width: '300px', }}>
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
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mb: 4,
                          margin: 2,
                          backgroundColor: selectedIndex === index ? 'primary' : 'gray',
                          color: 'primary',
                          '&:hover': {
                            backgroundColor: selectedIndex === index ? 'primary' : 'gray',
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
            <Box sx={{ width: 1 }}>

              {displayType === 'create' && (
                <>

                  <Box sx={{ position: 'relative', mt: 6, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Button variant="contained" onClick={handleSubmit} sx={{ width: '100px', marginBottom: '8px', }}>
                        Save
                      </Button>

                      <Card sx={{ p: 2, boxShadow: 'none', marginTop: '2px' }}>
                        <Grid container spacing={2}>

                          <Grid item xs={6} md={3}>

                            <FormControl
                              size="small"
                              fullWidth
                              error={!!postError?.block_name}
                            >

                              <InputLabel id="model-select">Model Type</InputLabel>
                              <Select
                                id="model-select"
                                value={blockName}
                                onChange={(e) => setBlockName(e.target.value)}
                                displayEmpty
                                helperText={postError?.block_name}
                                error={postError?.block_name}
                                label="Model type"
                              >
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
                          <Grid item xs={6} md={3}>
                            <CInput
                              label="Unique Block Name"
                              value={uniqBlockName}
                              type={"uniq"}
                              name="unique_contentblock_name"
                              onChange={(e) => setUniqBlockName(e.target.value)}
                              helperText={postError?.unique_contentblock_name}
                              error={postError?.unique_contentblock_name}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <FormControl size="small" fullWidth error={Boolean(postError?.position)}>
                              <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                Position
                              </InputLabel>
                              <Select
                                labelId="position-label"
                                id="position"
                                value={positionValue}
                                onChange={(e) => setPositionValue(e.target.value)}
                                label="Position"
                                MenuProps={{ PaperProps: { style: { maxHeight: '300px' } } }}
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
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <CInput
                              label="Title"
                              value={title}
                              type={"slug"}
                              name="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              helperText={postError?.title}
                              error={postError?.title}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <CInput
                              label="Passenger"
                              value={subtitle}
                              type={"slug"}
                              fullWidth
                              name="SubTitle"
                              onChange={(e) => setSubtitle(e.target.value)}
                              helperText={postError?.subtitle}
                              error={postError?.subtitle}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <CInput
                              label="Slug"
                              value={slugName}
                              type={"slug"}
                              name="Slug"
                              onChange={(e) => setSlugName(e.target.value)}
                              helperText={postError?.slug}
                              error={postError?.slug}
                            /></Grid>
                        </Grid>
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
                                id="upload-photo-1"
                              />
                              <label htmlFor="upload-photo-1">
                                <Button variant="contained"
                                  // onClick={handleClickFileInput}
                                  sx={{
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
                              </label>
                            </>
                          )}
                        </Stack>

                        {/* Status */}
                        <FormControl
                          fullWidth
                          error={!!postError?.description}
                          size="small" sx={{ width: '97%', marginTop: '5px', margin: 2 }}
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
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Description Two"
                          value={descriptionTwo}
                          onChange={(e) => setDescriptionTwo(e.target.value)}
                          helperText={postError?.description_two}
                          error={postError?.description_two}
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
                          {newContentItems.map((item, index) => (
                            <GridContainer
                              sx={{ pb: 1, marginTop: '10px' }}
                            >
                              {/* <Grid item xs={3} md={3} >
                                <FormControl size="small" fullWidth error={Boolean(postError?.Position)}>
                                  <InputLabel sx={{ fontSize: "14px" }} id="content-label">
                                    Content Type
                                  </InputLabel>
                                  <Select
                                    labelId="content-label"
                                    id="content-type"
                                    value={item.contenttype}
                                    onChange={(e) => handleChangeConentItems(index, "contenttype", e.target.value)}
                                    label="Content Type"
                                  >


                                    <MenuItem value="text" sx={{ fontSize: "14px" }}>
                                      Text
                                    </MenuItem>
                                    <MenuItem value="media" sx={{ fontSize: "14px" }}>
                                      Media
                                    </MenuItem>

                                  </Select>
                                  {postError?.contenttype && <FormHelperText>{postError.contenttype}</FormHelperText>}
                                </FormControl>
                              </Grid> */}
                              <Grid item xs={2} md={2}>
                                <FormControl size="small" fullWidth error={Boolean(postError?.Position)} >
                                  <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                                    Position
                                  </InputLabel>
                                  <Select
                                    labelId="position-label"
                                    id="position"
                                    value={item.position}
                                    onChange={(e) => handleChangeConentItems(index, "position", e.target.value)}
                                    label="Position"
                                    MenuProps={{ PaperProps: { style: { maxHeight: '300px' } } }}
                                  >
                                    {Array.from({ length: 20 }, (_, i) => (
                                      <MenuItem key={i + 1} value={i + 1}>
                                        {i + 1}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {postError?.Position && <FormHelperText>{postError.Position}</FormHelperText>}
                                </FormControl>
                              </Grid>
                              <Grid item xs={3} md={3}>
                                <CInput
                                  label="Key Name"
                                  value={item.key_name}
                                  type="text"
                                  name="keyName"
                                  onChange={(e) => handleChangeConentItems(index, "key_name", e.target.value)}

                                  helperText={postError?.key_name}
                                  error={postError?.key_name}
                                />

                              </Grid>
                              <Grid item xs={3} md={3}>
                                <CInput
                                  label="Unique Key Name"
                                  value={item.unique_keyname}
                                  type='text'
                                  name="UniqueKeyName"
                                  onChange={(e) => handleChangeConentItems(index, "unique_keyname", e.target.value)}
                                  helperText={postError?.unique_keyname}
                                  error={postError?.unique_keyname}
                                />
                              </Grid>
                              <Grid item xs={3} md={2}>
                                <CInput
                                  label="Price"
                                  value={item.price}
                                  type='text'
                                  name="price"
                                  onChange={(e) => handleChangeConentItems(index, "price", e.target.value)}
                                  helperText={postError?.price}
                                  error={postError?.price}
                                />
                              </Grid>

                              {/* {contentValue === 'json' && (
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
                              )} */}
                              <Grid item xs={3} md={2}>
                                <CInput
                                  label="Text"
                                  value={item.content}
                                  type='text'
                                  name="content"
                                  onChange={(e) => handleChangeConentItems(index, "content", e.target.value)}
                                  helperText={postError?.content}
                                  error={postError?.content}
                                />
                                {/* // <TextField
                                  //   id="outlined-multiline-flexible"
                                  //   label="Text"
                                  //   value={item.content}
                                  //   multiline
                                  //   sx={{ width: '100%', marginTop: '10px' }}
                                  //   onChange={(e) => handleChangeConentItems(index, "content", e.target.value)}
                                  //   helperText={postError?.content}
                                  //   error={postError?.content}
                                  // /> */}

                              </Grid>

                            </GridContainer>
                          ))}

                        </Grid>
                        <Button variant="contained"
                          onClick={handleAddNewConentItems}
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
                      </Card>
                    </Box></Box>
                </>
              )}

              {displayType === 'block' && (<>
                <Button variant="contained" onClick={handleBlocks}>
                  Add New Block
                </Button>

                <Grid container spacing={2} sx={{ width: 1 }}>
                  {data?.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={index}
                      sx={{ position: 'relative', mt: 4 }}
                    >
                      <Card sx={{ width: '100%', height: { xs: 'auto', md: 'auto' }, py: 0.5, boxShadow: 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography
                            sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 700, px: 2, py: 1.5, width: '200px' }}
                            color=""
                          >
                            {item.BlockNames}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'end', width: '200px', p: '4px', pr: 1, gap: 0.5 }}>
                            <Badge
                              color="secondary"
                              variant="dot"
                              invisible={!handlefilterBadgeVisible()}
                              onClick={() => handleClickView(item)}

                            >
                              <ViewButton HandleChangeView={HandleChangeView} viewList={viewList} />
                            </Badge>
                            <Badge
                              color="secondary"
                              variant="dot"
                              invisible={!handlefilterBadgeVisible()}
                              onClick={() => handleClickEdit(item)}

                            >
                              <EditButton HandleChangeEdit={HandleChangeEdit} editList={editList} />
                            </Badge>
                            <Badge
                              color="secondary"
                              variant="dot"
                              invisible={!handlefilterBadgeVisible()}
                              onClick={() => handleContentBlock(item)}

                            >
                              <ListButton HandleChangeList={HandleChangeList} contentList={contentList} />
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
                          </Box>
                        </div>
                        {item.BlockImage ? (
                          <img
                            src={item.BlockImage}
                            style={{
                              width: '100%',
                              height: { xs: '200px', md: '300px' },
                              objectFit: 'contain',
                              borderRadius: '10px'
                            }}
                          // alt={`Image for ${item.BlockName}`}
                          />
                        ) : (
                          <img
                            src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                            style={{
                              width: '100%',
                              height: { xs: '200px', md: '200px' },
                              objectFit: 'contain',
                              borderRadius: '10px',
                              padding: '20px'
                            }}
                          // title={`Image for ${section.SectionName}`}
                          />
                        )}
                        <div style={{ display: 'flex', }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 400, px: 3 }}>slug:</Typography>
                          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'lowercase' }}>{item.Slug}</Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 400, px: 3 }}>Position:</Typography>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{item.Position}</Typography>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>)}

              {displayType === 'list' && (
                <>
                  {selectedBlockItem?.block_items?.map((item, index) => {
                    return (
                      <Box key={index} sx={{ width: '200%', maxWidth: '700px', position: 'relative', mt: 4 }}>

                        <Card sx={{ py: 0.5, boxShadow: 'none', margin: 2 }} >
                          <div style={{ display: 'flex', justifyContent: 'end' }}>

                            <div sx={{ display: 'flex', }}>

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
                              Price :
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                              {item.price}
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

                          <div style={{ display: 'flex' }}>
                            {item.ContentType === 'text' ? (

                              <Box sx={{ fontSize: 14, backgroundColor: '#F6F6F6', borderRadius: '10px', py: 2, display: 'flex', margin: 2, width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                {item?.Content}
                              </Box>
                            ) : (
                              <>
                                <img src={item.MediaID} style={{ maxWidth: '100%', borderRadius: '10px', alignContent: 'center' }} />
                              </>
                            )}
                          </div>
                        </Card>

                      </Box>
                    );
                  })}
                  <Button variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: 'black',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                      margin: 1
                    }} onClick={handleContent}> +Add Content Type </Button>
                </>
              )}

            </Box>
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

              {/* <CInput
                label="Block Name"
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
              >

                <InputLabel id="model-select">Model Type</InputLabel>
                <Select
                  id="model-select"
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  displayEmpty
                  helperText={postError?.block_name}
                  error={postError?.block_name}
                  label="Model type"
                >
                  {modelType?.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.data_uniq_id}
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
                label="Unique Block Name"
                value={uniqBlockName}
                type={"slug"} disabled
                name="UniqueContentBlockName"
                onChange={(e) => setUniqBlockName(e.target.value)}
                helperText={postError?.unique_contentblock_name}
                error={postError?.unique_contentblock_name}
              />
            </Box>
            <CInput
              label="Title"
              value={title}
              type={"slug"}
              name="Title"
              onChange={(e) => setTitle(e.target.value)}
              helperText={postError?.title}
              error={postError?.title}
            />
            <CInput
              label="Passenger"
              value={subtitle}
              type={"slug"}
              fullWidth
              name="SubTitle"
              onChange={(e) => setSubtitle(e.target.value)}
              helperText={postError?.subtitle}
              error={postError?.subtitle}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <CInput
                label="Slug"
                value={slugName}
                type={"slug"}
                name="Slug"
                onChange={(e) => setSlugName(e.target.value)}
                helperText={postError?.slug}
                error={postError?.slug}
              />
              <FormControl size="small" fullWidth error={Boolean(postError?.position)} sx={{ width: '500px' }}>
                <InputLabel sx={{ fontSize: "14px" }} id="position-label">
                  Position
                </InputLabel>
                <Select
                  labelId="position-label"
                  id="position"
                  value={positionValue}
                  onChange={(e) => setPositionValue(e.target.value)}
                  label="Position"
                  MenuProps={{ PaperProps: { style: { maxHeight: '300px' } } }}
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
            <Stack sx={{ marginBottom: '16px' }}>
              {pictureUrl ? (
                <div
                  style={{
                    width: '250px',
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
                      width: '250px',
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
                        height: '100%',
                        width: "100%",
                      }}
                      alt="Placeholder"
                      src="https://www.pngkit.com/png/detail/801-8017420_your-car-you-car-image-placeholder-png.png"
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

            <FormControl
              fullWidth
              error={!!postError?.description}
              size="small"
            >
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
                label="status"
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
              label="Description Two"
              value={descriptionTwo}
              name="DescriptionTwo"
              onChange={(e) => setDescriptionTwo(e.target.value)}
              helperText={postError?.description_two}
              error={postError?.description_two}
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
              {/* <FormControl size="small" fullWidth error={Boolean(postError?.contenttype)} sx={{ width: '700px' }}>
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
              </FormControl> */}

              <FormControl size="small" fullWidth error={Boolean(postError?.Position)}>
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
              <CInput
                label="Price"
                value={price}
                type="text"
                name="Price"
                onChange={(e) => setPrice(e.target.value)}
                disabled
                helperText={postError?.price}
                error={postError?.price}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>

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
                type='text'
                name="UniqueKeyName"
                onChange={(e) => setUniqKeyName(e.target.value)}
                helperText={postError?.unique_keyname}
                error={postError?.unique_keyname}
              />

            </Box>


            <TextField
              id="outlined-multiline-flexible"
              label="Text"
              value={contentValue}
              multiline
              onChange={(e) => setContentValue(e.target.value)}
              sx={{ width: '100%', marginTop: '10px' }}
              helperText={postError?.content}
              error={postError?.content}
            />


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

              <FormControl size="small" fullWidth error={Boolean(postError?.position)}>
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
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>

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
                label="Price"
                value={price}
                type="text"
                name="Price"
                onChange={(e) => setPrice(e.target.value)}
                disabled
                helperText={postError?.price}
                error={postError?.price}
              />

              <CInput
                label="Unique Key Name"
                value={uniqKeyName}
                type='text'
                name="UniqueKeyName"
                onChange={(e) => setUniqKeyName(e.target.value)}
                helperText={postError?.unique_keyname}
                error={postError?.unique_keyname}
              />
            </Box>

            <TextField
              id="outlined-multiline-flexible"
              label="Text"
              multiline
              sx={{ width: '100%', marginTop: '10px' }}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              helperText={postError?.content}
              error={postError?.content}
            />
          </Box>
        </Box>
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
                      // margin: "0 auto 10px"
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
                    <Typography variant="body" align="left" textTransform={'lowercase'} width={1}>
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
