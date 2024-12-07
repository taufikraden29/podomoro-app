import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(25 * 60); // Default 25 menit (dalam detik)
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true); // Apakah sesi kerja?
  const [workDuration, setWorkDuration] = useState(25); // Default 25 menit
  const [breakDuration, setBreakDuration] = useState(5); // Default 5 menit

  // Meminta izin notifikasi saat aplikasi dimuat
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            handleSessionEnd();
            return isWorkSession ? breakDuration * 60 : workDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWorkSession, workDuration, breakDuration]);

  // Ketika sesi selesai, beralih sesi, dan tampilkan notifikasi
  const handleSessionEnd = () => {
    const nextSession = !isWorkSession;
    setIsWorkSession(nextSession);
    showNotification(nextSession);
  };

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (nextSession) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(
        nextSession ? "Time to Work!" : "Take a Break!",
        {
          body: nextSession
            ? "Your break is over. Time to get back to work!"
            : "Great work! Time for a short break.",
          icon: "/pomodoro-icon.png", // Tambahkan ikon jika ada
        }
      );

      // Opsional: Tambahkan aksi klik pada notifikasi
      notification.onclick = () => {
        window.focus();
      };
    }
  };

  // Format waktu menjadi MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Reset Timer
  const resetTimer = () => {
    setIsRunning(false);
    setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.session}>
        {isWorkSession ? "Work Session" : "Break Session"}
      </h2>
      <h1 style={styles.timer}>{formatTime(time)}</h1>

      {/* Controls */}
      <div style={styles.controls}>
        <button onClick={() => setIsRunning(!isRunning)} style={styles.button}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer} style={styles.button}>
          Reset
        </button>
      </div>

      {/* Settings */}
      <div style={styles.settings}>
        <div>
          <label>
            Work Duration (minutes):
            <input
              type="number"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Break Duration (minutes):
            <input
              type="number"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              style={styles.input}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  session: { fontSize: "24px", marginBottom: "10px" },
  timer: { fontSize: "200px", marginBottom: "20px" },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  settings: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" },
  input: { width: "60px", textAlign: "center", marginLeft: "10px" },
};

export default Timer;
