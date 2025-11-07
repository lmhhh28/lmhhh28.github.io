document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('myChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'Example Data',
          data: [12, 19, 3],
          backgroundColor: ['red', 'blue', 'yellow']
        }]
      }
    });
  }
});