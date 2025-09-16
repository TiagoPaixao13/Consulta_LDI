async function validateNumber() {
  const number = document.getElementById("phoneInput").value.trim();
  const resultDiv = document.getElementById("result");
 
  if (!number) {
    resultDiv.innerHTML = "<p style='color:red'>Digite um número!</p>";
    return;
  }
 
  const apiKey = "11bc30990c6b81f0b60d613acbf50cca";
  const url = `https://apilayer.net/api/validate?access_key=${apiKey}&number=${number}`;
 
  try {
    const response = await fetch(url);
    const data = await response.json();
 
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
    console.error(error);
  }
}
