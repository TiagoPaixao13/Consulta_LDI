async function validateNumber() {
  const number = document.getElementById("phoneInput").value.trim();
  const resultDiv = document.getElementById("result");
 
  if (!number) {
    resultDiv.innerHTML = "<p style='color:red'>Digite um número!</p>";
    return;
  }
 
  const apiKey = "11bc30990c6b81f0b60d613acbf50cca";
  const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${number}`;
 
  // Passando pelo proxy AllOrigins (HTTPS)
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
 
  try {
    const response = await fetch(proxyUrl);
 
    if (!response.ok) {
      throw new Error("Erro ao acessar o proxy");
    }
 
    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents); // resposta real da API
 
    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red">Erro: ${data.error.info}</p>`;
      return;
    }
 
    resultDiv.innerHTML = `
      <p><strong>Válido:</strong> ${data.valid ? "Sim ✅" : "Não ❌"}</p>
      <p><strong>Prefixo:</strong> ${data.country_prefix || "-"}</p>
      <p><strong>Código do País:</strong> ${data.country_code || "-"}</p>
      <p><strong>Nome do País:</strong> ${data.country_name || "-"}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red">Erro na requisição.</p>`;
    console.error("Erro:", error);
  }
}
 
