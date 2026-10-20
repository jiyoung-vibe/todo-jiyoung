const STORAGE_KEY = 'todo-items';

const input = document.getElementById('item');
const addButton = document.getElementById('add');
const list = document.getElementById('list');
const count = document.getElementById('count');

const defaultItems = [
  { text: '우유', done: false },
  { text: '계란', done: false },
  { text: '사과', done: false },
];

// 저장된 목록이 있으면 그것을, 없으면 처음 목록을 쓴다
function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    // 저장소를 쓸 수 없으면 처음 목록으로 시작한다
  }
  return defaultItems;
}

function saveItems() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // 저장에 실패해도 화면은 그대로 동작한다
  }
}

let items = loadItems();

// 목록 전체를 다시 그리고, 남은 개수를 맞춘다
function render() {
  list.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.addEventListener('change', () => {
      items[index].done = checkbox.checked;
      saveItems();
      render();
    });

    const text = document.createElement('span');
    text.textContent = item.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      items.splice(index, 1);
      saveItems();
      render();
    });

    li.append(checkbox, text, deleteButton);
    list.append(li);
  });

  count.textContent = items.filter((item) => !item.done).length;
}

// 빈 칸은 추가하지 않고, 추가하면 목록 맨 아래에 붙는다
function addItem() {
  const text = input.value.trim();
  if (text === '') return;

  items.push({ text, done: false });
  input.value = '';
  saveItems();
  render();
}

addButton.addEventListener('click', addItem);

render();
