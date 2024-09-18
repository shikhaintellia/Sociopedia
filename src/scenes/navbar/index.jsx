// import { useState } from "react";
// import {
//   Box,
//   IconButton,
//   InputBase,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Search,
//   Message,
//   DarkMode,
//   LightMode,
//   Notifications,
//   Help,
//   Menu,
//   Close,
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { setMode, setLogout } from "state";
// import { useNavigate } from "react-router-dom";
// import FlexBetween from "components/FlexBetween";
// import PostWidget from "scenes/widgets/PostWidget";

// const Navbar = () => {
//   const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

//   const theme = useTheme();
//   const neutralLight = theme.palette.neutral.light;
//   const dark = theme.palette.neutral.dark;
//   const background = theme.palette.background.default;
//   const primaryLight = theme.palette.primary.light;
//   const alt = theme.palette.background.alt;

//   const fullName = `${user.firstName} ${user.lastName}`;
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const token = useSelector((state) => state.token);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/users/search?query=${query}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   return (
//     <FlexBetween padding="1rem 6%" backgroundColor={alt}>
//       <FlexBetween gap="1.75rem">
//         <Typography
//           fontWeight="bold"
//           fontSize="clamp(1rem, 2rem, 2.25rem)"
//           color="primary"
//           onClick={() => navigate("/home")}
//           sx={{
//             "&:hover": {
//               color: primaryLight,
//               cursor: "pointer",
//             },
//           }}
//         >
//           Sociopedia
//         </Typography>
//         {isNonMobileScreens && (
//           <FlexBetween
//             backgroundColor={neutralLight}
//             borderRadius="9px"
//             gap="3rem"
//             padding="0.1rem 1.5rem"
//           >
//             <InputBase placeholder="Search..."  value={query} onChange={handleChange}
//             sx={{
//               flex: 1,
//               backgroundColor: 'background.paper',
//               borderRadius: '4px',
//               padding: '0.5rem',
//             }}/>
//             <IconButton onClick={handleSearch} >
//               <Search />
//             </IconButton>   
//           </FlexBetween>
//         )}
//           <Box>
//       {/* <Box display="flex" alignItems="center">
//         <InputBase
//           placeholder="Search..."
//           value={query}
//           onChange={handleChange}
//           sx={{
//             flex: 1,
//             backgroundColor: 'background.paper',
//             borderRadius: '4px',
//             padding: '0.5rem',
//           }}
//         />
//         <IconButton onClick={handleSearch}>
//           <Search />
//         </IconButton>
//       </Box> */}
//       <Box mt="1rem">
//         {results.length > 0 ? (
//           <Box>
//             {results.map((user) => (
//               <Box key={user._id} p="0.5rem" borderBottom="1px solid #ccc">
//                 <Typography variant="body1">{user.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {user.email}
//                 </Typography>
//               </Box>
//             ))}
            
//           </Box>
       
//         ) : (
//           <Typography>No results found</Typography>
//         )}
//       </Box>
//     </Box>
//       </FlexBetween>

//       {/* DESKTOP NAV */}
//       {isNonMobileScreens ? (
//         <FlexBetween gap="2rem">
//           <IconButton onClick={() => dispatch(setMode())}>
//             {theme.palette.mode === "dark" ? (
//               <DarkMode sx={{ fontSize: "25px" }} />
//             ) : (
//               <LightMode sx={{ color: dark, fontSize: "25px" }} />
//             )}
//           </IconButton>
//           <Message sx={{ fontSize: "25px" }} />
//           <Notifications sx={{ fontSize: "25px" }} />
//           <Help sx={{ fontSize: "25px" }} />
//           <FormControl variant="standard" value={fullName}>
//             <Select
//               value={fullName}
//               sx={{
//                 backgroundColor: neutralLight,
//                 width: "150px",
//                 borderRadius: "0.25rem",
//                 p: "0.25rem 1rem",
//                 "& .MuiSvgIcon-root": {
//                   pr: "0.25rem",
//                   width: "3rem",
//                 },
//                 "& .MuiSelect-select:focus": {
//                   backgroundColor: neutralLight,
//                 },
//               }}
//               input={<InputBase />}
//             >
//               <MenuItem value={fullName}>
//                 <Typography>{fullName}</Typography>
//               </MenuItem>
//               <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
//             </Select>
//           </FormControl>
//         </FlexBetween>
//       ) : (
//         <IconButton
//           onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
//         >
//           <Menu />
//         </IconButton>
//       )}

//       {/* MOBILE NAV */}
//       {!isNonMobileScreens && isMobileMenuToggled && (
//         <Box
//           position="fixed"
//           right="0"
//           bottom="0"
//           height="100%"
//           zIndex="10"
//           maxWidth="500px"
//           minWidth="300px"
//           backgroundColor={background}
//         >
//           {/* CLOSE ICON */}
//           <Box display="flex" justifyContent="flex-end" p="1rem">
//             <IconButton
//               onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
//             >
//               <Close />
//             </IconButton>
//           </Box>

//           {/* MENU ITEMS */}
//           <FlexBetween
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             gap="3rem"
//           >
//             <IconButton
//               onClick={() => dispatch(setMode())}
//               sx={{ fontSize: "25px" }}
//             >
//               {theme.palette.mode === "dark" ? (
//                 <DarkMode sx={{ fontSize: "25px" }} />
//               ) : (
//                 <LightMode sx={{ color: dark, fontSize: "25px" }} />
//               )}
//             </IconButton>
//             <Message sx={{ fontSize: "25px" }} />
//             <Notifications sx={{ fontSize: "25px" }} />
//             <Help sx={{ fontSize: "25px" }} />
//             <FormControl variant="standard" value={fullName}>
//               <Select
//                 value={fullName}
//                 sx={{
//                   backgroundColor: neutralLight,
//                   width: "150px",
//                   borderRadius: "0.25rem",
//                   p: "0.25rem 1rem",
//                   "& .MuiSvgIcon-root": {
//                     pr: "0.25rem",
//                     width: "3rem",
//                   },
//                   "& .MuiSelect-select:focus": {
//                     backgroundColor: neutralLight,
//                   },
//                 }}
//                 input={<InputBase />}
//               >
//                 <MenuItem value={fullName}>
//                   <Typography>{fullName}</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={() => dispatch(setLogout())}>
//                   Log Out
//                 </MenuItem>
//               </Select>
//             </FormControl>
//           </FlexBetween>
//         </Box>
//       )}
//     </FlexBetween>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleSearch = async () => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/users/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleUserClick = (user) => {
    navigate(`/profile/${user._id}`, { state: { userData: user }, replace: true });
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNonMobileScreens && (
          <Box position="relative" width="300px">
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase 
                placeholder="Search..." 
                value={query} 
                onChange={handleChange}
                sx={{
                  flex: 1,
                  backgroundColor: 'background.paper',
                  borderRadius: '4px',
                  padding: '0.5rem',
                }}
              />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </FlexBetween>

            {/* SEARCH RESULTS */}
            {results.length > 0 && (
              <Box
                position="absolute"
                top="100%" 
                left="0"
                width="100%"
                bgcolor="white"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                zIndex="1000"
                borderRadius="4px"
                maxHeight="200px"
                overflow="auto"
              >
                {results.map((user) => (
                  <Box
                    key={user._id}
                    p="0.5rem"
                    borderBottom="1px solid #ccc"
                    onClick={() => handleUserClick(user)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: neutralLight },
                    }}
                  >
                    <Typography variant="body1">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {/* {user.email} */}
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
