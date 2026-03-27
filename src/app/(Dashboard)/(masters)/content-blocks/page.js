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
} from "@mui/material";
import { CloseOutlined, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import EditButton from "@/app/(Dashboard)/components/buttons/EditButton";
import Cookies from "js-cookie";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { useSearchParams } from "next/navigation";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
  const serach = useSearchParams()
  const uuid = serach.get('d')
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

  const [pages, setPages] = useState([])
  const [pageName, setPageName] = useState('');
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
  const fileInputRef = useRef(null);

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

  const HandleChangeEdit = () => {
    seteditList(!editList);
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


  const [sectionName, setSectionName] = useState();
  const [uniqSectionName, setUniqSectionName] = useState();
  const [position, SetPosition] = useState();
  const [positionValue, setPositionValue] = useState()

  // Funtion to change active status for filter



  // Page action's state and funtions (create, Edit, Status change, Delete) ----
  const [dataUniqId, setDataUniqId] = useState("");
  const [dataStatus, setDataStatus] = useState(1);
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [postError, setPostError] = useState([]);
  const [sectionId, setSectionId] = useState('')


  const fetchPage = async () => {
    axiosGet
      .get(
        `pages_get?access_token=${ACCESS_TOKEN}&has_limit=0`
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
    fetchPage();
  }, []);


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
        `sections_get?has_limit=1&access_token=${access_token}&page=${limit}&items_per_page=${end}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&active_status=${actveStatus}&order_field=${orderField}&order_type=${orderType}`
      )
      .then((response) => {
        // Handle the successful response here
        setData(response.data.data);
        setdataCount(response.data.data_count);
        // setTableName(response.data.table_name);
        // settableDetails(response.data.table_details);
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

  const handleClickEdit = (section, page) => {
    // toggleDrawer(true, 2)
    setOpenDrawerType(2);
    setOpenDrawer(true);
    setPageName(page.PageID)
    setSectionName(section.SectionName)
    setSlugName(section.Slug)
    setUniqSectionName(section.UniqueSectionName)
    setPositionValue(section.Position)
    setPicture(section.SectionImage)
    setPictureUrl(section.SectionImage)
    setPictureName(section.image_name)
    setSectionId(section.SectionID)
  }


  const handleSubmit = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    const jsonStructure = {
      section_name: sectionName,
      page_id: pageName,
      slug: slugName,
      unique_section_name: uniqSectionName,
      section_id: sectionId,
      position: position,
      section_image: picture,
      image_name: pictureName,
      access_token: ACCESS_TOKEN,

    };

    try {
      if (openDrawerType == 1) {
        axiosPost
          .post(`sections`, jsonStructure)
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
                orderField,
                orderType
              );
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
      } else {
        axiosPost
          .put(`sections`, jsonStructure)
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
              router.back();
              fetchData();
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


  const title = "Content Blocks";

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




  const router = useRouter()


  const handlePageClick = (uniquePageName) => {
    router.push(`/slug/${uniquePageName}`);
  };


  return (
    <div style={{ padding: "16px" }}>

      <div
        style={{ display: "flex", gap: 20 }}
        className="displey_space_between"
      >

        <Typography
          variant="h4"
          className="nunito_font"
          color={"primary"}
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginLeft: "22px"
          }}
        >
          {title}
        </Typography>
      </div>
      {/* {filtersList && ( */}

      {/* )} */}

      <div>

        <Box mt={2} p={2}>
          <Grid container spacing={2}>
            {pages?.map((page, pageIndex) => (
              <Grid item xs={10} sm={6} md={4} key={pageIndex}>
                <Box sx={{ mb: 2 }}>

                  <Stack
                    spacing={{ xs: 1, sm: 2, md: 3 }}
                    direction="row"
                    useFlexGap
                    justifyContent={"start"}
                    flexWrap="wrap"
                  >

                    <Box sx={{ width: '100%', position: "relative" }}>

                      <Card sx={{ py: 0.5, boxShadow: "none", width: '100%', height: '300px', cursor: 'pointer' }} onClick={() => router.push(`/pages_block?id=${page.PageID}`)} >
                        <Box display="flex" alignItems="center">
                          <Typography sx={{ marginTop: '2px', px: 4, py: 2, fontWeight: 700 }} color="#185AA6">
                            {page.PageName}
                          </Typography>
                        </Box>

                      </Card>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      <CDrawer
        open={openDrawer}
        close={toggleDrawer(false)}
        openType={openDrawerType}
        title={title}
        buttonName={openDrawerType === 1 ? "Create" : "Save"}
        onSave={handleSubmit}
        loading={isButtonDisabled}
        sx={{ maxWidth: "200px" }}
      >


        <FormControl size="small" fullWidth error={Boolean(postError?.PageName)}>
          <InputLabel sx={{ fontSize: "14px" }} id="page-label">
            Page Name
          </InputLabel>
          <Select

            placeholder={"Page"}
            labelId="page-label"
            id="page"
            value={pageName}
            label={"Page"}
            onChange={(e, v) => HandleChangePageName(e.target.value, v)}
          >

            {pages?.map((item, index) => (
              <MenuItem key={index} sx={{ fontSize: "14px" }} value={item.PageID}>

                {item.PageName}

              </MenuItem>
            ))}
          </Select>
          {postError?.pageName && <FormHelperText>{postError.pageName}</FormHelperText>}
        </FormControl>

        <Grid item xs={8} md={8} sx={{ marginTop: 2 }}>
          <GridContainer
            sx={{ pb: 1 }}
          >
            <Grid item xs={6} md={6}>
              <CInput
                label="Section Name"
                value={sectionName}
                type="text"
                name="SectionName"
                onChange={(e) => setSectionName(e.target.value)}
                helperText={postError?.SectionName}
                error={postError?.SectionName}
              />

            </Grid>
            <Grid item xs={6} md={6}>
              <CInput
                label="Unique Section Name"
                value={uniqSectionName}
                type='text'
                name="UniqueSectionName"
                onChange={(e) => setUniqSectionName(e.target.value)}
                helperText={postError?.UniqueSectionName}
                error={postError?.UniqueSectionName}
              />
            </Grid>

            <Grid item xs={8} md={8}>
              <CInput
                label="Slug"
                value={slugName}
                type={"slug"}
                name="Slug"
                onChange={(e) => setSlugName(e.target.value)}
                helperText={postError?.Slug}
                error={postError?.Slug}
              />
            </Grid>
            <Grid item xs={4} md={4}>
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

          </GridContainer>
        </Grid>
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
