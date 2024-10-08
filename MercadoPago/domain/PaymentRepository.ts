import express, { Request, Response } from 'express';
import { createPayment, getPaymentStatus } from '../application/CreatePaymentUseCase'; // Corregido: "application" con dos 'p'

const router = express.Router();

// Crear una preferencia de pago
router.post('/create-payment', async (req: Request, res: Response) => {
  try {
    const { items, email } = req.body;
    const paymentResponse = await createPayment(items, email);
    res.status(200).json(paymentResponse);
  } catch (error) {
    console.error('No se pudo crear el pago:', error);
    res.status(500).json({ error: (error instanceof Error) ? error.message : 'Error desconocido' });
  }
});

// Obtener el estado de un pago
router.get('/payment-status/:id', async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id;
    const paymentStatus = await getPaymentStatus(paymentId);
    res.status(200).json(paymentStatus);
  } catch (error) {
    console.error('Error al obtener el estado del pago:', error);
    res.status(500).json({ error: (error instanceof Error) ? error.message : 'Error desconocido' });
  }
});

export default router;
