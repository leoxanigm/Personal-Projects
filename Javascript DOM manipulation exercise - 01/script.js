let container = document.getElementById('main');

function createRow(){
  let amount = parseInt(document.getElementById('amount').value);
  if(amount > 0){
    for(let i = 0; i < amount; i++) {
      let element = document.createElement('li');
      let text = document.createTextNode('Item ' + i);
      element.appendChild(text);
      container.appendChild(element);
    }
   let elPosition = document.getElementById('row-index');
    elPosition.setAttribute('max', amount);
  }
}

function deleteFirst() {
  let first = document.querySelector('#main li:first-child');
  container.removeChild(first);
}

function deleteLast() {
  let last = document.querySelector('#main li:last-child');
  container.removeChild(last);
}

function insertFirst() {
  let element = document.createElement('li');
  let text = document.createTextNode('Item insert: Top');
  element.appendChild(text);
  let first = document.querySelector('#main li:first-child');
  container.insertBefore(element, first);
}

function insertLast() {
  let element = document.createElement('li');
  let text = document.createTextNode('Item insert: Bottom');
  element.appendChild(text);
  container.appendChild(element);
}

function updateText() {
  let position = parseInt(document.getElementById('row-index').value);
  let text = document.getElementById('input-text').value;
  let item = document.querySelectorAll('#main li');
  let itemUpdate = item[position - 1];
  itemUpdate.textContent = text;
}

function deleteAll() {
  let nodes = document.querySelectorAll('#main li');
  if(nodes.length > 0) {
    for(let i = nodes.length - 1; i >= 0; i--) {
      container.removeChild(nodes[i]);
    }
  }
}

function deleteChildren(e) {
  let child = e.target;
  container.removeChild(child);
}

container.addEventListener('click', deleteChildren);
document.getElementById('create-row').addEventListener('click', createRow);
document.getElementById('delete-first').addEventListener('click', deleteFirst);
document.getElementById('delete-last').addEventListener('click', deleteLast);
document.getElementById('insert-first').addEventListener('click', insertFirst);
document.getElementById('insert-last').addEventListener('click', insertLast);
document.getElementById('update-text').addEventListener('click', updateText);
document.getElementById('delete-all').addEventListener('click', deleteAll);
