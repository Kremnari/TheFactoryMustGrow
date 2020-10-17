interface GameDataObject {
  readonly type: string;
  readonly name: string;
  readonly localized_name: string;
  readonly order: string;
  readonly icon: Icon;
  tags: string[];
}
interface ItemCount {
  readonly item: Enum(&ItemType.name);
  readonly count: number;
}
interface ItemCountLevels {
  readonly item: Enum(&ItemType.name);
  readonly count: Formula(number);
}

interface ItemType extends GameDataObject {
  readonly HasEntity: boolean | string;
  stack_size: number;
}
interface Recipe extends GameDataObject {
  readonly Category: string;
  readonly CraftingTime: number;
  readonly Ingredients: ItemCount[];
  readonly Results: ItemCount[];
  readonly Catalyst?: ItemCount[];
  enabled: boolean;
  hidden: boolean;
}
interface Levelable aspects Recipe {
  level: number;
  readonly Ingredients: ItemCountLevels[];
  readonly Results: ItemCountLevels[];
  readonly Catalyst?: ItemCountLevels[];
  readonly CraftingTime: Formula(number);
}

interface Technology extends GameDataObject {
  readonly Prereqs: string[];
  readonly TicksPerUnit: number;
  readonly Units: ItemCount[];
  readonly UnitIterations: number;
  enabled: boolean;
  hidden: boolean;
  researched: boolean;
  completedUnits: number;
}

interface Entity extends GameDataObject {
  buffers: {
    input?: number[];
    output?: number[];
    catalyst?: number[];
    fuel?: number[];
  }
}

interface MiningEntity extends Entity {
  readonly ResourceCategories: string[];
  readonly MiningSpeed: number;
}
interface CraftingEntity extends Entity {
  readonly CraftingCategories: string[];
  readonly CraftingSpeed: number;

}
interface EnergyConsumer aspects @Entity {
  readonly EnergyUsage: number;
}

class 
