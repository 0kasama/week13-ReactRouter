import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook } from "../modules/fetch";

export default function NewBookPage() {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData(event.target);
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" required />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input name="author" required />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input name="publisher" required />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input name="year" type="number" required />
          </FormControl>
          <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input name="pages" type="number" required />
          </FormControl>
          {selectedImage && (
            <Image w={64} src={selectedImage} alt="Selected Image" />
          )}
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(URL.createObjectURL(file));
              }}
            />
          </FormControl>
          <Button colorScheme="blue" color={"white"} type="submit">
            Add Book
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
