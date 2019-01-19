const apiHost = 'http://localhost:8080/heroes/';

class ApiClient {
    sendRequest (method,resource,data=null) {
        return fetch(`${apiHost}${resource}.json`, {
            method,
            body: data ? JSON.stringify(data) : null
        })
            .then(response => response.json())
            .then(info => {
                console.log(info);
                return info;
            })
    }
    addHero(hero){
        return this.sendRequest('POST', '/heroes', hero);
    }
    getHeroes(){
        return this.sendRequest('GET', '/heroes');
    }

    putHero(heroId, hero){
        return this.sendRequest('PUT', `/heroes/${heroId}`, hero);
    }

    deleteHero(heroId){
        return this.sendRequest('DELETE', `/heroes/${heroId}`);
    }
    addHeroPost(heroId, posts) {
        return this.sendRequest('POST', `/heroes/${heroId}/posts`);
    }

    getHeroPosts(heroId) {
        return this.sendRequest('GET', `/heroes/${heroId}posts`);
    }
}

const client = new ApiClient();

client.sendRequest('GET', '/heroes');
