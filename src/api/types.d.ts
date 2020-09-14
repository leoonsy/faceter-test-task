export interface IGetRecordsSettings {
  // Название записи
  recordsName?: string;
  // Количество выдаваемых сервером записей на страницу
  recordsPerPage: number;
  // Общее число всех записей
  recordsCount: number;
  // Начальный номер требуемых записей
  startRecord: number;
  // Количество требуемых записей
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
    count: number;
  };
}
