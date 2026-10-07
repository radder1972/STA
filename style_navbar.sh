sed -i '' "s/background: isActive ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',/background: isActive ? (item.id === 'order-cards' ? 'linear-gradient(to right, #f59e0b, #ea580c)' : 'linear-gradient(to right, #64748b, #3b82f6)') : (item.id === 'order-cards' ? 'rgba(234, 88, 12, 0.08)' : 'transparent'),/g" src/components/GameNavbar.jsx

sed -i '' "s/color: isActive ? 'white' : 'var(--text-muted)',/color: isActive ? 'white' : (item.id === 'order-cards' ? '#ea580c' : 'var(--text-muted)'),/g" src/components/GameNavbar.jsx

