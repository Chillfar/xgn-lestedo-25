import fs from 'fs';
import path from 'path';

const componentsDir = path.join('e:', 'code', 'xgn-lestedo-25', 'src', 'components');

function fixComponent(filename) {
  const filePath = path.join(componentsDir, filename);
  if (!fs.existsSync(filePath)) return;

  let code = fs.readFileSync(filePath, 'utf8');

  // Extract the inner content of <Rnd>...</Rnd>
  const rndMatch = code.match(/<Rnd[\s\S]*?>([\s\S]*?)<\/Rnd>/);
  if (!rndMatch) {
    console.log(`No Rnd found in ${filename}`);
    return;
  }

  const innerContent = rndMatch[1].trim();

  // If it's CountdownPanel, it has a custom desktop return without Rnd.
  if (filename === 'CountdownPanel.tsx') {
    // the mobile block:
    const mobileBlockRegex = /if \(isMobile\) \{[\s\S]*?return \([\s\S]*?<Rnd[\s\S]*?>([\s\S]*?)<\/Rnd>\s*\);\s*\}/;
    const match = code.match(mobileBlockRegex);
    if (match) {
        const inner = match[1].trim();
        code = code.replace(mobileBlockRegex, `if (isMobile) {\n    return (\n      <div style={{ width: "100%", marginBottom: "20px" }}>\n        ${inner}\n      </div>\n    );\n  }`);
        fs.writeFileSync(filePath, code);
        console.log(`Fixed ${filename}`);
    }
    return;
  }

  // Replace the return block
  const returnBlockRegex = /return \([\s\S]*?<Rnd[\s\S]*?>[\s\S]*?<\/Rnd>\s*\);/;
  
  const replacement = `const content = (
    <>
      ${innerContent}
    </>
  );

  if (isMobile) {
    return <div style={{ width: "100%", marginBottom: "20px" }}>{content}</div>;
  }

  return (
    <Rnd default={rndProps as any}>
      {content}
    </Rnd>
  );`;

  code = code.replace(returnBlockRegex, replacement);
  fs.writeFileSync(filePath, code);
  console.log(`Fixed ${filename}`);
}

['ChartPanel.tsx', 'GamePanel.tsx', 'LocationPanel.tsx', 'VideosPanel.tsx', 'SpotifyPanel.tsx', 'RankingPanel.tsx', 'CountdownPanel.tsx'].forEach(fixComponent);
