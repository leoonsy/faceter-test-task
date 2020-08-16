import HTTP from './http-common';

class SWApi {
    
    constructor({ postsPerPage }) {
        this.postsPerPage = postsPerPage;
    }
    
    async getPlanetById(id) {
        return (await HTTP.get(`planets/${id}`)).data;
    }
    
    async getPlanets(start = 1, limit = 10) {
        return this._getLimitedPaginatedPosts('planets', start, limit);
    }

    async _getLimitedPaginatedPosts(postsName, start = 1, limit = 10) {
        const { postsPerPage } = this;
        const end = start + limit - 1;
        const startPage = ((start - 1) / postsPerPage | 0) + 1;
        const endPage = ((end - 1) / postsPerPage | 0) + 1;
        let hasErrorPage = false;

        let postsByPage = [];

        for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            try {
                const response = (await HTTP.get(`${postsName}/?page=${pageNumber}`)).data;
                const post = response.results;

                postsByPage.push(post);

                if (!response.next) {
                    if (pageNumber < endPage)
                        hasErrorPage = true;
                    break;
                }
            }
            catch {
                hasErrorPage = true;
            }
        }

        const posts = [].concat(...postsByPage);
        const startSkip = (start - 1) % postsPerPage;
        let endSkip;
        if (hasErrorPage)
            endSkip = 0;
        else
            endSkip = (postsPerPage - end % postsPerPage) % postsPerPage;

        return posts.slice(startSkip, posts.length - endSkip);
    }
}

export default SWApi;