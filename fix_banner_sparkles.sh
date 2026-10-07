sed -i '' '/<style>{`/,/<\/div>/d' src/components/StartHub.jsx
sed -i '' 's/      >/{isBannerHovered \&\& <SparkleEffect count={15} \/>}/g' src/components/StartHub.jsx
