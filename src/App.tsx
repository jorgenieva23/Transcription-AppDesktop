import { useState } from "react";
import { FileInput } from "./components/FileInput";
import { History } from "./components/History";
import { SideBar } from "./components/SideBar";
import { useTranscriptor } from "./hooks/useTranscriptor";

const DEFAULT_MODEL = "base";

function App() {
  const { history, runTranscriptorProcess } = useTranscriptor();
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);

  const handleRun = (file: File) => {
    runTranscriptorProcess(file, selectedModel);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white p-4">
      <SideBar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

      <main className="flex-grow bg-gray-800 rounded-lg p-6 overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-100">
            Transcriptor IA
          </h1>
        </div>

        <FileInput onRun={handleRun} />

        <History items={history} />
      </main>
    </div>
  );
}

export default App;
