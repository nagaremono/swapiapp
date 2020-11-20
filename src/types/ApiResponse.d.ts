import { Species } from './species';

/**
 * Response object from https://swapi.dev/species
 */
export interface ApiResponse {
  /**
   * Total known species
   */
  count: number;
  /**
   * URL to next page
   */
  next: string | null;
  /**
   * URL to previous page
   */
  previous: string | null;
  /**
   * Array of Species object
   */
  results: Species[] | null;
}
