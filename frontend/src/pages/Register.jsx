import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Center,
  useToast,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(name, email, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <Flex h={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Box>
          <Card w={400}>
            <CardHeader>
              <Heading as="h2">Register</Heading>
            </CardHeader>
            <CardBody>
              <Box w="full" py={4} px={6}>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Box color="red.500" mb={4}>
                      {error}
                    </Box>
                  )}

                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {password !== confirmPassword && (
                      <Text fontSize="xs" color="red.500">
                        The password does not match
                      </Text>
                    )}
                  </FormControl>

                  <Button
                    mt={6}
                    colorScheme="blue"
                    color={"white"}
                    type="submit"
                  >
                    Register
                  </Button>
                </form>
              </Box>
            </CardBody>
            <CardFooter>
              <Text>
                Already have an account?{" "}
                <ChakraLink
                  as={Link}
                  to="/login"
                  color="blue"
                  textDecoration="underline"
                >
                  Login
                </ChakraLink>
              </Text>
            </CardFooter>
          </Card>
        </Box>
      </Center>
    </Flex>
  );
};

export default Register;
