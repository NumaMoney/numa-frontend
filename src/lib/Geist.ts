import localFont from 'next/font/local';

// Font files can be colocated inside of `app`
export const Geist = localFont({
  src: [
    {
      path: './Geist/Geist-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './Geist/Geist-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './Geist/Geist-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Geist/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Geist/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Geist/Geist-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Geist/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Geist/Geist-Black.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Geist/Geist-UltraBlack.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
});
