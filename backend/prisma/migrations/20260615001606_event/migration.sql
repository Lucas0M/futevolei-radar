-- CreateEnum
CREATE TYPE "StatusEvento" AS ENUM ('AGENDADO', 'EM_ANDAMENTO', 'FINALIZADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "torneio" TEXT NOT NULL,
    "etapa" TEXT,
    "categoria" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "local" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "status" "StatusEvento" NOT NULL DEFAULT 'AGENDADO',
    "resultado" TEXT,
    "fonteUrl" TEXT,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);
