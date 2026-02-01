import { jsPDF } from 'jspdf';

type StyleProfile = { name: string; description: string };
type Outfit = { title: string; images: { url: string }[] };

export async function generatePDF(
  styleProfile: StyleProfile,
  outfits: Outfit[]
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Title
  doc.setFontSize(24);
  doc.text('Style DNA — Your Style Profile', margin, 25);
  doc.setFontSize(16);
  doc.text(styleProfile.name, margin, 40);
  doc.setFontSize(10);
  doc.text(styleProfile.description, margin, 50, { maxWidth: pageWidth - margin * 2 });

  let y = 70;

  doc.setFontSize(14);
  doc.text('Outfit Recommendations', margin, y);
  y += 15;

  for (let i = 0; i < Math.min(outfits.length, 7); i++) {
    const outfit = outfits[i];
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.text(outfit.title, margin, y);
    y += 10;
  }

  doc.save(`style-dna-${Date.now()}.pdf`);
}
