import React from 'react';
import {
    Box,
    HStack,
    Text,
    IconButton,
    useColorMode,
    Tooltip,
    Badge
} from '@chakra-ui/react';
import { FiSun, FiMoon, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Header = ({ stats }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <MotionBox
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            bg="rgba(255, 255, 255, 0.7)"
            _dark={{ bg: 'rgba(26, 32, 44, 0.7)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            p={5}
            mb={6}
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.3)"
        >
            <HStack justify="space-between">
                {/* Logo and Title */}
                <HStack spacing={3}>
                    <MotionBox
                        bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        p={2.5}
                        borderRadius="xl"
                        boxShadow="0 4px 16px rgba(102, 126, 234, 0.4)"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Text fontSize="2xl">✨</Text>
                    </MotionBox>
                    <Box>
                        <Text
                            fontSize="2xl"
                            fontWeight="800"
                            bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            bgClip="text"
                            letterSpacing="-0.5px"
                        >
                            Creative AI Studio
                        </Text>
                        <Text
                            fontSize="xs"
                            color="gray.600"
                            _dark={{ color: 'gray.400' }}
                            fontWeight="500"
                        >
                            Powered by Google Gemini 2.0
                        </Text>
                    </Box>
                </HStack>

                {/* Stats and Actions */}
                <HStack spacing={4}>
                    {stats && stats.totalGenerations > 0 && (
                        <MotionBox
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Tooltip label="Total Generations" placement="bottom">
                                <Badge
                                    colorScheme="purple"
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    boxShadow="0 4px 12px rgba(102, 126, 234, 0.3)"
                                    fontWeight="600"
                                >
                                    <HStack spacing={2}>
                                        <FiZap size={14} />
                                        <Text fontSize="sm">{stats.totalGenerations}</Text>
                                    </HStack>
                                </Badge>
                            </Tooltip>
                        </MotionBox>
                    )}

                    <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`} placement="bottom">
                        <MotionBox
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <IconButton
                                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                                onClick={toggleColorMode}
                                variant="ghost"
                                aria-label="Toggle color mode"
                                size="lg"
                                _hover={{
                                    bg: 'purple.50',
                                    _dark: { bg: 'purple.900' }
                                }}
                            />
                        </MotionBox>
                    </Tooltip>
                </HStack>
            </HStack>
        </MotionBox>
    );
};

export default Header;
