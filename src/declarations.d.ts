declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.hbs' {
  const content: string; // Or the appropriate type your loader provides
  export default content;
}
