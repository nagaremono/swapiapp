import React from 'react';
import { SpeciesList } from '../components/SpeciesList';
import { render } from '../test-utils';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
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

  test('displays search result', async () => {
    const { name } = speciesResponse.results[0];

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText(/Search/i), {
        target: { value: name },
      });

      fireEvent.click(screen.getByRole('button'));
    });

    expect(await screen.findByText(name)).toBeInTheDocument();
  });

  test('does not display nonexisting species', async () => {
    const randomName = 'non existing species name';

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText(/Search/i), {
        target: { value: randomName },
      });

      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.queryByText(randomName)).not.toBeInTheDocument();
  });
});
