function fetchAllUsers() {
    fetch('https://server-user244.vercel.app/list_user') // Thay đổi URL theo API của bạn
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tbody = $('#userTable tbody');
        tbody.empty();

        data.forEach(user => {
            const row = `
                <tr>
                    <td>
                        <a href="#" class="NameLink" data-id="${user.id}">${user.firstname}</a>
                    </td>
                    <td>${user.lastname}</td>
                    <td>${user.company}</td>
                    <td>${user.email}</td>
                    <td class="d-flex justify-content-center">
                        <button class="btn btn-info showModalBtn" data-id="${user.id}">Show</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
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

function addUser(){
    $('#submit').click(function() {
        const firstname = $('#firstname').val();
        const lastname = $('#lastname').val();
        const company = $('#company').val();
        const email = $('#email').val();
        const username = $('#username').val();
        const password = $('#password').val();
        
        const data = {
            firstname: firstname,
            lastname: lastname,
            company: company,
            email: email,
            username: username,
            password: password
        };

        fetch('https://server-user244.vercel.app/create-user/', { // Thay đổi URL theo API của bạn
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            $('#modalAdd').fadeOut();
            return fetchAllUsers();
        })
        .then(data => {
            $('#firstname').val(''); 
            $('#lastname').val(''); 
            $('#company').val('');
            $('#email').val('');
            $('#username').val('');
            $('#password').val('');
        })
    });
}

$(document).ready(function() {
    fetchAllUsers()
    $('#addUserBtn').click(function() {
        const modalAdd = $('#modalAdd');
        modalAdd.show();
    });

    $(window).click(function(event) {
        if ($(event.target).is("#modalShow")) {
            $("#modalShow").fadeOut();
        }

        if ($(event.target).is("#modalAdd")) {
            $("#modalAdd").fadeOut();
        }
    });

    addUser()

    $('#exportBtn').click(function() {
        var wb = XLSX.utils.table_to_book(document.getElementById('userTable'), { sheet: "Sheet1" });
        XLSX.writeFile(wb, 'du_lieu.xlsx');
    });
    
    $('#userTable').on('click', '.NameLink', function(event) {
        event.preventDefault();
        const user_id = $(this).data('id');
        console.log(user_id);
        const baseUrl = window.location.origin;
        window.open(`${baseUrl}/user_page/user_page.html?user_id=${user_id}`, '_blank');
    });

    $('#userTable').on('click', '.showModalBtn', function(event) {
        const user_id = $(this).data('id');
        fetchUser(user_id)
            .then(data => {
                console.log(data); // In ra dữ liệu từ API
                const modalShow = $('#modalShow');
                $('#email_content').text(data.email); 
                $('#username_content').text(data.username); 
                $('#password_content').text(data.password);
                modalShow.show();
            })
    });
});
