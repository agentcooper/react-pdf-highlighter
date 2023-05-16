import React, { useState } from "react";
import type { IHighlight } from "./react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
  loadPdfFromUrl: (url: string) => void;
  editHighlight: (id: string, text: string) => void;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
  loadPdfFromUrl,
  editHighlight,
}: Props) {

  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (highlight: IHighlight) => {
    setEditing(highlight.id);
    setEditText(highlight.comment.text);
  };

  const handleSave = (id: string) => {
    editHighlight(id, editText);
    setEditing(null);
    setEditText('');
  };

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const newUrl = event.target.result as string;
          loadPdfFromUrl(newUrl);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {

  }

  const filteredHighlights = highlights.filter((highlight) =>
    highlight.comment.text.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  const [url, setUrl] = useState('');

  return (
    <div className="sidebar" style={{ width: "25vw", backgroundColor: "lightblue" }}>
      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Search annotations"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>





      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="PDF URL"
        />
        <button onClick={() => loadPdfFromUrl(url)}>Load pdf</button>
      </div>

      <div style={{ padding: "1rem" }}>
        <input type="file" onChange={handleFileUpload} />
      </div>




      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>pdf-highlighter</h2>



        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {filteredHighlights.map((highlight, index) => (
          <li
            key={highlight.id}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              {editing === highlight.id ? (
                <>
                  <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button onClick={() => handleSave(highlight.id)}>Save</button>
                </>
              ) : (
                <>
                  <strong>{highlight.comment.text}</strong>
                  <button onClick={() => handleEdit(highlight)}>Edit</button>
                </>
              )}


              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
      {/* <div style={{ padding: "1rem" }}>
        <button onClick={toggleDocument}>Toggle PDF document</button>
      </div> */}
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null}
    </div>
  );
}
