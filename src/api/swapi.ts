import HTTP from "../libs/http-common";
// eslint-disable-next-line no-unused-vars
import { IGetPlanetsSettings, IPlanet, IStatistics } from "./types";

class SWApi {
  public static async getPlanetById(id: number) {
    return (await HTTP.get(`planets/${id}/`)).data as IPlanet;
  }

  public static async getPlanets({
    planetsPerPage,
    planetsCount,
    startPlanet,
    limit
  }: IGetPlanetsSettings) {
    return (await this._getLimitedPaginatedPosts(
      "planets",
      planetsPerPage,
      planetsCount,
      startPlanet,
      limit
    )) as IPlanet[];
  }

  public static async getPlanetsInfo(): Promise<[number, number]> {
    const planetsInfo = (await HTTP.get("planets/")).data;
    return [planetsInfo.count, planetsInfo.results.length];
  }

  public static async getStatistics() {
    const rootPosts = (await HTTP.get("")).data;
    const postNames = Object.keys(rootPosts);
    let statistics: IStatistics = new Array(postNames.length);
    let statisticsIndex = 0;

    await Promise.all(
      postNames.map(async name => {
        const index = statisticsIndex++;
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

  private static async _getLimitedPaginatedPosts(
    postsName: string,
    postsPerPage: number,
    postsCount: number,
    startPost: number,
    limit: number
  ) {
    const end = startPost + limit - 1;
    const startPage = (((startPost - 1) / postsPerPage) | 0) + 1;
    const endPage = (((end - 1) / postsPerPage) | 0) + 1;
    if (startPost > postsCount) return [];

    const hasErrorEnd = end > postsCount;

    let postsByPage = [] as any[];

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      const response = (await HTTP.get(`${postsName}/?page=${pageNumber}`))
        .data;
      const post = response.results;

      postsByPage.push(post);

      if (!response.next) break;
    }

    const posts = [].concat(...postsByPage);
    const startSkip = (startPost - 1) % postsPerPage;
    let endSkip;
    if (hasErrorEnd) endSkip = 0;
    else endSkip = (postsPerPage - (end % postsPerPage)) % postsPerPage;

    return posts.slice(startSkip, posts.length - endSkip);
  }
}

export default SWApi;
