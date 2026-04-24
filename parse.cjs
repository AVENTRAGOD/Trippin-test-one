const fs = require('fs');
const content = fs.readFileSync('map.svg', 'utf8');
const provinceMap = {
  'Basnāhira paḷāta': 'Western',
  'Madhyama paḷāta': 'Central',
  'Dakuṇu paḷāta': 'Southern',
  'Uturu paḷāta': 'Northern',
  'Næ̆gĕnahira paḷāta': 'Eastern',
  'Vayamba paḷāta': 'North Western',
  'Uturumæda paḷāta': 'North Central',
  'Ūva paḷāta': 'Uva',
  'Sabaragamuva paḷāta': 'Sabaragamuwa'
};
const result = {};
const regex = /<path[^>]*id="LK\.([A-Z]{2})"[^>]*d="([^"]+)"[\s\S]*?<region>([^<]+)<\/region>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const provName = provinceMap[match[3]];
  if(provName) {
    if(!result[provName]) result[provName] = [];
    result[provName].push(match[2]);
  }
}
fs.writeFileSync('paths.json', JSON.stringify(result, null, 2));
