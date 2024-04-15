import pool from "../config/db.js";

export async function getUsersQuery() {
  try {
    const response = await pool.query("SELECT * FROM bancosolar_usuarios");

    return response.rows;
  } catch (error) {
    return error;
  }
}

export async function addUserQuery(data) {
  try {
    const response = await pool.query(
      "INSERT INTO bancosolar_usuarios  (nombre, balance) VALUES ($1, $2) RETURNING *",
      data,
    );
    if (response.rowCount === 0) {
      throw new Error("No se pudo agregar el usuario");
    }
    return response.rows[0];
  } catch (error) {
    return error;
  }
}

export async function deleteUserQuery(id) {
  try {
    const response = await pool.query(
      "DELETE FROM bancosolar_usuarios  WHERE id = $1 RETURNING *",
      [id],
    );
    if (response.rowCount === 0) {
      throw new Error("No se pudo eliminar el usuario");
    }
    return response.rows[0];
  } catch (error) {
    return error;
  }
}

export async function editUserQuery(data) {
  try {
    const response = await pool.query(
      "UPDATE bancosolar_usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *",
      data,
    );
    if (response.rowCount === 0) {
      throw new Error("No se pudo editar el usuario");
    }
    return response.rows[0];
  } catch (error) {
    return error;
  }
}

export async function getTransferenciasQuery() {
  try {
    const response = await pool.query(
      "SELECT * FROM bancosolar_transferencias",
    );

    return response.rows;
  } catch (error) {
    return error;
  }
}

export async function postAddTransferenciaQuery(data) {
  const client = await pool.connect();

  try {
    const { emisor, receptor, monto, fecha } = data;
    await client.query("BEGIN");
    const queryTransferenciaEmisor = {
      text: "update bancosolar_usuarios  set balance = balance - $2 where id = $1 returning *",
      values: [emisor, monto],
    };
    const responseEmisor = await client.query(queryTransferenciaEmisor);
    if (responseEmisor.rowCount === 0) {
      throw new Error("No se pudo realizar la transferencia");
    }

    const queryTransferenciaReceptor = {
      text: "update bancosolar_usuarios  set balance = balance + $2 where id = $1 returning *",
      values: [receptor, monto],
    };

    const responseReceptor = await client.query(queryTransferenciaReceptor);
    if (responseReceptor.rowCount === 0) {
      throw new Error("No se pudo realizar la transferencia");
    }
    const queryTransferencia = {
      text: "INSERT INTO bancosolar_transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, $4) returning *",
      values: [emisor, receptor, monto, fecha],
    };
    const responseTransferencia = await client.query(queryTransferencia);
    if (responseTransferencia.rowCount === 0) {
      throw new Error("No se pudo realizar la transferencia");
    }

    await client.query("COMMIT");
  } catch (e) {
    console.log(e.message);
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function deleteTransferenciaQuery(id) {
  try {
    const response = await pool.query(
      "DELETE FROM bancosolar_transferencias WHERE id = $1 RETURNING *",
      [id],
    );
    if (response.rowCount === 0) {
      throw new Error("No se pudo eliminar la transferencia");
    }
    return response.rows[0];
  } catch (error) {
    return error;
  }
}

export async function getComisionesQuery() {
  const comision = 300;
  try {
    const query = {
      text: `select j.id,j.nombre,sum(j.monto ) as subtotal_transferencias ,sum(j.subtotal_ganancias) as subtotal_comisiones
      from
      (select u.id,u.nombre,t.monto,
      case when t.monto<1000 then 0 else $1 end AS subtotal_ganancias 
      from bancosolar_transferencias t
      INNER JOIN 
      bancosolar_usuarios u ON t.emisor = u.id) j
        group by j.id,j.nombre;
  `,
      values: [comision],
    };
    const response = await pool.query(query);

    return response.rows;
  } catch (error) {
    return error;
  }
}

export async function resetDataQuery() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query("delete from bancosolar_transferencias");

    await client.query(
      "ALTER SEQUENCE bancosolar_transferencias_id_seq RESTART WITH 1",
    );

    await client.query("delete from bancosolar_usuarios");

    await client.query(
      "ALTER SEQUENCE bancosolar_usuarios_id_seq RESTART WITH 1",
    );

    await client.query(`insert into 
    bancosolar_usuarios(nombre,balance)
    values ('Waldo Hidalgo',1000000),
    ('John Doe',1200000),
    ('Juan Bravo',800000),
    ('Karina Perez',500000)`);

    await client.query(`insert into 
    bancosolar_transferencias 
    (emisor,receptor,monto,fecha)
    values
    (1,2,400000,'2024-04-14 19:31:53.000'),
    (2,3,50000,'2022-04-14 19:32:29.000')`);

    await client.query("COMMIT");
  } catch (e) {
    console.log(e.message);
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
