"use client";
import { Box, Typography, List, ListItemButton, FormControl, Select, InputLabel, MenuItem, Menu, Button, IconButton, Drawer, TextField, Divider, Badge, capitalize, } from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import CreateButton from "@/app/(Dashboard)/components/buttons/CreateButton";
import DateFilter from "@/app/(Dashboard)/components/buttons/DateFilter";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import SearchFilter from "@/app/(Dashboard)/components/buttons/SearchFilter";
import Cookies from "js-cookie";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import { ArrowBack, DeleteForeverOutlined, EditOutlined, MoreVertOutlined, RefreshOutlined, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";

const EmployeeList = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const privileges = useContext(PrivilegesContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState("");
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
  const [actionData, setActionData] = React.useState("");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);

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
  const [gameName, setGameName] = useState("");
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
    setGameName(singleData.game_name);
    setDataUniqId(singleData.data_uniq_id);
    setPostError();
  };

  // Funtion for create new data or edit existing data
  const handleSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,
      game_name: gameName,
      active_status: dataStatus,
    };
    try {
      if (openDrawerType == 1) {
        axiosPost
          .post(`game_master`, jsonData)
          .then((response) => {
            // Handle the successful POST response here
            if (response.data.action === "success") {
              // If response data action is 200, show the alert
              // setAlertVisible(true);
              // setAlertSeverity("success");
              // setAlertMessage(response.data.message);
              // // Cookies.remove("uuid");
              setOpenDrawer(false);
              setGameName("");
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

              // You can also set a timeout to hide the alert after a certain duration
              // setTimeout(() => {
              //   setAlertVisible(false);
              // }, 3000);
            }
          })
          .catch((error) => {
            // Handle POST errors here
            console.error("POST Error:", error);
          });
      } else {
        axiosPost
          .put(`game_master`, jsonData)
          .then((response) => {
            // Handle the successful POST response here
            if (response.data.action === "success") {
              // If response data action is 200, show the alert
              // setAlertVisible(true);
              // setAlertSeverity("success");
              // setAlertMessage(response.data.message);
              // // Cookies.remove("uuid");
              setOpenDrawer(false);
              setGameName("");
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

              // You can also set a timeout to hide the alert after a certain duration
              // setTimeout(() => {
              //   setAlertVisible(false);
              // }, 3000);
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
      .delete(`game_master`, { data: jsonData })
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
      .post(`game_master_status`, jsonData)
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
      .post(`game_master_status`, jsonData)
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
      .post(`game_master_delete`, jsonData)
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
        `game_master_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&order_field=${orderField}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter
        }`
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
  ]);

  const title = "Games";
  const userHasActionPrivilege =
    privileges.includes("editGame") || privileges.includes("deleteGame");


  const tableHead = [
    {
      id: 1,
      label: `Game`,
      value: "game_name",
    },
    {
      id: 2,
      label: "Created Date",
      value: "created_date",
    },

    {
      id: 3,
      label: "Status",
      value: "active_status",
    },
    ...(userHasActionPrivilege
      ? [
        {
          id: 4,
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
              {item.game_name}
            </Typography>
          ),
          id: 1,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"}>
              {item.formatted_created_date}
            </Typography>
          ),
          id: 2,
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
          id: 3,
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
                  <MoreVertOutlined />
                </IconButton>
              ),
              id: 4,
              align: "center",
            },
          ]
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

  // if (!privileges.includes("viewGame")) {
  //   router.push('/PermissionDenied')
  // }

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="displey_space_between"
      >
        <CreateButton
          allowed={privileges.includes("createGame")}
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
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ minWidth: "400px", p: 1, maxWidth: "700px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={toggleDrawer(false)} size="small">
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
                {openDrawerType === 1 ? "Create" : "Edit"} {title}
              </Typography>
            </Box>
            <Box>
              <Button size="small" onClick={handleSubmit} variant="contained">
                Save
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ my: 1 }}>
              <TextField
                id="outlined-basic"
                label="Game Name"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
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
                helperText={postError?.game_name}
                error={postError?.game_name}
              />
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
        {/* {row.menu} */}
        <List sx={{ p: 0, fontSize: "14px" }}>
          {privileges.includes("editGame") && (
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
          {privileges.includes("deleteGame") && (
            <ListItemButton
              sx={{
                "&:hover": {
                  color: "red",
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

export default EmployeeList;
