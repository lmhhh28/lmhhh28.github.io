// docs/assets/javascripts/custom.js
document.addEventListener('DOMContentLoaded', function() {
  // 为所有带有"custom-button"类的按钮添加点击事件
  const buttons = document.querySelectorAll('.custom-button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Button clicked!');
    });
  });
});