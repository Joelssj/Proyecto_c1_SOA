import { Signale } from "signale";
import express from "express";
import { usersRouter } from "./Users/infrastructure/api-rest/routes/UsersRouter";
import { tiendaRouter } from "./Tiendas/infrastructure/api-rest/routes/TiendaRouter";
import { empleadoRouter } from "./Empleados/infrastructure/api-rest/routes/EmpleadoRouter";
import paymentRoutes from './MercadoPago/infrastructure/routes/PaymentRoutes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const signale = new Signale();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/tienda", tiendaRouter);
app.use("/api/v1/empleado", empleadoRouter);
app.use('/api/v1/payment', paymentRoutes);

const port = 3010;
const host = '0.0.0.0';

app.listen(port, host, () => {
  signale.success("Server online in port 3010");
});

