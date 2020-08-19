export interface IGetPlanetsSettings {
  planetsPerPage: number;
  planetsCount: number;
  startPlanet: number;
  limit: number;
}

export interface IPlanet {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  url: string;
}

export interface IStatistics {
  [index: number]: {
    name: string;
    count: string;
  };
}
