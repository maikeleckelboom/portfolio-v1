export const cssFromProperties = (input: Record<string, string>) =>
  `:root {\n${Object.entries(input)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n')}}`
