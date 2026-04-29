// Script pour insérer le chatbot dans invoices.html
// Exécutez : node insert-chat.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/app/features/enterprise/invoices/invoices.html');
let content = fs.readFileSync(file, 'utf8');

const chatTag = '\n      <app-invoice-chat></app-invoice-chat>\n';
const target = '</ng-container>';

// Trouver le dernier </ng-container> dans le fichier
const lastIdx = content.lastIndexOf(target);

if (lastIdx === -1) {
  console.error('❌ Balise </ng-container> non trouvée dans le fichier !');
  process.exit(1);
}

// Vérifier si déjà inséré
if (content.includes('app-invoice-chat')) {
  console.log('✅ app-invoice-chat est déjà dans le fichier !');
  process.exit(0);
}

// Insérer avant la dernière balise </ng-container>
content = content.slice(0, lastIdx) + chatTag + content.slice(lastIdx);
fs.writeFileSync(file, content, 'utf8');

console.log('✅ Chatbot inséré avec succès dans invoices.html !');
console.log('📄 Angular va recompiler automatiquement...');
