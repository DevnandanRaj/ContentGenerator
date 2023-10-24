import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  Input,
  Text,
  Center,
  Spinner,
  VStack,
} from '@chakra-ui/react';

function Content() {
  const [type, setType] = useState('shayari');
  const [keyword, setKeyword] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContent = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://openai-yt9b.onrender.com/openai/get?type=${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setGeneratedContent(data.result);
      } else {
        setGeneratedContent("Please enter a keyword");
      }
    } catch (error) {
      console.log(error);
      setGeneratedContent('Error: An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);"
      minHeight="100vh"
      p={4}
      color="gray.800"
      fontFamily="serif"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={4} alignItems="center">
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="lg"
          w="100%"
          maxW="xl"
          textAlign="center"
          position="relative" 
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Content Generator
          </Text>
          <Select value={type} onChange={(e) => setType(e.target.value)} mb={4}>
            <option value="shayari">Shayari</option>
            <option value="joke">Joke</option>
            <option value="quote">Quote</option>
            <option value="story">Story</option>
          </Select>
          <Input
            placeholder="Enter a keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            mb={4}
          />
          <Button
            onClick={handleContent}
            mb={4}
            isLoading={loading}
            bgColor="blue.100"
          >
            Generate
          </Button>
          {generatedContent && (
            <Box
              bg="gray.100"
              p={4}
              rounded="lg"
              shadow="lg"
              w="100%"
              maxW="xl"
              textAlign="center"
            >
              <Text fontSize="lg" textAlign="center" mb={4}>
                Generated {type}
              </Text>
              <Text fontSize="lg" textAlign="center">
                {generatedContent}
              </Text>
              {loading && (
                <Center>
                  <Spinner />
                </Center>
              )}
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default Content;
