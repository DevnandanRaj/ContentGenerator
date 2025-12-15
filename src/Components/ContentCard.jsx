import React from 'react';
import {
    Box,
    Text,
    IconButton,
    HStack,
    VStack,
    useToast,
    Tooltip
} from '@chakra-ui/react';
import { FiCopy, FiDownload, FiHeart, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { contentThemes } from '../utils/contentThemes';
import { fadeIn, cardHover } from '../utils/animations';

const MotionBox = motion(Box);

const ContentCard = ({ type, content, keyword, tone, length, onFavorite }) => {
    const toast = useToast();
    const theme = contentThemes[type] || contentThemes.joke;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        toast({
            title: 'Copied!',
            description: 'Content copied to clipboard',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top'
        });
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${type}-${keyword}-${Date.now()}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        toast({
            title: 'Downloaded!',
            description: 'Content saved as text file',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top'
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${type} about ${keyword}`,
                    text: content
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    handleCopy();
                }
            }
        } else {
            handleCopy();
        }
    };

    return (
        <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            whileHover={{ scale: 1.02, y: -4 }}
            position="relative"
            bg="rgba(255, 255, 255, 0.8)"
            _dark={{ bg: 'rgba(26, 32, 44, 0.8)' }}
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 8px 24px rgba(0, 0, 0, 0.1)"
            _hover={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)' }}
            transition="all 0.3s ease"
            p={6}
            mb={4}
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.3)"
        >
            {/* Gradient Header with glow effect */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="4px"
                bgGradient={theme.gradient}
                boxShadow={`0 0 20px ${theme.color}40`}
            />

            {/* Header with Type and Actions */}
            <HStack justify="space-between" mb={4} mt={2}>
                <HStack spacing={3}>
                    <Text fontSize="3xl">{theme.icon}</Text>
                    <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="lg" textTransform="capitalize">
                            {type.replace('-', ' ')}
                        </Text>
                        <HStack spacing={2} fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
                            <Text fontWeight="600">#{keyword}</Text>
                            <Text>•</Text>
                            <Text>{tone}</Text>
                            <Text>•</Text>
                            <Text>{length}</Text>
                        </HStack>
                    </VStack>
                </HStack>

                <HStack spacing={1}>
                    <Tooltip label="Copy" placement="top">
                        <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                                icon={<FiCopy />}
                                size="sm"
                                variant="ghost"
                                onClick={handleCopy}
                                aria-label="Copy content"
                                _hover={{
                                    bg: 'purple.50',
                                    color: 'purple.600',
                                    _dark: { bg: 'purple.900', color: 'purple.200' }
                                }}
                            />
                        </MotionBox>
                    </Tooltip>
                    <Tooltip label="Download" placement="top">
                        <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                                icon={<FiDownload />}
                                size="sm"
                                variant="ghost"
                                onClick={handleDownload}
                                aria-label="Download content"
                                _hover={{
                                    bg: 'blue.50',
                                    color: 'blue.600',
                                    _dark: { bg: 'blue.900', color: 'blue.200' }
                                }}
                            />
                        </MotionBox>
                    </Tooltip>
                    <Tooltip label="Share" placement="top">
                        <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                                icon={<FiShare2 />}
                                size="sm"
                                variant="ghost"
                                onClick={handleShare}
                                aria-label="Share content"
                                _hover={{
                                    bg: 'green.50',
                                    color: 'green.600',
                                    _dark: { bg: 'green.900', color: 'green.200' }
                                }}
                            />
                        </MotionBox>
                    </Tooltip>
                    {onFavorite && (
                        <Tooltip label="Favorite" placement="top">
                            <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <IconButton
                                    icon={<FiHeart />}
                                    size="sm"
                                    variant="ghost"
                                    onClick={onFavorite}
                                    aria-label="Add to favorites"
                                    _hover={{
                                        bg: 'red.50',
                                        color: 'red.600',
                                        _dark: { bg: 'red.900', color: 'red.200' }
                                    }}
                                />
                            </MotionBox>
                        </Tooltip>
                    )}
                </HStack>
            </HStack>

            {/* Content */}
            <Box
                bg="rgba(255, 255, 255, 0.5)"
                _dark={{ bg: 'rgba(0, 0, 0, 0.2)' }}
                p={5}
                borderRadius="xl"
                minHeight="120px"
                border="1px solid"
                borderColor="rgba(0, 0, 0, 0.05)"
                _dark={{ bg: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.05)', color: 'gray.100' }}
            >
                <Text
                    fontSize="md"
                    lineHeight="tall"
                    whiteSpace="pre-wrap"
                    color="gray.800"
                    fontWeight="500"
                >
                    {content}
                </Text>
            </Box>
        </MotionBox>
    );
};

export default ContentCard;
