import { useEffect, useState } from "react";
import "./App.css";
import ReactWordcloud from 'react-wordcloud';

function WordCloud({ dataset }: { dataset: any }) {

  const options = {
    rotations: 2,
    rotationAngles: [0, 90],
    fontSizes: [20, 60],
    fontWeight: 'bold',
    padding: 3,
  };

  return (
    <div className="WordCloud">
      {dataset && dataset.length > 0 ? (
        //@ts-ignore
        <ReactWordcloud words={dataset} options={options} />
      ) : (
        'No data to display'
      )}
    </div>
  );
}

function RequirementModal({
  html,
  close,
}: {
  html: string;
  close: () => void;
}) {
  return (
    <div className="RequirementModal">
      <dialog open>
        <article dangerouslySetInnerHTML={{ __html: html }} />
        <button onClick={close}>Close</button>
      </dialog>
    </div>
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [html, setHtml] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataset, setDataset] = useState<any>(null);
  const [inputType, setInputType] = useState("rss");
  const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = `/api/word-cloud/rss?url=${inputValue}`;
      const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    const data = await response.json();

    setDataset(data);
    } catch (error) {
      console.error('Failed to fetch word cloud data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/challenge")
      .then((r) => r.text())
      .then(setHtml)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  if (error != null) {
    console.error(error);
    return <div>Error! Check console...</div>;
  }

  return (
    <div className="App">
            <button onClick={() => setShowModal(true)}>Show requirements</button>

      <div className="controls">

        <div className="input-group">
          <div className="toggle">
            <button onClick={() => setInputType("rss")} className={inputType === "rss" ? "active" : ""}>RSS</button>
          </div>
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Enter valid rss URL" />
          <button className="generateBtn" type="submit" onClick={handleSubmit}>Generate</button>
        </div>
      </div>

      {isLoading ? "Loading..." : null}

      {showModal ? (
        <RequirementModal html={html} close={() => setShowModal(false)} />
      ) : null}

      <WordCloud dataset={dataset} />
    </div>
  );
}
