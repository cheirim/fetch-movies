import { Button, Typography, Paper, Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const App = () => {
  const [localDB, setLocalDB] = useState([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies) {
      setLocalDB(movies);
    }
  }, []);

  const handleClick = (param) => {
    fetch(`https://www.omdbapi.com/${param}`)
      .then((response) => response.json())
      .then((data) => {
        // MOVIES
        if (localDB.length > 0) {
          let filterArr = [...localDB, ...data.Search];
          setLocalDB(
            Array.from(new Set(filterArr.map(JSON.stringify)), JSON.parse)
          );
        } else {
          setLocalDB(data.Search);
        }
        // POSTERS
        let posters = [];
        if (localDB.length > 1) {
          localDB.map((item) => {
            return (posters = [
              ...posters,
              { id: item.imdbID, poster: item.Poster, movie: item.Title },
            ]);
          });
        }
        if (localDB.length === 0) {
          data.Search.map((item) => {
            return (posters = [
              ...posters,
              { id: item.imdbID, poster: item.Poster, movie: item.Title },
            ]);
          });
        }
        localStorage.setItem("posters", JSON.stringify(posters));
        localStorage.setItem("movies", JSON.stringify(localDB));
      });
  };
  return (
    <div style={{ display: "flex", margin: 0, p: 0, maxWidth: "100vw" }}>
      <Container
        sx={{
          height: "100vh",
          minWidth: "130px",
          width: { xs: "130px", lg: "20vw" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "5rem",
          margin: 0,
        }}
      >
        <Typography variant="h4" pb={4}>
          Menu
        </Typography>
        <Button
          onClick={() => handleClick("?s=Matrix&apikey=720c3666")}
          sx={{ margin: "1rem" }}
          variant="contained"
        >
          Button 1
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "1rem" }}
          onClick={() => handleClick("?s=Matrix%20Reloaded&apikey=720c3666")}
        >
          Button 2
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "1rem" }}
          onClick={() =>
            handleClick("?s=Matrix%20Revolutions&amp&apikey=720c3666")
          }
        >
          Button 3
        </Button>
      </Container>
      <Paper
        elevation={5}
        sx={{
          maxWidth: "80vw",
          display: "flex",
          // padding: "0.5rem",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Typography pb={10} variant="h3">
          Movies
        </Typography>
        {localDB.length > 1 ? (
          localDB.map((movie) => (
            <Box
              key={movie.imdbID}
              sx={{
                minWidth: { xs: "150px", md: "600px", xl: "900px" },
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
                border: "1px solid gray",
              }}
            >
              <Box
                sx={{
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle1" sx={{ p: "0.6rem" }}>
                  {movie.Title}
                </Typography>
                <Typography variant="subtitle1" sx={{ p: "0.6rem" }}>
                  Type: {movie.Type}
                </Typography>
                <Typography variant="subtitle1" sx={{ p: "0.6rem" }}>
                  Year: {movie.Year}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: { xs: "180px", sm: "200px" },
                }}
              >
                <img
                  src={movie.Poster}
                  alt="Poster"
                  style={{
                    maxWidth: "70vw",
                    maxHeight: "400px",
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No movies yet... Try using one of the Buttons</Typography>
        )}
      </Paper>
    </div>
  );
};

export default App;
