document.addEventListener('DOMContentLoaded', () => {
  // Configuración global de colores/estilos para modo oscuro en Chart.js
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = '#1e293b';

  // 1. Gráfica de líneas
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Usuarios 2024',
          data: [5000, 5500, 6000, 6200, 6800, 7200, 7500, 8000, 8249, 8500, 8800, 9100],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          tension: 0.4,
          fill: true,
          pointRadius: 3
        },
        {
          label: 'Usuarios 2023',
          data: [4000, 4200, 4500, 4800, 5100, 5400, 5600, 5900, 6200, 6500, 6800, 7000],
          borderColor: '#64748b',
          backgroundColor: 'rgba(100, 116, 139, 0.05)',
          tension: 0.4,
          fill: true,
          pointRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { usePointStyle: true, boxWidth: 8 }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#1e293b' } },
        x: { grid: { display: false } }
      }
    }
  });

  // 2. Gráfica de barras
  const barCtx = document.getElementById('barChart').getContext('2d');
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Ingresos 2024 ($)',
        data: [15000, 16500, 18000, 19500, 21000, 22500, 23000, 24000, 24780, 26000, 27500, 29000],
        backgroundColor: '#3b82f6',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { usePointStyle: true, boxWidth: 8 }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#1e293b' } },
        x: { grid: { display: false } }
      }
    }
  });
  const btnReporte = document.getElementById('btnReporte');

if (btnReporte) {
  btnReporte.addEventListener('click', () => {
    // Elemento contenedor a exportar
    const element = document.querySelector('.max-w-7xl');

    // Configuración del PDF
    const opt = {
      margin:       0.5,
      filename:     'Reporte_Dashboard_2024.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    // Mensaje temporal de descarga
    btnReporte.innerText = 'Generando PDF...';

    // Generando archivo
    html2pdf().set(opt).from(element).save().then(() => {
      btnReporte.innerHTML = '<i class="fa-solid fa-download mr-1"></i> Descargar Reporte';
    });
  });
}
// 3. Renderizando Tabla Detallada
  const tablaCuerpo = document.getElementById('tablaCuerpo');

  if (tablaCuerpo) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const u2023 = [4000, 4200, 4500, 4800, 5100, 5400, 5600, 5900, 6200, 6500, 6800, 7000];
    const u2024 = [5000, 5500, 6000, 6200, 6800, 7200, 7500, 8000, 8249, 8500, 8800, 9100];
    const ingresos = [15000, 16500, 18000, 19500, 21000, 22500, 23000, 24000, 24780, 26000, 27500, 29000];

    let filasHTML = '';

    meses.forEach((mes, idx) => {
      const crecYoY = (((u2024[idx] - u2023[idx]) / u2023[idx]) * 100).toFixed(1);
      
      filasHTML += `
        <tr class="hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-semibold text-white">${mes}</td>
          <td class="py-3 px-4 text-slate-400">${u2023[idx].toLocaleString()}</td>
          <td class="py-3 px-4 text-blue-400 font-medium">${u2024[idx].toLocaleString()}</td>
          <td class="py-3 px-4 text-emerald-400 font-medium">+${crecYoY}%</td>
          <td class="py-3 px-4 text-right font-bold text-white">$${ingresos[idx].toLocaleString()}</td>
        </tr>
      `;
    });

    tablaCuerpo.innerHTML = filasHTML;
  }
});