import {
  Card,
  CardHeader,
  CardBody,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  FormControl,
  Flex,
  Center,
  useToast,
  CardFooter,
  Text,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUser } from "../modules/fetch";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { token } = response;
      localStorage.setItem("token", token);
      toast({
        position: "top",
        title: "Login Success",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        position: "top",
        title: "Bad Credentials.",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex h={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Box>
          <Card w={400}>
            <CardHeader>
              <Heading as="h2">Login</Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="mail@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  colorScheme="blue"
                  color={"white"}
                  onClick={handleClick}
                >
                  Login
                </Button>
              </Stack>
            </CardBody>
            <CardFooter>
              <Text>
                Don't have an account?{" "}
                <ChakraLink
                  as={Link}
                  to="/register"
                  color="blue"
                  textDecoration="underline"
                >
                  Register
                </ChakraLink>
              </Text>
            </CardFooter>
          </Card>
        </Box>
      </Center>
    </Flex>
  );
}

export default Login;
