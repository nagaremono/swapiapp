import React from 'react';
import { SpeciesList } from '../components/SpeciesList';
import { render } from '../test-utils';
import { cleanup, screen } from '@testing-library/react';
import speciesResponse from '../mocks/speciesResponse.json';

describe('SpeciesList: ', () => {
  beforeEach(() => render(<SpeciesList />));

  afterEach(() => cleanup());

  test('gets rendered', () => {
    expect(screen.getByText(/Species List/i)).toBeInTheDocument();
  });

  test('displays species minimal info', async () => {
    const { name, designation, classification } = speciesResponse.results[0];

    expect(await screen.findByText(name)).toBeInTheDocument();
    expect(await screen.findByText(designation)).toBeInTheDocument();
    expect(await screen.findByText(classification)).toBeInTheDocument();
  });
});
