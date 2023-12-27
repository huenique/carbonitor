import { UserWaste } from '../db';

/**
 * Calculates the total CO2e (Carbon Dioxide Equivalent) emissions based on the given array of waste items.
 *
 * @param waste - An array of waste items.
 * @returns The total CO2e emissions.
 */
export function calculateTotalCO2e(waste: UserWaste[]): number {
  return waste.reduce(
    // to calculate the total CO2e, we need to sum the CO2e of each waste item
    (acc, curr) => acc + curr.co2e,

    // the initial value of the accumulator is 0
    0
  );
}
