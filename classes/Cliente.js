const { default: Pessoa } = require("./Pessoa");

class Cliente extends Pessoa{
    dataNascimento = "";
}

export default Cliente;