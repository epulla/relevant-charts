Este es un proyecto de [Next.js](https://nextjs.org/)

## Instalación local

1. Instalar dependencias:

```bash
npm i
```

2. Crear el archivo `.env.local`, copiar el contenido `.env.local.example` y agregar tus variables de entorno:

```python
# copy this file to .env.local and fill in the values
OPENAI_API_KEY=******************

# Postgres
POSTGRES_URL="****************************************************************"
POSTGRES_PRISMA_URL="**********************************************************"
POSTGRES_URL_NO_SSL="**********************************************************"
POSTGRES_URL_NON_POOLING="*****************************************************"
POSTGRES_USER="*******"
POSTGRES_HOST="******************************************************"
POSTGRES_PASSWORD="************"
POSTGRES_DATABASE="********"

# KV
KV_URL="***********************************************"
KV_REST_API_URL="*************************************"
KV_REST_API_TOKEN="**********************************************************"
KV_REST_API_READ_ONLY_TOKEN="******************************************************"

# Blob Storage
BLOB_READ_WRITE_TOKEN="*******************************"
```

3. Iniciar el proyecto

```bash
npm run dev
```

4. Ir a [http://localhost:3000](http://localhost:3000) en tu navegador y ver el resultado 😁
