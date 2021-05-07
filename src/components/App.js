import React, { useState, useEffect } from "react";

import axios from "axios";

//Components
import Header from "./Header";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import NominationsList from "./NominationsList";
import Alert from "react-bootstrap/Alert";

//Styling
import "../styles/App.css";
import "../styles/Nominations.css";
import "../styles/Results.css";
import "../styles/custom.css";

export default function App(props) {
  //retrieve saved nominations from previous sessions if exists
  const storedNominations = window.localStorage.getItem("nominations");
  const parsedNominations = storedNominations
    ? JSON.parse(storedNominations)
    : null;

  const [state, setState] = useState({
    query: "",
    searchResults: [],
    loading: false,
    error: null,
    nominations: parsedNominations || [],
    showAlert: false,
  });

  const apiKey = process.env.REACT_APP_OMDB_KEY;

  useEffect(() => {
    setState((prev) => ({ ...prev, error: null }));
    if (state.query === "") {
      setState((prev) => ({ ...prev, searchResults: [] }));
    } else {
      const fetchData = async () => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try {
          setState((prev) => ({ ...prev, loading: true }));

          const res = await axios.get(
            `https://www.omdbapi.com/?s=${state.query}&type=movie&apikey=${apiKey}`,
            {
              cancelToken: source.token,
            }
          );
          //status is OK but error from too many search results or empty string
          if (res.data.Response === "True") {
            const movies = await res.data.Search;

            setState((prev) => ({
              ...prev,
              searchResults: movies,
              loading: false,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              searchResults: [],
              loading: false,
              error: true,
            }));
          }
        } catch (err) {
          if (axios.isCancel(err)) {
            console.log(err.message);
          }
          setState((prev) => ({ ...prev, error: true }));
        }

        return () => source.cancel();
      };

      fetchData();
    }
  }, [apiKey, state.query]);

  function nominate(title, year) {
    const nominations = [...state.nominations, { title, year }];
    setState({ ...state, nominations, showAlert: nominations.length >= 5 });
    window.localStorage.setItem("nominations", JSON.stringify(nominations));
  }

  function remove(title, year) {
    const index = state.nominations.findIndex(
      (movie) => movie.title === title && movie.year === year
    );
    const nominations = [...state.nominations];

    nominations.splice(index, 1);
    setState({ ...state, nominations });
    window.localStorage.setItem("nominations", JSON.stringify(nominations));
  }

  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <div className="nominations">
            <h2 className="nominations__header">Your Nominations</h2>
            {state.nominations.length === 0 ? (
              <p className="no-nominations-msg">
                None selected. Select five movies using the search bar below.
              </p>
            ) : (
              <div className="nominations__list">
                <NominationsList
                  nominations={state.nominations}
                  remove={remove}
                />
              </div>
            )}
          </div>
          {state.showAlert && (
            <div className="alert-complete">
              <Alert
                variant="success"
                dismissible
                onClose={() => setState({ ...state, showAlert: false })}
              >
                <Alert.Heading></Alert.Heading>
                <p>
                  Your selections have been made. Thank you for your
                  nominations.
                </p>
              </Alert>
            </div>
          )}

          <div className="search-bar">
            <SearchBar
              onSearch={(query) => setState({ ...state, query: query })}
            />
          </div>
          <div className="results">
            {state.error ? (
              <p className="no-results-msg">No results</p>
            ) : (
              <ResultsList
                searchResults={state.searchResults}
                nominations={state.nominations}
                nominate={nominate}
                disabled={state.nominations.length >= 5}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
