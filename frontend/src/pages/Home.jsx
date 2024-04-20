import {
  Box,
  Button,
  Divider,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllBooks, editBook, deleteBook } from "../modules/fetch";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    const fetchedBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchedBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    onOpen();
  };

  const handleSave = async () => {
    await editBook(selectedBook);
    onClose();
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
  };

  const handleDeleteConfirmation = (book) => {
    setBookToDelete(book);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDelete = async () => {
    await deleteBook(bookToDelete.id);
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <>
      <Box w={"100vw"} p={8}>
        <Divider pt={8} />
        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Publisher</Th>
                <Th isNumeric>Year</Th>
                <Th>Image</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {books?.books?.map((book, index) => (
                <Tr key={index}>
                  <Td>{book.title}</Td>
                  <Td>{book.author}</Td>
                  <Td>{book.publisher}</Td>
                  <Td isNumeric>{book.year}</Td>
                  <Td maxW="100px" maxH="100px">
                    <Image
                      w="100%"
                      h="auto"
                      src={`http://localhost:8000/${book.image}`}
                      alt={book.title}
                    />
                  </Td>
                  <Td>
                    <Button
                      size={"xs"}
                      mr={2}
                      colorScheme="blue"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      size={"xs"}
                      colorScheme="red"
                      onClick={() => handleDeleteConfirmation(book)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={selectedBook?.title}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Author</FormLabel>
              <Input
                value={selectedBook?.author}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, author: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Publisher</FormLabel>
              <Input
                value={selectedBook?.publisher}
                onChange={(e) =>
                  setSelectedBook({
                    ...selectedBook,
                    publisher: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                value={selectedBook?.year}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, year: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this book?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={() => setIsDeleteConfirmationOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
