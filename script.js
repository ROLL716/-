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
