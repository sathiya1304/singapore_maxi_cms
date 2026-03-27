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
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useRef, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import Cookies from "js-cookie";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
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
  const [actionData, setActionData] = React.useState("");
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [openPresentDialog, setOpenPresentDialog] = useState(false);
  const [openAbsentDialog, setOpenAbsentDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const [studentName, setStudentName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [present, setPresent] = useState("");
  const [presentData, setPresentData] = useState([]);
  const [attendanceId, setAttendanceId] = useState("");
  const [absent, setAbsent] = useState("");
  const [dataLength, setDataLength] = useState("");

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
    if (type === 1) {
      const currentDate = new Date();
      const threeYearsAgo = new Date(
        currentDate.getFullYear() - 3,
        currentDate.getMonth(),
        currentDate.getDate()
      );
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
  const [isCheckInSelected, setIsCheckInSelected] = useState(false);
  const [orderType, setOrderType] = useState("desc");
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


  // Funtion to change active status for filter
  const handleActiveStatusChange = (value) => {
    setActiveStatusFilter(value);
    setIsStatusSelected(true);
    // handlefilterBadgeVisible(true)
  };
  // Funtion to change active status for filter
  const handleCheckInStatusChange = (value) => {
    setActiveCheckInFilter(value);
    setIsCheckInSelected(true);
    // handlefilterBadgeVisible(true)
  };

  // Page action's state and funtions (create, Edit, Status change, Delete) ----
  const [dataUniqId, setDataUniqId] = useState("");
  const [dataStatus, setDataStatus] = useState(1);
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [postError, setPostError] = useState([]);


  const handleClickView = (e, item) => {
    setExpanded(null);
    fetchHistoryData(item.data_uniq_id)
    toggleViewDrawer(true);
    setPresentData(item.attendance_details);
    setSingleData(item);

    // setOpenDrawerType(2);
    setOpenViewDrawer(true);
    handleClose2();
    setDataUniqId(singleData.data_uniq_id);
  };


  // Present
  const handleOnPresent = (data, item) => {
    const { currentDate, currentTime } = getCurrentDateTime();
    setDataUniqId(item.data_uniq_id);
    setSingleData(item);
    setPresent(data);
    setOpenPresentDialog(true);
    setAnchorEl1(false);
    setCheckin(currentTime);
    setCheckout(currentTime);
  };

  const handleClosePresentDialog = () => {
    setOpenPresentDialog(false);
  };

  // Funtion for Check in
  const onCheckInSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      ref_student_id: dataUniqId,

      checkin_time: checkin,
      attendance_date: currentDate,
      attendance_status: 0,
      attendance_type: 0,
    };
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
            setOpenPresentDialog(false);
            fetchData();
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

  // Funtion for Check out
  const onCheckOutSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      ref_student_id: dataUniqId,
      data_uniq_id: present.data_uniq_id,
      checkout_time: checkout,
      attendance_date: currentDate,
      attendance_type: 0,
    };
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
            setOpenPresentDialog(false);
            fetchData();
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

  const fetchData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `attendance_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter
        }&checkin_status=${activeCheckInFilter === 3 ? "" : activeCheckInFilter}&approval_status=${1}`
      )

      .then((response) => {
        setDataLength(response.data.data.length);
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

  const fetchHistoryData = async (id) => {
    setIsHistoryLoading(true);
    axiosGet
      .get(
        `attendance_history_get?access_token=${ACCESS_TOKEN}&has_limit=0&ref_student_id=${id}`
      )

      .then((response) => {
        setHistoryData(response.data.data);
        setIsHistoryLoading(false);
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
    activeCheckInFilter,
  ]);

  const title = "Attendance";

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
            {"CheckIn Status"}
          </InputLabel>
          <Select
            sx={
              isStatusSelected
                ? { fontSize: "14px", bgcolor: " #185aa617", height: "34px" }
                : { fontSize: "14px", height: "34px" }
            }
            placeholder={"CheckIn Status"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activeCheckInFilter}
            label={"CheckIn Status"}
            onChange={(e) => handleCheckInStatusChange(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={3}>
              All
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={1}>
              Checked In
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={0}>
              Checked Out
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const handleAccordChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const MappedPresent = ({ presentData, loding }) => {
    const groupedItems = groupByAttendanceDate(presentData);

    return (
      <div>
        {loding ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={110} height={60} />
            <Skeleton variant="rounded" width={110} height={60} />
            <Skeleton variant="rounded" width={110} height={60} />
          </Stack>
        ) : (
          Object.keys(groupedItems).map((date, index) => (
            <Accordion
              key={index}
              expanded={expanded === date}
              onChange={handleAccordChange(date)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${date}-content`}
                id={`${date}-header`}
              >
                {date}
              </AccordionSummary>
              <AccordionDetails>
                {groupedItems[date].map((item, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                  >
                    <GridContainer>
                      <Grid p={2}>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Box sx={{ width: "100px" }}
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <Typography >
                              Check In
                            </Typography> <span>:</span></Box>
                          {item.checkin_time}
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Box sx={{ width: "100px" }}
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <Typography >
                              Check Out
                            </Typography> <span>:</span></Box>
                          {item.checkout_time}
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Box sx={{ width: "100px" }}
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <Typography >
                              Hours spent
                            </Typography>
                            <span>:</span>
                          </Box>
                          {item.hours_spent}
                        </Box>
                      </Grid>
                    </GridContainer>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </div>
    );
  };

  const groupByAttendanceDate = (items) => {
    return items.reduce((acc, item) => {
      const date = item.attendance_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
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
          {title}({dataLength})
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* <SearchFilter
            onSearchButtonClick={handleSearchInputChange}
            searchValue={searchValue}
          /> */}
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

      <Box mt={2} p={2}>
        {/* <GridContainer spacing={1}> */}
        <Stack
          spacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
          useFlexGap
          justifyContent={"start"}
          flexWrap="wrap"
        >
          {/* <Grid container gap={2} flexWrap={{ md: "wrap", lg: 'nowrap' }}>
                <Grid item md={3} sx={{ width: "100%", minHeight: 130, background: "#fafafa", boxShadow: "2px 5px 10px -2px rgba(0,0,0,0.2),2px 2px 2px -4px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)", pt: 1 }}> */}

          {/* </Grid>
              </Grid> */} 
          {data?.map((item, index) => {
            let attend_data =
              item.attendance_details[item.attendance_details?.length - 1];

            let checkinTime = attend_data?.checkin_time;
            let checkoutTime = attend_data?.checkout_time;
            let hoursSpent = attend_data?.hours_spent;

            let x = "00:00:00";
            // if (item.attendance_details.length > 0){
            //   x = updateTime(checkinTime)
            // }
            return (
             <Item key={index} sx={{ width: '18%',maxWidth:'20%', position: "relative" }}>

                {privileges.includes("viewAttendanceHistory") && (
                  <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    size="small"
                    // onClick={handleClickView}
                    onClick={(e) => handleClickView(e, item)}
                    title="Click to Action"
                  >
                    <History />
                  </IconButton>
                )}

                <Card sx={{ py: 0.5, boxShadow: "none" }}>
                  <Avatar
                    src={item.stud_image}
                    sx={{ width: "110px", height: "110px", margin: "auto" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    pb={0}
                    pt={1}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                  >
                    {item.student_name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    pt={0}
                    pb={0.5}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                  >
                    {item.stud_id}
                  </Typography>

                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                    flexDirection={"column"}
                    gap={1}
                  >
                    {/* <Typography>{times[item.data_uniq_id]}</Typography> */}
                    { }
                    <Box width={180} margin={"auto"}>
                      <>
                        <Box display={"flex"} alignItems={"center"} gap={2}>

                          <Box sx={{ width: "100px" }}
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <Typography >
                              Check In
                            </Typography>
                            <span>:</span>
                          </Box>
                          <Typography>
                            {checkinTime ?
                              <>
                                {checkinTime !== "00:00:00" ? (
                                  <> {checkinTime}</>
                                ) : (
                                  <>--:--:--</>
                                )}
                              </>
                              :
                              <>--:--:--</>
                            }
                          </Typography>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Box sx={{ width: "100px" }}
                            display={"flex"}
                            justifyContent={"space-between"}>
                            <Typography  >
                              Check Out
                            </Typography>
                            <span>:</span>
                          </Box>
                          <Typography>
                            {checkoutTime ? <>
                              {checkoutTime !== "00:00:00" ? (
                                <> {checkoutTime}</>
                              ) : (
                                <>--:--:--</>
                              )}
                            </>
                              :
                              <>--:--:--</>
                            }
                          </Typography>
                        </Box>
                      </>
                    </Box>
                    {privileges.includes("markAttendance") && (
                      <Button
                        variant="outlined"
                        color={
                          attend_data?.checkin_status === 1
                            ? "error"
                            : "success"
                        }
                        onClick={() => handleOnPresent(attend_data, item)}
                      >
                        {attend_data?.checkin_status === 1
                          ? "Checkout"
                          : "Checkin"}
                      </Button>
                    )}
                  </Box>
                  {/* </CardActions> */}
                </Card>
              </Item>

            );
          })}
        </Stack>
        {/* </GridContainer> */}
      </Box>

      <Drawer
        anchor={"right"}
        open={openViewDrawer}
        onClose={toggleViewDrawer(false)}
      >
        <Box sx={{ width: "400px", p: 1 }}>
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
                Attendance history of {singleData.student_name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 1, my: 1 }}>
            <MappedPresent
              presentData={historyData}
              loding={isHistoryLoading}
            />
          </Box>
        </Box>
      </Drawer>


      <Dialog open={openPresentDialog} onClose={handleClosePresentDialog}>
        <DialogContent sx={{ width: "400px", pb: 0 }}>
          <Stack spacing={2}>
            {present?.checkin_status === 1 ? (
              <>
                <DialogTitle sx={{ p: 0, pb: 1, fontWeight: "bold" }}>
                  {"Are you sure want to checkout ?"}
                </DialogTitle>
                <DialogContent sx={{ p: 1, pb: 0 }}>
                  <Box display={"flex"} gap={1}>
                    Check out time -
                    <input
                      type="time"
                      id="checkin"
                      name="checkin"
                      value={checkout}
                      max={checkin}
                      style={{
                        borderRadius: 4,
                        border: "1px solid gray",
                        padding: 1,
                        fontSize: "14px"
                      }}
                      required
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                    {/* <Typography sx={{ fontSize: "14px" }}>
                      {checkout}
                    </Typography> */}
                  </Box>
                </DialogContent>
              </>
            ) : (
              <>
                <DialogTitle sx={{ p: 0, pb: 1, fontWeight: "bold" }}>
                  {"Are you sure want to checkin ?"}
                </DialogTitle>
                <DialogContent sx={{ p: 1, pb: 0 }}>
                  <Box display={"flex"} gap={1}>
                    Check in time -
                    <input
                      type="time"
                      id="checkin"
                      name="checkin"
                      value={checkin}
                      // max={checkout}
                      style={{
                        borderRadius: 4,
                        border: "1px solid gray",
                        padding: 1,
                        fontSize: "14px"
                      }}
                      required
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                  </Box>
                </DialogContent>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pt: 0 }}>
          <Button onClick={handleClosePresentDialog}>Cancel</Button>
          {present?.checkin_status == 1 ? (
            <Button onClick={() => onCheckOutSubmit()}>Checkout</Button>
          ) : (
            <Button onClick={() => onCheckInSubmit()}>Checkin</Button>
          )}
        </DialogActions>
      </Dialog>

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
