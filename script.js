document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#nomeInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            procurar();
        }
    });
});

function procurar() {
    let nome = document.querySelector('#nomeInput').value;
    
    fetch(`https://swapi.dev/api/people/?search=${nome}`)
        .then(response => response.json())
        .then(dados => {
            let pessoa = dados.results[0];

            if (pessoa) {
                console.log(pessoa.name);
                document.querySelector('#nomeDisplay').innerText = `Nome: ${pessoa.name}`;

                console.log(pessoa.gender);
                document.querySelector('#generoDisplay').innerText = `Gênero: ${pessoa.gender}`;

                console.log(pessoa.height);
                document.querySelector('#alturaDisplay').innerText = `Altura: ${pessoa.height} cm`;

                
                fetch(pessoa.homeworld)
                    .then(response => response.json())
                    .then(planetaDados => {
                        console.log(planetaDados.name);
                        document.querySelector('#planetaDisplay').innerText = `Planeta: ${planetaDados.name}`;
                    })
                    .catch(error => {
                        console.log(error);
                        document.querySelector('#planetaDisplay').innerText = 'Erro ao buscar planeta.';
                    });
            } else {
                console.log('Personagem não encontrado.');
                document.querySelector('#nomeDisplay').innerText = 'Personagem não encontrado.';
                document.querySelector('#generoDisplay').innerText = '';
                document.querySelector('#alturaDisplay').innerText = '';
                document.querySelector('#planetaDisplay').innerText = '';
            }
        })
        .catch(error => {
            console.log(error);
            document.querySelector('#nomeDisplay').innerText = 'Erro ao buscar dados.';
            document.querySelector('#generoDisplay').innerText = '';
            document.querySelector('#alturaDisplay').innerText = '';
            document.querySelector('#planetaDisplay').innerText = '';
        });
}
