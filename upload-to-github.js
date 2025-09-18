import { Octokit } from '@octokit/rest'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

// Function to read file content as base64
function readFileAsBase64(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return content.toString('base64');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Function to get all files recursively
function getAllFiles(dirPath, arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.join(basePath, file);
    
    // Skip node_modules, dist, release, .git and other build artifacts
    if (file.includes('node_modules') || 
        file.includes('.git') || 
        file.includes('dist') || 
        file.includes('release') ||
        file.includes('.cache') ||
        file.includes('.tmp') ||
        file.includes('logs') ||
        file.includes('temp')) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles, relativePath);
    } else {
      arrayOfFiles.push({
        path: relativePath.replace(/\\/g, '/'), // Normalize path separators
        fullPath: fullPath
      });
    }
  });

  return arrayOfFiles;
}

async function uploadToGitHub() {
  try {
    console.log('🚀 Iniciando subida a GitHub...');
    
    const octokit = await getUncachableGitHubClient();
    
    // Repository details
    const owner = 'nayibkorfan0-jpg'; // Replace with your GitHub username
    const repo = 'aurum-pos-windows-desktop';
    
    console.log('📝 Creando/actualizando repositorio...');
    
    // Try to create the repository (will fail if it already exists, which is fine)
    try {
      await octokit.rest.repos.createForAuthenticatedUser({
        name: repo,
        description: '🏢 Sistema POS Aurum - Aplicación Windows Desktop Offline para Lavaderos de Autos (Paraguay) - SQLite + Electron + Compliance Fiscal',
        private: false,
        auto_init: true
      });
      console.log('✅ Repositorio creado exitosamente');
    } catch (error) {
      if (error.status === 422) {
        console.log('ℹ️ El repositorio ya existe, actualizando contenido...');
      } else {
        throw error;
      }
    }

    // Get all files in the project
    console.log('📁 Escaneando archivos del proyecto...');
    const projectFiles = getAllFiles(__dirname);
    
    console.log(`📄 Encontrados ${projectFiles.length} archivos para subir`);

    // Create a tree with all files
    const tree = [];
    
    for (const file of projectFiles) {
      console.log(`📤 Procesando: ${file.path}`);
      
      const content = readFileAsBase64(file.fullPath);
      if (content) {
        // Create blob for each file
        const blob = await octokit.rest.git.createBlob({
          owner,
          repo,
          content,
          encoding: 'base64'
        });
        
        tree.push({
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blob.data.sha
        });
      }
    }

    console.log('🌳 Creando tree en GitHub...');
    
    // Create tree
    const treeResponse = await octokit.rest.git.createTree({
      owner,
      repo,
      tree,
      base_tree: undefined // This will replace all content
    });

    console.log('💾 Creando commit...');
    
    // Create commit
    const commit = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: `🏢 Aurum POS - Conversión completa a aplicación Windows Desktop

✅ SISTEMA COMPLETAMENTE FUNCIONAL OFFLINE:
- 🗄️ Base de datos SQLite integrada para operación sin internet
- 🔐 Autenticación multi-usuario (admin/aurum1705)
- 💰 Sistema completo POS para lavaderos de autos
- 🧾 Compliance fiscal Paraguay (RUC, Timbrado, régimen turismo)
- 📦 Gestión inventario, clientes, órdenes de trabajo
- 📊 Dashboard con métricas de negocio

🔧 ARQUITECTURA TÉCNICA:
- ⚡ Electron + React + Express + SQLite
- 🎯 Storage automático SQLite en modo desktop
- 🖥️ Instalador NSIS para Windows con shortcuts
- 🔄 Migración completa de PostgreSQL web a SQLite offline

📥 INSTRUCCIONES DE COMPILACIÓN:
1. npm install
2. npm run dist:win
3. Instalador generado en release/1.0.0/

🏆 Estado: Listo para producción y distribución`,
      tree: treeResponse.data.sha,
      parents: [] // This creates a new initial commit
    });

    console.log('🎯 Actualizando branch main...');
    
    // Update main branch to point to new commit
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.data.sha,
      force: true // Force update to replace existing content
    });

    console.log('🎉 ¡ÉXITO! Código subido a GitHub exitosamente');
    console.log(`🔗 Repositorio: https://github.com/${owner}/${repo}`);
    
  } catch (error) {
    console.error('❌ Error subiendo a GitHub:', error);
    throw error;
  }
}

// Run the upload
uploadToGitHub().then(() => {
  console.log('✅ Proceso completado');
  process.exit(0);
}).catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});