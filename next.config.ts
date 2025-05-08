import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'www.farmacialospabellones.com' },
      { protocol: 'https', hostname: 'sgfm.elcorteingles.es' },
      { protocol: 'https', hostname: 'es.moroccanoil.com' },
      { protocol: 'https', hostname: 'static.beautytocare.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'www.druni.es' },
      { protocol: 'https', hostname: 'shop.carobels.com' },
      { protocol: 'https', hostname: 'www.bethshair.es' },
      { protocol: 'https', hostname: 'eurexbelleza.es' },
      { protocol: 'https', hostname: 'static.carrefour.es' },
      { protocol: 'https', hostname: 'www.dulceweddingshop.com' },
      { protocol: 'https', hostname: 'clementeatienza.es' },
      { protocol: 'https', hostname: 'prod-mercadona.imgix.net' },
      { protocol: 'https', hostname: 'www.productospeluqueriacastro.com' },
      { protocol: 'https', hostname: 'www.sprayplanet.es' },
      { protocol: 'https', hostname: 'img.pccomponentes.com' },
      { protocol: 'https', hostname: 'tienda.pilar-delgado.com' },
      { protocol: 'https', hostname: 'img.kwcdn.com' },
      { protocol: 'https', hostname: 'cdn.basler-beauty.de' },
      { protocol: 'https', hostname: 'www.ufesa.es' },
      { protocol: 'https', hostname: 'termix.net' },
      { protocol: 'https', hostname: 'www.farmaciajauregui.es' },
      { protocol: 'https', hostname: 'www.artipistilos.com' },
      { protocol: 'https', hostname: 'farmaciasenante.com' },
      { protocol: 'https', hostname: 'images-1.eucerin.com' },
      { protocol: 'https', hostname: 'www.delauz.es' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'encrypted-tbn1.gstatic.com' },
      { protocol: 'https', hostname: 'www.jata.es' },
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'www.farmaciabarata.es' },
      { protocol: 'https', hostname: 'www.perfumeriasana.com' },
      { protocol: 'https', hostname: 'nirvel-shop.com' }, // Agregado para permitir imágenes de este dominio

    ],
  },
  experimental: {
    // Add any valid experimental options here if needed
  },
};

export default nextConfig;