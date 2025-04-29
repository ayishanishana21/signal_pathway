import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

const SequenceDiagram = () => {
  const [mermaidSvg, setMermaidSvg] = useState("");
  const fileInputRef = useRef(null);

  const sanitizeLabel = (str) => {
    if (!str) return 'Unknown';
    return str
      .replace(/[()[\]{}|]/g, '')
      .replace(/[^a-zA-Z0-9\s_-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMermaidSvg("<p class='error'>No file selected.</p>");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: ["Classification", "Targeted_Cell", "Targeted_Protein", "Targeted_Kinase"],
          range: 1
        });

        let mermaidSequenceText = "sequenceDiagram\n";
        let participants = new Set();
        let sequence = [];

        rows.forEach((row, index) => {
          const classification = row.Classification?.trim() || 'Unknown';
          const cells = typeof row.Targeted_Cell === "string"
            ? row.Targeted_Cell.split(",").map(c => c.trim()).filter(c => c)
            : [row.Targeted_Cell?.trim()];
          const proteins = typeof row.Targeted_Protein === "string"
            ? row.Targeted_Protein.split(",").map(p => p.trim()).filter(p => p)
            : [];
          const kinases = typeof row.Targeted_Kinase === "string"
            ? row.Targeted_Kinase.split(",").map(k => k.trim()).filter(k => k)
            : [];

          if (!cells.length || (!proteins.length && !kinases.length)) return;

          cells.forEach(cell => participants.add(sanitizeLabel(cell)));
          if (proteins.length) participants.add(sanitizeLabel(proteins[0]));
          if (kinases.length) participants.add(sanitizeLabel(kinases[0]));

          cells.forEach(cell => {
            const target = proteins[0] || kinases[0];
            if (target) {
              sequence.push(`  ${sanitizeLabel(cell)}->>${sanitizeLabel(target)}: ${classification}`);
            }
          });
        });

        mermaidSequenceText += Array.from(participants).map(p => `  participant ${p}`).join('\n') + '\n';
        mermaidSequenceText += sequence.join('\n');

        const mermaid = await import('https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.esm.min.mjs');
        await mermaid.default.initialize({ startOnLoad: false, theme: 'default', sequence: { showSequenceNumbers: true } });
        const { svg } = await mermaid.default.render("mermaidSequence", mermaidSequenceText);
        setMermaidSvg(svg);
      } catch (error) {
        console.error("Error processing file:", error);
        setMermaidSvg(`<p class='error'>${error.message}</p>`);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Excel → Sequence Diagram</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFile}
        className="mb-4"
      />
      <div
        className="bg-white p-4 rounded shadow overflow-auto min-h-[600px]"
        dangerouslySetInnerHTML={{ __html: mermaidSvg || "<p>No diagram loaded yet.</p>" }}
      />
    </div>
  );
};

export default SequenceDiagram;
