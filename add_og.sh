for file in index.html kaarten.html spel.html tafel.html test.html snelstart.html; do
  sed -i '' 's/<meta property="og:type" content="website" \/>/<meta property="og:type" content="website" \/>\n    <meta property="og:image" content="https:\/\/schematherapiesuite.vercel.app\/preview.jpg" \/>\n    <meta property="og:image:width" content="1200" \/>\n    <meta property="og:image:height" content="630" \/>\n    <meta name="twitter:card" content="summary_large_image" \/>/g' $file
done
