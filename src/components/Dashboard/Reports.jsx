import React, { useEffect, useState } from "react";

function Reports({ uploadedFile }) {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Auto-parse file when it arrives from Header
  useEffect(() => {
    if (!uploadedFile) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      parseFile(text);
    };

    reader.readAsText(uploadedFile);
  }, [uploadedFile]);

  // 🔹 Basic CSV / log-like parser (frontend only)
  const parseFile = (text) => {
    setErrors([]);
    setMessage("");

    const lines = text.split("\n").filter(Boolean);

    if (lines.length === 0) {
      setMessage("File is empty.");
      return;
    }

    const detectedHeaders = lines[0].split(",").map(h => h.trim());
    setHeaders(detectedHeaders);

    const parsedRows = [];
    const errorRows = [];

    lines.slice(1).forEach((line, index) => {
      const values = line.split(",");
      const rowObj = {};

      detectedHeaders.forEach((header, i) => {
        rowObj[header] = values[i]?.trim() || "—";
      });

      // 🔹 Soft validation (length mismatch)
      if (values.length !== detectedHeaders.length) {
        errorRows.push(`Row ${index + 2}: column mismatch`);
      }

      parsedRows.push(rowObj);
    });

    setRows(parsedRows);
    setErrors(errorRows);

    if (errorRows.length) {
      setMessage("Some rows do not match the expected format, but preview is shown.");
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Reports & File Preview
      </h2>

      {!uploadedFile && (
        <p className="text-slate-500 dark:text-slate-400">
          Upload a file from the header to preview parsed data here.
        </p>
      )}

      {uploadedFile && (
        <>
          {/* Message */}
          {message && (
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
              {message}
            </div>
          )}

          {/* Error rows */}
          {errors.length > 0 && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              <strong>Validation issues:</strong>
              <ul className="list-disc ml-5 mt-2">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview Table */}
          <div className="bg-[var(--card-background)] rounded-lg shadow-lg p-6 border border-[var(--border-color)]">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Parsed Data Preview
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--border-color)] hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      {headers.map((h, j) => (
                        <td
                          key={j}
                          className="px-4 py-2 text-slate-600 dark:text-slate-300"
                        >
                          {row[h]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload / Send Button */}
          <div className="flex justify-end pt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition"
              onClick={() => alert("Ready to send parsed data to backend")}
            >
              Upload & Process
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
