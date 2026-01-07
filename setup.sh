#!/bin/bash
# ==========================================
# Script de Setup - Tiemply Landing
# ==========================================

set -e

echo "=========================================="
echo "  Setup - Tiemply Landing Page"
echo "=========================================="

# Copiar fuentes desde el esqueleto
echo "[1/3] Copiando fuentes..."
if [ -d "../landpage/assets/fonts" ]; then
    cp -r ../landpage/assets/fonts/* src/assets/fonts/
    echo "   Fuentes copiadas correctamente"
else
    echo "   AVISO: No se encontró el directorio de fuentes del esqueleto"
fi

# Copiar favicon
echo "[2/3] Copiando favicon..."
if [ -f "../landpage/assets/img/favicon.png" ]; then
    cp ../landpage/assets/img/favicon.png public/
    echo "   Favicon copiado correctamente"
else
    echo "   AVISO: No se encontró el favicon"
fi

# Instalar dependencias
echo "[3/3] Instalando dependencias..."
npm install

echo ""
echo "=========================================="
echo "  Setup completado!"
echo "=========================================="
echo ""
echo "Para iniciar en desarrollo:"
echo "  npm run dev"
echo ""
echo "Para construir para producción:"
echo "  npm run build"
echo ""
