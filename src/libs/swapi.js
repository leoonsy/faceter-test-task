import HTTP from "./http-common";

class SWApi {
  static async getPlanetById(id) {
    try {
      return (await HTTP.get(`planets/${id}`)).data;
    } catch (e) {
      if (e.response && e.response.status === 404) return null;
      else throw e;
    }
  }

  static async getPlanets(planetsPerPage, planetsCount, startPlanet, limit) {
    return this._getLimitedPaginatedPosts({
      postsName: "planets",
      postsPerPage: planetsPerPage,
      postsCount: planetsCount,
      startPost: startPlanet,
      limit
    });
  }

  static async getPlanetsInfo() {
    const planetsInfo = (await HTTP.get("planets/")).data;
    return [planetsInfo.count, planetsInfo.results.length];
  }

  static async getStatistics() {
    const rootPosts = (await HTTP.get("")).data;
    const postNames = Object.keys(rootPosts);
    let statistics = new Array(postNames.length);
    let statisticsIndex = 0;

    await Promise.all(
      postNames.map(async name => {
        const index = statisticsIndex++;
        const count = (
          await HTTP({
            url: rootPosts[name],
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

  static async _getLimitedPaginatedPosts({
    postsName,
    postsPerPage,
    postsCount,
    startPost,
    limit
  }) {
    const end = startPost + limit - 1;
    const startPage = (((startPost - 1) / postsPerPage) | 0) + 1;
    const endPage = (((end - 1) / postsPerPage) | 0) + 1;
    if (startPost > postsCount) return [];

    const hasErrorEnd = end > postsCount;

    let postsByPage = [];

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
