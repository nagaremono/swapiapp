import React from 'react';
import { SpeciesList } from '../components/SpeciesList';
import { render } from '../test-utils';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import speciesResponse from '../mocks/speciesResponse.json';

describe('SpeciesList: ', () => {
  beforeEach(() => render(<SpeciesList />));

  afterEach(() => cleanup());

  test('displays search result', async () => {
    const { name } = speciesResponse.results[0];

    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: name },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => screen.getByText(name));

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test('does not display nonexisting species', async () => {
    const randomName = 'non existing species name';

    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: randomName },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => screen.queryByText(randomName));

    expect(screen.queryByText(randomName)).not.toBeInTheDocument();
  });

  test('displays detailed info', async () => {
    const elements = await screen.findAllByText(
      /\bhair|\beye|\bskin|\bheight|\blifespan|\blanguage/gi
    );

    expect(elements).toBeTruthy();
  });
});
