import HTTP from './http-common';

class SWApi {
    
    constructor({objectsPerPage = 10} = {}) {
        this.objectsPerPage = objectsPerPage;
    }
    
    async getPlanetById(id) {
        return (await HTTP.get(`planets/${id}`)).data;
    }
    
    async _getLimitedPaginatedObjects(objectsName, start = 1, limit = 10) {
        const { objectsPerPage } = this;
        const end = start + limit - 1;
        const startPage = ((start - 1) / objectsPerPage | 0) + 1;
        const endPage = ((end - 1) / objectsPerPage | 0) + 1;
        let hasErrorPage = false;

        let objectsByPage = [];

        for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            try {
                const response = (await HTTP.get(`${objectsName}/?page=${pageNumber}`)).data;
                const object = response.results;

                objectsByPage.push(object);

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

        const objects = [].concat(...objectsByPage);
        const startSkip = (start - 1) % objectsPerPage;
        let endSkip;
        if (hasErrorPage)
            endSkip = 0;
        else
            endSkip = (objectsPerPage - end % objectsPerPage) % objectsPerPage;

        return objects.slice(startSkip, objects.length - endSkip);       
    }
    
    async getPlanets(start = 1, limit = 10) {
        return this._getLimitedPaginatedObjects('planets', start, limit);
    }
}

export default SWApi;