const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');
const paths = JSON.parse(fs.readFileSync('paths.json', 'utf8'));

const lines = app.split('\n');
let startIdx = lines.findIndex(l => l.includes('const provincesData = ['));
let endIdx = lines.findIndex(l => l.includes('const FadeInSection = ({ children }) => {'));

const oldStr = lines.slice(startIdx, endIdx).join('\n');
let oldData;
eval('oldData = ' + oldStr.replace('const provincesData = ', '').trim().replace(/;$/, ''));

const newData = oldData.map(p => {
  return {
    ...p,
    paths: paths[p.name] || []
  };
});

let newDataStr = 'const provincesData = [\n';
newData.forEach((p, i) => {
  newDataStr += `  {\n    id: "${p.id}",\n    name: "${p.name}",\n    description: "${p.description}",\n    knownFor: ${JSON.stringify(p.knownFor)},\n    paths: ${JSON.stringify(p.paths)}\n  }${i === newData.length - 1 ? '' : ','}\n`;
});
newDataStr += '];\n\n';

app = lines.slice(0, startIdx).join('\n') + '\n' + newDataStr + lines.slice(endIdx).join('\n');

app = app.replace('viewBox="0 0 300 400"', 'viewBox="0 0 700 700"');
app = app.replace(
  /<path\s+d=\{prov\.path\}[\s\S]*?\/>/,
  `{prov.paths && prov.paths.map((pPath, idx) => (
                          <path 
                            key={idx}
                            d={pPath}
                            fill={isSelected ? "#E15B2D" : "#FDE8D7"}
                            stroke="#8D153A"
                            strokeWidth="1.5"
                            className="transition-all duration-300 hover:fill-[#F2A900]"
                          />
                        ))}`
);

fs.writeFileSync('src/App.jsx', app);
console.log('done');
