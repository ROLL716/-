// ユーザー設定ページの処理
if (document.getElementById('user-settings-form')) {
  const form = document.getElementById('user-settings-form');
  const shareToggle = document.getElementById('share-toggle');
  const shareStatus = document.getElementById('share-status');
  const summary = document.getElementById('summary');

  // アイコン画像プレビュー
  const iconInput = document.getElementById('icon');
  const iconPreview = document.getElementById('icon-preview');
  iconInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        iconPreview.src = ev.target.result;
        iconPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // 共有ON/OFF表示切替
  shareToggle.addEventListener('change', function() {
    shareStatus.textContent = this.checked ? 'ON' : 'OFF';
  });

  // 保存内容の復元
  window.addEventListener('DOMContentLoaded', function() {
    const saved = JSON.parse(localStorage.getItem('userSettings') || '{}');
    if (saved.username) document.getElementById('username').value = saved.username;
    if (saved.todayGoal) document.getElementById('today-goal').value = saved.todayGoal;
    if (saved.hashtags) document.getElementById('hashtags').value = saved.hashtags;
    if (typeof saved.share === 'boolean') {
      shareToggle.checked = saved.share;
      shareStatus.textContent = saved.share ? 'ON' : 'OFF';
    }
    if (saved.icon) {
      iconPreview.src = saved.icon;
      iconPreview.style.display = 'block';
    }
    // サマリーも復元
    if (saved.username || saved.todayGoal || saved.hashtags) {
      summary.style.display = 'block';
      summary.innerHTML =
        `<strong>ユーザーネーム:</strong> ${saved.username || ''}<br>` +
        `<strong>今日の目標:</strong> ${saved.todayGoal || ''}<br>` +
        `<strong>ハッシュタグ:</strong> ${saved.hashtags || ''}<br>` +
        `<strong>全体に共有:</strong> ${saved.share ? 'ON' : 'OFF'}`;
    }
  });

  // フォーム送信時の処理
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const todayGoal = document.getElementById('today-goal').value.trim();
    const hashtags = document.getElementById('hashtags').value.trim();
    const share = shareToggle.checked;
    let iconData = iconPreview.src && iconPreview.style.display !== 'none' ? iconPreview.src : '';
    // サマリー表示
    summary.style.display = 'block';
    summary.innerHTML =
      `<strong>ユーザーネーム:</strong> ${username}<br>` +
      `<strong>今日の目標:</strong> ${todayGoal}<br>` +
      `<strong>ハッシュタグ:</strong> ${hashtags}<br>` +
      `<strong>全体に共有:</strong> ${share ? 'ON' : 'OFF'}`;
    // localStorageに保存
    localStorage.setItem('userSettings', JSON.stringify({
      username, todayGoal, hashtags, share, icon: iconData
    }));
  });
}
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
