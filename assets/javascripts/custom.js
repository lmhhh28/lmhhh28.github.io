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

// 异步加载 KaTeX 后初始化
window.addEventListener('load', function() {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: true }
    ],
    // 限定渲染范围（提升性能）
    ignoredElements: ['nav', 'header', 'footer'] 
  });
});
