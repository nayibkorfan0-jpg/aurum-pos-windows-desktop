# Instrucciones para subir a GitHub

## Pasos para subir todo el código a: https://github.com/nayibkorfan0-jpg/poslavaderooffline

### Método 1: Terminal/CMD
```bash
# 1. Ir al directorio
cd aurum-pos-source

# 2. Inicializar git (si no existe)
git init

# 3. Agregar remote
git remote add origin https://github.com/nayibkorfan0-jpg/poslavaderooffline.git

# 4. Agregar todos los archivos
git add .

# 5. Commit
git commit -m "Sistema POS offline para lavadero Paraguay - Desktop SQLite version"

# 6. Push
git push -u origin main
```

### Método 2: GitHub Desktop
1. Abrir GitHub Desktop
2. "Add an Existing Repository from your Hard Drive"
3. Seleccionar carpeta: aurum-pos-source
4. "Publish repository" → usar: nayibkorfan0-jpg/poslavaderooffline

### Archivos incluidos:
- ✅ package.json (configuración proyecto)
- ✅ electron/ (desktop framework)
- ✅ server/ (backend Express + SQLite)
- ✅ client/ (frontend React)
- ✅ shared/ (database schemas)
- ✅ assets/ y build/ (iconos)
- ✅ electron-builder.json (configuración Windows installer)

## Sistema POS Desktop Offline
- 100% offline con SQLite
- Login: admin / aurum1705
- Datos guardados localmente
- Compatible Windows/Linux/Mac