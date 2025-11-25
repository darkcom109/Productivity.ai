'use client';

import { useState, useRef } from 'react';
import { Download, Upload, FileJson, FileSpreadsheet, X } from 'lucide-react';

interface ImportExportProps {
  onExport: (format: 'json' | 'csv') => void;
  onImport: (data: string) => boolean;
  onClose: () => void;
}

export default function ImportExport({ onExport, onImport, onClose }: ImportExportProps) {
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = onImport(content);
        if (success) {
          setImportError(null);
          alert('Todos imported successfully!');
          onClose();
        } else {
          setImportError('Failed to import todos. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Import / Export</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Export Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Download size={20} />
            Export Todos
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => onExport('json')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FileJson size={20} />
              Export as JSON
            </button>
            <button
              onClick={() => onExport('csv')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FileSpreadsheet size={20} />
              Export as CSV
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Download your todos to backup or transfer to another device.
          </p>
        </div>

        {/* Import Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Upload size={20} />
            Import Todos
          </h3>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Upload size={20} />
            Import from JSON
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Import todos from a previously exported JSON file. Your existing todos will be preserved.
          </p>
          {importError && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {importError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

