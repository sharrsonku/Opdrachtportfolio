document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Timeline functionaliteit
  // =========================
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    // Achtergrondafbeelding instellen via data-attribute
    const imgUrl = item.dataset.bg;
    if (imgUrl) item.style.backgroundImage = `url(${imgUrl})`;

    // Toggle uitklappen en scrollen
    item.addEventListener('click', () => {
      // Eerst alle andere items sluiten
      timelineItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('expanded');
        }
      });

      // Huidige item togglen
      item.classList.toggle('expanded');

      // Scrollen zodat het item bovenaan het scherm staat
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // =========================
  // PDF.js functionaliteit
  // =========================
  const pdfViewer = document.getElementById('pdf-viewer');
  if (pdfViewer) {
    const url = 'opdrachten/scanOnderzoek.pdf';
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.141/pdf.worker.min.js';

    pdfjsLib.getDocument(url).promise
      .then(pdf => {
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          pdf.getPage(pageNumber).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            pdfViewer.appendChild(canvas);

            page.render({ canvasContext: context, viewport: viewport });
          });
        }
      })
      .catch(err => {
        console.error('Fout bij laden PDF: ', err);
        pdfViewer.textContent = 'PDF kon niet geladen worden.';
      });
  }
});
