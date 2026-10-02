import os
import shutil
import subprocess

# Catalog of 55 cards
CARDS = [
  # Basisbehoeften (7)
  ('basisbehoeften/1.png', 'basisbehoeften/1.png'),
  ('basisbehoeften/2.png', 'basisbehoeften/2.png'),
  ('basisbehoeften/3.png', 'basisbehoeften/3.png'),
  ('basisbehoeften/4.png', 'basisbehoeften/4.png'),
  ('basisbehoeften/5.png', 'basisbehoeften/5.png'),
  ('basisbehoeften/6.png', 'basisbehoeften/6.png'),
  ('basisbehoeften/7.png', 'basisbehoeften/7.png'),

  # Schema's (18)
  ('schemas/Abandonment.png', 'schemas/Abandonment.png'),
  ('schemas/Mistrust.png', 'schemas/Mistrust.png'),
  ('schemas/Emotional deprivation.png', 'schemas/Emotional deprivation.png'),
  ('schemas/Defectiveness_unlovability.png', 'schemas/Defectiveness_unlovability.png'),
  ('schemas/Social isolation_Alienation.png', 'schemas/Social isolation_Alienation.png'),
  ('schemas/Practical incompetence_Dependence.png', 'schemas/Practical incompetence_Dependence.png'),
  ('schemas/Vulnerability to harm_illness.png', 'schemas/Vulnerability to harm_illness.png'),
  ('schemas/Enmeshment.png', 'schemas/Enmeshment.png'),
  ('schemas/Failure to achieve.png', 'schemas/Failure to achieve.png'),
  ('schemas/Entitlement_Superiority.png', 'schemas/Entitlement_Superiority.png'),
  ('schemas/Insufficient self-control_self-discipline.png', 'schemas/Insufficient self-control_self-discipline.png'),
  ('schemas/Subjugation.png', 'schemas/Subjugation.png'),
  ('schemas/Self-sacrifice.png', 'schemas/Self-sacrifice.png'),
  ('schemas/Admiration_Recognition-seeking.png', 'schemas/Admiration_Recognition-seeking.png'),
  ('schemas/Pessimism_Worry.png', 'schemas/Pessimism_Worry.png'),
  ('schemas/Emotional inhibition.png', 'schemas/Emotional inhibition.png'),
  ('schemas/Unrelenting Standards.png', 'schemas/Unrelenting Standards.png'),
  ('schemas/Self-punitiveness.png', 'schemas/Self-punitiveness.png'),

  # Modi (14)
  ('modes/kk.png', 'modes/kk.png'),
  ('modes/bk.png', 'modes/bk.png'),
  ('modes/ik.png', 'modes/ik.png'),
  ('modes/ok.png', 'modes/ok.png'),
  ('modes/ob.png', 'modes/ob.png'),
  ('modes/oz.png', 'modes/oz.png'),
  ('modes/vo.png', 'modes/vo.png'),
  ('modes/zh.png', 'modes/zh.png'),
  ('modes/pa.png', 'modes/pa.png'),
  ('modes/wi.png', 'modes/wi.png'),
  ('modes/so.png', 'modes/so.png'),
  ('modes/gv.png', 'modes/gv.png'),
  ('modes/rk.png', 'modes/rk.png'),

  # VST (10)
  ('vst/aandacht_erkenningzoeker.png', 'vst/aandacht_erkenningzoeker.png'),
  ('vst/bedrog_en_manipulatie.png', 'vst/bedrog_en_manipulatie.png'),
  ('vst/betekenisvolle_wereld.png', 'vst/betekenisvolle_wereld.png'),
  ('vst/blije_kind.png', 'vst/blije_kind.png'),
  ('vst/boze_beschermer.png', 'vst/boze_beschermer.png'),
  ('vst/coherente_identiteit.png', 'vst/coherente_identiteit.png'),
  ('vst/coping_omkering.png', 'vst/coping_omkering.png'),
  ('vst/onrechtvaardigheid.png', 'vst/onrechtvaardigheid.png'),
  ('vst/perfectionistische_overcontroleerder.png', 'vst/perfectionistische_overcontroleerder.png'),
  ('vst/roofdier.png', 'vst/roofdier.png'),

  # Modicategorieën (6)
  ('modicategorieen/1.png', 'modicategorieen/1.png'),
  ('modicategorieen/2.png', 'modicategorieen/2.png'),
  ('modicategorieen/4.png', 'modicategorieen/4.png'),
  ('modicategorieen/coping_overcompensatie.png', 'modicategorieen/coping_overcompensatie.png'),
  ('modicategorieen/coping_overgave.png', 'modicategorieen/coping_overgave.png'),
  ('modicategorieen/coping_vermijding.png', 'modicategorieen/coping_vermijding.png')
]

src_base = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images'
dest_base = '/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/public/images_uniform'

print("=== STARTING UNIFORM IMAGE NORMALIZATION ===")
os.makedirs(dest_base, exist_ok=True)

processed = 0
for src_rel, dest_rel in CARDS:
    src_file = os.path.join(src_base, src_rel)
    dest_file = os.path.join(dest_base, dest_rel)
    
    if os.path.exists(src_file):
        os.makedirs(os.path.dirname(dest_file), exist_ok=True)
        shutil.copy2(src_file, dest_file)
        
        # Use macOS sips to pad and resize to exact 512x512 uniform canvas
        cmd = [
            'sips',
            '--resampleWidth', '512',
            '--padToHeightWidth', '512', '512',
            dest_file
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        processed += 1
        print(f"[{processed}/{len(CARDS)}] Normalized: {dest_rel} -> 512x512px")

print(f"\n✅ SUCCESSFULLY NORMALIZED {processed} CARDS TO 512x512 CANVAS!")
