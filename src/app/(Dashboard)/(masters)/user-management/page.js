"use client";
import { Box, Typography, List, ListItemButton, FormControl, Select, InputLabel, MenuItem, Menu, Button, IconButton, Drawer, TextField, Divider, Badge, capitalize, Grid, Skeleton, Stack, Accordion, Checkbox, } from "@mui/material";
import { CInput, CSelect } from "../../components/forms";
import { useRouter } from "next/navigation";
import { axiosGet, axiosPost } from "@/lib/api";
import React, { useState, useEffect, useContext } from "react";
import Collapse from "@mui/material/Collapse";
import CreateButton from "@/app/(Dashboard)/components/buttons/CreateButton";
import DateFilter from "@/app/(Dashboard)/components/buttons/DateFilter";
import FilterButton from "@/app/(Dashboard)/components/buttons/FilterButton";
import Cookies from "js-cookie";
import AlertDialog from "@/app/(Dashboard)/components/container/AlertDialog";
import AutoHideAlert from "@/app/(Dashboard)/components/container/AutoHideAlert";
import { ArrowBack, CheckBox, DeleteForeverOutlined, EditOutlined, MoreVertOutlined, RefreshOutlined, } from "@mui/icons-material";
// import UserTable from "@/app/(Dashboard)/components/dashboard/UserTable";
import MasterTable from "@/app/(Dashboard)/components/list/MasterTable";
import GridContainer from "../../components/container/GridContainer";
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SearchFilter } from "../../components/buttons";

