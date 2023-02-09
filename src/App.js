import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { Wrapper } from "./components/Wrapper";

const colorArray = [
  "red.500",
  "orange.600",
  "yellow.400",
  "green.300",
  "teal.400",
  "blue.500",
  "cyan.600",
  "purple.400",
  "pink.500",
];

function App() {
  const [quote, setQuote] = useState([]);
  const [color, setColor] = useState(colorArray[0]);
  const [visible, setVisible] = useState(true);

  const fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setQuote(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchQuote();
  }, [color]);

  const handleClick = () => {
    const index = colorArray.indexOf(color);
    setColor(colorArray[(index + 1) % colorArray.length]);
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 500);
  };

  // color: Math.floor(Math.random()*color.length);

  return Object.keys(quote).length > 0 ? (
    <Wrapper bg={color} transition="background-color 0.35s ease-in-out">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="14"
        w="2xl"
        bg="whiteAlpha.900"
      >
        <VStack spacing="10" mb="10">
          <Heading
            as="h1"
            size="lg"
            fontWeight="medium"
            color={color}
            opacity={visible ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
          >
            {quote.content}
          </Heading>
          <Text
            as="em"
            fontSize="md"
            alignSelf="end"
            noOfLines={1}
            color={color}
            opacity={visible ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
          >
            - {quote.author}
          </Text>
        </VStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Link href="https://twitter.com/intent/tweet" isExternal>
            <Button bg={color} size="lg">
              <Icon as={FaTwitter} />
            </Button>
          </Link>
          <Button bg={color} size="lg" onClick={handleClick}>
            New Quote
          </Button>
        </HStack>
      </Box>
    </Wrapper>
  ) : (
    <Wrapper>
      <h1>Data pending...</h1>
    </Wrapper>
  );
}

export default App;
