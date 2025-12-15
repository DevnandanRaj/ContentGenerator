import React from 'react';
import { Box, SimpleGrid, Badge, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { contentThemes } from '../utils/contentThemes';

const MotionBadge = motion(Badge);

const trendingKeywords = {
    love: ['romance', 'heartbreak', 'soulmate', 'forever'],
    humor: ['cats', 'coffee', 'Monday', 'sleep'],
    motivation: ['success', 'dreams', 'hustle', 'growth'],
    tech: ['AI', 'coding', 'future', 'innovation'],
    life: ['friendship', 'family', 'happiness', 'peace']
};

const TrendingTopics = ({ onSelect }) => {
    const allKeywords = Object.values(trendingKeywords).flat();
    const randomKeywords = allKeywords.sort(() => 0.5 - Math.random()).slice(0, 8);

    return (
        <VStack align="start" spacing={3} w="100%">
            <Text fontSize="sm" fontWeight="semibold" color="gray.600" _dark={{ color: 'gray.300' }}>
                💡 Trending Topics
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2} w="100%">
                {randomKeywords.map((keyword, index) => (
                    <MotionBadge
                        key={keyword}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        colorScheme="purple"
                        variant="subtle"
                        px={3}
                        py={2}
                        borderRadius="full"
                        cursor="pointer"
                        onClick={() => onSelect(keyword)}
                        textAlign="center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        {keyword}
                    </MotionBadge>
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default TrendingTopics;
