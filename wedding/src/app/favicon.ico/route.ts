const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#f7f3ea" />
  <path
    d="M21 23c0-4.418 3.582-8 8-8 3.029 0 5.665 1.684 7 4.166C37.335 16.684 39.971 15 43 15c4.418 0 8 3.582 8 8 0 10.626-12.272 17.722-15 19.139C33.272 40.722 21 33.626 21 23Z"
    fill="#60683e"
  />
</svg>
`.trim();

export function GET() {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
