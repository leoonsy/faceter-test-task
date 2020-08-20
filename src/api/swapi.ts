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
   * Получить определенное количество планет, начиная с некоторого номера
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
   * Получить номер страницы по переданному номеру записи
   * @param recordsPerPage количество записей на странице
   * @param record номер записи
   * @private
   */
  private static _getPageByRecord(recordsPerPage: number, record: number) {
    return (((record - 1) / recordsPerPage) | 0) + 1;
  }

  /**
   * Получить определенное количество записей (планет, людей и т.д.), начиная с некоторого номера
   */
  private static async _getLimitedPaginatedRecords({
    recordsName,
    recordsPerPage,
    recordsCount,
    startRecord,
    limit
  }: IGetRecordsSettings) {
    if (startRecord > recordsCount) return [];
    const startPage = this._getPageByRecord(recordsPerPage, startRecord);

    let endRecord = startRecord + limit - 1;
    let endPage;
    if (endRecord > recordsCount) {
      endRecord = recordsCount;
      endPage = this._getPageByRecord(recordsPerPage, endRecord);
    } else endPage = this._getPageByRecord(recordsPerPage, endRecord);

    let postsByPage = new Array(endPage - startPage + 1);

    await Promise.all(
      //тут можно было бы lodash range использовать, но из-за 1 применения нет смысла
      [...postsByPage.keys()].map(async index => {
        const pageNumber = startPage + index;
        const response = (await HTTP.get(`${recordsName}/?page=${pageNumber}`))
          .data;
        postsByPage[index] = response.results;
      })
    );

    const posts = [].concat(...postsByPage);
    const startSkip = (startRecord - 1) % recordsPerPage;
    const endSkip =
      (recordsPerPage - (endRecord % recordsPerPage)) % recordsPerPage;

    return posts.slice(startSkip, posts.length - endSkip);
  }
}

export default SWApi;
