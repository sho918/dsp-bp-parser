import { Building } from './building';
import { Content } from './content';
import { Header } from './header';

import { dBelt } from '../components/belt';
import { dEjector } from '../components/ejector';
import { dInserter } from '../components/inserter';
import { dLab } from '../components/lab';
import { dSplitter } from '../components/splitter';
import { dStation } from '../components/station';
import { dStorage } from '../components/storage';
import { dTank } from '../components/tank';

export class Summary {
  gameVersion: string;
  shortDesc: string;
  desc: string;
  totalStructure: number;
  buildings: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  belts: Record<number, number>;
  inserters: Record<number, number>;

  constructor(header: Header, content: Content) {
    (this.gameVersion = header.gameVersion),
    (this.shortDesc = header.shortDesc),
    (this.desc = header.desc);
    this.totalStructure = content.num2;
    this.buildings = this.extractBuildings(content.buildings);
    this.belts = this.extractBelts(content.buildings);
    this.inserters = this.extractInserters(content.buildings);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractBuildings(buildings: Building[]): Record<number, any> {
    const ignoreIds: number[] = [2001, 2002, 2003, 2011, 2012, 2013]; // Belt, Inserter
    const results: Record<number, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

    for (let i = 0; i < buildings.length; i++) {
      if (ignoreIds.includes(buildings[i].itemId)) {
        continue;
      }

      // Initialize
      if (!results[buildings[i].itemId]) {
        results[buildings[i].itemId] = {
          count: 0,
          recipeIds: {},
          filterIds: {},
          parameters: [],
        };
      }

      if (
        !results[buildings[i].itemId].recipeIds[buildings[i].recipeId] &&
        buildings[i].recipeId !== 0
      ) {
        results[buildings[i].itemId].recipeIds[buildings[i].recipeId] = 0;
      }

      if (
        !results[buildings[i].itemId].filterIds[buildings[i].filterId] &&
        buildings[i].filterId !== 0
      ) {
        results[buildings[i].itemId].filterIds[buildings[i].filterId] = 0;
      }

      // Assign
      results[buildings[i].itemId].count += 1;

      if (buildings[i].recipeId !== 0) {
        results[buildings[i].itemId].recipeIds[buildings[i].recipeId] += 1;
      }

      if (buildings[i].filterId !== 0) {
        results[buildings[i].itemId].filterIds[buildings[i].filterId] += 1;
      }

      if (buildings[i].parameters.length !== 0) {
        results[buildings[i].itemId].parameters.push(
          this.extractParameter(buildings[i].itemId, buildings[i].parameters),
        );
      }
    }

    return results;
  }

  extractBelts(buildings: Building[]): Record<number, number> {
    const beltIds: number[] = [2001, 2002, 2003]; // Belt
    const results: Record<number, number> = { 2001: 0, 2002: 0, 2003: 0 };

    for (let i = 0; i < buildings.length; i++) {
      if (!beltIds.includes(buildings[i].itemId)) {
        continue;
      }

      results[buildings[i].itemId] += 1;
    }

    return results;
  }

  extractInserters(buildings: Building[]): Record<number, number> {
    const inserterIds: number[] = [2011, 2012, 2013]; // Inserter
    const results: Record<number, number> = { 2011: 0, 2012: 0, 2013: 0 };

    for (let i = 0; i < buildings.length; i++) {
      if (!inserterIds.includes(buildings[i].itemId)) {
        continue;
      }

      results[buildings[i].itemId] += 1;
    }

    return results;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractParameter(itemId: number, parameters: number[]): any {
    switch (itemId) {
    case 2001:
    case 2002:
    case 2003:
      return new dBelt(parameters);
    case 2311:
      return new dEjector(parameters);
    case 2011:
    case 2012:
    case 2013:
      return new dInserter(parameters);
    case 2901:
      return new dLab(parameters);
    case 2020:
      return new dSplitter(parameters);
    case 2103:
    case 2104:
      return new dStation(itemId, parameters);
    case 2101:
    case 2102:
      return new dStorage(parameters);
    case 2106:
      return new dTank(parameters);
    default:
      return {};
    }
  }
}
