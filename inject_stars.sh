sed -i '' 's/<Sparkles size={11} \/>/<ThreeSparklesLogo size={14} theme="white" style={{marginRight: "2px"}} \/>/g' src/components/GamePortal.jsx src/components/KaartenOverzicht.jsx
sed -i '' 's/<Sparkles size={12} \/>/<ThreeSparklesLogo size={16} theme="white" style={{marginRight: "2px"}} \/>/g' src/components/StartHub.jsx

sed -i '' 's/justifyContent: '\''center'\'',/justifyContent: '\''center'\'', overflow: '\''hidden'\'',/g' src/components/GamePortal.jsx src/components/KaartenOverzicht.jsx src/components/StartHub.jsx

# Add background watermark
sed -i '' 's/<div style={{ display: '\''flex'\'', alignItems: '\''center'\''/<div style={{ position: '\''absolute'\'', opacity: 0.15, transform: '\''scale(2.5) rotate(-15deg)'\'' }}><ThreeSparklesLogo size={60} theme="white" \/><\/div><div style={{ display: '\''flex'\'', alignItems: '\''center'\''/g' src/components/GamePortal.jsx src/components/KaartenOverzicht.jsx src/components/StartHub.jsx
