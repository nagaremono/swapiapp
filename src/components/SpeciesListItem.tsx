import {
  SimpleGrid,
  Heading,
  HStack,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  Tag,
  Text,
} from '@chakra-ui/core';
import React from 'react';
import { Species } from '../types/species';

interface ListItemProps {
  species: Species;
}

interface ItemDetailProps {
  label: string;
  content: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ label, content }) => {
  return (
    <ListItem display="flex">
      <Text as="span" minW="25%">
        {label}
      </Text>{' '}
      {content.split(', ').map((c, i) => (
        <Tag size="md" layerStyle="tags" mr={2} key={i}>
          {c}
        </Tag>
      ))}
    </ListItem>
  );
};

export const SpeciesListItem: React.FC<ListItemProps> = ({
  species,
  children,
}) => {
  return (
    <SimpleGrid
      alignItems="center"
      columns={2}
      spacingY={1}
      width="100%"
      key={species.name}
    >
      <Heading fontSize="2xl" as="h3">
        {species.name}
      </Heading>
      <HStack justifySelf="end">
        <Badge layerStyle="tags">{species.classification}</Badge>
        <Badge layerStyle="tags">{species.designation}</Badge>
      </HStack>
      <Accordion
        layerStyle="custBorder"
        gridRow="3"
        gridColumn="1 / -1"
        allowToggle
      >
        <AccordionItem>
          <AccordionButton height={8}>
            <Box flex="1" textAlign="left">
              View Detail
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <List spacing={2}>
              <ItemDetail
                label="Avg. Height: "
                content={species.average_height + ' cm'}
              />
              <ItemDetail
                label="Avg. Lifespan: "
                content={species.average_lifespan + ' years'}
              />
              <ItemDetail label="Language: " content={species.language} />
              <ItemDetail label="Hair Colors: " content={species.hair_colors} />
              <ItemDetail label="Eye Color: " content={species.eye_colors} />
              <ItemDetail label="Skin Colors:" content={species.hair_colors} />
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {children}
    </SimpleGrid>
  );
};
