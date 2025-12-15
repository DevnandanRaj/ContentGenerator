import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FiRefreshCw, FiMic } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import ContentCard from './ContentCard';
import Header from './Header';
import TrendingTopics from './TrendingTopics';
import HistoryPanel from './HistoryPanel';
import { useHistory, useStats } from '../hooks/useLocalStorage';
import { contentThemes } from '../utils/contentThemes';
import { fadeIn } from '../utils/animations';

const MotionBox = motion(Box);

const contentTypes = [
  { value: 'shayari', label: '📜 Shayari' },
  { value: 'joke', label: '😂 Joke' },
  { value: 'quote', label: '💭 Quote' },
  { value: 'story', label: '📖 Story' },
  { value: 'riddle', label: '🤔 Riddle' },
  { value: 'pickup-line', label: '💘 Pickup Line' },
  { value: 'roast', label: '🔥 Roast' },
  { value: 'compliment', label: '🌟 Compliment' },
  { value: 'dad-joke', label: '👨 Dad Joke' },
  { value: 'haiku', label: '🎋 Haiku' },
  { value: 'rap-lyrics', label: '🎤 Rap Lyrics' },
  { value: 'tweet-thread', label: '🐦 Tweet Thread' },
  { value: 'acrostic', label: '✍️ Acrostic' },
  { value: 'motivational-speech', label: '💪 Motivational Speech' }
];

const tones = [
  { value: 'funny', label: '😄 Funny' },
  { value: 'serious', label: '🧐 Serious' },
  { value: 'romantic', label: '💖 Romantic' },
  { value: 'motivational', label: '🚀 Motivational' }
];

const lengths = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' }
];

