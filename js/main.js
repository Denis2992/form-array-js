const submitBtn = document.querySelector('.btn-primary');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const priority = document.querySelector('.priority');
const category = document.querySelector('.category');
const errList = document.querySelector('.errors');
const table = document.querySelector('.table tbody');


const booksInfo = [];

if (localStorage.getItem('booksInfo') !== null) {
  JSON.parse(localStorage.getItem('booksInfo')).forEach(el => {
    booksInfo.push(el)
  });
}

booksInfo.forEach(arr => {
  const row = document.createElement('tr');

  if (table.hasChildNodes()) {
  const row = document.createElement('tr');
  table.insertBefore(row, table.querySelector('tr'))
  } else {
  const row = document.createElement('tr');
  table.append(row);
}

  table.append(row);
  arr.forEach(el => {
    const singleItem = document.createElement('td');
    singleItem.innerText = el;
    table.querySelector('tr').append(singleItem);
  });
});


submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const errors = [];

  if (title.value.length < 1) {
    errors.push('Tytuł ma zawierać przynajmniej 1 znak');
  }

  if (author.value.length < 3) {
    errors.push('Pole autor ma zawierać przynajmniej 3 znaki');
  }

  if (priority.value === '') {
    errors.push('Wybierz priorytet');
  }

  if (category.value === '') {
    errors.push('Wybierz kategorię');
  }

  errList.innerHTML = errors.join('<br/>');

  if (errors.length === 0) {
    const bookInfo = [title.value, author.value, priority.value, category.value];
    booksInfo.push(bookInfo);
    const row = document.createElement('tr');

    if (table.hasChildNodes()) {
      table.insertBefore(row, table.querySelector('tr'))
    } else {
      table.append(row);
    }

    bookInfo.forEach(el => {
        const singleItem = document.createElement('td');
        singleItem.innerText = el;
        table.querySelector('tr').append(singleItem);
      });

    localStorage.setItem( "booksInfo" , JSON.stringify(booksInfo));

    title.value = '';
    author.value = '';
    priority.value = '';
    category.value = '';
  }
});

