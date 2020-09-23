const { default: Cliente } = require("./classes/Cliente");

let cliente = new Cliente();
cliente.nome = "Maiara Garcia";
cliente.numeroDocumento = "111.111.111-11";
cliente.dataNascimento = "21/01/1997";

let clientesLista = Array();

clientesLista.push(cliente);

cliente = new Cliente();
cliente.nome = "Valter jr";
cliente.numeroDocumento = "222.222.222-22";
cliente.dataNascimento = "15/09/1997";

clientesLista.push(cliente);

