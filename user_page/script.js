function getParameterByName(name) {
    name = name.replace(/[$$$$]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function fetchUser(id) {
return fetch(`https://server-user244.vercel.app/user/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

$(document).ready(function() {
    let userId = getParameterByName('user_id');
    if (userId) {
        fetchUser(userId)
        .then(response => {console.log(response.firstname);
            $('#content_firstname').text(response.firstname); 
            $('#content_lastname').text(response.lastname); 
            $('#content_company').text(response.company);
            $('#content_email').text(response.email);
            $('#content_userName').text(response.username);
    })}
});