function Content() {
  const [type, setType] = useState('joke');
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState('funny');
  const [length, setLength] = useState('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMetadata, setCurrentMetadata] = useState(null);

  const toast = useToast();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();
  const { stats, updateStats } = useStats();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast({
        title: 'Keyword Required',
        description: 'Please enter a keyword to generate content',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    // Prevent multiple simultaneous requests
    if (loading) {
      return;
    }

    setLoading(true);
    setGeneratedContent('');

    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          keyword: keyword.trim(),
          tone,
          length
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setGeneratedContent(data.result);
        setCurrentMetadata(data.metadata);

        // Add to history
        addToHistory({
          type,
          keyword: keyword.trim(),
          tone,
          length,
          content: data.result
        });

        // Update stats
        updateStats(type);

        // Show confetti for success
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        toast({
          title: 'Success!',
          description: 'Content generated successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      } else {
        throw new Error(data.message || data.error || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error generating content:', error);

      // Handle specific error types
      let errorTitle = 'Generation Failed';
      let errorDescription = error.message || 'An error occurred. Please try again.';

      // Check if it's a 429 rate limit error
      if (error.message?.includes('rate limit') || error.message?.includes('429') || error.message?.includes('wait')) {
        errorTitle = 'Too Many Requests';
        errorDescription = error.message || 'Please wait a few seconds before trying again.';
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      setGeneratedContent('');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (keyword) {
      handleGenerate();
    }
  };

  const handleHistorySelect = (item) => {
    setType(item.type);
    setKeyword(item.keyword);
    setTone(item.tone);
    setLength(item.length);
    setGeneratedContent(item.content);
    setCurrentMetadata({
      type: item.type,
      keyword: item.keyword,
      tone: item.tone,
      length: item.length
    });
  };

  const handleTrendingSelect = (selectedKeyword) => {
    setKeyword(selectedKeyword);
  };

  return (
    <Box
      minHeight="100vh"
      bgGradient="linear-gradient(135deg, #667eea15 0%, #764ba215 50%, #f093fb15 100%)"
      _dark={{
        bgGradient: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a1f2e 100%)'
      }}
      p={{ base: 4, md: 8 }}
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <Box maxW="1400px" mx="auto">
        {/* Header */}
        <Header stats={stats} />

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
          {/* Left Panel - History */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <HistoryPanel
              history={history}
              onSelect={handleHistorySelect}
              onDelete={removeFromHistory}
              onClear={clearHistory}
            />
          </Box>

          {/* Main Content Area */}
          <Box gridColumn={{ base: 'auto', lg: 'span 2' }}>
            <Tabs isFitted variant="soft-rounded" colorScheme="purple">
              <TabList mb={4}>
                <Tab>Generator</Tab>
                <Tab display={{ base: 'block', lg: 'none' }}>History</Tab>
              </TabList>

              <TabPanels>
                {/* Generator Tab */}
                <TabPanel p={0}>
                  <MotionBox
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    bg="white"
                    _dark={{ bg: 'gray.800' }}
                    borderRadius="xl"
                    p={6}
                    boxShadow="xl"
                  >
                    <VStack spacing={6} align="stretch">
                      {/* Content Type Selection */}
                      <FormControl>
                        <FormLabel fontWeight="semibold">Content Type</FormLabel>
                        <Select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          size="lg"
                          borderRadius="lg"
                        >
                          {contentTypes.map((ct) => (
                            <option key={ct.value} value={ct.value}>
                              {ct.label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      {/* Keyword Input */}
                      <FormControl>
                        <FormLabel fontWeight="semibold">Keyword</FormLabel>
                        <InputGroup size="lg">
                          <Input
                            placeholder="Enter a keyword (e.g., love, cats, success)"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                            borderRadius="lg"
                          />
                          <InputRightElement>
                            <IconButton
                              icon={<FiMic />}
                              size="sm"
                              variant="ghost"
                              aria-label="Voice input"
                              isDisabled
                              title="Voice input coming soon"
                            />
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>

                      {/* Trending Topics */}
                      <TrendingTopics onSelect={handleTrendingSelect} />

                      {/* Tone and Length */}
                      <SimpleGrid columns={2} spacing={4}>
                        <FormControl>
                          <FormLabel fontWeight="semibold">Tone</FormLabel>
                          <Select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            size="md"
                            borderRadius="lg"
                          >
                            {tones.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel fontWeight="semibold">Length</FormLabel>
                          <Select
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            size="md"
                            borderRadius="lg"
                          >
                            {lengths.map((l) => (
                              <option key={l.value} value={l.value}>
                                {l.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </SimpleGrid>

                      {/* Generate Button */}
                      <HStack spacing={3}>
                        <Button
                          onClick={handleGenerate}
                          isLoading={loading}
                          loadingText="Generating..."
                          size="lg"
                          w="full"
                          bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          color="white"
                          _hover={{
                            bgGradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.5)'
                          }}
                          _active={{
                            transform: 'translateY(0)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                          }}
                          transition="all 0.2s"
                          boxShadow="0 4px 16px rgba(102, 126, 234, 0.4)"
                          borderRadius="xl"
                          fontWeight="700"
                          fontSize="lg"
                        >
                          ✨ Generate
                        </Button>

                        {generatedContent && (
                          <IconButton
                            icon={<FiRefreshCw />}
                            onClick={handleRegenerate}
                            size="lg"
                            aria-label="Regenerate"
                            title="Regenerate with same parameters"
                            isDisabled={loading}
                          />
                        )}
                      </HStack>

                      {/* Generated Content Display */}
                      {generatedContent && currentMetadata && (
                        <ContentCard
                          type={currentMetadata.type}
                          content={generatedContent}
                          keyword={currentMetadata.keyword}
                          tone={currentMetadata.tone}
                          length={currentMetadata.length}
                        />
                      )}

                      {!generatedContent && !loading && (
                        <Box textAlign="center" py={8}>
                          <Text fontSize="4xl" mb={2}>🎨</Text>
                          <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                            Enter a keyword and click Generate to create amazing AI content!
                          </Text>
                        </Box>
                      )}
                    </VStack>
                  </MotionBox>
                </TabPanel>

                {/* Mobile History Tab */}
                <TabPanel p={0} display={{ base: 'block', lg: 'none' }}>
                  <HistoryPanel
                    history={history}
                    onSelect={handleHistorySelect}
                    onDelete={removeFromHistory}
                    onClear={clearHistory}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Content;
