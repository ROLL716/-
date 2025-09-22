document.getElementById('goal-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('goal-input');
  const goal = input.value.trim();
  if (goal) {
    // 目標をリンクとして表示
    const goalList = document.getElementById('goal-list');
    goalList.innerHTML = '';
    const a = document.createElement('a');
    a.href = `reflection.html?goal=${encodeURIComponent(goal)}`;
    a.textContent = goal;
    a.target = '_blank';
    a.style.cursor = 'pointer';
    goalList.appendChild(a);
    input.value = '';
  }
});

// 今日の出来事の入力・表示テスト
document.getElementById('event-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('event-input');
  const event = input.value.trim();
  if (event) {
    document.getElementById('event-list').textContent = event;
    input.value = '';
  }
});

// 今日の目標入力保存・履歴管理
const todayGoalInput = document.getElementById('today-goal-input');
let goalHistory = JSON.parse(localStorage.getItem('goalHistory') || '[]');
if (todayGoalInput) {
  todayGoalInput.value = localStorage.getItem('todayGoal') || '';
  todayGoalInput.addEventListener('input', function() {
    localStorage.setItem('todayGoal', todayGoalInput.value);
  });
  todayGoalInput.addEventListener('change', function() {
    const val = todayGoalInput.value.trim();
    if (val && (!goalHistory.length || goalHistory[goalHistory.length-1] !== val)) {
      goalHistory.push(val);
      localStorage.setItem('goalHistory', JSON.stringify(goalHistory));
    }
  });
}

// 今までの目標ボタン・履歴表示
const historyGoalBtn = document.getElementById('history-goal-btn');
const goalHistoryModal = document.getElementById('goal-history-modal');
const goalHistoryList = document.getElementById('goal-history-list');
const goalHistoryClose = document.getElementById('goal-history-close');
if (historyGoalBtn && goalHistoryModal && goalHistoryList && goalHistoryClose) {
  historyGoalBtn.addEventListener('click', function() {
    goalHistory = JSON.parse(localStorage.getItem('goalHistory') || '[]');
    goalHistoryList.innerHTML = '';
    if (goalHistory.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'まだ目標がありません';
      goalHistoryList.appendChild(li);
    } else {
      goalHistory.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalHistoryList.appendChild(li);
      });
    }
    goalHistoryModal.style.display = 'flex';
  });
  goalHistoryClose.addEventListener('click', function() {
    goalHistoryModal.style.display = 'none';
  });
}

// ToDoリスト本体と追加モーダル
const todoListElem = document.getElementById('todo-list');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoModal = document.getElementById('todo-modal');
const modalTodoInput = document.getElementById('modal-todo-input');
const modalAddBtn = document.getElementById('modal-add-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');

let todos = JSON.parse(localStorage.getItem('todoList') || '[]');
if (todoListElem && addTodoBtn) {
  if (todos.length === 0) {
    todos = Array(0);
  }
  function renderTodos() {
    todoListElem.innerHTML = '';
    todos.forEach((text, i) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'todo-input';
      input.value = text.startsWith('・') ? text : (text ? '・' + text : '');
      input.placeholder = '・';
      input.addEventListener('input', function() {
        let val = input.value;
        if (val && !val.startsWith('・')) val = '・' + val.replace(/^・+/, '');
        input.value = val;
        todos[i] = val;
        localStorage.setItem('todoList', JSON.stringify(todos));
      });
      li.appendChild(input);
      todoListElem.appendChild(li);
    });
  }
  renderTodos();

  // 追加ボタンでモーダル表示
  addTodoBtn.addEventListener('click', function() {
    todoModal.style.display = 'flex';
    modalTodoInput.value = '';
    modalTodoInput.focus();
  });
}

// モーダルの追加ボタン
if (modalAddBtn) {
  modalAddBtn.addEventListener('click', function() {
    let val = modalTodoInput.value.trim();
    if (val) {
      if (!val.startsWith('・')) val = '・' + val.replace(/^・+/, '');
      todos.push(val);
      localStorage.setItem('todoList', JSON.stringify(todos));
      if (todoListElem) {
        renderTodos();
      }
      todoModal.style.display = 'none';
    }
  });
}
// モーダルのキャンセルボタン
if (modalCancelBtn) {
  modalCancelBtn.addEventListener('click', function() {
    todoModal.style.display = 'none';
  });
}