const EmployeeList = () => {
  const ACCESS_TOKEN = Cookies.get("token");
  const router = useRouter();
  const privileges = useContext(PrivilegesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivillageLoading, setIsPrivillageLoading] = useState(true);
  const [privillageData, setPrivillageData] = useState([]);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  // Data Toggle/Dialog State and Funtions -----
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPrivillageDrawer, setOpenPrivillageDrawer] = useState(false);
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
    setFirstName();
    setUserName();
    setUserEmail();
    setUserMobile();
    setUserPassword();
  };

  // Open Status change warning box
  const handleOpen = () => {
    setOpen(true);
    handleClose2();
  };

  // const handleOpenPrivillage = () => {
  //   fetchPrivillagesData(singleData.data_uniq_id);
  //   setOpenPrivillageDrawer(true);
  //   handleClose2();
  // };

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
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
    setUserName(singleData.month_name);
    setDataUniqId(singleData.data_uniq_id);
    setPostError();
    setFirstName(singleData.first_name);
    setUserName(singleData.user_name);
    setUserEmail(singleData.email);
    setUserMobile(singleData.mobile);
    setUserPassword(singleData.show_password);
  };

  const groupByPrivillageType = (items) => {
    return items.reduce((acc, item) => {
      const date = item.privilege_type;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupByPrivillageSubType = (items) => {
    return items.reduce((acc, item) => {
      const date = item.sub_type_name;
      const name = item.sub_type_name;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const [expanded, setExpanded] = useState(null);
  const [selectedPrivillageIds, setselectedPrivillageIds] = useState([]);
  const handlePrivillageIds = (data_uniq_id, subData, mainData) => {
    const viewSubData = subData.filter((it) => it.action_type === 0);
    const viewMainData = mainData.filter(
      (it) => it.action_type === 0 && it.have_sub_type === 1
    );
    const noViewSubData = subData.filter((it) => it.action_type !== 0);
    const noViewMainData = mainData.filter(
      (it) => it.action_type !== 0 && it.have_sub_type !== 1
    );
    const viewData = privillageData.filter(
      (it) => it.data_uniq_id === data_uniq_id
    );

    if (selectedPrivillageIds.includes(data_uniq_id)) {
      // If the item is already selected, remove it from the selectedItems array
      setselectedPrivillageIds(
        selectedPrivillageIds.filter((id) => id !== data_uniq_id)
      );
    } else {
      // If the item is not selected, add it to the selectedItems array
      setselectedPrivillageIds([
        ...selectedPrivillageIds,
        data_uniq_id,
        viewSubData[0]?.data_uniq_id,
        viewMainData[0]?.data_uniq_id,
      ]);
    }
  };

  const handleSelectAllPrivillage = (ids) => {
    setselectedPrivillageIds((prevPrivillageIds) => {
      // Create a new set from the previous selected items and the new IDs to avoid duplicates
      const newSelectedItems = new Set([...prevPrivillageIds, ...ids]);
      // Convert the set back to an array
      return Array.from(newSelectedItems);
    });
  };

  const handleUnselectAllPrivillage = (ids) => {
    setselectedPrivillageIds((prevPrivillageIds) => {
      // Filter out the IDs that need to be removed
      return prevPrivillageIds.filter((item) => !ids.includes(item));
    });
  };

  const MappedPrivillage = ({ privillageData, loding }) => {
    const groupedItems = groupByPrivillageType(privillageData);
    return (
      <div>
        {loding ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={110} height={60} />
            <Skeleton variant="rounded" width={110} height={60} />
            <Skeleton variant="rounded" width={110} height={60} />
          </Stack>
        ) : (
          Object.keys(groupedItems).map((date, index) => {
            const groupedIds = groupedItems[date].map(
              (item) => item.data_uniq_id
            );
            const groupedSubItems = groupByPrivillageSubType(
              privillageData.filter((item) => item.privilege_type === date)
            );

            return (
              <Box key={index} p={1}>
                <Box display={"flex"} gap={1} >
                  <Checkbox
                    // disabled={loadEditDataClicked}
                    size="small"
                    sx={{ p: 0, m: 0 }}
                    checked={groupedIds.some((el) =>
                      selectedPrivillageIds.includes(el)
                    )}
                    onChange={(event) => {
                      event.target.checked
                        ? handleSelectAllPrivillage(groupedIds)
                        : handleUnselectAllPrivillage(groupedIds);
                    }}
                  />
                  <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                    {date ? date : "Others"}
                  </Typography>
                  <Divider />
                </Box>
                {Object.keys(groupedSubItems).map((date1, index) => {
                  const groupedSubIds = groupedSubItems[date1].map(
                    (item) => item.data_uniq_id
                  );
                  return (
                    <Box key={index} pl={3} pb={1}>
                      {date1 ? (
                        <Box display={"flex"} gap={1}>
                          <Checkbox
                            // disabled={loadEditDataClicked}
                            size="small"
                            sx={{ p: 0, m: 0 }}
                            // checked={groupedSubIds.every((el) =>
                            //   selectedPrivillageIds.includes(el)
                            // )}
                            // indeterminate={groupedSubIds.some((el) =>
                            //   selectedPrivillageIds.includes(el)
                            // )}
                            checked={groupedSubIds.some((el) =>
                              selectedPrivillageIds.includes(el)
                            )}

                            onChange={(event) => {
                              event.target.checked
                                ? handleSelectAllPrivillage(groupedSubIds)
                                : handleUnselectAllPrivillage(groupedSubIds);
                            }}
                          />
                          <Typography
                            variant="h5"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {date1}
                          </Typography>
                          <Divider />
                        </Box>
                      ) : ""}

                      {date1 ? (
                        <Box pl={3} pb={1}>
                          {groupedSubItems[date1].map((item, index) => {
                            return (
                              <Box
                                key={index}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={1}
                              >
                                <Checkbox
                                  sx={{ p: 0, m: 0 }}
                                  size="small"
                                  checked={selectedPrivillageIds.includes(
                                    item.data_uniq_id
                                  )}
                                  disabled={item.action_type === 0}
                                  onClick={(event) => {
                                    event.stopPropagation(); // Prevent card click event from firing
                                    handlePrivillageIds(
                                      item.data_uniq_id,
                                      groupedSubItems[date1],
                                      groupedItems[date]
                                    );
                                  }}
                                />
                                <Box
                                  display={"flex"}
                                  alignItems={"center"}
                                  gap={2}
                                >
                                  {item.description}
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      ) : (
                        ""
                      )}
                      {/* <Box pl={3} pb={1}>
                        {groupedSubItems[date1].map((item, index) => {
                          return (
                            <Box
                              key={index}
                              display={"flex"}
                              flexDirection={"row"}
                              gap={1}
                            >
                              <Checkbox
                                sx={{ p: 0, m: 0 }}
                                size="small"
                                checked={selectedPrivillageIds.includes(
                                  item.data_uniq_id
                                )}
                                disabled={item.action_type === 0}
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent card click event from firing
                                  handlePrivillageIds(
                                    item.data_uniq_id,
                                    groupedSubItems[date1],
                                    groupedItems[date]
                                  );
                                }}
                              />
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={2}
                              >
                                {item.description}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box> */}
                    </Box>
                  );
                })}
                <Divider />
              </Box>
            );
          })
        )}
      </div>
    );
  };
  // Funtion for create new data or edit existing data
  const handleSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_uniq_id: dataUniqId,
      first_name: firstName,
      user_name: userName,
      email: userEmail,
      mobile: userMobile,
      show_password: userPassword,
    };
    try {
      if (openDrawerType == 1) {
        axiosPost
          .post(`create_user`, jsonData)
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
          .put(`create_user`, jsonData)
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

  const handleSubmitPrevillage = () => {
    const jsonData = {
      access_token: ACCESS_TOKEN,
      ref_user_id: singleData.data_uniq_id,
      access: selectedPrivillageIds.filter(id => id != null),
    };
    try {
      axiosPost
        .post(`set_privilege`, jsonData)
        .then((response) => {
          // Handle the successful POST response here
          if (response.data.action === "success") {
            // If response data action is 200, show the alert
            setAlertVisible(true);
            setAlertSeverity("success");
            setAlertMessage(response.data.message);
            setselectedPrivillageIds([]);
            setOpenPrivillageDrawer(false);
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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Funtion for delete single data
  const handleDelete = () => {
    setIsLoading(true);
    const jsonData = {
      access_token: ACCESS_TOKEN,
      data_ids: [singleData.data_uniq_id],
    };
    axiosPost
      .post(`user_delete`,jsonData)
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
      .post(`user_status`, jsonData)
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
      .post(`user_status`, jsonData)
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
      .post(`month_master_delete`, jsonData)
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
        `user_get?access_token=${ACCESS_TOKEN}&page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&order_field=${orderField}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter
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

  // const fetchPrivillagesData = async (id) => {
  //   setIsPrivillageLoading(true);
  //   axiosGet
  //     .get(
  //       `privilege_get?access_token=${ACCESS_TOKEN}&has_limit=0&ref_user_id=${id}`
  //     )
  //     .then((response) => {
  //       setselectedPrivillageIds(
  //         response.data.data.map((id) => id.ref_permission_id)
  //       );
  //       setIsPrivillageLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  const fetchAllPrivillagesData = async () => {
    axiosGet
      .get(`user_get?access_token=${ACCESS_TOKEN}&has_limit=0`)
      .then((response) => {
        setPrivillageData(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchAllPrivillagesData();
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

  const title = "Users";

  // const userHasActionPrivilege = privileges.includes("editUser") || privileges.includes("deleteUser");

  const tableHead = [
    {
      id: 1,
      label: `Name`,
      value: "first_name",
    },
    {
      id: 2,
      label: `User Name`,
      value: "user_name",
    },
    {
      id: 3,
      label: "Email",
      value: "email",
    },
    {
      id: 4,
      label: "Mobile",
      value: "mobile",
    },
    {
      id: 5,
      label: "Status",
      value: "active_status",
    },
    {
        id: 6,
        label: "Action",
        value: "active_status",
       
      },
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
              {item.first_name} {item.last_name}
            </Typography>
          ),
          id: 1,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"} textTransform={"capitalize"}>
              {item.user_name}
            </Typography>
          ),
          id: 2,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"}>
              {item.email}
            </Typography>
          ),
          id: 3,
        },
        {
          comp: (
            <Typography px={2} fontSize={"14px"}>
              {item.mobile}
            </Typography>
          ),
          id: 4,
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
          id: 5,
        },
        
            {
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
              id: 6,
              
            },
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

  // if (!privileges.includes("viewUser")) {
  //   router.push('/PermissionDenied')
  // }


  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="displey_space_between"
      >
        <CreateButton
          
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
        <Box sx={{ p: 1, width: "500px" }}>
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
              <GridContainer>
              <Grid item xs={6}>
                  <CInput
                    label="User Name"
                    value={userName}
                    name="user_name"
                    onChange={(e) => setUserName(e.target.value)}
                    helperText={postError?.user_name}
                    error={postError?.user_name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CInput
                    label="First Name"
                    value={firstName}
                    name="first_name"
                    onChange={(e) => setFirstName(e.target.value)}
                    helperText={postError?.first_name}
                    error={postError?.first_name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CInput
                    type={"email"}
                    label="User Email"
                    value={userEmail}
                    name="email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    helperText={postError?.email}
                    error={postError?.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CInput
                    type={"number"}
                    label="User Mobile"
                    value={userMobile}
                    name="mobile"
                    onChange={(e) => setUserMobile(e.target.value)}
                    helperText={postError?.mobile}
                    error={postError?.mobile}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CInput
                    label="User Password"
                    type={"password"}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    name="show_password"
                    helperText={postError?.show_password}
                    error={postError?.show_password}
                  />
                </Grid>
                {/* {postError} */}
              </GridContainer>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Drawer
        anchor={"right"}
        open={openPrivillageDrawer}
        onClose={() => setOpenPrivillageDrawer(false)}
      >
        <Box sx={{ p: 1, width: "500px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => setOpenPrivillageDrawer(false)}
                size="small"
              >
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
                Previllages
              </Typography>
            </Box>
            <Box>
              <Button
                size="small"
                onClick={handleSubmitPrevillage}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ my: 1 }}>
              <MappedPrivillage
                privillageData={privillageData}
                loding={isPrivillageLoading}
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
          {/* <ListItemButton onClick={handleOpenPrivillage}>
            <Typography variant="p">Update Previllages</Typography>
          </ListItemButton>
          <Divider /> */}
         
            <>
              <ListItemButton onClick={handleOpen}>
                <Typography variant="p"> Change Status</Typography>
              </ListItemButton>
              <Divider />
              <ListItemButton onClick={handleClickEdit}>
                <Typography variant="p">Edit</Typography>
              </ListItemButton>
            </>
          <Divider />
         
            <>
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
            </>
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
