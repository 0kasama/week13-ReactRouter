import { Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Flex w="100%" justifyContent="center" p="20px" bgColor="blue.500">
        <Box p="10px">
          <Link to="/"><b>HOME</b></Link>
        </Box>
        <Box p="10px">
          <Link to="/login"><b>LOGIN</b></Link>
        </Box>
        <Box p="10px">
        <Link to="/add"><b>ADD BOOK</b></Link>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
