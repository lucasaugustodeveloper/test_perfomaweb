const menu = $('.menu ul');
const content = $('.state');
const stateCitys = $('.state_citys-list');

const templateMenu = (sigla, name) => {
  return `
    <li><a class="menu_link" href="#" alt="${name}">${sigla}</a></li>
  `;
};
const templateState = (state, image) => {
  return `
    <div>
      <header class="state_header">
        <h2>${state}</h2>
      </header>
      <div class="state_image">
        <img src="${image}" alt="${state}">
      </div>
    </div>
    <div class="state_citys">
      <ul class="state_citys-list"></ul>
    </div>
  `;
};
const templateCity = city => `<li>${city}</li>`;

const getInfo = () => {
  $.ajax({
    type: 'POST',
    url: 'http://www.performaweb.com.br/api_teste/',
    data: {
      user: 'performaweb',
      token: 'pTspjI1jYxQngonfgbSP'
    },
    dataType: 'json'
  })
  .done(res => {
    const states = res.estados;
    // console.log(states);

    const getMenuStates = () => {
      for (let state = 0; state < states.length; state++) {
        let sigla = states[state].sigla;
        let name = states[state].nome;

        menu.append(templateMenu(name, sigla));
      };
    };
    getMenuStates();

    const getCitys = (sigla) => {
      for (let i = 0; i < states.length; i++) {
        if (sigla === states[i].sigla) {
          content.html('');
          content.html(templateState(states[i].nome, states[i].imagem));
        }

        const citys = states[i].cidades;

        if (sigla === states[i].sigla) {
          for (let j = 0; j < citys.length; j++) {
            document.querySelector('.state_citys-list').innerHTML += templateCity(citys[j]);
          };
        };
      };
    };

    getCitys('AC');

    $('.menu_link').click(function (e) {
      e.preventDefault();
      const siglaState = $(this).attr('alt');

      getCitys(`${siglaState}`);
    });
  });
}

$(document).ready(function () {
  getInfo();
});

