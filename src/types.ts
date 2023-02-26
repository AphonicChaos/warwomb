export enum UnitFaction {
  AeternusContinuum = "Aeternus Continuum",
  Empyrean = "Empyrean",
  IronStarAlliance = "Iron Star Alliance",
  MarcherWorlds = "Marcher Worlds",
  WildCard = "Wild Card"
};

export enum BaseSize {
  Small = 30,
  Medium = 40,
  Large = 50,
  Huge = 80
};

export enum UnitType {
  Warjack = "Warkjack",
  Squad = "Squad",
  Solo = "Solo",
};


export type Unit = {
  name: string;
  faction: UnitFaction;
  size: BaseSize,
  type: UnitType,
  isHero?: boolean;
  attachesTo?: Unit[];
  models?: number;
  playableFactions?: UnitFaction[]
};

export type PlacedUnit = SelectedUnit & {
  x: number;
  y: number;
};

export type SelectedUnit = Unit & {
    index: number;
};

