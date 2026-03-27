import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, Typography } from "@mui/material";
import NavItem from "./NavItem";
import NavItemSmall from "./NavItemSmall";
import { PrivilegesContext } from "@/app/PrivilegesProvider";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import { useContext } from "react";
const SidebarItems = ({ isMobileSidebarOpen,onSidebarClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathDirect = pathname;

  // const filterMenuItems = (menuItems, privileges) => {
  //   return menuItems.reduce((filteredItems, item) => {
  //     if (
  //       item.requiredPrivilege &&
  //       privileges.includes(item.requiredPrivilege)
  //     ) {
  //       const newItem = { ...item };

  //       if (newItem.submenu && newItem.submenu.length > 0) {
  //         newItem.submenu = filterMenuItems(newItem.submenu, privileges);
  //       }

  //       filteredItems.push(newItem);
  //     }
  //     return filteredItems;
  //   }, []);
  // };

  // // const privileges = ["ViewDashboard", "ViewUser","ViewRegistration","ViewStudent"];
  // const privileges = useContext(PrivilegesContext);

  // const filteredMenuItems = filterMenuItems(Menuitems, privileges);
  return (
    <Box>
      <List sx={{ overflow: "hidden" }} component="div">
        {isMobileSidebarOpen == true ? (
          <>
            {Menuitems.map((item, index) => {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  index={index}
                  pathDirect={pathDirect}
                  onClick={onSidebarClose}
                />
              );
            })}
          </>
        ) : (
          <>
            {Menuitems.map((item, index) => {
              return (
                <NavItemSmall
                  item={item}
                  key={item.id}
                  index={index}
                  pathDirect={pathDirect}
                  onClick={onSidebarClose}
                />
              );
            })}
          </>
        )}
      </List>
    </Box>
  );
};
export default SidebarItems;
