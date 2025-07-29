// 方法一：使用DOMContentLoaded确保DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.toggle-hero-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const hero = document.querySelector('.homepage-hero');
      if (hero) {
        hero.classList.toggle('dark-mode');
        console.log('主题已切换'); // 调试日志
      } else {
        console.error('未找到.homepage-hero元素');
      }
    });
  } else {
    console.error('未找到切换按钮');
  }
});