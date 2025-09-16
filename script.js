async function validarNumero() {
  const numero = document.getElementById("numero").value;
  const access_key = "SUA_ACCESS_KEY_AQUI"; // Substitua pela sua chave da Apilayer

  const url = `http://apilayer.net/api/validate?access_key=${access_key}&number=${numero}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    document.getElementById("resultado").innerText = 
      dados.valid ? "Número válido!" : "Número inválido.";
  } catch (erro) {
    document.getElementById("resultado").innerText = "Erro ao validar número.";
    console.error(erro);
  }
}
