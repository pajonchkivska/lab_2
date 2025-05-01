// Save browser + OS info in localStorage
const browserInfo = {
  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language
};
localStorage.setItem('userInfo', JSON.stringify(browserInfo));

// Display localStorage in footer (formatted & centered)
const footer = document.getElementById('footer');
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
footer.innerText = Object.entries(userInfo)
  .map(([key, val]) => `${key}: "${val}"`)
  .join('\n');

// Load comments (номер 20)
fetch('https://jsonplaceholder.typicode.com/posts/20/comments')
  .then(res => res.json())
  .then(comments => {
    const list = document.getElementById('comments-list');
    comments.forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${c.name}:</strong> ${c.body}`;
      list.appendChild(li);
    });
  });

// Modal after 1 min
setTimeout(() => {
  document.getElementById('feedback-modal').classList.remove('hidden');
}, 60000);
document.querySelector('.close').onclick = () => {
  document.getElementById('feedback-modal').classList.add('hidden');
};

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const currentHour = new Date().getHours();
const isNight = currentHour < 7 || currentHour >= 21;
if (isNight) document.body.classList.add('night');

themeToggle.checked = document.body.classList.contains('night');
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('night');
});
