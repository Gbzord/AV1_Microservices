import Fastify from 'fastify';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: 'Notebook Pro', price: 3500, stock: 10 },
  { id: 2, name: 'Mouse Gamer', price: 150, stock: 25 },
  { id: 3, name: 'Teclado Mecânico', price: 380, stock: 18 }
];

const app = Fastify({ logger: true });

app.get('/products', async () => {
  return products;
});

app.get('/products/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return reply.status(404).send({ message: 'Produto não encontrado' });
  }

  return product;
});

const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    app.log.info('Product Service rodando na porta 3001');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
