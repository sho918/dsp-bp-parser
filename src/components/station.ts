// itemId = 2103, 2104
export class dStation {
  parameters: number[];
  itemCount: number;
  itemSettings: Record<string, number>[];
  storage: Record<string, number>[];
  config: Record<string, number>;

  constructor(buildingItemId: number, parameters: number[]) {
    this.parameters = parameters;
    this.itemCount = this.getItemCount(buildingItemId);
    this.itemSettings = this.getItemSettings(0);
    this.storage = this.getStorage(0 + 192);
    this.config = this.getConfig(0 + 192 + 128);
  }

  getItemCount(buildingItemId: number): number {
    if (buildingItemId === 2103) {
      return 3; // Planetary Logistics Station (itemSlot: 3)
    } else {
      return 5; // Interstellar Logistics Station (itemSlot: 5)
    }
  }

  getItemSettings(baseIdx: number): Record<string, number>[] {
    const results: Record<string, number>[] = [];

    for (let i = 0; i < this.itemCount; i++) {
      results.push(
        Object({
          itemId: this.parameters[baseIdx + i * 6],
          localLogic: this.parameters[baseIdx + i * 6 + 1],
          remoteLogic: this.parameters[baseIdx + i * 6 + 2],
          max: this.parameters[baseIdx + i * 6 + 3],
        }),
      );
    }

    return results;
  }

  getStorage(baseIdx: number): Record<string, number>[] {
    const results: Record<string, number>[] = [];

    for (let i = 0; i < this.itemCount; i++) {
      results.push(
        Object({
          dir: this.parameters[baseIdx + i * 4],
          storageIdx: this.parameters[baseIdx + i * 4 + 1],
        }),
      );
    }

    return results;
  }

  getConfig(baseIdx: number): Record<string, number> {
    return Object({
      workEnergyPerTick: this.parameters[baseIdx],
      tripRangeDrones: this.parameters[baseIdx + 1],
      tripRangeShips: this.parameters[baseIdx + 2],
      includeOrbitCollector: this.parameters[baseIdx + 3],
      warpEnableDist: this.parameters[baseIdx + 4],
      warperNecessary: this.parameters[baseIdx + 5],
      deliveryDrones: this.parameters[baseIdx + 6],
      deliveryShips: this.parameters[baseIdx + 7],
    });
  }
}
