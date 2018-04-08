const url = '';
const key = '';

class PublicDns {
    static forward(qs) {
        const u = url + '?fqdn=' + qs;
        var h = {
            type: 'GET',
            mode: 'cors',
            headers: {
                'x-api-key': key,
            }
        };
        return fetch(u, h)
        .then(function(response) {
            return response.json();
        });
    }
}

export default PublicDns;
