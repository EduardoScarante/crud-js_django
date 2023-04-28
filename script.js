window.onload = function() {
    read()
    console.log("loaded");
};

function read() {
    let info = ''
    let infos = ''

    let options = {
        method: "GET"
    }

    fetch("http://127.0.0.1:8000/api/users/", options)
    .then(e => {
        return e.json();
    }).then(e => {
        e.forEach(e => {
            info =
                `
            <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.favorite_color}</td>
                <td>${e.address}</td>
                <td>${e.email}</td>
                <td>${e.pet_name}</td>
                <td><button onclick="upd(${e.id})">Edit</button></td>
                <td><button onclick="del(${e.id})">Delete</button></td>
            </tr>
            `
            infos += info
        });

        header = 
        `
        <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Cor favorita</th>
            <th>Endereço</th>
            <th>E-mail</th>
            <th>Nome do Pet</th>
            <th></th>
            <th></th>
        </tr>
        `

        document.getElementById('list-itens').innerHTML = `<table>` + header + infos + `</table>`
    }). catch(err => {
        alert("Algo deu errado, tente novamente mais tarde... :(")
        console.log(err);
    })

}

function create() {
    axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/users/",
        data: {
            "name": document.getElementById("name").value,
            "favorite_color": document.getElementById("favorite_color").value,
            "address": document.getElementById("address").value,
            "email": document.getElementById("email").value,
            "pet_name": document.getElementById("pet_name").value,
        },
    }).then(res => {
        alert("Usuário criado!")
        read()
        console.log(res)
    }).catch(err => {
        alert("Algo deu errado... :(")
        console.log("erro");
        console.log(err);
    });
}


function upd(e){
    url = `http://127.0.0.1:8000/api/users/${e}/`
    axios({
        method: "get",
        url: url,
    }).then(e => {
        return e.data
    }).then(e => {
        /* INSERI AS INFORMAÇÔES NO FORMS */
        document.getElementById('id').value = e.id;
        document.getElementById('name').value = e.name;
        document.getElementById('favorite_color').value = e.favorite_color;
        document.getElementById('address').value = e.address;
        document.getElementById('email').value = e.email;
        document.getElementById('pet_name').value = e.pet_name;

        /* ATUALIZA TEXTO DO BOTÂO */
        document.getElementById('update_btn').innerHTML = `Atualizar ID - ${e.id}`

        /* OCULTA BOTÂO DE CRIRAR E MOSTRA BOTÂO DE ATUALIZAR */
        document.getElementById('update_btn').classList.remove('none')
        document.getElementById('new_btn').classList.add('none')

    }).catch(err => {
        alert("Algo deu errado... :(")
        console.log(err);
    })
}

function update() {
    id = document.getElementById('id').value
    url = `http://127.0.0.1:8000/api/users/${id}/update/`
    
    axios({
        method: "put",
        url: url,
        data: {
            "name": document.getElementById("name").value,
            "favorite_color": document.getElementById("favorite_color").value,
            "address": document.getElementById("address").value,
            "email": document.getElementById("email").value,
            "pet_name": document.getElementById("pet_name").value,
        },
    }).then(res => {
        read()

        document.getElementById('id').value = "";
        document.getElementById('name').value = "";
        document.getElementById('favorite_color').value = "";
        document.getElementById('address').value = "";
        document.getElementById('email').value = "";
        document.getElementById('pet_name').value = "";

        document.getElementById('update_btn').classList.add('none')
        document.getElementById('new_btn').classList.remove('none')

        alert("Usuário atualizado!")
        console.log(res)
    }).catch(err => {
        alert("Algo deu errado... :(")
        console.log(err)
    });
}

function del(e) {
    id = e
    url = `http://127.0.0.1:8000/api/users/${e}/delete/`

    axios({
        method: "delete",
        url: url,
    }).then(res => {
        read()
        console.log(res)
    }).then(res => {
        console.log(":)");
    })
}