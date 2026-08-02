function checkAnswer(button, correct) {
  const quiz = button.closest('.quiz');
  const options = quiz.querySelectorAll('.quiz-option');
  const feedback = quiz.querySelector('.quiz-feedback');
  options.forEach(option => {
    option.disabled = true;
    if (option.dataset.correct === 'true') option.classList.add('correct');
  });
  if (!correct) button.classList.add('incorrect');
  feedback.hidden = false;
  feedback.classList.add(correct ? 'success' : 'retry');
  feedback.querySelector('strong').textContent = correct ? '答对了。' : '再想一步。';
}

document.querySelectorAll('[data-checklist]').forEach(list => {
  const key = 'trumpet-course:' + location.pathname;
  const boxes = list.querySelectorAll('input[type="checkbox"]');
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) {}
  boxes.forEach((box, index) => {
    box.checked = Boolean(saved[index]);
    box.addEventListener('change', () => {
      const state = {};
      boxes.forEach((item, i) => state[i] = item.checked);
      localStorage.setItem(key, JSON.stringify(state));
    });
  });
});
