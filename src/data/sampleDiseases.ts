export interface SampleDiseasePreset {
  id: string;
  cropName: string;
  diseaseName: string;
  thumbnailUrl: string;
  previewDescription: string;
}

export const sampleDiseasePresets: SampleDiseasePreset[] = [
  {
    id: 'cotton-blight',
    cropName: 'Cotton (कापूस)',
    diseaseName: 'Bacterial Leaf Blight (Xanthomonas)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&w=600&q=80',
    previewDescription: 'Angular dark brown leaf spots with water-soaked halos.',
  },
  {
    id: 'tomato-early-blight',
    cropName: 'Tomato (टोमॅटो)',
    diseaseName: 'Early Blight (Alternaria solani)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a3c?auto=format&fit=crop&w=600&q=80',
    previewDescription: 'Concentric ring target-board spots on lower mature foliage.',
  },
  {
    id: 'wheat-rust',
    cropName: 'Wheat (गहू / गेहूं)',
    diseaseName: 'Yellow / Stripe Rust (Puccinia striiformis)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    previewDescription: 'Yellow-orange pustules arranged in parallel stripes on leaves.',
  },
  {
    id: 'soybean-yellow-mosaic',
    cropName: 'Soybean (सोयाबीन)',
    diseaseName: 'Yellow Mosaic Virus (YMV)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    previewDescription: 'Alternating bright yellow and green mosaic patches spread by whiteflies.',
  },
];
