async function analyzeIncident() {
  const text = document.getElementById("incident").value;
  const resultDiv = document.getElementById("result");

  if (!text.trim()) {
    resultDiv.innerText = "Please describe an incident first.";
    return;
  }

  resultDiv.innerText = "Generating report...";

  try {
    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    console.log(data);

    resultDiv.innerText = data.response || data.error || JSON.stringify(data, null, 2);

  } catch (error) {
    resultDiv.innerText = "Could not connect to backend server.";
    console.error(error);
  }
}