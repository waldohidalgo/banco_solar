import {
  getUsersQuery,
  addUserQuery,
  deleteUserQuery,
  editUserQuery,
  getTransferenciasQuery,
  postAddTransferenciaQuery,
  deleteTransferenciaQuery,
  getComisionesQuery,
  resetDataQuery,
} from "../queries/consultas.js";

export function renderHome(req, res) {
  res.sendFile("views/index.html", { root: "." });
}

export async function getUsers(req, res) {
  try {
    const users = await getUsersQuery();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addUser(req, res) {
  try {
    const data = req.body;

    const result = await addUserQuery([data.nombre, data.balance]);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.query;
    const result = await deleteUserQuery(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function editUser(req, res) {
  try {
    const { id } = req.query;
    const data = req.body;

    const result = await editUserQuery([id, data.nombre, data.balance]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getTransferencias(req, res) {
  try {
    const transferencias = await getTransferenciasQuery();
    res.status(200).send(transferencias);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postAddTransferencia(req, res) {
  try {
    const data = req.body;
    const result = await postAddTransferenciaQuery(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteTransferencia(req, res) {
  try {
    const { id } = req.query;
    const result = await deleteTransferenciaQuery(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getComisiones(req, res) {
  try {
    const comisiones = await getComisionesQuery();

    res.status(200).json(comisiones);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function resetData(req, res) {
  try {
    await resetDataQuery();
    res.status(200).send("Data Reseteada");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function notFound(req, res) {
  res.status(404).sendFile("views/no_found.html", { root: "." });
}
