import { useEffect, useState } from "react";
import API from "../API";


export default function Vocabulary() {

  const [vocabularyList, setVocabularyList] = useState([]);
  const [vocabularyUpdateSelected, setVocabularyUpdateSelected] = useState(null);
  const [showAddVocabularyForm, setShowAddVocabularyForm] = useState(false);
  const [showUpdateVocabularyForm, setShowUpdateVocabularyForm] = useState(false);
  const [wordNew, setWordNew] = useState("");
  const [definitionNew, setDefinitionNew] = useState("");

  // get all list vocabulary
  useEffect(() => {
    fetch(API.listAllVocabulary)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("API khong sai duoc")
      })
      .then((data) => {
        setVocabularyList(data);
      })
  }, []);

  // add vocabulary
  const handleAddVocabulary = async (e) => {
    e.preventDefault();
    const form = e.target;
    const word = form.elements[0].value;
    const definition = form.elements[1].value;

    const newVocabulary = {
      word: word,
      definition: definition,
    }

    fetch(API.addVocabulary, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVocabulary),
    })
      .then(async (res) => {

        if (res.ok) {
          return res.json();
        }
        if (res.status === 400) {
          alert(await res.text())
        }
      })
      .then((data) => {
        if (data != null) {
          setVocabularyList((prev) => [...prev, data])
        }

      })
  }

  // update vocabulary
  const handleUpdateVocabulary = async (e) => {
    e.preventDefault();
    const form = e.target;
    const word = form.elements[0].value;
    const definition = form.elements[1].value;

    const updateVocabulary = {
      word: word,
      definition: definition,
    }

    fetch(`${API.updateVocabulary}/${vocabularyUpdateSelected.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateVocabulary),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Can't update");
      })
      .then((data) => {
        setVocabularyList((prev) =>
          prev.map((t) =>
            t.id === data.id ? data : t
          )
        );
      })

  }

  // delete vocabulary
  const handleDeleteVocabulary = (vocabularyId) => {
    try {
      fetch(`${API.deleteVocabulary}/${vocabularyId}`, {
        method: "DELETE",
      })
        .then((res) => {
          console.log("res tra ve la - BEN DUOI")
          console.log(res)
          setVocabularyList((prev) => prev.filter((vocabulary) => vocabulary.id !== vocabularyId));
        })
    } catch (error) {
      console.log("FAIL to fetch vocabulary : " + error);
    }

  }

  return (
    <div>
      <button onClick={() => setShowAddVocabularyForm(true)}>Add Vocabulary</button>

      {showAddVocabularyForm && (
        <div>
          <div>
            <form onSubmit={handleAddVocabulary}>
              <div>
                <input type="text" placeholder="Word" />
              </div>
              <div>
                <input type="text" placeholder="Definition" />
              </div>
              <div>
                <input type="text" placeholder="Phonetic" />
              </div>
              <select>
                <option value="">Level</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
              </select>


              <div>
                <button type="submit">Add Vocabulary</button>
                <button onClick={() => setShowAddVocabularyForm(false)}>Cancel</button>
              </div>

            </form>
          </div>
        </div>
      )}
      <hr />
      <div>
        {vocabularyList.map((vocabulary) => (
          <div key={vocabulary.id}>
            <div>
              <h3>{vocabulary.word}  {vocabulary.definition}</h3>
            </div>

            <div>
              <button onClick={() => {
                setVocabularyUpdateSelected(vocabulary);
                setWordNew(vocabulary.word);
                setDefinitionNew(vocabulary.definition);
                setShowUpdateVocabularyForm(true);
              }}>Edit</button>
              <button onClick={() => handleDeleteVocabulary(vocabulary.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      {showUpdateVocabularyForm && (
        <div>
          <div>
            <form onSubmit={handleUpdateVocabulary}>
              <div>
                <input
                  type="text"
                  value={wordNew}
                  placeholder="Word"
                  onChange={(e) => setWordNew(e.target.value)} />

              </div>
              <div>
                <input
                  type="text"
                  value={definitionNew}
                  placeholder="Definition"
                  onChange={(e) => setDefinitionNew(e.target.value)} />
              </div>

              <div>
                <button type="submit">Update</button>
                <button onClick={() => setShowUpdateVocabularyForm(false)}>Cancel</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}