#!/bin/bash

# Directorios
SOURCE_DIR="$(pwd)/build"
TARGET_DIR="/home/irie/Escritorio/freak-project/server/server/src/main/resources/static"

# Sincronizar archivos, preservando carpeta uploads
rsync -av --delete --exclude "uploads" "$SOURCE_DIR/" "$TARGET_DIR/"

echo "✅ Archivos copiados correctamente manteniendo 'uploads'."
