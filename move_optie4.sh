# Create a backup
cp src/components/GamePortal.jsx src/components/GamePortal.jsx.bak

# Delete lines 133 to 145 (Optie 4)
sed -i '' '133,146d' src/components/GamePortal.jsx

# Insert the enhanced Optie 4 before Optie 2 (which is now around line 104)
# Let's find the exact line number for Optie 2
line_num=$(grep -n "Optie 2: Werkvormen" src/components/GamePortal.jsx | cut -d: -f1)

# Create the new block
cat << 'INNER_EOF' > optie4_block.txt
        {/* Optie 2: Fysieke Kaarten Bestellen (Accentuated) */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 247, 237, 0.8))', border: '1px solid rgba(234, 88, 12, 0.3)', boxShadow: '0 8px 30px rgba(234, 88, 12, 0.1)' }}>
          <div style={{ padding: '1rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(234, 88, 12, 0.15) 100%)', borderRadius: '16px', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.3)' }}>
            <ShoppingCartIcon size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem', color: '#ea580c' }}>Fysieke Kaarten Bestellen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Wil je liever een professioneel, fysiek kaartendeck in handen? Bestel direct de Complete Set (55 kaarten), de Klassieke Basisset (43 kaarten) of de losse Theorie-uitbreiding (12 kaarten).</p>
            <button onClick={onViewOrderCards} className="btn" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(234, 88, 12, 0.4)', fontWeight: 'bold' }}>
              Fysieke kaarten bestellen
            </button>
          </div>
        </div>

INNER_EOF

# Insert the block at the found line number
sed -i '' "${line_num}r optie4_block.txt" src/components/GamePortal.jsx

# Also change the old Optie numbers
sed -i '' 's/Optie 2: Werkvormen/Optie 3: Werkvormen/g' src/components/GamePortal.jsx
sed -i '' 's/Optie 3: Kaarten Printen/Optie 4: Kaarten Printen/g' src/components/GamePortal.jsx

