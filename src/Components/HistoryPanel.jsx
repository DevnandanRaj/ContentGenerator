import React from 'react';
import {
    Box,
    VStack,
    Text,
    HStack,
    IconButton,
    Badge,
    Tooltip,
    Divider,
    Button
} from '@chakra-ui/react';
import { FiTrash2, FiClock, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { contentThemes } from '../utils/contentThemes';

const MotionBox = motion(Box);

const HistoryPanel = ({ history, onSelect, onDelete, onClear }) => {
    if (history.length === 0) {
        return (
            <Box
                bg="white"
                _dark={{ bg: 'gray.800' }}
                borderRadius="xl"
                p={6}
                textAlign="center"
            >
                <Text fontSize="4xl" mb={2}>📜</Text>
                <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                    No history yet
                </Text>
                <Text fontSize="sm" color="gray.400" _dark={{ color: 'gray.500' }}>
                    Generated content will appear here
                </Text>
            </Box>
        );
    }

    return (
        <Box
            bg="white"
            _dark={{ bg: 'gray.800' }}
            borderRadius="xl"
            p={4}
            maxH="600px"
            overflowY="auto"
            boxShadow="lg"
        >
            <HStack justify="space-between" mb={4}>
                <Text fontWeight="bold" fontSize="lg">
                    📜 History
                </Text>
                <Button
                    size="sm"
                    leftIcon={<FiTrash2 />}
                    onClick={onClear}
                    variant="ghost"
                    colorScheme="red"
                >
                    Clear All
                </Button>
            </HStack>

            <Divider mb={4} />

            <VStack spacing={2} align="stretch">
                <AnimatePresence>
                    {history.map((item, index) => {
                        const theme = contentThemes[item.type] || contentThemes.joke;
                        return (
                            <MotionBox
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                p={3}
                                borderRadius="lg"
                                bg="gray.50"
                                _dark={{ bg: 'gray.700' }}
                                cursor="pointer"
                                _hover={{
                                    bg: 'gray.100',
                                    _dark: { bg: 'gray.600' },
                                    transform: 'translateX(4px)',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => onSelect(item)}
                                position="relative"
                            >
                                <HStack justify="space-between">
                                    <HStack spacing={2} flex={1}>
                                        <Text fontSize="lg">{theme.icon}</Text>
                                        <VStack align="start" spacing={0} flex={1}>
                                            <HStack>
                                                <Badge colorScheme="purple" fontSize="xs">
                                                    {item.type}
                                                </Badge>
                                                <Text fontSize="sm" fontWeight="medium">
                                                    {item.keyword}
                                                </Text>
                                            </HStack>
                                            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }} noOfLines={1}>
                                                {item.content}
                                            </Text>
                                            <HStack spacing={1} fontSize="xs" color="gray.400">
                                                <FiClock size={10} />
                                                <Text>{new Date(item.timestamp).toLocaleDateString()}</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                    <IconButton
                                        icon={<FiX />}
                                        size="xs"
                                        variant="ghost"
                                        colorScheme="red"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id);
                                        }}
                                        aria-label="Delete from history"
                                    />
                                </HStack>
                            </MotionBox>
                        );
                    })}
                </AnimatePresence>
            </VStack>
        </Box>
    );
};

export default HistoryPanel;
