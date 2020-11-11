import { setupServer } from 'msw/node';
import { rest } from 'msw';
import speciesResponse from '../mocks/speciesResponse.json';
import { BASE_API_URL } from '../constants';

export const server = setupServer(
  rest.get(`${BASE_API_URL}/species`, (req, res, ctx) => {
    return res(ctx.json({ ...speciesResponse }));
  })
);
