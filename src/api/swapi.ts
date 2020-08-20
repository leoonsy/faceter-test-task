import HTTP from "@/libs/http-common";
// eslint-disable-next-line no-unused-vars
import { IGetRecordsSettings, IPlanet, IStatistics } from "./types";

class SWApi {
  /**
   * Получить планету по id
   */
  public static async getPlanetById(id: number) {
    return (await HTTP.get(`planets/${id}/`)).data as IPlanet;
  }

  /**
   * Получить требуемые планеты
   */
  public static async getPlanets({
    recordsPerPage,
    recordsCount,
    startRecord,
    limit
  }: IGetRecordsSettings) {
    return (await this._getLimitedPaginatedRecords({
      recordsName: "planets",
      recordsPerPage,
      recordsCount,
      startRecord,
      limit
    })) as IPlanet[];
  }

  /**
   * Получить информацию о планетах
   * @returns {Promise<[number, number]>} Общее число планет и получаемых за 1 запрос
   */
  public static async getPlanetsInfo(): Promise<[number, number]> {
    const planetsInfo = (await HTTP.get("planets/")).data;
    return [planetsInfo.count, planetsInfo.results.length];
  }

  /**
   * Получить статистику из root
   */
  public static async getStatistics() {
    const rootPosts = (await HTTP.get("")).data;
    const postNames = Object.keys(rootPosts);
    let statistics: IStatistics = new Array(postNames.length);

    // получаем статистику асинхронно (так быстрее)
    await Promise.all(
      postNames.map(async (name, index) => {
        const count = (
          await HTTP({
            url: rootPosts[name].replace("http://", "https://"),
            baseURL: ""
          })
        ).data.count;

        statistics[index] = {
          name,
          count
        };
      })
    );

    return statistics;
  }

  /**
   * Получить определенное количество записей (планет, людей и т.д.), начиная с определенного номера
   */
  private static async _getLimitedPaginatedRecords({
    recordsName,
    recordsPerPage,
    recordsCount,
    startRecord,
    limit
  }: IGetRecordsSettings) {
    const end = startRecord + limit - 1;
    const startPage = (((startRecord - 1) / recordsPerPage) | 0) + 1;
    const endPage = (((end - 1) / recordsPerPage) | 0) + 1;
    if (startRecord > recordsCount) return [];

    const hasErrorEnd = end > recordsCount;

    let postsByPage = [] as any[];

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      const response = (await HTTP.get(`${recordsName}/?page=${pageNumber}`))
        .data;
      const post = response.results;

      postsByPage.push(post);

      if (!response.next) break;
    }

    const posts = [].concat(...postsByPage);
    const startSkip = (startRecord - 1) % recordsPerPage;
    let endSkip;
    if (hasErrorEnd) endSkip = 0;
    else endSkip = (recordsPerPage - (end % recordsPerPage)) % recordsPerPage;

    return posts.slice(startSkip, posts.length - endSkip);
  }
}

export default SWApi;
