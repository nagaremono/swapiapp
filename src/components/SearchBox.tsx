import { Button, HStack, Input } from '@chakra-ui/core';
import { useFormik } from 'formik';
import React from 'react';

interface SearchBoxProps {
  onSubmit: (string: string) => Promise<void>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      searchTerm: '',
    },
    onSubmit: async (values, action) => {
      await onSubmit(values.searchTerm);
      action.setSubmitting(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <HStack>
        <Input
          placeholder="Search here..."
          name="searchTerm"
          type="em"
          onChange={formik.handleChange}
          value={formik.values.searchTerm}
        />
        <Button isLoading={formik.isSubmitting} type="submit">
          Submit
        </Button>
      </HStack>
    </form>
  );
};
