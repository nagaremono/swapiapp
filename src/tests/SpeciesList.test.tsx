import React from 'react';
import { SpeciesList } from '../components/SpeciesList';
import { render } from '../test-utils';
import { screen } from '@testing-library/react';

describe('SpeciesList:', () => {
  test('gets rendered', () => {
    render(<SpeciesList />);

    expect(screen.getByText(/Species List/i)).toBeInTheDocument();
  });
});
