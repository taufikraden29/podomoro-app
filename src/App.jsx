import React, { useState } from "react";
import Timer from "./components/Timer";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div style={darkMode ? styles.dark : styles.light}>
      <header style={styles.header}>
        <h1>Pomodoro Timer</h1>
        <button onClick={toggleTheme} style={styles.themeButton}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <Timer />
    </div>
  );
};

const styles = {
  light: {
    backgroundColor: "#f4f4f4",
    color: "#333",
    minHeight: "100vh",
    padding: "20px",
  },
  dark: {
    backgroundColor: "#333",
    color: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeButton: { padding: "10px 20px", cursor: "pointer" },
};

export default App;
